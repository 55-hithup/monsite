import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParallaxLogoVoyager from './ParallaxLogoVoyager';

export default function GlacierParallaxBreak() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    if (window.innerWidth <= 768) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 0. Badge : Fade-In & translation
      if (tagRef.current) {
        gsap.fromTo(
          tagRef.current,
          { opacity: 0, y: -15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: tagRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 1. Titre : Rebond Élastique & Fade
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, scale: 0.88, y: 25 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.45,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: quoteRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Prix / Sous-titre : Fade-Up & Défloutage
      if (subRef.current) {
        gsap.fromTo(
          subRef.current,
          { opacity: 0, y: 25, filter: 'blur(4px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: subRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="glacier-parallax-break py-16 md:py-20 min-h-[280px] md:min-h-[320px] flex items-center justify-center text-center relative overflow-hidden" 
      aria-label="Engagement et Philosophie DevSupAi"
    >
      <div className="break-parallax-bg" />
      <div className="break-tint" />
      <ParallaxLogoVoyager variant="curve-right" />
      <div className="break-content container mx-auto px-6 max-w-4xl relative z-10">
        <span 
          ref={tagRef} 
          className="break-tag"
        >
          L'ENGAGEMENT DEVSUPAI
        </span>
        <h2 
          ref={quoteRef} 
          className="break-quote"
        >
          &laquo;&nbsp;UN CODE SUR-MESURE DURABLE, <br />
          <span className="hero-headline-accent">sans aucun abonnement captif.&nbsp;&raquo;</span>
        </h2>
        <p 
          ref={subRef} 
          className="break-sub"
        >
          0 € de plugins payants chaque année • 100% propriétaire • Architecture légère & optimisée
        </p>
      </div>
    </section>
  );
}

