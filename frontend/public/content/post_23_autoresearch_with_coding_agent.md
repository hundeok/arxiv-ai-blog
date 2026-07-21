# [AI 번역 뼈대 완성] Autoresearch with Coding Agents: Generalizers and Metric-Maximizers on Quran Recitation Data

> **⚠️ API 키 미설정 알림**
> 현재 `GEMINI_API_KEY`가 환경변수에 없어 AI 번역이 생략되었습니다. 하지만 **PDF 파싱 파이프라인은 완벽하게 작동 중**입니다! 
> 아래에서 실제로 다운로드 및 추출된 PDF 원문 텍스트의 앞부분을 확인하실 수 있습니다.

## 📄 논문 정보
- **원문 제목**: Autoresearch with Coding Agents: Generalizers and Metric-Maximizers on Quran Recitation Data
- **저자**: Nursultan Askarbekuly, Mohamad Al Mdfaa, Ahmed Helaly, Gonzalo Ferrer, Manuel Mazzara
- **발행일**: 2026-07-20
- **[PDF 원문 보기](https://arxiv.org/pdf/2607.18064v1)**

---

## 🛠 추출된 PDF 원문 텍스트 (미리보기)

```text
Autoresearch with Coding Agents: Generalizers  and Metric-Maximizers on Quran Recitation Data  Nursultan Askarbekuly1, Mohamad Al Mdfaa2, Ahmed Helaly1, Gonzalo  Ferrer2, and Manuel Mazzara1  1 Innopolis University, Innopolis, Republic of Tatarstan, Russia  {n.askarbekuly,a.helaly}@innopolis.university,m.mazzara@innopolis.ru  2 Skolkovo Institute of Science and Technology, Moscow, Russia  {mohamad.almdfaa,g.ferrer}@skoltech.ru  Abstract.Coding agents can now be left alone to improve software  against a score. In this pattern – recently popularized asautoresearch–  the agent receives a dataset, an evaluation script, and one editable file,  and iterates without supervision: modify the code, measure, keep the  change if the score improves. But what does the agent actually optimize  – the developer’s intent, or the literal number? We ran this loop on a  real production task: deciding which Quranic verses appear in a noisy  speech-recognition transcript and splitting the transcript by verse. Two  frontier ... (중략) ...
```

## 🚀 다음 단계 가이드
터미널에서 다음 명령어로 Gemini API 키를 등록하고 스크립트를 다시 실행하시면, 
이 거대한 PDF 텍스트가 **완벽한 한국어 튜토리얼 블로그 글**로 변환됩니다!

```bash
export GEMINI_API_KEY="당신의_API_키"
python3 process_content.py
```
