import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import PaperCard from './components/PaperCard';
const MarkdownViewer = lazy(() => import('./components/MarkdownViewer'));
import SystemStatus from './components/SystemStatus';
import TrendingTicker from './components/TrendingTicker';
import Analytics from './components/Analytics';
import { track } from './components/Analytics';

function App() {
  const [papers, setPapers] = useState([]);
  const [pipelineStatus, setPipelineStatus] = useState(null);
  const [activeTopic, setActiveTopic] = useState('전체');
  const params = new URLSearchParams(window.location.search);
  const p = params.get('p');
  const initialId = p || window.location.pathname.match(/^\/papers\/([^/]+)$/)?.[1] || null;
  const [selectedId, setSelectedId] = useState(initialId);

  useEffect(() => {
    if (p) {
      window.history.replaceState({}, '', `/papers/${p}`);
    }
    // Load metadata.json from public directory
    fetch('/content/metadata.json')
      .then(res => res.json())
      .then(data => setPapers(data))
      .catch(err => console.error("Failed to load metadata", err));

    fetch('/content/pipeline-status.json')
      .then(res => res.ok ? res.json() : null)
      .then(data => setPipelineStatus(data))
      .catch(() => setPipelineStatus(null));
  }, []);
  useEffect(() => {
    const onPopState = () => setSelectedId(window.location.pathname.match(/^\/papers\/([^/]+)$/)?.[1] || null);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);
  const selectPaper = (paper) => { track('paper_open', { paper_id: paper.id }); window.history.pushState({}, '', `/papers/${paper.id}`); setSelectedId(paper.id); };
  const selectedPaper = papers.find(paper => paper.id === selectedId);
  const topics = useMemo(() => {
    const counts = new Map();
    papers.forEach((paper) => (paper.tags || []).forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ko')).slice(0, 10);
  }, [papers]);
  const visiblePapers = activeTopic === '전체' ? papers : papers.filter((paper) => paper.tags?.includes(activeTopic));
  const goHome = () => { window.history.pushState({}, '', '/'); setSelectedId(null); };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Analytics page={selectedId ? `/papers/${selectedId}` : '/'} paperId={selectedId} />
      <VercelAnalytics />
      <header style={{ marginBottom: '3rem', textAlign: 'center', paddingTop: '2rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
          ArXiv <span className="gradient-text">Translator AI</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          최신 AI 연구를 선별하고, 맥락까지 읽기 쉽게 풀어내는 한국어 리서치 아카이브
        </p>
        <nav aria-label="주요 탐색" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem', fontSize: '0.9rem' }}>
          <button className="nav-button" onClick={() => { goHome(); setActiveTopic('전체'); }}>최신 연구</button>
          <button className="nav-button" onClick={() => { goHome(); document.getElementById('topic-explorer')?.scrollIntoView({ behavior: 'smooth' }); }}>주제 탐색</button>
          <a className="nav-button" href="/about/">운영 원칙</a>
        </nav>
      </header>


      {selectedId ? (
        <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>논문을 불러오는 중입니다.</div>}><MarkdownViewer 
          filename={selectedPaper?.filename} paper={selectedPaper} papers={papers}
          onSelect={selectPaper} onBack={goHome}
        /></Suspense>
      ) : (
        <main>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
            <SystemStatus totalPapers={papers.length} status={pipelineStatus} />
            <TrendingTicker />
            <section id="topic-explorer" className="topic-explorer" aria-label="연구 주제 탐색">
              <div>
                <p className="eyebrow">RESEARCH EXPLORER</p>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0.25rem 0' }}>관심 주제로 연구 탐색</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>언어·출신 국가가 아닌 실제 연구 주제와 접근법으로 분류합니다.</p>
              </div>
              <div className="topic-list">
                <button className={`topic-chip ${activeTopic === '전체' ? 'active' : ''}`} onClick={() => setActiveTopic('전체')}>전체 <span>{papers.length}</span></button>
                {topics.map(([topic, count]) => <button key={topic} className={`topic-chip ${activeTopic === topic ? 'active' : ''}`} onClick={() => setActiveTopic(topic)}>{topic} <span>{count}</span></button>)}
              </div>
            </section>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>{activeTopic === '전체' ? '최신 해설 논문' : `${activeTopic} 연구`}</h2>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{visiblePapers.length}편</span>
            </div>
          </div>
          
          {papers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
              No papers loaded. Please run the backend script.
            </div>
          ) : (
            <>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
                gap: '2rem' 
              }}>
                {visiblePapers.map((paper) => (
                  <PaperCard key={paper.id}
                    paper={paper}
                    onClick={() => selectPaper(paper)}
                  />
                ))}
              </div>
            </>
          )}
        </main>
      )}
      
      <footer style={{ margin: '6rem 0 2rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        <a href="/about/" style={{ color: 'inherit', textDecoration: 'none' }}>소개</a> ·{' '}
        <a href="/contact/" style={{ color: 'inherit', textDecoration: 'none' }}>문의</a> ·{' '}
        <a href="/privacy/" style={{ color: 'inherit', textDecoration: 'none' }}>개인정보처리방침</a> ·{' '}
        <a href="/ai-policy/" style={{ color: 'inherit', textDecoration: 'none' }}>AI·저작권 고지</a>
      </footer>
    </div>
  );
}

export default App;
