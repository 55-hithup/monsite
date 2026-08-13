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

  // Return null on client to match the server-rendered DOM (where the script is moved to the head)
  if (typeof window !== 'undefined') {
    return null;
  }

  // Render script block during SSG, to be caught and hoisted to the head in vite.config.ts
  return (
    <script
      type="application/ld+json"
      id="structured-data-org-ssg"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  );
}
