import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  ShoppingCart, 
  Smartphone, 
  Wrench, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
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
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  PhoneCall,
  Send,
  Gauge,
  FileCode
} from 'lucide-react';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import SectionReveal from '../components/SectionReveal';

interface ServiceItem {
  id: string;
  title: string;
  category: 'vitrines' | 'ecommerce' | 'apps' | 'maintenance';
  description: string;
  profiles: string[];
  tags: string[];
  icon: any;
}

const services: ServiceItem[] = [
  // 1. Développement de sites internet (Vitrines & Présentation)
  {
    id: 'site-vitrine',
    title: 'Création de sites vitrines',
    category: 'vitrines',
    description: 'Conception de sites internet sur-mesure modernes, fluides et optimisés pour séduire vos visiteurs et générer des contacts qualifiés.',
    profiles: ['artisans', 'commerces', 'professions-liberales', 'pme'],
    tags: ['SEO Local', 'Design Responsive', 'React & Tailwind', 'Haute Vitesse'],
    icon: Globe
  },
  {
    id: 'site-institutionnel',
    title: 'Création de sites institutionnels',
    category: 'vitrines',
    description: 'Développement de plateformes officielles sécurisées et élégantes pour organismes publics, écoles et grandes organisations.',
    profiles: ['pme', 'associations'],
    tags: ['Sécurité Maximale', 'Accessibilité WCAG', 'SSG Rapide', 'Architecture Évolutive'],
    icon: Building2
  },
  {
    id: 'site-professionnel',
    title: 'Création de sites professionnels',
    category: 'vitrines',
    description: 'Présentation claire de vos services avec intégration de formulaires de devis dynamiques et modules d\'interaction client.',
    profiles: ['pme', 'professions-liberales'],
    tags: ['Tunnel de Contact', 'Formulaires Filtrés', 'Ergonomie Pro', 'Vitesse Éclair'],
    icon: Briefcase
  },
  {
    id: 'site-association',
    title: 'Création de sites pour associations',
    category: 'vitrines',
    description: 'Mise en valeur de vos actions, gestion des adhésions, appels aux dons et actualités de votre structure associative.',
    profiles: ['associations'],
    tags: ['Formulaires d\'Adhésion', 'Appels aux Dons', 'Actualités & Blog', 'Événements'],
    icon: UserCheck
  },
  {
    id: 'site-restaurant',
    title: 'Création de sites pour restaurants',
    category: 'vitrines',
    description: 'Menu en ligne interactif, galerie photos soignée, intégration de la réservation de tables et géolocalisation.',
    profiles: ['restaurants', 'commerces'],
    tags: ['Menu QR Code', 'Réservation Directe', 'Click & Collect', 'SEO Géolocalisé'],
    icon: Utensils
  },
  {
    id: 'site-artisan',
    title: 'Création de sites pour artisans',
    category: 'vitrines',
    description: 'Vitrine digitale sur-mesure pour maçons, électriciens, plombiers, menuisiers. Mise en avant de vos réalisations et demande de devis express.',
    profiles: ['artisans'],
    tags: ['Visibilité Locale', 'Demande de Devis Express', 'Galerie Chantiers'],
    icon: Store
  },
  {
    id: 'site-commerce',
    title: 'Création de sites pour commerces',
    category: 'vitrines',
    description: 'Renforcez votre visibilité locale, présentez vos produits en magasin et attirez de nouveaux clients en boutique.',
    profiles: ['commerces'],
    tags: ['Google Business', 'Drive to Store', 'Présentation Produits', 'Contact Rapide'],
    icon: Store
  },
  {
    id: 'site-profession-liberale',
    title: 'Création de sites pour professions libérales',
    category: 'vitrines',
    description: 'Sites épurés et sécurisés pour avocats, médecins, comptables, consultants. Prise de rendez-vous en ligne intégrée.',
    profiles: ['professions-liberales'],
    tags: ['Confidentialité', 'Prise de RDV en Ligne', 'Design Épuré', 'Conformité RGPD'],
    icon: Briefcase
  },
  {
    id: 'site-evenementiel',
    title: 'Création de sites événementiels',
    category: 'vitrines',
    description: 'Sites éphémères ou récurrents pour salons, conférences, mariages, festivals avec billetterie et programme interactif.',
    profiles: ['associations', 'pme'],
    tags: ['Compte à Rebours', 'Billetterie en Ligne', 'Programme Interactif', 'Inscriptions'],
    icon: Calendar
  },
  {
    id: 'landing-page',
    title: 'Création de landing pages à forte conversion',
    category: 'vitrines',
    description: 'Pages de destination ciblées conçues sur-mesure pour vos campagnes publicitaires (Google Ads, réseaux sociaux) maximisant le ROI.',
    profiles: ['pme', 'commerces', 'artisans'],
    tags: ['Structure de Conversion', 'Chargement Immédiat', 'Call to Action Percutant'],
    icon: Zap
  },
  {
    id: 'page-presentation-entreprise',
    title: 'Pages de présentation d\'entreprise',
    category: 'vitrines',
    description: 'Mise en scène de l\'histoire, des valeurs, de l\'équipe et des certifications de votre entreprise pour asseoir votre crédibilité.',
    profiles: ['pme', 'professions-liberales'],
    tags: ['Image de Marque', 'Présentation Équipe', 'Chiffres & Certifications'],
    icon: Layout
  },
  {
    id: 'portfolio-professionnel',
    title: 'Création de portfolios professionnels',
    category: 'vitrines',
    description: 'Galeries interactives haute résolution pour photographes, architectes, designers, créateurs et agences.',
    profiles: ['professions-liberales', 'artisans'],
    tags: ['Galerie Haute Résolution', 'Animations Fluides', 'Expérience Visuelle'],
    icon: Sparkles
  },
  {
    id: 'creation-blog',
    title: 'Création de blogs & espaces d\'actualités',
    category: 'vitrines',
    description: 'Plateforme éditoriale optimisée pour la rédaction d\'articles, le partage social et le positionnement SEO de longue traîne.',
    profiles: ['pme', 'associations', 'professions-liberales'],
    tags: ['Architecture SEO', 'Maillage Interne', 'Catégories & Tags', 'Partage Social'],
    icon: BookOpen
  },
  {
    id: 'espace-administrateur',
    title: 'Sites avec espace administrateur sur-mesure',
    category: 'vitrines',
    description: 'Back-office personnalisé intuitif pour gérer en toute autonomie vos contenus, témoignages, textes et médias sans toucher au code.',
    profiles: ['pme', 'associations', 'commerces'],
    tags: ['Panneau d\'Administration', 'Autonomie Totale', 'Gestion des Médias'],
    icon: Lock
  },
  {
    id: 'espace-client',
    title: 'Sites avec espace client sécurisé',
    category: 'vitrines',
    description: 'Portail privé permettant à vos clients de consulter leurs documents, factures, projets en cours et messages en toute confidentialité.',
    profiles: ['pme', 'professions-liberales'],
    tags: ['Authentification Sécurisée', 'Téléchargement PDF', 'Portail Dédié'],
    icon: UserCheck
  },
  {
    id: 'site-sur-mesure',
    title: 'Développement de sites internet 100% sur-mesure',
    category: 'vitrines',
    description: 'Conception intégrale sans template ni contrainte technique, adaptée exactement à votre cahier des charges et à vos objectifs métiers.',
    profiles: ['pme', 'artisans', 'commerces', 'associations', 'professions-liberales'],
    tags: ['Code 100% Propriétaire', 'Zéro Template', 'Performance Maximale'],
    icon: Code2
  },

  // 2. E-commerce & Applications Web / SaaS
  {
    id: 'site-ecommerce',
    title: 'Développement de sites e-commerce',
    category: 'ecommerce',
    description: 'Boutiques en ligne performantes et sécurisées avec gestion de catalogue, moyens de paiement multiples et suivi des ventes.',
    profiles: ['commerces', 'artisans', 'pme'],
    tags: ['Paiement Stripe & CB', 'Gestion de Stocks', 'Click & Collect', 'Panier Fluide'],
    icon: ShoppingCart
  },
  {
    id: 'catalogue-produits',
    title: 'Catalogues de produits en ligne',
    category: 'ecommerce',
    description: 'Présentation détaillée de vos gammes de produits sans vente directe, idéale pour la demande de devis B2B.',
    profiles: ['commerces', 'artisans', 'pme'],
    tags: ['Filtres Multicritères', 'Fiches PDF', 'Demande de Devis B2B'],
    icon: Layers
  },
  {
    id: 'systeme-panier',
    title: 'Systèmes de panier & paiement en ligne',
    category: 'ecommerce',
    description: 'Module de panier d\'achat fluide avec calcul automatique des frais de port et tunnels d\'achat optimisés pour éviter les abandons.',
    profiles: ['commerces', 'pme'],
    tags: ['Tunnel d\'Achat Sans Friction', 'Codes Promo', 'Paiement Sécurisé SSL'],
    icon: ShoppingCart
  },
  {
    id: 'commande-en-ligne',
    title: 'Systèmes de commande en ligne',
    category: 'ecommerce',
    description: 'Solution sur-mesure pour la prise de commande rapide pour grossistes, traiteurs, restaurants et commerces.',
    profiles: ['restaurants', 'commerces', 'artisans'],
    tags: ['Commandes Express', 'Facturation Automatisée', 'Alertes Temps Réel'],
    icon: ShoppingCart
  },
  {
    id: 'reservation-en-ligne',
    title: 'Systèmes de réservation en ligne',
    category: 'ecommerce',
    description: 'Modules de réservation de créneaux, chambres, équipements ou prestations avec synchronisation d\'agenda.',
    profiles: ['restaurants', 'professions-liberales', 'artisans'],
    tags: ['Synchronisation Agenda', 'Rappels Automatiques', 'Acompte en Ligne'],
    icon: Calendar
  },
  {
    id: 'developpement-espace-client',
    title: 'Développement d\'espaces clients sur-mesure',
    category: 'ecommerce',
    description: 'Dashboards dynamiques permettant à vos utilisateurs de suivre leurs commandes, abonnements et statistiques en direct.',
    profiles: ['pme', 'professions-liberales'],
    tags: ['Tableau de Bord React', 'API Sécurisée', 'Suivi Commandes'],
    icon: UserCheck
  },
  {
    id: 'tableau-de-bord-web',
    title: 'Tableaux de bord & Dashboards analytiques',
    category: 'ecommerce',
    description: 'Visualisation en temps réel de vos données d\'entreprise, indicateurs clés de performance et suivi d\'activité.',
    profiles: ['pme'],
    tags: ['Analytics Métier', 'Graphiques Interactifs', 'Données Temps Réel'],
    icon: Layout
  },
  {
    id: 'back-offices',
    title: 'Développement de back-offices d\'administration',
    category: 'ecommerce',
    description: 'Outils d\'administration internes conçus spécifiquement pour piloter vos opérations métiers quotidiennes sans friction.',
    profiles: ['pme', 'commerces'],
    tags: ['Gestion Métier CRUD', 'Rôles & Permissions', 'Journalisation'],
    icon: Lock
  },
  {
    id: 'plateformes-personnalisees',
    title: 'Plateformes web personnalisées',
    category: 'ecommerce',
    description: 'Développement d\'applications web complexes sur-mesure répondant à des processus métiers uniques et exigeants.',
    profiles: ['pme', 'professions-liberales'],
    tags: ['Architecture Full-Stack', 'Haute Scalabilité', 'Sur-Mesure Métier'],
    icon: Database
  },
  {
    id: 'marketplaces',
    title: 'Développement de marketplaces informatiques',
    category: 'ecommerce',
    description: 'Plateformes de mise en relation vendeurs/acheteurs avec gestion des commissions et paiements tiers sécurisés.',
    profiles: ['pme', 'commerces'],
    tags: ['Multi-Vendeurs', 'Stripe Connect', 'Commissions Automatiques'],
    icon: ShoppingCart
  },
  {
    id: 'gestion-en-ligne',
    title: 'Systèmes de gestion en ligne (ERP / CRM Web)',
    category: 'ecommerce',
    description: 'Logiciels de gestion clients, devis, factures et stocks centralisés accessibles depuis le cloud en toute sécurité.',
    profiles: ['pme', 'artisans'],
    tags: ['CRM Centralisé', 'Facturation & Devis', 'Stockage Cloud'],
    icon: Building2
  },
  {
    id: 'logiciels-navigateur',
    title: 'Logiciels accessibles depuis un navigateur',
    category: 'ecommerce',
    description: 'Applications web sans installation nécessaire, utilisables instantanément sur ordinateurs, tablettes et smartphones.',
    profiles: ['pme', 'professions-liberales'],
    tags: ['Progressive Web App', 'Multi-Écrans', 'Zéro Installation'],
    icon: Globe
  },
  {
    id: 'developpement-saas',
    title: 'Développement de SaaS & outils web internes',
    category: 'ecommerce',
    description: 'Création de produits logiciels sur abonnement (Software as a Service) et outils métiers pour automatiser vos tâches récurrentes.',
    profiles: ['pme'],
    tags: ['Modèle Abonnement', 'Architecture Multi-Tenant', 'Automatisation'],
    icon: Cpu
  },

  // 3. Applications et logiciels
  {
    id: 'apps-mobiles',
    title: 'Développement d\'applications mobiles',
    category: 'apps',
    description: 'Applications mobiles modernes avec expérience utilisateur fluide, fonctionnement hors-ligne et notifications ciblées.',
    profiles: ['pme', 'commerces'],
    tags: ['iOS & Android', 'React Native', 'Publication Stores', 'Notifications Push'],
    icon: Smartphone
  },
  {
    id: 'apps-android',
    title: 'Développement d\'applications Android',
    category: 'apps',
    description: 'Applications Android optimisées pour smartphones et tablettes, publiées sur le Google Play Store selon les standards officiels.',
    profiles: ['pme', 'commerces'],
    tags: ['Google Play Store', 'Ergonomie Android', 'Performance Native'],
    icon: Smartphone
  },
  {
    id: 'apps-ios',
    title: 'Développement d\'applications iOS (iPhone / iPad)',
    category: 'apps',
    description: 'Applications fluides respectant les normes strictes d\'ergonomie et de sécurité Apple pour l\'App Store.',
    profiles: ['pme', 'commerces'],
    tags: ['Apple App Store', 'Design Apple Human Interface', 'Sécurité iOS'],
    icon: Smartphone
  },
  {
    id: 'apps-multiplateformes',
    title: 'Applications mobiles multiplateformes',
    category: 'apps',
    description: 'Développement d\'une codebase unique alimentant simultanément les versions Android, iOS et Web pour un coût maîtrisé.',
    profiles: ['pme', 'commerces'],
    tags: ['Base de Code Unique', 'Coût Optimisé', 'Déploiement Rapide'],
    icon: Smartphone
  },
  {
    id: 'logiciels-personnalises',
    title: 'Développement de logiciels personnalisés',
    category: 'apps',
    description: 'Programmes informatiques taillés exactement sur-mesure pour résoudre vos défis opérationnels et organisationnels uniques.',
    profiles: ['pme', 'professions-liberales'],
    tags: ['Spécifications Métier', 'Cahier des Charges', 'Support Dédié'],
    icon: Code2
  },
  {
    id: 'logiciels-de-gestion',
    title: 'Logiciels de gestion sur-mesure',
    category: 'apps',
    description: 'Outils informatiques de suivi d\'activité, de planning, de ressources humaines et de pré-comptabilité.',
    profiles: ['pme', 'artisans'],
    tags: ['Suivi Planning', 'Export Excel & PDF', 'Gestion d\'Équipe'],
    icon: Building2
  },
  {
    id: 'outils-metier',
    title: 'Développement d\'outils métier spécifiques',
    category: 'apps',
    description: 'Calculateurs techniques, générateurs de documents automatiques et systèmes de contrôle adaptés à votre profession.',
    profiles: ['professions-liberales', 'artisans', 'pme'],
    tags: ['Calculs Complexes', 'Génération PDF Auto', 'Gain de Temps'],
    icon: Wrench
  },
  {
    id: 'systemes-automatises',
    title: 'Systèmes automatisés & workflows',
    category: 'apps',
    description: 'Interconnexion de vos logiciels pour automatiser le transfert de données, l\'envoi d\'emails et la génération de rapports.',
    profiles: ['pme', 'commerces'],
    tags: ['Webhooks & Connecteurs', 'Automatisation Tâches', 'Flux de Données'],
    icon: Zap
  },
  {
    id: 'developpement-api',
    title: 'Développement d\'API & Web Services',
    category: 'apps',
    description: 'Création d\'APIs RESTful performantes et sécurisées permettant à vos applications et partenaires de communiquer de manière fiable.',
    profiles: ['pme'],
    tags: ['API REST Sécurisée', 'Format JSON Standard', 'Documentation Technique'],
    icon: Server
  },

  // 4. Maintenance et prestations informatiques
  {
    id: 'maintenance-technique',
    title: 'Maintenance technique de sites internet',
    category: 'maintenance',
    description: 'Contrats de maintenance préventive et corrective : sauvegardes automatisées, mises à jour et surveillance de disponibilité.',
    profiles: ['pme', 'artisans', 'commerces', 'associations', 'professions-liberales'],
    tags: ['Sauvegardes Régulières', 'Mises à Jour Sécurité', 'Surveillance Uptime'],
    icon: ShieldCheck
  },
  {
    id: 'bug-correction-site',
    title: 'Correction de bugs sur des sites internet',
    category: 'maintenance',
    description: 'Intervention rapide pour diagnostiquer et corriger les erreurs d\'affichage, blocages ou failles sur votre site existant.',
    profiles: ['pme', 'artisans', 'commerces', 'associations'],
    tags: ['Dépannage Rapide', 'Correction CSS/JS', 'Réparation Base de Données'],
    icon: Bug
  },
  {
    id: 'bug-correction-app',
    title: 'Correction de bugs sur des applications web & mobiles',
    category: 'maintenance',
    description: 'Résolution des crashs, erreurs d\'API, lenteurs ou incompatibilités navigateurs sur vos applications professionnelles.',
    profiles: ['pme'],
    tags: ['Débogage React / Node', 'Correction d\'APIs', 'Stabilité Renforcée'],
    icon: Bug
  },
  {
    id: 'ajout-fonctionnalites-site',
    title: 'Ajout de fonctionnalités sur un site existant',
    category: 'maintenance',
    description: 'Intégration de nouveaux modules : formulaire dynamique, système de paiement, multilingue ou carte interactive.',
    profiles: ['pme', 'artisans', 'commerces', 'associations'],
    tags: ['Nouveaux Modules', 'Évolution Sans Tout Refaire', 'Compatibilité'],
    icon: RefreshCw
  },
  {
    id: 'ajout-fonctionnalites-app',
    title: 'Évolutions & ajouts de fonctions sur vos applications',
    category: 'maintenance',
    description: 'Faites évoluer votre application métier ou mobile selon vos nouveaux besoins opérationnels et la croissance de vos utilisateurs.',
    profiles: ['pme'],
    tags: ['Développement Fonctionnalités', 'Montée en Charge', 'Refactorisation'],
    icon: RefreshCw
  },
  {
    id: 'mise-a-jour-technique',
    title: 'Mises à jour techniques & sécurité',
    category: 'maintenance',
    description: 'Mise à niveau des dépendances, correctifs de sécurité et compatibilité avec les dernières normes navigateurs et mobiles.',
    profiles: ['pme', 'commerces', 'associations'],
    tags: ['Correctifs de Sécurité', 'Mises à Jour Librairies', 'Certificat SSL'],
    icon: ShieldCheck
  },
  {
    id: 'optimisation-technique',
    title: 'Optimisation de la vitesse & performance web',
    category: 'maintenance',
    description: 'Audit et optimisation des temps de chargement pour maximiser vos scores Google Lighthouse et booster votre référencement naturel.',
    profiles: ['pme', 'commerces', 'artisans', 'professions-liberales'],
    tags: ['Optimisation Vitesse', 'Core Web Vitals', 'Chargement Rapide'],
    icon: Zap
  },
  {
    id: 'migration-technique',
    title: 'Migration technique de sites & serveurs',
    category: 'maintenance',
    description: 'Transfert sécurisé de votre site vers un nouvel hébergeur ou une nouvelle architecture moderne sans interruption de service.',
    profiles: ['pme', 'commerces'],
    tags: ['Migration Serveur & DNS', 'Transfert Données', 'Zéro Coupure'],
    icon: Server
  },
  {
    id: 'refonte-technique',
    title: 'Refonte technique & esthétique complète',
    category: 'maintenance',
    description: 'Modernisation intégrale de votre vieux site web : nouveau design premium, code moderne et compatibilité mobile parfaite.',
    profiles: ['pme', 'artisans', 'commerces', 'associations', 'professions-liberales'],
    tags: ['Modernisation Complète', 'Design Contemporain', 'Conservation du SEO'],
    icon: RefreshCw
  }
];

const strategicPillars = [
  {
    id: 'vitrines',
    badge: 'Pôle 01',
    title: 'Sites Vitrines & Portails Professionnels',
    subtitle: 'Conception sur-mesure pour PME, artisans et indépendants',
    desc: 'Des sites ultra-rapides, élégants et conçus sans aucun constructeur de page lourd. Chaque page valorise vos compétences et guide le visiteur vers la prise de contact.',
    pricing: 'Dès 690 € (One-Page) ou 1 350 € (3-5 pages)',
    deliverables: [
      'Design exclusif adapté à votre identité visuelle',
      'Architecture légère & temps de chargement éclair (< 500ms)',
      'Optimisation SEO technique initiale et indexation Google',
      'Code 100% propriétaire sans abonnement mensuel imposé'
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'SSG'],
    icon: Globe
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
      'Tunnel de commande optimisé sans étapes superflues'
    ],
    tech: ['Stripe', 'Node.js', 'Firebase', 'Cloud Functions'],
    icon: ShoppingCart
  },
  {
    id: 'apps',
    badge: 'Pôle 03',
    title: 'Applications Web, Mobiles & Outils SaaS',
    subtitle: 'Logiciels métier sur-mesure et applications iOS / Android',
    desc: 'Automatisez vos processus internes ou lancez votre produit digital avec une application sur-mesure rapide, accessible sur tous les supports sans contrainte d\'installation.',
    pricing: 'Sur devis basé sur un TJM de 350 €',
    deliverables: [
      'Tableaux de bord dynamiques et gestion de données en direct',
      'Espaces membres sécurisés avec gestion fine des permissions',
      'Développement d\'APIs REST et interconnexion avec vos logiciels',
      'Applications mobiles cross-platform Android et iOS'
    ],
    tech: ['React', 'TypeScript', 'Tailwind', 'API REST'],
    icon: Smartphone
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
      'Refonte esthétique et technique vers un code moderne'
    ],
    tech: ['Audits Google', 'SSL', 'Debug React/JS', 'SEO Migration'],
    icon: Wrench
  }
];

const faqs = [
  {
    question: 'Comment choisir la prestation la plus adaptée à mon besoin ?',
    answer: 'Si votre objectif principal est de présenter votre activité, rassurer vos prospects et recevoir des demandes de devis, un site vitrine (Pack Présence ou Pack Croissance) est la solution idéale. Si vous avez besoin d\'automatiser un flux opérationnel (gestion de réservations, calculs métiers, espace adhérents ou vente en ligne), je conçois une plateforme web ou une application sur-mesure.'
  },
  {
    question: 'Suis-je réellement 100% propriétaire de mon site et de mon code ?',
    answer: 'Absolument. Contrairement aux agences traditionnelles qui vous enferment dans des abonnements mensuels captifs ou des plateformes propriétaires, vous êtes l\'unique propriétaire de l\'intégralité du code source, du nom de domaine et de vos contenus dès la livraison finale.'
  },
  {
    question: 'Quels sont les délais moyens de réalisation ?',
    answer: 'Pour un site vitrine One-Page ou 3 à 5 pages, le délai moyen de livraison est de 1 à 3 semaines après validation du cadrage et réception de vos contenus. Pour une application web ou un projet SaaS plus complexe, le calendrier est défini précisément dans le cahier des charges initial (généralement 3 à 6 semaines).'
  },
  {
    question: 'Proposez-vous un accompagnement après la mise en ligne ?',
    answer: 'Oui. Chaque livraison s\'accompagne d\'une période de garantie technique pour valider le bon fonctionnement de tous les formulaires et modules. De plus, une prise en main personnalisée vous permet de modifier vos textes et médias en toute autonomie.'
  },
  {
    question: 'Comment obtenir un devis détaillé sans engagement ?',
    answer: 'Il vous suffit de remplir le formulaire de contact en décrivant brièvement vos attentes ou de m\'appeler directement au 07 83 66 60 98. Vous recevrez une étude de faisabilité et une proposition chiffrée claire sous 24 heures ouvrées.'
  }
];

export default function Services() {
  useDocumentMetadata(
    'Prestations & Solutions Web Sur-Mesure | DevSupAi',
    'Découvrez les 47 solutions informatiques et web sur-mesure conçues par Alexandre Pabst (DevSupAi) : création de sites vitrines, e-commerce, applications web et mobiles, SaaS et maintenance technique.',
    '/nos-services'
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeProfile, setActiveProfile] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      if (activeCategory !== 'all' && service.category !== activeCategory) {
        return false;
      }
      if (activeProfile !== 'all' && !service.profiles.includes(activeProfile)) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = service.title.toLowerCase().includes(query);
        const matchesDesc = service.description.toLowerCase().includes(query);
        const matchesTags = service.tags.some((tag) => tag.toLowerCase().includes(query));
        return matchesTitle || matchesDesc || matchesTags;
      }
      return true;
    });
  }, [searchQuery, activeCategory, activeProfile]);

  const selectCategoryFromPillar = (catId: string) => {
    setActiveCategory(catId);
    setActiveProfile('all');
    setSearchQuery('');
    if (typeof document !== 'undefined') {
      const explorerElem = document.getElementById('catalogue-explorer');
      if (explorerElem) {
        explorerElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const isFilteringActive = activeCategory !== 'all' || activeProfile !== 'all' || searchQuery.trim() !== '';

  const resetAllFilters = () => {
    setActiveCategory('all');
    setActiveProfile('all');
    setSearchQuery('');
  };

  return (
    <div style={{ background: 'var(--color-primary-bg)', color: 'var(--color-text-primary)', minHeight: '100vh', paddingTop: '110px' }}>
      
      {/* 1. HERO SECTION */}
      <SectionReveal className="py-12 md:py-20 text-left border-b border-[rgba(245,246,250,0.06)]">
        <div className="wrap max-w-6xl">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2E8FE0]/40 bg-[#2E8FE0]/10 text-xs label-mono text-[#38BDF8] mb-6">
            <Sparkles size={14} className="text-[#38BDF8]" />
            <span>SOLUTIONS INFORMATIQUES & DÉVELOPPEMENT WEB</span>
          </div>

          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight max-w-4xl">
            Des prestations digitales précises, taillées pour vos objectifs réels
          </h1>

          <p className="text-sm sm:text-base text-text-secondary max-w-3xl leading-relaxed mb-10 font-light">
            De la création d'un site vitrine haut de gamme au développement d'un logiciel métier complet, <strong className="text-white font-medium">DevSupAi</strong> conçoit des architectures légères, sécurisées et ultra-rapides sans recourir à des modèles pré-conçus ni imposer d'abonnements captifs.
          </p>

          {/* Value Proposition Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#121729]/80 border border-[rgba(245,246,250,0.08)] mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#2E8FE0]/15 border border-[#2E8FE0]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
                <FileCode size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-snug">Code 100% Propriétaire</div>
                <div className="text-[11px] text-text-secondary">Zéro abonnement captif</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#2E8FE0]/15 border border-[#2E8FE0]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
                <Gauge size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-snug">Performance Éclair</div>
                <div className="text-[11px] text-text-secondary">Chargement &lt; 500ms</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#2E8FE0]/15 border border-[#2E8FE0]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
                <SlidersHorizontal size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-snug">4 Pôles d'Expertise</div>
                <div className="text-[11px] text-text-secondary">47 Solutions ciblées</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#2E8FE0]/15 border border-[#2E8FE0]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
                <UserCheck size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-snug">Interlocuteur Dédié</div>
                <div className="text-[11px] text-text-secondary">Alexandre Pabst (Fondateur)</div>
              </div>
            </div>
          </div>

          {/* Quick Anchor Jumps */}
          <div className="flex flex-wrap items-center gap-3 text-xs label-mono text-text-secondary">
            <span className="text-slate-400">Accès direct :</span>
            <a href="#poles-expertise" className="hover:text-[#38BDF8] transition-colors border-b border-transparent hover:border-[#38BDF8]">
              1. Les 4 Grands Pôles
            </a>
            <span className="text-slate-600">•</span>
            <a href="#catalogue-explorer" className="hover:text-[#38BDF8] transition-colors border-b border-transparent hover:border-[#38BDF8]">
              2. Moteur de Recherche (47 prestations)
            </a>
            <span className="text-slate-600">•</span>
            <a href="#methodologie" className="hover:text-[#38BDF8] transition-colors border-b border-transparent hover:border-[#38BDF8]">
              3. Méthodologie
            </a>
            <span className="text-slate-600">•</span>
            <a href="#faq" className="hover:text-[#38BDF8] transition-colors border-b border-transparent hover:border-[#38BDF8]">
              4. Questions Fréquentes
            </a>
          </div>

        </div>
      </SectionReveal>

      {/* 2. STRATEGIC PILLARS SECTION */}
      <SectionReveal id="poles-expertise" className="py-16 md:py-24 border-b border-[rgba(245,246,250,0.06)]">
        <div className="wrap max-w-6xl">
          
          <div className="max-w-2xl mb-12 text-left">
            <div className="eyebrow mb-2">MES 4 PÔLES D'EXPERTISE</div>
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
              4 Pôles d'Expertise pour Répondre à Chaque Défi
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Plutôt que d'appliquer une solution générique à tous les projets, je structure mon accompagnement autour de 4 spécialités claires.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 text-left">
            {strategicPillars.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="p-7 sm:p-8 rounded-2xl bg-[#121729]/70 border border-[rgba(245,246,250,0.08)] hover:border-[#2E8FE0]/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#2E8FE0]/15 border border-[#2E8FE0]/30 flex items-center justify-center text-[#38BDF8] group-hover:scale-105 transition-transform">
                          <IconComp size={24} />
                        </div>
                        <div>
                          <span className="text-[11px] label-mono text-[#38BDF8] font-bold block uppercase tracking-wider">
                            {pillar.badge}
                          </span>
                          <span className="text-xs text-text-secondary">{pillar.subtitle}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 leading-snug group-hover:text-[#38BDF8] transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6 font-light">
                      {pillar.desc}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="space-y-2.5 mb-6 p-4 rounded-xl bg-[#0B122C]/70 border border-[rgba(245,246,250,0.05)]">
                      <div className="text-[11px] font-bold label-mono text-white uppercase tracking-wider mb-2">
                        Engagements & Livrables Inclus :
                      </div>
                      {pillar.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-text-secondary">
                          <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-6">
                      <span className="text-[11px] text-text-secondary mr-1">Technologies :</span>
                      {pillar.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#18203d] text-slate-300 border border-[rgba(245,246,250,0.06)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 border-t border-[rgba(245,246,250,0.08)] flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs">
                      <span className="text-text-secondary block text-[11px]">Tarification indicative :</span>
                      <strong className="text-[#38BDF8] font-bold">{pillar.pricing}</strong>
                    </div>

                    <button
                      onClick={() => selectCategoryFromPillar(pillar.id)}
                      className="text-xs label-mono text-white bg-[#1B254B] hover:bg-[#2E8FE0] px-4 py-2 rounded-xl transition-all inline-flex items-center gap-1.5 font-bold cursor-target border border-[rgba(245,246,250,0.08)]"
                    >
                      <span>Voir les prestations</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </SectionReveal>

      {/* 3. INTERACTIVE CATALOG & EXPLORER */}
      <SectionReveal id="catalogue-explorer" className="py-16 md:py-24 border-b border-[rgba(245,246,250,0.06)]">
        <div className="wrap max-w-6xl">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-left">
            <div>
              <div className="eyebrow mb-2">EXPLORATEUR COMPLET DES SOLUTIONS</div>
              <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Catalogue Intégral des 47 Prestations
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary mt-2 max-w-2xl font-light">
                Utilisez le moteur de recherche ou filtrez par pôle et profil métier pour découvrir immédiatement la solution adaptée à votre situation.
              </p>
            </div>

            {/* Quick Reset Button if active */}
            {isFilteringActive && (
              <button
                onClick={resetAllFilters}
                className="text-xs text-[#38BDF8] hover:text-white underline self-start md:self-end cursor-target label-mono"
              >
                Réinitialiser tous les filtres
              </button>
            )}
          </div>

          {/* SEARCH & FILTER CONTROLS PANEL */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#121729]/90 border border-[rgba(245,246,250,0.08)] shadow-2xl backdrop-blur-md mb-10 text-left">
            
            {/* Search Input */}
            <div className="relative mb-6">
              <label htmlFor="service-search-input" className="sr-only">
                Rechercher une prestation
              </label>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
              <input
                id="service-search-input"
                type="text"
                placeholder="Rechercher une solution (ex: vitrine artisan, boutique en ligne, réservation, bug, application mobile...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-20 py-3.5 rounded-xl bg-[#070913] border border-[rgba(245,246,250,0.12)] text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#2E8FE0] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Effacer le texte de recherche"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1 bg-[#18203d] rounded"
                >
                  Effacer
                </button>
              )}
            </div>

            {/* Pôle Tabs */}
            <div className="mb-6">
              <div className="text-xs font-bold label-mono text-slate-300 uppercase mb-3 tracking-wider flex items-center gap-2">
                <span>Filtrer par pôle d'expertise :</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-3.5 py-2 rounded-xl text-xs label-mono font-bold transition-all cursor-target ${
                    activeCategory === 'all'
                      ? 'bg-[#2E8FE0] text-white shadow-lg shadow-[#2E8FE0]/30'
                      : 'bg-[#18203d]/70 text-text-secondary hover:text-white hover:bg-[#18203d]'
                  }`}
                >
                  Toutes les expertises ({services.length})
                </button>

                <button
                  onClick={() => setActiveCategory('vitrines')}
                  className={`px-3.5 py-2 rounded-xl text-xs label-mono font-bold transition-all cursor-target flex items-center gap-1.5 ${
                    activeCategory === 'vitrines'
                      ? 'bg-[#2E8FE0] text-white shadow-lg shadow-[#2E8FE0]/30'
                      : 'bg-[#18203d]/70 text-text-secondary hover:text-white hover:bg-[#18203d]'
                  }`}
                >
                  <Globe size={13} />
                  <span>Sites Vitrines ({services.filter(s => s.category === 'vitrines').length})</span>
                </button>

                <button
                  onClick={() => setActiveCategory('ecommerce')}
                  className={`px-3.5 py-2 rounded-xl text-xs label-mono font-bold transition-all cursor-target flex items-center gap-1.5 ${
                    activeCategory === 'ecommerce'
                      ? 'bg-[#2E8FE0] text-white shadow-lg shadow-[#2E8FE0]/30'
                      : 'bg-[#18203d]/70 text-text-secondary hover:text-white hover:bg-[#18203d]'
                  }`}
                >
                  <ShoppingCart size={13} />
                  <span>E-Commerce & SaaS ({services.filter(s => s.category === 'ecommerce').length})</span>
                </button>

                <button
                  onClick={() => setActiveCategory('apps')}
                  className={`px-3.5 py-2 rounded-xl text-xs label-mono font-bold transition-all cursor-target flex items-center gap-1.5 ${
                    activeCategory === 'apps'
                      ? 'bg-[#2E8FE0] text-white shadow-lg shadow-[#2E8FE0]/30'
                      : 'bg-[#18203d]/70 text-text-secondary hover:text-white hover:bg-[#18203d]'
                  }`}
                >
                  <Smartphone size={13} />
                  <span>Apps & Logiciels ({services.filter(s => s.category === 'apps').length})</span>
                </button>

                <button
                  onClick={() => setActiveCategory('maintenance')}
                  className={`px-3.5 py-2 rounded-xl text-xs label-mono font-bold transition-all cursor-target flex items-center gap-1.5 ${
                    activeCategory === 'maintenance'
                      ? 'bg-[#2E8FE0] text-white shadow-lg shadow-[#2E8FE0]/30'
                      : 'bg-[#18203d]/70 text-text-secondary hover:text-white hover:bg-[#18203d]'
                  }`}
                >
                  <Wrench size={13} />
                  <span>Maintenance & Refonte ({services.filter(s => s.category === 'maintenance').length})</span>
                </button>
              </div>
            </div>

            {/* Profile Filter Dropdown / Pills */}
            <div>
              <div className="text-xs font-bold label-mono text-slate-300 uppercase mb-3 tracking-wider flex items-center gap-2">
                <span>Filtrer par secteur d'activité / profil :</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'Tous les profils' },
                  { id: 'artisans', label: 'Artisans & BTP' },
                  { id: 'commerces', label: 'Commerçants & Boutiques' },
                  { id: 'restaurants', label: 'Restaurants & Hôtels' },
                  { id: 'pme', label: 'PME & Entreprises' },
                  { id: 'professions-liberales', label: 'Professions Libérales' },
                  { id: 'associations', label: 'Associations & Écoles' }
                ].map((prof) => (
                  <button
                    key={prof.id}
                    onClick={() => setActiveProfile(prof.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-target ${
                      activeProfile === prof.id
                        ? 'bg-[#38BDF8] text-[#020617] font-bold shadow-md'
                        : 'bg-[#070913] text-text-secondary hover:text-white border border-[rgba(245,246,250,0.06)]'
                    }`}
                  >
                    {prof.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RESULTS BAR */}
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[rgba(245,246,250,0.06)] text-xs text-text-secondary">
            <div>
              Affichage de <strong className="text-white font-bold">{filteredServices.length}</strong> prestation(s) correspondante(s)
            </div>
            {isFilteringActive && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>Filtres actifs appliqués</span>
              </div>
            )}
          </div>

          {/* EMPTY STATE */}
          {filteredServices.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#121729]/50 border border-dashed border-[rgba(245,246,250,0.12)] my-8">
              <div className="w-12 h-12 rounded-full bg-[#18203d] flex items-center justify-center text-text-secondary mx-auto mb-4">
                <Search size={22} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Aucune prestation ne correspond à ces critères</h3>
              <p className="text-xs text-text-secondary mb-6 max-w-md mx-auto">
                Essayez d'élargir votre recherche ou de réinitialiser les filtres pour afficher l'ensemble des prestations.
              </p>
              <button
                onClick={resetAllFilters}
                className="btn btn-primary text-xs px-5 py-2.5 inline-flex items-center gap-2"
                style={{ color: '#020617', background: '#38BDF8' }}
              >
                <span>Afficher tout le catalogue (47 prestations)</span>
              </button>
            </div>
          ) : (
            /* SERVICES GRID */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {filteredServices.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className="p-6 rounded-2xl bg-[#121729]/65 border border-[rgba(245,246,250,0.08)] hover:border-[#2E8FE0]/50 transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
                  >
                    <div>
                      {/* Header Card */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#2E8FE0]/15 border border-[#2E8FE0]/30 flex items-center justify-center text-[#38BDF8] group-hover:scale-105 transition-transform">
                          <IconComponent size={20} />
                        </div>
                        
                        <span className="text-[11px] label-mono px-2.5 py-0.5 rounded-md bg-[#18203d] text-cyan-300 font-semibold border border-[#2E8FE0]/25">
                          {service.category === 'vitrines' && 'Sites Vitrines'}
                          {service.category === 'ecommerce' && 'E-Commerce / SaaS'}
                          {service.category === 'apps' && 'Apps & API'}
                          {service.category === 'maintenance' && 'Maintenance'}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white mb-2.5 group-hover:text-[#38BDF8] transition-colors leading-snug">
                        {service.title}
                      </h3>

                      <p className="text-xs text-text-secondary leading-relaxed mb-5 font-light">
                        {service.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {service.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2 py-0.5 rounded bg-[#070913] border border-[rgba(245,246,250,0.06)] text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-4 border-t border-[rgba(245,246,250,0.06)] flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-cyan-400" />
                        <span>Code propriétaire</span>
                      </span>

                      <Link
                        to={`/#contact?service=${encodeURIComponent(service.title)}`}
                        className="text-xs text-[#38BDF8] font-bold hover:text-white flex items-center gap-1 group-hover:translate-x-0.5 transition-all cursor-target"
                      >
                        <span>Demander un devis</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </SectionReveal>

      {/* 4. METHODOLOGY & QUALITY GUARANTEES */}
      <SectionReveal id="methodologie" className="py-16 md:py-24 border-b border-[rgba(245,246,250,0.06)]">
        <div className="wrap max-w-6xl text-left">
          
          <div className="max-w-3xl mb-14">
            <div className="eyebrow mb-2">MON PROCESSUS D'ACCOMPAGNEMENT</div>
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
              Une Méthodologie Rigoureuse, du Premier Échange à la Mise en Ligne
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Chaque projet fait l'objet d'un suivi transparent sans zone d'ombre technique, avec un calendrier respecté et des étapes de validation claires.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-[#121729]/70 border border-[rgba(245,246,250,0.08)] flex flex-col justify-between">
              <div>
                <span className="text-xs label-mono text-[#38BDF8] font-bold block mb-3">ÉTAPE 01</span>
                <h3 className="text-base font-bold text-white mb-2">Cadrage & Audit Préalable</h3>
                <p className="text-xs text-text-secondary leading-relaxed font-light">
                  Analyse de vos objectifs, choix de l'architecture technique idéale et établissement d'un devis détaillé sans frais cachés.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[rgba(245,246,250,0.06)] text-[11px] text-cyan-300 font-medium">
                Livrable : Cahier des charges clair
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-[#121729]/70 border border-[rgba(245,246,250,0.08)] flex flex-col justify-between">
              <div>
                <span className="text-xs label-mono text-[#38BDF8] font-bold block mb-3">ÉTAPE 02</span>
                <h3 className="text-base font-bold text-white mb-2">Conception Sur-Mesure</h3>
                <p className="text-xs text-text-secondary leading-relaxed font-light">
                  Développement moderne en React/TypeScript sans thème pré-conçu pour garantir un design unique et un code léger.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[rgba(245,246,250,0.06)] text-[11px] text-cyan-300 font-medium">
                Livrable : Prototype interactif
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-[#121729]/70 border border-[rgba(245,246,250,0.08)] flex flex-col justify-between">
              <div>
                <span className="text-xs label-mono text-[#38BDF8] font-bold block mb-3">ÉTAPE 03</span>
                <h3 className="text-base font-bold text-white mb-2">Optimisation & Vitesse</h3>
                <p className="text-xs text-text-secondary leading-relaxed font-light">
                  Tests d'accessibilité, optimisation SEO technique, compression des images WebP et structure taillée pour maximiser les Core Web Vitals.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[rgba(245,246,250,0.06)] text-[11px] text-cyan-300 font-medium">
                Livrable : Rapport de performance
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-[#121729]/70 border border-[rgba(245,246,250,0.08)] flex flex-col justify-between">
              <div>
                <span className="text-xs label-mono text-[#38BDF8] font-bold block mb-3">ÉTAPE 04</span>
                <h3 className="text-base font-bold text-white mb-2">Livraison & Propriété</h3>
                <p className="text-xs text-text-secondary leading-relaxed font-light">
                  Déploiement sur votre domaine, transmission intégrale des accès, formation de prise en main et garantie technique.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[rgba(245,246,250,0.06)] text-[11px] text-cyan-300 font-medium">
                Livrable : Code source & formation
              </div>
            </div>

          </div>

        </div>
      </SectionReveal>

      {/* 5. PRATICAL FAQ SECTION */}
      <SectionReveal id="faq" className="py-16 md:py-24 border-b border-[rgba(245,246,250,0.06)]">
        <div className="wrap max-w-4xl text-left">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="eyebrow justify-center mb-2">QUESTIONS FRÉQUENTES</div>
            <h2 className="section-title text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Tout Savoir sur les Prestations DevSupAi
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary mt-2 font-light">
              Des réponses claires pour aborder votre futur projet en toute sérénité.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-[#121729]/70 border border-[rgba(245,246,250,0.08)] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-target"
                  >
                    <span className="text-sm sm:text-base font-bold text-white">
                      {faq.question}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#18203d] flex items-center justify-center text-[#38BDF8] shrink-0 transition-transform">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-[rgba(245,246,250,0.04)] font-light">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </SectionReveal>

      {/* 6. CALL TO ACTION FINAL BANNER */}
      <SectionReveal className="py-20 bg-[#0B122C]">
        <div className="wrap max-w-4xl text-center">
          
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#121729] to-[#0D1326] border border-[#2E8FE0]/30 shadow-2xl relative overflow-hidden">
            
            <div className="w-14 h-14 rounded-2xl bg-[#2E8FE0]/15 border border-[#2E8FE0]/30 flex items-center justify-center text-[#38BDF8] mx-auto mb-6">
              <Sparkles size={28} />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Un projet digital ou une idée à concrétiser ?
            </h2>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-8 max-w-xl mx-auto font-light">
              Que votre projet corresponde à une prestation précise ou nécessite une étude 100% sur-mesure, discutons-en ensemble. Réponse et devis clair sous 24h ouvrées.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/#contact"
                className="btn btn-primary text-xs px-6 py-3.5 inline-flex items-center gap-2 cursor-target font-bold"
                style={{ color: '#020617', background: '#38BDF8' }}
              >
                <Send size={15} />
                <span>Demander une étude gratuite</span>
              </Link>

              <a
                href="tel:0783666098"
                className="btn btn-ghost text-xs px-6 py-3.5 inline-flex items-center gap-2 cursor-target border border-[rgba(245,246,250,0.15)] text-white hover:bg-[#18203d] font-bold"
              >
                <PhoneCall size={15} className="text-[#38BDF8]" />
                <span>07 83 66 60 98</span>
              </a>
            </div>

            <div className="mt-6 text-[11px] text-slate-400">
              Alexandre Pabst • Développeur Web Freelance • Saint-Mihiel (Meuse, Grand Est & Toute la France)
            </div>

          </div>

        </div>
      </SectionReveal>

    </div>
  );
}
