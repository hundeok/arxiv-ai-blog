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

if __name__ == "__main__":
    papers = fetch_latest_cs_ai_papers()
    for i, p in enumerate(papers):
        print(f"[{i+1}] {p['title']}")
