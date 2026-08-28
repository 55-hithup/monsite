import { Link } from 'react-router-dom';
import { ExternalLink, BookOpen, ArrowRight } from 'lucide-react';

interface GlacierGalleryProps {
  onNavClick?: (targetId: string) => void;
}

export default function GlacierGallery({ onNavClick }: GlacierGalleryProps) {
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
    <section className="glacier-gallery-section" id="realisations" aria-labelledby="gallery-title">
      <div className="gallery-header">
        <h2 id="gallery-title" className="gallery-tag-title">#RÉALISATIONS DEVSUPAI</h2>
        <p className="gallery-sub-text">Un aperçu de la qualité de finition apportée à chaque interface</p>
      </div>

      <div className="gallery-photos-strip">
        
        {/* Item 1 : L'Atelier Gourmand */}
        <div className="gallery-photo-item group">
          <img 
            src="/atelier-gourmand.webp" 
            alt="Site internet vitrine et réservation en ligne pour restaurant bistronomique créé par DevSupAi" 
            width="400"
            height="280"
            loading="lazy"
            className="gal-img"
          />
          <div className="gal-hover-overlay">
            <strong>L'Atelier Gourmand</strong>
            <span>Vitrine Bistronomique • 0% Commission</span>
            <div className="flex items-center gap-2 mt-2">
              <Link 
                to="/projets/atelier-gourmand" 
                className="gal-link-btn"
                title="Consulter l'étude de cas complète"
              >
                <BookOpen className="w-3 h-3 inline" aria-hidden="true" />
                Étude de cas
              </Link>
              <a 
                href="https://ateliergourmand.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="gal-link-demo"
                title="Tester la démo live"
              >
                Démo <ExternalLink className="w-3 h-3 inline" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Item 2 : LocaTool */}
        <div className="gallery-photo-item group">
          <img 
            src="/locatool.webp" 
            alt="Application SaaS de gestion de parc matériel et facturation développée en React TypeScript" 
            width="400"
            height="280"
            loading="lazy"
            className="gal-img"
          />
          <div className="gal-hover-overlay">
            <strong>LocaTool</strong>
            <span>Logiciel de Gestion &amp; Devis PDF</span>
            <div className="flex items-center gap-2 mt-2">
              <Link 
                to="/projets/locatool" 
                className="gal-link-btn"
                title="Consulter l'étude de cas complète"
              >
                <BookOpen className="w-3 h-3 inline" aria-hidden="true" />
                Étude de cas
              </Link>
              <a 
                href="https://locatool.devsupai.fr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="gal-link-demo"
                title="Tester la démo live"
              >
                Démo <ExternalLink className="w-3 h-3 inline" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Item 3 : Abogame */}
        <div className="gallery-photo-item group">
          <img 
            src="/abogame.webp" 
            alt="Plateforme interactive temps réel et animations fluides à 60 images par seconde" 
            width="400"
            height="280"
            loading="lazy"
            className="gal-img"
          />
          <div className="gal-hover-overlay">
            <strong>Abogame</strong>
            <span>Plateforme Événementielle 60 FPS</span>
            <div className="flex items-center gap-2 mt-2">
              <Link 
                to="/projets/abogame" 
                className="gal-link-btn"
                title="Consulter l'étude de cas complète"
              >
                <BookOpen className="w-3 h-3 inline" aria-hidden="true" />
                Étude de cas
              </Link>
              <a 
                href="https://abogame.devsupai.fr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="gal-link-demo"
                title="Tester la démo live"
              >
                Démo <ExternalLink className="w-3 h-3 inline" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Item 4 : Performance & Architecture */}
        <div className="gallery-photo-item group">
          <img 
            src="/hero-bg-mockup.webp" 
            alt="Excellence technique et performance 100 sur 100 Google Lighthouse pour site sur-mesure" 
            width="400"
            height="280"
            loading="lazy"
            className="gal-img"
          />
          <div className="gal-hover-overlay">
            <strong>Score 100/100 Google</strong>
            <span>Architecture React 19 Ultra-Légère</span>
            <div className="flex items-center gap-2 mt-2">
              <Link 
                to="/blog/performance-web-sur-mesure" 
                className="gal-link-btn"
                title="Lire l'article sur la performance web"
              >
                <BookOpen className="w-3 h-3 inline" aria-hidden="true" />
                Lire l'article
              </Link>
              <a 
                href="#contact" 
                onClick={(e) => handleAnchorClick(e, 'contact')} 
                className="gal-link-demo cursor-pointer"
              >
                Votre Projet <ArrowRight className="w-3 h-3 inline" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
