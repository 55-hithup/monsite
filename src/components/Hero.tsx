import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticWrapper from './MagneticWrapper';

export default function Hero() {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // 1. Initial load reveal animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo('.hero-title .line span', { y: '110%' }, { y: 0, duration: 1, stagger: 0.12 }, 0)
      .to('.hero-sub', { opacity: 1, y: 0, duration: 0.8 }, 0.5)
      .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.8 }, 0.65);

    gsap.set('.hero-sub, .hero-ctas', { opacity: 0, y: 20 });

    // 2. Liquid filter load animation
    const displacementMap = document.getElementById('displacement-map');
    const feTurbulence = document.getElementById('fe-turbulence');
    
    if (displacementMap) {
      gsap.fromTo(displacementMap,
        { attr: { scale: 80 } },
        { attr: { scale: 0 }, duration: 2.2, ease: 'power2.out' }
      );
    }

    // 3. Liquid hover interaction
    const h1 = h1Ref.current;
    if (h1 && displacementMap && feTurbulence) {
      const turb = { x: 0.02, y: 0.02 };
      
      let hoverTween: gsap.core.Tween | null = null;
      let waveTween: gsap.core.Tween | null = null;

      const handleMouseEnter = () => {
        if (hoverTween) hoverTween.kill();
        if (waveTween) waveTween.kill();

        // Wave scale distortion
        hoverTween = gsap.to(displacementMap, {
          attr: { scale: 22 },
          duration: 0.4,
          ease: 'power1.out',
        });

        // Loop turbulence frequency to animate fluid waves
        waveTween = gsap.to(turb, {
          x: 0.05,
          y: 0.08,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          onUpdate: () => {
            feTurbulence.setAttribute('baseFrequency', `${turb.x} ${turb.y}`);
          },
        });
      };

      const handleMouseLeave = () => {
        if (hoverTween) hoverTween.kill();
        if (waveTween) waveTween.kill();

        // Return scale back to zero smoothly
        hoverTween = gsap.to(displacementMap, {
          attr: { scale: 0 },
          duration: 0.8,
          ease: 'power2.out',
        });

        // Reset frequency to default
        waveTween = gsap.to(turb, {
          x: 0.02,
          y: 0.02,
          duration: 0.8,
          ease: 'power2.out',
          onUpdate: () => {
            feTurbulence.setAttribute('baseFrequency', `${turb.x} ${turb.y}`);
          },
        });
      };

      h1.addEventListener('mouseenter', handleMouseEnter);
      h1.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        tl.kill();
        if (hoverTween) hoverTween.kill();
        if (waveTween) waveTween.kill();
        h1.removeEventListener('mouseenter', handleMouseEnter);
        h1.removeEventListener('mouseleave', handleMouseLeave);
      };
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
          src="/hero-bg-mockup.png"
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#6B4FE0]/30 bg-[#6B4FE0]/10 text-[10px] label-mono text-purple-300 mb-6 reveal">
            <span className="text-[#2E8FE0] font-bold">&lt;/&gt;</span>
            <span>DÉVELOPPEUR WEB</span>
          </div>

          {/* Heading with Liquid Filter style applied */}
          <h1
            ref={h1Ref}
            className="hero-title cursor-default"
            style={{ filter: 'url(#liquid-filter)', willChange: 'filter' }}
          >
            <span className="line"><span>Je transforme</span></span>
            <span className="line"><span>vos idées en</span></span>
            <span className="line">
              <span className="grad">expériences</span>
            </span>
            <span className="line">
              <span className="grad">digitales</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-sub" style={{ marginTop: '20px', marginBottom: '35px' }}>
            Développeur web passionné, j'aide les entreprises à se démarquer avec des sites performants, modernes et sur-mesure.
          </p>

          {/* CTAs */}
          <div className="hero-ctas flex flex-wrap items-center gap-4">
            <MagneticWrapper range={40} strength={0.3}>
              <a href="#realisations" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)', color: '#fff', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Voir mes projets <span className="text-sm">→</span>
              </a>
            </MagneticWrapper>
            
            <MagneticWrapper range={35} strength={0.25}>
              <a href="#contact" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(245,246,250,0.12)' }}>
                💬 Me contacter
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
