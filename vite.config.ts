import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'
import organizationData from './src/data/organization.json' with { type: 'json' }

const pageMetadata: Record<string, { title: string; description: string }> = {
  // French Pages (FR)
  '/': {
    title: 'DevSupAi • Alexandre Pabst | Développeur Web & Création de Sites Sur-Mesure',
    description: "Création de sites vitrines, e-commerce et applications web sur-mesure pour PME, artisans et associations en Meuse (55), Grand Est et France. 0% abonnement captif, vitesse < 0.4s."
  },
  '/nos-services': {
    title: 'Nos Prestations & Solutions Web Sur-Mesure | DevSupAi',
    description: "Découvrez nos 47 prestations informatiques : création de sites vitrines, e-commerce, applications mobiles Android/iOS, SaaS sur-mesure et maintenance technique."
  },
  '/a-propos': {
    title: 'À Propos | Alexandre Pabst – Développeur Web Sur-Mesure | DevSupAi',
    description: "Découvrez le parcours d'Alex, fondateur de DevSupAi, et sa méthode de développement sans compromis pour concevoir des sites web rapides et entièrement sur-mesure."
  },
  '/blog': {
    title: 'Blog & Actualités Développement Web Sur-Mesure | DevSupAi',
    description: "Conseils, guides techniques et bonnes pratiques sur le développement web sur-mesure, la performance, l'accessibilité et le référencement SEO pour PME et Associations."
  },
  '/blog/site-web-pme-association': {
    title: 'Quel site web créer pour une PME ou une Association ? | DevSupAi',
    description: "Découvrez comment concevoir un site internet performant et sur-mesure adapté aux besoins spécifiques des PME, TPE et Associations loi 1901."
  },
  '/blog/pourquoi-eviter-les-templates': {
    title: 'Pourquoi éviter les templates ? | Le sur-mesure pour PME & Asso | DevSupAi',
    description: "Les thèmes pré-conçus pénalisent votre vitesse de chargement et nuisent à votre référencement naturel. Découvrez pourquoi le développement sur-mesure est devenu incontournable."
  },
  '/blog/performance-web-sur-mesure': {
    title: 'Performance Web & SEO Sur-Mesure : Le Guide | DevSupAi',
    description: "Découvrez les piliers de la vitesse web et de l'optimisation SEO pour propulser votre site internet PME ou association au sommet des résultats Google."
  },
  '/projets/atelier-gourmand': {
    title: "Étude de cas : L'Atelier Gourmand | Site Vitrine & Réservation Sur-Mesure | DevSupAi",
    description: "Découvrez l'étude de cas de L'Atelier Gourmand : création d'un site vitrine restaurant sur-mesure et d'un système de réservation directe sans widget tiers ni commission."
  },
  '/projets/locatool': {
    title: 'Étude de cas : LocaTool | Application Web SaaS Sur-Mesure | DevSupAi',
    description: "Découvrez comment l'application web métier LocaTool a été conçue pour centraliser et simplifier la gestion de location de matériel professionnel."
  },
  '/projets/abogame': {
    title: 'Étude de cas : Abogame | Plateforme Web Interactive Live | DevSupAi',
    description: "Découvrez comment la plateforme interactive mobile-first Abogame dynamise les animations en direct grâce à une roue de tirage visuelle et interactive en temps réel."
  },
  '/mentions-legales': {
    title: 'Mentions Légales | DevSupAi',
    description: "Consultez les informations légales et les mentions réglementaires de l'entreprise individuelle DevSupAi dirigée par Alexandre."
  },
  '/politique-de-confidentialite': {
    title: 'Politique de Confidentialité | DevSupAi',
    description: "Découvrez notre politique de confidentialité, le traitement de vos données personnelles et vos droits relatifs aux RGPD."
  },

  // English Pages (EN)
  '/en': {
    title: 'DevSupAi • Alexandre Pabst | Bespoke Web Developer & Engineering',
    description: 'Handcrafted showcase websites, e-commerce, and custom SaaS web applications for SMEs, artisans, and non-profits in France and worldwide. Zero recurring software fees, < 0.4s LCP.'
  },
  '/en/services': {
    title: 'Our Custom Web Services & Digital Solutions | DevSupAi',
    description: 'Explore our 47 custom digital services: showcase websites, e-commerce, Android/iOS mobile apps, custom SaaS software, and technical maintenance.'
  },
  '/en/about': {
    title: 'About | Alexandre Pabst – Bespoke Web Developer | DevSupAi',
    description: "Discover the background of Alex, founder of DevSupAi, and his uncompromising development methodology for crafting lightning-fast, custom websites."
  },
  '/en/blog': {
    title: 'Blog & Insights on Custom Web Development | DevSupAi',
    description: 'Guides, technical best practices, and expert advice on bespoke web development, performance, accessibility, and SEO for SMEs and non-profits.'
  },
  '/en/blog/site-web-pme-association': {
    title: 'How to Build a Successful Website for an SME or Non-Profit? | DevSupAi',
    description: 'Comprehensive guide to designing an effective, high-speed custom website without recurring software subscriptions for SMEs and Non-Profits.'
  },
  '/en/blog/pourquoi-eviter-les-templates': {
    title: 'Why Avoid Pre-Made Templates in 2026? | DevSupAi',
    description: 'Generic templates hurt your loading speed and hinder your Google rankings. Discover why custom development has become essential.'
  },
  '/en/blog/performance-web-sur-mesure': {
    title: 'Page Speed & Conversion Rates: The Guide | DevSupAi',
    description: 'Every millisecond of delay costs revenue. Data-backed analysis of how top-tier web performance directly drives business growth.'
  },
  '/en/projects/atelier-gourmand': {
    title: "Case Study: L'Atelier Gourmand | Restaurant Showcase & Custom Booking | DevSupAi",
    description: "Discover how restaurant L'Atelier Gourmand operates with a custom showcase website and direct table booking system without third-party commissions."
  },
  '/en/projects/locatool': {
    title: 'Case Study: LocaTool | Custom SaaS Equipment Management | DevSupAi',
    description: 'Discover how the LocaTool SaaS web application was engineered to centralize and streamline professional equipment rental and fleet tracking.'
  },
  '/en/projects/abogame': {
    title: 'Case Study: Abogame | Interactive Real-Time Web Platform | DevSupAi',
    description: 'Discover how the Abogame mobile-first interactive platform powers live animations and real-time streaming with an interactive giveaway wheel.'
  },
  '/en/legal-notices': {
    title: 'Legal Notices | DevSupAi',
    description: 'Consult the legal information and regulatory notices of the sole proprietorship DevSupAi managed by Alexandre Pabst.'
  },
  '/en/privacy-policy': {
    title: 'Privacy Policy | DevSupAi',
    description: 'Read our privacy policy, personal data processing terms, and your GDPR data protection rights.'
  },

  // Admin Pages
  '/admin/login': {
    title: 'Connexion Administration | DevSupAi',
    description: "Espace de connexion sécurisé pour l'administration de la modération des avis sur le site DevSupAi."
  },
  '/admin/avis': {
    title: 'Tableau de Bord Administration | DevSupAi',
    description: "Tableau de bord de modération des avis clients de DevSupAi."
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

      // Inject structured data
      if (cleanRoute === '/' || cleanRoute === '/en') {
        const localizedOrg = isEnglish
          ? {
              ...organizationData,
              description: 'DevSupAi - Freelance web developer specialized in bespoke, high-performance web applications and websites for SMEs and non-profits in France and worldwide.'
            }
          : organizationData;

        const orgScript = `<script type="application/ld+json" id="structured-data-org-ssg">${JSON.stringify(localizedOrg)}</script>`;

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

        const faqScript = `<script type="application/ld+json" id="faq-schema-ssg">${JSON.stringify(faqData)}</script>`;
        cleanHtml = cleanHtml.replace('</head>', `${orgScript}${faqScript}</head>`);
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

      // Replace Open Graph title, description, URL, and locale
      cleanHtml = cleanHtml.replace(/<meta property="og:title" content=".*?"\s*\/?>/, `<meta property="og:title" content="${meta.title}" />`);
      cleanHtml = cleanHtml.replace(/<meta property="og:description" content=".*?"\s*\/?>/, `<meta property="og:description" content="${meta.description}" />`);
      cleanHtml = cleanHtml.replace(/<meta property="og:url" content=".*?"\s*\/?>/, `<meta property="og:url" content="${canonicalUrl}" />`);
      
      const ogLocaleTag = `<meta property="og:locale" content="${isEnglish ? 'en_US' : 'fr_FR'}" /><meta property="og:locale:alternate" content="${isEnglish ? 'fr_FR' : 'en_US'}" />`;
      cleanHtml = cleanHtml.replace('</head>', `${ogLocaleTag}</head>`);

      // Replace Twitter title, description, and URL
      cleanHtml = cleanHtml.replace(/<meta property="twitter:title" content=".*?"\s*\/?>/g, `<meta property="twitter:title" content="${meta.title}" />`);
      cleanHtml = cleanHtml.replace(/<meta property="twitter:description" content=".*?"\s*\/?>/g, `<meta property="twitter:description" content="${meta.description}" />`);
      cleanHtml = cleanHtml.replace(/<meta property="twitter:url" content=".*?"\s*\/?>/g, `<meta property="twitter:url" content="${canonicalUrl}" />`);
      cleanHtml = cleanHtml.replace(/<meta name="twitter:title" content=".*?"\s*\/?>/g, `<meta name="twitter:title" content="${meta.title}" />`);
      cleanHtml = cleanHtml.replace(/<meta name="twitter:description" content=".*?"\s*\/?>/g, `<meta name="twitter:description" content="${meta.description}" />`);
      cleanHtml = cleanHtml.replace(/<meta name="twitter:url" content=".*?"\s*\/?>/g, `<meta name="twitter:url" content="${canonicalUrl}" />`);
      
      return cleanHtml;
    },
  },
} as any)

