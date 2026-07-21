# [AI 번역 뼈대 완성] SGN: A Similarity-based Generative Network for Data Generation under Distribution Shift

> **⚠️ API 키 미설정 알림**
> 현재 `GEMINI_API_KEY`가 환경변수에 없어 AI 번역이 생략되었습니다. 하지만 **PDF 파싱 파이프라인은 완벽하게 작동 중**입니다! 
> 아래에서 실제로 다운로드 및 추출된 PDF 원문 텍스트의 앞부분을 확인하실 수 있습니다.

## 📄 논문 정보
- **원문 제목**: SGN: A Similarity-based Generative Network for Data Generation under Distribution Shift
- **저자**: Jiaqi Zhu, Xincheng Chen, Yuncheng Wu, Zhaojing Luo, Beng Chin Ooi
- **발행일**: 2026-07-20
- **[PDF 원문 보기](https://arxiv.org/pdf/2607.18072v1)**

---

## 🛠 추출된 PDF 원문 텍스트 (미리보기)

```text
SGN: A Similarity-based Generative Network for  Data Generation under Distribution Shift  Jiaqi Zhu  National University of Singapore  jiaqi77@nus.edu.sg  Xincheng Chen  National University of Singapore  e0838447@u.nus.edu.sg  Y uncheng Wu  Renmin University of China  wuyuncheng@ruc.edu.cn  Zhaojing Luo  Beijing Institute of Technology  zjluo@bit.edu.cn  Beng Chin Ooi  Zhejiang University  ooibc@zju.edu.cn  Abstract  Generative models trained on a source domain often produce s amples that are  poorly aligned with shifted target domains, limiting their effectiveness for target-  domain data augmentation. Although target-speciﬁc adapta tion can reduce this  mismatch, it typically requires additional optimization a nd domain-speciﬁc pa-  rameters. We propose a Similarity-based Generative Networ k (SGN), a reusable  framework that is trained once on labeled source data and app lied to new tar-  get domains without parameter updates. SGN learns a latent s pace structured  by label-induced pairwise similarities whil... (중략) ...
```

## 🚀 다음 단계 가이드
터미널에서 다음 명령어로 Gemini API 키를 등록하고 스크립트를 다시 실행하시면, 
이 거대한 PDF 텍스트가 **완벽한 한국어 튜토리얼 블로그 글**로 변환됩니다!

```bash
export GEMINI_API_KEY="당신의_API_키"
python3 process_content.py
```
