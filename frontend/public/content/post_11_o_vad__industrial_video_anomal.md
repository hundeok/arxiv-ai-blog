# [AI 번역 뼈대 완성] O-VAD: Industrial Video Anomaly Detection through Object-Centric Tracking and Reasoning

> **⚠️ API 키 미설정 알림**
> 현재 `GEMINI_API_KEY`가 환경변수에 없어 AI 번역이 생략되었습니다. 하지만 **PDF 파싱 파이프라인은 완벽하게 작동 중**입니다! 
> 아래에서 실제로 다운로드 및 추출된 PDF 원문 텍스트의 앞부분을 확인하실 수 있습니다.

## 📄 논문 정보
- **원문 제목**: O-VAD: Industrial Video Anomaly Detection through Object-Centric Tracking and Reasoning
- **저자**: Mei Yuan, Qi Long, Qifeng Wu, Zhenyang Li, Yizhou Zhao, Lei Wang, Yang Liu, Min Xu
- **발행일**: 2026-07-20
- **[PDF 원문 보기](https://arxiv.org/pdf/2607.18142v1)**

---

## 🛠 추출된 PDF 원문 텍스트 (미리보기)

```text
O-V AD: Industrial Video Anomaly Detection  through Object-Centric Tracking and Reasoning  Mei Yuan1, Qi Long1, Qifeng Wu1, Zhenyang Li2, Yizhou Zhao1, Lei Wang3,  Yang Liu1, and Min Xu1⋆  1 Carnegie Mellon University  2 University of Alabama at Birmingham  3 Griffith University  meiyuan@andrew.cmu.edu,mxu1@cs.cmu.edu  https://o-vad.github.io/  O-VAD (Ours)Answer: Yes, Toothpaste Tube (Darlie), leakage,170-179frames, causal analysis.  {"report": {“overall_anomaly”: ”yes“, ”anomaly_type“:“material_anomaly/unintended_extrusion_or_leakage","objects":  [{"name": "Toothpaste Tube (Darlie)","anomaly_segments": [[170,179]],"anomaly_object_ids": ["0"],”state tracking": "A surface puncture or breach appears on the tube starting around frame 170, indicating unintended failure despite controlled compression.",“evidence”: [“{”start_frame“: 170, ”end_frame“: 179, ”change_type“: ”surface_change“, ”description“: ”In the later frame, a small puncture or opening has appeared on the upper surface of the tube (nea... (중략) ...
```

## 🚀 다음 단계 가이드
터미널에서 다음 명령어로 Gemini API 키를 등록하고 스크립트를 다시 실행하시면, 
이 거대한 PDF 텍스트가 **완벽한 한국어 튜토리얼 블로그 글**로 변환됩니다!

```bash
export GEMINI_API_KEY="당신의_API_키"
python3 process_content.py
```
