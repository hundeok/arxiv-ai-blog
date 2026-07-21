# [AI 번역 뼈대 완성] SGA: Plug&Play Geometric Verification for Educational Video Synthesis

> **⚠️ API 키 미설정 알림**
> 현재 `GEMINI_API_KEY`가 환경변수에 없어 AI 번역이 생략되었습니다. 하지만 **PDF 파싱 파이프라인은 완벽하게 작동 중**입니다! 
> 아래에서 실제로 다운로드 및 추출된 PDF 원문 텍스트의 앞부분을 확인하실 수 있습니다.

## 📄 논문 정보
- **원문 제목**: SGA: Plug&Play Geometric Verification for Educational Video Synthesis
- **저자**: Lopez Jhon, Hinojosa Carlos, Ghanem Bernard
- **발행일**: 2026-07-20
- **[PDF 원문 보기](https://arxiv.org/pdf/2607.18116v1)**

---

## 🛠 추출된 PDF 원문 텍스트 (미리보기)

```text
SGA: Plug&Play Geometric Verification for Educational Video Synthesis  Jhon Lopez1,2 and Carlos Hinojosa 2 and Bernard Ghanem 2  1Universidad Industrial de Santander, Bucaramanga, Colombia  2King Abdullah University of Science and Technology (KAUST), Thuwal, Saudi Arabia  jhon2208456@correo.uis.edu.co  {carlos.hinojosa, bernard.ghanem}@kaust.edu.sa  Abstract  Recent work leverages Large Language Mod-  els (LLMs) to generate executable code for  pedagogical animations using libraries such  as Manim. However, ensuring spatial correct-  ness and visual legibility remains challenging,  as existing frameworks emphasize pedagogi-  cal content while overlooking geometric oc-  clusions. We propose the Symbolic Geomet-  ric Agent (SGA), a plug-and-play module for  code-centric animation pipelines that intercepts  LLM-generated code, performs partial execu-  tion to extract symbolic scene graphs, and ap-  plies targeted refinement when spatial conflicts  are detected. We further introduce the Manim  Visual Quality S... (중략) ...
```

## 🚀 다음 단계 가이드
터미널에서 다음 명령어로 Gemini API 키를 등록하고 스크립트를 다시 실행하시면, 
이 거대한 PDF 텍스트가 **완벽한 한국어 튜토리얼 블로그 글**로 변환됩니다!

```bash
export GEMINI_API_KEY="당신의_API_키"
python3 process_content.py
```
