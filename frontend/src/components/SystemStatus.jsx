import React from 'react';

const formatKst = (iso) => iso ? new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', month: 'numeric', day: 'numeric'
}).format(new Date(iso)) : '정보 없음';

const ago = (iso) => {
  if (!iso) return '정보 없음';
  const minutes = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 60000));
  if (minutes < 1) return '방금 전';
  if (minutes < 60) return `${minutes}분 전`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}시간 전`;
  return `${Math.floor(minutes / 1440)}일 전`;
};

const SystemStatus = ({ totalPapers, status }) => {
  const lastRun = status?.last_publication_run || status?.last_run;
  const healthy = lastRun?.health !== 'degraded';
  const generated = lastRun?.generated ?? 0;
  const retryCount = status?.retry_count ?? 0;
  const usage = lastRun?.usage;
  const next = retryCount && status?.next_retry_at ? status.next_retry_at : status?.next_scheduled_at;
  const nextLabel = retryCount && status?.next_retry_at ? '다음 재시도' : '다음 자동 실행';
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
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.05em', opacity: 0.7, color: '#38bdf8' }}>최근 완료</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{ago(lastRun?.finished_at)} · {generated}개 발행</span>
            <span style={{ 
              background: 'rgba(56, 189, 248, 0.15)', 
              color: '#38bdf8', 
              padding: '2px 6px', 
              borderRadius: '4px', 
              fontSize: '0.65rem', 
              fontWeight: 700 
            }}>
              재시도 {retryCount}개
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.05em', opacity: 0.7 }}>{nextLabel}</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{formatKst(next)} KST <span style={{ opacity: 0.5 }}>전후</span></span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.05em', opacity: 0.7 }}>이번 비용 추정</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>${usage?.estimated_usd?.toFixed(4) ?? '0.0000'} <span style={{ opacity: 0.5, fontSize: '0.75rem' }}>{usage?.total_tokens?.toLocaleString?.() ?? 0} tokens</span></span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
