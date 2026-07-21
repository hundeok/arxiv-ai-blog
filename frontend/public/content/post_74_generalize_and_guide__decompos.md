# [AI 번역 뼈대 완성] Generalize and Guide: Decomposing Rewards for Few-Shot Inverse Reinforcement Learning

> **⚠️ API 키 미설정 알림**
> 현재 `GEMINI_API_KEY`가 환경변수에 없어 AI 번역이 생략되었습니다. 하지만 **PDF 파싱 파이프라인은 완벽하게 작동 중**입니다! 
> 아래에서 실제로 다운로드 및 추출된 PDF 원문 텍스트의 앞부분을 확인하실 수 있습니다.

## 📄 논문 정보
- **원문 제목**: Generalize and Guide: Decomposing Rewards for Few-Shot Inverse Reinforcement Learning
- **저자**: Ziyi Liu, Grace Zhang
- **발행일**: 2026-07-20
- **[PDF 원문 보기](https://arxiv.org/pdf/2607.17760v1)**

---

## 🛠 추출된 PDF 원문 텍스트 (미리보기)

```text
 Cover Page  Generalize and Guide: Decomposing Rewards for  Few-Shot Inverse Reinforcement Learning  Ziyi Liu, Grace Zhang  Keywords:Few-Shot Learning, Inverse Reinforcement Learning, Reward Decomposition.  Summary  Inverse reinforcement learning (IRL) provides a powerful framework for learning from  demonstrations. However, real-world tasks often exhibit substantial natural variations (e.g.,  picking up mugs with varying shapes), making it impractical to collect demonstrations that  fully specify a new task under every possible scenario. In practice, while demonstrations for  the target task are limited, it is often easier to obtain datasets of heterogeneous but related be-  haviors. This motivates the problem offew-shot IRL with multi-task demonstrations (FM-IRL),  where an agent must learn a new task with substantial variations from only a limited number  of target-task demonstrations, together with sufficient demonstrations of related tasks and on-  line agent experience. To do so, we must bot... (중략) ...
```

## 🚀 다음 단계 가이드
터미널에서 다음 명령어로 Gemini API 키를 등록하고 스크립트를 다시 실행하시면, 
이 거대한 PDF 텍스트가 **완벽한 한국어 튜토리얼 블로그 글**로 변환됩니다!

```bash
export GEMINI_API_KEY="당신의_API_키"
python3 process_content.py
```
