import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Building2, UtensilsCrossed, Store, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../i18n/LanguageContext';

export default function GlacierTrades() {
  const { isEn } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth <= 768) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Animation En-tête Solutions par Métier
      if (headerRef.current) {
        const headerChildren = Array.from(headerRef.current.children) as HTMLElement[];
        if (headerChildren.length > 0) {
          gsap.fromTo(
            headerChildren,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: 'power4.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: headerRef.current,
                start: 'top 85%',
                end: 'bottom top',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // 2. Animation des 4 Cartes Métiers
      if (gridRef.current) {
        const tradeCards = Array.from(gridRef.current.children) as HTMLElement[];
        const isDesktop = window.innerWidth >= 1024;

        if (isDesktop && tradeCards.length === 4) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              end: 'bottom top',
              toggleActions: 'play none none reverse',
            },
          });

          // Carte 1 (Artisans - gauche)
          tl.fromTo(
            tradeCards[0],
            { opacity: 0, x: -60, y: 20 },
            { opacity: 1, x: 0, y: 0, duration: 0.75, ease: 'power4.out', clearProps: 'transform,opacity' },
            0
          );

          // Carte 2 (Professions Libérales - centre gauche)
          tl.fromTo(
            tradeCards[1],
            { opacity: 0, y: 40, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power4.out', clearProps: 'transform,opacity' },
            0.08
          );

          // Carte 3 (Restaurants - centre droit)
          tl.fromTo(
            tradeCards[2],
            { opacity: 0, y: 40, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power4.out', clearProps: 'transform,opacity' },
            0.16
          );

          // Carte 4 (Commerces - droite)
          tl.fromTo(
            tradeCards[3],
            { opacity: 0, x: 60, y: 20 },
            { opacity: 1, x: 0, y: 0, duration: 0.75, ease: 'power4.out', clearProps: 'transform,opacity' },
            0.24
          );
        } else {
          gsap.fromTo(
            tradeCards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: 'power4.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 85%',
                end: 'bottom top',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const trades = [
    {
      to: isEn ? "/en/websites/artisan-construction" : "/sites-internet/artisan-renovation",
      icon: Hammer,
      title: isEn ? "Contractors & Craftsmen" : "Artisans & Rénovation",
      desc: isEn 
        ? "Before/after photo gallery, structured quote requests, and local SEO in Grand Est."
        : "Galerie chantiers avant/après, formulaires de devis géolocalisés et SEO en Meuse.",
    },
    {
      to: isEn ? "/en/websites/professional-services" : "/sites-internet/profession-liberale",
      icon: Building2,
      title: isEn ? "Professional Practices" : "Professions Libérales",
      desc: isEn
        ? "Ethical compliance, transparent fee presentation, and appointment booking links."
        : "Présentation déontologique, clarté des honoraires et prise de rendez-vous fluide.",
    },
    {
      to: isEn ? "/en/websites/restaurant" : "/sites-internet/restaurant",
      icon: UtensilsCrossed,
      title: isEn ? "Restaurants & Bistros" : "Restaurants & Bistros",
      desc: isEn
        ? "Interactive mobile menus without PDF, direct booking engine with 0% commission."
        : "Carte interactive sur mobile sans PDF lourd et réservation directe sans commission.",
    },
    {
      to: isEn ? "/en/websites/retail-shop" : "/sites-internet/commerce-boutique",
      icon: Store,
      title: isEn ? "Local Shops & Retail" : "Commerces & Boutiques",
      desc: isEn
        ? "Custom online store, Click & Collect pickup, Stripe checkout with 0% sales fee."
        : "Boutique en ligne sur-mesure, Click & Collect, paiement Stripe et 0% de commission.",
    },
  ];

  return (
    <section 
      ref={sectionRef}
      id="solutions-metier"
      className="py-14 md:py-20 bg-[#FAFAFA] border-b border-slate-200/80 overflow-x-clip text-left"
      aria-labelledby="trades-title"
    >
      <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* En-tête Solutions par Métier */}
        <div ref={headerRef} className="max-w-3xl mb-8 md:mb-10">
          <span className="text-xs font-extrabold tracking-[0.2em] text-sky-700 uppercase font-['Montserrat'] block mb-2">
            {isEn ? "INDUSTRY-SPECIFIC SOLUTIONS" : "SOLUTIONS PAR MÉTIER"}
          </span>
          <h2 
            id="trades-title"
            className="text-xl sm:text-2xl md:text-3xl font-black font-['Montserrat'] text-slate-900 tracking-tight mb-2.5"
          >
            {isEn ? "Looking for a tailored solution for your specific profession?" : "Vous recherchez une solution adaptée à votre secteur d'activité ?"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-['Plus_Jakarta_Sans'] leading-relaxed">
            {isEn 
              ? "Discover our dedicated architectures designed specifically for local trades, medical practices, restaurants, and retail stores."
              : "Découvrez nos pages et fonctionnalités pensées sur-mesure pour les artisans du bâtiment, praticiens de santé, restaurateurs et commerçants."}
          </p>
        </div>

        {/* Grille des 4 cartes métiers */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {trades.map((trade) => {
            const Icon = trade.icon;
            return (
              <Link
                key={trade.to}
                to={trade.to}
                className="group p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-4 group-hover:bg-sky-700 group-hover:text-white transition-colors duration-200">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold font-['Montserrat'] text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">
                    {trade.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {trade.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-700 font-['Montserrat']">
                  <span>{isEn ? "View solutions" : "Découvrir"}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-200" aria-hidden="true" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
