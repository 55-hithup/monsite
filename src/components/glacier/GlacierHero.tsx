import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../../i18n/LanguageContext';

interface GlacierHeroProps {
  onNavClick?: (targetId: string) => void;
}

export default function GlacierHero({ onNavClick }: GlacierHeroProps) {
  const { isEn } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !cardRef.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 35, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          delay: 0.1,
          ease: 'power2.out',
          clearProps: 'filter',
        }
      );
    }, cardRef);

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

  return (
    <section 
      className="glacier-hero-banner" 
      aria-label={isEn ? "DevSupAi Web Atelier Overview" : "Présentation de l'Atelier Web DevSupAi"}
    >
      <div 
        className="hero-parallax-bg" 
        style={{ backgroundImage: "url('/hero-bg-mockup.webp')" }}
      />
      <div className="hero-tint-overlay" />
      
      <div 
        ref={cardRef} 
        className="hero-floating-card"
      >
        <span className="hero-small-tag">
          {isEn
            ? "BESPOKE WEB DEVELOPER • FRANCE & WORLDWIDE"
            : "DÉVELOPPEUR WEB SUR-MESURE • MEUSE (55) & FRANCE"}
        </span>
        <h1 className="hero-headline">
          {isEn ? (
            <>
              REFINED WEBSITES, <br />
              <span className="hero-serif-italic">crafted with passion &amp; precision.</span>
            </>
          ) : (
            <>
              DES SITES WEB RAFFINÉS, <br />
              <span className="hero-serif-italic">faits avec passion &amp; précision.</span>
            </>
          )}
        </h1>
        <p className="hero-text-paragraph">
          {isEn ? (
            <>
              Handcrafted showcase websites, e-commerce stores, and web applications for <strong>SMEs, artisans, and non-profits</strong>. Lightweight, high-performance architectures, 100% proprietary code without recurring software fees, engineered with precision by DevSupAi.
            </>
          ) : (
            <>
              Création de sites vitrines, e-commerce et applications web pour les <strong>PME, artisans, commerçants et associations</strong> en Meuse (Saint-Mihiel, Commercy, Verdun, Bar-le-Duc), Grand Est et toute la France. Des architectures ultra-légères, 100% propriétaires et sans abonnement captif, conçues sur-mesure par DevSupAi.
            </>
          )}
        </p>
        <div className="hero-cta-group">
          <a 
            href="#services" 
            onClick={(e) => handleAnchorClick(e, 'services')} 
            className="btn-glacier-solid cursor-pointer"
          >
            {isEn ? "EXPLORE OFFERS" : "DÉCOUVRIR LES OFFRES"}
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleAnchorClick(e, 'contact')} 
            className="btn-glacier-outline cursor-pointer"
          >
            {isEn ? "REQUEST A QUOTE" : "DEMANDER UN DEVIS"}
          </a>
        </div>
      </div>
    </section>
  );
}
