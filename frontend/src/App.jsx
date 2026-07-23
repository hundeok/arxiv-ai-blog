import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import PaperCard from './components/PaperCard';
const MarkdownViewer = lazy(() => import('./components/MarkdownViewer'));
import AdBanner from './components/AdBanner';
import SystemStatus from './components/SystemStatus';
import Analytics from './components/Analytics';
import { track } from './components/Analytics';

function App() {
  const [papers, setPapers] = useState([]);
  const [pipelineStatus, setPipelineStatus] = useState(null);
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

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Analytics page={selectedId ? `/papers/${selectedId}` : '/'} paperId={selectedId} />
      <VercelAnalytics />
      <header style={{ marginBottom: '4rem', textAlign: 'center', paddingTop: '2rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
          ArXiv <span className="gradient-text">Translator AI</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Demystifying the latest Artificial Intelligence research through automated, high-quality Korean summaries.
        </p>
      </header>


      {selectedId ? (
        <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>논문을 불러오는 중입니다.</div>}><MarkdownViewer 
          filename={selectedPaper?.filename} paper={selectedPaper}
          onBack={() => { window.history.pushState({}, '', '/'); setSelectedId(null); }} 
        /></Suspense>
      ) : (
        <main>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
            <SystemStatus totalPapers={papers.length} status={pipelineStatus} />
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0, marginTop: '1rem' }}>Latest Decoded Papers</h2>
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
                {papers.map((paper, index) => (
                  <React.Fragment key={paper.id}>
                    <PaperCard 
                      paper={paper} 
                      onClick={() => selectPaper(paper)}
                    />
                    {/* Add an in-feed ad banner after every 5th card */}
                    {(index + 1) % 5 === 0 && (
                       <AdBanner position="in-feed" />
                    )}
                  </React.Fragment>
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
