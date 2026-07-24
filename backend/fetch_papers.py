import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
import os

def fetch_latest_cs_ai_papers(max_results=3):
    url = f'https://export.arxiv.org/api/query?search_query=cat:cs.AI&sortBy=submittedDate&sortOrder=descending&max_results={max_results}'
    
    print(f"Fetching from ArXiv: {url}")
    response = urllib.request.urlopen(url)
    data = response.read()
    
    root = ET.fromstring(data)
    namespace = {'atom': 'http://www.w3.org/2005/Atom'}
    
    papers = []
    for entry in root.findall('atom:entry', namespace):
        title = entry.find('atom:title', namespace).text.strip()
        summary = entry.find('atom:summary', namespace).text.strip()
        published = entry.find('atom:published', namespace).text.strip()
        
        authors = [author.find('atom:name', namespace).text for author in entry.findall('atom:author', namespace)]
        
        # Get PDF link
        pdf_link = ""
        for link in entry.findall('atom:link', namespace):
            if link.attrib.get('title') == 'pdf':
                pdf_link = link.attrib.get('href')
                
        papers.append({
            'title': title.replace('\n', ' '),
            'summary': summary.replace('\n', ' '),
            'published': published,
            'authors': authors,
            'pdf_link': pdf_link
        })
        
    return papers

import json

def fetch_trending_papers(max_results=10):
    print("Fetching trending paper IDs from Hugging Face Daily Papers...")
    try:
        hf_url = "https://huggingface.co/api/daily_papers"
        req = urllib.request.Request(hf_url, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req)
        data = json.loads(response.read())
        
        arxiv_ids = []
        for item in data[:max_results]:
            paper = item.get("paper", {})
            if "id" in paper:
                arxiv_ids.append(paper["id"])
                
        if not arxiv_ids:
            print("No trending papers found, falling back to chronological.")
            return fetch_latest_cs_ai_papers(max_results)
            
        id_list = ",".join(arxiv_ids)
        arxiv_url = f'https://export.arxiv.org/api/query?id_list={id_list}'
        print(f"Fetching from ArXiv by IDs: {arxiv_url}")
        
        response = urllib.request.urlopen(arxiv_url)
        xml_data = response.read()
        
        root = ET.fromstring(xml_data)
        namespace = {'atom': 'http://www.w3.org/2005/Atom'}
        
        papers = []
        for entry in root.findall('atom:entry', namespace):
            title = entry.find('atom:title', namespace).text.strip()
            summary = entry.find('atom:summary', namespace).text.strip()
            published = entry.find('atom:published', namespace).text.strip()
            authors = [author.find('atom:name', namespace).text for author in entry.findall('atom:author', namespace)]
            pdf_link = ""
            for link in entry.findall('atom:link', namespace):
                if link.attrib.get('title') == 'pdf':
                    pdf_link = link.attrib.get('href')
                    
            papers.append({
                'title': title.replace('\n', ' '),
                'summary': summary.replace('\n', ' '),
                'published': published,
                'authors': authors,
                'pdf_link': pdf_link
            })
            
        return papers
    except Exception as e:
        print(f"Failed to fetch trending papers: {e}")
        return fetch_latest_cs_ai_papers(max_results)

if __name__ == "__main__":
    print("Testing Trending...")
    papers = fetch_trending_papers(3)
    for i, p in enumerate(papers):
        print(f"[{i+1}] {p['title']}")
