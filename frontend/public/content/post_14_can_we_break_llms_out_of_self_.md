# [AI 번역 뼈대 완성] Can We Break LLMs Out of Self-Loops? Fine-Grained Reasoning Control with Activation Steering

> **⚠️ API 키 미설정 알림**
> 현재 `GEMINI_API_KEY`가 환경변수에 없어 AI 번역이 생략되었습니다. 하지만 **PDF 파싱 파이프라인은 완벽하게 작동 중**입니다! 
> 아래에서 실제로 다운로드 및 추출된 PDF 원문 텍스트의 앞부분을 확인하실 수 있습니다.

## 📄 논문 정보
- **원문 제목**: Can We Break LLMs Out of Self-Loops? Fine-Grained Reasoning Control with Activation Steering
- **저자**: Sheldon Yu, Tong Yu, Xunyi Jiang, Rohan Surana, Gagan Mundada, Sungchul Kim, Lina Yao, Julian McAuley, Junda Wu
- **발행일**: 2026-07-20
- **[PDF 원문 보기](https://arxiv.org/pdf/2607.18100v1)**

---

## 🛠 추출된 PDF 원문 텍스트 (미리보기)

```text
Can We Break LLMs Out of Self-Loops? Fine-Grained  Reasoning Control with Activation Steering  Sheldon Yu1, Tong Yu2, Xunyi Jiang1, Rohan Surana1, Gagan Mundada1,  Sungchul Kim2, Lina Yao3, Julian McAuley1, Junda Wu1  1UC San Diego 2Adobe Research  3University of New South Wales  {ziy040,xuj003,rsurana,gmundada,jmcauley,juw069}@ucsd.edu  {tyu,sukim}@adobe.com lina.yao@unsw.edu.au  Abstract  Extended reasoning has become standard for frontier Large Language Models  (LLMs), yet the trajectories these models produce remain largely uncontrollable.  Existing methods for shaping how a model reasons are prompt based approaches  and operate at the input level, offering no fine-grained control over the reasoning  process itself. Related work analyzes and discovers latent transition dynamics in  the reasoning traces from Large Language Models. Building on this, we statistically  characterize these states, and show that failure trajectories get stuck in self-loops,  exhausting the token budget without progress t... (중략) ...
```

## 🚀 다음 단계 가이드
터미널에서 다음 명령어로 Gemini API 키를 등록하고 스크립트를 다시 실행하시면, 
이 거대한 PDF 텍스트가 **완벽한 한국어 튜토리얼 블로그 글**로 변환됩니다!

```bash
export GEMINI_API_KEY="당신의_API_키"
python3 process_content.py
```
