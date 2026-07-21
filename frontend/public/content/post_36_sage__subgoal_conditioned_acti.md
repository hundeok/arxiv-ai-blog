# [AI 번역 뼈대 완성] SAGE: Subgoal-Conditioned Action Generation for Latent World Model Planning

> **⚠️ API 키 미설정 알림**
> 현재 `GEMINI_API_KEY`가 환경변수에 없어 AI 번역이 생략되었습니다. 하지만 **PDF 파싱 파이프라인은 완벽하게 작동 중**입니다! 
> 아래에서 실제로 다운로드 및 추출된 PDF 원문 텍스트의 앞부분을 확인하실 수 있습니다.

## 📄 논문 정보
- **원문 제목**: SAGE: Subgoal-Conditioned Action Generation for Latent World Model Planning
- **저자**: Letian Cheng, Qi Zhang, Yisen Wang
- **발행일**: 2026-07-20
- **[PDF 원문 보기](https://arxiv.org/pdf/2607.17973v1)**

---

## 🛠 추출된 PDF 원문 텍스트 (미리보기)

```text
Preprint  SAGE: SUBGOAL-CONDITIONEDACTIONGENERA-  TION FORLATENTWORLDMODELPLANNING  Letian Cheng∗ Qi Zhang∗ Yisen Wang†  Peking University  ABSTRACT  Latent world models have emerged as a powerful planning paradigm by learn-  ing action-conditioned predictive dynamics and using them as internal simulators  to imagine and evaluate candidate action sequences. However, as the planning  horizon grows, performance becomes increasingly constrained by proposal qual-  ity: a fixed candidate budget must search an exponentially larger action space,  making it difficult to expose the world model to high-quality candidate futures  for evaluation. In this paper, we introduce a prior-conditioned planner that re-  places random proposal initialization with structured guidance. At each planning  stage, a goal-conditioned generator predicts the next reachable latent subgoal for  a specified duration, which is then used to condition the generation of candidate  action sequences. To capture semantic information across t... (중략) ...
```

## 🚀 다음 단계 가이드
터미널에서 다음 명령어로 Gemini API 키를 등록하고 스크립트를 다시 실행하시면, 
이 거대한 PDF 텍스트가 **완벽한 한국어 튜토리얼 블로그 글**로 변환됩니다!

```bash
export GEMINI_API_KEY="당신의_API_키"
python3 process_content.py
```
