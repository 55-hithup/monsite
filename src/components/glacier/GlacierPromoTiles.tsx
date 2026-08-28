import { ArrowRight } from 'lucide-react';

interface GlacierPromoTilesProps {
  onNavClick?: (targetId: string) => void;
}

export default function GlacierPromoTiles({ onNavClick }: GlacierPromoTilesProps) {
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
    <section className="glacier-promo-tiles" id="occasions" aria-labelledby="promo-tiles-title">
      <h2 id="promo-tiles-title" className="sr-only">
        Portfolio de l'Atelier et Méthodologie Artisanale
      </h2>
      <div className="tiles-grid">
        
        {/* Tuile 1 : Réalisations concrètes */}
        <div className="promo-tile-card tile-1">
          <div 
            className="tile-bg-image" 
            style={{ backgroundImage: "url('/locatool.webp')" }}
          />
          <div className="tile-tint" />
          <div className="tile-text-wrap">
            <span className="tile-eyebrow">PORTFOLIO DE L'ATELIER</span>
            <h3 className="tile-title">APPLICATIONS &amp; SITES EN LIGNE</h3>
            <p className="tile-desc">
              Découvrez LocaTool, L'Atelier Gourmand et Abogame : des créations réelles en production.
            </p>
            <a 
              href="#realisations" 
              onClick={(e) => handleAnchorClick(e, 'realisations')} 
              className="btn-tile-link cursor-pointer inline-flex items-center gap-1.5"
            >
              DÉCOUVRIR LES PROJETS <ArrowRight className="w-3.5 h-3.5 inline" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Tuile 2 : Philosophie Artisanale */}
        <div className="promo-tile-card tile-2" id="atelier">
          <div 
            className="tile-bg-image" 
            style={{ backgroundImage: "url('/abogame.webp')" }}
          />
          <div className="tile-tint" />
          <div className="tile-text-wrap">
            <span className="tile-eyebrow">MÉTHODOLOGIE ARTISANALE</span>
            <h3 className="tile-title">L'EXCELLENCE SANS INTERMÉDIAIRE</h3>
            <p className="tile-desc">
              Un échange direct avec Alexandre Pabst, de la première esquisse jusqu'à la mise en ligne.
            </p>
            <a 
              href="#contact" 
              onClick={(e) => handleAnchorClick(e, 'contact')} 
              className="btn-tile-link cursor-pointer inline-flex items-center gap-1.5"
            >
              PARLER DE MON PROJET <ArrowRight className="w-3.5 h-3.5 inline" aria-hidden="true" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
