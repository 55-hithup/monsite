import React, { useState } from 'react';
import { 
  type LucideIcon,
  Star, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Database, 
  MapPin, 
  Layout, 
  Sparkles, 
  Smartphone, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  Laptop
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface GlacierOffersProps {
  onNavClick?: (targetId: string) => void;
}

type OfferId = 'presence' | 'croissance' | 'saas' | 'google';

interface OfferData {
  id: OfferId;
  name: string;
  price: string;
  badge?: string;
  isPopular?: boolean;
  shortDesc: string;
  tags: string;
  preview: {
    categoryBadge: string;
    headline: string;
    subheadline: string;
    icon: LucideIcon;
    metrics: { label: string; value: string; icon: LucideIcon }[];
    features: string[];
    tagBottom: string;
  };
}

export default function GlacierOffers({ onNavClick }: GlacierOffersProps) {
  const [activeOfferId, setActiveOfferId] = useState<OfferId>('croissance');
  const { isEn } = useLanguage();

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (onNavClick) {
      onNavClick(targetId);
      return;
    }
    if (typeof window !== 'undefined') {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const offers: OfferData[] = isEn ? [
    {
      id: 'presence',
      name: 'PRESENCE PACK (ONE-PAGE)',
      price: 'FROM €950',
      shortDesc: 'An elegant and impactful landing page to present your activity, hours, location, and convert visitors into direct inquiries.',
      tags: 'Single Page • Contact Form • Local SEO • Optimized Loading',
      preview: {
        categoryBadge: 'ARTISANAL SHOWCASE & ONE-PAGE',
        headline: 'High-Conversion Landing Page',
        subheadline: 'A bespoke single-page interface crafted to turn visitors into qualified contacts.',
        icon: Smartphone,
        metrics: [
          { label: 'Performance', value: 'Optimized Loading', icon: Zap },
          { label: 'Delivery Time', value: '1 to 2 weeks', icon: Clock },
          { label: 'Hosting & SSL', value: 'Included (Yr 1)', icon: ShieldCheck }
        ],
        features: [
          'Fluid mobile-first design engineered without bloated CMS',
          'Secure contact form with direct instant email notification',
          'Interactive Google Maps location and opening hours',
          '100% proprietary source code with zero subscription lock-in'
        ],
        tagBottom: 'ONE-PAGE SHOWCASE • FROM €950'
      }
    },
    {
      id: 'croissance',
      name: 'SME & COMMERCE GROWTH PACK',
      price: 'FROM €1,850',
      isPopular: true,
      badge: 'POPULAR',
      shortDesc: 'The complete multi-page solution: 3 to 5 custom pages, HD project/works gallery, verified Google reviews, and guided quote module.',
      tags: '3 to 5 Pages • Local & Regional SEO • Dynamic Gallery • Training Included',
      preview: {
        categoryBadge: 'MULTI-PAGE ECOSYSTEM & SEO',
        headline: 'Complete SME & Retail Showcase',
        subheadline: '3 to 5 tailor-made pages structured to rank high in local searches.',
        icon: Layers,
        metrics: [
          { label: 'Architecture', value: '3 to 5 pages', icon: Layout },
          { label: 'Delivery Time', value: '2 to 3 weeks', icon: Clock },
          { label: 'SEO Markup', value: 'Schema.org Local', icon: Globe }
        ],
        features: [
          'High-definition interactive gallery for your projects and products',
          'Integration and prominent display of verified Google reviews',
          'Targeted local and regional search engine optimization',
          'Guided quote request form and complete video training included'
        ],
        tagBottom: 'POPULAR SOLUTION • FROM €1,850'
      }
    },
    {
      id: 'saas',
      name: 'SAAS PACK & BESPOKE WEB APP',
      price: 'FROM €3,200',
      shortDesc: 'Internal business management tools, non-profit member portals, live inventory tracking, and automated PDF invoice generation.',
      tags: 'SQL Database • React 19 Frontend • Secure Auth • Daily Rate €400/day',
      preview: {
        categoryBadge: 'WEB APPLICATION & DASHBOARD',
        headline: 'Tailor-Made Business Software',
        subheadline: 'Automate your administrative workflows and live business operations.',
        icon: Database,
        metrics: [
          { label: 'Tech Stack', value: 'React 19 & SQL', icon: Laptop },
          { label: 'Delivery Time', value: '4 to 6 weeks', icon: Clock },
          { label: 'Software License', value: '€0 / month', icon: ShieldCheck }
        ],
        features: [
          'Custom operations dashboard and real-time inventory tracking',
          'Automated generation of compliant PDF quotes and invoices',
          'Secure members area with role-based permission management',
          'Full ownership of the source code and complete database'
        ],
        tagBottom: 'CUSTOM SOFTWARE • FROM €3,200'
      }
    },
    {
      id: 'google',
      name: 'GOOGLE BUSINESS PROFILE MANAGEMENT',
      price: 'FROM €29 / MONTH',
      shortDesc: 'Optimization of your Google Maps listing, monthly publication of updates and projects, personalized review responses, and statistics.',
      tags: 'Google Maps Ranking • Online Reputation • No Commitment',
      preview: {
        categoryBadge: 'LOCAL SEO & GOOGLE MAPS',
        headline: 'Local Visibility & E-Reputation',
        subheadline: 'Attract local customers searching for your services on Google.',
        icon: MapPin,
        metrics: [
          { label: 'Maps Presence', value: 'Top positions', icon: MapPin },
          { label: 'Review Moderation', value: 'Reply < 24h', icon: Star },
          { label: 'Commitment', value: 'No contract', icon: ShieldCheck }
        ],
        features: [
          'Complete optimization of your Google Business Profile listing',
          'Monthly publication of news, new projects, and promotions',
          'Thoughtful and personal responses to 100% of customer reviews',
          'Clear monthly report tracking calls, website clicks, and directions'
        ],
        tagBottom: 'GOOGLE MAPS & REVIEWS • FROM €29 / MONTH'
      }
    }
  ] : [
    {
      id: 'presence',
      name: 'PACK PRÉSENCE (ONE-PAGE)',
      price: 'DÈS 950 €',
      shortDesc: "Une page d'atterrissage élégante et percutante pour présenter votre activité, vos horaires, vos coordonnées et rassurer immédiatement vos futurs clients.",
      tags: 'Page unique • Formulaire de contact • Référencement Google • Chargement optimisé',
      preview: {
        categoryBadge: 'VITRINE ARTISANALE & ONE-PAGE',
        headline: 'Landing Page Haute Conversion',
        subheadline: 'Une page unique ciselée pour convertir chaque visiteur en contact direct.',
        icon: Smartphone,
        metrics: [
          { label: 'Performance', value: 'Chargement optimisé', icon: Zap },
          { label: 'Délais de livraison', value: '1 à 2 semaines', icon: Clock },
          { label: 'Hébergement & SSL', value: 'Inclus (an 1)', icon: ShieldCheck }
        ],
        features: [
          'Conception mobile-first ultra-fluide sans CMS lourd',
          'Formulaire de contact sécurisé avec notification email directe',
          'Plan Google Maps interactif et horaires d’ouverture',
          'Code source 100% propriétaire sans abonnement captif'
        ],
        tagBottom: 'ONE-PAGE SUR-MESURE • DÈS 950 €'
      }
    },
    {
      id: 'croissance',
      name: 'PACK CROISSANCE PME & COMMERCE',
      price: 'DÈS 1 850 €',
      isPopular: true,
      badge: 'POPULAIRE',
      shortDesc: "La solution complète pour développer votre chiffre d'affaires : 3 à 5 pages sur-mesure, galerie de vos chantiers/réalisations, avis Google vérifiés et module interactif adapté.",
      tags: 'Architecture 3 à 5 pages • SEO Local Grand Est & France • Galerie dynamique • Formation incluse',
      preview: {
        categoryBadge: 'ÉCOSYSTÈME MULTI-PAGES & SEO',
        headline: 'Vitrine Complète PME & Commerce',
        subheadline: '3 à 5 pages sur-mesure taillées pour dominer le référencement local.',
        icon: Layers,
        metrics: [
          { label: 'Architecture', value: '3 à 5 pages', icon: Layout },
          { label: 'Délais de livraison', value: '2 à 3 semaines', icon: Clock },
          { label: 'Balisage SEO', value: 'Schema.org local', icon: Globe }
        ],
        features: [
          'Galerie interactive haute définition pour vos chantiers / produits',
          'Intégration et mise en valeur des avis Google certifiés',
          'Optimisation SEO ciblée Meuse, Grand Est et national',
          'Module de demande de devis guidé et formation vidéo incluse'
        ],
        tagBottom: 'SOLUTION POPULAIRE • DÈS 1 850 €'
      }
    },
    {
      id: 'saas',
      name: 'PACK SAAS & APPLICATION MÉTIER',
      price: 'DÈS 3 200 €',
      shortDesc: "Outils de gestion interne, portails d'adhésions pour associations, suivi d'inventaire en direct et automatisation de devis/factures PDF.",
      tags: 'Base de données SQL • Interface React 19 • Authentification sécurisée • Base TJM 400 € / j',
      preview: {
        categoryBadge: 'APPLICATION WEB & DASHBOARD',
        headline: 'Logiciel Métier Sur-Mesure',
        subheadline: 'Automatisez vos flux administratifs et le suivi de vos opérations.',
        icon: Database,
        metrics: [
          { label: 'Stack Technique', value: 'React 19 & SQL', icon: Laptop },
          { label: 'Délais de livraison', value: '4 à 6 semaines', icon: Clock },
          { label: 'Redevance logicielle', value: '0 € / mois', icon: ShieldCheck }
        ],
        features: [
          'Dashboard de pilotage et gestion d’inventaire en direct',
          'Génération automatique de devis et factures PDF',
          'Espace membres sécurisé avec gestion des rôles d’accès',
          'Propriété intégrale du code et de votre base de données'
        ],
        tagBottom: 'APPLICATION SUR-MESURE • DÈS 3 200 €'
      }
    },
    {
      id: 'google',
      name: 'GESTION GOOGLE BUSINESS PROFILE',
      price: 'DÈS 29 € / MOIS',
      shortDesc: "Optimisation de votre présence sur Google Maps, publication mensuelle de vos actualités, réponse personnalisée aux avis clients et suivi statistique.",
      tags: 'Visibilité Google Maps • Veille réputation • Sans engagement',
      preview: {
        categoryBadge: 'RÉFÉRENCEMENT LOCAL & GOOGLE MAPS',
        headline: 'Visibilité Locale & e-Réputation',
        subheadline: 'Attirez les clients de proximité qui recherchent vos services sur Google.',
        icon: MapPin,
        metrics: [
          { label: 'Présence Maps', value: 'Top positions', icon: MapPin },
          { label: 'Modération Avis', value: 'Réponse < 24h', icon: Star },
          { label: 'Engagement', value: 'Sans engagement', icon: ShieldCheck }
        ],
        features: [
          'Optimisation complète de votre fiche Google Business Profile',
          'Publication mensuelle de vos nouveautés, chantiers et promotions',
          'Réponse soignée et humaine à 100% des avis déposés',
          'Rapport mensuel clair sur vos appels, clics et itinéraires'
        ],
        tagBottom: 'GOOGLE MAPS & AVIS • DÈS 29 € / MOIS'
      }
    }
  ];

  const activeOffer = offers.find((o) => o.id === activeOfferId) || offers[1];
  const ActiveIcon = activeOffer.preview.icon;

  return (
    <section className="glacier-split-section" id="services" aria-labelledby="services-title">
      <div className="split-container">
        
        {/* Colonne Gauche : Aperçu Interactif Dynamique au Survol */}
        <div className="split-photo-col">
          <div className="photo-frame-sticky">
            <div className="offers-interactive-preview-card" aria-live="polite">
              
              {/* En-tête de la fenêtre d'aperçu */}
              <div className="preview-card-header">
                <div className="preview-browser-dots" aria-hidden="true">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <div className="preview-card-badge">
                  <ActiveIcon className="w-3.5 h-3.5 text-sky-600 inline mr-1.5" aria-hidden="true" />
                  <span>{activeOffer.preview.categoryBadge}</span>
                </div>
              </div>

              {/* Contenu visuel interactif avec micro-transition fluide au survol */}
              <div key={activeOffer.id} className="preview-card-body animate-glacier-fade-in">
                <div className="preview-title-area">
                  <span className="preview-price-tag">{activeOffer.price}</span>
                  <div className="preview-main-headline">{activeOffer.preview.headline}</div>
                  <p className="preview-subheadline">{activeOffer.preview.subheadline}</p>
                </div>

                {/* Métriques clés */}
                <div className="preview-metrics-grid">
                  {activeOffer.preview.metrics.map((metric, idx) => {
                    const MetricIcon = metric.icon;
                    return (
                      <div key={idx} className="preview-metric-box">
                        <div className="metric-icon-wrap">
                          <MetricIcon className="w-3.5 h-3.5 text-sky-600" aria-hidden="true" />
                        </div>
                        <div className="metric-text-wrap">
                          <span className="metric-label">{metric.label}</span>
                          <span className="metric-value">{metric.value}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Liste des livrables inclus */}
                <div className="preview-features-box">
                  <div className="preview-features-title">
                    {isEn ? 'DELIVERABLES INCLUDED IN THIS PACKAGE:' : 'LIVRABLES INCLUS DANS CE FORFAIT :'}
                  </div>
                  <ul className="preview-features-list">
                    {activeOffer.preview.features.map((feature, idx) => (
                      <li key={idx} className="preview-feature-item">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Navigation rapide entre forfaits (accessible tactile et clavier) */}
              <div className="preview-nav-tabs" role="tablist" aria-label={isEn ? "Select package to preview" : "Sélectionner un forfait à prévisualiser"}>
                {offers.map((offer, index) => {
                  const isActive = offer.id === activeOfferId;
                  return (
                    <button
                      key={offer.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveOfferId(offer.id)}
                      className={`preview-tab-pill ${isActive ? 'active-pill' : ''}`}
                    >
                      <span className="pill-num">0{index + 1}</span>
                      <span className="pill-name">
                        {offer.id === 'croissance' ? (isEn ? 'Growth' : 'PME') : offer.id === 'presence' ? (isEn ? 'Showcase' : 'Vitrine') : offer.id === 'saas' ? 'SaaS' : 'Google'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Bandeau inférieur de synthèse */}
              <div className="photo-caption-tag">
                <Sparkles className="w-3.5 h-3.5 text-sky-600 inline mr-1.5" aria-hidden="true" />
                {activeOffer.preview.tagBottom}
              </div>

            </div>
          </div>
        </div>

        {/* Colonne Droite : Nos Forfaits & Créations */}
        <div className="split-content-col">
          <span className="col-pre-title">
            {isEn ? "BESPOKE WEB ENGINEERING • FRANCE & WORLDWIDE" : "DÉVELOPPEMENT WEB LOCAL & NATIONAL"}
          </span>
          <h2 id="services-title" className="col-main-title">
            {isEn ? "OUR PACKAGES & CREATIONS" : "NOS FORFAITS & CRÉATIONS"}
          </h2>
          <p className="col-lead-desc">
            {isEn
              ? "Each website is an original creation engineered without heavy CMS. 100% proprietary code, fast hosting, local SEO, and domain name included for the first year."
              : "Chaque site est une création originale conçue sans CMS lourd. Code source 100% propriétaire, hébergement optimisé, référencement SEO local et nom de domaine inclus la première année."}
          </p>

          <div className="menu-items-list" role="list">
            
            {offers.map((offer) => {
              const isActive = offer.id === activeOfferId;
              return (
                <div
                  key={offer.id}
                  role="listitem"
                  tabIndex={0}
                  onMouseEnter={() => setActiveOfferId(offer.id)}
                  onFocus={() => setActiveOfferId(offer.id)}
                  onClick={() => setActiveOfferId(offer.id)}
                  className={`menu-item-row interactive-menu-row ${offer.isPopular ? 'featured-menu-row' : ''} ${isActive ? 'row-is-active' : ''}`}
                >
                  <div className="menu-item-head">
                    <h3 className="item-name flex items-center flex-wrap gap-2">
                      {offer.name}
                      {offer.isPopular && (
                        <span className="badge-reco">
                          <Star className="w-3 h-3 fill-emerald-600 text-emerald-600 inline" aria-hidden="true" />
                          {offer.badge}
                        </span>
                      )}
                      {isActive && (
                        <span className="badge-active-preview hidden sm:inline-flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-sky-600 inline" aria-hidden="true" />
                          {isEn ? "Active preview" : "Aperçu actif"}
                        </span>
                      )}
                    </h3>
                    <span className="item-dots" aria-hidden="true"></span>
                    <span className={`item-price ${offer.isPopular || isActive ? 'highlight-price' : ''}`}>
                      {offer.price}
                    </span>
                  </div>
                  <p className="item-desc">
                    {offer.shortDesc}
                  </p>
                  <div className="item-subtags">
                    {offer.tags}
                  </div>
                </div>
              );
            })}

          </div>

          <div className="menu-footer-cta flex flex-col gap-4">
            <div className="flex items-center flex-wrap gap-4">
              <a 
                href="#contact" 
                onClick={(e) => handleAnchorClick(e, 'contact')} 
                className="btn-glacier-solid cursor-pointer inline-flex items-center gap-2"
              >
                {isEn ? "CHOOSE A PACKAGE" : "CHOISIR UN FORFAIT"} <ArrowRight className="w-4 h-4 inline" aria-hidden="true" />
              </a>
              <span className="text-xs font-semibold text-[#666666] tracking-wide">
                {isEn ? "Free detailed quote within 24h • No obligation" : "Devis détaillé gratuit sous 24h • Sans engagement"}
              </span>
            </div>

            <div className="offers-reassurance-note flex items-start gap-2.5 p-3.5 bg-slate-50 border border-slate-200 text-xs text-[#4A4A4A] leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong className="font-bold text-[#1A1A1A]">
                  {isEn ? "Total transparency from Year 2: " : "Transparence totale dès l'an 2 : "}
                </strong>
                {isEn
                  ? "High-speed hosting and domain name included for the 1st year. From Year 2 onwards, technical renewal at cost price (~€39 to €49/year) without mandatory maintenance contracts, or free transfer."
                  : "Nom de domaine et hébergement haute vitesse offerts la 1ère année. Dès la 2ème année, renouvellement technique à prix coûtant (~39 € à 49 € / an) sans marge de maintenance imposée, ou transfert libre si vous souhaitez gérer vous-même."}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

