import { useEffect } from 'react';
import gsap from 'gsap';
import MagneticWrapper from './MagneticWrapper';

export default function Hero() {
  useEffect(() => {
    // 1. Initial load reveal animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo('.hero-title .line span', { y: '110%' }, { y: 0, duration: 1, stagger: 0.12 }, 0)
      .to('.hero-sub', { opacity: 1, y: 0, duration: 0.8 }, 0.5)
      .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.8 }, 0.65);

    gsap.set('.hero-sub, .hero-ctas', { opacity: 0, y: 20 });

    // 2. Liquid filter load animation
    const displacementMap = document.getElementById('displacement-map');
    
    if (displacementMap) {
      gsap.fromTo(displacementMap,
        { attr: { scale: 80 } },
        { attr: { scale: 0 }, duration: 2.2, ease: 'power2.out' }
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="hero" id="accueil" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      {/* Widescreen Background Mockup Image */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none overflow-hidden">
        <img
          src="/hero-bg-mockup.webp"
          alt="DevSupAi 3D Showcase Widescreen Background"
          fetchPriority="high"
          loading="eager"
          className="w-full h-full object-cover object-right max-md:object-[82%_center] max-md:scale-[1.8] max-md:origin-[82%_center]"
        />
        {/* Soft gradient masks to guarantee high contrast on all screens */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B122C] via-[#0B122C]/60 to-transparent md:block hidden"></div>
        <div className="absolute inset-0 bg-[#0B122C]/70 md:hidden block"></div>
      </div>
      
      {/* Overlay Text Content */}
      <div className="wrap relative z-10 w-full" style={{ maxWidth: '1440px', paddingLeft: 'var(--space-xl)', paddingRight: 'var(--space-xl)' }}>
        <div className="max-w-[620px] text-left">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2E8FE0]/40 bg-[#2E8FE0]/10 text-[10px] label-mono text-cyan-300 mb-6 reveal">
            <span className="text-[#2E8FE0] font-bold">&lt;/&gt;</span>
            <span>CRÉATION WEB & SAAS SUR-MESURE : PME, TPE & ASSOCIATIONS</span>
          </div>

          {/* Heading */}
          <h1
            className="hero-title cursor-default text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight"
            style={{ filter: 'url(#liquid-filter)', willChange: 'filter' }}
          >
            <span className="line">
              <span>Création de sites web <span className="inline-block whitespace-nowrap">sur&#8209;mesure</span></span>
            </span>
            <span className="line">
              <span className="grad">pour PME & Associations</span>
            </span>
          </h1>

          {/* Subtitle / Key Information Box */}
          <div className="hero-sub mt-6 mb-8 p-4 md:p-5 rounded-2xl bg-[#121729]/80 border border-[#2E8FE0]/30 text-xs md:text-sm text-text-secondary leading-relaxed backdrop-blur-sm shadow-[0_0_30px_rgba(46,143,224,0.1)]">
            <p className="font-semibold text-text-primary mb-1">
              <strong>Des sites rapides, clairs et efficaces :</strong>
            </p>
            <p>
              Je conçois des sites internet, des applications et des outils web sur-mesure spécialement adaptés aux besoins des PME, TPE et Associations. Mon objectif : vous offrir une présence en ligne moderne, rapide à charger et facile à utiliser pour vos visiteurs.
            </p>
          </div>

          {/* CTAs */}
          <div className="hero-ctas flex flex-wrap items-center gap-4">
            <MagneticWrapper range={40} strength={0.3}>
              <a href="#contact" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)', color: '#fff', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Demander un devis PME / Asso →
              </a>
            </MagneticWrapper>
            
            <MagneticWrapper range={35} strength={0.25}>
              <a href="#solutions" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(245,246,250,0.15)' }}>
                Voir les solutions PME & Asso
              </a>
            </MagneticWrapper>
          </div>
        </div>
      </div>
      
      <div className="scroll-cue"><span>Scroll</span><div className="scroll-line"></div></div>

      {/* SVG Liquid Filter Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none" style={{ visibility: 'hidden' }}>
        <defs>
          <filter id="liquid-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02 0.02"
              numOctaves="3"
              result="noise"
              id="fe-turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
              id="displacement-map"
            />
          </filter>
        </defs>
      </svg>
    </section>
  );
}
