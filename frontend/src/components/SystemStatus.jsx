import React from 'react';

const SystemStatus = ({ totalPapers, status }) => {
  const lastRun = status?.last_run;
  const healthy = lastRun?.health !== 'degraded';
  const generated = lastRun?.generated ?? 0;
  const retryCount = status?.retry_count ?? 0;
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
        <span style={{ fontWeight: 600, color: healthy ? '#4ade80' : '#f87171' }}>
          {healthy ? 'Pipeline healthy' : 'Pipeline needs retry'}
        </span>
        
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
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.7, color: '#38bdf8' }}>Last run</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{generated} <span style={{ opacity: 0.5, fontSize: '0.75rem' }}>new</span></span>
            <span style={{ 
              background: 'rgba(56, 189, 248, 0.15)', 
              color: '#38bdf8', 
              padding: '2px 6px', 
              borderRadius: '4px', 
              fontSize: '0.65rem', 
              fontWeight: 700 
            }}>
              {retryCount} retry
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.7 }}>Schedule</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Every 6h</span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
