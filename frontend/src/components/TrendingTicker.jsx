import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';

export default function TrendingTicker() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetch('https://huggingface.co/api/daily_papers')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const papers = data
            .slice(0, 20)
            .filter(item => item.paper?.title && item.paper?.id)
            .map(item => ({ title: item.paper.title, id: item.paper.id }));
          setTrending(papers);
        }
      })
      .catch(err => console.error('Failed to load trending papers', err));
  }, []);

  if (trending.length === 0) return null;

  return (
    <div style={{
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      marginBottom: '2rem',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'stretch',
      overflow: 'hidden'
    }}>
      {/* Flame Icon Area - Fixed Width */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)', // Vertical separator line
        boxShadow: '5px 0 15px 5px rgba(0,0,0,0.2)',
        zIndex: 10
      }}>
        <div className="flame-icon">
          <Flame size={20} fill="#ff6b00" color="#ff6b00" />
        </div>
      </div>
      
      {/* Scrolling Text Area - Takes remaining width and hides overflow */}
      <div style={{ 
        flex: 1, 
        overflow: 'hidden', 
        display: 'flex',
        alignItems: 'center',
        padding: '0.75rem 0'
      }}>
        <div className="ticker-wrapper" style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
          <div className="ticker-content" style={{ paddingLeft: '2rem' }}>
            {trending.map((paper, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
                <a 
                  href={`https://huggingface.co/papers/${paper.id}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="ticker-link"
                >
                  {paper.title}
                </a>
                <span style={{ margin: '0 2rem', color: '#ff6b00' }}>•</span>
              </span>
            ))}
          </div>
          <div className="ticker-content" aria-hidden="true">
            {trending.map((paper, i) => (
              <span key={`dup-${i}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
                <a 
                  href={`https://huggingface.co/papers/${paper.id}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="ticker-link"
                >
                  {paper.title}
                </a>
                <span style={{ margin: '0 2rem', color: '#ff6b00' }}>•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes burn {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.9; }
          25% { transform: scale(1.1) rotate(-2deg); opacity: 1; }
          75% { transform: scale(1.1) rotate(2deg); opacity: 1; }
        }
        .ticker-wrapper {
          animation: ticker 80s linear infinite;
        }
        .ticker-wrapper:hover {
          animation-play-state: paused;
        }
        .flame-icon {
          animation: burn 2s ease-in-out infinite;
          display: flex;
        }
        .ticker-link {
          color: var(--text-secondary);
          font-size: 0.95rem;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .ticker-link:hover {
          color: var(--text-primary);
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

