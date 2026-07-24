import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';

export default function TrendingTicker() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetch('https://huggingface.co/api/daily_papers')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Extract titles of top 10 trending papers
          const titles = data.slice(0, 10).map(item => item.paper?.title).filter(Boolean);
          setTrending(titles);
        }
      })
      .catch(err => console.error('Failed to load trending papers', err));
  }, []);

  if (trending.length === 0) return null;

  return (
    <div style={{
      width: '100%',
      backgroundColor: 'rgba(255, 107, 0, 0.1)',
      borderTop: '1px solid rgba(255, 107, 0, 0.2)',
      borderBottom: '1px solid rgba(255, 107, 0, 0.2)',
      padding: '0.75rem 0',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      marginBottom: '2rem'
    }}>
      <div style={{
        position: 'absolute',
        left: 0,
        zIndex: 10,
        backgroundColor: 'var(--bg-secondary)',
        padding: '0 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#ff6b00',
        fontWeight: 'bold',
        height: '100%',
        boxShadow: '10px 0 15px -3px var(--bg-secondary)'
      }}>
        <Flame size={18} fill="#ff6b00" />
        <span>TODAY'S HOT</span>
      </div>
      
      <div className="ticker-wrapper" style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
        <div className="ticker-content" style={{ paddingLeft: '150px' }}>
          {trending.map((title, i) => (
            <span key={i} style={{ 
              display: 'inline-flex', 
              alignItems: 'center',
              color: 'var(--text-secondary)',
              fontSize: '0.95rem'
            }}>
              {title}
              <span style={{ margin: '0 1.5rem', color: 'rgba(255, 107, 0, 0.5)' }}>•</span>
            </span>
          ))}
        </div>
        {/* Duplicate for infinite seamless scrolling */}
        <div className="ticker-content" aria-hidden="true">
          {trending.map((title, i) => (
            <span key={`dup-${i}`} style={{ 
              display: 'inline-flex', 
              alignItems: 'center',
              color: 'var(--text-secondary)',
              fontSize: '0.95rem'
            }}>
              {title}
              <span style={{ margin: '0 1.5rem', color: 'rgba(255, 107, 0, 0.5)' }}>•</span>
            </span>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-wrapper {
          animation: ticker 40s linear infinite;
        }
        .ticker-wrapper:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
