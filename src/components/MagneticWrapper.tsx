import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface MagneticWrapperProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
}

export default function MagneticWrapper({ children, range = 50, strength = 0.35 }: MagneticWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Respect reduced motion setting
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const elCenterGridX = rect.left + rect.width / 2;
      const elCenterGridY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - elCenterGridX;
      const distanceY = e.clientY - elCenterGridY;
      
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < range) {
        // Calculate magnetic translation
        gsap.to(el, {
          x: distanceX * strength,
          y: distanceY * strength,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        // Reset translation smoothly if outside range
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [range, strength]);

  return (
    <div ref={containerRef} className="inline-block">
      {children}
    </div>
  );
}
