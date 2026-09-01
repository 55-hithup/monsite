import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../i18n/LanguageContext';

export default function GlacierParallaxBreak() {
  const { isEn } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 0. Badge : Fade-Up & Défloutage (0.8s, power2.out)
      if (tagRef.current) {
        gsap.fromTo(
          tagRef.current,
          { opacity: 0, y: 25, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power2.out',
            clearProps: 'filter',
            scrollTrigger: {
              trigger: tagRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 1. Titre : Rebond Élastique Pop (0.9s, back.out(1.7))
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, scale: 0.75, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: quoteRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 2. Prix / Sous-titre : Fade-Up & Défloutage (0.8s, power2.out)
      if (subRef.current) {
        gsap.fromTo(
          subRef.current,
          { opacity: 0, y: 35, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            delay: 0.15,
            ease: 'power2.out',
            clearProps: 'filter',
            scrollTrigger: {
              trigger: subRef.current,
              start: 'top 90%',
              once: true,
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
      className="glacier-parallax-break" 
      aria-label={isEn ? "DevSupAi Commitment and Philosophy" : "Engagement et Philosophie DevSupAi"}
    >
      <div 
        className="break-parallax-bg" 
        style={{ backgroundImage: "url('/hero-bg-mockup.webp')" }}
      />
      <div className="break-tint" />
      <div className="break-content">
        <span 
          ref={tagRef} 
          className="break-tag"
        >
          {isEn ? "THE DEVSUPAI COMMITMENT" : "L'ENGAGEMENT DEVSUPAI"}
        </span>
        <h2 
          ref={quoteRef} 
          className="break-quote"
        >
          {isEn ? (
            <>
              &ldquo;SUSTAINABLE BESPOKE CODE, <br />
              <span className="hero-serif-italic">free from recurring software lock-in.&rdquo;</span>
            </>
          ) : (
            <>
              &laquo;&nbsp;UN CODE SUR-MESURE DURABLE, <br />
              <span className="hero-serif-italic">sans aucun abonnement captif.&nbsp;&raquo;</span>
            </>
          )}
        </h2>
        <p 
          ref={subRef} 
          className="break-sub"
        >
          {isEn
            ? "€0 annual plugin fees • 100% proprietary code • Lightweight & optimized architecture"
            : "0 € de plugins payants chaque année • 100% propriétaire • Architecture légère & optimisée"}
        </p>
      </div>
    </section>
  );
}

