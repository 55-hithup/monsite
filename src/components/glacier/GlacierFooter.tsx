import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export default function GlacierFooter() {
  const currentYear = new Date().getFullYear();
  const { isEn } = useLanguage();

  return (
    <footer className="glacier-bottom-footer w-full" role="contentinfo">
      <div className="container mx-auto px-6 max-w-6xl footer-bottom-flex">
        <div className="legal-links">
          <Link to={isEn ? '/en/legal-notices' : '/mentions-legales'}>
            {isEn ? 'Legal Notices' : 'Mentions légales'}
          </Link>
          <Link to={isEn ? '/en/privacy-policy' : '/politique-de-confidentialite'}>
            {isEn ? 'Privacy Policy' : 'Politique de confidentialité'}
          </Link>
          <Link to={isEn ? '/en/services' : '/nos-services'}>
            {isEn ? 'Services Catalog' : 'Catalogue complet'}
          </Link>
          <Link 
            to="/admin/login" 
            className="inline-flex items-center gap-1.5 hover:text-[#0284C7] font-bold text-[#1A1A1A] transition-colors"
            title={isEn ? 'Personal space and review moderation' : "Accès à l'Espace Personnel et Gestion des avis"}
          >
            <Lock className="w-3.5 h-3.5 text-[#0284C7]" aria-hidden="true" />
            {isEn ? 'Admin Portal' : 'Espace Perso'}
          </Link>
        </div>
        <div className="copyright-text">
          &copy; {currentYear} {isEn ? 'by DevSupAi • Alexandre Pabst. Handcrafted without CMS.' : 'par DevSupAi • Alexandre Pabst. Créé sur-mesure sans CMS.'}
        </div>
      </div>
    </footer>
  );
}

