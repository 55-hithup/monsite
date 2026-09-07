import { useEffect, useRef } from 'react';
import type React from 'react';
import gsap from 'gsap';

interface GlacierHeroProps {
  onNavClick?: (targetId: string) => void;
}

export default function GlacierHero({ onNavClick }: GlacierHeroProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !cardRef.current) return;
    if (window.innerWidth <= 768) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const isMobile = window.innerWidth <= 768;

    const ctx = gsap.context(() => {
      if (!isMobile && cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 20, filter: 'blur(4px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'filter,transform,opacity',
            delay: 0.05,
          }
        );
      }
    }, cardRef);

    return () => {
      ctx.revert();
    };
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
      aria-label="Présentation de l'Atelier Web DevSupAi"
    >
      <div className="hero-parallax-bg" />
      <div className="hero-tint-overlay" />
      
      <div 
        ref={cardRef} 
        className="hero-floating-card"
      >
        <span className="hero-small-tag">
          DÉVELOPPEUR WEB SUR-MESURE • MEUSE (55) & FRANCE
        </span>
        <h1 className="hero-headline">
          DES SITES WEB RAFFINÉS, <br />
          <span className="hero-headline-accent">faits avec passion &amp; précision.</span>
        </h1>
        <p className="hero-text-paragraph max-w-2xl mx-auto">
          Création de sites vitrines, e-commerce et applications web pour les <strong>PME, artisans, commerçants et associations</strong>. Des architectures ultra-légères, 100% propriétaires et sans abonnement captif, conçues sur-mesure par DevSupAi.
        </p>
        <div className="hero-cta-group">
          <a 
            href="#services" 
            onClick={(e) => handleAnchorClick(e, 'services')} 
            className="btn-glacier-solid cursor-pointer"
          >
            DÉCOUVRIR LES OFFRES
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleAnchorClick(e, 'contact')} 
            className="btn-glacier-outline cursor-pointer"
          >
            DEMANDER UN DEVIS
          </a>
        </div>
      </div>
    </section>
  );
}
