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
  { fr: '/projets/atelier-gourmand', en: '/en/projects/atelier-gourmand' },
  { fr: '/projets/locatool', en: '/en/projects/locatool' },
  { fr: '/projets/abogame', en: '/en/projects/abogame' },
  { fr: '/mentions-legales', en: '/en/legal-notices' },
  { fr: '/politique-de-confidentialite', en: '/en/privacy-policy' },
  { fr: '/sites-internet/artisan-renovation', en: '/en/websites/artisan-construction' },
  { fr: '/sites-internet/profession-liberale', en: '/en/websites/professional-services' },
  { fr: '/sites-internet/restaurant', en: '/en/websites/restaurant' },
  { fr: '/sites-internet/commerce-boutique', en: '/en/websites/retail-shop' },
  { fr: '/blog/site-internet-vs-google-business', en: '/en/blog/site-internet-vs-google-business' },
  { fr: '/blog/pourquoi-eviter-wordpress-petit-budget', en: '/en/blog/pourquoi-eviter-wordpress-petit-budget' },
  { fr: '/blog/artisan-convertir-plus-de-devis', en: '/en/blog/artisan-convertir-plus-de-devis' },
  { fr: '/blog/boutique-en-ligne-sans-commission', en: '/en/blog/boutique-en-ligne-sans-commission' },
  { fr: '/blog/accessibilite-web-rgaa-pme', en: '/en/blog/accessibilite-web-rgaa-pme' },
  { fr: '/blog/ia-et-developpement-web-ce-qui-change', en: '/en/blog/ia-et-developpement-web-ce-qui-change' },
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
