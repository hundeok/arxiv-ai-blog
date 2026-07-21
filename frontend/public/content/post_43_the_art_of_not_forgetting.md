# [AI 번역 뼈대 완성] The Art of Not Forgetting

> **⚠️ API 키 미설정 알림**
> 현재 `GEMINI_API_KEY`가 환경변수에 없어 AI 번역이 생략되었습니다. 하지만 **PDF 파싱 파이프라인은 완벽하게 작동 중**입니다! 
> 아래에서 실제로 다운로드 및 추출된 PDF 원문 텍스트의 앞부분을 확인하실 수 있습니다.

## 📄 논문 정보
- **원문 제목**: The Art of Not Forgetting
- **저자**: Ashmith Atmuri, Akshay Kumar, Yashaswini Rao Bhogarajula
- **발행일**: 2026-07-20
- **[PDF 원문 보기](https://arxiv.org/pdf/2607.17944v1)**

---

## 🛠 추출된 PDF 원문 텍스트 (미리보기)

```text
The Art of Not Forgetting  Ashmith Atmuri∗ Akshay Kumar  Yashaswini Rao Bhogarajula  Arkadhi Labs  ∗Corresponding author:founder@arkadhi.com  ak@arkadhi.com yashaswini.rao@arkadhi.com  Abstract  We introduce CMP (Cognitive Memory Primitive), an architecture that represents inputs as  sparse relational codes, stores them in a two-tier competitive memory, and learns entirely  through local, gradient-free updates, with no backpropagation anywhere in the network. We  use this architecture to test a specific hypothesis: that catastrophic forgetting, usually treated  as a training-time defect to be patched with replay or regularization, is instead a structural  consequence of how backpropagation assigns credit, and that a learning rule which is local and  sparse by construction should resist it without a patch. On a controlled domain-incremental  protocol across 15 text domains, three-seed replicated, CMP’s backward transfer is 15–19×  better than a matched-size Transformer trained with online EWC, and the... (중략) ...
```

## 🚀 다음 단계 가이드
터미널에서 다음 명령어로 Gemini API 키를 등록하고 스크립트를 다시 실행하시면, 
이 거대한 PDF 텍스트가 **완벽한 한국어 튜토리얼 블로그 글**로 변환됩니다!

```bash
export GEMINI_API_KEY="당신의_API_키"
python3 process_content.py
```
