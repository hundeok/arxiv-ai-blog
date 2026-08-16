import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function PaperCard({ paper, onClick }) {
  return (
    <article className="paper-card">
      <button className="paper-card-button" onClick={() => onClick(paper)}>
        <div className="paper-card-top"><span className="paper-number">#{paper.id.replace(/\D/g, '').slice(-4)}</span><time>{paper.published}</time></div>
        <div className="paper-tags">{(paper.tags || []).slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
        <h3>{paper.korean_title}</h3>
        <p>{paper.korean_subtitle || paper.original_title}</p>
        <div className="paper-card-bottom"><span>{paper.authors?.join(', ') || 'arXiv 연구팀'}</span><span>약 {paper.reading_minutes || 3}분 <ArrowUpRight size={16} /></span></div>
      </button>
    </article>
  );
}
