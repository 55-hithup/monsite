import { useState, useEffect, useRef } from 'react';
import type React from 'react';
import {
  type LucideIcon,
  Star,
  Zap,
  ShieldCheck,
  Globe,
  Database,
  Layout,
  Smartphone,
  Layers,
  CheckCircle2,
  Clock,
  Laptop,
  ArrowRight,
  RotateCw,
  RotateCcw
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../i18n/LanguageContext';

interface GlacierOffersProps {
  onNavClick?: (targetId: string) => void;
}

interface PackData {
  id: 'presence' | 'croissance' | 'saas';
  name: string;
  categoryBadge: string;
  price: string;
  badge?: string;
  isPopular?: boolean;
  shortDesc: string;
  icon: LucideIcon;
  metrics: { label: string; value: string; icon: LucideIcon }[];
  features: string[];
  ctaText: string;
  targetAudience: string;
  techSpecs: { label: string; value: string }[];
  detailedDeliverables: string[];
}

export default function GlacierOffers({ onNavClick }: GlacierOffersProps) {
  const { isEn } = useLanguage();
  const [flippedPacks, setFlippedPacks] = useState<Record<string, boolean>>({});

  const sectionRef = useRef<HTMLElement>(null);
  const headerContainerRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  // Animation GSAP ScrollTrigger : Déploiement en éventail 3D au scroll (Rejeu garanti)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Animation de l'En-tête élément par élément (Surtitre, Titre, Paragraphe)
      if (headerContainerRef.current) {
        const headerChildren = Array.from(headerContainerRef.current.children) as HTMLElement[];
        if (headerChildren.length > 0) {
          gsap.fromTo(
            headerChildren,
            { opacity: 0, y: 35, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              stagger: 0.15,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: headerContainerRef.current,
                start: 'top 85%',
                end: 'bottom top',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // 2. Animation des 3 Cartes (Déploiement en éventail 3D au scroll)
      if (cardsGridRef.current) {
        const cards = Array.from(cardsGridRef.current.children) as HTMLElement[];
        const isDesktop = window.innerWidth >= 1024;

        if (cards.length >= 3) {
          const cardsTl = gsap.timeline({
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: 'top 78%',
              end: 'bottom top',
              toggleActions: 'play none none reverse',
            },
          });

          if (isDesktop) {
            // Carte Gauche : arrive depuis la gauche avec rotation 3D
            cardsTl.fromTo(
              cards[0],
              { x: -80, y: 35, rotateY: 18, opacity: 0, scale: 0.92 },
              { x: 0, y: 0, rotateY: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'power3.out', clearProps: 'transform,opacity' },
              0
            );

            // Carte Centre (Populaire) : s'élève de face
            cardsTl.fromTo(
              cards[1],
              { y: 65, opacity: 0, scale: 0.90 },
              { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'power3.out', clearProps: 'transform,opacity' },
              0.12
            );

            // Carte Droite : arrive depuis la droite en miroir
            cardsTl.fromTo(
              cards[2],
              { x: 80, y: 35, rotateY: -18, opacity: 0, scale: 0.92 },
              { x: 0, y: 0, rotateY: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'power3.out', clearProps: 'transform,opacity' },
              0.24
            );
          } else {
            // Mobile : cascade ascendante
            cardsTl.fromTo(
              cards,
              { y: 55, opacity: 0, scale: 0.94 },
              { y: 0, opacity: 1, scale: 1, duration: 0.75, ease: 'power3.out', stagger: 0.15, clearProps: 'transform,opacity' }
            );
          }
        }
      }

      // Recalibration des offsets après le montage
      ScrollTrigger.refresh();
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFlip = (id: string) => {
    setFlippedPacks((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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

  const packs: PackData[] = isEn ? [
    {
      id: 'presence',
      name: 'PRESENCE PACK (ONE-PAGE)',
      categoryBadge: 'ARTISANAL SHOWCASE',
      price: 'FROM €950',
      shortDesc: 'A fast, high-converting single page designed to turn visitors into direct qualified inquiries.',
      icon: Smartphone,
      metrics: [
        { label: 'Speed', value: 'Optimized speed', icon: Zap },
        { label: 'Delivery', value: '1 to 2 weeks', icon: Clock },
        { label: 'Hosting', value: 'Included (Yr 1)', icon: ShieldCheck }
      ],
      features: [
        'Fluid mobile-first design without bloated CMS',
        'Secure contact form with instant direct email alert',
        'Interactive Google Maps location and opening hours',
        '100% proprietary code with zero subscription lock-in'
      ],
      ctaText: 'Choose Presence Pack',
      targetAudience: 'Craftsmen, independent professionals, local businesses, and freelancers needing a credible, modern, and high-converting web presence.',
      techSpecs: [
        { label: 'Stack', value: 'React 19 & SSG' },
        { label: 'Speed', value: '< 0.8s (Core Web Vitals)' },
        { label: 'SEO', value: 'Schema.org Local' },
        { label: 'Hosting', value: 'CDN & SSL Included (Yr 1)' }
      ],
      detailedDeliverables: [
        'Bespoke visual design crafted from scratch (no templates)',
        'Fluid responsive layout tested on mobile, tablet, and desktop',
        'Ultra-secure contact form with anti-spam and instant email dispatch',
        'Interactive Google Maps location, opening hours, and direct call',
        'Complete technical SEO setup: Open Graph, meta tags, robots.txt',
        'Full ownership of source code with zero ongoing software fees'
      ]
    },
    {
      id: 'croissance',
      name: 'SME & COMMERCE GROWTH PACK',
      categoryBadge: 'MULTI-PAGE & SEO',
      price: 'FROM €1,850',
      badge: 'POPULAR',
      isPopular: true,
      shortDesc: 'Tailor-made multi-page showcase (3 to 5 pages) to rank locally and showcase your work.',
      icon: Layers,
      metrics: [
        { label: 'Pages', value: '3 to 5 pages', icon: Layout },
        { label: 'Delivery', value: '2 to 3 weeks', icon: Clock },
        { label: 'SEO', value: 'Schema.org Local', icon: Globe }
      ],
      features: [
        'HD interactive gallery for projects and products',
        'Integration and display of verified Google reviews',
        'Targeted local and regional search engine optimization',
        'Guided quote request module and video training'
      ],
      ctaText: 'Choose Growth Pack',
      targetAudience: 'Growing SMEs, contractors, service providers, and retailers wanting a complete platform to showcase their portfolio and convert local leads.',
      techSpecs: [
        { label: 'Pages', value: '3 to 5 Custom Pages' },
        { label: 'Stack', value: 'React 19 & Tailwind' },
        { label: 'SEO', value: 'Local & Regional Strategy' },
        { label: 'Media', value: 'Automated WebP/SVG' }
      ],
      detailedDeliverables: [
        'Bespoke multi-page layout structured to maximize service credibility',
        'HD interactive project & portfolio gallery with category filters',
        'Verified Google customer reviews integration with star rating markup',
        'Tailored quote request form with specialized business field inputs',
        'Comprehensive regional SEO optimization (keywords, internal linking)',
        'Personalized video tutorial to easily edit texts and photos autonomously'
      ]
    },
    {
      id: 'saas',
      name: 'SAAS & CUSTOM APP PACK',
      categoryBadge: 'SOFTWARE & DASHBOARD',
      price: 'FROM €3,200',
      shortDesc: 'Tailor-made web app and dashboard to automate your internal operations and PDF invoices.',
      icon: Database,
      metrics: [
        { label: 'Stack', value: 'React 19 & SQL', icon: Laptop },
        { label: 'Delivery', value: '4 to 6 weeks', icon: Clock },
        { label: 'License', value: '€0 / month', icon: ShieldCheck }
      ],
      features: [
        'Live operations dashboard and real-time inventory tracking',
        'Automated generation of compliant PDF quotes and invoices',
        'Secure members area with role-based permission management',
        'Full ownership of source code and complete SQL database'
      ],
      ctaText: 'Choose SaaS Pack',
      targetAudience: 'Companies, non-profits, web entrepreneurs, and operational teams requiring custom web software, member portals, or automated business management systems.',
      techSpecs: [
        { label: 'Frontend', value: 'React 19 Dashboard' },
        { label: 'Database', value: 'Relational SQL & Secure API' },
        { label: 'Security', value: 'RBAC Roles & Encryption' },
        { label: 'License', value: '€0 / month (100% Owned)' }
      ],
      detailedDeliverables: [
        'Bespoke administrative control dashboard built strictly to your workflows',
        'Compliant PDF quote and invoice generation with automated calculations',
        'Live inventory, customer ticket, or member directory tracking',
        'Granular role-based user permissions (SuperAdmin, Manager, Member)',
        'Full data export tools (CSV, Excel, JSON) with automated backups',
        'Complete transfer of intellectual property, code, and SQL schema'
      ]
    }
  ] : [
    {
      id: 'presence',
      name: 'PACK PRÉSENCE (ONE-PAGE)',
      categoryBadge: 'VITRINE ARTISANALE',
      price: 'DÈS 950 €',
      shortDesc: "Une page unique ultra-fluide et ciselée pour convertir vos visiteurs en contacts directs.",
      icon: Smartphone,
      metrics: [
        { label: 'Vitesse', value: 'Chargement optimisé', icon: Zap },
        { label: 'Délais', value: '1 à 2 semaines', icon: Clock },
        { label: 'Hébergement', value: 'Inclus (an 1)', icon: ShieldCheck }
      ],
      features: [
        'Conception mobile-first ultra-fluide sans CMS lourd',
        'Formulaire de contact sécurisé avec alerte email directe',
        'Plan Google Maps interactif et horaires d’ouverture',
        'Code source 100% propriétaire sans abonnement captif'
      ],
      ctaText: 'Choisir le Pack Présence',
      targetAudience: 'Artisans, indépendants et commerçants souhaitant une présence web crédible, moderne et immédiatement rentable.',
      techSpecs: [
        { label: 'Stack', value: 'React 19 & SSG' },
        { label: 'Vitesse', value: '< 0,8s (Core Web Vitals)' },
        { label: 'SEO', value: 'Schema.org Local' },
        { label: 'Hébergement', value: 'CDN & SSL Inclus (An 1)' }
      ],
      detailedDeliverables: [
        'Maquette originale ciselée sur-mesure (aucun template générique)',
        'Navigation mobile-first fluide testée sur smartphones et ordinateurs',
        'Formulaire de contact sécurisé avec protection honeypot anti-spam',
        'Plan Google Maps interactif, coordonnées complètes et appel direct',
        'Configuration SEO complète : Open Graph, balises meta et robots.txt',
        'Propriété intégrale du code : aucun abonnement récurrent obligatoire'
      ]
    },
    {
      id: 'croissance',
      name: 'PACK CROISSANCE PME & COMMERCE',
      categoryBadge: 'MULTI-PAGES & SEO',
      price: 'DÈS 1 850 €',
      badge: 'POPULAIRE',
      isPopular: true,
      shortDesc: "Site multi-pages (3 à 5 pages) avec galerie de réalisations, avis clients et SEO ciblé.",
      icon: Layers,
      metrics: [
        { label: 'Pages', value: '3 à 5 pages', icon: Layout },
        { label: 'Délais', value: '2 à 3 semaines', icon: Clock },
        { label: 'SEO', value: 'Schema.org local', icon: Globe }
      ],
      features: [
        'Galerie interactive haute définition pour vos chantiers / produits',
        'Intégration et mise en valeur des avis Google certifiés',
        'Optimisation SEO ciblée Meuse, Grand Est et national',
        'Module de devis guidé et formation vidéo incluse'
      ],
      ctaText: 'Choisir le Pack Croissance',
      targetAudience: 'PME, artisans et prestataires ayant besoin d\'un écosystème complet pour valoriser leurs réalisations et convertir des prospects.',
      techSpecs: [
        { label: 'Arborescence', value: '3 à 5 Pages Modulaires' },
        { label: 'Stack', value: 'React 19 & Tailwind' },
        { label: 'SEO', value: 'Ciblé Meuse & Grand Est' },
        { label: 'Médias', value: 'Compression WebP/SVG' }
      ],
      detailedDeliverables: [
        'Arborescence multi-pages calibrée pour valoriser votre savoir-faire',
        'Galerie dynamique interactive de réalisations avec tri par catégories',
        'Intégration des avis Google certifiés avec balisage d\'étoiles enrichies',
        'Module de demande de devis guidé personnalisé selon votre métier',
        'Optimisation SEO locale et régionale poussée (mots-clés, maillage)',
        'Tutoriel vidéo personnalisé pour modifier vos textes en toute autonomie'
      ]
    },
    {
      id: 'saas',
      name: 'PACK SAAS & APPLICATION MÉTIER',
      categoryBadge: 'LOGICIEL & DASHBOARD',
      price: 'DÈS 3 200 €',
      shortDesc: "Application web et dashboard sur-mesure pour piloter vos opérations et devis/factures.",
      icon: Database,
      metrics: [
        { label: 'Stack', value: 'React 19 & SQL', icon: Laptop },
        { label: 'Délais', value: '4 à 6 semaines', icon: Clock },
        { label: 'Licence', value: '0 € / mois', icon: ShieldCheck }
      ],
      features: [
        'Dashboard de pilotage et gestion d’inventaire en direct',
        'Génération automatique de devis et factures PDF conformes',
        'Espace membres sécurisé avec gestion des rôles d’accès',
        'Propriété totale du code source et base de données SQL'
      ],
      ctaText: 'Choisir le Pack SaaS',
      targetAudience: 'Entreprises, associations et équipes nécessitant une interface logicielle dédiée, un portail adhérents ou des flux automatisés.',
      techSpecs: [
        { label: 'Interface UI', value: 'React 19 Dashboard' },
        { label: 'Base Données', value: 'SQL Relationnelle & API' },
        { label: 'Sécurité', value: 'Rôles RBAC & Chiffrement' },
        { label: 'Licence', value: '0 € / mois (100% Propriétaire)' }
      ],
      detailedDeliverables: [
        'Dashboard d\'administration sur-mesure calqué sur vos processus réels',
        'Génération automatique de devis et factures PDF avec calculs dynamiques',
        'Suivi des stocks, inventaire ou gestion de dossiers en temps réel',
        'Espace membres sécurisé avec rôles (SuperAdmin, Gestionnaire, Membre)',
        'Export complet des données (CSV, Excel, JSON) et sauvegardes auto',
        'Cession intégrale de la propriété intellectuelle, des codes et de la base'
      ]
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#FAFAFA] border-b border-slate-200 overflow-x-clip" 
      id="services" 
      aria-labelledby="services-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête centré avec animations distinctes par élément */}
        <div ref={headerContainerRef} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span 
            className="text-xs font-extrabold tracking-[0.2em] text-sky-600 uppercase font-['Montserrat'] block mb-2"
          >
            {isEn ? "BESPOKE WEB ENGINEERING • FRANCE & WORLDWIDE" : "DÉVELOPPEMENT WEB LOCAL & NATIONAL"}
          </span>
          <h2 
            id="services-title" 
            className="text-2xl sm:text-3xl md:text-4xl font-black font-['Montserrat'] text-[#1A1A1A] tracking-tight mb-3"
          >
            {isEn ? "OUR PACKAGES & CREATIONS" : "NOS FORFAITS & CRÉATIONS"}
          </h2>
          <p 
            className="text-sm sm:text-base text-slate-600 font-['Plus_Jakarta_Sans'] leading-relaxed"
          >
            {isEn
              ? "Each website is an original creation engineered without heavy CMS. 100% proprietary code, fast hosting, local SEO, and domain name included for the first year."
              : "Chaque site est une création originale conçue sans CMS lourd. Code source 100% propriétaire, hébergement optimisé, référencement SEO local et nom de domaine inclus la première année."}
          </p>
        </div>

        {/* Grille des 3 packs avec 3D Flip et animation d'éventail 3D au scroll */}
        <div 
          ref={cardsGridRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {packs.map((pack) => {
            const isPopular = pack.isPopular;
            const isFlipped = !!flippedPacks[pack.id];
            const CategoryIcon = pack.icon;

            return (
              <div 
                key={pack.id} 
                className="glacier-flip-card-wrapper min-h-[490px]"
              >
                <div className={`glacier-flip-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                  
                  {/* --- FACE AVANT (RECTO) AVEC OMBRE PORTÉE SOIGNÉE --- */}
                  <div
                    className={`glacier-flip-card-front p-5 sm:p-6 flex flex-col justify-between relative transition-all duration-300 ${
                      isPopular
                        ? 'bg-white border-2 border-sky-600 shadow-[0_16px_40px_-6px_rgba(2,132,199,0.22),0_6px_16px_-3px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_50px_-8px_rgba(2,132,199,0.30)] lg:-translate-y-1.5'
                        : 'bg-white border border-slate-200/90 shadow-[0_12px_32px_-6px_rgba(15,23,42,0.12),0_4px_12px_-2px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_44px_-8px_rgba(15,23,42,0.18)] hover:border-slate-300'
                    }`}
                  >
                    {/* Badge Populaire / Recommandé en haut */}
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                        <span className="bg-sky-600 text-white text-[11px] font-extrabold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-md inline-flex items-center gap-1">
                          <Star className="w-3 h-3 fill-white text-white" aria-hidden="true" />
                          {pack.badge}
                        </span>
                      </div>
                    )}

                    {/* Haut de la carte : Badge catégorie + Titre + Prix + Description */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200/80 px-2 py-0.5 rounded-md inline-flex items-center gap-1.5">
                          <CategoryIcon className="w-3.5 h-3.5 text-sky-600" aria-hidden="true" />
                          {pack.categoryBadge}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-black font-['Montserrat'] text-[#1A1A1A] tracking-tight mb-1">
                        {pack.name}
                      </h3>

                      <div className="mb-2">
                        <span className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-sky-600 tracking-tight">
                          {pack.price}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 font-['Plus_Jakarta_Sans'] leading-relaxed mb-3.5 min-h-[36px]">
                        {pack.shortDesc}
                      </p>

                      {/* Ligne compacte de métriques (Badges horizontaux) */}
                      <div className="flex items-center flex-wrap gap-1.5 mb-3.5 py-2 border-y border-slate-100">
                        {pack.metrics.map((metric, mIdx) => {
                          const MetricIcon = metric.icon;
                          return (
                            <span 
                              key={mIdx} 
                              className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200/80 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium"
                            >
                              <MetricIcon className="w-3 h-3 text-sky-600 shrink-0" aria-hidden="true" />
                              <span>{metric.value}</span>
                            </span>
                          );
                        })}
                      </div>

                      {/* Livrables inclus */}
                      <div className="mb-3.5">
                        <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 font-['Montserrat'] mb-2">
                          {isEn ? "DELIVERABLES INCLUDED:" : "LIVRABLES INCLUS :"}
                        </div>
                        <ul className="space-y-2">
                          {pack.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-700 leading-snug">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bas de la carte : Lien Ciselé Flip 3D + Bouton CTA Principal */}
                    <div className="pt-2 flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => toggleFlip(pack.id)}
                        className="glacier-flip-text-link group cursor-pointer"
                        aria-label={isEn ? "Flip card to view technical specifications" : "Retourner la carte pour voir la fiche technique complète"}
                      >
                        <RotateCw className="w-3.5 h-3.5 text-sky-600 group-hover:rotate-180 transition-transform duration-500 shrink-0" aria-hidden="true" />
                        <span>{isEn ? "Detailed specifications & stack (Flip ⟲)" : "Voir la fiche technique complète (Verso ⟲)"}</span>
                      </button>

                      <a
                        href="#contact"
                        onClick={(e) => handleAnchorClick(e, 'contact')}
                        className={`w-full py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider font-['Montserrat'] cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 shadow-md text-white ${
                          isPopular
                            ? 'bg-sky-600 hover:bg-sky-700'
                            : 'bg-slate-950 hover:bg-sky-600'
                        }`}
                        style={{ color: '#FFFFFF' }}
                      >
                        <span style={{ color: '#FFFFFF' }}>{pack.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                      </a>
                    </div>
                  </div>

                  {/* --- FACE ARRIÈRE (VERSO) AVEC OMBRE PORTÉE SOIGNÉE --- */}
                  <div
                    className={`glacier-flip-card-back p-5 sm:p-6 flex flex-col justify-between ${
                      isPopular
                        ? 'bg-white border-2 border-sky-600 shadow-[0_16px_40px_-6px_rgba(2,132,199,0.26),0_6px_16px_-3px_rgba(15,23,42,0.10)]'
                        : 'bg-white border border-slate-200/90 shadow-[0_12px_32px_-6px_rgba(15,23,42,0.14),0_4px_12px_-2px_rgba(15,23,42,0.08)]'
                    }`}
                  >
                    {/* En-tête Verso */}
                    <div className="shrink-0">
                      <div className="flex items-center justify-between gap-2 mb-1.5 pb-1.5 border-b border-slate-100">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200/80 px-2 py-0.5 rounded-md inline-flex items-center gap-1.5">
                          <CategoryIcon className="w-3.5 h-3.5 text-sky-600" aria-hidden="true" />
                          {isEn ? "DETAILED SPECS" : "FICHE TECHNIQUE"}
                        </span>

                        <button
                          type="button"
                          onClick={() => toggleFlip(pack.id)}
                          className="px-2.5 py-1 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-slate-700 hover:text-sky-700 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5 text-[11px] font-bold font-['Montserrat'] shadow-xs"
                          title={isEn ? "Flip back to presentation" : "Retourner au recto"}
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-sky-600" aria-hidden="true" />
                          <span>{isEn ? "Back" : "Retour"}</span>
                        </button>
                      </div>

                      <div className="flex items-baseline justify-between gap-2 mb-2">
                        <h4 className="text-base sm:text-lg font-black font-['Montserrat'] text-[#1A1A1A] tracking-tight">
                          {pack.name}
                        </h4>
                        <span className="text-base sm:text-lg font-black font-['Montserrat'] text-sky-600 shrink-0">
                          {pack.price}
                        </span>
                      </div>
                    </div>

                    {/* Corps Verso */}
                    <div className="flex-1 min-h-0 overflow-y-auto pr-1.5 custom-card-scrollbar space-y-2.5 my-1">
                      
                      {/* Public cible & Objectif */}
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/70">
                        <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-900 font-['Montserrat'] mb-0.5">
                          {isEn ? "OBJECTIVE & AUDIENCE" : "OBJECTIF & PUBLIC CIBLE"}
                        </span>
                        <p className="text-slate-600 leading-relaxed font-['Plus_Jakarta_Sans'] text-[11px]">
                          {pack.targetAudience}
                        </p>
                      </div>

                      {/* Spécifications techniques en grille 2x2 compacte */}
                      <div>
                        <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-900 font-['Montserrat'] mb-1">
                          {isEn ? "TECHNICAL SPECIFICATIONS" : "SPÉCIFICATIONS TECHNIQUES"}
                        </span>
                        <div className="grid grid-cols-2 gap-1.5">
                          {pack.techSpecs.map((spec, sIdx) => (
                            <div key={sIdx} className="p-1.5 px-2 rounded-md bg-slate-50 border border-slate-200/70 text-[11px] flex flex-col">
                              <span className="font-bold text-slate-500 uppercase text-[10px]">{spec.label}</span>
                              <span className="font-semibold text-slate-900 leading-tight line-clamp-1">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Livrables exhaustifs */}
                      <div>
                        <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-900 font-['Montserrat'] mb-1">
                          {isEn ? "EXHAUSTIVE DELIVERABLES" : "LIVRABLES DÉTAILLÉS INCLUS"}
                        </span>
                        <ul className="space-y-1">
                          {pack.detailedDeliverables.map((item, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-1.5 text-[11px] text-slate-700 leading-snug">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Note transparence */}
                      <div className="p-2 rounded-lg bg-sky-50/70 border border-sky-200/70 text-[11px] text-sky-950 flex items-start gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>
                          {isEn 
                            ? "Domain & hosting included Yr 1. Zero mandatory monthly maintenance."
                            : "Domaine & hébergement inclus An 1. Code 100% propriétaire sans abonnement."}
                        </span>
                      </div>
                    </div>

                    {/* Bas Verso : Bouton retour + CTA (Fonds pleins & texte 100% blanc) */}
                    <div className="shrink-0 pt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleFlip(pack.id)}
                        className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 border border-slate-700 text-white text-xs font-black font-['Montserrat'] transition-colors cursor-pointer shrink-0 inline-flex items-center gap-1.5 shadow-xs"
                        style={{ color: '#FFFFFF' }}
                        aria-label={isEn ? "Flip back to presentation" : "Retourner le forfait au recto"}
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                        <span style={{ color: '#FFFFFF' }}>{isEn ? "Back" : "Retour"}</span>
                      </button>

                      <a
                        href="#contact"
                        onClick={(e) => handleAnchorClick(e, 'contact')}
                        className="flex-1 py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs uppercase tracking-wider font-['Montserrat'] cursor-pointer flex items-center justify-center gap-1.5 transition-all shadow-md"
                        style={{ color: '#FFFFFF' }}
                      >
                        <span style={{ color: '#FFFFFF' }}>{pack.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                      </a>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}