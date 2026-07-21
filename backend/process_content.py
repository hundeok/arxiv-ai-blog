import os
import json
import urllib.request
import time
import warnings
warnings.filterwarnings("ignore", category=FutureWarning)
from pypdf import PdfReader
import google.generativeai as genai
from fetch_papers import fetch_latest_cs_ai_papers
import signal

# Configure API Key if available
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

api_key = os.environ.get("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

def download_and_parse_pdf(pdf_link, paper_id):
    """Downloads a PDF and extracts its text."""
    temp_dir = os.path.join(os.path.dirname(__file__), "temp")
    os.makedirs(temp_dir, exist_ok=True)
    pdf_path = os.path.join(temp_dir, f"{paper_id}.pdf")
    
    # ArXiv pdf links often miss the .pdf extension
    if not pdf_link.endswith('.pdf'):
        pdf_link += '.pdf'
        
    print(f"Downloading PDF: {pdf_link}")
    urllib.request.urlretrieve(pdf_link, pdf_path)
    
    print(f"Extracting text from: {pdf_path}")
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        extracted = page.extract_text()
        if extracted:
            text += extracted + "\n"
            
    # Clean up temp file
    os.remove(pdf_path)
    return text

def generate_post_with_gemini(paper, full_text):
    """Uses Gemini to read the full text and generate a structured blog post."""
    print("Calling Gemini API...")
    model = genai.GenerativeModel('gemini-flash-latest')
    
    prompt = f"""
    너는 최고 수준의 AI 기술 블로거이자 개발자 멘토야. 
    다음은 '{paper['title']}' 이라는 제목의 최신 ArXiv 논문 전체 텍스트야.
    이 논문을 완벽하게 분석해서, '전문적인 기술적 깊이(Deep-Dive)'를 유지하면서도 도입부에서는 비전공자도 이해할 수 있는 '쉬운 비유'를 제공하는 완벽한 밸런스의 블로그 포스팅을 마크다운으로 작성해줘.
    
    [필수 조건]
    1. 다음 목차 구조를 반드시 따를 것:
       - ✨ [3줄 핵심 요약]
       - 📖 [쉽게 풀어쓴 1분 핵심] (초등학생도 이해할 수 있는 아주 쉬운 비유로 논문의 전체적인 컨셉 설명)
       - 🎯 [배경 및 문제점] (전문적인 용어를 사용하되 가독성 있게, 논문의 기존 한계점 설명)
       - 💡 [핵심 기술 및 아키텍처] (실제 모델명, 아키텍처, 프롬프트 방법론 등 기술적 딥다이브)
       - 📊 [실험 결과 분석] (F1 스코어, 정확도 등 구체적인 수치 데이터 포함)
       - 🌍 [세상에 미치는 영향 & 실무 적용 사례] (현업 개발자나 기업이 이 기술을 어떻게 적용할 수 있는지, 구체적 사례 제시)
    2. 전문성과 대중성을 모두 잡기 위해, 각 챕터의 소제목 아래에 가벼운 1줄 요약을 먼저 던지고 깊은 내용으로 들어갈 것.
    3. 논문 원본 정보(제목, 저자, 발행일, PDF 링크)를 반드시 포함할 것.
    
    논문 원문 데이터:
    제목: {paper['title']}
    저자: {', '.join(paper['authors'])}
    발행일: {paper['published'][:10]}
    PDF 링크: {paper['pdf_link']}
    
    [논문 전체 텍스트 시작]
    {full_text}
    [논문 전체 텍스트 끝]
    """
    
    response = model.generate_content(prompt)
    return response.text

def mock_generate_post(paper, full_text):
    """Fallback if no API key is provided."""
    print("No GEMINI_API_KEY found. Generating fallback mock post with parsed PDF data.")
    
    korean_title = f"[AI 번역 뼈대 완성] {paper['title']}"
    
    # Show first 1000 characters to prove we read the PDF
    preview_text = full_text[:1000].replace('\n', '  ')
    
    markdown_content = f"""# {korean_title}

> **⚠️ API 키 미설정 알림**
> 현재 `GEMINI_API_KEY`가 환경변수에 없어 AI 번역이 생략되었습니다. 하지만 **PDF 파싱 파이프라인은 완벽하게 작동 중**입니다! 
> 아래에서 실제로 다운로드 및 추출된 PDF 원문 텍스트의 앞부분을 확인하실 수 있습니다.

## 📄 논문 정보
- **원문 제목**: {paper['title']}
- **저자**: {', '.join(paper['authors'])}
- **발행일**: {paper['published'][:10]}
- **[PDF 원문 보기]({paper['pdf_link']})**

---

## 🛠 추출된 PDF 원문 텍스트 (미리보기)

```text
{preview_text}... (중략) ...
```

## 🚀 다음 단계 가이드
터미널에서 다음 명령어로 Gemini API 키를 등록하고 스크립트를 다시 실행하시면, 
이 거대한 PDF 텍스트가 **완벽한 한국어 튜토리얼 블로그 글**로 변환됩니다!

```bash
export GEMINI_API_KEY="당신의_API_키"
python3 process_content.py
```
"""
    return markdown_content

def generate_blog_posts():
    papers = fetch_latest_cs_ai_papers(max_results=10) # 10 papers per run as requested
    
    output_dir = os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "content")
    os.makedirs(output_dir, exist_ok=True)
    
    metadata_list = []
    
    for idx, paper in enumerate(papers):
        print(f"\n--- Processing [{idx+1}/{len(papers)}]: {paper['title']}")
        
        safe_id = ''.join(c if c.isalnum() else '_' for c in paper['title'][:30]).lower()
        
        # Search for any existing file containing this safe_id (to handle older files with idx in name)
        existing_files = [f for f in os.listdir(output_dir) if safe_id in f and f.endswith('.md')]
        filename = existing_files[0] if existing_files else f"post_{safe_id}.md"
        filepath = os.path.join(output_dir, filename)
        
        # Check if we already processed this paper successfully
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                content_preview = f.read(500)
            
            # If it's the first manually translated masterpiece, or it was successfully translated by Gemini
            if (idx == 0 and "evaluating_open_weight_llms" in safe_id) or ("⚠️ API 키 미설정 알림" not in content_preview and "파싱 성공/번역 에러" not in content_preview):
                print(f"Skipping already translated paper: {filename}")
                
                # Extract the Korean title from the first line
                korean_title_preview = content_preview.split('\n')[0].replace('# ', '').strip()
                if not korean_title_preview:
                    korean_title_preview = "[Gemini 번역] " + paper['title'][:40] + "..."
                    
                metadata_list.append({
                    "id": filename.replace('.md', ''),
                    "filename": filename,
                    "original_title": paper['title'],
                    "korean_title": korean_title_preview,
                    "published": paper['published'][:10],
                    "authors": paper['authors'][:2],
                    "tags": ["AI", "Full-PDF", "Gemini"]
                })
                continue
                
        # If we reach here, we need to process it
        full_text = download_and_parse_pdf(paper['pdf_link'], safe_id)
        
        if api_key:
            max_retries = 3
            success = False
            for attempt in range(max_retries):
                try:
                    # Enforce a strict timeout using signal alarm
                    def timeout_handler(signum, frame):
                        raise TimeoutError("408 Request Timeout: Gemini API took longer than 180 seconds.")
                    
                    signal.signal(signal.SIGALRM, timeout_handler)
                    signal.alarm(180) # Set timeout to 180 seconds to allow for long PDFs
                    
                    try:
                        md_content = generate_post_with_gemini(paper, full_text)
                    finally:
                        signal.alarm(0) # Disable the alarm if successful or error occurred
                        
                    korean_title_preview = "[Gemini 번역] " + paper['title'][:40] + "..."
                    first_line = md_content.split('\n')[0].replace('# ', '').strip()
                    if first_line:
                        korean_title_preview = first_line
                    success = True
                    break
                except Exception as e:
                    error_msg = str(e)
                    print(f"Error calling Gemini (Attempt {attempt+1}/{max_retries}): {error_msg}")
                    if "429" in error_msg or "ResourceExhausted" in error_msg or "quota" in error_msg.lower():
                        print("Rate limit hit. Waiting 30 seconds before retrying...")
                        time.sleep(30)
                    elif "408" in error_msg or "Timeout" in error_msg:
                        print("Timeout hit. Waiting 10 seconds before retrying...")
                        time.sleep(10)
                    else:
                        break # Break on 400 or other non-retriable errors
            
            if not success:
                print(f"Failed to translate paper after retries: {paper['title']}. Skipping.")
                continue
        else:
            md_content = mock_generate_post(paper, full_text)
            korean_title_preview = "[PDF 100% 파싱 완료] " + paper['title'][:40] + "..."
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(md_content)
            
        metadata_list.append({
            "id": filename.replace('.md', ''),
            "filename": filename,
            "original_title": paper['title'],
            "korean_title": korean_title_preview,
            "published": paper['published'][:10],
            "authors": paper['authors'][:2],
            "tags": ["AI", "Full-PDF", "Gemini"]
        })
        
        if api_key:
            print("Sleeping for 15 seconds to respect free tier rate limits (5 RPM)...")
            time.sleep(15)
        
    meta_path = os.path.join(output_dir, "metadata.json")
    
    # Load existing metadata to accumulate papers over time
    existing_meta = []
    if os.path.exists(meta_path):
        try:
            with open(meta_path, 'r', encoding='utf-8') as f:
                existing_meta = json.load(f)
        except Exception as e:
            print(f"Could not load existing metadata: {e}")
            
    # Merge new metadata into existing metadata (avoid duplicates by ID)
    merged_dict = {item['id']: item for item in existing_meta}
    for item in metadata_list:
        merged_dict[item['id']] = item
        
    # Convert back to list and sort by published date (descending, newest first)
    final_meta = list(merged_dict.values())
    final_meta.sort(key=lambda x: x.get('published', ''), reverse=True)
    
    with open(meta_path, 'w', encoding='utf-8') as f:
        json.dump(final_meta, f, ensure_ascii=False, indent=2)
        
    # Generate SEO Sitemap
    sitemap_path = os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "sitemap.xml")
    
    sitemap_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    # Add root URL
    sitemap_content += '  <url>\n    <loc>https://arxiv-ai-blog.vercel.app/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n'
    
    # Add paper URLs (In our React app, we might not have dynamic routes yet, but let's assume hash routing or query params if needed, or simply the main page)
    # Since it's a SPA without explicit dynamic routes (just conditionally rendering MarkdownViewer), the main page is what matters. 
    # But to index specific papers, React Router would be needed. For now, indexing the main page daily is the most important part.
    sitemap_content += '</urlset>'
    
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write(sitemap_content)
        
    print(f"\n✅ Successfully processed {len(papers)} papers in {output_dir}")

if __name__ == "__main__":
    generate_blog_posts()
