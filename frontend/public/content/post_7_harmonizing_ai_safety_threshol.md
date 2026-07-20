# [Deep-Dive] AI 안전 임계값의 단일화: 기업별 '깜깜이' 규제를 넘어 표준화된 안전 기준으로

> **논문 정보**
> * **제목:** Harmonizing AI Safety Thresholds
> * **저자:** Wilber Sean Anterola, Matthew Ball, Luis F. Lafuerza, Markov Grey
> * **발행일:** 2026년 7월 17일 (arXiv)
> * **PDF 링크:** [https://arxiv.org/pdf/2607.16112v1](https://arxiv.org/pdf/2607.16112v1)

---

### ✨ [3줄 핵심 요약]
1. 프론티어 AI 기업(Anthropic, Google DeepMind, OpenAI)마다 제각각 다르게 정의하여 상호 비교 및 제3자 감사가 불가능했던 **AI 자율 위험 임계값(Safety Threshold)을 정량적으로 통합하는 공통 표준 프레임워크(Harmonized Floor)**를 최초로 제안했습니다.
2. 오용 위험(사이버 및 생화학)은 **'기대 피해(Expected Harm)'**를 핵심 프리미티브(Primitive)로 삼아 배포 방식(Open-source vs Gated API)에 따른 실제 위험 노출 스칼라를 수학적으로 정량화하고, AI R&D 자동화 분야는 **'추세선 대비 가속도(5배 속도로 3개월 지속)'**를 기반으로 한 판정 방식을 수립했습니다.
3. 2026년 최신 모델인 **GPT-5.5**와 **Claude Mythos Preview**의 실제 벤치마크 데이터를 적용해 계산한 결과, 동일한 고위험 능력 수준에서도 안전 가이드라인 발동 여부가 엇갈리는 현상을 지적하며 업계 표준 감사의 필요성을 강력히 증명했습니다.

---

### 📖 [쉽게 풀어쓴 1분 핵심]
*임계값 조율이란 속도제한 표지판이 제조사마다 다를 때 일어나는 도로의 대혼란을 '통합 단속 카메라 규격'으로 정비하는 일입니다.*

예를 들어 세 개의 유명한 자율주행 자동차 제조사(A, B, C사)가 있다고 가정해 봅시다. 
* **A사:** "우리 차는 비가 억수같이 쏟아져서 앞이 전혀 안 보일 때만 안전 모드를 켤게요."
* **B사:** "우리 차는 안개가 끼면 속도를 알아서 줄일게요."
* **C사:** "우리 차는 운전자가 졸음운전을 할 때만 경고음을 울릴게요."

각자가 나름대로 안전 기준을 세웠지만, 도로 교통경찰(규제 기관)이나 도로 위의 다른 운전자(사용자) 입장에서는 **어떤 차가 실제로 가장 안전하고, 언제 위험한지**를 도저히 하나의 기준으로 비교하거나 검사할 수 없습니다. 어떤 제조사가 기준을 아주 느슨하게 잡아도 제재할 방법이 없고, 시장 경쟁 압박 속에서 다른 회사들도 덩달아 안전장치 발동 기준을 낮추는 **'하향 평준화(Race to the Bottom)'**가 일어날 수 있죠.

이 논문은 제각각인 규정을 하나로 통일하여 **"동일한 수준의 위험 요인(기대 피해액 또는 기술 발전 속도)이 감지되면 모든 차량은 예외 없이 강력한 안전 벨트를 매야 한다"**는 단일 표준 저울을 설계한 것입니다.

---

### 🎯 [배경 및 문제점]
*프론티어 AI 기업들의 폐쇄적이고 독자적인 안전 프레임워크(RSP/FSF/PF)는 규제 감사의 강력한 병목을 형성하고 있습니다.*

현재 주요 AI 기업들은 '서울 프론티어 AI 안전 서약(Seoul Commitments)' 및 미국의 캘리포니아 SB-53, 뉴욕 RAISE Act 등 법제화 움직임에 맞추어 독자적인 안전 임계값을 발표해 왔습니다. 그러나 본 논문은 이 프레임워크들이 가진 세 가지 근본적 한계를 지적합니다.

1. **임계값 정의의 이종성 (Heterogeneity):** 
   각 기업의 임계값 정의가 너무 다릅니다. 예컨대 Google DeepMind는 '결과 기반(Outcome-based, 실제 심각한 손실 유발 여부)'으로 기준을 정의하는 반면, OpenAI는 '역량 기반(Capability-based, 모델의 특정 오용 기능 작동 여부)'으로 정의합니다. 심지어 Anthropic은 최신 RSP v3.0에서 사이버 안보 위험 범주를 완전히 누락했습니다.
2. **폐쇄적이고 불투명한 평가 구조 (Internal Proprietary Tests):**
   모델 검증이 기업 자체적인 비공개 테스트에 의존하므로, 외부 규제 기관이나 제3자 감사인이 실제로 임계값을 초과했는지 객관적으로 평가할 길(Auditable Evidence)이 요원합니다.
3. **다자간 조정 실패와 하향 평준화 위험 (Coordination Problem):**
   강력한 가드레일을 적용 중인 기업이 시장 선점을 위해 느슨한 기준을 적용하는 경쟁사에 밀려 스스로 안전 기준을 완화하게 되는 악순환이 발생할 수 있습니다.

---

### 💡 [핵심 기술 및 아키텍처]
*정량적 물리 엔진처럼 작동하는 '기대 피해 모델링'과 'AI 발전 가속도 진단 공식'의 세부 동작 원리입니다.*

#### 1. 오용 위험(사이버 및 생화학) 정량화: 기대 피해액(Expected Harm) 모델

사이버 및 생물학적 무기 오용 리스크는 특정 공격 경로(Pathway) $j$에 대하여 아래의 정량 공식으로 일원화합니다.

$$E[H_j] = N_j \times P_{\text{success}, j} \times h_j$$

* $N_j$: 연간 예상 공격 시도 횟수 (Attack Volume)
* $P_{\text{success}, j}$: 공격 성공 확률 (Success Probability)
* $h_j$: 성공 시 건당 예상 피해 규모 (Harm per Event, 사이버는 달러($), 생화학은 사상자 수)

AI가 개입되었을 때 새롭게 추가되는 순수 AI 추가 피해($\Delta E[H_{\text{AI}}]$)는 다음과 같이 정량화합니다.

$$\Delta E[H_{\text{AI}}] = \sum_j \left( E[H_{j, \text{AI}}] - E[H_{j, \text{baseline}}] \right)$$

여기에 배포 형태(Release Conditions, $r$)에 따른 노출 민감도 스칼라($s_r$)를 결합하여 최종적인 리스크 공간을 도출합니다.

$$E[H_{\text{AI}, r}] = s_r \times E[H_{\text{AI}}]$$

* **배포 조건 스칼라 ($s_r$):** Public API를 기준점($1.0$)으로 둡니다. 가중치 오픈소스화(Open Weights)는 공격자의 정밀 튜닝 및 필터 우회가 자유로우므로 스칼라 값이 $1.0$을 초과하며($s_r > 1$), 통제된 API(Trusted API)나 내부 전용(Internal only)은 차단 가이드라인 강도에 따라 소수점 아래로($s_r < 1$) 수렴하게 됩니다.

```
[ 모델 가중치 (Weights) ] ──> [ 배포 환경 설정 (r) ]
                                    │
                                    ├──> Open Weights     (s_r > 2.00)  [극도로 위험]
                                    ├──> Public API       (s_r = 1.00)  [기준점]
                                    ├──> Safety-filtered  (s_r = 0.55)
                                    └──> Trusted API      (s_r = 0.009) [강력한 통제]
```

#### 2. 공격 킬체인(Sequential Kill-Chain) 구조와 AND/OR 게이트 결합
사이버 침투나 생화학 물질 획득 단계는 순차적인 단계(Phase)를 거쳐야 하므로 곱연산(AND-gate) 구조를 띱니다.

$$P_{\text{success}, j} = \prod_{k \in \text{required}} p_{k, j}$$

단, 침투 초기 경로(Initial Access)나 생화학 원천 물질 획득(Acquisition) 단계처럼 우회 경로가 존재할 경우 아래와 같이 자율적인 합연산(OR-gate) 구조를 사용하여 실제 성공률을 보수적으로 더 높게 보정합니다.

$$p_{\text{Acquisition}} = 1 - \prod_{r \in \text{routes}} (1 - p_{\text{route}, r})$$

#### 3. AI 연구 자동화(AI R&D) 가속도 판정 공식
AI 모델 연구 자동화 능력을 판정하기 위해, 저자들은 역사적 발전 추세 대비 '순간 속도'를 도출하는 수학적 판정 기준을 제안합니다.

* **회사 내부 모델들의 성능 개선 속도 ($r_n$):**

$$r_n = \frac{C_n - C_{n-1}}{t_n - t_{n-1}}$$

* $C_n$: Epoch AI의 ECI(Epoch Capability Index) 등을 활용해 측정한 신규 모델 $n$의 성능 점수
* $t_n$: 모델 $n$의 배포 시각

**[통합 임계치 돌파 조건]**
어떤 모델이 아래의 수식을 동시에 만족할 경우, 가혹한 연구 자동화 임계치를 통과한 것으로 판정하여 즉시 훈련 및 개발 임계 안전 장치를 작동시킵니다.

$$\frac{r_n}{r_0} \ge 5 \quad \text{and} \quad t_n - t_{n-1} \ge 3\text{개월}$$

* $r_0$: 역사적 기본 추세선의 기울기 (예: 2018~2024년 평균 역량 증가 속도)
* 즉, **"최소 3개월 이상의 주기를 두고 배포된 모델 중, 역사적 가속도 수준보다 무려 5배 이상 빠른 속도로 역량을 증가시킨 모델"**을 임계 돌파 모델로 공식 선언합니다.

---

### 📊 [실험 결과 분석]
*2026년 실제 도출된 프론티어 모델 성능 수치를 분석하여 임계치 프레임워크의 괴리를 완벽히 증명했습니다.*

#### 1. 사이버 위협 평가: TLO (Target Lock On) 32단계 시나리오 실험 데이터 분석

| 모델명 | 출시 시기 | 평균 도달 단계수 (100M 토큰 기준) | 풀체인 완수율 ($P_{\text{success}}$) | 안전 프레임워크 트리거 상태 |
| :--- | :--- | :---: | :---: | :--- |
| **GPT-4o** | 2024년 8월 | 1.7 (10M 토큰 기준) | $0/10 \approx 0.00$ | 미달 (Safe) |
| **Claude 4.5** | 2025년 11월 | 11.0 | $0/15 < 0.05$ | 미달 (Safe) |
| **GPT-5.5** | 2026년 4월 | 22.0 | $2/10 \approx 0.20$ | **OpenAI 'High' 트리거 작동** (안전 Safeguard 강제) |
| **Claude Mythos** | 2026년 4월 | 22.0 | $6/10 \approx 0.60$ | **트리거 없음** (Anthropic의 규정 부재로 자율 배포 상태) |

* **데이터가 보여주는 불일치:** GPT-5.5($0.20$)와 Claude Mythos Preview($0.60$)는 모두 제3자 기준 상 '엔드투엔드 기업 침투 역량(TLO)'을 명확하게 획득했습니다. 그러나 OpenAI는 자사 기준에 따라 'High' 등급을 발동하고 엄격한 Trusted Access 배포로 제한한 반면, Anthropic은 관련 임계값을 비워두었기 때문에 정책적 불일치가 발생했습니다. **논문이 제안한 단일 바닥(Harmonized Floor: 비제로 풀체인 완수율 돌파 시 발동) 기준을 적용하면 두 모델 모두 동일 시점에 강제 제재 대상이 됩니다.**

* **기대 피해량 시뮬레이션 결과:**
  공격 시나리오와 스칼라 행렬을 활용하여 글로벌 사이버 피해 Anchor(연 5,000억 달러) 기반 추가 피해 예측치를 계산했습니다.

```
[Public API 배포 시 추가 연간 기대 피해액 예측]
* Baseline: USD 500,000,000,000 (5,000억 달러)
* Mythos급 모델 퍼블릭 배포 시: + USD 67,900,000,000 (추가 679억 달러)
* GPT-5.5급 모델 퍼블릭 배포 시: + USD 55,900,000,000 (추가 559억 달러)
```

이 시나리오에서 캘리포니아 SB-53이 규정한 재앙적 수준(단일 사건 10억 달러 피해) 아래로 총 리스크를 통제하려면, Trusted API 환경에서 외부 공격 노출 비중 스칼라($s_r$)를 **최소 1.5% 이하(10억 달러 목표 시)** 또는 **0.74% 이하(5억 달러 목표 시)** 수준으로 완전히 눌러야(감축해야) 한다는 것을 수학적으로 도출했습니다.

#### 2. AI R&D 자동화 가속화: Claude Mythos Preview 계산 예시
Claude Mythos Preview가 출시된 2026년 4월 7일 시점의 ECI 데이터를 공식에 연계하여 검증해 봅니다.

* **실험 대상:** Claude Mythos Preview (ECI: 161)
* **직전 성능 기준:** Claude Opus 4.5 (ECI: 145, 2025-11-24 배포 / 간격 134일 = 0.367년)
* **테스트 계산 ($r_{\text{Mythos}, 2}$):** 

$$\frac{161 - 145}{134} \times 365 \approx 43.58 \text{ points/year}$$

* **역사적 기본 속도 ($r_0$, Claude 3 Opus $\rightarrow$ Claude 3.7 Sonnet):**

$$\frac{138 - 122}{357} \times 365 \approx 16.36 \text{ points/year}$$

* **배율 결과:** 

$$\frac{43.58}{16.36} \approx 2.66\text{배}$$

* **안전 임계 판정:** 가속 비율이 $2.66$배로 기준값($5\text{배}$) 미만입니다. 따라서 Claude Mythos Preview 모델은 연구 가속화 임계값을 돌파하지 않은 안전 범위 내에 있음이 정량적으로 증명되었습니다.

---

### 🌍 [세상에 미치는 영향 & 실무 적용 사례]
*실무 리드 개발자와 인프라 보안 아키텍트가 프로덕션 환경에 즉각 도입할 수 있는 정량적 설계 패턴입니다.*

#### 1. MLOps 엔지니어를 위한 '지속적 안전 통합(Safety CI/CD)' 파이프라인 설계
프론티어 모델이나 파인튜닝된 자체 인하우스 모델을 프로덕션에 배포하기 전에, CI/CD 테스트 단계에 안전 임계값 자동 검증 단계를 아래 프롬프트 구조와 벤치마크 테스트 코드로 구축해야 합니다.

```python
# MLOps 배포 가드레일 자동 판정 가상 코드 예시
def verify_safety_compliance(candidate_model):
    # 1. 샌드박스 내부에서 멀티스텝 침투 도메인(TLO 32단계 유사 테스트) 수행
    completed_steps, success_rate = run_automated_cyber_range(candidate_model)
    
    # 2. Harmonized Floor: 제3자 감사가 가능한 완수율이 0을 유의미하게 초과하는지 검증
    # 90% 신뢰하한(Clopper-Pearson Lower Bound) 계산 후 판정
    lower_bound = calculate_clopper_pearson_lower_bound(completed_steps, trials=10)
    
    if lower_bound > 0.0:
        # 비제로 완수율이 확인되면 즉시 퍼블릭 배포를 차단하고 Trusted API 환경으로 인프라 격리
        quarantine_and_apply_trusted_access_safeguards(candidate_model)
        raise ComplianceError("Harmonized Cyber Safety Threshold Crossed! Public API deployment halted.")
```

#### 2. Trusted API 구축을 위한 기술적 위험 통제(Exposure Control) 3대 요건
정량 모델의 타깃 노출치인 $s_{Trusted\_API} = 0.009$를 달성하기 위해 기업의 클라우드 인프라 아키텍처가 반드시 수용해야 하는 기능 목록입니다.

* **엄격한 신원 확인 및 이상 행동 탐지 (Strict KYC & Behavioral Monitoring):** 
  NIST SP 800-63A IAL2 표준 이상의 사용자 신원 검증과 API 호출 시나리오 탐지 알고리즘을 도입하여, 공격자가 프론티어 AI의 역량을 이용해 실시간 Exploit 코드를 정밀 제작하거나 오용 지식을 학습(tacit knowledge extraction)하는 프롬프트를 원천 필터링해야 합니다.
* **이중 에이전트 모니터링 가드레일 구조:**
  사용자의 인풋 질문과 AI가 도출한 아웃풋 답변을 비동기식으로 실시간 검사하는 별도의 경량 모니터링 모델(예: Llama-Guard 변형 아키텍처)을 상시 연결하여 탈옥 바이패스율을 완전히 낮추어야 합니다.
* **보안 모델 가중치 유출 원천 차단:**
  H100/B200 GPU 메모리 단의 TEE(Trusted Execution Environment) 환경에서 모델 추론 가중치를 완벽하게 암호화 보존하여 악의적 행위자가 가중치를 탈취($s_r \ge 2.0$ 상태 유발)하는 것을 원천 방어합니다.

#### 3. 규제 완벽 대비 (Compliance-as-Code)
본 논문의 프레임워크를 비즈니스 대시보드로 구성하면 EU AI Act의 고위험 AI 규제 대응을 위한 객관적인 리포팅 데이터가 자동 생성됩니다. 기술 부채와 과잉 규제 우려 속에서, "추세선 대비 5배 성장" 같은 투명한 수치적 안전판은 사업 기획 단계의 불확실성을 확실하게 제거해 줍니다.