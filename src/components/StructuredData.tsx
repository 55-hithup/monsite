import { useEffect } from 'react';
import organizationData from '../data/organization.json';

export default function StructuredData() {
  useEffect(() => {
    // Client-side fallback: if we navigated client-side and the script is not in head, inject it.
    let script = document.getElementById('structured-data-org-ssg') || document.getElementById('structured-data-org-client');
    if (!script) {
      script = document.createElement('script');
      script.id = 'structured-data-org-client';
      script.setAttribute('type', 'application/ld+json');
      script.textContent = JSON.stringify(organizationData);
      document.head.appendChild(script);
    }
  }, []);

  // Always return null to prevent hydration mismatch.
  // The script tag is injected post-render at build-time via vite.config.ts for SSG,
  // and dynamically injected via useEffect above for client-side navigation.
  return null;
}
