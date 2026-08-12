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
  ShieldCheck
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

export default function Services() {
  useDocumentMetadata(
    'Nos Prestations & Solutions Web Sur-Mesure | DevSupAi',
    'Découvrez nos 47 prestations informatiques : création de sites vitrines, e-commerce, applications mobiles Android/iOS, SaaS sur-mesure et maintenance technique.',
    '/nos-services'
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeProfile, setActiveProfile] = useState<string>('all');

  const services: ServiceItem[] = [
    // 🌐 1. Développement de sites internet (Vitrines & Présentation)
    {
      id: 'site-vitrine',
      title: 'Création de sites vitrines',
      category: 'vitrines',
      description: 'Conception de sites internet sur-mesure modernes, fluides et optimisés pour séduire vos visiteurs et générer des contacts qualifiés.',
      profiles: ['artisans', 'commerces', 'professions-liberales', 'pme'],
      tags: ['SEO', 'Responsive', 'Design Premium', 'React/Tailwind'],
      icon: Globe
    },
    {
      id: 'site-institutionnel',
      title: 'Création de sites institutionnels',
      category: 'vitrines',
      description: 'Développement de plateformes officielles sécurisées et élégantes pour organismes publics, écoles et grandes organisations.',
      profiles: ['pme', 'associations'],
      tags: ['Sécurité', 'Accessibilité WCAG', 'SSG', 'Architecture'],
      icon: Building2
    },
    {
      id: 'site-professionnel',
      title: 'Création de sites professionnels',
      category: 'vitrines',
      description: 'Présentation claire de vos services avec intégration de formulaires de devis dynamiques et modules d\'interaction client.',
      profiles: ['pme', 'professions-liberales'],
      tags: ['Conversion', 'Formulaires', 'UX/UI', 'Vitesse'],
      icon: Briefcase
    },
    {
      id: 'site-association',
      title: 'Création de sites pour associations',
      category: 'vitrines',
      description: 'Mise en valeur de vos actions, gestion des adhésions, appels aux dons et actualités de votre structure associative.',
      profiles: ['associations'],
      tags: ['Dons', 'Adhésions', 'Blog', 'Événements'],
      icon: UserCheck
    },
    {
      id: 'site-restaurant',
      title: 'Création de sites pour restaurants',
      category: 'vitrines',
      description: 'Menu en ligne interactif, galerie photos gourmande, intégration de la réservation de tables et géolocalisation.',
      profiles: ['restaurants', 'commerces'],
      tags: ['Menu QR Code', 'Réservation', 'Click & Collect', 'Local SEO'],
      icon: Utensils
    },
    {
      id: 'site-artisan',
      title: 'Création de sites pour artisans',
      category: 'vitrines',
      description: 'Vitrine digitale sur-mesure pour maçons, électriciens, plombiers, menuisiers. Mise en avant de vos réalisations et demande de devis express.',
      profiles: ['artisans'],
      tags: ['Référencement Local', 'Demande de Devis', 'Galerie Projets'],
      icon: Store
    },
    {
      id: 'site-commerce',
      title: 'Création de sites pour commerces',
      category: 'vitrines',
      description: 'Renforcez votre visibilité locale, présentez vos produits en magasin et attirez de nouveaux clients en boutique.',
      profiles: ['commerces'],
      tags: ['Google Business', 'Drive-to-Store', 'Catalogue Local'],
      icon: Store
    },
    {
      id: 'site-profession-liberale',
      title: 'Création de sites pour professions libérales',
      category: 'vitrines',
      description: 'Sites épurés et sécurisés pour avocats, médecins, comptables, consultants. Prise de rendez-vous en ligne intégrée.',
      profiles: ['professions-liberales'],
      tags: ['Confidentialité', 'Prise de RDV', 'Design Épuré'],
      icon: Briefcase
    },
    {
      id: 'site-evenementiel',
      title: 'Création de sites événementiels',
      category: 'vitrines',
      description: 'Sites éphémères ou récurrents pour salons, conférences, mariages, festivals avec billetterie et programme interactif.',
      profiles: ['associations', 'pme'],
      tags: ['Countdown', 'Billetterie', 'Programme', 'Inscriptions'],
      icon: Calendar
    },
    {
      id: 'landing-page',
      title: 'Création de landing pages à forte conversion',
      category: 'vitrines',
      description: 'Pages de destination ciblées conçues sur-mesure pour vos campagnes publicitaires (Google Ads, Facebook Ads) maximisant le ROI.',
      profiles: ['pme', 'commerces', 'artisans'],
      tags: ['Copywriting', 'A/B Testing', 'Fast Load', 'Call to Action'],
      icon: Zap
    },
    {
      id: 'page-presentation-entreprise',
      title: 'Pages de présentation d\'entreprise',
      category: 'vitrines',
      description: 'Mise en scène de l\'histoire, des valeurs, de l\'équipe et des certifications de votre entreprise pour asseoir votre crédibilité.',
      profiles: ['pme', 'professions-liberales'],
      tags: ['Branding', 'Storytelling', 'Chiffres Clés'],
      icon: Layout
    },
    {
      id: 'portfolio-professionnel',
      title: 'Création de portfolios professionnels',
      category: 'vitrines',
      description: 'Galeries interactives haute résolution pour photographes, architectes, designers, créateurs et agences.',
      profiles: ['professions-liberales', 'artisans'],
      tags: ['Galerie HD', 'Lightroom', 'Animations Fluid'],
      icon: Sparkles
    },
    {
      id: 'creation-blog',
      title: 'Création de blogs & espaces d\'actualités',
      category: 'vitrines',
      description: 'Plateforme éditoriale optimisée pour la rédaction d\'articles, le partage social et le positionnement SEO de longue traîne.',
      profiles: ['pme', 'associations', 'professions-liberales'],
      tags: ['Maillage Interne', 'SEO Content', 'Catégories', 'RSS'],
      icon: BookOpen
    },
    {
      id: 'espace-administrateur',
      title: 'Sites avec espace administrateur sur-mesure',
      category: 'vitrines',
      description: 'Back-office personnalisé intuitif pour gérer en toute autonomie vos contenus, témoignages, textes et médias.',
      profiles: ['pme', 'associations', 'commerces'],
      tags: ['Admin Panel', 'Autonomie', 'Gestion Médias'],
      icon: Lock
    },
    {
      id: 'espace-client',
      title: 'Sites avec espace client sécurisé',
      category: 'vitrines',
      description: 'Portail privé permettant à vos clients de consulter leurs documents, factures, projets en cours et messages.',
      profiles: ['pme', 'professions-liberales'],
      tags: ['Auth Sécurisée', 'Téléchargement PDF', 'Portail Privé'],
      icon: UserCheck
    },
    {
      id: 'site-sur-mesure',
      title: 'Développement de sites internet 100% sur-mesure',
      category: 'vitrines',
      description: 'Conception intégrale sans template ni contrainte technique, adaptée exactement à votre cahier des charges.',
      profiles: ['pme', 'artisans', 'commerces', 'associations', 'professions-liberales'],
      tags: ['Code Propre', 'Performance Extreme', 'Zero Template'],
      icon: Code2
    },

    // 🛒 2. E-commerce & Applications Web / SaaS
    {
      id: 'site-ecommerce',
      title: 'Développement de sites e-commerce',
      category: 'ecommerce',
      description: 'Boutiques en ligne performantes et sécurisées avec gestion de catalogue, moyens de paiement multiples et suivi des ventes.',
      profiles: ['commerces', 'artisans', 'pme'],
      tags: ['Stripe / PayPal', 'Click & Collect', 'Gestion Stocks'],
      icon: ShoppingCart
    },
    {
      id: 'catalogue-produits',
      title: 'Catalogues de produits en ligne',
      category: 'ecommerce',
      description: 'Présentation détaillée de vos gammes de produits sans vente directe, idéale pour la demande de devis B2B.',
      profiles: ['commerces', 'artisans', 'pme'],
      tags: ['Filtres Avancés', 'Fiches PDF', 'Demande de Devis'],
      icon: Layers
    },
    {
      id: 'systeme-panier',
      title: 'Systèmes de panier & paiement en ligne',
      category: 'ecommerce',
      description: 'Module de panier d\'achat fluide avec calcul automatique des frais de port et tunnels d\'achat optimisés.',
      profiles: ['commerces', 'pme'],
      tags: ['Tunnel d\'Achat', 'Code Promo', 'Paiement Sécurisé'],
      icon: ShoppingCart
    },
    {
      id: 'commande-en-ligne',
      title: 'Systèmes de commande en ligne',
      category: 'ecommerce',
      description: 'Solution sur-mesure pour la prise de commande rapide pour grossistes, traiteurs, restaurants et commerces.',
      profiles: ['restaurants', 'commerces', 'artisans'],
      tags: ['Commandes Express', 'Facturation', 'Notifications'],
      icon: ShoppingCart
    },
    {
      id: 'reservation-en-ligne',
      title: 'Systèmes de réservation en ligne',
      category: 'ecommerce',
      description: 'Modules de réservation de créneaux, chambres, équipements ou prestations avec synchronisation d\'agenda.',
      profiles: ['restaurants', 'professions-liberales', 'artisans'],
      tags: ['Agenda Sync', 'Rappels SMS/Email', 'Acompte en ligne'],
      icon: Calendar
    },
    {
      id: 'developpement-espace-client',
      title: 'Développement d\'espaces clients sur-mesure',
      category: 'ecommerce',
      description: 'Dashboards dynamiques permettant à vos utilisateurs de suivre leurs commandes, abonnements et statistiques.',
      profiles: ['pme', 'professions-liberales'],
      tags: ['React Dashboard', 'API Rest', 'Chart.js'],
      icon: UserCheck
    },
    {
      id: 'tableau-de-bord-web',
      title: 'Tableaux de bord & Dashboards analytiques',
      category: 'ecommerce',
      description: 'Visualisation en temps réel de vos données d\'entreprise, KPIs, indicateurs de ventes et gestion d\'équipe.',
      profiles: ['pme'],
      tags: ['Analytics', 'Graphiques', 'Realtime Firebase'],
      icon: Layout
    },
    {
      id: 'back-offices',
      title: 'Développement de back-offices d\'administration',
      category: 'ecommerce',
      description: 'Outils d\'administration internes conçus spécifiquement pour piloter vos opérations métiers au quotidien.',
      profiles: ['pme', 'commerces'],
      tags: ['CRUD', 'Rôles & Permissions', 'Audit Log'],
      icon: Lock
    },
    {
      id: 'plateformes-personnalisees',
      title: 'Plateformes web personnalisées',
      category: 'ecommerce',
      description: 'Développement d\'applications web complexes sur-mesure répondant à des processus métiers uniques.',
      profiles: ['pme', 'professions-liberales'],
      tags: ['Fullstack', 'Scalabilité', 'Microservices'],
      icon: Database
    },
    {
      id: 'marketplaces',
      title: 'Développement de marketplaces informatiques',
      category: 'ecommerce',
      description: 'Plateformes de mise en relation vendeurs/acheteurs avec gestion des commissions et paiements tiers.',
      profiles: ['pme', 'commerces'],
      tags: ['Multi-vendeurs', 'Stripe Connect', 'Commissions'],
      icon: ShoppingCart
    },
    {
      id: 'gestion-en-ligne',
      title: 'Systèmes de gestion en ligne (ERP / CRM Web)',
      category: 'ecommerce',
      description: 'Logiciels de gestion clients, devis, factures et stocks centralisés accessibles depuis le cloud.',
      profiles: ['pme', 'artisans'],
      tags: ['CRM', 'Facturation', 'Cloud Storage'],
      icon: Building2
    },
    {
      id: 'logiciels-navigateur',
      title: 'Logiciels accessibles depuis un navigateur',
      category: 'ecommerce',
      description: 'Applications web sans installation nécessaire, utilisables sur ordinateurs, tablettes et smartphones.',
      profiles: ['pme', 'professions-liberales'],
      tags: ['PWA', 'Cross-Platform', 'Zero Install'],
      icon: Globe
    },
    {
      id: 'developpement-saas',
      title: 'Développement de SaaS & outils web internes',
      category: 'ecommerce',
      description: 'Création de produits logiciels d\'abonnement (Software as a Service) et outils métiers pour automatiser vos tâches.',
      profiles: ['pme'],
      tags: ['Multi-tenant', 'Subscriptions', 'SaaS Architecture'],
      icon: Cpu
    },

    // 📱 3. Applications et logiciels
    {
      id: 'apps-mobiles',
      title: 'Développement d\'applications mobiles',
      category: 'apps',
      description: 'Applications mobiles natives et hybrides modernes avec expérience utilisateur fluide et notifications push.',
      profiles: ['pme', 'commerces'],
      tags: ['iOS', 'Android', 'React Native', 'App Store'],
      icon: Smartphone
    },
    {
      id: 'apps-android',
      title: 'Développement d\'applications Android',
      category: 'apps',
      description: 'Applications Android optimisées pour téléphones et tablettes publiées sur le Google Play Store.',
      profiles: ['pme', 'commerces'],
      tags: ['Google Play', 'Android Studio', 'Kotlin / React'],
      icon: Smartphone
    },
    {
      id: 'apps-ios',
      title: 'Développement d\'applications iOS (iPhone / iPad)',
      category: 'apps',
      description: 'Applications fluides respectant les normes strictes d\'ergonomie et de sécurité Apple pour l\'App Store.',
      profiles: ['pme', 'commerces'],
      tags: ['Apple App Store', 'Swift / React', 'iOS UX'],
      icon: Smartphone
    },
    {
      id: 'apps-multiplateformes',
      title: 'Applications mobiles multiplateformes',
      category: 'apps',
      description: 'Développement d\'une seule codebase alimentant simultanément les versions Android, iOS et Web.',
      profiles: ['pme', 'commerces'],
      tags: ['Code Unique', 'Gain de Temps', 'Économique'],
      icon: Smartphone
    },
    {
      id: 'logiciels-personnalises',
      title: 'Développement de logiciels personnalisés',
      category: 'apps',
      description: 'Programmes informatiques taillés exactement sur-mesure pour résoudre vos défis opérationnels uniques.',
      profiles: ['pme', 'professions-liberales'],
      tags: ['Sur-Mesure', 'Cahier des charges', 'Support'],
      icon: Code2
    },
    {
      id: 'logiciels-de-gestion',
      title: 'Logiciels de gestion sur-mesure',
      category: 'apps',
      description: 'Outils informatiques de suivi d\'activité, de planning, de ressources humaines et de comptabilité.',
      profiles: ['pme', 'artisans'],
      tags: ['Gestion', 'Planning', 'Exports Excel/PDF'],
      icon: Building2
    },
    {
      id: 'outils-metier',
      title: 'Développement d\'outils métier spécifiques',
      category: 'apps',
      description: 'Calculateurs, générateurs de documents, systèmes de contrôle qualité adaptés aux exigences de votre profession.',
      profiles: ['professions-liberales', 'artisans', 'pme'],
      tags: ['Automatisation', 'Calculs', 'Fichiers Pro'],
      icon: Wrench
    },
    {
      id: 'systemes-automatises',
      title: 'Systèmes automatisés & workflows',
      category: 'apps',
      description: 'Connexion de vos logiciels pour automatiser le transfert de données, l\'envoi d\'emails et la génération de rapports.',
      profiles: ['pme', 'commerces'],
      tags: ['Webhooks', 'Zapter', 'Automation API'],
      icon: Zap
    },
    {
      id: 'developpement-api',
      title: 'Développement d\'API & Web Services',
      category: 'apps',
      description: 'Création d\'APIs RESTful performantes et sécurisées permettant à vos applications et partenaires de s\'interconnecter.',
      profiles: ['pme'],
      tags: ['REST API', 'JSON', 'JWT Auth', 'Swagger'],
      icon: Server
    },

    // 🔧 4. Maintenance et prestations informatiques
    {
      id: 'maintenance-technique',
      title: 'Maintenance technique de sites internet',
      category: 'maintenance',
      description: 'Contrats de maintenance préventive et corrective : sauvegardes automatisées, mises à jour et surveillance 24/7.',
      profiles: ['pme', 'artisans', 'commerces', 'associations', 'professions-liberales'],
      tags: ['Backups', 'Securité', 'Uptime', 'Mises à jour'],
      icon: ShieldCheck
    },
    {
      id: 'bug-correction-site',
      title: 'Correction de bugs sur des sites internet',
      category: 'maintenance',
      description: 'Intervention rapide pour diagnostiquer et corriger les erreurs d\'affichage, blocages ou failles sur votre site.',
      profiles: ['pme', 'artisans', 'commerces', 'associations'],
      tags: ['Dépannage Express', 'Fix CSS/JS', 'Base de données'],
      icon: Bug
    },
    {
      id: 'bug-correction-app',
      title: 'Correction de bugs sur des applications web & mobiles',
      category: 'maintenance',
      description: 'Résolution des crashs, erreurs d\'API, fuites de mémoire ou incompatibilités navigateurs.',
      profiles: ['pme'],
      tags: ['Debug React', 'API Fix', 'Performance'],
      icon: Bug
    },
    {
      id: 'ajout-fonctionnalites-site',
      title: 'Ajout de fonctionnalités sur un site existant',
      category: 'maintenance',
      description: 'Intégration de nouveaux modules : formulaire dynamique, système de paiement, multilingue, carte interactive.',
      profiles: ['pme', 'artisans', 'commerces', 'associations'],
      tags: ['Module Additionnel', 'Évolution', 'Sans Refonte'],
      icon: RefreshCw
    },
    {
      id: 'ajout-fonctionnalites-app',
      title: 'Évolutions & ajouts de fonctions sur vos applications',
      category: 'maintenance',
      description: 'Faites évoluer votre application métier ou mobile selon vos nouveaux besoins opérationnels.',
      profiles: ['pme'],
      tags: ['Nouvelles Features', 'Scale', 'Refactoring'],
      icon: RefreshCw
    },
    {
      id: 'mise-a-jour-technique',
      title: 'Mises à jour techniques & sécurité',
      category: 'maintenance',
      description: 'Mise à niveau des dépendances, correctifs de sécurité et compatibilité avec les dernières normes navigateurs.',
      profiles: ['pme', 'commerces', 'associations'],
      tags: ['Patch Sécurité', 'Updates NPM', 'SSL'],
      icon: ShieldCheck
    },
    {
      id: 'optimisation-technique',
      title: 'Optimisation de la vitesse & performance web',
      category: 'maintenance',
      description: 'Audit et amélioration des temps de chargement pour obtenir un score 100/100 sur Google Lighthouse et booster votre SEO.',
      profiles: ['pme', 'commerces', 'artisans', 'professions-liberales'],
      tags: ['Lighthouse 100/100', 'Core Web Vitals', 'Cache'],
      icon: Zap
    },
    {
      id: 'migration-technique',
      title: 'Migration technique de sites & serveurs',
      category: 'maintenance',
      description: 'Transfert sécurisé de votre site vers un nouvel hébergeur ou une nouvelle architecture sans perte de référencement.',
      profiles: ['pme', 'commerces'],
      tags: ['Migration DNS', 'Base de données', 'Zéro Coupure'],
      icon: Server
    },
    {
      id: 'refonte-technique',
      title: 'Refonte technique & esthétique complète',
      category: 'maintenance',
      description: 'Modernisation intégrale de votre vieux site web : nouveau design premium, code moderne et compatibilité mobile parfaite.',
      profiles: ['pme', 'artisans', 'commerces', 'associations', 'professions-liberales'],
      tags: ['Modernisation', 'Responsive', 'SEO Migration'],
      icon: RefreshCw
    }
  ];

  // Filtered Services based on search, category and profile
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      // Category filter
      if (activeCategory !== 'all' && service.category !== activeCategory) {
        return false;
      }
      // Profile filter
      if (activeProfile !== 'all' && !service.profiles.includes(activeProfile)) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = service.title.toLowerCase().includes(query);
        const matchesDesc = service.description.toLowerCase().includes(query);
        const matchesTags = service.tags.some((tag) => tag.toLowerCase().includes(query));
        return matchesTitle || matchesDesc || matchesTags;
      }
      return true;
    });
  }, [searchQuery, activeCategory, activeProfile]);

  return (
    <div style={{ background: 'var(--color-bg-deep)', color: 'var(--color-text-primary)', minHeight: '100vh', paddingTop: '120px' }}>
      {/* HERO SECTION */}
      <SectionReveal className="section-pad text-left">
        <div className="wrap max-w-6xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2E8FE0]/30 bg-[#2E8FE0]/10 text-xs label-mono text-[#2E8FE0] mb-4">
            <Sparkles size={14} />
            <span>CATALOGUE EXHAUSTIF DE NOS 47 PRESTATIONS</span>
          </div>

          <h1 className="hero-title text-4xl md:text-5xl font-extrabold text-text-primary mb-6 leading-tight">
            Toutes nos activités & solutions informatiques sur‑mesure
          </h1>

          <p className="text-sm md:text-base text-text-secondary max-w-3xl leading-relaxed mb-10">
            De la création de votre site internet à la maintenance de vos applications métier, découvrez l'ensemble des prestations assurées par <strong className="text-text-primary">DevSupAi</strong>. Utilisez le moteur de recherche ou filtrez selon votre besoin pour trouver la solution exacte.
          </p>

          {/* SEARCH BAR & QUICK FILTERS */}
          <div className="p-6 rounded-2xl bg-[#121729]/80 border border-[rgba(245,246,250,0.08)] shadow-2xl backdrop-blur-md mb-12">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
              <input
                type="text"
                placeholder="Rechercher une prestation (ex: boutique, réservation, application mobile, bugs, devis...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#070913] border border-[rgba(245,246,250,0.12)] text-text-primary text-sm focus:outline-none focus:border-[#2E8FE0] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-text-secondary hover:text-text-primary"
                >
                  Effacer
                </button>
              )}
            </div>

            {/* CATEGORY TABS */}
            <div className="mb-6">
              <div className="text-xs font-bold label-mono text-text-secondary uppercase mb-3 tracking-wider">
                1. Filtrer par pôle d'expertise :
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-3.5 py-2 rounded-xl text-xs label-mono font-bold transition-all cursor-target ${
                    activeCategory === 'all'
                      ? 'bg-[#2E8FE0] text-white shadow-lg shadow-[#2E8FE0]/25'
                      : 'bg-[#1b223d]/60 text-text-secondary hover:text-text-primary hover:bg-[#1b223d]'
                  }`}
                >
                  Toutes les expertises ({services.length})
                </button>

                <button
                  onClick={() => setActiveCategory('vitrines')}
                  className={`px-3.5 py-2 rounded-xl text-xs label-mono font-bold transition-all cursor-target flex items-center gap-1.5 ${
                    activeCategory === 'vitrines'
                      ? 'bg-[#2E8FE0] text-white shadow-lg shadow-[#2E8FE0]/25'
                      : 'bg-[#1b223d]/60 text-text-secondary hover:text-text-primary hover:bg-[#1b223d]'
                  }`}
                >
                  <Globe size={13} />
                  <span>Sites Internet & Vitrines</span>
                </button>

                <button
                  onClick={() => setActiveCategory('ecommerce')}
                  className={`px-3.5 py-2 rounded-xl text-xs label-mono font-bold transition-all cursor-target flex items-center gap-1.5 ${
                    activeCategory === 'ecommerce'
                      ? 'bg-[#2E8FE0] text-white shadow-lg shadow-[#2E8FE0]/25'
                      : 'bg-[#1b223d]/60 text-text-secondary hover:text-text-primary hover:bg-[#1b223d]'
                  }`}
                >
                  <ShoppingCart size={13} />
                  <span>E-Commerce, SaaS & Plateformes</span>
                </button>

                <button
                  onClick={() => setActiveCategory('apps')}
                  className={`px-3.5 py-2 rounded-xl text-xs label-mono font-bold transition-all cursor-target flex items-center gap-1.5 ${
                    activeCategory === 'apps'
                      ? 'bg-[#2E8FE0] text-white shadow-lg shadow-[#2E8FE0]/25'
                      : 'bg-[#1b223d]/60 text-text-secondary hover:text-text-primary hover:bg-[#1b223d]'
                  }`}
                >
                  <Smartphone size={13} />
                  <span>Apps Mobiles, Software & API</span>
                </button>

                <button
                  onClick={() => setActiveCategory('maintenance')}
                  className={`px-3.5 py-2 rounded-xl text-xs label-mono font-bold transition-all cursor-target flex items-center gap-1.5 ${
                    activeCategory === 'maintenance'
                      ? 'bg-[#2E8FE0] text-white shadow-lg shadow-[#2E8FE0]/25'
                      : 'bg-[#1b223d]/60 text-text-secondary hover:text-text-primary hover:bg-[#1b223d]'
                  }`}
                >
                  <Wrench size={13} />
                  <span>Maintenance, Refonte & Support</span>
                </button>
              </div>
            </div>

            {/* PROFILE TABS */}
            <div>
              <div className="text-xs font-bold label-mono text-text-secondary uppercase mb-3 tracking-wider">
                2. Filtrer par profil & activité professionnelle :
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'Tous les profils' },
                  { id: 'artisans', label: '🔨 Artisans' },
                  { id: 'commerces', label: '🏪 Commerçants' },
                  { id: 'restaurants', label: '🍽️ Restaurants & Cafés' },
                  { id: 'pme', label: '🏢 PME & Entreprises' },
                  { id: 'professions-liberales', label: '⚖️ Professions Libérales' },
                  { id: 'associations', label: '🤝 Associations & Écoles' }
                ].map((prof) => (
                  <button
                    key={prof.id}
                    onClick={() => setActiveProfile(prof.id)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors cursor-target ${
                      activeProfile === prof.id
                        ? 'bg-purple-600 text-white font-bold'
                        : 'bg-[#070913] text-text-secondary hover:text-text-primary border border-[rgba(245,246,250,0.06)]'
                    }`}
                  >
                    {prof.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ACTIVE FILTERS SUMMARY & COUNT */}
          <div className="flex justify-between items-center mb-8 border-b border-[rgba(245,246,250,0.06)] pb-4">
            <div className="text-xs label-mono text-text-secondary">
              Affichage de <strong className="text-text-primary">{filteredServices.length}</strong> prestation(s) trouvée(s)
            </div>
            {(activeCategory !== 'all' || activeProfile !== 'all' || searchQuery !== '') && (
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setActiveProfile('all');
                  setSearchQuery('');
                }}
                className="text-xs text-[#2E8FE0] hover:underline cursor-target"
              >
                Réinitialiser tous les filtres
              </button>
            )}
          </div>

          {/* BENTO GRID OF SERVICES */}
          {filteredServices.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#121729]/40 border border-dashed border-[rgba(245,246,250,0.08)]">
              <p className="text-base text-text-primary font-bold mb-2">Aucune prestation ne correspond à votre recherche.</p>
              <p className="text-xs text-text-secondary mb-6">Essayez de modifier votre terme de recherche ou de réinitialiser les filtres.</p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setActiveProfile('all');
                  setSearchQuery('');
                }}
                className="btn btn-primary text-xs px-5 py-2.5"
              >
                Voir toutes les prestations
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className="p-6 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.08)] hover:border-[#2E8FE0]/40 transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#2E8FE0]/10 border border-[#2E8FE0]/30 flex items-center justify-center text-[#2E8FE0] group-hover:scale-105 transition-transform">
                          <IconComponent size={20} />
                        </div>
                        <span className="text-[10px] label-mono px-2.5 py-1 rounded-full bg-[#1b223d] text-purple-300 font-semibold border border-purple-500/20">
                          {service.category === 'vitrines' && 'Sites Vitrines'}
                          {service.category === 'ecommerce' && 'E-Commerce & SaaS'}
                          {service.category === 'apps' && 'Apps & API'}
                          {service.category === 'maintenance' && 'Maintenance'}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-text-primary mb-2 group-hover:text-[#2E8FE0] transition-colors leading-snug">
                        {service.title}
                      </h3>

                      <p className="text-xs text-text-secondary leading-relaxed mb-4">
                        {service.description}
                      </p>

                      {/* TAGS */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {service.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded bg-[rgba(245,246,250,0.04)] border border-[rgba(245,246,250,0.06)] text-text-secondary"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[rgba(245,246,250,0.06)] flex items-center justify-between">
                      <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        <span>Prestation garantie</span>
                      </span>

                      <Link
                        to={`/#contact?service=${encodeURIComponent(service.title)}`}
                        className="text-xs text-[#2E8FE0] font-bold hover:underline flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-target"
                      >
                        <span>Devis sur-mesure</span>
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

      {/* CALL TO ACTION BOTTOM BANNER */}
      <SectionReveal className="section-pad bg-[#121729]/80 border-t border-[rgba(245,246,250,0.06)] mt-20">
        <div className="wrap max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-4">
            Vous ne trouvez pas la prestation exacte dans la liste ?
          </h2>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
            DevSupAi réalise tout projet informatique et digital 100% sur-mesure. Contactez-moi directement pour me décrire votre projet et obtenir une étude de faisabilité gratuite sous 24h.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/#contact" className="btn btn-primary text-xs px-6 py-3 cursor-target">
              Discuter de mon projet
            </Link>
            <a href="tel:0783666098" className="btn btn-ghost text-xs px-6 py-3 cursor-target border border-[rgba(245,246,250,0.12)]">
              Appeler le 07 83 66 60 98
            </a>
          </div>
        </div>
      </SectionReveal>
    </div>
  );
}
