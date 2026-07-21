# [AI 번역 뼈대 완성] PEARL: Auditable Repair for Scientific Reasoning Graph Extraction

> **⚠️ API 키 미설정 알림**
> 현재 `GEMINI_API_KEY`가 환경변수에 없어 AI 번역이 생략되었습니다. 하지만 **PDF 파싱 파이프라인은 완벽하게 작동 중**입니다! 
> 아래에서 실제로 다운로드 및 추출된 PDF 원문 텍스트의 앞부분을 확인하실 수 있습니다.

## 📄 논문 정보
- **원문 제목**: PEARL: Auditable Repair for Scientific Reasoning Graph Extraction
- **저자**: Bohan Su, Pengze Li, Yuchen Lu, Xi Chen
- **발행일**: 2026-07-20
- **[PDF 원문 보기](https://arxiv.org/pdf/2607.17917v1)**

---

## 🛠 추출된 PDF 원문 텍스트 (미리보기)

```text
PEARL: Auditable Repair for Scientific  Reasoning Graph Extraction  Bohan Su1,*, Pengze Li2,*, Yuchen Lu3, and Xi Chen4,†  1 School of Computer Science, Wuhan University  bohansu@whu.edu.cn  2 Artificial Intelligence Innovation and Incubation, Fudan University  lipz25@m.fudan.edu.cn  3 Department of Computer Science, Faculty of Science, University of Bath  yl4002@bath.ac.uk  4 College of Computer Science and Artificial Intelligence, Fudan University  x_chen@fudan.edu.cn  *Equal contribution. †Corresponding author.  Abstract.Scientific Reasoning Graph Extraction (SRGE) aims to re-  cover explicit links among observations, evidence, intermediate claims,  and paper-level conclusions. LLMs can produce graph-like scientific ex-  planations, but their outputs often mix malformed syntax, drifting edge  labels, incorrectly oriented roots, and weak source anchors. We pro-  pose PEARL (Peircean Extraction via Abstraction and Repair Layer),  a training-free framework that turns noisy LLM graph responses into  audit... (중략) ...
```

## 🚀 다음 단계 가이드
터미널에서 다음 명령어로 Gemini API 키를 등록하고 스크립트를 다시 실행하시면, 
이 거대한 PDF 텍스트가 **완벽한 한국어 튜토리얼 블로그 글**로 변환됩니다!

```bash
export GEMINI_API_KEY="당신의_API_키"
python3 process_content.py
```
