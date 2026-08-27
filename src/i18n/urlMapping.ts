export interface RoutePair {
  fr: string;
  en: string;
}

export const ROUTE_PAIRS: RoutePair[] = [
  { fr: '/', en: '/en' },
  { fr: '/nos-services', en: '/en/services' },
  { fr: '/a-propos', en: '/en/about' },
  { fr: '/blog', en: '/en/blog' },
  { fr: '/blog/site-web-pme-association', en: '/en/blog/site-web-pme-association' },
  { fr: '/blog/pourquoi-eviter-les-templates', en: '/en/blog/pourquoi-eviter-les-templates' },
  { fr: '/blog/performance-web-sur-mesure', en: '/en/blog/performance-web-sur-mesure' },
  { fr: '/projets/les-jumeaux', en: '/en/projects/les-jumeaux' },
  { fr: '/projets/locatool', en: '/en/projects/locatool' },
  { fr: '/projets/abogame', en: '/en/projects/abogame' },
  { fr: '/mentions-legales', en: '/en/legal-notices' },
  { fr: '/politique-de-confidentialite', en: '/en/privacy-policy' },
];

export function normalizePath(path: string): string {
  if (!path || path === '') return '/';
  let clean = path.split('?')[0].split('#')[0];
  if (!clean.startsWith('/')) clean = '/' + clean;
  if (clean.length > 1 && clean.endsWith('/')) clean = clean.slice(0, -1);
  return clean;
}

export function isEnglishPath(path: string): boolean {
  const clean = normalizePath(path);
  return clean === '/en' || clean.startsWith('/en/');
}

export function getAlternatePath(currentPath: string, targetLang: 'fr' | 'en'): string {
  const clean = normalizePath(currentPath);
  const hashIndex = currentPath.indexOf('#');
  const hash = hashIndex >= 0 ? currentPath.slice(hashIndex) : '';

  // Look for exact match in ROUTE_PAIRS
  for (const pair of ROUTE_PAIRS) {
    if (pair.fr === clean || pair.en === clean) {
      const targetBase = targetLang === 'en' ? pair.en : pair.fr;
      return `${targetBase}${hash}`;
    }
  }

  // Fallback defaults
  if (targetLang === 'en') {
    return `/en${hash}`;
  }
  return `/${hash}`;
}

export function getCanonicalAndAlternates(currentPath: string, siteHost = 'https://www.devsupai.fr') {
  const clean = normalizePath(currentPath);
  const matchedPair = ROUTE_PAIRS.find((pair) => pair.fr === clean || pair.en === clean);

  const frPath = matchedPair ? (matchedPair.fr === '/' ? '' : matchedPair.fr) : '';
  const enPath = matchedPair ? matchedPair.en : '/en';

  const canonicalPath = clean === '/' ? '' : clean;

  return {
    canonicalUrl: `${siteHost}${canonicalPath}`,
    hreflangFr: `${siteHost}${frPath}`,
    hreflangEn: `${siteHost}${enPath}`,
    hreflangDefault: `${siteHost}${frPath}`,
    isEn: isEnglishPath(clean),
  };
}
