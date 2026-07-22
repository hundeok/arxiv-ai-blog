import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import pipeline


class PipelineUnitTests(unittest.TestCase):
    def test_compact_text_keeps_beginning_and_end(self):
        text = "A" * 100 + "MIDDLE" * 100 + "Z" * 100
        compact = pipeline.compact_text(text, 200)
        self.assertTrue(compact.startswith("A"))
        self.assertTrue(compact.endswith("Z"))
        self.assertIn("중간 원문 생략", compact)

    def test_markdown_validation_requires_structure(self):
        valid = "# 검증 가능한 한국어 제목\n\n" + "\n".join(f"## {section}\n" + "내용 " * 100 for section in pipeline.REQUIRED_SECTIONS)
        pipeline.validate_markdown(valid)
        with self.assertRaises(ValueError):
            pipeline.validate_markdown("## ✨ 3줄 핵심 요약\n짧은 글")

    def test_paper_key_uses_arxiv_identifier(self):
        self.assertEqual(
            pipeline.paper_key({"pdf_link": "https://arxiv.org/pdf/2607.18228v1.pdf", "title": "Ignored"}),
            "2607_18228v1",
        )

    def test_title_validation_rejects_english_fallback(self):
        self.assertTrue(pipeline.is_korean_title("긴 문맥 추론을 개선하는 AI 기법"))
        self.assertFalse(pipeline.is_korean_title("A Long English Research Paper Title"))

    def test_usage_estimation_accumulates(self):
        total = pipeline.empty_usage()
        pipeline.add_usage(total, {"model": "test", "requests": 1, "prompt_tokens": 1_000_000, "output_tokens": 1_000_000, "thought_tokens": 0, "total_tokens": 2_000_000, "estimated_usd": 1.75})
        self.assertEqual(total["requests"], 1)
        self.assertEqual(total["estimated_usd"], 1.75)


if __name__ == "__main__":
    unittest.main()
