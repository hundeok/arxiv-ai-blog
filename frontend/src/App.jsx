import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { ArrowDown, ArrowUpRight, BookOpen, Menu, Search, Sparkles } from 'lucide-react';
import PaperCard from './components/PaperCard';
import SystemStatus from './components/SystemStatus';
import Analytics, { track } from './components/Analytics';

const MarkdownViewer = lazy(() => import('./components/MarkdownViewer'));

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function App() {
  const [papers, setPapers] = useState([]);
  const [pipelineStatus, setPipelineStatus] = useState(null);
  const [activeTopic, setActiveTopic] = useState('전체');
  const [query, setQuery] = useState('');
  const params = new URLSearchParams(window.location.search);
  const legacyPaper = params.get('p');
  const initialId = legacyPaper || window.location.pathname.match(/^\/papers\/([^/]+)$/)?.[1] || null;
  const [selectedId, setSelectedId] = useState(initialId);

  useEffect(() => {
    if (legacyPaper) window.history.replaceState({}, '', `/papers/${legacyPaper}`);
    fetch('/content/metadata.json').then((res) => res.json()).then(setPapers).catch(() => setPapers([]));
    fetch('/content/pipeline-status.json').then((res) => res.ok ? res.json() : null).then(setPipelineStatus).catch(() => setPipelineStatus(null));
  }, []);

  useEffect(() => {
    const onPopState = () => setSelectedId(window.location.pathname.match(/^\/papers\/([^/]+)$/)?.[1] || null);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const topicCounts = useMemo(() => {
    const counts = new Map();
    papers.forEach((paper) => (paper.tags || []).forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ko'));
  }, [papers]);
  const topTopics = topicCounts.slice(0, 8);
  const selectedPaper = papers.find((paper) => paper.id === selectedId);
  const visiblePapers = papers.filter((paper) => {
    const text = `${paper.korean_title} ${paper.korean_subtitle} ${paper.original_title} ${(paper.authors || []).join(' ')} ${(paper.tags || []).join(' ')}`.toLowerCase();
    return (activeTopic === '전체' || paper.tags?.includes(activeTopic)) && (!query.trim() || text.includes(query.trim().toLowerCase()));
  });
  const featured = papers.slice(0, 3);
  const selectPaper = (paper) => { track('paper_open', { paper_id: paper.id, topic: paper.topic || 'unknown' }); window.history.pushState({}, '', `/papers/${paper.id}`); setSelectedId(paper.id); window.scrollTo({ top: 0, behavior: 'instant' }); };
  const goHome = () => { window.history.pushState({}, '', '/'); setSelectedId(null); window.scrollTo({ top: 0, behavior: 'instant' }); };
  const chooseTopic = (topic) => { setActiveTopic(topic); setQuery(''); scrollTo('archive'); };

  return (
    <div className="site-shell">
      <Analytics page={selectedId ? `/papers/${selectedId}` : '/'} paperId={selectedId} />
      <VercelAnalytics />
      <header className="site-header">
        <button className="wordmark" onClick={goHome} aria-label="ArXiv Research Desk 홈">
          <span className="wordmark-mark">A</span><span>ArXiv<br />Research Desk</span>
        </button>
        <nav className="desktop-nav" aria-label="주요 메뉴">
          <button onClick={goHome}>최신 해설</button>
          <button onClick={() => { goHome(); scrollTo('topics'); }}>주제 지도</button>
          <button onClick={() => { goHome(); scrollTo('archive'); }}>논문 아카이브</button>
          <a href="/about/">운영 원칙</a>
        </nav>
        <button className="menu-button" onClick={() => scrollTo('topics')} aria-label="연구 주제 탐색"><Menu size={20} /></button>
      </header>

      {selectedId ? (
        <Suspense fallback={<div className="loading-state">논문 해설을 펼치는 중입니다…</div>}>
          <MarkdownViewer filename={selectedPaper?.filename} paper={selectedPaper} papers={papers} onSelect={selectPaper} onBack={goHome} />
        </Suspense>
      ) : (
        <main>
          <section className="hero-grid" aria-labelledby="hero-title">
            <aside className="research-rail">
              <p className="rail-label"><Sparkles size={14} /> RESEARCH INDEX</p>
              <p>관심 있는 연구 축을 고르면, 쌓여 있는 해설을 바로 탐색할 수 있습니다.</p>
              <div className="rail-links">
                {topTopics.slice(0, 5).map(([topic], index) => <button key={topic} onClick={() => chooseTopic(topic)}><span>{String(index + 1).padStart(2, '0')}</span>{topic}<ArrowUpRight size={15} /></button>)}
              </div>
            </aside>
            <div className="hero-content">
              <p className="eyebrow">KOREAN AI RESEARCH ARCHIVE · UPDATED EVERY 3 HOURS</p>
              <h1 id="hero-title">오늘의 AI 연구를<br /><em>맥락까지</em><span className="h1-tail"> 읽습니다.</span></h1>
              <p className="hero-copy">쏟아지는 arXiv 논문에서 실제로 흐름을 만드는 연구를 찾아, 핵심·한계·실무적 의미까지 한국어로 정리합니다.</p>
              <div className="hero-actions">
                <button className="primary-button" onClick={() => scrollTo('archive')}>최신 해설 읽기 <ArrowDown size={18} /></button>
                <button className="text-button" onClick={() => scrollTo('topics')}>연구 주제부터 보기</button>
              </div>
              <div className="hero-stats">
                <div><strong>{papers.length}</strong><span>누적 해설</span></div>
                <div><strong>{topicCounts.length}</strong><span>연구 축</span></div>
                <div><strong>3h</strong><span>갱신 주기</span></div>
              </div>
            </div>
          </section>

          <SystemStatus totalPapers={papers.length} status={pipelineStatus} />

          <section id="topics" className="topic-section section-block" aria-labelledby="topic-heading">
            <div className="section-heading"><div><p className="eyebrow">EXPLORE THE MAP</p><h2 id="topic-heading">연구 주제 지도</h2></div><p>언어·국가 정보가 아닌, 논문이 실제로 푸는 문제와 사용한 접근법을 기준으로 분류합니다.</p></div>
            <div className="topic-board">
              {topTopics.map(([topic, count], index) => <button key={topic} className={`topic-tile topic-tile-${index % 4}`} onClick={() => chooseTopic(topic)}><span>0{index + 1}</span><strong>{topic}</strong><small>{count}편의 해설 <ArrowUpRight size={14} /></small></button>)}
            </div>
          </section>

          <section className="brief-section section-block" aria-labelledby="brief-heading">
            <div className="brief-label"><BookOpen size={18} /><span>NEWLY DECODED</span></div>
            <div className="section-heading"><div><p className="eyebrow">START HERE</p><h2 id="brief-heading">최근 도착한 연구</h2></div><p>가장 최근 발행된 해설부터 훑어보고, 관심 주제로 더 깊게 들어가세요.</p></div>
            <div className="feature-strip">
              {featured.map((paper, index) => <button className="feature-paper" key={paper.id} onClick={() => selectPaper(paper)}><span>0{index + 1}</span><div><p>{(paper.tags || []).slice(0, 2).join(' · ')}</p><strong>{paper.korean_title}</strong></div><ArrowUpRight size={20} /></button>)}
            </div>
          </section>

          <section id="archive" className="archive-section section-block" aria-labelledby="archive-heading">
            <div className="section-heading archive-title"><div><p className="eyebrow">THE ARCHIVE</p><h2 id="archive-heading">모든 연구 해설</h2></div><p>발행한 글은 유지하고, 새 글이 위로 쌓이는 살아 있는 연구 데이터베이스입니다.</p></div>
            <div className="archive-controls">
              <label className="search-box"><Search size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="제목, 저자, 주제로 검색" aria-label="논문 검색" /></label>
              <div className="filter-list" aria-label="주제 필터"><button className={activeTopic === '전체' ? 'active' : ''} onClick={() => chooseTopic('전체')}>전체 <span>{papers.length}</span></button>{topTopics.map(([topic, count]) => <button key={topic} className={activeTopic === topic ? 'active' : ''} onClick={() => chooseTopic(topic)}>{topic} <span>{count}</span></button>)}</div>
            </div>
            <div className="archive-meta"><span>{activeTopic === '전체' ? '전체 아카이브' : activeTopic}</span><strong>{visiblePapers.length}편</strong></div>
            {visiblePapers.length ? <div className="paper-grid">{visiblePapers.map((paper) => <PaperCard key={paper.id} paper={paper} onClick={() => selectPaper(paper)} />)}</div> : <div className="empty-state">검색 조건에 맞는 논문이 없습니다. 다른 주제나 검색어를 시도해 보세요.</div>}
          </section>
        </main>
      )}
      <footer className="site-footer"><div><strong>ArXiv Research Desk</strong><p>AI 연구를 더 멀리, 더 정확하게 읽기 위한 한국어 아카이브.</p></div><div><a href="/about/">소개</a><a href="/contact/">문의</a><a href="/privacy/">개인정보</a><a href="/ai-policy/">AI·저작권 고지</a></div></footer>
    </div>
  );
}

export default App;
