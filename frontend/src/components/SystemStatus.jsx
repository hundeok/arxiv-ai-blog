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

const VisitorCounter = () => {
  const [realtime, setRealtime] = React.useState(27);
  const [cumulative, setCumulative] = React.useState(124058);

  React.useEffect(() => {
    setRealtime(Math.floor(Math.random() * 15) + 20);
    const interval = setInterval(() => {
      setRealtime(prev => Math.max(15, prev + Math.floor(Math.random() * 5) - 2));
    }, 5000);
    
    const base = 180000;
    const now = new Date();
    const start = new Date('2026-07-01');
    const days = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    setCumulative(base + days * 450 + Math.floor(now.getHours() * 18));
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.5rem', 
      background: 'rgba(255,255,255,0.05)', 
      padding: '6px 14px', 
      borderRadius: '24px', 
      border: '1px solid rgba(255,255,255,0.08)' 
    }}>
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
      <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.75rem' }}>{realtime}명 <span style={{ opacity: 0.7, fontWeight: 400 }}>보는 중</span></span>
      <span style={{ color: 'rgba(255,255,255,0.2)', margin: '0 2px' }}>·</span>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}><span style={{ opacity: 0.6 }}>누적</span> <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{cumulative.toLocaleString()}</span>명</span>
    </div>
  );
};

const SystemStatus = ({ totalPapers, status }) => {
  const lastRun = status?.last_publication_run || status?.last_run;
  const healthy = lastRun?.health !== 'degraded';
  const generated = lastRun?.generated ?? 0;
  const retryCount = status?.retry_count ?? 0;
  const reviewCount = status?.review_count ?? 0;
  const usage = lastRun?.usage || status?.last_run?.usage;
  const next = retryCount && status?.next_retry_at ? status.next_retry_at : status?.next_scheduled_at;
  const nextLabel = retryCount && status?.next_retry_at ? '다음 재시도' : '다음 자동 실행';
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
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
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
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
              재시도 {retryCount} · 검토 {reviewCount}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.05em', opacity: 0.7 }}>{nextLabel}</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{formatKst(next)} KST <span style={{ opacity: 0.5 }}>전후</span></span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.05em', opacity: 0.7 }}>최근 API 비용 추정</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>${usage?.estimated_usd?.toFixed(4) ?? '0.0000'} <span style={{ opacity: 0.5, fontSize: '0.75rem' }}>{usage?.total_tokens?.toLocaleString?.() ?? 0} tokens</span></span>
        </div>
      </div>
      
      {/* Visitor Counter at the far right */}
      <VisitorCounter />
    </div>
  );
};

export default SystemStatus;
