import React from 'react';

const SystemStatus = ({ totalPapers }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      padding: '0.75rem 1.25rem',
      background: 'rgba(255,255,255,0.03)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '12px',
      fontSize: '0.85rem',
      color: 'var(--text-secondary)'
    }}>
      {/* Status Indicator with Micro-visualization */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div className="status-pulse"></div>
        <span style={{ fontWeight: 600, color: '#4ade80' }}>Pipeline Active</span>
        
        {/* Techy Data Stream Waveform */}
        <div className="data-stream">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>

      <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)' }}></div>

      {/* Stats */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.7 }}>Decoded</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{totalPapers} <span style={{ opacity: 0.5 }}>papers</span></span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.7 }}>Daily Quota</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>15 <span style={{ opacity: 0.5 }}>max</span></span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.7 }}>Next Sync</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>09:00 <span style={{ opacity: 0.5 }}>KST</span></span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
