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
    title: 'DevSupAi • Alexandre Pabst | Développeur Web en Meuse (55) & Grand Est',
    description: "Création de sites vitrines, e-commerce et applications web sur-mesure pour PME, artisans et associations en Meuse (55), Grand Est et France. 0% abonnement captif, temps de chargement optimisés.",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/nos-services': {
    title: 'Catalogue des Prestations & Solutions Web Sur-Mesure | DevSupAi',
    description: "Consultez l'ensemble de nos 47 prestations de développement web : sites vitrines, e-commerce, applications sur-mesure, refonte technique et maintenance.",
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
  '/cgv': {
    title: 'Conditions Générales de Vente (CGV) | DevSupAi — Alexandre Pabst',
    description: "Consultez les Conditions Générales de Vente (CGV) régissant les prestations de développement web et logiciel sur-mesure de DevSupAi (Alexandre Pabst EI).",
    image: 'https://www.devsupai.fr/hero-bg-mockup.webp'
  },
  '/developpeur-web-lorraine': {
    title: 'Développeur Web en Lorraine & Grand Est (Nancy, Metz) | DevSupAi',
    description: "Développeur web freelance en Lorraine et Grand Est (Nancy, Metz, Meuse). Création sur-mesure de sites vitrines, e-commerce et applications sans abonnement captif.",
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

function buildBreadcrumbSchema(cleanRoute: string, pageTitle: string) {
  const homeUrl = 'https://www.devsupai.fr/';
  const homeName = 'Accueil';
  const currentUrl = `https://www.devsupai.fr${cleanRoute === '/' ? '/' : cleanRoute}`;

  if (cleanRoute === '/') {
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

  if (cleanRoute.startsWith('/blog/')) {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: 'https://www.devsupai.fr/blog',
    });
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: pageTitle,
      item: currentUrl,
    });
  } else if (cleanRoute.startsWith('/projets/')) {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Réalisations',
      item: 'https://www.devsupai.fr/#realisations',
    });
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: pageTitle,
      item: currentUrl,
    });
  } else if (cleanRoute.startsWith('/sites-internet/')) {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Prestations',
      item: 'https://www.devsupai.fr/nos-services',
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
        '/cgv',
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
        '/developpeur-web-lorraine',
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
      const canonicalUrl = `https://www.devsupai.fr${cleanRoute === '/' ? '/' : cleanRoute}`;
      const ogImageUrl = meta.image || 'https://www.devsupai.fr/hero-bg-mockup.webp';

      let cleanHtml = html;

      // Update <html lang="..."> attribute
      cleanHtml = cleanHtml.replace(/<html\s+lang="[^"]*"/, '<html lang="fr"');

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

      // On subpages, remove homepage hero background preloads to save mobile bandwidth
      if (cleanRoute !== '/') {
        cleanHtml = cleanHtml.replace(/<link rel="preload" href="\/hero-bg-mockup[^"]*"[^>]*>\s*/g, '');
      }

      // -----------------------------------------------------------------------
      // Comprehensive JSON-LD Structured Data per Route Type
      // -----------------------------------------------------------------------
      const injectedScripts: string[] = [];

      // 1. Homepage Structured Data (Organization + LocalBusiness + WebSite + FAQ)
      if (cleanRoute === '/') {
        injectedScripts.push(`<script type="application/ld+json" id="structured-data-org-ssg">${JSON.stringify(organizationData)}</script>`);

        const webSiteData = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "DevSupAi",
          "url": "https://www.devsupai.fr",
          "inLanguage": "fr",
          "author": {
            "@type": "Person",
            "name": "Alexandre Pabst"
          }
        };
        injectedScripts.push(`<script type="application/ld+json" id="website-schema-ssg">${JSON.stringify(webSiteData)}</script>`);

        const faqData = {
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
      const breadcrumb = buildBreadcrumbSchema(cleanRoute, meta.title.split('|')[0].trim());
      if (breadcrumb) {
        injectedScripts.push(`<script type="application/ld+json" id="breadcrumb-schema-ssg">${JSON.stringify(breadcrumb)}</script>`);
      }

      // 3. Services Page Schemas (Service + ItemList + FAQ)
      if (cleanRoute === '/nos-services') {
        const servicesSchema = {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Prestations de Développement Web & Logiciel Sur-Mesure",
          "description": meta.description,
          "itemListElement": [
            {
              "@type": "Offer",
              "position": 1,
              "name": "Sites Vitrines & Portails Professionnels",
              "description": "Conception de sites vitrines haut de gamme et portails d'information sans CMS lourd.",
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "950",
                "priceCurrency": "EUR"
              }
            },
            {
              "@type": "Offer",
              "position": 2,
              "name": "E-Commerce & Systèmes de Réservation",
              "description": "Boutiques et modules de réservation directe 100% sur-mesure sans commission."
            },
            {
              "@type": "Offer",
              "position": 3,
              "name": "Applications Web Métier & Logiciels SaaS",
              "description": "Logiciels de gestion interne, tableaux de bord et plateformes temps réel.",
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "3200",
                "priceCurrency": "EUR"
              }
            },
            {
              "@type": "Offer",
              "position": 4,
              "name": "Maintenance, Performance Web & Refonte",
              "description": "Audits de vitesse, sécurisation et optimisation de la vitesse d'affichage."
            }
          ]
        };
        injectedScripts.push(`<script type="application/ld+json" id="services-schema-ssg">${JSON.stringify(servicesSchema)}</script>`);
      }

      // 4. About Page Schema (AboutPage / Person)
      if (cleanRoute === '/a-propos') {
        const aboutSchema = {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "Person",
            "name": "Alexandre Pabst",
            "jobTitle": "Développeur Web Indépendant & Fondateur",
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
      if (cleanRoute === '/blog') {
        const blogFaqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
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
      if (cleanRoute.startsWith('/blog/')) {
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
            "url": "https://www.devsupai.fr/a-propos"
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
      if (cleanRoute.startsWith('/projets/')) {
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
            "url": "https://www.devsupai.fr/a-propos"
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
      if (cleanRoute.startsWith('/sites-internet/')) {
        const isRestaurant = cleanRoute.includes('restaurant');
        const isLiberal = cleanRoute.includes('profession-liberale');
        const isCommerce = cleanRoute.includes('commerce-boutique');
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
            ? "Création de Boutique E-Commerce" 
            : isRestaurant 
            ? "Création Site Restaurant" 
            : isLiberal 
            ? "Création Site Profession Libérale" 
            : "Création Site Artisan",
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
          ? [
              { q: "Combien coûte une boutique e-commerce pour commerce local chez DevSupAi ?", a: "Notre Pack Boutique E-Commerce démarre à 2 600 € clés en main, incluant la conception sur-mesure, la passerelle de paiement sécurisée Stripe, le module Click & Collect et la formation complète sans aucun abonnement captif." },
              { q: "Y a-t-il une commission prélevée sur mes ventes ou un abonnement mensuel ?", a: "Aucune commission n'est prélevée par DevSupAi sur votre chiffre d'affaires (0%). Seuls les frais bancaires standards de Stripe (environ 1,5% + 0,25 € par transaction) s'appliquent directement, sans surcoût intermédiaire." },
              { q: "Est-il facile d'ajouter de nouveaux produits et de gérer les stocks ?", a: "Oui. Vous disposez d'une interface d'administration sécurisée et ultra-simple qui vous permet d'ajouter un produit, modifier un prix ou ajuster vos stocks en quelques secondes depuis votre smartphone ou votre ordinateur." }
            ]
          : isRestaurant
          ? [
              { q: "Combien coûte la création d'un site de restaurant avec réservation ?", a: "Nos forfaits démarrent à 1 850 € pour un site complet avec carte interactive, galerie photos et moteur de réservation directe sans commission sur vos couverts." },
              { q: "Comment modifier la carte ou le plat du jour facilement ?", a: "Un panneau d'administration simplifié vous permet de modifier vos prix, changer un plat ou annoncer un menu de fête en moins de deux minutes depuis votre smartphone." },
              { q: "Les réservations arrivent-elles directement par email ou SMS ?", a: "Oui. Chaque demande validée vous envoie une notification instantanée et confirme la réservation au client avec un récapitulatif clair." }
            ]
          : isLiberal
          ? [
              { q: "Mon site respecte-t-il la déontologie de mon ordre professionnel ?", a: "Absolument. Nous veillons scrupuleusement à ce que le contenu, le ton et la présentation soient strictement informatifs et conformes aux recommandations des ordres professionnels (Ordre des Médecins, Barreaux d'Avocats, etc.)." },
              { q: "Puis-je intégrer un lien direct vers mon agenda Doctolib ou Calendly ?", a: "Oui, un bouton de prise de rendez-vous direct vers votre plateforme habituelle est intégré de façon fluide sur toutes les pages clés de votre site." },
              { q: "Les données transmises via le formulaire sont-elles protégées ?", a: "Oui. Les formulaires sont chiffrés via protocole HTTPS/TLS, ne stockent aucune donnée médicale sensible en clair et sont directement transmis sur votre messagerie professionnelle sécurisée." }
            ]
          : [
              { q: "Combien coûte un site internet pour artisan chez DevSupAi ?", a: "Nos solutions démarrent à 950 € pour le Pack Présence (One-Page complète et percutante) et 1 850 € pour le Pack Croissance (3 à 5 pages avec galerie de chantiers catégorisée). Chaque devis est gratuit, détaillé et sans aucun abonnement captif." },
              { q: "Puis-je ajouter moi-même des photos de mes chantiers terminés ?", a: "Oui. Une formation vidéo personnalisée vous est offerte à la livraison pour vous apprendre à insérer de nouvelles photos et textes facilement depuis votre smartphone ou votre ordinateur." },
              { q: "Combien de temps faut-il pour concevoir et mettre en ligne le site ?", a: "Comptez généralement 1 à 2 semaines pour un site One-Page, et 2 à 3 semaines pour un site multi-pages complet avec galerie de réalisations." }
            ];

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

      // 9. Regional Lorraine & Grand Est Page Schemas (Service + FAQPage)
      if (cleanRoute === '/developpeur-web-lorraine') {
        const regionalServiceSchema = {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Développement Web Sur-Mesure en Lorraine & Grand Est",
          "description": meta.description,
          "provider": {
            "@type": "ProfessionalService",
            "name": "DevSupAi • Alexandre Pabst",
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
          "serviceType": "Développement Web & Référencement Local",
          "areaServed": [
            { "@type": "AdministrativeArea", "name": "Lorraine" },
            { "@type": "AdministrativeArea", "name": "Grand Est" },
            { "@type": "AdministrativeArea", "name": "Meuse" },
            { "@type": "AdministrativeArea", "name": "Meurthe-et-Moselle" },
            { "@type": "AdministrativeArea", "name": "Moselle" },
            { "@type": "AdministrativeArea", "name": "Vosges" },
            { "@type": "City", "name": "Nancy", "postalCode": "54000" },
            { "@type": "City", "name": "Metz", "postalCode": "57000" },
            { "@type": "City", "name": "Bar-le-Duc", "postalCode": "55000" },
            { "@type": "City", "name": "Verdun", "postalCode": "55100" },
            { "@type": "City", "name": "Épinal", "postalCode": "88000" },
            { "@type": "Country", "name": "France" }
          ],
          "offers": {
            "@type": "Offer",
            "priceCurrency": "EUR",
            "price": "950",
            "description": "Pack Présence One-Page pour entreprise locale dès 950 €."
          }
        };
        injectedScripts.push(`<script type="application/ld+json" id="regional-service-ssg">${JSON.stringify(regionalServiceSchema)}</script>`);

        const regionalFaqQuestions = [
          {
            q: "Pourquoi choisir un développeur indépendant en Lorraine plutôt qu'une agence web traditionnelle ?",
            a: "Contrairement aux agences web traditionnelles de Nancy ou Metz qui s'appuient souvent sur des CMS lourds assortis d'abonnements mensuels captifs, DevSupAi vous garantit un interlocuteur direct unique (Alexandre Pabst). Vous bénéficiez d'un code 100% propriétaire (React 19 / TypeScript), d'une vitesse de chargement instantanée inférieure à la seconde, de 0 € d'abonnement logiciel imposé et de la pleine propriété de votre site dès sa livraison."
          },
          {
            q: "Vous déplacez-vous dans les entreprises en Lorraine et dans le Grand Est ?",
            a: "Oui. Basé à Saint-Mihiel en Meuse, je me déplace régulièrement en présentiel pour les réunions de cadrage, ateliers et présentations à Nancy, Metz, Bar-le-Duc, Verdun, Toul, Épinal et dans toute la Lorraine. Les points d'étape et le suivi régulier peuvent également s'effectuer par visioconférence pour un confort optimal."
          },
          {
            q: "Existe-t-il des aides de la Région Grand Est pour financer la création d'un site internet ?",
            a: "Oui. La Région Grand Est ainsi que les Chambres de Métiers et de Commerce proposent régulièrement des dispositifs d'aide à la digitalisation (comme le Chèque Transformation Numérique) destinés aux TPE, PME, artisans et commerçants. DevSupAi vous fournit un devis détaillé et un cahier des charges technique conforme pour appuyer votre dossier de subvention."
          },
          {
            q: "Mon site sera-t-il bien positionné sur Google en Lorraine et dans ma ville ?",
            a: "Chaque projet bénéficie d'une optimisation SEO local approfondie : structure sémantique HTML5 stricte, balisage Schema.org pour les moteurs de recherche, vitesse de chargement optimale (Core Web Vitals) et accompagnement sur votre fiche Google Business Profile. Cela assure une visibilité maximale sur vos requêtes cibles à Nancy, Metz, en Meuse ou dans votre bassin d'activité."
          },
          {
            q: "Quel est le délai de réalisation d'un projet web en Lorraine ?",
            a: "Les délais constatés sont de 1 à 2 semaines pour un Pack Présence (One-Page), de 2 à 4 semaines pour un Pack Croissance PME (vitrine 3 à 5 pages), et de 4 à 8 semaines pour une application SaaS métier. Un calendrier d'étapes clair est défini dès la signature du devis."
          }
        ];

        const regionalFaqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": regionalFaqQuestions.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.a
            }
          }))
        };
        injectedScripts.push(`<script type="application/ld+json" id="regional-faq-ssg">${JSON.stringify(regionalFaqSchema)}</script>`);
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

      // Replace Open Graph title, description, URL, image, and locale
      cleanHtml = cleanHtml.replace(/<meta property="og:title" content=".*?"\s*\/?>/, `<meta property="og:title" content="${meta.title}" />`);
      cleanHtml = cleanHtml.replace(/<meta property="og:description" content=".*?"\s*\/?>/, `<meta property="og:description" content="${meta.description}" />`);
      cleanHtml = cleanHtml.replace(/<meta property="og:url" content=".*?"\s*\/?>/, `<meta property="og:url" content="${canonicalUrl}" />`);
      cleanHtml = cleanHtml.replace(/<meta property="og:image" content=".*?"\s*\/?>/, `<meta property="og:image" content="${ogImageUrl}" />`);
      
      const ogLocaleTag = '<meta property="og:locale" content="fr_FR" />';
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

