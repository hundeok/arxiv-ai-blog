import React, { useState, useEffect } from 'react';
import PaperCard from './components/PaperCard';
import MarkdownViewer from './components/MarkdownViewer';
import AdBanner from './components/AdBanner';
import SystemStatus from './components/SystemStatus';

function App() {
  const [papers, setPapers] = useState([]);
  const [selectedPaperId, setSelectedPaperId] = useState(null);

  useEffect(() => {
    // Load metadata.json from public directory
    fetch('/content/metadata.json')
      .then(res => res.json())
      .then(data => setPapers(data))
      .catch(err => console.error("Failed to load metadata", err));
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '4rem', textAlign: 'center', paddingTop: '2rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
          ArXiv <span className="gradient-text">Translator AI</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Demystifying the latest Artificial Intelligence research through automated, high-quality Korean summaries.
        </p>
      </header>

      {selectedPaperId ? (
        <MarkdownViewer 
          paperId={selectedPaperId} 
          onBack={() => setSelectedPaperId(null)} 
        />
      ) : (
        <main>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Latest Decoded Papers</h2>
            <SystemStatus totalPapers={papers.length} />
          </div>
          
          {papers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
              No papers loaded. Please run the backend script.
            </div>
          ) : (
            <>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
                gap: '2rem' 
              }}>
                {papers.map((paper, index) => (
                  <React.Fragment key={paper.id}>
                    <PaperCard 
                      paper={paper} 
                      onClick={setSelectedPaperId}
                    />
                    {/* Add an in-feed ad banner after every 5th card */}
                    {(index + 1) % 5 === 0 && (
                       <AdBanner position="in-feed" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </>
          )}
        </main>
      )}
    </div>
  );
}

export default App;
