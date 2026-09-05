import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export default function GlacierFooter() {
  const currentYear = new Date().getFullYear();
  const { isEn } = useLanguage();

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/alexandre-pabst-208360341',
      label: isEn ? 'Alexandre Pabst on LinkedIn' : "Profil LinkedIn d'Alexandre Pabst",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.65 1.65 1.65 0 0 0 1.65-1.65c0-.92-.74-1.66-1.65-1.66Z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@devsupai',
      label: isEn ? 'DevSupAi YouTube Channel' : 'Chaîne YouTube DevSupAi',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/people/Devsupai/61593272035287',
      label: isEn ? 'DevSupAi Facebook Page' : 'Page Facebook DevSupAi',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'Google Maps',
      href: 'https://maps.app.goo.gl/8YXpdiyL6YEgEoYe7',
      label: isEn ? 'Google Business Profile & Verified Reviews' : 'Fiche Google Maps et Avis clients vérifiés',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      ),
    },
  ];

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

        {/* Réseaux Sociaux */}
        <div className="flex items-center gap-2.5 my-1 sm:my-0" aria-label={isEn ? 'Social networks' : 'Réseaux sociaux'}>
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[#E5E5E5] bg-white text-[#4B5563] hover:text-[#0284C7] hover:border-[#0284C7] hover:bg-[#F0F9FF] transition-all duration-200"
              aria-label={item.label}
              title={item.label}
            >
              {item.icon}
            </a>
          ))}
        </div>

        <div className="copyright-text">
          &copy; {currentYear} {isEn ? 'DevSupAi. Handcrafted without CMS.' : 'DevSupAi. Créé sur-mesure sans CMS.'}
        </div>
      </div>
    </footer>
  );
}

