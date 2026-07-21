# [AI 번역 뼈대 완성] Adaptive Adversaries: A Multi-Turn, Multi-LLM Benchmark for LLM Agent Security

> **⚠️ API 키 미설정 알림**
> 현재 `GEMINI_API_KEY`가 환경변수에 없어 AI 번역이 생략되었습니다. 하지만 **PDF 파싱 파이프라인은 완벽하게 작동 중**입니다! 
> 아래에서 실제로 다운로드 및 추출된 PDF 원문 텍스트의 앞부분을 확인하실 수 있습니다.

## 📄 논문 정보
- **원문 제목**: Adaptive Adversaries: A Multi-Turn, Multi-LLM Benchmark for LLM Agent Security
- **저자**: Devina Jain, David Hartmann, Chuan Li
- **발행일**: 2026-07-20
- **[PDF 원문 보기](https://arxiv.org/pdf/2607.18063v1)**

---

## 🛠 추출된 PDF 원문 텍스트 (미리보기)

```text
Adaptive Adversaries: A Multi-Turn, Multi-LLM  Benchmark for LLM Agent Security  Devina Jain∗ David Hartmann Chuan Li  Lambda  Abstract  LLM-based agents process external content, exposing them to prompt injection  and multi-turn manipulation. Most safety benchmarks evaluate defenders against  fixed attack pools collected before evaluation, single-turn or multi-turn. We present  a 21-scenario benchmark foradaptive multi-round attacks against memoryless  LLM defenders: an autonomous LLM attacker observes prior defender responses  and pivots across rounds, while each defender response is evaluated as a fresh  interaction. Holding the 21 scenarios, attackers, defenders, and structured-output  scoring fixed, restricting scoring to the first attacker turn yields0–1% attack success  rate (ASR); allowing 15 rounds of adaptive attack yields 5.4–14.0%. Pooling three  frontier attacker LLMs uncovers 1.4–2.2× as many unique successful attacks  as the best single attacker, and the generated attacks have low cosi... (중략) ...
```

## 🚀 다음 단계 가이드
터미널에서 다음 명령어로 Gemini API 키를 등록하고 스크립트를 다시 실행하시면, 
이 거대한 PDF 텍스트가 **완벽한 한국어 튜토리얼 블로그 글**로 변환됩니다!

```bash
export GEMINI_API_KEY="당신의_API_키"
python3 process_content.py
```
