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

        // English Routes
        '/en',
        '/en/services',
        '/en/about',
        '/en/blog',
        '/en/blog/site-web-pme-association',
        '/en/blog/pourquoi-eviter-les-templates',
        '/en/blog/performance-web-sur-mesure',
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
            if (id.includes('three') || id.includes('@react-three') || id.includes('ogl')) return 'vendor-3d';
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

      // Extract hoisted preload links or scripts from root container
      cleanHtml = cleanHtml.replace(/(<div id="root"[^>]*>)([\s\S]*?)(<\/div>)/, (_match: string, openTag: string, innerHtml: string, closeTag: string) => {
        let extractedHeadTags = '';
        let cleanedInner = innerHtml.replace(/<link rel="preload"[^>]*>/g, (tagMatch: string) => {
          extractedHeadTags += tagMatch;
          return '';
        });
        if (extractedHeadTags) {
          cleanHtml = cleanHtml.replace('</head>', `${extractedHeadTags}</head>`);
        }
        return `${openTag}${cleanedInner}${closeTag}`;
      });

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
        const isTemplates = cleanRoute.includes('pourquoi-eviter-les-templates');
        const isPerf = cleanRoute.includes('performance-web-sur-mesure');

        const articleDates: Record<string, { published: string; modified: string }> = {
          templates: { published: "2026-08-04T08:00:00+02:00", modified: "2026-08-14T00:00:00+02:00" },
          perf: { published: "2026-08-02T09:00:00+02:00", modified: "2026-08-14T00:00:00+02:00" },
          asso: { published: "2026-08-10T10:00:00+02:00", modified: "2026-08-14T00:00:00+02:00" },
        };

        const dates = isTemplates ? articleDates.templates : isPerf ? articleDates.perf : articleDates.asso;

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

