# [Gemini 번역] 자율주행차 취약점 분석을 위한 오픈소스 LLM 평가

> **✨ 3줄 핵심 요약**
> - 자율주행차(CAV)의 비정형 보안 취약점 데이터(CVE)를 기계가 읽을 수 있는 정형화된 포맷(STIX)으로 자동 변환하는 LLM 파이프라인을 제안합니다.
> - 11개의 오픈소스 거대 언어 모델(LLM)을 대상으로 3가지 프롬프팅 전략(Contextless, STIX-Guided, Dynamic Few-Shot)을 실험했습니다.
> - RAG 기반의 'Dynamic Few-Shot' 전략을 적용했을 때 Phi-4, LLaMA-70B 모델 등이 0.94의 F1 스코어를 달성하며 최고 성능을 보였습니다.

## 📄 논문 정보
- **원문 제목**: Evaluating Open-Weight LLMs for Generating Structured Threat Information for Autonomous Vehicle Vulnerabilities
- **저자**: Md Erfan, Ahmed Ryan, Md Kamal Hossain Chowdhury, Md Rayhanur Rahman
- **발행일**: 2026-07-17
- **[PDF 원문 보기](https://arxiv.org/pdf/2607.16175v1.pdf)**

---

## 📖 [쉽게 풀어쓴 1분 핵심]
**"의사의 악필 차트를 깔끔한 엑셀 데이터로 정리해 주는 똑똑한 AI 비서 찾기"**

전 세계에서 보고되는 해킹 위협들은 마치 의사가 휘갈겨 쓴 일기장처럼 두서없는 줄글로 되어 있습니다. 사람이 일일이 읽고 분석하기엔 너무 느리죠. 이 논문은 **"무료 AI 모델(오픈소스 LLM)에게 옛날에 정리해 둔 엑셀 정답지(족보)를 몇 개 쥐여주면, 새로운 일기장도 알아서 완벽하게 엑셀 표로 정리할 수 있을까?"**를 실험한 것입니다. 결과는 대성공이었습니다. 족보를 본 AI는 해킹의 핵심을 94%의 정확도로 짚어냈습니다!

---

## 🎯 [배경 및 문제점]
**비정형 CVE 데이터를 구조화된 STIX 포맷으로 변환해야 하는 현실적 한계**

최근 기아(Kia)의 원격 제어 취약점이나 스바루(Subaru)의 STARLINK 결함 등 커넥티드 카(CAV)의 취약점이 속출하고 있습니다. 이러한 취약점은 CVE(Common Vulnerabilities and Exposures)에 **자연어 텍스트**로 등록됩니다. 
하지만 보안 실무자들이 방어 시스템을 구축하기 위해서는 공격 대상, 취약점 유형, 공격 패턴 등이 객체화된 **STIX(Structured Threat Information Expression)** 형태의 데이터가 필요합니다. 기존에는 보안 전문가가 수작업으로 텍스트를 파싱해야 했으며, 이는 엄청난 리소스 낭비와 휴먼 에러를 유발했습니다.

---

## 💡 [핵심 기술 및 아키텍처]
**11개의 오픈소스 LLM과 3단계 프롬프팅(Prompting) 전략 비교**

연구진은 GPT-4 같은 상용 API 대신, 보안성 확보가 가능한 **11개의 오픈소스 모델(4B ~ 120B 파라미터)**을 로컬 서버(LM Studio, RTX 6000 Ada 4장)에 올려 실험을 진행했습니다. (테스트 모델: Gemma-4-31B, Phi-4, LLaMA-3.3-70B, Qwen-Coder 등)

LLM의 정보 추출 능력을 극대화하기 위해 세 가지 프롬프팅 전략을 비교했습니다:
1. **Contextless Prompting**: CVE 텍스트만 주고 STIX로 변환하라는 Zero-shot 지시.
2. **STIX-Guided Prompting**: STIX의 도메인 객체(SDO), 관계 객체(SRO)의 스키마 매뉴얼을 함께 제공.
3. **Dynamic Few-Shot Prompting**: 입력된 CVE 텍스트와 의미론적(Semantic)으로 가장 유사한 **과거의 정답 STIX 번들 5개**를 벡터 검색으로 찾아내어 프롬프트에 함께 주입하는 RAG(Retrieval-Augmented Generation) 방식.

---

## 📊 [실험 결과 분석]
**Dynamic Few-Shot의 압도적 성능 향상 (F1 Score 0.94 달성)**

단순 매뉴얼(Guided)만 주었을 때보다, 유사한 예제(Few-Shot)를 제공했을 때 모델들의 추론 능력이 비약적으로 상승했습니다.
- **SDO(객체 추출)**: Phi-4, LLaMA-70B, Qwen-Coder-30B 모델이 Dynamic Few-Shot 환경에서 **F1 스코어 0.94**를 달성했습니다. (취약점 객체 식별률은 0.99에 육박)
- **SRO(관계 추출)의 한계**: 단순히 객체를 찾는 것을 넘어 "A 객체가 B 객체를 악용(exploits)한다"는 식의 그래프 엣지를 추론하는 작업은 여전히 어려움을 겪었습니다. Qwen-Coder가 0.63으로 1위를 기록했습니다.
- **MITRE ATT&CK 매핑**: 공격 패턴을 마이터 어택(MITRE ATT&CK) 프레임워크와 매핑하는 작업에서는 Gemma-4-31B가 Match@1 기준 0.68로 가장 우수했습니다.

---

## 🌍 [세상에 미치는 영향 & 실무 적용 사례]
**위협 인텔리전스(CTI)의 완전 자동화 및 초동 대응 시간(MTTR) 혁신**

이 연구는 현업의 보안 팀과 백엔드 엔지니어들에게 즉각적으로 적용 가능한 아키텍처를 제시합니다.
* **사내 보안 파이프라인 무인화**: 상용 API를 쓰지 않고도, 사내 폐쇄망에 LLaMA-3나 Phi-4 같은 로컬 모델을 올려두고 RAG(Dynamic Few-Shot) 프롬프트만 잘 깎으면, 매일 쏟아지는 글로벌 보안 위협 리포트를 100% 구조화된 DB로 자동 변환할 수 있습니다.
* **보안 솔루션 연동**: 변환된 STIX 데이터를 사내 SIEM(보안 정보 및 이벤트 관리)이나 방화벽 정책에 즉시 연동하면, 취약점 발표부터 방어 정책 적용까지 걸리던 수일의 시간을 **단 몇 분(Minutes)**으로 단축할 수 있습니다. 

결국 이 논문은, 적절한 프롬프트 엔지니어링이 동반된다면 **무료 오픈소스 AI 모델만으로도 최고 수준의 보안 인텔리전스 자동화 공장을 구축할 수 있음**을 증명해 냈습니다.
