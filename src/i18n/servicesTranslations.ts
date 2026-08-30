export interface ServiceItemTrans {
  id: string;
  title: string;
  category: 'vitrines' | 'ecommerce' | 'apps' | 'maintenance';
  description: string;
  profiles: string[];
  tags: string[];
}

export interface StrategicPillarTrans {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  pricing: string;
  deliverables: string[];
  tech: string[];
}

export interface ServiceFaqTrans {
  question: string;
  answer: string;
}

export const servicesData = {
  fr: {
    hero: {
      eyebrow: 'SOLUTIONS INFORMATIQUES & DÉVELOPPEMENT WEB',
      title: 'Des prestations digitales précises, taillées pour vos objectifs réels',
      desc: 'De la création d\'un site vitrine haut de gamme au développement d\'un logiciel métier complet, DevSupAi conçoit des architectures légères, sécurisées et ultra-rapides sans recourir à des modèles pré-conçus ni imposer d\'abonnements captifs.',
      valCode: 'Code 100% Propriétaire',
      valCodeSub: 'Zéro abonnement captif',
      valSpeed: 'Design & Ergonomie',
      valSpeedSub: 'Expérience fluide mobile & PC',
      valPillars: "4 Pôles d'Expertise",
      valPillarsSub: '47 Solutions ciblées',
      valContact: 'Interlocuteur Dédié',
      valContactSub: 'Fondateur & Développeur',
      directAccess: 'Accès direct :',
      anchorPillars: '1. Les 4 Grands Pôles',
      anchorCatalog: '2. Moteur de Recherche (47 prestations)',
      anchorMethod: '3. Méthodologie',
      anchorFaq: '4. Questions Fréquentes',
    },
    pillarsSection: {
      eyebrow: "MES 4 PÔLES D'EXPERTISE",
      title: "4 Pôles d'Expertise pour Répondre à Chaque Défi",
      desc: "Plutôt que d'appliquer une solution générique à tous les projets, je structure mon accompagnement autour de 4 spécialités claires.",
      deliverablesTitle: 'Engagements & Livrables Inclus :',
      techLabel: 'Technologies :',
      pricingLabel: 'Tarification indicative :',
      viewServicesBtn: 'Voir les prestations',
    },
    explorer: {
      eyebrow: 'CATALOGUE COMPLET & MOTEUR DE RECHERCHE',
      title: 'Explorez nos 47 Prestations & Solutions Web',
      desc: 'Recherchez une technologie, un besoin métier ou filtrez selon votre profil pour trouver la prestation idéale.',
      searchPlaceholder: 'Rechercher une prestation, mot-clé, technologie (ex: Stripe, SEO, React, réservation, devis)...',
      categoryAll: 'Toutes les catégories',
      catVitrines: 'Vitrines & Portails (16)',
      catEcommerce: 'E-commerce & SaaS (13)',
      catApps: 'Applications & Mobiles (9)',
      catMaintenance: 'Maintenance & SEO (9)',
      profileAll: 'Tous les profils métiers',
      profPme: 'PME & TPE',
      profArtisans: 'Artisans & BTP',
      profCommerces: 'Commerces & Boutiques',
      profAsso: 'Associations & Écoles',
      profLiberal: 'Professions Libérales & Cabinets',
      profResto: 'Restaurants & Hôtels',
      resultsCount: 'résultats trouvés',
      resetBtn: 'Réinitialiser',
      emptyTitle: 'Aucune prestation ne correspond à vos filtres',
      emptyDesc: 'Essayez de modifier vos termes de recherche ou de réinitialiser les filtres pour afficher l\'ensemble des 47 solutions.',
      contactCtaText: 'Demander un devis pour cette prestation',
    },
    methodology: {
      eyebrow: 'MÉTHODOLOGIE TRANSPARENTE',
      title: 'Un accompagnement rigoureux en 4 étapes',
      steps: [
        {
          num: '01',
          title: 'Cadrage & Étude des besoins',
          desc: 'Analyse précise de vos objectifs, de votre cible et de vos flux opérationnels pour définir un cahier des charges clair.',
        },
        {
          num: '02',
          title: 'Conception & Prototypage',
          desc: 'Création d\'une maquette sur-mesure validée avec vous pour définir l\'ergonomie avant d\'écrire la moindre ligne de code.',
        },
        {
          num: '03',
          title: 'Développement & Intégration',
          desc: 'Codage propre, tests automatisés, optimisation des temps de chargement et intégration sécurisée des fonctionnalités.',
        },
        {
          num: '04',
          title: 'Livraison, Formation & Garantie',
          desc: 'Mise en ligne, formation à la prise en main autonome et suivi sous garantie technique avec support réactif.',
        },
      ],
    },
    faqSection: {
      eyebrow: 'QUESTIONS FRÉQUENTES SUR LES SERVICES',
      title: 'Tout ce que vous devez savoir avant de démarrer',
    },
    banner: {
      title: 'Vous avez un projet spécifique en tête ?',
      desc: 'Obtenez une étude de faisabilité technique gratuite et un devis personnalisé sous 24 heures.',
      cta: 'Échanger sur mon projet',
    },
  },
  en: {
    hero: {
      eyebrow: 'DIGITAL SOLUTIONS & WEB DEVELOPMENT',
      title: 'Precision digital services, tailored to your genuine business goals',
      desc: 'From high-end showcase websites to comprehensive custom business software, DevSupAi crafts lean, secure, and lightning-fast web architectures without generic templates or captive subscriptions.',
      valCode: '100% Proprietary Code',
      valCodeSub: 'Zero captive subscriptions',
      valSpeed: 'Refined Design & UX',
      valSpeedSub: 'Seamless mobile & desktop flow',
      valPillars: '4 Core Pillars',
      valPillarsSub: '47 Targeted solutions',
      valContact: 'Dedicated Expert',
      valContactSub: 'Founder & Developer',
      directAccess: 'Direct access:',
      anchorPillars: '1. The 4 Core Pillars',
      anchorCatalog: '2. Search Engine (47 Services)',
      anchorMethod: '3. Methodology',
      anchorFaq: '4. FAQ',
    },
    pillarsSection: {
      eyebrow: 'MY 4 CORE AREAS OF EXPERTISE',
      title: '4 Core Pillars Built to Meet Every Digital Challenge',
      desc: 'Rather than applying a one-size-fits-all generic solution, I structure my engineering around 4 distinct specialties.',
      deliverablesTitle: 'Included Deliverables & Commitments:',
      techLabel: 'Technologies:',
      pricingLabel: 'Indicative pricing:',
      viewServicesBtn: 'View services',
    },
    explorer: {
      eyebrow: 'COMPLETE CATALOG & SEARCH ENGINE',
      title: 'Explore Our 47 Web & Software Services',
      desc: 'Search by technology, business need, or filter by your industry to find the exact service you require.',
      searchPlaceholder: 'Search a service, keyword, technology (e.g., Stripe, SEO, React, booking, quote)...',
      categoryAll: 'All Categories',
      catVitrines: 'Showcases & Portals (16)',
      catEcommerce: 'E-Commerce & SaaS (13)',
      catApps: 'Apps & Mobile (9)',
      catMaintenance: 'Maintenance & SEO (9)',
      profileAll: 'All Industry Profiles',
      profPme: 'SMEs & Businesses',
      profArtisans: 'Artisans & Contractors',
      profCommerces: 'Retail & Commerce',
      profAsso: 'Non-Profits & Schools',
      profLiberal: 'Medical, Legal & Consultants',
      profResto: 'Restaurants & Hospitality',
      resultsCount: 'services found',
      resetBtn: 'Reset filters',
      emptyTitle: 'No services match your filters',
      emptyDesc: 'Try adjusting your search keywords or resetting filters to display all 47 available solutions.',
      contactCtaText: 'Request a quote for this service',
    },
    methodology: {
      eyebrow: 'TRANSPARENT METHODOLOGY',
      title: 'A Rigorous 4-Step Engineering Workflow',
      steps: [
        {
          num: '01',
          title: 'Scoping & Needs Discovery',
          desc: 'Precise analysis of your business goals, target audience, and operational flows to define a clear scope.',
        },
        {
          num: '02',
          title: 'Design & Prototyping',
          desc: 'Custom UI/UX prototyping validated together to ensure intuitive ergonomics before writing a single line of code.',
        },
        {
          num: '03',
          title: 'Development & Integration',
          desc: 'Clean code, automated tests, sub-second speed optimization, and secure functionality implementation.',
        },
        {
          num: '04',
          title: 'Deployment, Training & Warranty',
          desc: 'Seamless deployment, self-management training, and technical warranty with fast ongoing support.',
        },
      ],
    },
    faqSection: {
      eyebrow: 'SERVICES FREQUENTLY ASKED QUESTIONS',
      title: 'Everything You Need to Know Before Getting Started',
    },
    banner: {
      title: 'Do you have a specific digital project in mind?',
      desc: 'Get a free technical feasibility study and a clear custom quote within 24 hours.',
      cta: 'Discuss my project',
    },
  },
};
