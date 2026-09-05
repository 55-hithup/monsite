import { 
  Globe, 
  ShoppingCart, 
  Smartphone, 
  Wrench, 
  Layers, 
  Store, 
  Building2, 
  Utensils, 
  Briefcase, 
  UserCheck, 
  Calendar, 
  BookOpen, 
  Lock, 
  Layout, 
  Database, 
  Code2, 
  Cpu, 
  Sparkles,
  Server,
  Zap,
  RefreshCw,
  Bug,
  ShieldCheck,
} from 'lucide-react';

export interface RawServiceItem {
  id: string;
  category: 'vitrines' | 'ecommerce' | 'apps' | 'maintenance';
  profiles: string[];
  icon: any;
  pillarPath?: {
    fr: string;
    en: string;
    labelFr: string;
    labelEn: string;
  };
  fr: {
    title: string;
    description: string;
    tags: string[];
  };
  en: {
    title: string;
    description: string;
    tags: string[];
  };
}

export const servicesCatalog: RawServiceItem[] = [
  // 1. Vitrines & Présentation
  {
    id: 'site-vitrine',
    category: 'vitrines',
    profiles: ['artisans', 'commerces', 'professions-liberales', 'pme'],
    icon: Globe,
    fr: {
      title: 'Création de sites vitrines',
      description: 'Conception de sites internet sur-mesure modernes, fluides et optimisés pour séduire vos visiteurs et générer des contacts qualifiés.',
      tags: ['SEO Local', 'Design Responsive', 'React & Tailwind', 'Haute Vitesse'],
    },
    en: {
      title: 'Showcase Website Development',
      description: 'Modern, ultra-fast custom showcase websites engineered to attract qualified leads and showcase your brand.',
      tags: ['Local SEO', 'Responsive Design', 'React & Tailwind', 'High Speed'],
    },
  },
  {
    id: 'site-institutionnel',
    category: 'vitrines',
    profiles: ['pme', 'associations'],
    icon: Building2,
    fr: {
      title: 'Création de sites institutionnels',
      description: 'Développement de plateformes officielles sécurisées et élégantes pour organismes publics, écoles et grandes organisations.',
      tags: ['Sécurité Maximale', 'Accessibilité WCAG', 'SSG Rapide', 'Architecture Évolutive'],
    },
    en: {
      title: 'Institutional & Corporate Websites',
      description: 'Secure, accessible, and authoritative web portals designed for public institutions, schools, and organizations.',
      tags: ['Maximum Security', 'WCAG Accessibility', 'Fast SSG', 'Scalable Architecture'],
    },
  },
  {
    id: 'site-professionnel',
    category: 'vitrines',
    profiles: ['pme', 'professions-liberales'],
    icon: Briefcase,
    fr: {
      title: 'Création de sites professionnels',
      description: 'Présentation claire de vos services avec intégration de formulaires de devis dynamiques et modules d\'interaction client.',
      tags: ['Tunnel de Contact', 'Formulaires Filtrés', 'Ergonomie Pro', 'Vitesse Éclair'],
    },
    en: {
      title: 'Professional B2B Business Websites',
      description: 'Structured presentation of professional services with dynamic quote request funnels and client interaction tools.',
      tags: ['Inquiry Funnel', 'Dynamic Forms', 'Pro Ergonomics', 'Lightning Speed'],
    },
  },
  {
    id: 'site-association',
    category: 'vitrines',
    profiles: ['associations'],
    icon: UserCheck,
    fr: {
      title: 'Création de sites pour associations',
      description: 'Mise en valeur de vos actions, gestion des adhésions, appels aux dons et actualités de votre structure associative.',
      tags: ['Formulaires d\'Adhésion', 'Appels aux Dons', 'Actualités & Blog', 'Événements'],
    },
    en: {
      title: 'Non-Profit & Community Websites',
      description: 'Showcase your mission, handle online memberships, organize donation drives, and publish community news effortlessly.',
      tags: ['Membership Forms', 'Donation Drives', 'News & Blog', 'Event Calendars'],
    },
  },
  {
    id: 'site-restaurant',
    category: 'vitrines',
    profiles: ['restaurants', 'commerces'],
    icon: Utensils,
    pillarPath: {
      fr: '/sites-internet/restaurant',
      en: '/en/websites/restaurant',
      labelFr: 'Découvrir la solution restaurant',
      labelEn: 'Explore restaurant solution',
    },
    fr: {
      title: 'Création de sites pour restaurants',
      description: 'Menu en ligne interactif, galerie photos soignée, intégration de la réservation de tables et géolocalisation.',
      tags: ['Menu QR Code', 'Réservation Directe', 'Click & Collect', 'SEO Géolocalisé'],
    },
    en: {
      title: 'Restaurant & Hospitality Websites',
      description: 'Interactive digital menus, high-resolution photo galleries, direct table booking systems, and local Google Maps SEO.',
      tags: ['QR Code Menu', 'Direct Booking', 'Click & Collect', 'Local Maps SEO'],
    },
  },
  {
    id: 'site-artisan',
    category: 'vitrines',
    profiles: ['artisans'],
    icon: Store,
    pillarPath: {
      fr: '/sites-internet/artisan-renovation',
      en: '/en/websites/artisan-construction',
      labelFr: 'Découvrir la solution artisan',
      labelEn: 'Explore contractor solution',
    },
    fr: {
      title: 'Création de sites pour artisans',
      description: 'Vitrine digitale sur-mesure pour maçons, électriciens, plombiers, menuisiers. Mise en avant de vos réalisations et demande de devis express.',
      tags: ['Visibilité Locale', 'Demande de Devis Express', 'Galerie Chantiers'],
    },
    en: {
      title: 'Trades & Contractors Websites',
      description: 'Custom digital showcases for builders, electricians, plumbers, and carpenters with project portfolios and rapid quote forms.',
      tags: ['Local Visibility', 'Rapid Quote Form', 'Work Gallery'],
    },
  },
  {
    id: 'site-commerce',
    category: 'vitrines',
    profiles: ['commerces'],
    icon: Store,
    pillarPath: {
      fr: '/sites-internet/commerce-boutique',
      en: '/en/websites/retail-shop',
      labelFr: 'Découvrir la solution commerce',
      labelEn: 'Explore retail solution',
    },
    fr: {
      title: 'Création de sites pour commerces',
      description: 'Renforcez votre visibilité locale, présentez vos produits en magasin et attirez de nouveaux clients en boutique.',
      tags: ['Google Business', 'Drive to Store', 'Présentation Produits', 'Contact Rapide'],
    },
    en: {
      title: 'Retail & Local Shop Websites',
      description: 'Drive in-store foot traffic, showcase physical inventories, and boost your local business presence on Google.',
      tags: ['Google Business', 'Drive to Store', 'Product Catalog', 'Fast Contact'],
    },
  },
  {
    id: 'site-profession-liberale',
    category: 'vitrines',
    profiles: ['professions-liberales'],
    icon: Briefcase,
    pillarPath: {
      fr: '/sites-internet/profession-liberale',
      en: '/en/websites/professional-services',
      labelFr: 'Découvrir la solution libérale',
      labelEn: 'Explore practice solution',
    },
    fr: {
      title: 'Création de sites pour professions libérales',
      description: 'Sites épurés et sécurisés pour avocats, médecins, comptables, consultants. Prise de rendez-vous en ligne intégrée.',
      tags: ['Confidentialité', 'Prise de RDV en Ligne', 'Design Épuré', 'Conformité RGPD'],
    },
    en: {
      title: 'Legal, Medical & Consulting Websites',
      description: 'Sleek, reassuring websites for lawyers, doctors, accountants, and consultants with appointment scheduling.',
      tags: ['Confidentiality', 'Online Booking', 'Clean UI', 'GDPR Compliant'],
    },
  },
  {
    id: 'site-evenementiel',
    category: 'vitrines',
    profiles: ['associations', 'pme'],
    icon: Calendar,
    fr: {
      title: 'Création de sites événementiels',
      description: 'Sites éphémères ou récurrents pour salons, conférences, mariages, festivals avec billetterie et programme interactif.',
      tags: ['Compte à Rebours', 'Billetterie en Ligne', 'Programme Interactif', 'Inscriptions'],
    },
    en: {
      title: 'Event & Conference Websites',
      description: 'Dedicated event websites for conferences, festivals, and exhibitions with interactive schedules and ticketing.',
      tags: ['Countdown Timer', 'Online Ticketing', 'Interactive Program', 'Registrations'],
    },
  },
  {
    id: 'landing-page',
    category: 'vitrines',
    profiles: ['pme', 'commerces', 'artisans'],
    icon: Zap,
    fr: {
      title: 'Création de landing pages à forte conversion',
      description: 'Pages de destination ciblées conçues sur-mesure pour vos campagnes publicitaires (Google Ads, réseaux sociaux) maximisant le ROI.',
      tags: ['Structure de Conversion', 'Chargement Immédiat', 'Call to Action Percutant'],
    },
    en: {
      title: 'High-Converting Landing Pages',
      description: 'Targeted conversion-focused landing pages engineered for Google Ads and Meta Ads campaigns to maximize ROI.',
      tags: ['Conversion Funnel', 'Instant Loading', 'Compelling CTA'],
    },
  },
  {
    id: 'page-presentation-entreprise',
    category: 'vitrines',
    profiles: ['pme', 'professions-liberales'],
    icon: Layout,
    fr: {
      title: 'Pages de présentation d\'entreprise',
      description: 'Mise en scène de l\'histoire, des valeurs, de l\'équipe et des certifications de votre entreprise pour asseoir votre crédibilité.',
      tags: ['Image de Marque', 'Présentation Équipe', 'Chiffres & Certifications'],
    },
    en: {
      title: 'Company Profile & Storytelling Pages',
      description: 'Present your company history, values, executive team, and certifications to establish trust with partners and clients.',
      tags: ['Brand Identity', 'Team Showcase', 'Certifications & Trust'],
    },
  },
  {
    id: 'portfolio-professionnel',
    category: 'vitrines',
    profiles: ['professions-liberales', 'artisans'],
    icon: Sparkles,
    fr: {
      title: 'Création de portfolios professionnels',
      description: 'Galeries interactives haute résolution pour photographes, architectes, designers, créateurs et agences.',
      tags: ['Galerie Haute Résolution', 'Animations Fluides', 'Expérience Visuelle'],
    },
    en: {
      title: 'Creative & Professional Portfolios',
      description: 'High-resolution interactive galleries and case-study presentations for photographers, architects, designers, and agencies.',
      tags: ['High-Res Gallery', 'Fluid Animations', 'Visual Experience'],
    },
  },
  {
    id: 'creation-blog',
    category: 'vitrines',
    profiles: ['pme', 'associations', 'professions-liberales'],
    icon: BookOpen,
    fr: {
      title: 'Création de blogs & espaces d\'actualités',
      description: 'Plateforme éditoriale optimisée pour la rédaction d\'articles, le partage social et le positionnement SEO de longue traîne.',
      tags: ['Architecture SEO', 'Maillage Interne', 'Catégories & Tags', 'Partage Social'],
    },
    en: {
      title: 'Content Blogs & News Platforms',
      description: 'Fast editorial platforms structured for article authoring, social sharing, and long-tail SEO authority.',
      tags: ['SEO Architecture', 'Internal Linking', 'Categories & Tags', 'Social Sharing'],
    },
  },
  {
    id: 'espace-administrateur',
    category: 'vitrines',
    profiles: ['pme', 'associations', 'commerces'],
    icon: Lock,
    fr: {
      title: 'Sites avec espace administrateur sur-mesure',
      description: 'Back-office personnalisé intuitif pour gérer en toute autonomie vos contenus, témoignages, textes et médias sans toucher au code.',
      tags: ['Panneau d\'Administration', 'Autonomie Totale', 'Gestion des Médias'],
    },
    en: {
      title: 'Custom Admin Dashboards (CMS)',
      description: 'Intuitive custom-built management portals to independently update text, media, reviews, and products without coding.',
      tags: ['Admin Panel', 'Complete Autonomy', 'Media Management'],
    },
  },
  {
    id: 'espace-client',
    category: 'vitrines',
    profiles: ['pme', 'professions-liberales'],
    icon: UserCheck,
    fr: {
      title: 'Sites avec espace client sécurisé',
      description: 'Portail privé permettant à vos clients de consulter leurs documents, factures, projets en cours et messages en toute confidentialité.',
      tags: ['Authentification Sécurisée', 'Téléchargement PDF', 'Portail Dédié'],
    },
    en: {
      title: 'Secure Client & Member Portals',
      description: 'Private encrypted client areas to view documents, invoices, ongoing project deliverables, and confidential messages.',
      tags: ['Secure Auth', 'PDF Downloads', 'Dedicated Portal'],
    },
  },
  {
    id: 'site-sur-mesure',
    category: 'vitrines',
    profiles: ['pme', 'artisans', 'commerces', 'associations', 'professions-liberales'],
    icon: Code2,
    fr: {
      title: 'Développement de sites internet 100% sur-mesure',
      description: 'Conception intégrale sans template ni contrainte technique, adaptée exactement à votre cahier des charges et à vos objectifs métiers.',
      tags: ['Code 100% Propriétaire', 'Zéro Template', 'Performance Maximale'],
    },
    en: {
      title: '100% Tailor-Made Custom Websites',
      description: 'Full custom-engineered web development without pre-made templates, built precisely around your technical and business goals.',
      tags: ['100% Proprietary Code', 'Zero Templates', 'Peak Performance'],
    },
  },

  // 2. E-Commerce & SaaS
  {
    id: 'site-ecommerce',
    category: 'ecommerce',
    profiles: ['commerces', 'artisans', 'pme'],
    icon: ShoppingCart,
    fr: {
      title: 'Développement de sites e-commerce',
      description: 'Boutiques en ligne performantes et sécurisées avec gestion de catalogue, moyens de paiement multiples et suivi des ventes.',
      tags: ['Paiement Stripe & CB', 'Gestion de Stocks', 'Click & Collect', 'Panier Fluide'],
    },
    en: {
      title: 'Custom E-Commerce Store Development',
      description: 'High-performance, secure online stores with product catalog management, multiple payment gateways, and order tracking.',
      tags: ['Stripe & Card Payments', 'Inventory Management', 'Click & Collect', 'Frictionless Cart'],
    },
  },
  {
    id: 'catalogue-produits',
    category: 'ecommerce',
    profiles: ['commerces', 'artisans', 'pme'],
    icon: Layers,
    fr: {
      title: 'Catalogues de produits en ligne',
      description: 'Présentation détaillée de vos gammes de produits sans vente directe, idéale pour la demande de devis B2B.',
      tags: ['Filtres Multicritères', 'Fiches PDF', 'Demande de Devis B2B'],
    },
    en: {
      title: 'Online Interactive Product Catalogs',
      description: 'Detailed showcase of product ranges with multi-criteria filtering, downloadable specs, and B2B quote inquiries.',
      tags: ['Faceted Search', 'PDF Specs', 'B2B Quote Requests'],
    },
  },
  {
    id: 'systeme-panier',
    category: 'ecommerce',
    profiles: ['commerces', 'pme'],
    icon: ShoppingCart,
    fr: {
      title: 'Systèmes de panier & paiement en ligne',
      description: 'Module de panier d\'achat fluide avec calcul automatique des frais de port et tunnels d\'achat optimisés pour éviter les abandons.',
      tags: ['Tunnel d\'Achat Sans Friction', 'Codes Promo', 'Paiement Sécurisé SSL'],
    },
    en: {
      title: 'Shopping Cart & Checkout Systems',
      description: 'Optimized shopping cart workflows with automated shipping calculations, coupon codes, and anti-abandonment checkout.',
      tags: ['Frictionless Checkout', 'Discount Codes', 'SSL Secure Payments'],
    },
  },
  {
    id: 'commande-en-ligne',
    category: 'ecommerce',
    profiles: ['restaurants', 'commerces', 'artisans'],
    icon: ShoppingCart,
    fr: {
      title: 'Systèmes de commande en ligne',
      description: 'Solution sur-mesure pour la prise de commande rapide pour grossistes, traiteurs, restaurants et commerces.',
      tags: ['Commandes Express', 'Facturation Automatisée', 'Alertes Temps Réel'],
    },
    en: {
      title: 'Online Ordering & Wholesale Systems',
      description: 'Streamlined online order systems for wholesalers, caterers, restaurants, and retail distributors.',
      tags: ['Express Orders', 'Automated Invoices', 'Real-Time Alerts'],
    },
  },
  {
    id: 'reservation-en-ligne',
    category: 'ecommerce',
    profiles: ['restaurants', 'professions-liberales', 'artisans'],
    icon: Calendar,
    fr: {
      title: 'Systèmes de réservation en ligne',
      description: 'Modules de réservation de créneaux, chambres, équipements ou prestations avec synchronisation d\'agenda.',
      tags: ['Synchronisation Agenda', 'Rappels Automatiques', 'Acompte en Ligne'],
    },
    en: {
      title: 'Online Booking & Scheduling Systems',
      description: 'Direct booking engines for appointments, time slots, rentals, or rooms with bi-directional calendar synchronization.',
      tags: ['Calendar Sync', 'Automated Reminders', 'Online Deposits'],
    },
  },
  {
    id: 'developpement-espace-client',
    category: 'ecommerce',
    profiles: ['pme', 'professions-liberales'],
    icon: UserCheck,
    fr: {
      title: 'Développement d\'espaces clients sur-mesure',
      description: 'Dashboards dynamiques permettant à vos utilisateurs de suivre leurs commandes, abonnements et statistiques en direct.',
      tags: ['Tableau de Bord React', 'API Sécurisée', 'Suivi Commandes'],
    },
    en: {
      title: 'Interactive User & Account Portals',
      description: 'Dynamic user dashboards allowing clients to manage subscriptions, orders, support tickets, and invoices live.',
      tags: ['React Dashboard', 'Secure REST API', 'Order Tracking'],
    },
  },
  {
    id: 'tableau-de-bord-web',
    category: 'ecommerce',
    profiles: ['pme'],
    icon: Layout,
    fr: {
      title: 'Tableaux de bord & Dashboards analytiques',
      description: 'Visualisation en temps réel de vos données d\'entreprise, indicateurs clés de performance et suivi d\'activité.',
      tags: ['Analytics Métier', 'Graphiques Interactifs', 'Données Temps Réel'],
    },
    en: {
      title: 'Analytics & KPI Dashboards',
      description: 'Real-time corporate data visualization, interactive business charts, and operational key metric tracking.',
      tags: ['Business Analytics', 'Interactive Charts', 'Real-Time Data'],
    },
  },
  {
    id: 'back-offices',
    category: 'ecommerce',
    profiles: ['pme', 'commerces'],
    icon: Lock,
    fr: {
      title: 'Développement de back-offices d\'administration',
      description: 'Outils d\'administration internes conçus spécifiquement pour piloter vos opérations métiers quotidiennes sans friction.',
      tags: ['Gestion Métier CRUD', 'Rôles & Permissions', 'Journalisation'],
    },
    en: {
      title: 'Operational Back-Office Systems',
      description: 'Tailored administrative interfaces built to manage daily business workflows, role permissions, and audit logs.',
      tags: ['CRUD Workflows', 'Roles & Permissions', 'Audit Logging'],
    },
  },
  {
    id: 'plateformes-personnalisees',
    category: 'ecommerce',
    profiles: ['pme', 'professions-liberales'],
    icon: Database,
    fr: {
      title: 'Plateformes web personnalisées',
      description: 'Développement d\'applications web complexes sur-mesure répondant à des processus métiers uniques et exigeants.',
      tags: ['Architecture Full-Stack', 'Haute Scalabilité', 'Sur-Mesure Métier'],
    },
    en: {
      title: 'Custom Web Platforms & Portals',
      description: 'Complex full-stack web platforms engineered around proprietary workflows, multi-step validations, and data pipelines.',
      tags: ['Full-Stack Arch', 'High Scalability', 'Custom Workflows'],
    },
  },
  {
    id: 'marketplaces',
    category: 'ecommerce',
    profiles: ['pme', 'commerces'],
    icon: ShoppingCart,
    fr: {
      title: 'Développement de marketplaces informatiques',
      description: 'Plateformes de mise en relation vendeurs/acheteurs avec gestion des commissions et paiements tiers sécurisés.',
      tags: ['Multi-Vendeurs', 'Stripe Connect', 'Commissions Automatiques'],
    },
    en: {
      title: 'Multi-Vendor Marketplace Platforms',
      description: 'Two-sided digital marketplaces connecting buyers and sellers with automated commission splits via Stripe Connect.',
      tags: ['Multi-Vendor', 'Stripe Connect', 'Automated Payouts'],
    },
  },
  {
    id: 'gestion-en-ligne',
    category: 'ecommerce',
    profiles: ['pme', 'artisans'],
    icon: Building2,
    fr: {
      title: 'Systèmes de gestion en ligne (ERP / CRM Web)',
      description: 'Logiciels de gestion clients, devis, factures et stocks centralisés accessibles depuis le cloud en toute sécurité.',
      tags: ['CRM Centralisé', 'Facturation & Devis', 'Stockage Cloud'],
    },
    en: {
      title: 'Cloud ERP & CRM Web Systems',
      description: 'Centralized client, invoice, quotation, and inventory management accessible securely from any browser.',
      tags: ['Centralized CRM', 'Invoicing & Quotes', 'Cloud Storage'],
    },
  },
  {
    id: 'logiciels-navigateur',
    category: 'ecommerce',
    profiles: ['pme', 'professions-liberales'],
    icon: Globe,
    fr: {
      title: 'Logiciels accessibles depuis un navigateur',
      description: 'Applications web sans installation nécessaire, utilisables instantanément sur ordinateurs, tablettes et smartphones.',
      tags: ['Progressive Web App', 'Multi-Écrans', 'Zéro Installation'],
    },
    en: {
      title: 'Browser-Based Web Applications (PWA)',
      description: 'Zero-install software accessible across desktop, tablet, and mobile with lightning-fast cloud synchronization.',
      tags: ['Progressive Web App', 'Cross-Device', 'Zero Installation'],
    },
  },
  {
    id: 'developpement-saas',
    category: 'ecommerce',
    profiles: ['pme'],
    icon: Cpu,
    fr: {
      title: 'Développement de SaaS & outils web internes',
      description: 'Création de produits logiciels sur abonnement (Software as a Service) et outils métiers pour automatiser vos tâches récurrentes.',
      tags: ['Modèle Abonnement', 'Architecture Multi-Tenant', 'Automatisation'],
    },
    en: {
      title: 'SaaS & Internal Automation Tools',
      description: 'Turnkey Software as a Service product engineering with recurring subscriptions, multi-tenancy, and task automation.',
      tags: ['Subscription Model', 'Multi-Tenant Arch', 'Automation'],
    },
  },

  // 3. Applications et logiciels
  {
    id: 'apps-mobiles',
    category: 'apps',
    profiles: ['pme', 'commerces'],
    icon: Smartphone,
    fr: {
      title: 'Développement d\'applications mobiles & PWA',
      description: 'Applications mobiles modernes avec expérience utilisateur fluide, fonctionnement hors-ligne et notifications ciblées.',
      tags: ['Android & PWA', 'Google Play', 'Notifications Push', 'Mode Hors-Ligne'],
    },
    en: {
      title: 'Mobile & PWA App Development (Android)',
      description: 'Modern mobile apps built for seamless user experience, offline functionality, and targeted push notifications.',
      tags: ['Android & PWA', 'Google Play', 'Push Notifications', 'Offline First'],
    },
  },
  {
    id: 'apps-android',
    category: 'apps',
    profiles: ['pme', 'commerces'],
    icon: Smartphone,
    fr: {
      title: 'Développement d\'applications Android',
      description: 'Applications Android optimisées pour smartphones et tablettes, publiées sur le Google Play Store selon les standards officiels.',
      tags: ['Google Play Store', 'Ergonomie Android', 'Performance Native'],
    },
    en: {
      title: 'Native & Hybrid Android Applications',
      description: 'Android apps engineered for smartphones and tablets, published directly to Google Play following official guidelines.',
      tags: ['Google Play Store', 'Material Design', 'Native Performance'],
    },
  },
  {
    id: 'apps-pwa',
    category: 'apps',
    profiles: ['pme', 'commerces'],
    icon: Smartphone,
    fr: {
      title: 'Applications Web Progressives (PWA)',
      description: 'Applications web installables directement sur l\'écran d\'accueil de vos utilisateurs, avec notifications et mode hors-ligne sans friction de store.',
      tags: ['Installation Zéro Store', 'Multi-Écrans', 'Mode Hors-Ligne'],
    },
    en: {
      title: 'Progressive Web Apps (PWA)',
      description: 'Web apps installable directly to user home screens, featuring offline capabilities and push notifications without app store friction.',
      tags: ['Zero-Store Install', 'Cross-Device', 'Offline First'],
    },
  },
  {
    id: 'apps-multiplateformes',
    category: 'apps',
    profiles: ['pme', 'commerces'],
    icon: Smartphone,
    fr: {
      title: 'Applications multiplateformes Web & Android',
      description: 'Développement d\'une base de code unique alimentant simultanément la version Android et l\'application Web pour un coût maîtrisé.',
      tags: ['Base de Code Unique', 'Android & Web', 'Déploiement Rapide'],
    },
    en: {
      title: 'Cross-Platform Web & Android Applications',
      description: 'Unified codebase powering Android and Web simultaneously to reduce maintenance overhead and project costs.',
      tags: ['Single Codebase', 'Android & Web', 'Rapid Deployment'],
    },
  },
  {
    id: 'logiciels-personnalises',
    category: 'apps',
    profiles: ['pme', 'professions-liberales'],
    icon: Code2,
    fr: {
      title: 'Développement de logiciels personnalisés',
      description: 'Programmes informatiques taillés exactement sur-mesure pour résoudre vos défis opérationnels et organisationnels uniques.',
      tags: ['Spécifications Métier', 'Cahier des Charges', 'Support Dédié'],
    },
    en: {
      title: 'Bespoke Custom Software Solutions',
      description: 'Purpose-built software programs tailored to solve unique organizational challenges and operational bottlenecks.',
      tags: ['Custom Specs', 'Detailed Scope', 'Dedicated Support'],
    },
  },
  {
    id: 'logiciels-de-gestion',
    category: 'apps',
    profiles: ['pme', 'artisans'],
    icon: Building2,
    fr: {
      title: 'Logiciels de gestion sur-mesure',
      description: 'Outils informatiques de suivi d\'activité, de planning, de ressources humaines et de pré-comptabilité.',
      tags: ['Suivi Planning', 'Export Excel & PDF', 'Gestion d\'Équipe'],
    },
    en: {
      title: 'Custom Management & Scheduling Software',
      description: 'Software solutions for tracking team schedules, job site progress, human resources, and pre-accounting exports.',
      tags: ['Schedule Tracking', 'Excel & PDF Export', 'Team Management'],
    },
  },
  {
    id: 'outils-metier',
    category: 'apps',
    profiles: ['professions-liberales', 'artisans', 'pme'],
    icon: Wrench,
    fr: {
      title: 'Développement d\'outils métier spécifiques',
      description: 'Calculateurs techniques, générateurs de documents automatiques et systèmes de contrôle adaptés à votre profession.',
      tags: ['Calculs Complexes', 'Génération PDF Auto', 'Gain de Temps'],
    },
    en: {
      title: 'Industry-Specific Business Tools',
      description: 'Technical calculators, automated legal/business document generators, and verification tools tailored to your niche.',
      tags: ['Complex Algorithms', 'Auto PDF Engine', 'Time Saver'],
    },
  },
  {
    id: 'systemes-automatises',
    category: 'apps',
    profiles: ['pme', 'commerces'],
    icon: Zap,
    fr: {
      title: 'Systèmes automatisés & workflows',
      description: 'Interconnexion de vos logiciels pour automatiser le transfert de données, l\'envoi d\'emails et la génération de rapports.',
      tags: ['Webhooks & Connecteurs', 'Automatisation Tâches', 'Flux de Données'],
    },
    en: {
      title: 'Workflow Automation & Data Pipelines',
      description: 'Connect your business software via webhooks and APIs to automate data transfers, email alerts, and report generation.',
      tags: ['Webhooks & APIs', 'Task Automation', 'Data Pipelines'],
    },
  },
  {
    id: 'developpement-api',
    category: 'apps',
    profiles: ['pme'],
    icon: Server,
    fr: {
      title: 'Développement d\'API & Web Services',
      description: 'Création d\'APIs RESTful performantes et sécurisées permettant à vos applications et partenaires de communiquer de manière fiable.',
      tags: ['API REST Sécurisée', 'Format JSON Standard', 'Documentation Technique'],
    },
    en: {
      title: 'REST API & Web Service Development',
      description: 'High-throughput, secure RESTful APIs enabling seamless data exchange between your web apps, mobile apps, and partners.',
      tags: ['Secure REST API', 'JSON Standards', 'OpenAPI Docs'],
    },
  },

  // 4. Maintenance & Performance
  {
    id: 'maintenance-technique',
    category: 'maintenance',
    profiles: ['pme', 'artisans', 'commerces', 'associations', 'professions-liberales'],
    icon: ShieldCheck,
    fr: {
      title: 'Maintenance technique de sites internet',
      description: 'Contrats de maintenance préventive et corrective : sauvegardes automatisées, mises à jour et surveillance de disponibilité.',
      tags: ['Sauvegardes Régulières', 'Mises à Jour Sécurité', 'Surveillance Uptime'],
    },
    en: {
      title: 'Website Technical Maintenance & Support',
      description: 'Preventive and corrective maintenance contracts: automated cloud backups, security patches, and 24/7 uptime monitoring.',
      tags: ['Automated Backups', 'Security Updates', 'Uptime Monitoring'],
    },
  },
  {
    id: 'bug-correction-site',
    category: 'maintenance',
    profiles: ['pme', 'artisans', 'commerces', 'associations'],
    icon: Bug,
    fr: {
      title: 'Correction de bugs sur des sites internet',
      description: 'Intervention rapide pour diagnostiquer et corriger les erreurs d\'affichage, blocages ou failles sur votre site existant.',
      tags: ['Dépannage Rapide', 'Correction CSS/JS', 'Réparation Base de Données'],
    },
    en: {
      title: 'Website Bug Fixing & Rapid Troubleshooting',
      description: 'Fast diagnosis and resolution of layout glitches, broken forms, script errors, or database connectivity issues.',
      tags: ['Rapid Troubleshooting', 'CSS/JS Fixes', 'Database Repairs'],
    },
  },
  {
    id: 'bug-correction-app',
    category: 'maintenance',
    profiles: ['pme'],
    icon: Bug,
    fr: {
      title: 'Correction de bugs sur des applications web & mobiles',
      description: 'Résolution des crashs, erreurs d\'API, lenteurs ou incompatibilités navigateurs sur vos applications professionnelles.',
      tags: ['Débogage React / Node', 'Correction d\'APIs', 'Stabilité Renforcée'],
    },
    en: {
      title: 'Web & Mobile App Debugging',
      description: 'Resolving crashes, state inconsistencies, API failures, or memory leaks on production web and mobile apps.',
      tags: ['React/Node Debug', 'API Corrections', 'Enhanced Stability'],
    },
  },
  {
    id: 'ajout-fonctionnalites-site',
    category: 'maintenance',
    profiles: ['pme', 'artisans', 'commerces', 'associations'],
    icon: RefreshCw,
    fr: {
      title: 'Ajout de fonctionnalités sur un site existant',
      description: 'Intégration de nouveaux modules : formulaire dynamique, système de paiement, multilingue ou carte interactive.',
      tags: ['Nouveaux Modules', 'Évolution Sans Tout Refaire', 'Compatibilité'],
    },
    en: {
      title: 'Feature Additions for Existing Websites',
      description: 'Integrate new capabilities into your current site: payment gateways, interactive maps, multi-language toggles, and forms.',
      tags: ['New Modules', 'Incremental Upgrades', 'Seamless Compatibility'],
    },
  },
  {
    id: 'ajout-fonctionnalites-app',
    category: 'maintenance',
    profiles: ['pme'],
    icon: RefreshCw,
    fr: {
      title: 'Évolutions & ajouts de fonctions sur vos applications',
      description: 'Faites évoluer votre application métier ou mobile selon vos nouveaux besoins opérationnels et la croissance de vos utilisateurs.',
      tags: ['Développement Fonctionnalités', 'Montée en Charge', 'Refactorisation'],
    },
    en: {
      title: 'App Feature Expansion & Scaling',
      description: 'Scale your production application with new operational modules, high-concurrency handling, and clean refactoring.',
      tags: ['Feature Expansion', 'Load Scalability', 'Code Refactoring'],
    },
  },
  {
    id: 'mise-a-jour-technique',
    category: 'maintenance',
    profiles: ['pme', 'commerces', 'associations'],
    icon: ShieldCheck,
    fr: {
      title: 'Mises à jour techniques & sécurité',
      description: 'Mise à niveau des dépendances, correctifs de sécurité et compatibilité avec les dernières normes navigateurs et mobiles.',
      tags: ['Correctifs de Sécurité', 'Mises à Jour Librairies', 'Certificat SSL'],
    },
    en: {
      title: 'Technical Upgrades & Security Hardening',
      description: 'Dependency updates, vulnerability patches, HTTPS/TLS certificate configuration, and modern browser standards.',
      tags: ['Security Hardening', 'Package Updates', 'SSL Certificates'],
    },
  },
  {
    id: 'optimisation-technique',
    category: 'maintenance',
    profiles: ['pme', 'commerces', 'artisans', 'professions-liberales'],
    icon: Zap,
    fr: {
      title: 'Optimisation de la vitesse & performance web',
      description: 'Audit et optimisation des temps de chargement pour maximiser vos scores Google Lighthouse et booster votre référencement naturel.',
      tags: ['Optimisation Vitesse', 'Core Web Vitals', 'Chargement Rapide'],
    },
    en: {
      title: 'Web Speed & Core Web Vitals Optimization',
      description: 'Deep performance audit and code optimization to maximize Google Lighthouse scores and boost search rankings.',
      tags: ['Speed Optimization', 'Core Web Vitals', 'Fast Loading'],
    },
  },
  {
    id: 'migration-technique',
    category: 'maintenance',
    profiles: ['pme', 'commerces'],
    icon: Server,
    fr: {
      title: 'Migration technique de sites & serveurs',
      description: 'Transfert sécurisé de votre site vers un nouvel hébergeur ou une nouvelle architecture moderne sans interruption de service.',
      tags: ['Migration Serveur & DNS', 'Transfert Données', 'Zéro Coupure'],
    },
    en: {
      title: 'Server & Cloud Migration Services',
      description: 'Zero-downtime database and code migration from legacy servers to modern edge CDN hosting platforms (Vercel, AWS, OVH).',
      tags: ['Server & DNS Migration', 'Data Transfer', 'Zero Downtime'],
    },
  },
  {
    id: 'refonte-technique',
    category: 'maintenance',
    profiles: ['pme', 'artisans', 'commerces', 'associations', 'professions-liberales'],
    icon: RefreshCw,
    fr: {
      title: 'Refonte technique & esthétique complète',
      description: 'Modernisation intégrale de votre vieux site web : nouveau design premium, code moderne et compatibilité mobile parfaite.',
      tags: ['Modernisation Complète', 'Design Contemporain', 'Conservation du SEO'],
    },
    en: {
      title: 'Complete Technical & Visual Website Redesign',
      description: 'Full modernization of outdated sites: bespoke premium UI, clean lightweight code, mobile responsiveness, and SEO retention.',
      tags: ['Full Modernization', 'Contemporary UI', 'SEO Retention'],
    },
  },
];

export const strategicPillarsData = {
  fr: [
    {
      id: 'vitrines',
      badge: 'Pôle 01',
      title: 'Sites Vitrines & Portails Professionnels',
      subtitle: 'Conception sur-mesure pour PME, artisans et indépendants',
      desc: 'Des sites ultra-rapides, élégants et conçus sans aucun constructeur de page lourd. Chaque page valorise vos compétences et guide le visiteur vers la prise de contact.',
      pricing: 'À partir de 950 € (One-Page) ou 1 850 € (3-5 pages)',
      deliverables: [
        'Design exclusif adapté à votre identité visuelle',
        'Architecture légère & temps de chargement optimisés',
        'Optimisation SEO technique initiale et indexation Google',
        'Code 100% propriétaire sans abonnement mensuel imposé',
      ],
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'SSG'],
      icon: Globe,
    },
    {
      id: 'ecommerce',
      badge: 'Pôle 02',
      title: 'E-Commerce, Catalogues & Réservations',
      subtitle: 'Vente en ligne, gestion de commandes et prise de RDV',
      desc: 'Des tunnels d\'achat fluides et sécurisés sans commissions prélevées sur vos marges. Idéal pour vendre vos produits ou gérer vos réservations d\'activité en direct.',
      pricing: 'Sur devis personnalisé selon fonctionnalités',
      deliverables: [
        'Paiement sécurisé par carte bancaire via Stripe & PayPal',
        'Gestion intuitive des stocks, déclinaisons et commandes',
        'Synchronisation avec vos agendas et alertes automatisées',
        'Tunnel de commande optimisé sans étapes superflues',
      ],
      tech: ['Stripe', 'Node.js', 'Firebase', 'Cloud Functions'],
      icon: ShoppingCart,
    },
    {
      id: 'apps',
      badge: 'Pôle 03',
      title: 'Applications Web, Mobiles & Outils SaaS',
      subtitle: 'Logiciels métier sur-mesure et applications Android / Web',
      desc: 'Automatisez vos processus internes ou lancez votre produit digital avec une application sur-mesure rapide, accessible sur tous les supports sans contrainte d\'installation.',
      pricing: 'Sur devis basé sur un TJM indicatif de 400 € / jour',
      deliverables: [
        'Tableaux de bord dynamiques et gestion de données en direct',
        'Espaces membres sécurisés avec gestion fine des permissions',
        'Développement d\'APIs REST et interconnexion avec vos logiciels',
        'Applications mobiles Android & Progressive Web Apps (PWA)',
      ],
      tech: ['React', 'TypeScript', 'Tailwind', 'API REST'],
      icon: Smartphone,
    },
    {
      id: 'maintenance',
      badge: 'Pôle 04',
      title: 'Maintenance, Performance & Refonte',
      subtitle: 'Assistance technique, dépannage express et audit de vitesse',
      desc: 'Confiez la sécurité et la vitesse de votre infrastructure web à un interlocuteur unique. Résolution rapide de bugs et modernisation de sites existants sans interruption.',
      pricing: 'Intervention ponctuelle ou contrat de suivi',
      deliverables: [
        'Audit technique complet et optimisation Core Web Vitals',
        'Correction d\'erreurs, failles de sécurité et crashs d\'affichage',
        'Mise à niveau des dépendances et sauvegardes automatiques',
        'Refonte esthétique et technique vers un code moderne',
      ],
      tech: ['Audits Google', 'SSL', 'Debug React/JS', 'SEO Migration'],
      icon: Wrench,
    },
  ],
  en: [
    {
      id: 'vitrines',
      badge: 'Pillar 01',
      title: 'Showcase Websites & Corporate Portals',
      subtitle: 'Custom design for SMEs, artisans, and professionals',
      desc: 'Ultra-fast, elegant websites crafted without heavy page builders. Every page highlights your expertise and guides visitors towards direct contact.',
      pricing: 'From €950 (One-Page) or €1,850 (3-5 pages)',
      deliverables: [
        'Exclusive UI design tailored to your visual identity',
        'Lean architecture & optimized fast load times',
        'Initial technical SEO optimization & Google indexing',
        '100% proprietary code with zero captive subscriptions',
      ],
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'SSG'],
      icon: Globe,
    },
    {
      id: 'ecommerce',
      badge: 'Pillar 02',
      title: 'E-Commerce, Catalogs & Booking Systems',
      subtitle: 'Online sales, order management, and booking scheduling',
      desc: 'Seamless, highly secure checkout funnels with zero percentage commission taken on your turnover. Ideal for selling goods or booking appointments directly.',
      pricing: 'Custom proposal based on required features',
      deliverables: [
        'Secure card payments via Stripe & PayPal',
        'Intuitive inventory, variants, and order fulfillment',
        'Calendar synchronization & automated email alerts',
        'Frictionless checkout funnel without unnecessary steps',
      ],
      tech: ['Stripe', 'Node.js', 'Firebase', 'Cloud Functions'],
      icon: ShoppingCart,
    },
    {
      id: 'apps',
      badge: 'Pillar 03',
      title: 'Web Apps, Mobile Apps & SaaS Tools',
      subtitle: 'Custom business software and Android / Web solutions',
      desc: 'Automate internal workflows or launch your digital software product with an ultra-responsive web application accessible across all devices.',
      pricing: 'Proposal based on an indicative daily rate of €400 / day',
      deliverables: [
        'Dynamic administrative dashboards and live data sync',
        'Secure member portals with granular role-based permissions',
        'REST API development & third-party software integration',
        'Android mobile applications & Progressive Web Apps (PWA)',
      ],
      tech: ['React', 'TypeScript', 'Tailwind', 'REST API'],
      icon: Smartphone,
    },
    {
      id: 'maintenance',
      badge: 'Pillar 04',
      title: 'Maintenance, Performance & Redesign',
      subtitle: 'Technical support, urgent debugging, and speed auditing',
      desc: 'Entrust the security and performance of your web ecosystem to a single expert engineer. Swift bug fixes and modern migrations with zero downtime.',
      pricing: 'Single interventions or ongoing support contracts',
      deliverables: [
        'Comprehensive technical audit & Core Web Vitals tuning',
        'Bug resolutions, vulnerability patching, and UI fixes',
        'Dependency upgrades & automatic database backups',
        'Visual and architectural redesign to modern standards',
      ],
      tech: ['Google Audits', 'SSL', 'React/JS Debug', 'SEO Migration'],
      icon: Wrench,
    },
  ],
};

export const servicesFaqData = {
  fr: [
    {
      question: 'Comment choisir la prestation la plus adaptée à mon besoin ?',
      answer: 'Si votre objectif principal est de présenter votre activité, rassurer vos prospects et recevoir des demandes de devis, un site vitrine (Pack Présence ou Pack Croissance) est la solution idéale. Si vous avez besoin d\'automatiser un flux opérationnel (gestion de réservations, calculs métiers, espace adhérents ou vente en ligne), je conçois une plateforme web ou une application sur-mesure.',
    },
    {
      question: 'Suis-je réellement 100% propriétaire de mon site et de mon code ?',
      answer: 'Absolument. Vous êtes l\'unique propriétaire de l\'intégralité du code source, du nom de domaine et de vos données dès la livraison, sans aucun abonnement logiciel captif. Retrouvez l\'ensemble de nos engagements juridiques et techniques dans la FAQ complète de la page d\'accueil.',
    },
    {
      question: 'Quels sont les délais moyens de réalisation selon la prestation ?',
      answer: 'Les délais s\'échelonnent de 1 à 2 semaines pour un site One-Page, de 2 à 3 semaines pour un site multi-pages, et de 4 à 6 semaines pour une application SaaS sur-mesure. Un calendrier de validation jalonné est fixé dès la signature du devis.',
    },
    {
      question: 'Proposez-vous un accompagnement et une maintenance après la mise en ligne ?',
      answer: 'Oui. Chaque livraison inclut une garantie technique et une prise en main personnalisée, avec des forfaits de maintenance préventive et de sauvegardes disponibles dès 29 €/mois. Consultez notre FAQ principale pour découvrir le détail des garanties.',
    },
    {
      question: 'Comment obtenir un devis détaillé sans engagement ?',
      answer: 'Il vous suffit de remplir le formulaire de contact en décrivant brièvement vos attentes ou de m\'appeler directement au 07 83 66 60 98. Vous recevrez une étude de faisabilité et une proposition chiffrée claire sous 24 heures ouvrées.',
    },
  ],
  en: [
    {
      question: 'How do I choose the service best suited to my business goals?',
      answer: 'If your primary goal is to showcase your business, reassure prospects, and generate qualified quote inquiries, a custom showcase website (Presence or Growth Pack) is ideal. If you need to streamline operations (booking management, business calculations, member portals, or e-commerce), I develop a custom web application or SaaS platform.',
    },
    {
      question: 'Do I truly own 100% of my website and source code?',
      answer: 'Absolutely. You are the sole, full owner of all source code, domain names, and data from final delivery, with zero captive software subscriptions. View our full transparency policies in our homepage FAQ.',
    },
    {
      question: 'What are typical project delivery timelines?',
      answer: 'Turnaround typically ranges from 1 to 2 weeks for a one-page showcase, 2 to 3 weeks for a multi-page site, and 4 to 6 weeks for a custom SaaS application. A precise milestone calendar is agreed upon prior to kickoff.',
    },
    {
      question: 'Do you provide ongoing support and maintenance after deployment?',
      answer: 'Yes. Every delivery includes a technical warranty and personalized onboarding, with optional maintenance plans starting at €29/month. Check our main FAQ on the homepage for complete support terms.',
    },
    {
      question: 'How can I receive a free, detailed quote?',
      answer: 'Simply complete the contact form with a brief description of your requirements or call +33 7 83 66 60 98. You will receive a technical feasibility review and transparent quote within 24 business hours.',
    },
  ],
};
