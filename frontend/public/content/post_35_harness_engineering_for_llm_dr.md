# [AI 번역 뼈대 완성] Harness Engineering for LLM-Driven GPU Kernel Generation

> **⚠️ API 키 미설정 알림**
> 현재 `GEMINI_API_KEY`가 환경변수에 없어 AI 번역이 생략되었습니다. 하지만 **PDF 파싱 파이프라인은 완벽하게 작동 중**입니다! 
> 아래에서 실제로 다운로드 및 추출된 PDF 원문 텍스트의 앞부분을 확인하실 수 있습니다.

## 📄 논문 정보
- **원문 제목**: Harness Engineering for LLM-Driven GPU Kernel Generation
- **저자**: Yue Shui, Chenyu Ma, Hangfei Xu, Shengzhao Wen, Yanpeng Wang
- **발행일**: 2026-07-20
- **[PDF 원문 보기](https://arxiv.org/pdf/2607.17979v1)**

---

## 🛠 추출된 PDF 원문 텍스트 (미리보기)

```text
HARNESSENGINEERING FORLLM-DRIVENGPU KERNELGENERATION  Yue Shui Chenyu Ma Hangfei Xu Shengzhao Wen Yanpeng Wang  Baidu, Inc.  GitHub:github.com/syhya/mlsys26-flashinfer-contest  ABSTRACT  Large language models (LLMs) can assist GPU kernel generation, but their practical effectiveness depends  on whether generated code can be reliably constrained, validated, profiled, and selected. This paper presents a  harness-centered system for LLM-driven GPU kernel optimization in the MLSys 2026 FlashInfer AI Kernel  Generation Contest on NVIDIA Blackwell B200 GPUs. The system separates an evaluation harness from a profile-  backed optimization controller: the harness enforces compilation, correctness, official-aligned timing, and artifact  archival, while the controller turns profiler and workload evidence into bounded candidate-generation decisions.  Human-authored skills capture operator constraints, references, profiling procedures, and promotion rules, while  Codex and Claude Code agents generate candidate... (중략) ...
```

## 🚀 다음 단계 가이드
터미널에서 다음 명령어로 Gemini API 키를 등록하고 스크립트를 다시 실행하시면, 
이 거대한 PDF 텍스트가 **완벽한 한국어 튜토리얼 블로그 글**로 변환됩니다!

```bash
export GEMINI_API_KEY="당신의_API_키"
python3 process_content.py
```
