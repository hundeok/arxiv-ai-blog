import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';
import AdBanner from './AdBanner';

export default function MarkdownViewer({ filename, onBack }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the markdown content from public folder
    fetch(`/content/${filename}`)
      .then(res => {
        if (!res.ok) throw new Error("Not Found");
        return res.text();
      })
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setContent('# Error loading content\nFailed to load the translated paper.');
        setLoading(false);
      });
  }, [filename]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <div style={{ color: 'var(--accent)', fontSize: '1.25rem' }}>Loading paper...</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
      <button 
        onClick={onBack}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          padding: '1rem 0',
          marginBottom: '2rem',
          fontSize: '1rem',
          fontWeight: 500,
          transition: 'color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
      >
        <ArrowLeft size={20} />
        Back to Papers
      </button>

      <AdBanner position="in-article" />
      
      <div className="markdown-body">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      <AdBanner position="in-article" />
    </div>
  );
}
