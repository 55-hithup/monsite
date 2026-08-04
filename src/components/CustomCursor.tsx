import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    // Check reduced motion settings
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReduced(mediaQuery.matches);
    if (mediaQuery.matches) {
      document.body.classList.add('reduced-motion');
    }
    
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsReduced(e.matches);
      if (e.matches) {
        document.body.classList.add('reduced-motion');
      } else {
        document.body.classList.remove('reduced-motion');
      }
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (isReduced) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const mouse = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    const lerpAmount = 0.15;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const updateCursor = () => {
      // Smooth lerp formula: current = current + (target - current) * lerp
      current.x += (mouse.x - current.x) * lerpAmount;
      current.y += (mouse.y - current.y) * lerpAmount;

      if (cursor) {
        cursor.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    updateCursor();

    // Use event delegation to catch elements dynamically
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isInteractive = target.closest('a, button, input, select, textarea, [role="button"], .interactive-hover');
      if (isInteractive) {
        setHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isInteractive = target.closest('a, button, input, select, textarea, [role="button"], .interactive-hover');
      if (isInteractive) {
        setHovering(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isReduced]);

  if (isReduced) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor hidden md:block ${hovering ? 'hovering' : ''}`}
    />
  );
}
