import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'
import organizationData from './src/data/organization.json' with { type: 'json' }

interface RouteMeta {
  title: string;
  description: string;
  image?: string;
}

const pageMetadata: Record<string, RouteMeta> = {
  // French Pages (FR)
  '/': {
    title: 'DevSupAi • Alexandre Pabst | Développeur Web & Création de Sites Sur-Mesure',
    description: "Création de sites vitrines, e-commerce et applications web sur-mesure pour PME, artisans et associations en Meuse (55), Grand Est et France. 0% abonnement captif, temps de chargement optimisés.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/nos-services': {
    title: 'Nos Prestations & Solutions Web Sur-Mesure | DevSupAi',
    description: "Découvrez nos 47 prestations informatiques : création de sites vitrines, e-commerce, applications mobiles Android/iOS, SaaS sur-mesure et maintenance technique.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/a-propos': {
    title: 'À Propos | Alexandre Pabst – Développeur Web Sur-Mesure | DevSupAi',
    description: "Découvrez le parcours d'Alexandre Pabst, artisan du web et fondateur de DevSupAi à Saint-Mihiel (Meuse). Une méthode sur-mesure sans compromis pour PME et artisans.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/blog': {
    title: 'Blog & Actualités Développement Web Sur-Mesure | DevSupAi',
    description: "Conseils, guides techniques et bonnes pratiques sur le développement web sur-mesure, la performance, l'accessibilité et le référencement SEO pour PME et Associations.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/blog/site-web-pme-association': {
    title: 'Créer un site web pour PME & Association | Guide Pratique DevSupAi',
    description: "Découvrez les étapes indispensables pour concevoir un site internet performant, moderne et sans abonnement récurrent pour une PME ou une association loi 1901.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/blog/pourquoi-eviter-les-templates': {
    title: 'Pourquoi éviter les templates en 2026 ? | Le sur-mesure pour PME & Asso | DevSupAi',
    description: "Les thèmes pré-conçus pénalisent votre vitesse de chargement et nuisent à votre référencement naturel. Découvrez pourquoi le développement sur-mesure est devenu incontournable.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/blog/performance-web-sur-mesure': {
    title: 'Vitesse de chargement & Taux de conversion | Guide DevSupAi',
    description: "Chaque milliseconde compte pour votre chiffre d'affaires. Découvrez les piliers de la vitesse web et de l'optimisation SEO pour propulser votre site au sommet des résultats Google.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/projets/atelier-gourmand': {
    title: "Étude de cas : L'Atelier Gourmand | Site Vitrine & Réservation Sur-Mesure | DevSupAi",
    description: "Découvrez l'étude de cas complète de L'Atelier Gourmand : création d'un site vitrine restaurant sur-mesure et d'un système de réservation directe sans widget tiers ni commission.",
    image: 'https://www.devsupai.fr/atelier-gourmand.webp'
  },
  '/projets/locatool': {
    title: 'Étude de cas : LocaTool | Logiciel SaaS de Gestion de Parc Matériel | DevSupAi',
    description: "Découvrez comment l'application web métier LocaTool a été conçue pour centraliser et simplifier la gestion de location de matériel professionnel et de facturation.",
    image: 'https://www.devsupai.fr/locatool.webp'
  },
  '/projets/abogame': {
    title: 'Étude de cas : Abogame | Plateforme Mobile-First Live & Tirage | DevSupAi',
    description: "Découvrez comment la plateforme interactive mobile-first Abogame dynamise les animations en direct grâce à une roue de tirage visuelle et interactive à 60 FPS.",
    image: 'https://www.devsupai.fr/abogame.webp'
  },
  '/mentions-legales': {
    title: 'Mentions Légales | DevSupAi — Alexandre Pabst',
    description: "Mentions légales, informations sur l'éditeur et l'hébergement du site internet devsupai.fr édité par Alexandre Pabst EI (DevSupAi).",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/politique-de-confidentialite': {
    title: 'Politique de Confidentialité | DevSupAi — Protection des Données',
    description: "Découvrez notre politique de confidentialité, le traitement de vos données personnelles et vos droits relatifs aux RGPD sur devsupai.fr.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },

  // French Trade Pages
  '/sites-internet/artisan-renovation': {
    title: 'Création de Site Internet pour Artisan du Bâtiment & Rénovation en Meuse | DevSupAi',
    description: "Conception sur-mesure de sites vitrines pour artisans du bâtiment, menuisiers, électriciens et peintres en Meuse (55) et Grand Est. Galerie chantiers HD, formulaires de devis et SEO local.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/sites-internet/profession-liberale': {
    title: 'Création de Site Internet pour Profession Libérale & Médicale | DevSupAi',
    description: "Site web professionnel sur-mesure pour professions libérales, avocats, architectes, consultants et praticiens de santé. Présentation soignée, prise de contact sécurisée et conformité déontologique.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/sites-internet/restaurant': {
    title: 'Création de Site Internet pour Restaurant & Bistronomie en Meuse | DevSupAi',
    description: "Site web sur-mesure pour restaurants, brasseries et traiteurs en Meuse et Grand Est. Menus en ligne réactifs sans PDF lourd, moteur de réservation directe sans commission et photos HD.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/sites-internet/commerce-boutique': {
    title: 'Création de Site E-Commerce pour Commerce de Proximité & Boutique | DevSupAi',
    description: "Site e-commerce sur-mesure pour commerçants de proximité, boutiques et producteurs locaux en Meuse et Grand Est. Vente en ligne et Click & Collect sans commission.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },

  // French Blog Outline Pages
  '/blog/site-internet-vs-google-business': {
    title: 'Site internet vs Fiche Google Business : lequel choisir pour votre entreprise locale ? | Blog DevSupAi',
    description: "Analyse comparative détaillée entre site internet sur-mesure et fiche Google Maps d'établissement pour PME et artisans. Découvrez pourquoi ces deux canaux sont indissociables.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/blog/pourquoi-eviter-wordpress-petit-budget': {
    title: 'Pourquoi éviter WordPress pour un petit budget en 2026 ? | Blog DevSupAi',
    description: "L'illusion du CMS gratuit décryptée : abonnements récurrents de plugins, failles de sécurité régulières et lenteurs techniques. Pourquoi le sur-mesure est plus rentable dès la 1ère année.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/blog/artisan-convertir-plus-de-devis': {
    title: 'Comment un artisan du bâtiment peut convertir 2x plus de devis grâce à son site | Blog DevSupAi',
    description: "Guide méthodologique pour les professionnels du bâtiment : structure de page idéale, preuves de réassurance décennale, photos avant/après et formulaires de demande simplifiés.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/blog/boutique-en-ligne-sans-commission': {
    title: 'Boutique en ligne sans commission : combien économise un commerçant local ? | Blog DevSupAi',
    description: "Comparatif chiffré des coûts réels entre plateformes e-commerce à commission (Shopify, marketplaces) et une boutique sur-mesure propriétaire sans frais cachés.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/blog/accessibilite-web-rgaa-pme': {
    title: "Accessibilité web (RGAA / WCAG) : pourquoi c'est un enjeu pour les PME | Blog DevSupAi",
    description: "Pourquoi l'accessibilité numérique concerne toutes les PME et artisans : conformité légale européenne, SEO renforcé, élargissement de clientèle et confort mobile.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/blog/ia-et-developpement-web-ce-qui-change': {
    title: "IA et développement web : ce qui change (et ce qui ne change pas) pour un client | Blog DevSupAi",
    description: "Démystification de l'intelligence artificielle dans la création web : gain de rapidité d'exécution, rôle de l'ingénieur humain et pièges des générateurs no-code.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },

  // English Pages (EN)
  '/en': {
    title: 'DevSupAi • Alexandre Pabst | Bespoke Web Developer & Engineering',
    description: 'Handcrafted showcase websites, e-commerce, and custom SaaS web applications for SMEs, artisans, and non-profits in France and worldwide. Zero recurring software fees, optimized loading times.',
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/en/services': {
    title: 'Our Custom Web Services & Digital Solutions | DevSupAi',
    description: 'Explore our 47 custom digital services: showcase websites, e-commerce, Android/iOS mobile apps, custom SaaS software, and technical maintenance.',
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/en/about': {
    title: 'About | Alexandre Pabst – Custom Web Developer | DevSupAi',
    description: "Discover the background of Alexandre Pabst, founder of DevSupAi in Saint-Mihiel (France), and his uncompromising methodology for crafting bespoke, ultra-fast websites.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/en/blog': {
    title: 'Blog & Insights on Custom Web Development | DevSupAi',
    description: 'Actionable guides and technical best practices on custom web engineering, loading performance, accessibility, and SEO for SMEs and non-profits.',
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/en/blog/site-web-pme-association': {
    title: 'Building a Website for SMEs & Non-Profits | Practical Guide DevSupAi',
    description: 'Essential steps to create a high-performance, modern custom website without recurring platform subscriptions for SMEs and non-profit organizations.',
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/en/blog/pourquoi-eviter-les-templates': {
    title: 'Why Avoid Pre-Made Templates in 2026? | DevSupAi',
    description: 'Generic templates hurt your loading speed and hinder your Google rankings. Discover why custom development has become essential for business growth.',
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/en/blog/performance-web-sur-mesure': {
    title: 'Page Speed & Conversion Rates | Technical Guide DevSupAi',
    description: 'Every millisecond of delay costs revenue. Data-backed analysis of how top-tier web performance directly drives business growth and lowers acquisition costs.',
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/en/projects/atelier-gourmand': {
    title: "Case Study: L'Atelier Gourmand | Restaurant Showcase & Custom Booking | DevSupAi",
    description: "Complete functional and technical case study for L'Atelier Gourmand: fluid guest UX, 4-step direct booking engine, 7 native languages, and zero commission fees.",
    image: 'https://www.devsupai.fr/atelier-gourmand.webp'
  },
  '/en/projects/locatool': {
    title: 'Case Study: LocaTool | Custom SaaS Equipment Management | DevSupAi',
    description: 'Discover how the LocaTool SaaS web application was engineered to centralize and streamline professional equipment rental, booking, and contract invoicing.',
    image: 'https://www.devsupai.fr/locatool.webp'
  },
  '/en/projects/abogame': {
    title: 'Case Study: Abogame | Interactive Real-Time Web Platform | DevSupAi',
    description: 'Discover how the Abogame mobile-first interactive platform powers live animations and real-time audience engagement with an interactive giveaway wheel.',
    image: 'https://www.devsupai.fr/abogame.webp'
  },
  '/en/legal-notices': {
    title: 'Legal Notices | DevSupAi — Alexandre Pabst',
    description: 'Consult the legal information and regulatory disclosures of the sole proprietorship DevSupAi managed by Alexandre Pabst.',
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/en/privacy-policy': {
    title: 'Privacy Policy | DevSupAi — Data Protection & Privacy',
    description: 'Read our privacy policy, personal data processing terms, and GDPR compliance standards on devsupai.fr.',
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },

  // English Trade Pages
  '/en/websites/artisan-construction': {
    title: 'Website Development for Construction Craftsmen & Contractors | DevSupAi',
    description: 'Bespoke showcase websites for construction craftsmen, carpenters, electricians, and painters in Grand Est and France. High-definition portfolio, custom quote forms, and local SEO.',
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/en/websites/professional-services': {
    title: 'Website Development for Legal, Medical & Professional Services | DevSupAi',
    description: 'Bespoke websites for legal, medical, and professional consulting practices. Elegant design, secure inquiries, GDPR compliance, and professional distinction.',
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/en/websites/restaurant': {
    title: 'Custom Website Development for Restaurants & Bistros | DevSupAi',
    description: 'Bespoke websites for restaurants, bistros, and catering businesses. Responsive digital menus without heavy PDFs, direct commission-free booking engine, and HD food photography.',
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/en/websites/retail-shop': {
    title: 'Bespoke E-Commerce Website for Local Retailers & Shops | DevSupAi',
    description: 'Custom e-commerce websites for independent retailers, local shops, and regional producers in Grand Est and France. Zero sales commissions, Stripe checkout & Click & Collect.',
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },

  // English Blog Outline Pages
  '/en/blog/site-internet-vs-google-business': {
    title: 'Website vs Google Business Profile: Which One for Your Local Business? | DevSupAi Blog',
    description: 'In-depth comparison between a custom website and a Google Maps profile for SMEs and contractors. Discover why both channels must work in tandem.',
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/en/blog/pourquoi-eviter-wordpress-petit-budget': {
    title: 'Why Avoid WordPress on a Small Budget in 2026? | DevSupAi Blog',
    description: 'The hidden costs of "free" CMS: recurring plugin subscriptions, frequent security vulnerabilities, and slow page loads. Why bespoke code is more profitable from year one.',
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/en/blog/artisan-convertir-plus-de-devis': {
    title: 'How Contractors Can Double Quote Conversion Rates with Their Website | DevSupAi Blog',
    description: 'Methodological guide for building trades: ideal page structure, liability insurance badges, before/after photography, and streamlined inquiry forms.',
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/en/blog/boutique-en-ligne-sans-commission': {
    title: 'Zero-Commission Online Shop: How Much Can a Local Retailer Save? | DevSupAi Blog',
    description: 'Cost comparison between commission-based e-commerce platforms (Shopify, marketplaces) and a custom zero-commission online shop.',
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/en/blog/accessibilite-web-rgaa-pme': {
    title: 'Web Accessibility (WCAG / RGAA): Why It Matters for Small Businesses | DevSupAi Blog',
    description: 'Why web accessibility (WCAG) matters for small businesses: legal compliance, SEO benefits, broader customer reach, and superior mobile usability.',
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/en/blog/ia-et-developpement-web-ce-qui-change': {
    title: "AI & Web Development: What Changes (and What Doesn't) for Clients | DevSupAi Blog",
    description: "Demystifying artificial intelligence in web development: rapid execution, the human engineer's vital role, and pitfalls of no-code AI generators.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },

  // Admin Pages
  '/admin/login': {
    title: 'Connexion Administration | DevSupAi',
    description: "Espace de connexion sécurisé pour l'administration de la modération des avis sur le site DevSupAi.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/admin/avis': {
    title: 'Tableau de Bord Administration | DevSupAi',
    description: "Tableau de bord de modération des avis clients de DevSupAi.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  }
};

const routePairs = [
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

function buildBreadcrumbSchema(cleanRoute: string, isEnglish: boolean, pageTitle: string) {
  const homeUrl = isEnglish ? 'https://www.devsupai.fr/en' : 'https://www.devsupai.fr/';
  const homeName = isEnglish ? 'Home' : 'Accueil';
  const currentUrl = `https://www.devsupai.fr${cleanRoute === '/' ? '/' : cleanRoute}`;

  if (cleanRoute === '/' || cleanRoute === '/en') {
    return null;
  }

  const items: Array<{ '@type': 'ListItem'; position: number; name: string; item: string }> = [
    {
      '@type': 'ListItem',
      position: 1,
      name: homeName,
      item: homeUrl,
    },
  ];

  if (cleanRoute.startsWith('/blog/') || cleanRoute.startsWith('/en/blog/')) {
    const blogUrl = isEnglish ? 'https://www.devsupai.fr/en/blog' : 'https://www.devsupai.fr/blog';
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: blogUrl,
    });
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: pageTitle,
      item: currentUrl,
    });
  } else if (cleanRoute.startsWith('/projets/') || cleanRoute.startsWith('/en/projects/')) {
    const projectsUrl = isEnglish ? 'https://www.devsupai.fr/en#realisations' : 'https://www.devsupai.fr/#realisations';
    const projectsName = isEnglish ? 'Case Studies' : 'Réalisations';
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: projectsName,
      item: projectsUrl,
    });
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: pageTitle,
      item: currentUrl,
    });
  } else if (cleanRoute.startsWith('/sites-internet/') || cleanRoute.startsWith('/en/websites/')) {
    const servicesUrl = isEnglish ? 'https://www.devsupai.fr/en/services' : 'https://www.devsupai.fr/nos-services';
    const servicesName = isEnglish ? 'Services' : 'Prestations';
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: servicesName,
      item: servicesUrl,
    });
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: pageTitle,
      item: currentUrl,
    });
  } else {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: pageTitle,
      item: currentUrl,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: 'https://www.devsupai.fr',
      readable: true,
      dynamicRoutes: [
        // French Routes
        '/nos-services',
        '/a-propos',
        '/blog',
        '/blog/site-web-pme-association',
        '/blog/pourquoi-eviter-les-templates',
        '/blog/performance-web-sur-mesure',
        '/projets/atelier-gourmand',
        '/projets/locatool',
        '/projets/abogame',
        '/mentions-legales',
        '/politique-de-confidentialite',
        '/sites-internet/artisan-renovation',
        '/sites-internet/profession-liberale',
        '/sites-internet/restaurant',
        '/sites-internet/commerce-boutique',
        '/blog/site-internet-vs-google-business',
        '/blog/pourquoi-eviter-wordpress-petit-budget',
        '/blog/artisan-convertir-plus-de-devis',
        '/blog/boutique-en-ligne-sans-commission',
        '/blog/accessibilite-web-rgaa-pme',
        '/blog/ia-et-developpement-web-ce-qui-change',

        // English Routes
        '/en',
        '/en/services',
        '/en/about',
        '/en/blog',
        '/en/blog/site-web-pme-association',
        '/en/blog/pourquoi-eviter-les-templates',
        '/en/blog/performance-web-sur-mesure',
        '/en/blog/site-internet-vs-google-business',
        '/en/blog/pourquoi-eviter-wordpress-petit-budget',
        '/en/blog/artisan-convertir-plus-de-devis',
        '/en/blog/boutique-en-ligne-sans-commission',
        '/en/blog/accessibilite-web-rgaa-pme',
        '/en/blog/ia-et-developpement-web-ce-qui-change',
        '/en/websites/artisan-construction',
        '/en/websites/professional-services',
        '/en/websites/restaurant',
        '/en/websites/retail-shop',
        '/en/projects/atelier-gourmand',
        '/en/projects/locatool',
        '/en/projects/abogame',
        '/en/legal-notices',
        '/en/privacy-policy',
      ],
    }),
  ],
  resolve: {
    alias: {
      'react-router-dom/server.js': 'react-router-dom/server',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('lucide-react')) return 'vendor-lucide';
            if (id.includes('firebase')) return 'vendor-firebase';
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('gsap') || id.includes('lenis')) return 'vendor-animation';
          }
        },
      },
    },
  },
  ssgOptions: {
    script: 'defer',
    formatting: 'minify',
    onPageRendered(route: string, html: string) {
      let cleanRoute = route;
      if (!cleanRoute.startsWith('/')) {
        cleanRoute = '/' + cleanRoute;
      }
      if (cleanRoute.endsWith('/') && cleanRoute.length > 1) {
        cleanRoute = cleanRoute.slice(0, -1);
      }
      if (cleanRoute === '') {
        cleanRoute = '/';
      }
      
      const meta = pageMetadata[cleanRoute] || pageMetadata['/'];
      const isEnglish = cleanRoute === '/en' || cleanRoute.startsWith('/en/');
      const canonicalUrl = `https://www.devsupai.fr${cleanRoute === '/' ? '/' : cleanRoute}`;
      const ogImageUrl = meta.image || 'https://www.devsupai.fr/hero-bg-mockup.webp';
      
      // Calculate hreflang paths
      const matchedPair = routePairs.find((p) => p.fr === cleanRoute || p.en === cleanRoute);
      const frHref = `https://www.devsupai.fr${matchedPair ? (matchedPair.fr === '/' ? '' : matchedPair.fr) : ''}`;
      const enHref = `https://www.devsupai.fr${matchedPair ? matchedPair.en : '/en'}`;
      const xDefaultHref = `https://www.devsupai.fr${matchedPair ? (matchedPair.fr === '/' ? '' : matchedPair.fr) : ''}`;

      let cleanHtml = html;

      // Update <html lang="..."> attribute
      cleanHtml = cleanHtml.replace(/<html\s+lang="[^"]*"/, `<html lang="${isEnglish ? 'en' : 'fr'}"`);

      // Extract any <link rel="preload" ...> tags from <body> and hoist them into <head>
      const bodyIndex = cleanHtml.indexOf('<body');
      if (bodyIndex !== -1) {
        const headPart = cleanHtml.slice(0, bodyIndex);
        let bodyPart = cleanHtml.slice(bodyIndex);
        let hoistedPreloads = '';
        bodyPart = bodyPart.replace(/<link rel="preload"[^>]*>/g, (linkMatch: string) => {
          hoistedPreloads += linkMatch;
          return '';
        });
        if (hoistedPreloads) {
          cleanHtml = headPart.replace('</head>', `${hoistedPreloads}</head>`) + bodyPart;
        }
      }

      // Move any __staticRouterHydrationData scripts from inside #root to outside #root to ensure 1:1 clean DOM structure for React 19 hydration
      cleanHtml = cleanHtml.replace(/(<script>window\.__staticRouterHydrationData[\s\S]*?<\/script>)\s*<\/div>/g, '</div>$1');

      // -----------------------------------------------------------------------
      // Comprehensive JSON-LD Structured Data per Route Type
      // -----------------------------------------------------------------------
      const injectedScripts: string[] = [];

      // 1. Homepage Structured Data (Organization + LocalBusiness + WebSite + FAQ)
      if (cleanRoute === '/' || cleanRoute === '/en') {
        const localizedOrg = isEnglish
          ? {
              ...organizationData,
              description: 'DevSupAi - Freelance web developer specialized in bespoke, high-performance web applications and websites for SMEs and non-profits in France and worldwide.'
            }
          : organizationData;

        injectedScripts.push(`<script type="application/ld+json" id="structured-data-org-ssg">${JSON.stringify(localizedOrg)}</script>`);

        const webSiteData = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "DevSupAi",
          "url": "https://www.devsupai.fr",
          "inLanguage": isEnglish ? "en" : "fr",
          "author": {
            "@type": "Person",
            "name": "Alexandre Pabst"
          }
        };
        injectedScripts.push(`<script type="application/ld+json" id="website-schema-ssg">${JSON.stringify(webSiteData)}</script>`);

        const faqData = isEnglish
          ? {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How is the pricing for a custom project determined?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Pricing is transparent, tailored, and fully customized to your genuine requirements: starting from €950 for the Starter Pack (One-Page), from €1,850 for the Growth Pack (3 to 5 pages showcase website), and from €3,200 for a custom SaaS application (based on €400/day daily rate). Every project includes a free detailed quote with exact scoping, zero hidden fees, and no mandatory monthly software subscriptions."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Why is custom web development more cost-effective over time?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Generic template sites often accumulate paid plugin licenses (security, contact forms, theme renewals) costing €400 to €1,200 annually. With DevSupAi, you pay zero mandatory third-party software subscriptions. Your code is clean, free of obsolescence, and maintains sub-second page loads that maximize conversion rates."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long does it take to deliver a custom web project?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Delivery timelines range from 1 to 2 weeks for a Starter Pack, 2 to 4 weeks for a Growth Pack (3-5 pages), and 4 to 8 weeks for a SaaS web application. A clear milestone schedule is established from the project outset to ensure on-time delivery."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you offer Google Business Profile management and local SEO?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, a dedicated monthly service is available from €29/month to optimize, maintain, and rank your Google Maps business profile, including regular updates, review responses, and local SEO tracking."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I own 100% of my website and data?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, you are the exclusive and complete owner of the entire source code, content, databases, and domain name. No lock-in contracts: you remain free to host or evolve your project wherever you choose."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What recurring fees should I anticipate (hosting & domain)?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "High-performance secure hosting and your custom domain name are included for the first year. Afterwards, direct renewal costs remain minimal (typically between €40 and €90 per year depending on project scale), with no inflated maintenance markup."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I manage content and data myself?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "An intuitive, tailored administration panel can be integrated according to your operational needs (e.g. managing inventory, reservations, or announcements) without requiring technical expertise."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What technical support and warranty are provided after launch?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Every delivery is backed by a technical warranty period and onboarding assistance. Preventive maintenance, monitoring, and regular cloud backups packages are available from €29/month for complete peace of mind."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does artificial intelligence integrate into your DevSupAi projects?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Artificial intelligence is utilized at DevSupAi as a specialized technical accelerator under the direct supervision of an experienced human engineer. It assists during rapid prototyping, code refactoring, and automated performance testing. Unlike generic no-code AI builders that output opaque and heavy codebases, every single line of production code is manually audited, optimized, and secured to ensure lightning-fast loading speeds and flawless reliability."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Will my website be coded by an AI or by a human developer?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Your website is architected, hand-coded, and delivered by a human developer (Alexandre Pabst). AI serves exclusively as a high-precision workshop tool (generating boilerplate scaffolds, regression tests, and type checking), while the creative craft, UX design, semantic SEO hierarchy, form security, and WCAG accessibility remain 100% human-engineered and verified. You benefit from a dedicated direct human partner without any opaque black box."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What happens regarding hosting and domain registration after the first included year?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "High-performance secure edge hosting and your custom domain name are fully included for the first year with every package. Upon annual renewal, you retain 100% freedom: you can renew through DevSupAi at direct cost (typically between €39 and €49 per year depending on the domain extension, with zero hidden markup), or choose to host your project with any provider of your choice. You are the sole owner of all source code, assets, and DNS records with zero forced lock-in."
                  }
                }
              ]
            }
          : {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Comment est défini le tarif d'un projet sur-mesure ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Mes tarifs sont transparents, indicatifs et adaptés à vos besoins réels : à partir de 950 € pour le Pack Présence (One-Page), à partir de 1 850 € pour le Pack Croissance (site vitrine 3 à 5 pages), et à partir de 3 200 € pour une application web ou un outil SaaS sur-mesure (base TJM 400 €/jour). Ces montants constituent des prix de départ indicatifs. Chaque projet fait l'objet d'une étude préalable et d'un devis gratuit personnalisé chiffrant avec exactitude vos fonctionnalités, sans aucun frais caché ni abonnement logiciel obligatoire."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Pourquoi le sur-mesure est-il plus rentable sur la durée ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Un site sous modèle générique accumule souvent des abonnements payants de plugins (sécurité, formulaires, thème) générant 400 € à 1 200 € par an. Avec DevSupAi, vous ne payez aucun abonnement tiers obligatoire. Votre code est propre, ne souffre d'aucune obsolescence et conserve un affichage instantané qui maximise vos conversions."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Combien de temps dure la réalisation d'un projet web ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Les délais de livraison varient de 1 à 2 semaines pour un Pack Présence, de 2 à 4 semaines pour un Pack Croissance (vitrine 3-5 pages), et de 4 à 8 semaines pour une application SaaS. Un calendrier précis avec des jalons de validation intermédiaire est fixé dès la signature du devis pour garantir le respect des échéances."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Proposez-vous la gestion de la fiche Google Business et le référencement local ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Oui, une prestation mensuelle dédiée est proposée dès 29 €/mois pour animer, optimiser et référencer votre fiche d'établissement sur Google Maps. Elle comprend l'optimisation initiale, la publication régulière d'actualités/photos, la réponse aux avis clients et le suivi de positionnement local."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Suis-je propriétaire à 100 % de mon site internet et de mes données ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Oui, vous êtes l'unique et total propriétaire de l'intégralité du code source, de vos contenus, de votre base de données et de votre nom de domaine. Aucun contrat d'engagement forcé : vous êtes libre de faire évoluer ou d'héberger votre projet où vous le souhaitez."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quels sont les frais récurrents à prévoir (hébergement & domaine) ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "L'hébergement sécurisé haute performance et votre nom de domaine sont inclus la première année dans chaque forfait. Par la suite, le coût technique direct de renouvellement reste minime (généralement entre 40 € et 90 € par an selon l'envergure du projet), sans surcoût imposé."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Puis-je administrer moi-même les contenus ou les données de mon site ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Selon vos besoins, une interface d'administration intuitive peut être intégrée à votre projet. Si votre activité nécessite de mettre à jour des actualités, des réservations ou du matériel (comme pour LocaTool), l'outil est conçu pour être simple sans compétences techniques."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quel suivi ou accompagnement est proposé après la mise en ligne ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Chaque livraison s'accompagne d'une période de garantie technique et d'une assistance à la prise en main. Des forfaits d'infogérance, de maintenance préventive et de sauvegardes régulières sont disponibles dès 29 €/mois pour assurer votre sérénité."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Comment l'intelligence artificielle intervient-elle dans vos projets DevSupAi ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "L'intelligence artificielle est utilisée chez DevSupAi comme un accélérateur technique de haute précision, sous la supervision exclusive d'un développeur humain expérimenté. Elle intervient lors des phases de prototypage, de refactorisation de code et d'automatisation de tests de performance. Contrairement aux générateurs automatiques « no-code » qui produisent des architectures lourdes et opaques, chaque ligne de code finale est auditée, optimisée et validée manuellement pour garantir une sécurité sans compromis et des temps de chargement instantanés."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Est-ce que mon site sera codé par une IA ou par un humain ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Votre site est conçu, architecturé et livré par un développeur humain (Alexandre Pabst). L'IA agit uniquement comme un assistant d'atelier (génération de squelettes techniques, tests de non-régression, vérification de typage), mais la direction artistique, l'ergonomie UX, la hiérarchie sémantique SEO, la sécurité des formulaires et l'accessibilité restent 100% pilotées et vérifiées par l'humain. Vous bénéficiez ainsi d'un interlocuteur direct dédié, sans boîte noire."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Que se passe-t-il pour l'hébergement et le nom de domaine après la première année incluse ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "L'hébergement sécurisé haute performance et votre nom de domaine personnalisé sont intégralement inclus la première année dans chaque forfait. À l'échéance annuelle, vous conservez une liberté totale : vous pouvez renouveler votre infrastructure via DevSupAi à prix coûtant direct (généralement entre 39 € et 49 € par an selon l'extension choisie, sans aucune marge cachée), ou choisir d'héberger votre site où vous le souhaitez. Vous êtes le propriétaire exclusif de l'intégralité du code source et de vos identifiants, sans aucun contrat d'engagement captif."
                  }
                }
              ]
            };

        injectedScripts.push(`<script type="application/ld+json" id="faq-schema-ssg">${JSON.stringify(faqData)}</script>`);
      }

      // 2. BreadcrumbList for all subpages
      const breadcrumb = buildBreadcrumbSchema(cleanRoute, isEnglish, meta.title.split('|')[0].trim());
      if (breadcrumb) {
        injectedScripts.push(`<script type="application/ld+json" id="breadcrumb-schema-ssg">${JSON.stringify(breadcrumb)}</script>`);
      }

      // 3. Services Page Schemas (Service + ItemList + FAQ)
      if (cleanRoute === '/nos-services' || cleanRoute === '/en/services') {
        const servicesSchema = {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": isEnglish ? "Custom Web & Software Development Services" : "Prestations de Développement Web & Logiciel Sur-Mesure",
          "description": meta.description,
          "itemListElement": [
            {
              "@type": "Offer",
              "position": 1,
              "name": isEnglish ? "Showcase Websites & Custom Portals" : "Sites Vitrines & Portails Professionnels",
              "description": isEnglish ? "Ultra-fast custom showcase websites for SMEs and artisans." : "Conception de sites vitrines haut de gamme et portails d'information sans CMS lourd.",
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "950",
                "priceCurrency": "EUR"
              }
            },
            {
              "@type": "Offer",
              "position": 2,
              "name": isEnglish ? "E-Commerce & Online Booking Systems" : "E-Commerce & Systèmes de Réservation",
              "description": isEnglish ? "Direct online sales and booking systems with zero transaction commissions." : "Boutiques et modules de réservation directe 100% sur-mesure sans commission."
            },
            {
              "@type": "Offer",
              "position": 3,
              "name": isEnglish ? "Custom SaaS & Mobile Applications" : "Applications Web Métier & Logiciels SaaS",
              "description": isEnglish ? "Custom internal software, fleet management, and real-time platforms." : "Logiciels de gestion interne, tableaux de bord et plateformes temps réel.",
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "3200",
                "priceCurrency": "EUR"
              }
            },
            {
              "@type": "Offer",
              "position": 4,
              "name": isEnglish ? "Maintenance, Core Web Vitals & Redesign" : "Maintenance, Performance Web & Refonte",
              "description": isEnglish ? "Technical maintenance, speed optimization, and secure infrastructure monitoring." : "Audits de vitesse, sécurisation et optimisation de la vitesse d'affichage."
            }
          ]
        };
        injectedScripts.push(`<script type="application/ld+json" id="services-schema-ssg">${JSON.stringify(servicesSchema)}</script>`);
      }

      // 4. About Page Schema (AboutPage / Person)
      if (cleanRoute === '/a-propos' || cleanRoute === '/en/about') {
        const aboutSchema = {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "Person",
            "name": "Alexandre Pabst",
            "jobTitle": isEnglish ? "Custom Web Developer & Founder" : "Développeur Web Indépendant & Fondateur",
            "worksFor": {
              "@type": "Organization",
              "name": "DevSupAi",
              "url": "https://www.devsupai.fr"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Saint-Mihiel",
              "postalCode": "55300",
              "addressCountry": "FR"
            }
          }
        };
        injectedScripts.push(`<script type="application/ld+json" id="about-schema-ssg">${JSON.stringify(aboutSchema)}</script>`);
      }

      // 5. Blog Index FAQPage Schema (Pedagogical Web Development Questions)
      if (cleanRoute === '/blog' || cleanRoute === '/en/blog') {
        const blogFaqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": isEnglish
            ? [
                {
                  "@type": "Question",
                  "name": "What is a web developer exactly?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A web developer is a software engineering professional who builds, programs, and maintains websites, web applications, and digital platforms. Working from client specifications and UI designs, they write clean, secure, and performant code to bring interfaces and interactive features to life. The profession divides into Front-End developers (user interfaces and browser interactions), Back-End developers (server logic, databases, security, and APIs), and Full-Stack developers who master end-to-end web architecture."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What skills are needed to become a web developer?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Becoming a web developer requires mastering core web standards (HTML, CSS, JavaScript), modern frameworks (React, TypeScript), Git version control, databases, and REST APIs. Beyond technical competencies (hard skills), strong problem-solving habits are vital: analytical rigor, debugging persistence, continuous technical learning, and clear communication with clients."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What are the 3 foundational languages of the web?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The 3 foundational languages of the web are HTML (semantic structure), CSS (styling and responsive layout), and JavaScript (dynamic client-side interactivity). Every modern browser runs this standard trio natively, which is frequently combined with TypeScript for maximum code reliability and enterprise scalability."
                  }
                }
              ]
            : [
                {
                  "@type": "Question",
                  "name": "Développeur web, c'est quoi ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Un développeur web est un professionnel de l'informatique spécialisé dans la conception, la programmation et la maintenance de sites internet et d'applications en ligne. À partir d'un besoin client ou de maquettes graphiques, il écrit du code propre, sécurisé et performant pour donner vie aux fonctionnalités. On distingue le développeur Front-End (dédié à l'interface visuelle et l'expérience utilisateur), le développeur Back-End (qui gère la logique serveur, la sécurité, les bases de données et les API), et le développeur Full-Stack, capable de maîtriser l'ensemble de la chaîne technique de bout en bout."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quelles compétences pour devenir développeur web ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Devenir développeur web exige la maîtrise du socle standard (HTML, CSS, JavaScript), de frameworks modernes (React, TypeScript), de Git, des bases de données et des API REST. Au-delà des compétences techniques (hard skills), des qualités méthodologiques et humaines sont indispensables : la rigueur logique, la patience face au débogage, une veille technologique continue et une excellente écoute pour traduire fidèlement les besoins métiers des clients."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quels sont les 3 langages du web ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Les 3 langages fondamentaux du web sont HTML (structure sémantique), CSS (mise en page et design) et JavaScript (interactivité et logique dynamique). Ces trois standards sont exécutés nativement par tous les navigateurs internet modernes sans aucun plugin tiers. Aujourd'hui, JavaScript est très souvent enrichi par TypeScript pour apporter un typage statique rigoureux et garantir une robustesse logicielle maximale."
                  }
                }
              ]
        };
        injectedScripts.push(`<script type="application/ld+json" id="blog-faq-schema-ssg">${JSON.stringify(blogFaqSchema)}</script>`);
      }

      // 6. Blog Posting Schemas
      if (cleanRoute.startsWith('/blog/') || cleanRoute.startsWith('/en/blog/')) {
        const articleDates: Record<string, { published: string; modified: string }> = {
          templates: { published: "2026-08-04T08:00:00+02:00", modified: "2026-08-14T00:00:00+02:00" },
          perf: { published: "2026-08-02T09:00:00+02:00", modified: "2026-08-14T00:00:00+02:00" },
          asso: { published: "2026-08-10T10:00:00+02:00", modified: "2026-08-14T00:00:00+02:00" },
          google: { published: "2026-09-10T08:00:00+02:00", modified: "2026-09-10T08:00:00+02:00" },
          wordpress: { published: "2026-09-15T08:00:00+02:00", modified: "2026-09-15T08:00:00+02:00" },
          artisan: { published: "2026-09-20T08:00:00+02:00", modified: "2026-09-20T08:00:00+02:00" },
          boutique: { published: "2026-09-25T08:00:00+02:00", modified: "2026-09-25T08:00:00+02:00" },
          accessibilite: { published: "2026-09-30T08:00:00+02:00", modified: "2026-09-30T08:00:00+02:00" },
          ia: { published: "2026-10-05T08:00:00+02:00", modified: "2026-10-05T08:00:00+02:00" },
        };

        const dates = cleanRoute.includes('pourquoi-eviter-les-templates')
          ? articleDates.templates
          : cleanRoute.includes('performance-web-sur-mesure')
          ? articleDates.perf
          : cleanRoute.includes('site-web-pme-association')
          ? articleDates.asso
          : cleanRoute.includes('site-internet-vs-google-business')
          ? articleDates.google
          : cleanRoute.includes('pourquoi-eviter-wordpress-petit-budget')
          ? articleDates.wordpress
          : cleanRoute.includes('artisan-convertir-plus-de-devis')
          ? articleDates.artisan
          : cleanRoute.includes('boutique-en-ligne-sans-commission')
          ? articleDates.boutique
          : cleanRoute.includes('accessibilite-web-rgaa-pme')
          ? articleDates.accessibilite
          : cleanRoute.includes('ia-et-developpement-web-ce-qui-change')
          ? articleDates.ia
          : articleDates.asso;

        const blogPostingSchema = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": meta.title.split('|')[0].trim(),
          "description": meta.description,
          "image": ogImageUrl,
          "datePublished": dates.published,
          "dateModified": dates.modified,
          "author": {
            "@type": "Person",
            "name": "Alexandre Pabst",
            "url": isEnglish ? "https://www.devsupai.fr/en/about" : "https://www.devsupai.fr/a-propos"
          },
          "publisher": {
            "@type": "Organization",
            "name": "DevSupAi",
            "url": "https://www.devsupai.fr",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.devsupai.fr/logo.webp"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
          }
        };
        injectedScripts.push(`<script type="application/ld+json" id="blog-posting-ssg">${JSON.stringify(blogPostingSchema)}</script>`);
      }

      // 7. Case Study / Project Schemas
      if (cleanRoute.startsWith('/projets/') || cleanRoute.startsWith('/en/projects/')) {
        const caseStudySchema = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": meta.title.split('|')[0].trim(),
          "description": meta.description,
          "image": ogImageUrl,
          "datePublished": "2026-08-14T00:00:00+02:00",
          "author": {
            "@type": "Person",
            "name": "Alexandre Pabst",
            "url": isEnglish ? "https://www.devsupai.fr/en/about" : "https://www.devsupai.fr/a-propos"
          },
          "publisher": {
            "@type": "Organization",
            "name": "DevSupAi",
            "url": "https://www.devsupai.fr",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.devsupai.fr/logo.webp"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
          }
        };
        injectedScripts.push(`<script type="application/ld+json" id="case-study-ssg">${JSON.stringify(caseStudySchema)}</script>`);
      }

      // 8. Trade / Sector Pages Schemas (Service)
      if (cleanRoute.startsWith('/sites-internet/') || cleanRoute.startsWith('/en/websites/')) {
        const isRestaurant = cleanRoute.includes('restaurant');
        const isLiberal = cleanRoute.includes('profession-liberale') || cleanRoute.includes('professional-services');
        const isCommerce = cleanRoute.includes('commerce-boutique') || cleanRoute.includes('retail-shop');
        const tradeServiceSchema = {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": meta.title.split('|')[0].trim(),
          "description": meta.description,
          "provider": {
            "@type": "ProfessionalService",
            "name": "DevSupAi",
            "url": "https://www.devsupai.fr",
            "telephone": "+33783666098",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "13 Allée des Roses",
              "addressLocality": "Saint-Mihiel",
              "postalCode": "55300",
              "addressRegion": "Grand Est",
              "addressCountry": "FR"
            }
          },
          "serviceType": isCommerce 
            ? (isEnglish ? "E-Commerce Website Development" : "Création de Boutique E-Commerce") 
            : isRestaurant 
            ? (isEnglish ? "Restaurant Website Development" : "Création Site Restaurant") 
            : isLiberal 
            ? (isEnglish ? "Professional Services Website" : "Création Site Profession Libérale") 
            : (isEnglish ? "Craftsmen Website Development" : "Création Site Artisan"),
          "areaServed": [
            { "@type": "City", "name": "Saint-Mihiel", "postalCode": "55300" },
            { "@type": "City", "name": "Commercy", "postalCode": "55200" },
            { "@type": "City", "name": "Verdun", "postalCode": "55100" },
            { "@type": "City", "name": "Bar-le-Duc", "postalCode": "55000" },
            { "@type": "City", "name": "Nancy", "postalCode": "54000" },
            { "@type": "City", "name": "Metz", "postalCode": "57000" },
            { "@type": "AdministrativeArea", "name": "Meuse" },
            { "@type": "AdministrativeArea", "name": "Grand Est" },
            { "@type": "Country", "name": "France" }
          ],
          "offers": {
            "@type": "Offer",
            "priceCurrency": "EUR",
            "price": isCommerce ? "2600" : isRestaurant ? "1850" : isLiberal ? "950" : "1850",
            "description": meta.description
          }
        };
        injectedScripts.push(`<script type="application/ld+json" id="trade-service-ssg">${JSON.stringify(tradeServiceSchema)}</script>`);

        const tradeFaqQuestions = isCommerce
          ? (isEnglish
              ? [
                  { q: "How much does a bespoke e-commerce store cost with DevSupAi?", a: "Our Boutique E-Commerce Pack starts at €2,600 turnkey, including bespoke development, secure Stripe gateway, Click & Collect pickup module, and training with zero vendor lock-in." },
                  { q: "Are there any sales commissions or monthly subscription fees?", a: "DevSupAi charges 0% commission on your sales. Only standard Stripe merchant processing fees (approx 1.5% + €0.25 per transaction) apply directly, with zero platform markup." },
                  { q: "How easily can I add products and manage inventory?", a: "Very easily. You receive a dedicated, secure dashboard enabling you to create products, update prices, or adjust stock levels in seconds from any smartphone or computer." }
                ]
              : [
                  { q: "Combien coûte une boutique e-commerce pour commerce local chez DevSupAi ?", a: "Notre Pack Boutique E-Commerce démarre à 2 600 € clés en main, incluant la conception sur-mesure, la passerelle de paiement sécurisée Stripe, le module Click & Collect et la formation complète sans aucun abonnement captif." },
                  { q: "Y a-t-il une commission prélevée sur mes ventes ou un abonnement mensuel ?", a: "Aucune commission n'est prélevée par DevSupAi sur votre chiffre d'affaires (0%). Seuls les frais bancaires standards de Stripe (environ 1,5% + 0,25 € par transaction) s'appliquent directement, sans surcoût intermédiaire." },
                  { q: "Est-il facile d'ajouter de nouveaux produits et de gérer les stocks ?", a: "Oui. Vous disposez d'une interface d'administration sécurisée et ultra-simple qui vous permet d'ajouter un produit, modifier un prix ou ajuster vos stocks en quelques secondes depuis votre smartphone ou votre ordinateur." }
                ]
            )
          : isRestaurant
          ? (isEnglish
              ? [
                  { q: "How much does a restaurant website with booking cost?", a: "Packages start from €1,850 for a complete platform with interactive menu, photo gallery, and direct commission-free reservation engine." },
                  { q: "How easy is it to update daily specials and menu items?", a: "A streamlined administration interface lets you update prices, modify dishes, or announce holiday menus in under two minutes from your phone." },
                  { q: "Do online booking confirmations arrive directly via email or SMS?", a: "Yes. Every confirmed reservation automatically sends an immediate alert to your phone and a detailed booking summary to your customer." }
                ]
              : [
                  { q: "Combien coûte la création d'un site de restaurant avec réservation ?", a: "Nos forfaits démarrent à 1 850 € pour un site complet avec carte interactive, galerie photos et moteur de réservation directe sans commission sur vos couverts." },
                  { q: "Comment modifier la carte ou le plat du jour facilement ?", a: "Un panneau d'administration simplifié vous permet de modifier vos prix, changer un plat ou annoncer un menu de fête en moins de deux minutes depuis votre smartphone." },
                  { q: "Les réservations arrivent-elles directement par email ou SMS ?", a: "Oui. Chaque demande validée vous envoie une notification instantanée et confirme la réservation au client avec un récapitulatif clair." }
                ]
            )
          : isLiberal
          ? (isEnglish
              ? [
                  { q: "Does the website respect professional ethics and regulations?", a: "Yes, absolutely. We ensure all copywriting, layout, and visual presentation strictly adhere to the guidelines of professional associations and regulatory bodies." },
                  { q: "Can I link directly to my online booking calendar?", a: "Yes, direct booking integration (Doctolib, Calendly, or custom booking links) is prominently and elegantly integrated across key pages." },
                  { q: "Are client submissions securely protected?", a: "Yes. All data is transmitted over HTTPS/TLS encryption and delivered directly to your secure professional inbox without insecure intermediate database storage." }
                ]
              : [
                  { q: "Mon site respecte-t-il la déontologie de mon ordre professionnel ?", a: "Absolument. Nous veillons scrupuleusement à ce que le contenu, le ton et la présentation soient strictement informatifs et conformes aux recommandations des ordres professionnels (Ordre des Médecins, Barreaux d'Avocats, etc.)." },
                  { q: "Puis-je intégrer un lien direct vers mon agenda Doctolib ou Calendly ?", a: "Oui, un bouton de prise de rendez-vous direct vers votre plateforme habituelle est intégré de façon fluide sur toutes les pages clés de votre site." },
                  { q: "Les données transmises via le formulaire sont-elles protégées ?", a: "Oui. Les formulaires sont chiffrés via protocole HTTPS/TLS, ne stockent aucune donnée médicale sensible en clair et sont directement transmis sur votre messagerie professionnelle sécurisée." }
                ]
            )
          : (isEnglish
              ? [
                  { q: "How much does a contractor website cost with DevSupAi?", a: "Packages start from €950 for the Presence Pack (one-page showcase) and €1,850 for the Growth Pack (3-5 pages with categorized portfolio). All quotes are transparent and itemized." },
                  { q: "Can I add new project photos myself?", a: "Yes. A personalized video walkthrough teaches you how to upload new photos and text easily from your smartphone or computer." },
                  { q: "What are typical delivery timelines?", a: "Typically 1 to 2 weeks for a one-page site and 2 to 3 weeks for a multi-page portfolio site." }
                ]
              : [
                  { q: "Combien coûte un site internet pour artisan chez DevSupAi ?", a: "Nos solutions démarrent à 950 € pour le Pack Présence (One-Page complète et percutante) et 1 850 € pour le Pack Croissance (3 à 5 pages avec galerie de chantiers catégorisée). Chaque devis est gratuit, détaillé et sans aucun abonnement captif." },
                  { q: "Puis-je ajouter moi-même des photos de mes chantiers terminés ?", a: "Oui. Une formation vidéo personnalisée vous est offerte à la livraison pour vous apprendre à insérer de nouvelles photos et textes facilement depuis votre smartphone ou votre ordinateur." },
                  { q: "Combien de temps faut-il pour concevoir et mettre en ligne le site ?", a: "Comptez généralement 1 à 2 semaines pour un site One-Page, et 2 à 3 semaines pour un site multi-pages complet avec galerie de réalisations." }
                ]
            );

        const tradeFaqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": tradeFaqQuestions.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.a
            }
          }))
        };
        injectedScripts.push(`<script type="application/ld+json" id="trade-faq-ssg">${JSON.stringify(tradeFaqSchema)}</script>`);
      }

      if (injectedScripts.length > 0) {
        cleanHtml = cleanHtml.replace('</head>', `${injectedScripts.join('')}</head>`);
      }
      
      // Replace title
      cleanHtml = cleanHtml.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);
      
      // Replace description meta tag
      cleanHtml = cleanHtml.replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${meta.description}" />`);
      
      // Replace canonical URL link
      cleanHtml = cleanHtml.replace(/<link rel="canonical" href=".*?"\s*\/?>/, `<link rel="canonical" href="${canonicalUrl}" />`);
      
      // Inject reciprocal hreflang links
      const hreflangTags = `<link rel="alternate" hreflang="fr" href="${frHref}" /><link rel="alternate" hreflang="en" href="${enHref}" /><link rel="alternate" hreflang="x-default" href="${xDefaultHref}" />`;
      cleanHtml = cleanHtml.replace('</head>', `${hreflangTags}</head>`);

      // Replace Open Graph title, description, URL, image, and locale
      cleanHtml = cleanHtml.replace(/<meta property="og:title" content=".*?"\s*\/?>/, `<meta property="og:title" content="${meta.title}" />`);
      cleanHtml = cleanHtml.replace(/<meta property="og:description" content=".*?"\s*\/?>/, `<meta property="og:description" content="${meta.description}" />`);
      cleanHtml = cleanHtml.replace(/<meta property="og:url" content=".*?"\s*\/?>/, `<meta property="og:url" content="${canonicalUrl}" />`);
      cleanHtml = cleanHtml.replace(/<meta property="og:image" content=".*?"\s*\/?>/, `<meta property="og:image" content="${ogImageUrl}" />`);
      
      const ogLocaleTag = `<meta property="og:locale" content="${isEnglish ? 'en_US' : 'fr_FR'}" /><meta property="og:locale:alternate" content="${isEnglish ? 'fr_FR' : 'en_US'}" />`;
      cleanHtml = cleanHtml.replace('</head>', `${ogLocaleTag}</head>`);

      // Replace Twitter title, description, URL, and image
      cleanHtml = cleanHtml.replace(/<meta property="twitter:title" content=".*?"\s*\/?>/g, `<meta property="twitter:title" content="${meta.title}" />`);
      cleanHtml = cleanHtml.replace(/<meta property="twitter:description" content=".*?"\s*\/?>/g, `<meta property="twitter:description" content="${meta.description}" />`);
      cleanHtml = cleanHtml.replace(/<meta property="twitter:url" content=".*?"\s*\/?>/g, `<meta property="twitter:url" content="${canonicalUrl}" />`);
      cleanHtml = cleanHtml.replace(/<meta property="twitter:image" content=".*?"\s*\/?>/g, `<meta property="twitter:image" content="${ogImageUrl}" />`);
      cleanHtml = cleanHtml.replace(/<meta name="twitter:title" content=".*?"\s*\/?>/g, `<meta name="twitter:title" content="${meta.title}" />`);
      cleanHtml = cleanHtml.replace(/<meta name="twitter:description" content=".*?"\s*\/?>/g, `<meta name="twitter:description" content="${meta.description}" />`);
      cleanHtml = cleanHtml.replace(/<meta name="twitter:url" content=".*?"\s*\/?>/g, `<meta name="twitter:url" content="${canonicalUrl}" />`);
      cleanHtml = cleanHtml.replace(/<meta name="twitter:image" content=".*?"\s*\/?>/g, `<meta name="twitter:image" content="${ogImageUrl}" />`);
      
      return cleanHtml;
    },
  },
} as any)

