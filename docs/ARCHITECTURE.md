# ArXiv Research Desk 아키텍처·데이터 계약

## 경계

| 계층 | 책임 | 금지 사항 |
| --- | --- | --- |
| `backend/pipeline.py` | 발견, 큐, 생성, 검증, 정적 산출물 | 브라우저/프런트 비밀값 노출 |
| `frontend/public/content/` | 발행된 정적 데이터 | API 키·서비스 계정·사용자 식별 정보 |
| `frontend/src/` | 탐색·읽기·상태 표시 | 비용/성과를 임의로 추정해 사실처럼 표시 |
| GitHub Actions | 시간 기반 생성·커밋 | Secret을 로그로 출력 |
| Vercel | 정적 배포·웹 분석 | Gemini 생성 키 보관 |

## 핵심 JSON

### `pipeline-state.json` (운영 원장)

`papers.{id}`는 `pending | retry | review | published` 상태, 시도 횟수, 다음 재시도 시각, 원 논문 정보, 카드 문구를 가진다. 이 파일을 직접 삭제/초기화하지 않는다. published 레코드는 발견 목록에서 사라져도 보존한다.

### `metadata.json` (프런트 목록)

각 항목에는 `id`, `filename`, `original_title`, `korean_title`, `korean_subtitle`, `published`, `authors`, `tags`, `topic`, `reading_minutes`가 있다. Step 1부터 UI용으로 작은 `quality.score`, `quality.status`를 추가한다. 상세 검사는 별도 보고서에만 둔다. 이것은 재생성 산출물이며 원본은 Markdown과 state다.

### `quality-report.json` (Step 1)

```json
{
  "algorithm_version": "quality-v1",
  "generated_at": "ISO-8601 UTC",
  "summary": {"total": 0, "ready": 0, "needs_review": 0},
  "items": [{"id": "...", "score": 0, "status": "ready", "checks": {}}]
}
```

`ready`는 독자용 게시물의 최소 구조가 충족됐다는 뜻이지, 학술적으로 참이라는 보증이 아니다. `needs_review`는 삭제·비공개가 아닌 편집 후보 상태다.

### `editorial-candidates.json` (Step 1)

최대 24개. 본문 충실도, 필수 구조, 최신성, 주제 균형을 기반으로 정렬한 **수동 심화 해설 후보**다. 성과 데이터가 생기면 Step 4에서 가중치를 더하지만, 낮은 점수의 글을 지우지는 않는다.

## 품질 규칙 v1

- H1 한국어 제목, 6개 필수 H2, 최소 본문 길이, 한국어 카드 부제목, 원문 정보 블록을 점검한다.
- 점수는 0~100, 실패 이유는 `checks`에 남긴다.
- 신규 발행의 강한 차단은 기존 `validate_markdown()`이 담당한다. 이 감사는 기존 데이터와 편집 우선순위를 안전하게 진단한다.
- 선정·품질 계산은 네트워크와 Gemini 호출 없이 재생성 가능해야 한다.

## 정적 SEO 산출물

`rebuild_metadata()`는 목록, 개별 정적 논문 페이지, `sitemap.xml`, `sitemap-index.xml`, `robots.txt`를 함께 갱신한다. Search Console에는 `sitemap-index.xml`만 제출한다. Sitemap 응답의 `Content-Type`과 XML 형식은 배포 후 반드시 확인한다.

## 향후 성과 입력 계약

비공개 `reporting-metrics.json` 또는 GitHub Actions artifact에는 날짜별 집계와 API 수집 상태만 남긴다. 공개 `insights.json`에는 개인·쿼리 원문을 넣지 않고 주제/문서 수준 집계만 쓴다.

```text
internal score = freshness + diversity + practical signals + quality
future score   = internal score + bounded search/engagement signal
```

성과 신호는 상한을 둔다. 우연히 바이럴된 글 하나가 모든 신규 주제를 밀어내면 안 된다.

## 비밀값 표준

| Secret | 위치 | 용도 |
| --- | --- | --- |
| `GEMINI_API_KEY` | GitHub Actions Secret | 발행 생성 전용 |
| `GOOGLE_REPORTING_SERVICE_ACCOUNT_JSON` | GitHub Actions Secret | GA4/GSC 읽기 전용 (Step 4) |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | GitHub Actions Secret | 장애/발행 알림 |

서비스 계정 키, GA4 API secret, OAuth refresh token은 어떤 경우에도 Git에 커밋하지 않는다.
