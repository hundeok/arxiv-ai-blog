"""Reliable, stateful arXiv-to-Markdown publishing pipeline.

The pipeline keeps its state in the repository so GitHub Actions runners are
stateless but the publication queue is not. A paper is only published after a
validated Markdown file has been written successfully.
"""

from __future__ import annotations

import json
import os
import re
import signal
import tempfile
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any
from urllib.request import Request, urlopen

from google import genai
from google.genai import types
from pypdf import PdfReader

from fetch_papers import fetch_latest_cs_ai_papers


ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = ROOT / "frontend" / "public" / "content"
STATE_PATH = CONTENT_DIR / "pipeline-state.json"
STATUS_PATH = CONTENT_DIR / "pipeline-status.json"
METADATA_PATH = CONTENT_DIR / "metadata.json"

MODEL = os.environ.get("GEMINI_MODEL", "gemini-3.1-flash-lite")
DISCOVERY_LIMIT = int(os.environ.get("DISCOVERY_LIMIT", "30"))
BATCH_SIZE = max(1, min(int(os.environ.get("BATCH_SIZE", "3")), 5))
REQUEST_TIMEOUT_SECONDS = 90
MAX_ATTEMPTS_PER_RUN = 2
PRIMARY_INPUT_CHARS = 12_000
FALLBACK_INPUT_CHARS = 6_000

REQUIRED_SECTIONS = (
    "3줄 핵심 요약",
    "쉽게 풀어쓴 1분 핵심",
    "배경 및 문제점",
    "핵심 기술 및 아키텍처",
    "실험 결과 분석",
    "세상에 미치는 영향",
)


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def atomic_json_write(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile("w", encoding="utf-8", delete=False, dir=path.parent) as handle:
        json.dump(value, handle, ensure_ascii=False, indent=2)
        handle.write("\n")
        temp_path = Path(handle.name)
    temp_path.replace(path)


def atomic_text_write(path: Path, value: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile("w", encoding="utf-8", delete=False, dir=path.parent) as handle:
        handle.write(value)
        temp_path = Path(handle.name)
    temp_path.replace(path)


def load_json(path: Path, default: Any) -> Any:
    if not path.exists():
        return default
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return default


def paper_key(paper: dict[str, Any]) -> str:
    match = re.search(r"/(\d{4}\.\d+(?:v\d+)?)", paper.get("pdf_link", ""))
    if match:
        return match.group(1).replace(".", "_")
    normalized = re.sub(r"[^a-z0-9]+", "_", paper["title"].lower()).strip("_")
    return normalized[:48]


def default_record(paper: dict[str, Any]) -> dict[str, Any]:
    key = paper_key(paper)
    return {
        "id": key,
        "filename": f"post_{key}.md",
        "status": "pending",
        "attempts": 0,
        "next_retry_at": now_iso(),
        "last_error": None,
        "updated_at": now_iso(),
        "paper": paper,
    }


def migrate_existing_posts(state: dict[str, Any]) -> None:
    """Seed persistent state from content that existed before this pipeline."""
    for item in load_json(METADATA_PATH, []):
        filename = item.get("filename")
        if not filename or not (CONTENT_DIR / filename).exists():
            continue
        existing = next(
            (record for record in state["papers"].values() if record.get("filename") == filename),
            None,
        )
        if existing:
            continue
        key = item.get("id", filename.removesuffix(".md"))
        state["papers"][key] = {
            "id": key,
            "filename": filename,
            "status": "published",
            "attempts": 0,
            "next_retry_at": None,
            "last_error": None,
            "updated_at": now_iso(),
            "paper": {
                "title": item.get("original_title", item.get("korean_title", key)),
                "authors": item.get("authors", []),
                "published": item.get("published", ""),
                "pdf_link": "",
            },
        }


def load_state() -> dict[str, Any]:
    state = load_json(STATE_PATH, {"version": 1, "papers": {}})
    state.setdefault("version", 1)
    state.setdefault("papers", {})
    migrate_existing_posts(state)
    return state


def retry_due(record: dict[str, Any], now: datetime) -> bool:
    if record.get("status") == "pending":
        return True
    if record.get("status") != "retry":
        return False
    retry_at = record.get("next_retry_at")
    if not retry_at:
        return True
    return datetime.fromisoformat(retry_at) <= now


def merge_discovery(state: dict[str, Any], papers: list[dict[str, Any]]) -> None:
    existing_titles = {
        record.get("paper", {}).get("title"): record
        for record in state["papers"].values()
        if record.get("paper", {}).get("title")
    }
    for paper in papers:
        key = paper_key(paper)
        record = state["papers"].get(key) or existing_titles.get(paper["title"])
        if record is None:
            state["papers"][key] = default_record(paper)
            continue
        record["paper"] = paper
        record["updated_at"] = now_iso()
        state["papers"][record["id"]] = record


def select_work(state: dict[str, Any]) -> list[dict[str, Any]]:
    now = datetime.now(timezone.utc)
    candidates = [record for record in state["papers"].values() if retry_due(record, now)]
    candidates.sort(key=lambda record: record.get("paper", {}).get("published", ""), reverse=True)
    return candidates[:BATCH_SIZE]


def compact_text(text: str, max_chars: int) -> str:
    if len(text) <= max_chars:
        return text
    opening = int(max_chars * 0.75)
    closing = max_chars - opening
    return text[:opening] + "\n\n[중간 원문 생략]\n\n" + text[-closing:]


def download_pdf_text(paper: dict[str, Any]) -> str:
    url = paper["pdf_link"]
    if not url.endswith(".pdf"):
        url += ".pdf"
    request = Request(url, headers={"User-Agent": "arxiv-translator/1.0"})
    with urlopen(request, timeout=30) as response:
        payload = response.read()
    with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as handle:
        handle.write(payload)
        pdf_path = Path(handle.name)
    try:
        reader = PdfReader(str(pdf_path))
        return "\n".join(page.extract_text() or "" for page in reader.pages)
    finally:
        pdf_path.unlink(missing_ok=True)


def prompt_for(paper: dict[str, Any], paper_text: str) -> str:
    return f"""너는 신뢰할 수 있는 AI 연구 해설자다. 아래 arXiv 논문 발췌만을 근거로 한국어 Markdown 해설을 작성해라. 원문에 없는 실험 수치나 주장을 만들지 마라.

출력의 첫 줄은 반드시 이 논문의 핵심을 45자 이내 한국어 제목으로 쓴 `# 제목` 형식이어야 한다. 인사말, 역할 소개, 요청을 받았다는 말은 절대 쓰지 마라.

반드시 다음 H2 섹션을 포함해라:
## ✨ 3줄 핵심 요약
## 📖 쉽게 풀어쓴 1분 핵심
## 🎯 배경 및 문제점
## 💡 핵심 기술 및 아키텍처
## 📊 실험 결과 분석
## 🌍 세상에 미치는 영향 & 실무 적용 사례

각 섹션은 짧고 구체적으로 작성하고, 수치가 원문 발췌에 없으면 그 사실을 밝혀라.

논문 정보
- 제목: {paper['title']}
- 저자: {', '.join(paper['authors'])}
- 발행일: {paper['published'][:10]}
- PDF: {paper['pdf_link']}

논문 발췌
{paper_text}
"""


def validate_markdown(markdown: str) -> None:
    title = markdown.lstrip().splitlines()[0] if markdown.strip() else ""
    if not title.startswith("# ") or len(title.removeprefix("# ").strip()) < 4:
        raise ValueError("generated Markdown is missing a usable H1 title")
    missing = [section for section in REQUIRED_SECTIONS if section not in markdown]
    if missing:
        raise ValueError(f"missing required sections: {', '.join(missing)}")
    if len(markdown.strip()) < 800:
        raise ValueError("generated Markdown is too short")


def generate_markdown(paper: dict[str, Any], full_text: str) -> str:
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not configured")
    client = genai.Client(api_key=api_key)
    attempts = ((PRIMARY_INPUT_CHARS, 2048), (FALLBACK_INPUT_CHARS, 1024))
    errors: list[str] = []

    for chars, output_tokens in attempts:
        def timeout_handler(signum: int, frame: Any) -> None:
            raise TimeoutError("Gemini request exceeded 90 seconds")

        signal.signal(signal.SIGALRM, timeout_handler)
        signal.alarm(REQUEST_TIMEOUT_SECONDS)
        try:
            response = client.models.generate_content(
                model=MODEL,
                contents=prompt_for(paper, compact_text(full_text, chars)),
                config=types.GenerateContentConfig(
                    max_output_tokens=output_tokens,
                ),
            )
            markdown = response.text
            validate_markdown(markdown)
            return markdown
        except Exception as error:  # preserve both attempts in the persistent queue
            errors.append(str(error))
        finally:
            signal.alarm(0)
    raise RuntimeError(" | ".join(errors))


def retry_at(attempts: int) -> str:
    minutes = min(24 * 60, 30 * (2 ** max(0, attempts - 1)))
    return (datetime.now(timezone.utc) + timedelta(minutes=minutes)).isoformat()


def rebuild_metadata(state: dict[str, Any]) -> None:
    items = []
    for record in state["papers"].values():
        if record.get("status") != "published":
            continue
        if not (CONTENT_DIR / record["filename"]).exists():
            continue
        paper = record["paper"]
        items.append({
            "id": record["id"],
            "filename": record["filename"],
            "original_title": paper["title"],
            "korean_title": record.get("korean_title", paper["title"]),
            "published": paper.get("published", "")[:10],
            "authors": paper.get("authors", [])[:2],
            "tags": ["AI", "arXiv", "Korean summary"],
        })
    items.sort(key=lambda item: item.get("published", ""), reverse=True)
    atomic_json_write(METADATA_PATH, items)


def run() -> dict[str, Any]:
    state = load_state()
    discovered = fetch_latest_cs_ai_papers(max_results=DISCOVERY_LIMIT)
    merge_discovery(state, discovered)
    work = select_work(state)
    report = {"started_at": now_iso(), "discovered": len(discovered), "selected": len(work), "generated": 0, "failed": 0, "skipped": 0, "health": "healthy", "failures": []}

    for record in work:
        paper = record["paper"]
        try:
            source_text = download_pdf_text(paper)
            markdown = generate_markdown(paper, source_text)
            filename = record["filename"]
            atomic_text_write(CONTENT_DIR / filename, markdown)
            record.update({
                "status": "published",
                "attempts": 0,
                "next_retry_at": None,
                "last_error": None,
                "updated_at": now_iso(),
                "korean_title": markdown.lstrip().splitlines()[0].removeprefix("# ").strip(),
            })
            report["generated"] += 1
        except Exception as error:
            record["attempts"] = int(record.get("attempts", 0)) + 1
            record.update({
                "status": "retry",
                "last_error": str(error)[:1000],
                "next_retry_at": retry_at(record["attempts"]),
                "updated_at": now_iso(),
            })
            report["failed"] += 1
            report["failures"].append({"id": record["id"], "error": record["last_error"]})

    rebuild_metadata(state)
    report["finished_at"] = now_iso()
    if report["selected"] and report["failed"] == report["selected"]:
        report["health"] = "degraded"
    state["last_run"] = report
    atomic_json_write(STATE_PATH, state)
    atomic_json_write(STATUS_PATH, {
        "last_run": report,
        "published_count": len(load_json(METADATA_PATH, [])),
        "retry_count": sum(record.get("status") == "retry" for record in state["papers"].values()),
    })
    print("Pipeline summary:", json.dumps(report, ensure_ascii=False))
    return report


def bootstrap_existing_content() -> None:
    """Create durable state for the posts that predate the queue pipeline."""
    state = load_state()
    rebuild_metadata(state)
    report = {
        "started_at": now_iso(),
        "finished_at": now_iso(),
        "discovered": 0,
        "selected": 0,
        "generated": 0,
        "failed": 0,
        "skipped": 0,
        "health": "healthy",
        "failures": [],
        "message": "Migrated existing published content into pipeline state.",
    }
    state["last_run"] = report
    atomic_json_write(STATE_PATH, state)
    atomic_json_write(STATUS_PATH, {
        "last_run": report,
        "published_count": len(load_json(METADATA_PATH, [])),
        "retry_count": 0,
    })


if __name__ == "__main__":
    import sys

    if "--bootstrap" in sys.argv:
        bootstrap_existing_content()
    else:
        run()
