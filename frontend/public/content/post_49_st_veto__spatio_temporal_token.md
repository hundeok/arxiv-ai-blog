# [AI 번역 뼈대 완성] ST-Veto: Spatio-Temporal Token Veto for Diffusion MLLMs via Taylor Prediction and Visual Grounding

> **⚠️ API 키 미설정 알림**
> 현재 `GEMINI_API_KEY`가 환경변수에 없어 AI 번역이 생략되었습니다. 하지만 **PDF 파싱 파이프라인은 완벽하게 작동 중**입니다! 
> 아래에서 실제로 다운로드 및 추출된 PDF 원문 텍스트의 앞부분을 확인하실 수 있습니다.

## 📄 논문 정보
- **원문 제목**: ST-Veto: Spatio-Temporal Token Veto for Diffusion MLLMs via Taylor Prediction and Visual Grounding
- **저자**: Keuntae Kim, Beomseok Lee, Hyunwoo Kim, Yong Suk Choi
- **발행일**: 2026-07-20
- **[PDF 원문 보기](https://arxiv.org/pdf/2607.17884v1)**

---

## 🛠 추출된 PDF 원문 텍스트 (미리보기)

```text
ST-Veto: Spatio-Temporal Token Veto for Diffusion MLLMs  via Taylor Prediction and Visual Grounding  Keuntae Kim 1 * Beomseok Lee 2 * Hyunwoo Kim 3 * Yong Suk Choi1†  Abstract  Vision Language Models (VLMs) achieve strong  reasoning with Chain-of-Thought (CoT) prompt-  ing but incur high sequential-generation cost, er-  ror accumulation, and limited self-correction. Dif-  fusion Multimodal Large Language Models (dM-  LLMs) unmask tokens in an order-agnostic pro-  cess, improving efficiency and enabling itera-  tive refinement, yet their reasoning and how to  enhance it remain underexplored. We propose  a training-free method, Spatio-Temporal Token  Veto (ST-Veto), which leverages the ability to ob-  serve all token positions at each diffusion step.  Rather than relying only on current-step confi-  dence, ST-Veto vetoes temporally unstable tokens  via second-order Taylor prediction of confidence  dynamics and filters weakly grounded tokens us-  ing image-attention mass, swapping them with  safer candidates.... (중략) ...
```

## 🚀 다음 단계 가이드
터미널에서 다음 명령어로 Gemini API 키를 등록하고 스크립트를 다시 실행하시면, 
이 거대한 PDF 텍스트가 **완벽한 한국어 튜토리얼 블로그 글**로 변환됩니다!

```bash
export GEMINI_API_KEY="당신의_API_키"
python3 process_content.py
```
