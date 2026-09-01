import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, BookOpen, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../i18n/LanguageContext';

interface GlacierGalleryProps {
  onNavClick?: (targetId: string) => void;
}

export default function GlacierGallery({ onNavClick }: GlacierGalleryProps) {
  const { isEn } = useLanguage();
  const headerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  // Animation au scroll : Éventail 3D depuis le centre vers les côtés
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Animation de l'en-tête
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              end: 'bottom top',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Animation des 4 réalisations en Éventail 3D + Simple Flip Vertical (360°)
      // Ordre : Extrême Gauche (0) -> Extrême Droite (3) -> Centre Gauche (1) -> Centre Droit (2)
      if (stripRef.current) {
        const items = Array.from(stripRef.current.children);
        const initialX = [140, 45, -45, -140];
        const sequenceOrder = [0, 3, 1, 2];

        const galleryTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: stripRef.current,
            start: 'top 80%',
            end: 'bottom top',
            toggleActions: 'play none none reverse',
          },
        });

        sequenceOrder.forEach((itemIdx, stepIndex) => {
          const item = items[itemIdx];
          if (!item) return;

          galleryTimeline.fromTo(
            item,
            {
              opacity: 0,
              x: initialX[itemIdx] || 0,
              scale: 0.8,
              filter: 'blur(10px)',
              rotateX: 360,
              transformPerspective: 1000,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              filter: 'blur(0px)',
              rotateX: 0,
              duration: 0.9,
              ease: 'power2.out',
            },
            stepIndex === 0 ? 0 : '-=0.65'
          );
        });
      }
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (onNavClick) {
      onNavClick(targetId);
      return;
    }
    if (typeof window !== 'undefined') {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section 
      className="glacier-gallery-section overflow-hidden" 
      id="realisations" 
      aria-labelledby="gallery-title"
    >
      <div ref={headerRef} className="gallery-header">
        <h2 id="gallery-title" className="gallery-tag-title">
          {isEn ? "#DEVSUPAI PROJECTS" : "#RÉALISATIONS DEVSUPAI"}
        </h2>
        <p className="gallery-sub-text">
          {isEn
            ? "A glimpse of the craftsmanship and attention to detail brought to every interface"
            : "Un aperçu de la qualité de finition apportée à chaque interface"}
        </p>
      </div>

      <div ref={stripRef} className="gallery-photos-strip">
        
        {/* Item 1 : L'Atelier Gourmand */}
        <div className="gallery-photo-item group">
          <img 
            src="/atelier-gourmand.webp" 
            alt={isEn 
              ? "Restaurant showcase website and custom direct booking system created by DevSupAi" 
              : "Site internet vitrine et réservation en ligne pour restaurant bistronomique créé par DevSupAi"} 
            width="400"
            height="280"
            loading="lazy"
            className="gal-img"
          />
          <div className="gal-hover-overlay">
            <h3 className="font-bold text-white text-base">L'Atelier Gourmand</h3>
            <span>{isEn ? "Bistronomic Showcase • 0% Commission" : "Vitrine Bistronomique • 0% Commission"}</span>
            <div className="flex items-center gap-2 mt-2">
              <Link 
                to={isEn ? "/en/projects/atelier-gourmand" : "/projets/atelier-gourmand"} 
                className="gal-link-btn"
                title={isEn ? "Read complete case study" : "Consulter l'étude de cas complète"}
              >
                <BookOpen className="w-3 h-3 inline" aria-hidden="true" />
                {isEn ? "Case study" : "Étude de cas"}
              </Link>
              <a 
                href="https://ateliergourmand.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="gal-link-demo"
                title={isEn ? "Test live demo" : "Tester la démo live"}
              >
                {isEn ? "Demo" : "Démo"} <ExternalLink className="w-3 h-3 inline" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Item 2 : LocaTool */}
        <div className="gallery-photo-item group">
          <img 
            src="/locatool.webp" 
            alt={isEn 
              ? "SaaS fleet management and PDF invoicing software developed with React TypeScript" 
              : "Application SaaS de gestion de parc matériel et facturation développée en React TypeScript"} 
            width="400"
            height="280"
            loading="lazy"
            className="gal-img"
          />
          <div className="gal-hover-overlay">
            <h3 className="font-bold text-white text-base">LocaTool</h3>
            <span>{isEn ? "Management SaaS & PDF Invoices" : "Logiciel de Gestion & Devis PDF"}</span>
            <div className="flex items-center gap-2 mt-2">
              <Link 
                to={isEn ? "/en/projects/locatool" : "/projets/locatool"} 
                className="gal-link-btn"
                title={isEn ? "Read complete case study" : "Consulter l'étude de cas complète"}
              >
                <BookOpen className="w-3 h-3 inline" aria-hidden="true" />
                {isEn ? "Case study" : "Étude de cas"}
              </Link>
              <a 
                href="https://locatool.devsupai.fr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="gal-link-demo"
                title={isEn ? "Test live demo" : "Tester la démo live"}
              >
                {isEn ? "Demo" : "Démo"} <ExternalLink className="w-3 h-3 inline" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Item 3 : Abogame */}
        <div className="gallery-photo-item group">
          <img 
            src="/abogame.webp" 
            alt={isEn 
              ? "Real-time interactive live audience platform with 60 FPS animations" 
              : "Plateforme interactive temps réel et animations fluides à 60 images par seconde"} 
            width="400"
            height="280"
            loading="lazy"
            className="gal-img"
          />
          <div className="gal-hover-overlay">
            <h3 className="font-bold text-white text-base">Abogame</h3>
            <span>{isEn ? "Live Event Platform 60 FPS" : "Plateforme Événementielle 60 FPS"}</span>
            <div className="flex items-center gap-2 mt-2">
              <Link 
                to={isEn ? "/en/projects/abogame" : "/projets/abogame"} 
                className="gal-link-btn"
                title={isEn ? "Read complete case study" : "Consulter l'étude de cas complète"}
              >
                <BookOpen className="w-3 h-3 inline" aria-hidden="true" />
                {isEn ? "Case study" : "Étude de cas"}
              </Link>
              <a 
                href="https://abogame.devsupai.fr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="gal-link-demo"
                title={isEn ? "Test live demo" : "Tester la démo live"}
              >
                {isEn ? "Demo" : "Démo"} <ExternalLink className="w-3 h-3 inline" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Item 4 : Performance & Architecture */}
        <div className="gallery-photo-item group">
          <img 
            src="/hero-bg-mockup.webp" 
            alt={isEn 
              ? "Technical excellence and optimized React 19 architecture for bespoke websites" 
              : "Excellence technique et architecture légère React 19 pour site sur-mesure"} 
            width="400"
            height="280"
            loading="lazy"
            className="gal-img"
          />
          <div className="gal-hover-overlay">
            <h3 className="font-bold text-white text-base">{isEn ? "Optimized Architecture" : "Architecture Optimisée"}</h3>
            <span>{isEn ? "Lightweight React 19 & Zero Bloat" : "Architecture React 19 Ultra-Légère"}</span>
            <div className="flex items-center gap-2 mt-2">
              <Link 
                to={isEn ? "/en/blog/performance-web-sur-mesure" : "/blog/performance-web-sur-mesure"} 
                className="gal-link-btn"
                title={isEn ? "Read web performance guide" : "Lire l'article sur la performance web"}
              >
                <BookOpen className="w-3 h-3 inline" aria-hidden="true" />
                {isEn ? "Read article" : "Lire l'article"}
              </Link>
              <a 
                href="#contact" 
                onClick={(e) => handleAnchorClick(e, 'contact')} 
                className="gal-link-demo cursor-pointer"
              >
                {isEn ? "Your Project" : "Votre Projet"} <ArrowRight className="w-3 h-3 inline" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

