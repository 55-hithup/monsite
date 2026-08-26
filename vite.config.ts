import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'
import organizationData from './src/data/organization.json' with { type: 'json' }

const pageMetadata: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'DevSupAi | Développeur Web & Applications Sur-Mesure',
    description: "DevSupAi, développeur web freelance basé en Meuse (Grand Est). Sites vitrines, e-commerce et applications sur-mesure pour PME et associations, en France."
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
  '/projets/les-jumeaux': {
    title: 'Étude de cas : Les Jumeaux | Site Vitrine & Réservation Sur-Mesure | DevSupAi',
    description: "Découvrez l'étude de cas du restaurant Les Jumeaux : création d'un site vitrine sur-mesure et d'un système de réservation directe sans widget tiers."
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
  '/admin/login': {
    title: 'Connexion Administration | DevSupAi',
    description: "Espace de connexion sécurisé pour l'administration de la modération des avis sur le site DevSupAi."
  },
  '/admin/avis': {
    title: 'Tableau de Bord Administration | DevSupAi',
    description: "Tableau de bord de modération des avis clients de DevSupAi."
  }
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: 'https://www.devsupai.fr',
      readable: true,
      dynamicRoutes: [
        '/nos-services',
        '/a-propos',
        '/blog',
        '/blog/site-web-pme-association',
        '/blog/pourquoi-eviter-les-templates',
        '/blog/performance-web-sur-mesure',
        '/projets/les-jumeaux',
        '/projets/locatool',
        '/projets/abogame',
        '/mentions-legales',
        '/politique-de-confidentialite',
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
      if (cleanRoute.endsWith('/')) {
        cleanRoute = cleanRoute.slice(0, -1);
      }
      if (cleanRoute === '') {
        cleanRoute = '/';
      }
      
      const meta = pageMetadata[cleanRoute] || pageMetadata['/'];
      const canonicalUrl = `https://www.devsupai.fr${cleanRoute === '/' ? '/' : cleanRoute}`;
      
      let cleanHtml = html;

      // Extract any hoisted <link rel="preload" ...> or <script> tags placed inside <div id="root"> and move them to <head>
      // so that <div id="root"> contains ONLY pure component markup matching client hydration exactly
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

      // Inject organization data and FAQ schema on homepage
      if (cleanRoute === '/') {
        const orgScript = `<script type="application/ld+json" id="structured-data-org-ssg">${JSON.stringify(organizationData)}</script>`;
        const faqScript = `<script type="application/ld+json" id="faq-schema-ssg">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Comment est défini le tarif d'un projet sur-mesure ?","acceptedAnswer":{"@type":"Answer","text":"Mes forfaits sont transparents et adaptés à vos besoins réels : dès 690 € pour le Pack Présence (One-Page), dès 1 350 € pour le Pack Croissance (site vitrine 3 à 5 pages), et dès 2 450 € pour une application web ou un outil SaaS sur-mesure (base TJM 350 €). Chaque projet fait l'objet d'un devis détaillé chiffrant exactement ce dont vous avez besoin, sans frais cachés ni abonnements obligatoires de plugins."}},{"@type":"Question","name":"Pourquoi le sur-mesure est-il plus rentable sur la durée ?","acceptedAnswer":{"@type":"Answer","text":"Un site sous modèle générique accumule souvent des abonnements payants de plugins (sécurité, formulaires, thème) générant 400 € à 1 200 € par an. Avec DevSupAi, vous ne payez aucun abonnement tiers obligatoire. Votre code est propre, ne souffre d'aucune obsolescence et conserve un affichage instantané qui maximise vos conversions."}},{"@type":"Question","name":"Combien de temps dure la réalisation d'un projet web ?","acceptedAnswer":{"@type":"Answer","text":"Les délais de livraison varient de 1 à 2 semaines pour un Pack Présence, de 2 à 4 semaines pour un Pack Croissance (vitrine 3-5 pages), et de 4 à 8 semaines pour une application SaaS. Un calendrier précis avec des jalons de validation intermédiaire est fixé dès la signature du devis pour garantir le respect des échéances."}},{"@type":"Question","name":"Proposez-vous la gestion de la fiche Google Business et le référencement local ?","acceptedAnswer":{"@type":"Answer","text":"Oui, une prestation mensuelle dédiée est proposée dès 29 €/mois pour animer, optimiser et référencer votre fiche d'établissement sur Google Maps. Elle comprend l'optimisation initiale, la publication régulière d'actualités/photos, la réponse aux avis clients et le suivi de positionnement local."}},{"@type":"Question","name":"Suis-je propriétaire à 100 % de mon site internet et de mes données ?","acceptedAnswer":{"@type":"Answer","text":"Oui, vous êtes l'unique et total propriétaire de l'intégralité du code source, de vos contenus, de votre base de données et de votre nom de domaine. Aucun contrat d'engagement forcé : vous êtes libre de faire évoluer ou d'héberger votre projet où vous le souhaitez."}},{"@type":"Question","name":"Quels sont les frais récurrents à prévoir (hébergement & domaine) ?","acceptedAnswer":{"@type":"Answer","text":"L'hébergement sécurisé haute performance et votre nom de domaine sont inclus la première année dans chaque forfait. Par la suite, le coût technique direct de renouvellement reste minime (généralement entre 40 € et 90 € par an selon l'envergure du projet), sans surcoût imposé."}},{"@type":"Question","name":"Puis-je administrer moi-même les contenus ou les données de mon site ?","acceptedAnswer":{"@type":"Answer","text":"Selon vos besoins, une interface d'administration intuitive peut être intégrée à votre projet. Si votre activité nécessite de mettre à jour des actualités, des réservations ou du matériel (comme pour LocaTool), l'outil est conçu pour être simple sans compétences techniques."}},{"@type":"Question","name":"Quel suivi ou accompagnement est proposé après la mise en ligne ?","acceptedAnswer":{"@type":"Answer","text":"Chaque livraison s'accompagne d'une période de garantie technique et d'une assistance à la prise en main. Des forfaits d'infogérance, de maintenance préventive et de sauvegardes régulières sont disponibles dès 29 €/mois pour assurer votre sérénité."}}]}</script>`;
        cleanHtml = cleanHtml.replace('</head>', `${orgScript}${faqScript}</head>`);
      }
      
      // Replace title
      cleanHtml = cleanHtml.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);
      
      // Replace description meta tag
      cleanHtml = cleanHtml.replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${meta.description}" />`);
      
      // Replace canonical URL link
      cleanHtml = cleanHtml.replace(/<link rel="canonical" href=".*?"\s*\/?>/, `<link rel="canonical" href="${canonicalUrl}" />`);
      
      // Replace Open Graph title, description, and URL
      cleanHtml = cleanHtml.replace(/<meta property="og:title" content=".*?"\s*\/?>/, `<meta property="og:title" content="${meta.title}" />`);
      cleanHtml = cleanHtml.replace(/<meta property="og:description" content=".*?"\s*\/?>/, `<meta property="og:description" content="${meta.description}" />`);
      cleanHtml = cleanHtml.replace(/<meta property="og:url" content=".*?"\s*\/?>/, `<meta property="og:url" content="${canonicalUrl}" />`);
      
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
