import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

export function useDocumentMetadata(
  title: string | { fr: string; en: string },
  description: string | { fr: string; en: string },
  image?: string,
  explicitPath?: string
) {
  const location = useLocation();
  const { language, isEn } = useLanguage();

  const activeTitle = typeof title === 'string' ? title : title[language] || title.fr;
  const activeDesc = typeof description === 'string' ? description : description[language] || description.fr;
  const activeImage = image || 'https://www.devsupai.fr/hero-bg-mockup.webp';
  const fullImageUrl = activeImage.startsWith('http') ? activeImage : `https://www.devsupai.fr${activeImage.startsWith('/') ? '' : '/'}${activeImage}`;

  const currentPath = explicitPath || location.pathname || (typeof window !== 'undefined' ? window.location.pathname : '/');

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // Update document title
    document.title = activeTitle;

    // Update description meta tag
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', activeDesc);

    // Canonical URL (version www. unique en français)
    const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/\/$/, '');
    const canonicalUrl = `https://www.devsupai.fr${normalizedPath === '/' ? '/' : normalizedPath}`;

    // Update Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Remove legacy hreflang tags if any
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

    // Update OpenGraph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', activeTitle);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', activeDesc);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', canonicalUrl);

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', fullImageUrl);

    let ogLocale = document.querySelector('meta[property="og:locale"]');
    if (!ogLocale) {
      ogLocale = document.createElement('meta');
      ogLocale.setAttribute('property', 'og:locale');
      document.head.appendChild(ogLocale);
    }
    ogLocale.setAttribute('content', 'fr_FR');

    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]') || document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', activeTitle);

    const twitterDescription = document.querySelector('meta[name="twitter:description"]') || document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', activeDesc);

    let twitterUrl = document.querySelector('meta[property="twitter:url"]') || document.querySelector('meta[name="twitter:url"]');
    if (twitterUrl) twitterUrl.setAttribute('content', canonicalUrl);

    let twitterImage = document.querySelector('meta[property="twitter:image"]') || document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) twitterImage.setAttribute('content', fullImageUrl);
  }, [activeTitle, activeDesc, fullImageUrl, currentPath, language, isEn]);
}


