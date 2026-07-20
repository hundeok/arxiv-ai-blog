# [AI 번역 뼈대 완성] An Exam for Active Observers

> **⚠️ API 키 미설정 알림**
> 현재 `GEMINI_API_KEY`가 환경변수에 없어 AI 번역이 생략되었습니다. 하지만 **PDF 파싱 파이프라인은 완벽하게 작동 중**입니다! 
> 아래에서 실제로 다운로드 및 추출된 PDF 원문 텍스트의 앞부분을 확인하실 수 있습니다.

## 📄 논문 정보
- **원문 제목**: An Exam for Active Observers
- **저자**: Jiarui Zhang, Muzi Tao, Shangshang Wang, Ollie Liu, Xuezhe Ma, Willie Neiswanger
- **발행일**: 2026-07-17
- **[PDF 원문 보기](https://arxiv.org/pdf/2607.16165v1)**

---

## 🛠 추출된 PDF 원문 텍스트 (미리보기)

```text
An Exam for Active Observers  Jiarui Zhang*, Muzi Tao*, Shangshang Wang*, Ollie Liu, Xuezhe Ma, Willie Neiswanger  University of Southern California  *Equal contribution  Human vision is a closed loop: gaze is continuously redirected by intermediate hypotheses rather than a  single snapshot. Decades of psychophysics and cognitive science have argued that thisactive observationis  essential for a wide range of tasks. Whether today’s multimodal large language models (MLLMs) exercise active  observation is an empirical question that current vision-language benchmarks do not answer. We introduce  ActiveVision, a benchmark that makes active observation measurable for MLLMs, comprising 17 tasks across  3 categories. Tasks are designed to force repeated visual perception rather than a single static description.  Frontier MLLMs collapse onActiveVision: the highest-scoring model we evaluate, GPT-5.5 at the highest  exposed reasoning-effort tier, solves only 10.6% of items and scores zero on 11 of the 17 t... (중략) ...
```

## 🚀 다음 단계 가이드
터미널에서 다음 명령어로 Gemini API 키를 등록하고 스크립트를 다시 실행하시면, 
이 거대한 PDF 텍스트가 **완벽한 한국어 튜토리얼 블로그 글**로 변환됩니다!

```bash
export GEMINI_API_KEY="당신의_API_키"
python3 process_content.py
```
