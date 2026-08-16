import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Moon, Search, Sparkles } from 'lucide-react';

function ArchiveCard({ paper, onSelect }) {
  return <article className="archive-card">
    <button onClick={() => onSelect(paper)}>
      <div className="archive-card-top"><div>{(paper.tags || []).slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div><time>{paper.published}</time></div>
      <h3>{paper.korean_title}</h3>
      <p>{paper.korean_subtitle || paper.original_title}</p>
      <footer><span>{paper.authors?.join(', ') || 'arXiv 연구팀'}</span><strong>약 {paper.reading_minutes || 3}분 <ArrowUpRight size={16} /></strong></footer>
    </button>
  </article>;
}

export default function ArchiveMode({ papers, status, onSelect, onExit }) {
  const [topic, setTopic] = useState('전체');
  const [query, setQuery] = useState('');
  const topics = useMemo(() => {
    const counts = new Map();
    papers.forEach((paper) => (paper.tags || []).forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ko')).slice(0, 10);
  }, [papers]);
  const visible = papers.filter((paper) => {
    const text = `${paper.korean_title} ${paper.korean_subtitle} ${paper.original_title} ${(paper.tags || []).join(' ')}`.toLowerCase();
    return (topic === '전체' || paper.tags?.includes(topic)) && (!query.trim() || text.includes(query.trim().toLowerCase()));
  });
  const lastRun = status?.last_publication_run || status?.last_run;

  return <main className="archive-mode" aria-label="아카이브 모드">
    <section className="archive-hero">
      <div className="archive-orb"><Moon size={24} /></div>
      <p className="archive-kicker"><Sparkles size={14} /> QUIET READING MODE</p>
      <h1>ArXiv <span>Translator AI</span></h1>
      <p>쌓인 AI 연구 해설을 방해 없이 읽고, 주제별로 천천히 탐색하는 다크 아카이브입니다.</p>
      <button onClick={onExit}>리서치 데스크로 돌아가기 <ArrowUpRight size={17} /></button>
    </section>
    <section className="archive-status"><span className="archive-pulse" /><strong>{lastRun?.health === 'degraded' ? '발행 확인 필요' : 'Archive online'}</strong><span>누적 {papers.length}편</span><span>최근 실행 {lastRun?.generated ?? 0}편 발행</span></section>
    <section className="archive-toolbar">
      <label><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="아카이브 검색" /></label>
      <div>{[ ['전체', papers.length], ...topics ].map(([label, count]) => <button key={label} className={topic === label ? 'active' : ''} onClick={() => { setTopic(label); setQuery(''); }}>{label} <span>{count}</span></button>)}</div>
    </section>
    <div className="archive-heading"><div><p>DECODED PAPERS</p><h2>{topic === '전체' ? '최신 해설 아카이브' : `${topic} 연구`}</h2></div><strong>{visible.length}편</strong></div>
    {visible.length ? <div className="archive-grid">{visible.map((paper) => <ArchiveCard key={paper.id} paper={paper} onSelect={onSelect} />)}</div> : <div className="archive-empty">검색 조건에 맞는 논문이 없습니다.</div>}
  </main>;
}
