import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export default function SectionReveal({ children, className = '', id, style }: SectionRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Support accessibility preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    // GSAP scroll trigger animation
    gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power4.out', // closest approximation to cubic-bezier(0.16, 1, 0.3, 1)
        scrollTrigger: {
          trigger: el,
          start: 'top 80%', // triggers when 20% of the section height is in view
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div ref={containerRef} className={className} id={id} style={style}>
      {children}
    </div>
  );
}
