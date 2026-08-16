import React from 'react';

const ago = (iso) => {
  if (!iso) return '상태 확인 중';
  const minutes = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 60000));
  if (minutes < 60) return `${minutes || 1}분 전`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}시간 전`;
  return `${Math.floor(minutes / 1440)}일 전`;
};

export default function SystemStatus({ totalPapers, status }) {
  const lastRun = status?.last_publication_run || status?.last_run;
  const generated = lastRun?.generated ?? 0;
  const healthy = lastRun?.health !== 'degraded';
  return <section className="system-note" aria-label="발행 현황"><span className={`system-dot ${healthy ? '' : 'warning'}`} /><p><strong>연구 아카이브가 정상적으로 갱신 중입니다.</strong> 최근 실행 {ago(lastRun?.finished_at)} · 이번 실행 {generated}편 · 누적 {totalPapers}편</p><span className="system-quiet">자동 발행 · 품질 검증 · 영구 아카이브</span></section>;
}
