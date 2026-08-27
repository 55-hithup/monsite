import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionReveal from './SectionReveal';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

export default function Stats() {
  const statsRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = translations[language].stats;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const paths = statsRef.current?.querySelectorAll('.draw-path');
    if (!paths || paths.length === 0) return;

    // Normalize pathLength to 100 on all SVG elements to prevent calling getTotalLength() (forced reflow)
    paths.forEach((path) => {
      (path as SVGGeometryElement).setAttribute('pathLength', '100');
    });

    const ctx = gsap.context(() => {
      gsap.set(paths, {
        strokeDasharray: 100,
        strokeDashoffset: 100,
      });

      // Single batched scroll trigger for the entire stats container
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: 'power2.out',
        stagger: 0.04,
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, statsRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Calculate rotation angles based on cursor offset from card center
    const angleX = -((y - yc) / yc) * 12; // 12 degrees max
    const angleY = ((x - xc) / xc) * 12;

    // Apply smooth 3D rotation with perspective
    gsap.to(card, {
      rotateX: angleX,
      rotateY: angleY,
      transformPerspective: 800,
      ease: 'power3.out',
      duration: 0.4,
      overwrite: 'auto',
    });

    // Move spotlight element to track mouse pointer
    const glow = card.querySelector('.glow-spotlight') as HTMLElement;
    if (glow) {
      gsap.to(glow, {
        left: `${x}px`,
        top: `${y}px`,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const glow = card.querySelector('.glow-spotlight') as HTMLElement;
    if (glow) {
      gsap.to(glow, {
        opacity: 1,
        duration: 0.3,
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    
    // Return card rotation to zero smoothly
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      ease: 'power3.out',
      duration: 0.6,
      overwrite: 'auto',
    });

    // Fade out spotlight glow
    const glow = card.querySelector('.glow-spotlight') as HTMLElement;
    if (glow) {
      gsap.to(glow, {
        opacity: 0,
        duration: 0.5,
      });
    }
  };

  const icons = [
    (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="16 18 22 12 16 6" className="draw-path" />
        <polyline points="8 6 2 12 8 18" className="draw-path" />
        <line x1="14" y1="4" x2="10" y2="20" className="draw-path" />
      </svg>
    ),
    (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83" className="draw-path" />
        <line x1="12" y1="12" x2="19" y2="5" className="draw-path" />
        <circle cx="12" cy="12" r="2.5" className="draw-path" />
      </svg>
    ),
    (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" className="draw-path" />
        <line x1="12" y1="22" x2="12" y2="12" className="draw-path" />
        <line x1="12" y1="12" x2="22" y2="8.5" className="draw-path" />
        <line x1="12" y1="12" x2="2" y2="8.5" className="draw-path" />
        <polyline points="22 8.5 12 15 2 8.5" className="draw-path" />
        <polyline points="22 15.5 12 22 2 15.5" className="draw-path" />
      </svg>
    ),
    (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" className="draw-path" />
        <circle cx="9" cy="7" r="4" className="draw-path" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" className="draw-path" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" className="draw-path" />
      </svg>
    ),
  ];

  return (
    <SectionReveal className="stats-section" style={{ padding: '80px 0' }}>
      <div className="wrap" ref={statsRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: '1000px' }}>
          {t.pillars.map((pillar, idx) => (
            <div 
              key={idx} 
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="cursor-target p-6 bg-[#121729]/40 border border-[rgba(245,246,250,0.06)] rounded-[12px] transition-shadow duration-300 hover:border-[#2E8FE0]/40 hover:bg-[#121729]/80 relative overflow-hidden group text-left"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              {/* Spotlight mouse tracker radial glow */}
              <div 
                className="glow-spotlight absolute w-[200px] h-[200px] rounded-full bg-radial from-[#2E8FE0]/15 to-transparent blur-xl pointer-events-none select-none -translate-x-1/2 -translate-y-1/2 opacity-0"
                style={{ willChange: 'top, left, opacity' }}
              ></div>

              {/* Animated Icon Container */}
              <div 
                className="w-12 h-12 rounded-[8px] bg-[#0B0F1E] border border-[rgba(245,246,250,0.06)] flex items-center justify-center mb-5 transition-all duration-300 group-hover:border-[#2E8FE0]/30 group-hover:bg-[#6B4FE0]/10 text-[#2E8FE0] group-hover:text-purple-300"
                style={{ transform: 'translateZ(25px)', willChange: 'transform' }}
              >
                {icons[idx]}
              </div>
              
              {/* Category tag */}
              <span 
                className="text-xs label-mono text-purple-300/80 uppercase tracking-wider block"
                style={{ transform: 'translateZ(10px)', willChange: 'transform' }}
              >
                {pillar.tag}
              </span>
              
              {/* Title */}
              <h2 
                className="text-base font-bold text-text-primary mt-1.5 mb-2.5 group-hover:text-[#2E8FE0] transition-colors"
                style={{ transform: 'translateZ(15px)', willChange: 'transform' }}
              >
                {pillar.title}
              </h2>
              
              {/* Description */}
              <p 
                className="text-xs text-text-secondary leading-relaxed"
                style={{ transform: 'translateZ(8px)', willChange: 'transform' }}
              >
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
