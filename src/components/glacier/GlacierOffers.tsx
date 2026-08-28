import { Star } from 'lucide-react';

interface GlacierOffersProps {
  onNavClick?: (targetId: string) => void;
}

export default function GlacierOffers({ onNavClick }: GlacierOffersProps) {
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
    <section className="glacier-split-section" id="services" aria-labelledby="services-title">
      <div className="split-container">
        
        {/* Colonne Gauche : Grande Image Verticale */}
        <div className="split-photo-col">
          <div className="photo-frame-sticky">
            <img 
              src="/atelier-gourmand.webp" 
              alt="Création de site internet vitrine pour restaurant bistronomique en Meuse par Alexandre Pabst" 
              width="600"
              height="620"
              loading="lazy"
              className="tall-photo"
            />
            <div className="photo-caption-tag">CRÉATION SUR-MESURE • 0.4S LCP</div>
          </div>
        </div>

        {/* Colonne Droite : La Carte des Prestations */}
        <div className="split-content-col">
          <span className="col-pre-title">DÉVELOPPEMENT WEB LOCAL &amp; NATIONAL</span>
          <h2 id="services-title" className="col-main-title">NOS FORFAITS &amp; CRÉATIONS</h2>
          <p className="col-lead-desc">
            Chaque site est une création originale conçue sans CMS lourd. Code source 100% propriétaire, hébergement haute vitesse, optimisation SEO local et nom de domaine inclus la première année.
          </p>

          <div className="menu-items-list">
            
            {/* Item 1 : Pack Présence */}
            <div className="menu-item-row">
              <div className="menu-item-head">
                <h3 className="item-name">PACK PRÉSENCE (ONE-PAGE)</h3>
                <span className="item-dots" aria-hidden="true"></span>
                <span className="item-price">DÈS 950 €</span>
              </div>
              <p className="item-desc">
                Une page d'atterrissage élégante et percutante pour présenter votre activité, vos horaires, vos coordonnées et rassurer immédiatement vos futurs clients.
              </p>
              <div className="item-subtags">
                Page unique • Formulaire de contact • Référencement Google • Vitesse &lt; 0.4s
              </div>
            </div>

            {/* Item 2 : Pack Croissance PME (Mis en avant) */}
            <div className="menu-item-row featured-menu-row">
              <div className="menu-item-head">
                <h3 className="item-name flex items-center flex-wrap gap-2">
                  PACK CROISSANCE PME &amp; COMMERCE 
                  <span className="badge-reco">
                    <Star className="w-3 h-3 fill-emerald-600 text-emerald-600 inline" aria-hidden="true" />
                    POPULAIRE
                  </span>
                </h3>
                <span className="item-dots" aria-hidden="true"></span>
                <span className="item-price highlight-price">DÈS 1 850 €</span>
              </div>
              <p className="item-desc">
                La solution complète pour développer votre chiffre d'affaires : 3 à 5 pages sur-mesure, galerie de vos chantiers/réalisations, avis Google vérifiés et module interactif adapté.
              </p>
              <div className="item-subtags">
                Architecture 3 à 5 pages • SEO Local Grand Est &amp; France • Galerie dynamique • Formation incluse
              </div>
            </div>

            {/* Item 3 : Pack SaaS & Outils Métier */}
            <div className="menu-item-row">
              <div className="menu-item-head">
                <h3 className="item-name">PACK SAAS &amp; APPLICATION MÉTIER</h3>
                <span className="item-dots" aria-hidden="true"></span>
                <span className="item-price">DÈS 3 200 €</span>
              </div>
              <p className="item-desc">
                Outils de gestion interne, portails d'adhésions pour associations, suivi d'inventaire en direct et automatisation de devis/factures PDF.
              </p>
              <div className="item-subtags">
                Base de données SQL • Interface React 19 • Authentification sécurisée • Base TJM 400 € / j
              </div>
            </div>

            {/* Item 4 : Option Google Business */}
            <div className="menu-item-row">
              <div className="menu-item-head">
                <h3 className="item-name">GESTION GOOGLE BUSINESS PROFILE</h3>
                <span className="item-dots" aria-hidden="true"></span>
                <span className="item-price">DÈS 29 € / MOIS</span>
              </div>
              <p className="item-desc">
                Optimisation de votre présence sur Google Maps, publication mensuelle de vos actualités, réponse personnalisée aux avis clients et suivi statistique.
              </p>
            </div>

          </div>

          <div className="menu-footer-cta">
            <a 
              href="#contact" 
              onClick={(e) => handleAnchorClick(e, 'contact')} 
              className="btn-glacier-solid cursor-pointer"
            >
              RÉSERVER UN FORFAIT
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
