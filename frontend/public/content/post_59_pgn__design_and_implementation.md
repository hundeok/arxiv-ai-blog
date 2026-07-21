# [AI 번역 뼈대 완성] PGN: Design and Implementation of a Vision-Language Navigation System Based on Pangu Multimodal Foundation Model

> **⚠️ API 키 미설정 알림**
> 현재 `GEMINI_API_KEY`가 환경변수에 없어 AI 번역이 생략되었습니다. 하지만 **PDF 파싱 파이프라인은 완벽하게 작동 중**입니다! 
> 아래에서 실제로 다운로드 및 추출된 PDF 원문 텍스트의 앞부분을 확인하실 수 있습니다.

## 📄 논문 정보
- **원문 제목**: PGN: Design and Implementation of a Vision-Language Navigation System Based on Pangu Multimodal Foundation Model
- **저자**: Li Xian, Mingxi Li, Yizheng Wang, Yiming Shen, Qi Chen, Zhuoling Xiao
- **발행일**: 2026-07-20
- **[PDF 원문 보기](https://arxiv.org/pdf/2607.17806v1)**

---

## 🛠 추출된 PDF 원문 텍스트 (미리보기)

```text
PGN: Design and Implementation of a Vision-Language Navigation System Based  on Pangu Multimodal Foundation Model  Li Xian, Mingxi Li, Yizheng Wang, Yiming Shen, Qi Chen, Zhuoling Xiao*  School of Information and Communication Engineering  University of Electronic Science and Technology of China  *Corresponding author:zhuolingxiao@uestc.edu.cn  Abstract  Vision-Language Navigation (VLN) requires an embodied  agent to interpret a natural-language instruction and predict  actions from temporally ordered visual observations. Adapt-  ing a multimodal large language model to VLN requires  visual-language alignment, compact temporal inputs, action-  space grounding, and stable training on the target hardware.  This technical report presents PGN (Pangu Navigator), an  offline VLN action-prediction system built on OpenPangu-  7B. Training proceeds in two stages. First, PGMM aligns  a frozen EVA-ViT-G/14 vision encoder with the frozen lan-  guage backbone by training a Q-Former and a two-layer  MLP projector. Se... (중략) ...
```

## 🚀 다음 단계 가이드
터미널에서 다음 명령어로 Gemini API 키를 등록하고 스크립트를 다시 실행하시면, 
이 거대한 PDF 텍스트가 **완벽한 한국어 튜토리얼 블로그 글**로 변환됩니다!

```bash
export GEMINI_API_KEY="당신의_API_키"
python3 process_content.py
```
