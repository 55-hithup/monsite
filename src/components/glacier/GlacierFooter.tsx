import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function GlacierFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glacier-bottom-footer w-full" role="contentinfo">
      <div className="container mx-auto px-6 max-w-6xl footer-bottom-flex">
        <div className="legal-links">
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/politique-de-confidentialite">Politique de confidentialité</Link>
          <Link to="/nos-services">Catalogue complet</Link>
          <Link 
            to="/admin/login" 
            className="inline-flex items-center gap-1.5 hover:text-[#0284C7] font-bold text-[#1A1A1A] transition-colors"
            title="Accès à l'Espace Personnel et Gestion des avis"
          >
            <Lock className="w-3.5 h-3.5 text-[#0284C7]" aria-hidden="true" />
            Espace Perso
          </Link>
        </div>
        <div className="copyright-text">
          &copy; {currentYear} par DevSupAi • Alexandre Pabst. Créé sur-mesure sans CMS.
        </div>
      </div>
    </footer>
  );
}
