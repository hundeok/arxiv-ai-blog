# [AI 번역 뼈대 완성] Orbis 2: A Hierarchical World Model for Driving

> **⚠️ API 키 미설정 알림**
> 현재 `GEMINI_API_KEY`가 환경변수에 없어 AI 번역이 생략되었습니다. 하지만 **PDF 파싱 파이프라인은 완벽하게 작동 중**입니다! 
> 아래에서 실제로 다운로드 및 추출된 PDF 원문 텍스트의 앞부분을 확인하실 수 있습니다.

## 📄 논문 정보
- **원문 제목**: Orbis 2: A Hierarchical World Model for Driving
- **저자**: Sudhanshu Mittal, Arian Mousakhan, Silvio Galesso, Karim Farid, Jonannes Dienert, Rajat Sahay, Thomas Brox
- **발행일**: 2026-07-17
- **[PDF 원문 보기](https://arxiv.org/pdf/2607.15898v1)**

---

## 🛠 추출된 PDF 원문 텍스트 (미리보기)

```text
Orbis 2: A Hierarchical World Model for Driving  Sudhanshu Mittal∗ Arian Mousakhan∗ Silvio Galesso∗  Karim Farid Jonannes Dienert Rajat Sahay Thomas Brox  University of Freiburg, Germany  Abstract  Current world models operate at a single level of abstraction, with most prioritizing  perceptual fidelity while lacking the spatial reasoning and semantic understand-  ing required for real-world downstream tasks. We present a hierarchical driving  world model that factorizes future prediction across two levels operating at dis-  tinct temporal and abstraction scales: a high-level predictor that forecasts coarse  scene structure over extended temporal horizons, and a low-level generator that  produces detailed predictions conditioned on the high-level output. This decom-  position yields high perceptual fidelity while also capturing strong spatial and  semantic representations. We further show that pretraining with a diffusion forc-  ing objective yields substantially richer internal representations than... (중략) ...
```

## 🚀 다음 단계 가이드
터미널에서 다음 명령어로 Gemini API 키를 등록하고 스크립트를 다시 실행하시면, 
이 거대한 PDF 텍스트가 **완벽한 한국어 튜토리얼 블로그 글**로 변환됩니다!

```bash
export GEMINI_API_KEY="당신의_API_키"
python3 process_content.py
```
