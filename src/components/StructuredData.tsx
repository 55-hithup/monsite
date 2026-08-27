import { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import organizationData from '../data/organization.json';

export default function StructuredData() {
  const { isEn } = useLanguage();

  useEffect(() => {
    // Client-side fallback: if we navigated client-side and the script is not in head, inject it.
    let script = document.getElementById('structured-data-org-ssg') || document.getElementById('structured-data-org-client');
    const localizedData = isEn
      ? {
          ...organizationData,
          description: 'DevSupAi - Freelance web developer specialized in bespoke, high-performance web applications and websites for SMEs and non-profits in France and worldwide.'
        }
      : organizationData;

    if (!script) {
      script = document.createElement('script');
      script.id = 'structured-data-org-client';
      script.setAttribute('type', 'application/ld+json');
      script.textContent = JSON.stringify(localizedData);
      document.head.appendChild(script);
    } else {
      script.textContent = JSON.stringify(localizedData);
    }
  }, [isEn]);

  // Always return null to prevent hydration mismatch.
  // The script tag is injected post-render at build-time via vite.config.ts for SSG,
  // and dynamically injected via useEffect above for client-side navigation.
  return null;
}

