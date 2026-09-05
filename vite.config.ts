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
  '/blog/cout-reel-site-internet-3-ans': {
    title: "Quel est le coût réel d'un site internet sur 3 ans ? (Coûts cachés vs sur-mesure) | Blog DevSupAi",
    description: "Calcul complet du coût total de possession (TCO) d'un site web d'entreprise sur 36 mois : création initiale, hébergement, licences de plugins et infogérance.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/blog/reservation-directe-restaurant-sans-commission': {
    title: 'Réservation directe pour restaurants : comment se libérer des commissions de plateformes | Blog DevSupAi',
    description: "Pourquoi et comment reprendre la main sur vos réservations de table en direct. Économisez des milliers d'euros de commissions annuelles tout en fidélisant votre clientèle.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/blog/ia-creation-site-web-opportunites-pieges': {
    title: "L'intelligence artificielle dans la création web : opportunités réelles et pièges à éviter | Blog DevSupAi",
    description: "Démystification de l'IA dans le développement web : pourquoi les générateurs automatiques no-code échouent sur la durée et comment le pilotage humain par agents produit un code d'élite.",
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
  '/en/blog/cout-reel-site-internet-3-ans': {
    title: 'What Is the Real 3-Year Cost of a Website? (Hidden Fees vs Bespoke) | DevSupAi Blog',
    description: 'Complete breakdown of the Total Cost of Ownership (TCO) for a business website over 36 months: initial build, hosting, plugin licenses, and maintenance.',
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/en/blog/reservation-directe-restaurant-sans-commission': {
    title: 'Direct Restaurant Reservations: Freeing Yourself from Platform Commissions | DevSupAi Blog',
    description: 'Why and how restaurateurs should regain direct control over their bookings. Save thousands in annual fees while building loyal customer relationships.',
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/en/blog/ia-creation-site-web-opportunites-pieges': {
    title: 'AI in Web Development: Real Opportunities and Pitfalls to Avoid | DevSupAi Blog',
    description: 'Demystifying AI in software craftsmanship: why automated no-code generators fail over time and how human-supervised agentic engineering produces elite code.',
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
  { fr: '/blog/site-internet-vs-google-business', en: '/en/blog/site-internet-vs-google-business' },
  { fr: '/blog/pourquoi-eviter-wordpress-petit-budget', en: '/en/blog/pourquoi-eviter-wordpress-petit-budget' },
  { fr: '/blog/artisan-convertir-plus-de-devis', en: '/en/blog/artisan-convertir-plus-de-devis' },
  { fr: '/blog/cout-reel-site-internet-3-ans', en: '/en/blog/cout-reel-site-internet-3-ans' },
  { fr: '/blog/reservation-directe-restaurant-sans-commission', en: '/en/blog/reservation-directe-restaurant-sans-commission' },
  { fr: '/blog/ia-creation-site-web-opportunites-pieges', en: '/en/blog/ia-creation-site-web-opportunites-pieges' },
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
        '/blog/site-internet-vs-google-business',
        '/blog/pourquoi-eviter-wordpress-petit-budget',
        '/blog/artisan-convertir-plus-de-devis',
        '/blog/cout-reel-site-internet-3-ans',
        '/blog/reservation-directe-restaurant-sans-commission',
        '/blog/ia-creation-site-web-opportunites-pieges',

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
        '/en/blog/cout-reel-site-internet-3-ans',
        '/en/blog/reservation-directe-restaurant-sans-commission',
        '/en/blog/ia-creation-site-web-opportunites-pieges',
        '/en/websites/artisan-construction',
        '/en/websites/professional-services',
        '/en/websites/restaurant',
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
                  "name": "What is a web developer?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A web developer is a software professional who designs, programs, and maintains websites, web applications, and digital platforms. Working from client specifications and UI designs, they write clean, secure, and performant code to bring interfaces and interactive features to life. The profession divides into Front-End developers (user interfaces and browser interactions), Back-End developers (server logic, databases, security, and APIs), and Full-Stack developers who master end-to-end web architecture."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What skills are needed to become a web developer?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Becoming a web developer requires a balance of core technical competencies (hard skills) and problem-solving qualities (soft skills). On the technical side, essential foundations include proficiency in the web trio (HTML, CSS, modern JavaScript), modern frameworks (such as React, TypeScript, and Tailwind CSS), version control with Git, along with databases (SQL) and REST APIs. Methodologically, strong analytical rigor, debugging persistence, continuous learning, and clear communication with clients are essential for delivering resilient web solutions."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What are the 3 core languages of the web?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The 3 foundational languages that form the universal cornerstone of every website on the Internet are: HTML (HyperText Markup Language) to semantically structure content and page architecture, CSS (Cascading Style Sheets) to handle visual layout, typography, colors, and mobile responsiveness, and JavaScript (JS) to power dynamic interactivity, user actions, and real-time asynchronous data fetching. Every modern browser runs this standard trio natively, which is frequently combined with TypeScript for maximum code reliability and scalability."
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
                  "name": "Développeur web, c'est quoi ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Un développeur web est un professionnel de l'informatique chargé de concevoir, programmer et maintenir des sites internet, des outils en ligne et des applications sur-mesure. À partir d'un besoin client ou de maquettes graphiques, il écrit du code propre, sécurisé et performant pour donner vie aux fonctionnalités. On distingue le développeur Front-End (dédié à l'interface visuelle et l'expérience utilisateur), le développeur Back-End (qui gère la logique serveur, la sécurité, les bases de données et les API), et le développeur Full-Stack, capable de maîtriser l'ensemble de la chaîne technique de bout en bout."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quelles compétences pour devenir développeur web ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Devenir développeur web demande un équilibre entre compétences techniques (hard skills) et qualités méthodologiques (soft skills). Côté technique, il est indispensable de maîtriser le socle standard du web (HTML, CSS, JavaScript), des frameworks modernes (comme React, TypeScript et Tailwind CSS), la gestion de versions avec Git, ainsi que les bases de données (SQL) et les API REST. Côté méthodologique, la rigueur logique, la patience face au débogage, la veille technologique continue et la capacité à écouter et traduire les besoins métiers des clients sont primordiales pour réussir."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quels sont les 3 langages du web ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Les 3 langages fondamentaux qui constituent le socle universel de tout site internet sont : HTML (HyperText Markup Language) pour structurer le contenu sémantique et l'architecture des pages, CSS (Cascading Style Sheets) pour gérer la présentation visuelle, les styles, les couleurs et l'adaptabilité sur mobiles (responsive design), et JavaScript (JS) pour apporter du dynamisme, gérer les interactions utilisateur et traiter des données en temps réel sans recharger la page. Tous les navigateurs modernes exécutent nativement ce trio, aujourd'hui souvent enrichi par TypeScript pour garantir une robustesse logicielle maximale."
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

      // 5. Blog Posting Schemas
      if (cleanRoute.startsWith('/blog/') || cleanRoute.startsWith('/en/blog/')) {
        const articleDates: Record<string, { published: string; modified: string }> = {
          templates: { published: "2026-08-04T08:00:00+02:00", modified: "2026-08-14T00:00:00+02:00" },
          perf: { published: "2026-08-02T09:00:00+02:00", modified: "2026-08-14T00:00:00+02:00" },
          asso: { published: "2026-08-10T10:00:00+02:00", modified: "2026-08-14T00:00:00+02:00" },
          google: { published: "2026-09-10T08:00:00+02:00", modified: "2026-09-10T08:00:00+02:00" },
          wordpress: { published: "2026-09-15T08:00:00+02:00", modified: "2026-09-15T08:00:00+02:00" },
          artisan: { published: "2026-09-20T08:00:00+02:00", modified: "2026-09-20T08:00:00+02:00" },
          cout: { published: "2026-09-25T08:00:00+02:00", modified: "2026-09-25T08:00:00+02:00" },
          resto: { published: "2026-09-30T08:00:00+02:00", modified: "2026-09-30T08:00:00+02:00" },
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
          : cleanRoute.includes('cout-reel-site-internet-3-ans')
          ? articleDates.cout
          : cleanRoute.includes('reservation-directe-restaurant-sans-commission')
          ? articleDates.resto
          : cleanRoute.includes('ia-creation-site-web-opportunites-pieges')
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

      // 6. Case Study / Project Schemas
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

      // 7. Trade / Sector Pages Schemas (Service)
      if (cleanRoute.startsWith('/sites-internet/') || cleanRoute.startsWith('/en/websites/')) {
        const isRestaurant = cleanRoute.includes('restaurant');
        const isLiberal = cleanRoute.includes('profession-liberale') || cleanRoute.includes('professional-services');
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
          "serviceType": isRestaurant ? "Création Site Restaurant" : isLiberal ? "Création Site Profession Libérale" : "Création Site Artisan",
          "areaServed": ["FR", "Grand Est", "Meuse"],
          "offers": {
            "@type": "Offer",
            "priceCurrency": "EUR",
            "price": isRestaurant ? "1850" : isLiberal ? "1850" : "950",
            "description": meta.description
          }
        };
        injectedScripts.push(`<script type="application/ld+json" id="trade-service-ssg">${JSON.stringify(tradeServiceSchema)}</script>`);
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

