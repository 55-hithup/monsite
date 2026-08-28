interface GlacierHeroProps {
  onNavClick?: (targetId: string) => void;
}

export default function GlacierHero({ onNavClick }: GlacierHeroProps) {
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
    <section className="glacier-hero-banner" aria-label="Présentation de l'Atelier Web DevSupAi">
      <div 
        className="hero-parallax-bg" 
        style={{ backgroundImage: "url('/hero-bg-mockup.webp')" }}
      />
      <div className="hero-tint-overlay" />
      
      <div className="hero-floating-card">
        <span className="hero-small-tag">DÉVELOPPEUR WEB SUR-MESURE • MEUSE (55) &amp; FRANCE</span>
        <h1 className="hero-headline">
          DES SITES WEB RAFFINÉS, <br />
          <span className="hero-serif-italic">faits avec passion &amp; précision.</span>
        </h1>
        <p className="hero-text-paragraph">
          Création de sites vitrines, e-commerce et applications web pour les <strong>PME, artisans, commerçants et associations</strong> en Meuse (Saint-Mihiel, Commercy, Verdun, Bar-le-Duc), Grand Est et toute la France. Des architectures ultra-rapides, 100% propriétaires et sans abonnement captif, conçues par Alexandre Pabst.
        </p>
        <div className="hero-cta-group">
          <a 
            href="#services" 
            onClick={(e) => handleAnchorClick(e, 'services')} 
            className="btn-glacier-solid cursor-pointer"
          >
            DÉCOUVRIR LA CARTE
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleAnchorClick(e, 'contact')} 
            className="btn-glacier-outline cursor-pointer"
          >
            DEMANDER UN DEVIS
          </a>
        </div>
      </div>
    </section>
  );
}
