import React from 'react';

export default function PaperCard({ paper, onClick }) {
  return (
    <div 
      className="glass"
      style={{
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onClick={() => onClick(paper.id)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.background = 'var(--bg-card-hover)';
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.boxShadow = '0 10px 30px -10px var(--accent-glow)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.background = 'var(--bg-card)';
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {paper.tags.map(tag => (
          <span 
            key={tag}
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.25rem 0.75rem',
              borderRadius: '99px',
              background: 'rgba(99, 102, 241, 0.1)',
              color: '#818cf8',
              border: '1px solid rgba(99, 102, 241, 0.2)'
            }}
          >
            {tag}
          </span>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          {paper.published}
        </span>
      </div>
      
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', lineHeight: 1.4 }}>
        {paper.korean_title}
      </h3>
      
      <p style={{ 
        fontSize: '0.875rem', 
        color: 'var(--text-secondary)',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {paper.korean_subtitle || paper.original_title}
      </p>
      
      <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{
          width: '24px', height: '24px', borderRadius: '50%',
          background: 'linear-gradient(45deg, #4f46e5, #ec4899)'
        }}></div>
        <span style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>
          {paper.authors.join(', ')}
        </span>
      </div>
    </div>
  );
}
