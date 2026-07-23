import { useEffect } from 'react';

// A GA measurement ID is public by design. Environment configuration can
// override this value for forks or future properties.
const id = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-V4G2FBSDMG';

const ensureAnalytics = () => {
  if (!id || typeof window === 'undefined') return null;

  if (!document.querySelector(`script[data-ga="${id}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    script.dataset.ga = id;
    document.head.appendChild(script);
  }

  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args) => window.dataLayer.push(args);
    window.gtag('js', new Date());
    window.gtag('config', id, { send_page_view: false });
  }

  return window.gtag;
};

export const track = (name, params = {}) => ensureAnalytics()?.('event', name, params);

export default function Analytics({ page, paperId }) {
  useEffect(() => {
    track('page_view', { page_path: page, page_location: window.location.href });
  }, [page]);

  // `paper_open` measures the card interaction. `paper_view` measures the
  // article itself and is mirrored by the static HTML pages for search visits.
  useEffect(() => {
    if (paperId) track('paper_view', { paper_id: paperId, content_type: 'paper' });
  }, [paperId]);

  return null;
}
