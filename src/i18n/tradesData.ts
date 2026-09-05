export interface TradeFaqItem {
  q: string;
  a: string;
}

export interface TradeFeature {
  title: string;
  desc: string;
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
  },
};
