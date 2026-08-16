import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import pipeline


class PipelineUnitTests(unittest.TestCase):
    def test_compact_text_keeps_beginning_and_end(self):
        text = "A" * 100 + "MIDDLE" * 100 + "Z" * 100
        compact = pipeline.compact_text(text, 200)
        self.assertTrue(compact.startswith("A"))
        self.assertTrue(compact.endswith("Z"))
        self.assertIn("Introduction 끝", compact)
        self.assertIn("Methodology 끝", compact)

    def test_markdown_validation_requires_structure(self):
        valid = "# 검증 가능한 한국어 제목\n\n" + "\n".join(f"## {section}\n" + "내용 " * 100 for section in pipeline.REQUIRED_SECTIONS)
        pipeline.validate_markdown(valid)
        with self.assertRaises(ValueError):
            pipeline.validate_markdown("## ✨ 3줄 핵심 요약\n짧은 글")

    def test_paper_key_uses_arxiv_identifier(self):
        self.assertEqual(
            pipeline.paper_key({"pdf_link": "https://arxiv.org/pdf/2607.18228v1.pdf", "title": "Ignored"}),
            "2607_18228v1",
        )

    def test_title_validation_rejects_english_fallback(self):
        self.assertTrue(pipeline.is_korean_title("긴 문맥 추론을 개선하는 AI 기법"))
        self.assertFalse(pipeline.is_korean_title("A Long English Research Paper Title"))
        # Proper nouns may remain when the Korean title itself is meaningful.
        self.assertTrue(pipeline.is_korean_title("Appearance Pointers: 확산 모델 영역 제어"))

    def test_usage_estimation_accumulates(self):
        total = pipeline.empty_usage()
        pipeline.add_usage(total, {"model": "test", "requests": 1, "prompt_tokens": 1_000_000, "output_tokens": 1_000_000, "thought_tokens": 0, "total_tokens": 2_000_000, "estimated_usd": 1.75})
        self.assertEqual(total["requests"], 1)
        self.assertEqual(total["estimated_usd"], 1.75)

    def test_metadata_order_prefers_full_arxiv_timestamp(self):
        newer = {"id": "new", "filename": "new.md", "status": "published", "paper": {"published": "2026-07-21T18:00:00+00:00"}}
        older = {"id": "old", "filename": "old.md", "status": "published", "paper": {"published": "2026-07-21T10:00:00+00:00"}}
        self.assertEqual(sorted([older, newer], key=lambda record: (record["paper"]["published"], record["id"]), reverse=True)[0]["id"], "new")

    def test_discovery_never_prunes_published_archive(self):
        state = {"papers": {"kept": {"id": "kept", "status": "published", "paper": {"title": "Archived", "published": "2026-01-01"}}}}
        pipeline.merge_discovery(state, [])
        self.assertIn("kept", state["papers"])

    def test_static_pages_include_same_analytics_events_as_spa(self):
        tag = pipeline.static_analytics_tag("/papers/2607_20379v1", "2607_20379v1")
        self.assertIn("G-V4G2FBSDMG", tag)
        self.assertIn("'page_view'", tag)
        self.assertIn("'paper_view'", tag)
        self.assertIn('"paper_id": "2607_20379v1"', tag)

    def test_paper_classifier_prefers_reader_useful_topics(self):
        tags = pipeline.classify_paper(
            {"title": "Efficient multi-agent retrieval for LLM reasoning"},
            {"korean_title": "언어 모델 에이전트의 검색 기반 추론"},
        )
        self.assertEqual(tags, ["AI 에이전트", "대규모 언어 모델", "검색 증강"])

    def test_quality_audit_is_deterministic_and_does_not_need_a_model(self):
        source = "# 제목\n\n> **원본 논문 정보**\n\n" + "\n".join(
            f"## {section}\n" + "내용 " * 100 for section in pipeline.REQUIRED_SECTIONS
        )
        quality = pipeline.assess_content_quality(
            {"korean_title": "검증 가능한 한국어 제목", "korean_subtitle": "연구의 문제와 해결 방법을 쉽게 설명하는 짧은 한국어 문장입니다."},
            source,
        )
        self.assertEqual(quality["status"], "ready")
        self.assertEqual(quality["algorithm_version"], "quality-v1")
        self.assertTrue(quality["checks"]["required_sections"])

    def test_editorial_candidates_preserve_topic_diversity(self):
        items = [
            {"id": str(index), "topic": "AI 에이전트" if index < 4 else "추론", "korean_title": "한국어 제목", "published": "2026-08-16", "quality": {"status": "ready", "score": 90}}
            for index in range(8)
        ]
        candidates = pipeline.select_editorial_candidates(items)
        self.assertEqual(len([item for item in candidates if item["topic"] == "AI 에이전트"]), 3)
        self.assertEqual(len([item for item in candidates if item["topic"] == "추론"]), 3)


if __name__ == "__main__":
    unittest.main()
