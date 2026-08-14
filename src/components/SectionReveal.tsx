import { useEffect, useRef } from 'react';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export default function SectionReveal({ children, className = '', id, style }: SectionRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = containerRef.current;
    if (!el) return;

    // Support accessibility preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      el.classList.add('section-visible');
      return;
    }

    // Safety fallback: ensure visibility even if intersection observer is delayed
    const safetyTimer = setTimeout(() => {
      el.classList.add('section-visible');
    }, 1000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('section-visible');
          clearTimeout(safetyTimer);
          observer.unobserve(el);
        }
      },
      { threshold: 0.01, rootMargin: '50px 0px 50px 0px' }
    );

    observer.observe(el);
    return () => {
      clearTimeout(safetyTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={`section-reveal section-visible ${className}`} id={id} style={style}>
      {children}
    </div>
  );
}
