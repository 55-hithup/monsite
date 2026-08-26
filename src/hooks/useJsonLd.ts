import { useEffect } from 'react';

export function useJsonLd(data: object, id: string) {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);

    return () => {
      const existing = document.getElementById(id);
      if (existing && !id.endsWith('-ssg')) {
        existing.remove();
      }
    };
  }, [data, id]);
}
