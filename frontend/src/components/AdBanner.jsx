import React, { useEffect } from 'react';

export default function AdBanner({ format = 'auto', className = '', position = 'in-article' }) {
  useEffect(() => {
    // 실전 배포 시, 이 주석을 풀고 구글 애드센스 스크립트를 활성화합니다.
    // try {
    //   (window.adsbygoogle = window.adsbygoogle || []).push({});
    // } catch (err) {
    //   console.error("AdSense Error:", err);
    // }
  }, []);

  return (
    <div 
      className={`ad-container ${className}`} 
      style={{
        width: '100%',
        minHeight: position === 'in-feed' ? '250px' : '100px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px dashed rgba(255, 255, 255, 0.15)',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-secondary)',
        margin: '2rem 0',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <span style={{ 
        fontSize: '0.75rem', 
        textTransform: 'uppercase', 
        letterSpacing: '1.5px', 
        opacity: 0.4,
        marginBottom: '0.5rem'
      }}>
        Advertisement (Google AdSense Placeholder)
      </span>
      <div style={{ fontSize: '0.85rem', opacity: 0.6 }}>
        {position === 'in-feed' ? '인피드 네이티브 광고 영역' : '본문 내 배너 광고 영역'}
      </div>
      
      {/* 
        추후 발급받을 애드센스 코드를 아래에 삽입합니다.
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format={format}
             data-full-width-responsive="true"></ins> 
      */}
    </div>
  );
}
