import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (anchorId: string) => {
    const element = document.getElementById(anchorId);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  return (
    <footer className="border-t border-[rgba(245,246,250,0.06)] bg-[var(--color-raised-bg)] pt-16 pb-12 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img 
                src="/logo.png" 
                alt="DevSupAi Logo" 
                className="h-7 w-7 object-contain rounded-full border border-[rgba(245,246,250,0.08)]" 
              />
              <span className="label-mono font-bold text-sm tracking-normal text-text-primary">
                devsup<span className="brand-gradient-text">ai</span>
              </span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Création de plateformes web sur-mesure de haute performance. Je conçois des produits digitaux qui convertissent, optimisés pour le SEO et l'expérience utilisateur.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(245,246,250,0.06)] bg-[rgba(245,246,250,0.02)] text-[10px] label-mono text-text-secondary self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Disponible pour vos projets
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="label-mono text-xs font-bold text-text-primary mb-5 tracking-wider uppercase">Navigation</h4>
            <ul className="flex flex-col gap-3 text-xs text-text-secondary">
              <li>
                <Link to="/" onClick={() => window.scrollTo(0,0)} className="hover:text-text-primary transition-colors cursor-target">Accueil</Link>
              </li>
              <li>
                <Link to="/#services" onClick={() => handleNavClick('services')} className="hover:text-text-primary transition-colors cursor-target">Services</Link>
              </li>
              <li>
                <Link to="/#realisations" onClick={() => handleNavClick('realisations')} className="hover:text-text-primary transition-colors cursor-target">Projets</Link>
              </li>
              <li>
                <Link to="/a-propos" className="hover:text-text-primary transition-colors cursor-target">À Propos</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-text-primary transition-colors cursor-target">Blog & Actus</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Localisation */}
          <div>
            <h4 className="label-mono text-xs font-bold text-text-primary mb-5 tracking-wider uppercase">Contact & Adresse</h4>
            <div className="flex flex-col gap-4 text-xs text-text-secondary">
              <div>
                <span className="text-text-primary block font-medium mb-1">Email :</span>
                <a href="mailto:contact@devsupai.fr" className="hover:text-text-primary transition-colors cursor-target text-[#2E8FE0]">
                  contact@devsupai.fr
                </a>
              </div>
              <div>
                <span className="text-text-primary block font-medium mb-1">Siège social :</span>
                <span className="leading-relaxed block">
                  13 Allée des Roses,<br />
                  55300 Saint-Mihiel (Meuse)
                </span>
              </div>
            </div>
          </div>

          {/* Horaires Section */}
          <div>
            <h4 className="label-mono text-xs font-bold text-text-primary mb-5 tracking-wider uppercase">Horaires d'ouverture</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-text-secondary">
              <li className="flex justify-between border-b border-[rgba(245,246,250,0.04)] pb-1.5">
                <span>Lundi - Vendredi</span>
                <span className="text-text-primary font-medium">08h00 - 18h00</span>
              </li>
              <li className="flex justify-between border-b border-[rgba(245,246,250,0.04)] pb-1.5">
                <span>Samedi</span>
                <span className="text-text-primary font-medium">08h00 - 12h00</span>
              </li>
              <li className="flex justify-between pb-1.5">
                <span>Dimanche</span>
                <span className="text-red-400 font-semibold uppercase text-[10px] tracking-wider">Fermé</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[rgba(245,246,250,0.06)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-text-secondary">
            &copy; {currentYear} devsupai. Tous droits réservés.
          </div>
          <div className="flex flex-wrap gap-6 text-xs text-text-secondary">
            <Link to="/mentions-legales" className="cursor-target hover:text-text-primary transition-colors">Mentions légales</Link>
            <Link to="/politique-de-confidentialite" className="cursor-target hover:text-text-primary transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
