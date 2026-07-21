# [AI 번역 뼈대 완성] Logical Judgments Under Pressure: Diagnosing Syllogistic Stability with Learned Soft Prefixes

> **⚠️ API 키 미설정 알림**
> 현재 `GEMINI_API_KEY`가 환경변수에 없어 AI 번역이 생략되었습니다. 하지만 **PDF 파싱 파이프라인은 완벽하게 작동 중**입니다! 
> 아래에서 실제로 다운로드 및 추출된 PDF 원문 텍스트의 앞부분을 확인하실 수 있습니다.

## 📄 논문 정보
- **원문 제목**: Logical Judgments Under Pressure: Diagnosing Syllogistic Stability with Learned Soft Prefixes
- **저자**: Brian K Chen
- **발행일**: 2026-07-20
- **[PDF 원문 보기](https://arxiv.org/pdf/2607.18228v1)**

---

## 🛠 추출된 PDF 원문 텍스트 (미리보기)

```text
Logical Judgments Under Pressure: Diagnosing Syllogistic Stability  with Learned Soft Prefixes  Brian K Chen  National University of Singapore  e0694208@u.nus.edu  Abstract  To test how correct logical judgments respond to learned context, we prepend a soft prefix to  an exactly labeled syllogistic reasoning benchmark while keeping the model fixed. Soft prefixes  are opaque continuous vectors, so we characterize them through the behavior they induce across  controlled variations in logical form and interface. By studying which prefixes succeed and how  their effects generalize, we characterize how learned contextual pressure can override correct  judgments and expose limits in a model’s logical stability. Across Qwen3.6-35B-A3B MoE,  Qwen3-8B, and Gemma 4 31B, learned prefixes redirect many correct answers and remain  effective across unseen forms and interface changes. In repeated tests with Qwen3.6 MoE and  Gemma, they outperform paired random controls in all 16 model–direction–split comparisons b... (중략) ...
```

## 🚀 다음 단계 가이드
터미널에서 다음 명령어로 Gemini API 키를 등록하고 스크립트를 다시 실행하시면, 
이 거대한 PDF 텍스트가 **완벽한 한국어 튜토리얼 블로그 글**로 변환됩니다!

```bash
export GEMINI_API_KEY="당신의_API_키"
python3 process_content.py
```
