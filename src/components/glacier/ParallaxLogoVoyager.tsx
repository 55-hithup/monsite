import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface ParallaxLogoVoyagerProps {
  /**
   * Trajectory variant:
   * - 'curve-right': Slalom double pulsation (gauche -> fond centre -> surgissement XXL droite -> sortie).
   * - 'curve-left': Slalom double pulsation inversé (droite -> fond centre -> surgissement XXL gauche -> sortie).
   * - 'ascend': Double ascension fluide avec passage bas -> fond centre -> émergence XXL haute.
   */
  variant?: 'curve-right' | 'curve-left' | 'ascend';
  /** Base width/height in px. Default: 200 */
  size?: number;
  /** Custom additional CSS class */
  className?: string;
}

export default function ParallaxLogoVoyager({
  variant = 'curve-right',
  size = 200,
  className = '',
}: ParallaxLogoVoyagerProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !trackRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const el = trackRef.current;
    const parent = el.parentElement || el;

    const ctx = gsap.context(() => {
      // Points clés : logo 100% opaque dans le cadre, zéro flou GPU, trajectoire continue sans à-coups
      let points = {
        // 0. Départ : Hors écran en haut à gauche
        p0: { x: '-70vw', y: '-52vh', scale: 0.2, opacity: 0 },
        // 1. Premier passage rapproché (22% scroll) : Sur le flanc GAUCHE, 100% opaque et net
        p1: { x: '-28vw', y: '-10vh', scale: 1.45, opacity: 1 },
        // 2. Plongée en profondeur (48% scroll) : Passe derrière le texte au CENTRE, réduit et opaque
        p2: { x: '2vw', y: '12vh', scale: 0.5, opacity: 1 },
        // 3. Deuxième surgissement XXL (74% scroll) : Surgit à DROITE en grand format, mordant sur le bord
        p3: { x: '36vw', y: '-6vh', scale: 2.2, opacity: 1 },
        // 4. Amorçage de la fuite (88% scroll) : Descente vers le bas-droit
        p4: { x: '55vw', y: '25vh', scale: 0.85, opacity: 1 },
        // 5. Éjection finale (100% scroll) : Sortie complète hors champ
        p5: { x: '82vw', y: '60vh', scale: 0.2, opacity: 0 },
      };

      if (variant === 'curve-left') {
        points = {
          p0: { x: '70vw', y: '-52vh', scale: 0.2, opacity: 0 },
          p1: { x: '28vw', y: '-10vh', scale: 1.45, opacity: 1 },
          p2: { x: '-2vw', y: '12vh', scale: 0.5, opacity: 1 },
          p3: { x: '-36vw', y: '-6vh', scale: 2.2, opacity: 1 },
          p4: { x: '-55vw', y: '25vh', scale: 0.85, opacity: 1 },
          p5: { x: '-82vw', y: '60vh', scale: 0.2, opacity: 0 },
        };
      } else if (variant === 'ascend') {
        points = {
          p0: { x: '-50vw', y: '65vh', scale: 0.2, opacity: 0 },
          p1: { x: '-22vw', y: '16vh', scale: 1.4, opacity: 1 },
          p2: { x: '0vw', y: '-12vh', scale: 0.5, opacity: 1 },
          p3: { x: '35vw', y: '4vh', scale: 2.25, opacity: 1 },
          p4: { x: '52vw', y: '-35vh', scale: 0.85, opacity: 1 },
          p5: { x: '78vw', y: '-70vh', scale: 0.2, opacity: 0 },
        };
      }

      // Initialisation aux coordonnées p0
      gsap.set(el, {
        x: points.p0.x,
        y: points.p0.y,
        scale: points.p0.scale,
        opacity: points.p0.opacity,
        force3D: true,
      });

      // Timeline fluide GSAP ScrollTrigger asservie au scroll du conteneur parent
      // Note : ease: 'none' sur les segments garantit une vitesse continue sans ralentissement aux étapes
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parent,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      tl.to(el, {
        x: points.p1.x,
        y: points.p1.y,
        scale: points.p1.scale,
        opacity: points.p1.opacity,
        ease: 'none',
        duration: 0.22,
      })
      .to(el, {
        x: points.p2.x,
        y: points.p2.y,
        scale: points.p2.scale,
        opacity: points.p2.opacity,
        ease: 'none',
        duration: 0.26,
      })
      .to(el, {
        x: points.p3.x,
        y: points.p3.y,
        scale: points.p3.scale,
        opacity: points.p3.opacity,
        ease: 'none',
        duration: 0.26,
      })
      .to(el, {
        x: points.p4.x,
        y: points.p4.y,
        scale: points.p4.scale,
        opacity: points.p4.opacity,
        ease: 'none',
        duration: 0.14,
      })
      .to(el, {
        x: points.p5.x,
        y: points.p5.y,
        scale: points.p5.scale,
        opacity: points.p5.opacity,
        ease: 'none',
        duration: 0.12,
      });
    }, parent);

    return () => ctx.revert();
  }, [variant]);

  return (
    <div
      aria-hidden="true"
      className={`parallax-logo-voyager-container pointer-events-none select-none ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        ref={trackRef}
        className="parallax-logo-voyager-track will-change-transform"
        style={{
          width: size,
          height: size,
          position: 'relative',
        }}
      >
        <img
          src="/logo.webp"
          alt=""
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain rounded-full parallax-logo-img drop-shadow-[0_0_35px_rgba(56,189,248,0.3)]"
        />
      </div>
    </div>
  );
}
