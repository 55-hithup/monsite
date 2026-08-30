import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface GlacierLogoRevealProps {
  isEn?: boolean;
  onComplete?: () => void;
}

export default function GlacierLogoReveal({ isEn = false, onComplete }: GlacierLogoRevealProps) {
  const location = useLocation();
  const textWrapRef = useRef<HTMLSpanElement>(null);
  const textRevealRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let animationFrameId: number;
    let isCancelled = false;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const runAnimation = () => {
      if (isCancelled) return;

      const textWrap = textWrapRef.current;
      const textReveal = textRevealRef.current;
      const logo = logoRef.current;

      if (!textWrap || !textReveal || !logo) return;

      // Mesure des dimensions réelles
      const textRect = textWrap.getBoundingClientRect();
      const textWidth = textRect.width || textWrap.offsetWidth;
      
      const logoComputedHeight = parseFloat(window.getComputedStyle(logo).height) || 48;
      const logoNaturalRatio = logo.naturalWidth && logo.naturalHeight ? logo.naturalWidth / logo.naturalHeight : 1;
      const logoWidth = logo.getBoundingClientRect().width || logoComputedHeight * logoNaturalRatio || 48;

      const startX = -logoWidth - 8;
      const endX = textWidth + (logoWidth * 0.12);

      // Si l'utilisateur préfère réduire le mouvement, état final instantané
      if (prefersReducedMotion) {
        textReveal.style.clipPath = 'inset(0 0 0 0)';
        (textReveal.style as unknown as Record<string, string>).webkitClipPath = 'inset(0 0 0 0)';
        logo.style.transform = `translate(${endX}px, -50%)`;
        logo.style.opacity = '1';
        setIsReady(true);
        if (onComplete) onComplete();
        return;
      }

      // Initialisation de la position de départ (masqué)
      textReveal.style.clipPath = `inset(0 ${textWidth}px 0 0)`;
      (textReveal.style as unknown as Record<string, string>).webkitClipPath = `inset(0 ${textWidth}px 0 0)`;
      logo.style.transform = `translate(${startX}px, -50%)`;
      logo.style.opacity = '1';
      setIsReady(true);

      const duration = 1600; // 1.6 secondes
      const startTime = performance.now();

      // Courbe easeOutCubic : départ dynamique, ralentissement soigné vers la fin
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const frame = (now: number) => {
        if (isCancelled) return;

        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(t);

        const currentX = startX + (endX - startX) * eased;
        logo.style.transform = `translate(${currentX}px, -50%)`;

        // Le centre du logo est le curseur de révélation
        const logoCenter = currentX + logoWidth / 2;
        const revealPx = Math.max(0, Math.min(logoCenter, textWidth));
        const clipRight = Math.max(0, textWidth - revealPx);

        textReveal.style.clipPath = `inset(0 ${clipRight}px 0 0)`;
        (textReveal.style as unknown as Record<string, string>).webkitClipPath = `inset(0 ${clipRight}px 0 0)`;

        if (t < 1) {
          animationFrameId = requestAnimationFrame(frame);
        } else {
          // État final garanti
          textReveal.style.clipPath = 'inset(0 0 0 0)';
          (textReveal.style as unknown as Record<string, string>).webkitClipPath = 'inset(0 0 0 0)';
          logo.style.transform = `translate(${endX}px, -50%)`;
          if (onComplete) {
            onComplete();
          }
        }
      };

      animationFrameId = requestAnimationFrame(frame);
    };

    // Attente du chargement des polices web (Montserrat) pour un calcul de largeur précis
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!isCancelled) {
          requestAnimationFrame(runAnimation);
        }
      });
    } else {
      const timer = setTimeout(runAnimation, 150);
      return () => {
        clearTimeout(timer);
        isCancelled = true;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      };
    }

    return () => {
      isCancelled = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [location.pathname]);

  return (
    <span 
      ref={textWrapRef} 
      className="glacier-logo-wrap"
      aria-label={isEn ? "DevSupAi Web Atelier" : "Atelier Web DevSupAi"}
    >
      <span 
        ref={textRevealRef} 
        className={`glacier-logo-text-reveal ${!isReady ? 'opacity-100' : ''}`}
      >
        DEVSUPAI
      </span>
      <img
        ref={logoRef}
        src="/logo.webp"
        alt=""
        aria-hidden="true"
        width={64}
        height={64}
        className="glacier-logo-reveal-icon"
      />
    </span>
  );
}
