import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface ParallaxLogoVoyagerProps {
  /**
   * Trajectory variant:
   * - 'curve-right': Slalom cosmique double pulsation (gauche -> fond centre -> surgissement XXL droite -> sortie).
   * - 'curve-left': Slalom cosmique double pulsation inversé (droite -> fond centre -> surgissement XXL gauche -> sortie).
   * - 'ascend': Double ascension cosmique avec passage bas -> recul lointain -> émergence XXL haute.
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
      // 6-Point Double-Pulsation Kinematics (Logo 100% à plat, face caméra, sans inclinaison ni 3D)
      let points = {
        // 0. Départ : Totalement hors écran en haut à gauche, invisible et flou
        p0: { x: '-70vw', y: '-52vh', scale: 0.15, opacity: 0, filter: 'blur(18px)' },
        // 1. Premier passage rapproché (20% scroll) : Surgit au premier plan sur le flanc GAUCHE, net
        p1: { x: '-28vw', y: '-10vh', scale: 1.5, opacity: 0.32, filter: 'blur(0px)' },
        // 2. Plongée en profondeur (45% scroll) : Plonge loin derrière le texte au CENTRE, réduit et flouté
        p2: { x: '2vw', y: '14vh', scale: 0.45, opacity: 0.12, filter: 'blur(9px)' },
        // 3. Deuxième surgissement XXL (72% scroll) : Resurgit massivement à DROITE, mordant sur le bord de l'écran, ultra net
        p3: { x: '36vw', y: '-6vh', scale: 2.25, opacity: 0.38, filter: 'blur(0px)' },
        // 4. Amorçage de la fuite (88% scroll) : Descente vers le bas-droit
        p4: { x: '55vw', y: '26vh', scale: 0.85, opacity: 0.16, filter: 'blur(6px)' },
        // 5. Éjection finale (100% scroll) : Disparition complète hors champ
        p5: { x: '82vw', y: '62vh', scale: 0.15, opacity: 0, filter: 'blur(18px)' },
      };

      if (variant === 'curve-left') {
        points = {
          // 0. Départ hors cadre en haut à droite
          p0: { x: '70vw', y: '-52vh', scale: 0.15, opacity: 0, filter: 'blur(18px)' },
          // 1. Premier passage rapproché à DROITE
          p1: { x: '28vw', y: '-10vh', scale: 1.5, opacity: 0.32, filter: 'blur(0px)' },
          // 2. Plongée en profondeur derrière le texte
          p2: { x: '-2vw', y: '14vh', scale: 0.45, opacity: 0.12, filter: 'blur(9px)' },
          // 3. Deuxième surgissement XXL à GAUCHE, mordant sur la marge gauche
          p3: { x: '-36vw', y: '-6vh', scale: 2.25, opacity: 0.38, filter: 'blur(0px)' },
          // 4. Fuite bas-gauche
          p4: { x: '-55vw', y: '26vh', scale: 0.85, opacity: 0.16, filter: 'blur(6px)' },
          // 5. Éjection hors cadre
          p5: { x: '-82vw', y: '62vh', scale: 0.15, opacity: 0, filter: 'blur(18px)' },
        };
      } else if (variant === 'ascend') {
        points = {
          // 0. Départ bas-gauche en profondeur
          p0: { x: '-50vw', y: '65vh', scale: 0.15, opacity: 0, filter: 'blur(18px)' },
          // 1. Premier passage ascendant bas-centre
          p1: { x: '-22vw', y: '16vh', scale: 1.45, opacity: 0.3, filter: 'blur(0px)' },
          // 2. Recul lointain en arrière-plan
          p2: { x: '0vw', y: '-12vh', scale: 0.45, opacity: 0.12, filter: 'blur(9px)' },
          // 3. Émergence XXL en haut-droit, mordant le bord droit
          p3: { x: '35vw', y: '4vh', scale: 2.3, opacity: 0.38, filter: 'blur(0px)' },
          // 4. Trajectoire ascendante
          p4: { x: '52vw', y: '-35vh', scale: 0.85, opacity: 0.16, filter: 'blur(6px)' },
          // 5. Éjection dans l'éther
          p5: { x: '78vw', y: '-72vh', scale: 0.15, opacity: 0, filter: 'blur(18px)' },
        };
      }

      // Initialisation aux coordonnées p0 (hors-champ, face caméra sans rotation)
      gsap.set(el, {
        x: points.p0.x,
        y: points.p0.y,
        scale: points.p0.scale,
        opacity: points.p0.opacity,
        filter: points.p0.filter,
        rotate: 0,
        rotateX: 0,
        rotateY: 0,
      });

      // Timeline GSAP ScrollTrigger asservie au scroll du conteneur parent
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parent,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // 5 étapes d'inflexion non linéaires (Double Pulsation sans inclinaison)
      tl.to(el, {
        x: points.p1.x,
        y: points.p1.y,
        scale: points.p1.scale,
        opacity: points.p1.opacity,
        filter: points.p1.filter,
        ease: 'sine.inOut',
        duration: 0.20,
      })
      .to(el, {
        x: points.p2.x,
        y: points.p2.y,
        scale: points.p2.scale,
        opacity: points.p2.opacity,
        filter: points.p2.filter,
        ease: 'sine.inOut',
        duration: 0.25,
      })
      .to(el, {
        x: points.p3.x,
        y: points.p3.y,
        scale: points.p3.scale,
        opacity: points.p3.opacity,
        filter: points.p3.filter,
        ease: 'sine.inOut',
        duration: 0.27,
      })
      .to(el, {
        x: points.p4.x,
        y: points.p4.y,
        scale: points.p4.scale,
        opacity: points.p4.opacity,
        filter: points.p4.filter,
        ease: 'sine.inOut',
        duration: 0.16,
      })
      .to(el, {
        x: points.p5.x,
        y: points.p5.y,
        scale: points.p5.scale,
        opacity: points.p5.opacity,
        filter: points.p5.filter,
        ease: 'sine.inOut',
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
      {/* Outer track: Driven purely by GSAP ScrollTrigger along the double-pulsation path (flat, front-facing) */}
      <div
        ref={trackRef}
        className="parallax-logo-voyager-track will-change-transform"
        style={{
          width: size,
          height: size,
          position: 'relative',
        }}
      >
        {/* Inner float: Subtle continuous vertical breathing idle animation at rest */}
        <div className="parallax-logo-voyager-float w-full h-full">
          <img
            src="/logo.webp"
            alt=""
            width={size}
            height={size}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain rounded-full parallax-logo-img drop-shadow-[0_0_40px_rgba(56,189,248,0.35)]"
          />
        </div>
      </div>
    </div>
  );
}
