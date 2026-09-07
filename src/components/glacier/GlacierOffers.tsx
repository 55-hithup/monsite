import { useEffect, useRef } from 'react';
import type React from 'react';
import {
  type LucideIcon,
  Zap,
  ShieldCheck,
  Globe,
  Database,
  Layout,
  Smartphone,
  Layers,
  Clock,
  Laptop,
  ArrowRight
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { debouncedScrollTriggerRefresh } from '../../utils/scrollTriggerRefresh';

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
  const sectionRef = useRef<HTMLElement>(null);
  const headerContainerRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  // Animation GSAP ScrollTrigger : Déploiement en éventail 3D au scroll (Rejeu garanti)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth <= 768) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Animation de l'En-tête élément par élément (Arrivée vive, décélération douce)
      if (headerContainerRef.current) {
        const headerChildren = Array.from(headerContainerRef.current.children) as HTMLElement[];
        if (headerChildren.length > 0) {
          gsap.fromTo(
            headerChildren,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: 'power4.out',
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

      // 2. Animation des 3 Cartes Forfaits (Arrivée vive dès le début, amorti doux à la fin)
      if (cardsGridRef.current) {
        const cards = Array.from(cardsGridRef.current.children) as HTMLElement[];
        const isDesktop = window.innerWidth >= 1024;

        if (cards.length >= 3) {
          const cardsTl = gsap.timeline({
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: 'top 80%',
              end: 'bottom top',
              toggleActions: 'play none none reverse',
            },
          });

          if (isDesktop && cards.length >= 3) {
            // Carte 1 (Gauche) : impulsion vive depuis la gauche, décélération douce
            cardsTl.fromTo(
              cards[0],
              { x: -40, y: 30, opacity: 0, scale: 0.96 },
              { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.75, ease: 'power4.out', clearProps: 'transform,opacity' },
              0
            );

            // Carte 2 (Centre) : élévation vive, décélération douce
            cardsTl.fromTo(
              cards[1],
              { y: 45, opacity: 0, scale: 0.96 },
              { y: 0, opacity: 1, scale: 1, duration: 0.75, ease: 'power4.out', clearProps: 'transform,opacity' },
              0.1
            );

            // Carte 3 (Droite SaaS) : impulsion vive depuis la droite, décélération douce
            cardsTl.fromTo(
              cards[2],
              { x: 40, y: 30, opacity: 0, scale: 0.96 },
              { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.75, ease: 'power4.out', clearProps: 'transform,opacity' },
              0.2
            );
          } else {
            // Mobile et tablettes : cascade vive avec décélération douce
            cardsTl.fromTo(
              cards,
              { y: 40, opacity: 0, scale: 0.96 },
              { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power4.out', stagger: 0.1, clearProps: 'transform,opacity' }
            );
          }
        }
      }

      // Recalibration optimisée et dédoublonnée des offsets
      debouncedScrollTriggerRefresh(200);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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

  const packs: PackData[] = [
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
        { label: 'Hébergement', value: 'Hébergement inclus (an 1)', icon: ShieldCheck }
      ],
      features: [
        'Design mobile-first sans CMS lourd',
        'Formulaire et alertes email directes',
        'Google Maps interactif et horaires',
        'Code 100% vôtre, sans abonnement'
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
        'Accessibilité WCAG 2.1 AA : contrastes rigoureux et cibles tactiles 32px+'
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
        { label: 'SEO', value: 'SEO local inclus', icon: Globe }
      ],
      features: [
        'Galerie interactive de réalisations',
        'Intégration des avis Google vérifiés',
        'Référencement local et régional SEO',
        'Demande de devis & formation vidéo'
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
        'Conformité accessibilité WCAG AA (lisibilité senior, contrastes >= 4.5:1)'
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
        'Dashboard de pilotage sur-mesure',
        'Génération devis & factures PDF',
        'Espace membres et rôles d\'accès',
        'Base de données SQL propriétaire'
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
        'Accessibilité WCAG AA et commandes clavier adaptées pour tous les collaborateurs'
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
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête centré avec animations distinctes par élément */}
        <div ref={headerContainerRef} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span 
            className="text-xs font-extrabold tracking-[0.2em] text-sky-700 uppercase font-['Montserrat'] block mb-2"
          >
            DÉVELOPPEMENT WEB LOCAL & NATIONAL
          </span>
          <h2 
            id="services-title" 
            className="text-2xl sm:text-3xl md:text-4xl font-black font-['Montserrat'] text-[#1A1A1A] tracking-tight mb-3"
          >
            NOS FORFAITS & CRÉATIONS
          </h2>
          <p 
            className="text-sm sm:text-base text-slate-600 font-['Plus_Jakarta_Sans'] leading-relaxed"
          >
            Chaque site est une création originale conçue sans CMS lourd. Code source 100% propriétaire, hébergement optimisé, référencement SEO local et nom de domaine inclus la première année.
          </p>
        </div>

        {/* Grille des 3 packs avec animation au scroll */}
        <div 
          ref={cardsGridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {packs.map((pack) => (
            <div 
              key={pack.id} 
              className="h-full"
            >
              <div
                className="h-full p-6 sm:p-7 rounded-2xl flex flex-col justify-between transition-all duration-300 ease-out transform-gpu bg-white border border-slate-200/90 shadow-[0_12px_32px_-6px_rgba(15,23,42,0.10),0_4px_12px_-2px_rgba(15,23,42,0.05)] hover:shadow-[0_22px_48px_-8px_rgba(15,23,42,0.18)] hover:border-sky-400 hover:scale-[1.025] hover:-translate-y-2 motion-reduce:hover:transform-none"
              >
                {/* Haut de la carte : Surtitre catégorie + Titre + Prix + Description */}
                <div>
                  <div className="mb-2">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-sky-700 font-['Montserrat'] block">
                      {pack.categoryBadge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black font-['Montserrat'] text-[#1A1A1A] tracking-tight mb-1 min-h-[2.75rem] flex items-center transition-colors duration-200 group-hover:text-slate-900">
                    {pack.name}
                  </h3>

                  <div className="mb-2">
                    <span className="text-2xl sm:text-3xl font-black font-['Montserrat'] text-sky-700 tracking-tight inline-block transition-transform duration-300 group-hover:scale-[1.03] origin-left">
                      {pack.price}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-['Plus_Jakarta_Sans'] leading-relaxed mb-3.5 min-h-[3rem] sm:min-h-[3.25rem] flex items-center">
                    {pack.shortDesc}
                  </p>

                  {/* Textes clés empilés l'un en dessous de l'autre sans pilule ni puce */}
                  <div className="mb-3.5 py-2 border-y border-slate-100 space-y-1.5">
                    {pack.metrics.map((metric, mIdx) => (
                      <p key={mIdx} className="text-xs sm:text-[13px] text-slate-700 font-medium font-['Plus_Jakarta_Sans'] leading-snug truncate" title={metric.value}>
                        {metric.value}
                      </p>
                    ))}
                  </div>

                  {/* Livrables inclus */}
                  <div className="mb-3">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 font-['Montserrat'] mb-2">
                      LIVRABLES INCLUS :
                    </div>
                    <ul className="space-y-1.5">
                      {pack.features.map((feature, fIdx) => (
                        <li key={fIdx} className="text-xs sm:text-[13px] text-slate-700 leading-snug truncate" title={feature}>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bas de la carte : Bouton CTA Principal */}
                <div className="pt-4">
                  <a
                    href="#contact"
                    onClick={(e) => handleAnchorClick(e, 'contact')}
                    className="w-full py-2.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider font-['Montserrat'] cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 shadow-md text-white bg-slate-950 hover:bg-sky-700"
                    style={{ color: '#FFFFFF' }}
                  >
                    <span style={{ color: '#FFFFFF' }}>{pack.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}