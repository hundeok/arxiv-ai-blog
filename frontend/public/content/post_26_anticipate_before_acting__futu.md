# [AI 번역 뼈대 완성] Anticipate Before Acting: Future-State-Conditioned Vision-Language Navigation

> **⚠️ API 키 미설정 알림**
> 현재 `GEMINI_API_KEY`가 환경변수에 없어 AI 번역이 생략되었습니다. 하지만 **PDF 파싱 파이프라인은 완벽하게 작동 중**입니다! 
> 아래에서 실제로 다운로드 및 추출된 PDF 원문 텍스트의 앞부분을 확인하실 수 있습니다.

## 📄 논문 정보
- **원문 제목**: Anticipate Before Acting: Future-State-Conditioned Vision-Language Navigation
- **저자**: Lingfeng Zhang, Zhanguang Zhang, Liheng Ma, Tongtong Cao, Yingxue Zhang
- **발행일**: 2026-07-20
- **[PDF 원문 보기](https://arxiv.org/pdf/2607.18042v1)**

---

## 🛠 추출된 PDF 원문 텍스트 (미리보기)

```text
Anticipate Before Acting: Future-State-Conditioned  Vision-Language Navigation  Lingfeng Zhang ∗  Noah’s Ark Lab, 2012 Labs, Huawei  Zhanguang Zhang  Noah’s Ark Lab, 2012 Labs, Huawei  Liheng Ma  Noah’s Ark Lab, 2012 Labs, Huawei  Tongtong Cao  Department of Foundation model, 2012 Labs, Huawei  Yingxue Zhang  Noah’s Ark Lab, 2012 Labs, Huawei  Abstract  End-to-end vision-language navigation (VLN) with causal vision-language models  can map instructions and egocentric observations directly to actions, but standard  behavior cloning supervises only the next action and does not explicitly train the  policy state to be predictive of future visual outcomes. We first ask a diagnostic  question: if the policy is given anexpert-trajectory future imageas privileged  input at training and testing time, is that additional visual evidence useful for  choosing the current action? (These expert-trajectory future images are unavailable  at test time in real deployment, so we use this setting only as a privileged-input  d... (중략) ...
```

## 🚀 다음 단계 가이드
터미널에서 다음 명령어로 Gemini API 키를 등록하고 스크립트를 다시 실행하시면, 
이 거대한 PDF 텍스트가 **완벽한 한국어 튜토리얼 블로그 글**로 변환됩니다!

```bash
export GEMINI_API_KEY="당신의_API_키"
python3 process_content.py
```
