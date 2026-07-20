# [AI 번역 뼈대 완성] ToolSciVer: Multimodal Scientific Claim Verification with Visual Tool Augmented Reinforcement Learning

> **⚠️ API 키 미설정 알림**
> 현재 `GEMINI_API_KEY`가 환경변수에 없어 AI 번역이 생략되었습니다. 하지만 **PDF 파싱 파이프라인은 완벽하게 작동 중**입니다! 
> 아래에서 실제로 다운로드 및 추출된 PDF 원문 텍스트의 앞부분을 확인하실 수 있습니다.

## 📄 논문 정보
- **원문 제목**: ToolSciVer: Multimodal Scientific Claim Verification with Visual Tool Augmented Reinforcement Learning
- **저자**: Binglin Zhou, Peng Shi, Ryo Kamoi, Nan Zhang, Rui Zhang
- **발행일**: 2026-07-17
- **[PDF 원문 보기](https://arxiv.org/pdf/2607.16131v1)**

---

## 🛠 추출된 PDF 원문 텍스트 (미리보기)

```text
ToolSciVer: Multimodal Scientific Claim Verification  with Visual Tool Augmented Reinforcement Learning  Binglin Zhou1 Peng Shi2 Ryo Kamoi1 Nan Zhang1 Rui Zhang1∗  1The Pennsylvania State University 2University of Waterloo  {bbz5169, rmz5227}@psu.edu  Abstract  Multimodal Scientific Claim Verification (MSCV) requires models to verify scien-  tific claims using visually grounded evidence from papers, including figures, tables,  charts, and textual context. However, existing methods often fail because they  struggle to locate decisive visual evidence, accurately read structured scientific  visuals, and integrate multimodal observations into reliable reasoning. We intro-  duce ToolSciVer, the first tool-augmented framework for MSCV to our knowledge.  ToolSciVer equips a VLM with three type-aware visual tools, table row/column  focus, chart-to-structure parsing, and high-resolution region zoom, which convert  dense scientific visuals into explicit, claim-facing evidence, and trains the policy  with Group... (중략) ...
```

## 🚀 다음 단계 가이드
터미널에서 다음 명령어로 Gemini API 키를 등록하고 스크립트를 다시 실행하시면, 
이 거대한 PDF 텍스트가 **완벽한 한국어 튜토리얼 블로그 글**로 변환됩니다!

```bash
export GEMINI_API_KEY="당신의_API_키"
python3 process_content.py
```
