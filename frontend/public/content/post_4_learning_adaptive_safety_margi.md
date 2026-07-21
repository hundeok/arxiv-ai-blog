# [AI 번역 뼈대 완성] Learning Adaptive Safety Margins for Visual Navigation

> **⚠️ API 키 미설정 알림**
> 현재 `GEMINI_API_KEY`가 환경변수에 없어 AI 번역이 생략되었습니다. 하지만 **PDF 파싱 파이프라인은 완벽하게 작동 중**입니다! 
> 아래에서 실제로 다운로드 및 추출된 PDF 원문 텍스트의 앞부분을 확인하실 수 있습니다.

## 📄 논문 정보
- **원문 제목**: Learning Adaptive Safety Margins for Visual Navigation
- **저자**: Junyi Hu, Shuaihang Yuan, Geeta Chandra Raju Bethala, Anthony Tzes, Yi Fang
- **발행일**: 2026-07-20
- **[PDF 원문 보기](https://arxiv.org/pdf/2607.18200v1)**

---

## 🛠 추출된 PDF 원문 텍스트 (미리보기)

```text
Learning Adaptive Safety Margins for Visual Navigation  Junyi Hu 1,†, Shuaihang Yuan 1,†,‡, Geeta Chandra Raju Bethala 1, Anthony Tzes 1 and Yi Fang 1,∗  Abstract— Robots in cluttered indoor spaces often fail not  because they cannot generate collision-free paths, but because  a fixed safety margin is mis-calibrated: conservative margins  cause detours and timeouts, while permissive margins lead  to near-boundary shortcuts under perception bias. Diffusion-  based planners propose diverse trajectory candidates from  egocentric RGB-D, yet reliable selection remains the bottleneck.  We propose a context-conditioned safety critic that learns an  adaptive clearance preference for ranking diffusion proposals,  decomposed into three complementary terms: (i) a safety term  with a clearance-budget penalty and a control-barrier-function  residual for waypoint- and transition-wise safety, (ii) an effi-  ciency term combining a smoothness penalty with a safety-gated  detour-ratio penalty that avoids detours with... (중략) ...
```

## 🚀 다음 단계 가이드
터미널에서 다음 명령어로 Gemini API 키를 등록하고 스크립트를 다시 실행하시면, 
이 거대한 PDF 텍스트가 **완벽한 한국어 튜토리얼 블로그 글**로 변환됩니다!

```bash
export GEMINI_API_KEY="당신의_API_키"
python3 process_content.py
```
