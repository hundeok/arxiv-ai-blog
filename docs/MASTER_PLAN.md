# ArXiv Research Desk 운영 마스터플랜

> 마지막 갱신: 2026-08-16 · 운영 주소: https://arxiv-ai-blog.vercel.app
> 이 문서는 제품의 의사결정 기준과 인수인계 기준점이다. 새 작업은 이 문서의 단계, 데이터 계약, 완료 조건을 먼저 확인한다.

## 1. 제품 목표와 고정 원칙

**목표**는 최신 AI 연구를 한국어 독자가 탐색·이해·재방문할 수 있는 신뢰 가능한 연구 데스크로 만드는 것이다. 단순 자동 번역 카드 모음이나 논문 대량 게시 사이트가 목표가 아니다.

- 공개된 글은 삭제하지 않는다. 아카이브는 누적 자산이며 최신 글이 항상 먼저 보인다.
- 새 AI 호출은 발행 작업에만 쓴다. 선정·품질·인사이트 계산은 우선 결정론적 내부 알고리즘으로 수행한다.
- 실패한 논문은 버리지 않고 `retry` 또는 `review` 상태로 남긴다.
- 비용·품질·성과 중 하나를 위해 나머지 둘을 무너뜨리지 않는다. 자동화에는 예산 상한과 검증 기준이 있어야 한다.
- 외부 API 비밀값과 개인 식별 정보는 저장소, Markdown, 정적 JSON에 절대 넣지 않는다.

## 2. 2026-08-16 기준선

| 항목 | 현재 상태 | 의미 |
| --- | --- | --- |
| 공개 아카이브 | 약 654개 글 | 유지·누적 대상 |
| 발행 주기 | 3시간 | GitHub Actions가 생성·커밋, Vercel이 배포 |
| 생성 비용 | 응답 토큰 기준 추정치 | 실제 청구서는 Google AI Studio가 기준 |
| 측정 | GA4 `G-V4G2FBSDMG`, Search Console, Vercel Analytics | GA4 이벤트는 연결 확인 완료 |
| 검색 | sitemap-index.xml 제출, 일부 색인 진행 | 색인·클릭은 시간이 필요한 운영 지표 |
| 광고 | AdSense “가치가 별로 없는 콘텐츠” 반려 | 신뢰·독창성·탐색성을 먼저 보강 |

## 3. 현재 아키텍처와 진실의 원천

```text
arXiv 발견 → pipeline-state.json 큐 → PDF 발췌 → Gemini 발행 → Markdown
                                  ↓                         ↓
                         retry / review 상태          metadata.json + 정적 SEO 페이지
                                                            ↓
React Research Desk / Archive Mode ← pipeline-status.json · 품질/인사이트 JSON
                                                            ↓
GA4 · Search Console · Vercel Analytics (향후 성과 입력)
```

- **콘텐츠 원본:** `frontend/public/content/post_*.md`
- **발행 큐와 비용 원장:** `frontend/public/content/pipeline-state.json`
- **화면용 목록:** `frontend/public/content/metadata.json`
- **상태 카드:** `frontend/public/content/pipeline-status.json`
- **생성 코드:** `backend/pipeline.py`
- **프런트엔드:** `frontend/src/`

세부 파일·JSON 계약·복구 절차는 [ARCHITECTURE.md](ARCHITECTURE.md), 일상 점검은 [OPERATIONS_RUNBOOK.md](OPERATIONS_RUNBOOK.md)를 따른다.

## 4. 단계별 로드맵

### Step 1 — 신뢰·품질 기반 (현재)

목표: 자동 생성량과 별개로 사이트가 편집 기준을 갖고 있음을 증명한다.

- 기존·신규 Markdown을 새 호출 없이 점검하는 결정론적 품질 보고서와 편집 후보 목록 생성
- 소개·AI/저작권·개인정보·문의 페이지를 실제 운영 기준으로 정비
- 발행 품질 기준, 정정/삭제 요청 처리 기준, 재검토 대상을 문서화
- AdSense 재신청 전 체크리스트 마련

**완료 조건:** 품질 JSON이 재생성 가능하고, 공개 신뢰 페이지에 운영 목적·AI 역할·원문 출처·정정 경로가 있으며, 공개 이메일만 남으면 재신청 준비가 되는 상태.

### Step 2 — 내부 인사이트·선정 엔진

목표: 토큰 없이 ‘무엇을 먼저 보여줄지’를 설명 가능한 점수로 결정한다.

- `insights.json`: 주제 분포, 최근 흐름, 아카이브 건강도, 큐 위험 신호
- `editorial-candidates.json`: 수동 심화 해설 후보. 버리는 목록이 아니라 우선순위 목록
- 점수: 최신성·주제 다양성·실무성 키워드·본문 충실도·최근 과대표집 패널티
- 프런트 메뉴 “인사이트”와 “핵심 해설”을 추가하되 아카이브 모드는 보존

**완료 조건:** 같은 입력에는 같은 결과, 각 점수 사유를 JSON으로 확인 가능, 모델/API 호출 0회.

### Step 3 — 독창성·SEO 운영 루프

목표: 자동 해설을 출발점으로 삼고 사람이 선택한 깊은 콘텐츠를 만든다.

- 후보 중 주제별 3~5개를 운영자가 직접 검토해 비교·의미·한계를 보강
- 주제 허브, 관련 논문 연결, 읽기 경로, 내부 링크 개선
- Search Console의 색인율·노출·CTR을 2~4주 단위로 기록하고 제목/설명 개선

**완료 조건:** 반복 템플릿이 아닌 편집된 핵심 글과 주제별 진입점이 있고, 성과 변화가 기록된다.

### Step 4 — 성과 피드백 자동화 (Google API 권한 필요)

목표: 인기·검색·체류 신호를 다음 선정 우선순위에 안전하게 반영한다.

- GA4 Data API와 Search Console Search Analytics API를 GitHub Actions에서 일 1회 읽기
- 원천 응답은 비공개 운영 산출물로 최소 보관, 공개 JSON에는 집계값만 노출
- 성과 점수는 발행 차단이 아닌 후보 우선순위 가중치로만 사용

**완료 조건:** 자격 증명은 GitHub Secret에만 존재하고, 데이터 결측 시 내부 점수만으로 정상 동작하며, 알고리즘 버전·수집 시각이 남는다.

### Step 5 — 수익화·운영 안전망

목표: 사용자 경험을 해치지 않는 상태에서 AdSense 재검토와 장애 알림을 운영한다.

- 실제 공개 문의 수단, 정정/권리 처리 SLA, 신뢰 페이지 최종 검수
- AdSense 재신청 전 독창 콘텐츠·탐색성·모바일 UX·정책 고지 확인
- 0건 발행, 재시도 누적, 일일 예산 근접, 배포 실패를 Telegram 등 운영 채널로 알림

**완료 조건:** 광고 코드가 콘텐츠보다 앞서지 않고, 문제는 사람이 매일 확인하기 전에 알림으로 드러난다.

## 5. GA4/Search Console 연동 준비물

브라우저 로그인만으로 자동 수집은 할 수 없다. Step 4에서 아래 권한을 **한 번** 설정한다.

1. 운영자 Google Cloud 프로젝트에서 **Google Analytics Data API**와 **Google Search Console API**를 활성화한다.
2. 서비스 계정을 만들고 JSON 키를 발급한다.
3. 해당 서비스 계정 이메일을 GA4 속성(읽기 권한)과 Search Console 속성 `https://arxiv-ai-blog.vercel.app/`(Full user)에 추가한다.
4. JSON 전문을 GitHub Actions Secret `GOOGLE_REPORTING_SERVICE_ACCOUNT_JSON`으로 등록한다. 저장소·Vercel·프런트엔드에는 넣지 않는다.
5. 파이프라인은 GA4의 `pagePath`, `screenPageViews`, `engagementRate`와 Search Console의 `page`, `query`, `clicks`, `impressions`, `ctr`, `position`만 최소 조회한다.

수집 실패 또는 권한 철회는 발행 실패가 아니다. 마지막 정상 집계와 내부 점수를 사용하며 상태에 경고만 기록한다.

## 6. 의사결정 규칙

- 발행량을 늘리기 전에 최근 7일의 성공률, 재시도 수, 예산 대비 추정 비용을 확인한다.
- 성과가 낮은 논문을 삭제하지 않는다. 탐색 노출 우선순위만 조정한다.
- 모델명·영문 고유명사만을 이유로 콘텐츠를 무조건 탈락시키지 않는다. 제목/부제/필수 섹션/근거성의 균형을 점검한다.
- 품질 점수는 편집 우선순위 신호이지 연구의 학술적 가치 판정이 아니다.
- AdSense 재신청은 최소 2~4주간의 신뢰 페이지·핵심 편집 콘텐츠·정상 탐색 경험을 확인한 뒤 결정한다.

## 7. 인수인계 시작 순서

1. `git status --short`로 사용자 작업을 먼저 분리한다.
2. `backend/test_pipeline.py`와 `npm --prefix frontend run build`를 실행한다.
3. `pipeline-status.json`, `quality-report.json`, 최근 Actions 실행을 읽는다.
4. 이 문서의 현재 Step 완료 조건과 변경 요청을 비교한다.
5. 코드·JSON 스키마를 바꾸면 [ARCHITECTURE.md](ARCHITECTURE.md)와 이 문서의 기준선을 함께 갱신한다.
