import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface MagneticWrapperProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
}

export default function MagneticWrapper({ children, strength = 0.35 }: MagneticWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Respect reduced motion setting
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    let rect: DOMRect | null = null;

    const handleMouseEnter = () => {
      rect = el.getBoundingClientRect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!rect) rect = el.getBoundingClientRect();
      const elCenterGridX = rect.left + rect.width / 2;
      const elCenterGridY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - elCenterGridX;
      const distanceY = e.clientY - elCenterGridY;

      gsap.to(el, {
        x: distanceX * strength,
        y: distanceY * strength,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      rect = null;
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
        overwrite: 'auto',
      });
    };

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={containerRef} className="inline-block">
      {children}
    </div>
  );
}
