export interface TradeFaqItem {
  q: string;
  a: string;
}

export interface TradeFeature {
  title: string;
  desc: string;
}

export interface TradeTestimonial {
  quote: string;
  name: string;
  role: string;
  rating: number;
  tag: string;
}

export interface TradeRecommendedPack {
  name: string;
  badge: string;
  price: string;
  description: string;
  link: string;
  linkLabel: string;
}

export interface TradePageContent {
  slug: string;
  meta: {
    title: string;
    description: string;
    badge: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    proofPill: string;
  };
  challengesTitle: string;
  challengesSubtitle: string;
  challenges: TradeFeature[];
  deliverablesTitle: string;
  deliverables: string[];
  testimonial: TradeTestimonial;
  recommendedPack: TradeRecommendedPack;
  caseStudy: {
    title: string;
    desc: string;
    link: string;
    linkLabel: string;
    tag: string;
  };
  faqTitle: string;
  faq: TradeFaqItem[];
  contactCta: {
    title: string;
    desc: string;
    btn: string;
  };
}

export const tradesData: Record<string, Record<string, TradePageContent>> = {
  fr: {
    artisan: {
      slug: 'sites-internet/artisan-renovation',
      meta: {
        title: 'Création de Site Internet pour Artisan du Bâtiment & Rénovation en Meuse | DevSupAi',
        description: 'Conception sur-mesure de sites vitrines pour artisans du bâtiment, menuisiers, électriciens et peintres en Meuse (55) et Grand Est. Galerie chantiers HD, formulaires de devis et SEO local.',
        badge: 'ARTISANS DU BÂTIMENT & RÉNOVATION',
      },
      hero: {
        title: 'Création de site internet pour artisan du bâtiment & rénovation',
        subtitle: 'Valorisez votre savoir-faire artisanal avec un site ultra-rapide sans abonnement captif : galerie chantiers avant/après, formulaires de devis géolocalisés et référencement Google ciblé sur votre zone d\'intervention.',
        ctaPrimary: 'Demander un devis artisan gratuit',
        ctaSecondary: 'Appeler au 07 83 66 60 98',
        proofPill: '100% Code propriétaire • 0 € d\'abonnement récurrent • Hébergement et nom de domaine inclus an 1',
      },
      challengesTitle: 'Les atouts indispensables pour un site d\'artisan performant',
      challengesSubtitle: 'Votre site web doit rassurer immédiatement les particuliers et professionnels locaux tout en simplifiant vos prises de contact.',
      challenges: [
        {
          title: 'Galerie de chantiers haute définition',
          desc: 'Présentez vos réalisations avec filtres par corps de métier (rénovation, plomberie, menuiserie, maçonnerie) et comparatifs avant/après chantiers valorisants.',
        },
        {
          title: 'Module de demande de devis guidé',
          desc: 'Permettez à vos clients de préciser leur projet, superficie et localisation dès le premier contact, avec transmission instantanée par email sur votre smartphone.',
        },
        {
          title: 'Réassurance décennale & certifications',
          desc: 'Mise en avant claire de votre garantie décennale, assurance professionnelle et labels de confiance (RGE, Qualibat, Eco Artisan).',
        },
        {
          title: 'Référencement local puissant en Meuse & Grand Est',
          desc: 'Positionnez votre entreprise sur les recherches stratégiques de votre secteur (ex. « électricien Saint-Mihiel », « rénovation salle de bain Commercy », « peintre Verdun »).',
        },
      ],
      deliverablesTitle: 'Ce qui est inclus dans votre site vitrine artisan',
      deliverables: [
        'Conception graphique originale inspirée de votre charte et de vos réalisations',
        'Architecture mobile-first ultra-fluide pour une consultation rapide sur smartphone',
        'Galerie interactive de chantiers avec compression automatique WebP sans perte',
        'Formulaire de devis personnalisé avec protection anti-spam sans captcha bloquant',
        'Intégration de votre fiche Google Business Profile et des avis clients certifiés',
        'Propriété totale du code source et des fichiers : aucun abonnement mensuel imposé',
      ],
      testimonial: {
        quote: "Passer d'un ancien template WordPress lent à un site sur-mesure développé par DevSupAi a tout changé. Mon planning de chantiers est complet plusieurs mois à l'avance grâce aux demandes de devis qualifiées qui arrivent régulièrement. Un investissement très vite rentabilisé.",
        name: "Thomas Mercier",
        role: "Fondateur, Mercier Rénovation & Bois",
        rating: 5,
        tag: "Avis Client Vérifié • Meuse (55)",
      },
      recommendedPack: {
        name: "Pack Croissance PME",
        badge: "RECOMMANDÉ POUR ARTISANS DU BÂTIMENT",
        price: "Dès 1 850 €",
        description: "Site multi-pages complet avec galerie de réalisations chantiers haute définition, formulaire de devis détaillé et SEO local géociblé.",
        link: "/#offres",
        linkLabel: "Découvrir le Pack Croissance",
      },
      caseStudy: {
        title: 'LocaTool : Gestion de matériel pour artisans et chantiers',
        desc: 'Découvrez comment DevSupAi a également développé un logiciel SaaS sur-mesure pour suivre le parc de matériel et éditer des contrats de mise à disposition en un clic.',
        link: '/projets/locatool',
        linkLabel: 'Découvrir la solution LocaTool',
        tag: 'Application Métier & Matériel',
      },
      faqTitle: 'Questions fréquentes des artisans du bâtiment',
      faq: [
        {
          q: 'Combien coûte un site internet pour artisan chez DevSupAi ?',
          a: 'Nos solutions démarrent à 950 € pour le Pack Présence (One-Page complète et percutante) et 1 850 € pour le Pack Croissance (3 à 5 pages avec galerie de chantiers catégorisée). Chaque devis est gratuit, détaillé et sans aucun abonnement captif.',
        },
        {
          q: 'Puis-je ajouter moi-même des photos de mes chantiers terminés ?',
          a: 'Oui. Une formation vidéo personnalisée vous est offerte à la livraison pour vous apprendre à insérer de nouvelles photos et textes facilement depuis votre smartphone ou votre ordinateur.',
        },
        {
          q: 'Combien de temps faut-il pour concevoir et mettre en ligne le site ?',
          a: 'Comptez généralement 1 à 2 semaines pour un site One-Page, et 2 à 3 semaines pour un site multi-pages complet avec galerie de réalisations.',
        },
      ],
      contactCta: {
        title: 'Prêt à valoriser vos chantiers et obtenir plus de devis qualifiés ?',
        desc: 'Échangeons gratuitement sur votre activité et recevez une proposition chiffrée sous 24 heures ouvrées.',
        btn: 'Demander mon devis artisan',
      },
    },
    professionLiberale: {
      slug: 'sites-internet/profession-liberale',
      meta: {
        title: 'Création de Site Internet pour Profession Libérale & Médicale | DevSupAi',
        description: 'Site web professionnel sur-mesure pour professions libérales, avocats, architectes, consultants et praticiens de santé. Présentation soignée, prise de contact sécurisée et conformité déontologique.',
        badge: 'PROFESSIONS LIBÉRALES & SANTÉ',
      },
      hero: {
        title: 'Création de site internet pour profession libérale & santé',
        subtitle: 'Une vitrine professionnelle haut de gamme pour inspirer confiance à votre patientèle ou clientèle : présentation de vos spécialités, honoraires transparents, formulaires sécurisés et conformité déontologique.',
        ctaPrimary: 'Demander une étude préalable',
        ctaSecondary: 'Appeler au 07 83 66 60 98',
        proofPill: 'Design épuré • Respect strict du RGPD • 0 € d\'abonnement logiciel captif',
      },
      challengesTitle: 'Les exigences d\'un site pour profession libérale',
      challengesSubtitle: 'Votre présence en ligne doit véhiculer une image rigoureuse, rassurer vos interlocuteurs et faciliter la prise de rendez-vous.',
      challenges: [
        {
          title: 'Crédibilité & clarté des expertises',
          desc: 'Structure éditoriale soignée détaillant vos domaines d\'intervention, vos diplômes, votre parcours et vos méthodes de prise en charge.',
        },
        {
          title: 'Conformité RGPD & déontologie professionnelle',
          desc: 'Formulaires de contact sécurisés sans cookies intrusifs, politique de confidentialité conforme et respect des règles ordinales de votre profession.',
        },
        {
          title: 'Prise de rendez-vous & intégration d\'agendas',
          desc: 'Connexion fluide avec vos outils de téléconsultation ou de planning en ligne (Doctolib, Calendly, Google Agenda) sans alourdir le site.',
        },
        {
          title: 'Accessibilité numérique universelle (WCAG AA)',
          desc: 'Contrastes rigoureux, typographie aérée et compatibilité totale avec les lecteurs d\'écran pour accueillir tous les publics sans discrimination.',
        },
      ],
      deliverablesTitle: 'Ce qui est inclus pour votre cabinet ou activité libérale',
      deliverables: [
        'Design minimaliste et élégant calibré pour inspirer confiance et sérénité',
        'Fiches détaillées pour chaque domaine de compétence ou spécialité médicale',
        'Transparence des honoraires, conventions d\'honoraires et modes de règlement',
        'Formulaire de prise de contact chiffré et conforme aux exigences de confidentialité',
        'Plan d\'accès interactif, transports en commun à proximité et accessibilité PMR',
        'Hébergement haute sécurité sur serveurs européens avec certificat SSL renforcé',
      ],
      testimonial: {
        quote: "DevSupAi a su concevoir un site à la fois épuré, rassurant et ultra-rapide pour nos patients. La navigation sur smartphone est parfaite, les informations sont claires et nous avons d'excellents retours au quotidien. Un professionnalisme rare et un suivi exemplaire.",
        name: "Dr. Sophie Laurent",
        role: "Chirurgien-Dentiste, Cabinet Dentaire",
        rating: 5,
        tag: "Avis Client Vérifié • Santé & Médical",
      },
      recommendedPack: {
        name: "Pack Présence ou Pack Croissance",
        badge: "RECOMMANDÉ POUR CABINETS & PROFESSIONS LIBÉRALES",
        price: "Dès 950 €",
        description: "Une vitrine déontologique, sobre et rapide pour valoriser vos expertises, honoraires et orienter facilement vers votre système de prise de rendez-vous.",
        link: "/#offres",
        linkLabel: "Consulter nos forfaits",
      },
      caseStudy: {
        title: 'Atelier Gourmand : Présentation claire et parcours fluide',
        desc: 'Découvrez notre démarche d\'ingénierie UX appliquée à la réservation directe et à la clarté de l\'information sur-mesure.',
        link: '/projets/atelier-gourmand',
        linkLabel: 'Consulter l\'étude de cas',
        tag: 'Ergonomie & Clarté UX',
      },
      faqTitle: 'Questions fréquentes des professionnels libéraux',
      faq: [
        {
          q: 'Mon site respecte-t-il la déontologie de mon ordre professionnel ?',
          a: 'Absolument. Nous veillons scrupuleusement à ce que le contenu, le ton et la présentation soient strictement informatifs et conformes aux recommandations des ordres professionnels (Ordre des Médecins, Barreaux d\'Avocats, etc.).',
        },
        {
          q: 'Puis-je intégrer un lien direct vers mon agenda Doctolib ou Calendly ?',
          a: 'Oui, un bouton de prise de rendez-vous direct vers votre plateforme habituelle est intégré de façon fluide sur toutes les pages clés de votre site.',
        },
        {
          q: 'Les données transmises via le formulaire sont-elles protégées ?',
          a: 'Oui. Les formulaires sont chiffrés via protocole HTTPS/TLS, ne stockent aucune donnée médicale sensible en clair et sont directement transmis sur votre messagerie professionnelle sécurisée.',
        },
      ],
      contactCta: {
        title: 'Valorisez l\'expertise de votre cabinet avec un site sur-mesure',
        desc: 'Contactez DevSupAi pour un premier échange confidentiel et un devis personnalisé sous 24h.',
        btn: 'Programmer un échange confidentiel',
      },
    },
    restaurant: {
      slug: 'sites-internet/restaurant',
      meta: {
        title: 'Création de Site Internet pour Restaurant & Bistronomie en Meuse | DevSupAi',
        description: 'Site web sur-mesure pour restaurants, brasseries et traiteurs en Meuse et Grand Est. Menus en ligne réactifs sans PDF lourd, moteur de réservation directe sans commission et photos HD.',
        badge: 'RESTAURANTS, BISTRONOMIE & TRAITEURS',
      },
      hero: {
        title: 'Création de site internet pour restaurant & bistronomie',
        subtitle: 'Donnez envie à vos convives et remplissez votre salle sans verser de commission aux plateformes tierces : carte interactive lisible sur smartphone, moteur de réservation directe 100% gratuit et photos appétissantes.',
        ctaPrimary: 'Demander un devis restaurant',
        ctaSecondary: 'Appeler au 07 83 66 60 98',
        proofPill: 'Réservation 0% de commission • Menus réactifs sans PDF lourd • Délais 2 à 3 semaines',
      },
      challengesTitle: 'Pourquoi les restaurateurs choisissent le sur-mesure DevSupAi',
      challengesSubtitle: 'Fini les menus au format PDF illisibles sur mobile et les commissions de 2 € à 3 € par couvert versées aux plateformes.',
      challenges: [
        {
          title: 'Carte & menus interactifs pour smartphone',
          desc: 'Votre carte se lit instantanément sur smartphone en HTML propre, avec tarifs, allergènes et suggestions du moment sans devoir télécharger un PDF lourd.',
        },
        {
          title: 'Réservation directe sans aucune commission',
          desc: 'Vos convives réservent leur table en direct en 4 étapes simples. Vous économisez des centaines d\'euros par mois de frais de plateforme (TheFork, Zenchef).',
        },
        {
          title: 'Horaires, accès Google Maps & privatisation',
          desc: 'Informations clés immédiatement visibles : jours et horaires de service, localisation GPS, accès parking et formulaire de privatisation de salle.',
        },
        {
          title: 'Photographies culinaires en immersion',
          desc: 'Mise en scène soignée de vos assiettes, de l\'ambiance de votre salle et de l\'équipe pour séduire vos futurs clients dès les premières secondes.',
        },
      ],
      deliverablesTitle: 'Les fonctionnalités livrées pour votre établissement',
      deliverables: [
        'Site vitrine gastronomique sur-mesure adapté aux couleurs et à l\'esprit de votre table',
        'Menu digital réactif avec sections dynamiques (Entrées, Plats, Desserts, Carte des vins)',
        'Moteur de réservation de table en direct sans frais d\'intermédiaire',
        'Gestion autonome des horaires exceptionnels, fermetures annuelles et menus de fêtes',
        'Balisage SEO Local Restaurant (Google Maps, géolocalisation, avis clients)',
        'Code 100% propriétaire sans abonnement mensuel logiciel obligatoire',
      ],
      testimonial: {
        quote: "Le résultat dépasse largement mes attentes. Les demandes de contact et les réservations sont régulières et nos convives nous complimentent sur la clarté du site à chaque service. Un travail d'une qualité remarquable du premier pixel jusqu'à la mise en ligne.",
        name: "Claire Dubosc",
        role: "Gérante & Fondatrice, Table & Terroir",
        rating: 5,
        tag: "Avis Client Vérifié • Restauration",
      },
      recommendedPack: {
        name: "Pack Croissance Restauration",
        badge: "RECOMMANDÉ POUR RESTAURANTS & BISTROS",
        price: "Dès 1 850 €",
        description: "Carte interactive dynamique sans PDF, galerie photos et moteur de réservation directe 100% gratuit sans commission sur vos couverts.",
        link: "/#offres",
        linkLabel: "Découvrir le Pack Restauration",
      },
      caseStudy: {
        title: 'L\'Atelier Gourmand : Réservation directe sans commission',
        desc: 'Découvrez l\'étude de cas réelle d\'un restaurant bistronomique équipé d\'un moteur de réservation 4 étapes en 7 langues et d\'un tableau de bord sans commission.',
        link: '/projets/atelier-gourmand',
        linkLabel: 'Voir l\'étude de cas L\'Atelier Gourmand',
        tag: 'Étude de Cas Réelle',
      },
      faqTitle: 'Questions fréquentes des restaurateurs',
      faq: [
        {
          q: 'Combien coûte la création d\'un site de restaurant avec réservation ?',
          a: 'Nos forfaits démarrent à 1 850 € pour un site complet avec carte interactive, galerie photos et moteur de réservation directe sans commission sur vos couverts.',
        },
        {
          q: 'Comment modifier la carte ou le plat du jour facilement ?',
          a: 'Un panneau d\'administration simplifié vous permet de modifier vos prix, changer un plat ou annoncer un menu de fête en moins de deux minutes depuis votre smartphone.',
        },
        {
          q: 'Les réservations arrivent-elles directement par email ou SMS ?',
          a: 'Oui. Chaque demande validée vous envoie une notification instantanée et confirme la réservation au client avec un récapitulatif clair.',
        },
      ],
      contactCta: {
        title: 'Développez vos réservations directes sans commission',
        desc: 'Discutons de votre établissement et découvrez une démo interactive en direct.',
        btn: 'Demander un devis restaurant',
      },
    },
    commerceBoutique: {
      slug: 'sites-internet/commerce-boutique',
      meta: {
        title: 'Création de Site E-Commerce pour Commerce de Proximité & Boutique | DevSupAi',
        description: 'Site e-commerce sur-mesure pour commerçants de proximité, boutiques et producteurs locaux en Meuse et Grand Est. Vente en ligne et Click & Collect sans commission.',
        badge: 'COMMERCES DE PROXIMITÉ & BOUTIQUES',
      },
      hero: {
        title: 'Création de site e-commerce & vitrine pour commerce de proximité',
        subtitle: 'Vendez vos articles en direct et développez votre clientèle locale sans céder votre marge aux plateformes tierces : boutique sur-mesure ultra-rapide, Click & Collect sans frais, paiement sécurisé Stripe et SEO de proximité.',
        ctaPrimary: 'Demander un devis e-commerce',
        ctaSecondary: 'Appeler au 07 83 66 60 98',
        proofPill: '0% de commission sur vos ventes • Paiement sécurisé Stripe • Hébergement inclus An 1',
      },
      challengesTitle: 'Les piliers d\'une boutique locale en ligne rentable',
      challengesSubtitle: 'Offrez une expérience d\'achat digne des grands sites marchands avec la proximité et l\'authenticité de votre commerce.',
      challenges: [
        {
          title: 'Vente directe & Click & Collect sans commission',
          desc: 'Permettez à vos clients de commander en ligne et de retirer leurs articles en boutique ou de se faire livrer, sans prélever le moindre pourcentage sur votre chiffre d\'affaires.',
        },
        {
          title: 'Catalogue produits clair & navigation mobile instantanée',
          desc: 'Vos fiches produits se chargent en un clin d\'œil avec photos haute définition, gestion des tailles, coloris et état des stocks en temps réel.',
        },
        {
          title: 'Paiement sécurisé par carte & Apple Pay',
          desc: 'Intégration bancaire certifiée via Stripe pour des transactions fluides et chiffrées avec virement direct vers votre compte bancaire professionnel.',
        },
        {
          title: 'Référencement local puissant en Meuse & Grand Est',
          desc: 'Captez les acheteurs de votre bassin de vie recherchant vos produits en ligne avant de se déplacer en magasin.',
        },
      ],
      deliverablesTitle: 'Ce qui est inclus dans votre solution e-commerce',
      deliverables: [
        'Boutique en ligne 100% sur-mesure sans abonnement mensuel logiciel obligatoire',
        'Passerelle de paiement Stripe configurée avec virement bancaire direct',
        'Tunnel de commande optimisé en 3 étapes sans création de compte obligatoire',
        'Module Click & Collect et retrait en magasin avec créneaux paramétrables',
        'Interface d\'administration intuitive pour ajouter produits, photos et stocks',
        'Facturation automatique PDF conforme et alertes email instantanées',
      ],
      testimonial: {
        quote: "Rapide, réactif et incroyablement précis. Le site est aujourd'hui mon meilleur commercial, disponible 24h/24 avec des temps de chargement instantanés. Je recommande sans la moindre hésitation.",
        name: "Léa Fontaine",
        role: "Directrice, Maison Lucine",
        rating: 5,
        tag: "Avis Client Vérifié • Commerce & Boutique",
      },
      recommendedPack: {
        name: "Pack Boutique E-Commerce",
        badge: "RECOMMANDÉ POUR COMMERÇANTS & BOUTIQUES",
        price: "Dès 2 600 €",
        description: "Votre boutique en ligne complète avec paiement sécurisé Stripe, 0% de commission sur vos ventes, catalogue illimité et formation incluse.",
        link: "/#offres",
        linkLabel: "Découvrir le Pack E-Commerce",
      },
      caseStudy: {
        title: 'Maison Lucine : Vente directe et expérience marchande fluide',
        desc: 'Découvrez comment une boutique indépendante développe son chiffre d\'affaires grâce à une interface épurée, un catalogue réactif et zéro commission prélevée.',
        link: '/#offres',
        linkLabel: 'Découvrir la solution e-commerce',
        tag: 'Commerce & Vente en Ligne',
      },
      faqTitle: 'Questions fréquentes des commerçants et boutiques',
      faq: [
        {
          q: 'Combien coûte une boutique e-commerce pour commerce local chez DevSupAi ?',
          a: 'Notre Pack Boutique E-Commerce démarre à 2 600 € clés en main, incluant la conception sur-mesure, la passerelle de paiement sécurisée Stripe, le module Click & Collect et la formation complète sans aucun abonnement captif.',
        },
        {
          q: 'Y a-t-il une commission prélevée sur mes ventes ou un abonnement mensuel ?',
          a: 'Aucune commission n\'est prélevée par DevSupAi sur votre chiffre d\'affaires (0%). Seuls les frais bancaires standards de Stripe (environ 1,5% + 0,25 € par transaction) s\'appliquent directement, sans surcoût intermédiaire.',
        },
        {
          q: 'Est-il facile d\'ajouter de nouveaux produits et de gérer les stocks ?',
          a: 'Oui. Vous disposez d\'une interface d\'administration sécurisée et ultra-simple qui vous permet d\'ajouter un produit, modifier un prix ou ajuster vos stocks en quelques secondes depuis votre smartphone ou votre ordinateur.',
        },
      ],
      contactCta: {
        title: 'Prêt à développer vos ventes en direct sans commission ?',
        desc: 'Échangeons sur votre catalogue de produits et recevez une proposition chiffrée détaillée sous 24 heures ouvrées.',
        btn: 'Demander mon devis e-commerce',
      },
    },
  },
  en: {
    artisan: {
      slug: 'en/websites/artisan-construction',
      meta: {
        title: 'Website Development for Construction Craftsmen & Contractors | DevSupAi',
        description: 'Bespoke showcase websites for construction craftsmen, carpenters, electricians, and painters in Grand Est and France. High-definition portfolio, custom quote forms, and local SEO.',
        badge: 'CRAFTSMEN & CONTRACTORS',
      },
      hero: {
        title: 'Custom website development for contractors & craftsmen',
        subtitle: 'Showcase your craftsmanship with a lightning-fast website free of subscription fees: before/after project galleries, targeted local SEO, and streamlined quote inquiries.',
        ctaPrimary: 'Request a free quote',
        ctaSecondary: 'Call +33 7 83 66 60 98',
        proofPill: '100% Proprietary Code • €0 Recurring Software Fees • Hosting & Domain Included Yr 1',
      },
      challengesTitle: 'Key elements for high-converting contractor websites',
      challengesSubtitle: 'Reassure local clients instantly while turning inquiries into booked jobs.',
      challenges: [
        {
          title: 'High-definition job portfolio gallery',
          desc: 'Showcase your projects with category filters (renovation, plumbing, carpentry, masonry) and high-impact before/after comparisons.',
        },
        {
          title: 'Structured quote inquiry forms',
          desc: 'Allow prospective clients to specify project scope, dimensions, and location with instant email notifications sent to your phone.',
        },
        {
          title: 'Insurance warranty & credential badges',
          desc: 'Prominent display of liability guarantees, certifications, and quality labels.',
        },
        {
          title: 'Authoritative local SEO rankings',
          desc: 'Rank on high-intent local search queries across your geographic service territory.',
        },
      ],
      deliverablesTitle: 'What is included in your custom contractor showcase',
      deliverables: [
        'Exclusive visual design aligned with your branding and real projects',
        'Ultra-fluid mobile-first layout tested on all device screens',
        'Interactive portfolio gallery with lossless WebP compression',
        'Custom quote inquiry form with honeypot anti-spam protection',
        'Google Business Profile integration and verified customer reviews',
        'Complete ownership of all source code with zero ongoing software fees',
      ],
      testimonial: {
        quote: "Transitioning from a slow WordPress template to a custom website engineered by DevSupAi changed everything. Our project schedule is booked months in advance thanks to qualified quote requests coming in steadily. An investment that paid for itself very quickly.",
        name: "Thomas Mercier",
        role: "Founder, Mercier Renovation & Wood",
        rating: 5,
        tag: "Verified Client Review • France",
      },
      recommendedPack: {
        name: "Growth SME Pack",
        badge: "RECOMMENDED FOR CONTRACTORS",
        price: "From €1,850",
        description: "Complete multi-page website featuring a high-definition project gallery, structured quote inquiry form, and local SEO targeted across your territory.",
        link: "/en#offres",
        linkLabel: "View Growth Pack",
      },
      caseStudy: {
        title: 'LocaTool: Custom Tool & Equipment Management SaaS',
        desc: 'Explore how DevSupAi engineered a custom web software to manage rental fleets, contracts, and PDF invoices with one click.',
        link: '/en/projects/locatool',
        linkLabel: 'Explore LocaTool case study',
        tag: 'Custom Business Software',
      },
      faqTitle: 'Frequently asked questions from contractors',
      faq: [
        {
          q: 'How much does a contractor website cost with DevSupAi?',
          a: 'Packages start from €950 for the Presence Pack (one-page showcase) and €1,850 for the Growth Pack (3-5 pages with categorized portfolio). All quotes are transparent and itemized.',
        },
        {
          q: 'Can I add new project photos myself?',
          a: 'Yes. A personalized video walkthrough teaches you how to upload new photos and text easily from your smartphone or computer.',
        },
        {
          q: 'What are typical delivery timelines?',
          a: 'Typically 1 to 2 weeks for a one-page site and 2 to 3 weeks for a multi-page portfolio site.',
        },
      ],
      contactCta: {
        title: 'Ready to showcase your projects and generate qualified inquiries?',
        desc: 'Schedule a free consultation and receive a transparent quote within 24 business hours.',
        btn: 'Request your contractor quote',
      },
    },
    professionLiberale: {
      slug: 'en/websites/professional-services',
      meta: {
        title: 'Website Development for Legal, Medical & Professional Services | DevSupAi',
        description: 'Bespoke websites for legal, medical, and professional consulting practices. Elegant design, secure inquiries, GDPR compliance, and professional distinction.',
        badge: 'PROFESSIONAL SERVICES & HEALTHCARE',
      },
      hero: {
        title: 'Custom website development for professional practices',
        subtitle: 'A refined, authoritative online presence that inspires patient and client confidence: clear practice areas, transparent fees, secure inquiry forms, and full compliance.',
        ctaPrimary: 'Request a discovery review',
        ctaSecondary: 'Call +33 7 83 66 60 98',
        proofPill: 'Elegant UI • Strict GDPR Compliance • Zero Captive Software Subscriptions',
      },
      challengesTitle: 'Key standards for professional practice websites',
      challengesSubtitle: 'Your digital presence must project rigor, reassure clients, and streamline appointment requests.',
      challenges: [
        {
          title: 'Credibility & clear practice areas',
          desc: 'Carefully structured editorial content detailing qualifications, certifications, and specialized practice domains.',
        },
        {
          title: 'GDPR compliance & confidentiality',
          desc: 'Secure forms with zero intrusive tracker cookies and strict adherence to professional confidentiality requirements.',
        },
        {
          title: 'Appointment scheduling integration',
          desc: 'Seamless connections with your scheduling platforms (Calendly, Doctolib, Google Calendar) without bogging down page speed.',
        },
        {
          title: 'Universal accessibility standards (WCAG AA)',
          desc: 'Strict color contrast, readable typography, and screen-reader compatibility for all visitors.',
        },
      ],
      deliverablesTitle: 'What is included for your professional practice',
      deliverables: [
        'Minimalist, authoritative UI design crafted to inspire trust and peace of mind',
        'Dedicated sections for each specialized practice area or medical discipline',
        'Transparent fee presentation, billing terms, and accepted payment methods',
        'Encrypted contact forms meeting privacy and confidentiality expectations',
        'Interactive location map, public transport directions, and accessibility details',
        'High-security edge cloud hosting with enterprise SSL certification',
      ],
      testimonial: {
        quote: "DevSupAi designed a clean, reassuring, and ultra-fast website for our patients. Mobile navigation is flawless, information is crystal clear, and patient feedback has been fantastic. Rare professionalism and exemplary support.",
        name: "Dr. Sophie Laurent",
        role: "Dental Surgeon, Dental Clinic",
        rating: 5,
        tag: "Verified Client Review • Healthcare",
      },
      recommendedPack: {
        name: "Presence or Growth Pack",
        badge: "RECOMMENDED FOR PRACTICES",
        price: "From €950",
        description: "A refined, compliant, and secure showcase presenting your expertise, fee schedule, and seamless integration with your scheduling platform.",
        link: "/en#offres",
        linkLabel: "View Packages",
      },
      caseStudy: {
        title: 'L\'Atelier Gourmand: Clear UX & frictionless interaction',
        desc: 'See how our UX engineering principles deliver clarity, readability, and effortless user journeys.',
        link: '/en/projects/atelier-gourmand',
        linkLabel: 'View case study',
        tag: 'UX Clarity & Engineering',
      },
      faqTitle: 'Frequently asked questions from professional practices',
      faq: [
        {
          q: 'Does the website respect professional ethics and regulations?',
          a: 'Yes, absolutely. We ensure all copywriting, layout, and visual presentation strictly adhere to the guidelines of professional associations and regulatory bodies.',
        },
        {
          q: 'Can I link directly to my online booking calendar?',
          a: 'Yes, direct booking integration (Doctolib, Calendly, or custom booking links) is prominently and elegantly integrated across key pages.',
        },
        {
          q: 'Are client submissions securely protected?',
          a: 'Yes. All data is transmitted over HTTPS/TLS encryption and delivered directly to your secure professional inbox without insecure intermediate database storage.',
        },
      ],
      contactCta: {
        title: 'Enhance the digital presence of your professional practice',
        desc: 'Connect with DevSupAi for a confidential consultation and customized quote.',
        btn: 'Schedule a confidential review',
      },
    },
    restaurant: {
      slug: 'en/websites/restaurant',
      meta: {
        title: 'Custom Website Development for Restaurants & Bistros | DevSupAi',
        description: 'Bespoke websites for restaurants, bistros, and catering businesses. Responsive digital menus without heavy PDFs, direct commission-free booking engine, and HD food photography.',
        badge: 'RESTAURANTS, BISTROS & CATERING',
      },
      hero: {
        title: 'Custom website development for restaurants & bistros',
        subtitle: 'Entice diners and fill tables without giving up margins to third-party platforms: mobile-optimized interactive menus, 100% direct booking with 0% commission, and mouthwatering food visuals.',
        ctaPrimary: 'Request a restaurant quote',
        ctaSecondary: 'Call +33 7 83 66 60 98',
        proofPill: '0% Booking Commission • No Heavy PDF Menus • Turnaround 2 to 3 Weeks',
      },
      challengesTitle: 'Why restaurateurs choose bespoke engineering',
      challengesSubtitle: 'Eliminate clunky PDF menus and save hundreds in third-party booking commissions every month.',
      challenges: [
        {
          title: 'Mobile-friendly interactive menus',
          desc: 'Your menu loads instantly in clean HTML on smartphones, with clear pricing, allergens, and seasonal specials without downloading heavy PDFs.',
        },
        {
          title: 'Direct commission-free reservations',
          desc: 'Guests book tables directly in 4 simple steps. Keep 100% of your margins without paying €2-€3 per cover to third-party marketplaces.',
        },
        {
          title: 'Opening hours, maps, and private hire',
          desc: 'Essential details at a glance: service hours, GPS directions, parking info, and private event inquiry forms.',
        },
        {
          title: 'Immersive culinary photography',
          desc: 'Showcase your signature dishes, interior ambiance, and team to inspire guests from the moment they land on your site.',
        },
      ],
      deliverablesTitle: 'Delivered features for your restaurant',
      deliverables: [
        'Bespoke culinary showcase website reflecting your establishment\'s atmosphere',
        'Responsive digital menu with dynamic categories (Starters, Mains, Desserts, Wines)',
        'Direct table reservation engine with zero commission fees',
        'Self-managed holiday hours, special seasonal menus, and event announcements',
        'Local SEO optimization for Google Maps, culinary keywords, and reviews',
        '100% proprietary code with zero ongoing software lock-in',
      ],
      testimonial: {
        quote: "The result exceeded my expectations by far. Inquiries and reservations arrive steadily, and our guests praise the clarity and speed of the website every day. Exceptional craftsmanship from the first pixel to final deployment.",
        name: "Claire Dubosc",
        role: "Owner & Founder, Table & Terroir",
        rating: 5,
        tag: "Verified Client Review • Dining & Bistro",
      },
      recommendedPack: {
        name: "Restaurant Growth Pack",
        badge: "RECOMMENDED FOR RESTAURANTS",
        price: "From €1,850",
        description: "Interactive dynamic digital menu without heavy PDFs, culinary photography gallery, and direct table reservation engine with 0% commission.",
        link: "/en#offres",
        linkLabel: "View Restaurant Pack",
      },
      caseStudy: {
        title: 'L\'Atelier Gourmand: Real-World Commission-Free Booking',
        desc: 'Explore the complete case study of a bistro equipped with a 4-step direct booking engine in 7 languages and an owner dashboard.',
        link: '/en/projects/atelier-gourmand',
        linkLabel: 'View L\'Atelier Gourmand case study',
        tag: 'Real-World Case Study',
      },
      faqTitle: 'Frequently asked questions from restaurateurs',
      faq: [
        {
          q: 'How much does a restaurant website with booking cost?',
          a: 'Packages start from €1,850 for a complete platform with interactive menu, photo gallery, and direct commission-free reservation engine.',
        },
        {
          q: 'How easy is it to update daily specials and menu items?',
          a: 'A streamlined administration interface lets you update prices, modify dishes, or announce holiday menus in under two minutes from your phone.',
        },
        {
          q: 'Do reservations arrive via email or SMS?',
          a: 'Yes. Every booking sends an instant notification to your team and generates a clear confirmation email for your guest.',
        },
      ],
      contactCta: {
        title: 'Grow direct restaurant bookings without third-party commissions',
        desc: 'Let us discuss your establishment and explore a live interactive demo.',
        btn: 'Request your restaurant quote',
      },
    },
    commerceBoutique: {
      slug: 'en/websites/retail-shop',
      meta: {
        title: 'Bespoke E-Commerce Website for Local Retailers & Shops | DevSupAi',
        description: 'Custom e-commerce websites for independent retailers, local shops, and regional producers in Grand Est and France. Zero sales commissions, Stripe checkout & Click & Collect.',
        badge: 'LOCAL RETAILERS & BOUTIQUES',
      },
      hero: {
        title: 'Custom e-commerce & showcase websites for local retailers',
        subtitle: 'Sell your products directly and grow your local customer base without losing margins to third-party marketplaces: bespoke online store, zero-commission Click & Collect, secure Stripe checkout, and high-impact local SEO.',
        ctaPrimary: 'Request an e-commerce quote',
        ctaSecondary: 'Call +33 7 83 66 60 98',
        proofPill: '0% Commission on Sales • Stripe & Apple Pay • Domain & Hosting Included Yr 1',
      },
      challengesTitle: 'Key pillars of a profitable local e-commerce store',
      challengesSubtitle: 'Offer an effortless shopping experience matching big retailers, combined with the warmth of local retail.',
      challenges: [
        {
          title: 'Direct sales & zero-commission Click & Collect',
          desc: 'Allow your shoppers to buy online and pick up in store or receive local delivery, without giving up any percentage of your gross sales.',
        },
        {
          title: 'Instant mobile shopping & clear catalog',
          desc: 'Product pages load in the blink of an eye with crisp photography, sizes, color variants, and real-time inventory management.',
        },
        {
          title: 'Bank-grade secure checkout with Stripe & Apple Pay',
          desc: 'Frictionless, encrypted card payments with immediate bank payouts directly to your business account.',
        },
        {
          title: 'High-intent local SEO rankings',
          desc: 'Capture nearby shoppers searching for products online before visiting physical stores in your region.',
        },
      ],
      deliverablesTitle: 'What is included in your custom e-commerce solution',
      deliverables: [
        '100% bespoke online boutique with zero mandatory monthly software subscriptions',
        'Stripe payment gateway configured with direct automated bank deposits',
        'Frictionless 3-step checkout without forced customer account creation',
        'Store pickup / Click & Collect scheduling module',
        'Intuitive administration portal to manage items, images, and inventory',
        'Automated compliant PDF invoicing and instant email order notifications',
      ],
      testimonial: {
        quote: "Fast, responsive, and incredibly precise. Today our website acts as our best salesperson, working 24/7 with instant load times. I recommend DevSupAi without hesitation.",
        name: "Léa Fontaine",
        role: "Director, Maison Lucine",
        rating: 5,
        tag: "Verified Client Review • Retail & Fashion",
      },
      recommendedPack: {
        name: "Boutique E-Commerce Pack",
        badge: "RECOMMENDED FOR RETAILERS & PRODUCERS",
        price: "From €2,600",
        description: "Your complete custom online store with bank-grade Stripe payment, 0% commission on your sales, unlimited products, and comprehensive training.",
        link: "/en#offres",
        linkLabel: "View E-Commerce Pack",
      },
      caseStudy: {
        title: 'Maison Lucine: Direct Sales & Effortless Checkout',
        desc: 'Discover how an independent retail store boosts revenue through an ultra-fast product catalog and zero commission taken on transactions.',
        link: '/en#offres',
        linkLabel: 'Explore e-commerce solution',
        tag: 'Retail & E-Commerce',
      },
      faqTitle: 'Frequently asked questions from local retailers',
      faq: [
        {
          q: 'How much does a bespoke e-commerce store cost with DevSupAi?',
          a: 'Our Boutique E-Commerce Pack starts at €2,600 turnkey, including bespoke development, secure Stripe gateway, Click & Collect pickup module, and training with zero vendor lock-in.',
        },
        {
          q: 'Are there any sales commissions or monthly subscription fees?',
          a: 'DevSupAi charges 0% commission on your sales. Only standard Stripe merchant processing fees (approx 1.5% + €0.25 per transaction) apply directly, with zero platform markup.',
        },
        {
          q: 'How easily can I add products and manage inventory?',
          a: 'Very easily. You receive a dedicated, secure dashboard enabling you to create products, update prices, or adjust stock levels in seconds from any smartphone or computer.',
        },
      ],
      contactCta: {
        title: 'Ready to grow direct online sales with zero platform fees?',
        desc: 'Let us discuss your product catalog and business goals. Free itemized proposal within 24 business hours.',
        btn: 'Request e-commerce quote',
      },
    },
  },
};
