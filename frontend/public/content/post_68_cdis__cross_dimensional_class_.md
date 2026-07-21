# [AI 번역 뼈대 완성] CDIS: Cross-Dimensional Class-Agnostic 3D Instance Segmentation via 2D Mask Tracking and 3D-2D Projection Merging

> **⚠️ API 키 미설정 알림**
> 현재 `GEMINI_API_KEY`가 환경변수에 없어 AI 번역이 생략되었습니다. 하지만 **PDF 파싱 파이프라인은 완벽하게 작동 중**입니다! 
> 아래에서 실제로 다운로드 및 추출된 PDF 원문 텍스트의 앞부분을 확인하실 수 있습니다.

## 📄 논문 정보
- **원문 제목**: CDIS: Cross-Dimensional Class-Agnostic 3D Instance Segmentation via 2D Mask Tracking and 3D-2D Projection Merging
- **저자**: Juno Kim, Hye-Jung Yoon, Yesol Park, Byoung-Tak Zhang
- **발행일**: 2026-07-20
- **[PDF 원문 보기](https://arxiv.org/pdf/2607.17778v1)**

---

## 🛠 추출된 PDF 원문 텍스트 (미리보기)

```text
CDIS : Cross-Dimensional Class-Agnostic 3D Instance Segmentation  via 2D Mask Tracking and 3D-2D Projection Merging  Juno Kim 1∗ Hye-Jung Yoon1∗ Yesol Park1∗ Byoung-Tak Zhang1  Abstract— Class-agnostic 3D instance segmentation is critical  for robotic systems operating in unknown environments, en-  abling perception of previously unseen objects for reliable ma-  nipulation and navigation. Existing approaches typically project  per-frame 2D instance masks into 3D and merge them, which  often breaks object identities across time and yields fragmented  3D instances. We introduce Cross-Dimensional Class-Agnostic  3D Instance Segmentation (CDIS), a zero-shot framework that  explicitly tracks 2D instance masks across frames and associates  them with 3D superpoints, creating a feedback loop between  2D and 3D. This cross-dimensional reasoning links temporally  stable 2D tracks with spatially coherent 3D regions, producing  globally consistent 3D instance labels without any 3D-specific  training. Experiments ... (중략) ...
```

## 🚀 다음 단계 가이드
터미널에서 다음 명령어로 Gemini API 키를 등록하고 스크립트를 다시 실행하시면, 
이 거대한 PDF 텍스트가 **완벽한 한국어 튜토리얼 블로그 글**로 변환됩니다!

```bash
export GEMINI_API_KEY="당신의_API_키"
python3 process_content.py
```
