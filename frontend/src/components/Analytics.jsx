import { useEffect } from 'react';

// A GA measurement ID is public by design. Environment configuration can
// override this value for forks or future properties.
const id = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-V4G2FBSDMG';
export const track = (name, params = {}) => window.gtag?.('event', name, params);

export default function Analytics({ page }) {
  useEffect(() => {
    if (!id) return;
    if (!document.querySelector(`script[data-ga="${id}"]`)) {
      const script = document.createElement('script');
      script.async = true; script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`; script.dataset.ga = id;
      document.head.appendChild(script);
      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args) => window.dataLayer.push(args);
      window.gtag('js', new Date()); window.gtag('config', id, { send_page_view: false });
    }
    window.gtag?.('event', 'page_view', { page_path: page });
  }, [page]);
  return null;
}
