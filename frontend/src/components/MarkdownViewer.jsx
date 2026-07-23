import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { ArrowLeft } from 'lucide-react';
import Giscus from '@giscus/react';
import AdBanner from './AdBanner';

export default function MarkdownViewer({ filename, paper, onBack }) {
  const [content, setContent] = useState('');
  const [aiComments, setAiComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!filename) return;
    // Fetch the markdown content from public folder
    fetch(`/content/${filename}`)
      .then(res => {
        if (!res.ok) throw new Error("Not Found");
        return res.text();
      })
      .then(text => {
        const commentsMatch = text.match(/<script type="application\/json" id="ai-comments">\s*([\s\S]*?)\s*<\/script>/);
        if (commentsMatch) {
          try {
            setAiComments(JSON.parse(commentsMatch[1]));
            text = text.replace(commentsMatch[0], '');
          } catch (e) {
            console.error("Failed to parse AI comments", e);
          }
        }
        setContent(text);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setContent('# Error loading content\nFailed to load the translated paper.');
        setLoading(false);
      });
  }, [filename]);
  useEffect(() => {
    if (!paper) return;
    document.title = `${paper.korean_title} | ArXiv Translator AI`;
    const description = paper.korean_subtitle || paper.korean_title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = description;
  }, [paper]);

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
        <ReactMarkdown 
          remarkPlugins={[remarkMath]} 
          rehypePlugins={[rehypeKatex]}
          components={{
            a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }} />
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      <AdBanner position="in-article" />

      {/* AI Comments Section */}
      {aiComments.length > 0 && (
        <div style={{ marginTop: '4rem', padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🔥 <span>AI 전문가 패널 토론</span>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {aiComments.map((comment, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ fontSize: '2rem' }}>{comment.avatar}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{comment.author}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{comment.role}</span>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                    {comment.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Human Comments (Giscus) */}
      <div style={{ marginTop: '4rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          💬 독자 의견 남기기
        </h3>
        <Giscus
          id="comments"
          repo="hundeok/arxiv-ai-blog"
          repoId="R_kgDOTdtoLQ"
          category="General"
          categoryId="DIC_kwDOTdtoLc4DBzAq"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme="dark"
          lang="ko"
        />
      </div>
    </div>
  );
}
