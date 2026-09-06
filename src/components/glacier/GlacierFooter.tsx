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
      hoverBorder: 'hover:border-[#0A66C2] hover:bg-[#F0F7FD]',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.65 1.65 1.65 0 0 0 1.65-1.65c0-.92-.74-1.66-1.65-1.66Z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@devsupai',
      label: isEn ? 'DevSupAi YouTube Channel' : 'Chaîne YouTube DevSupAi',
      hoverBorder: 'hover:border-[#FF0000] hover:bg-[#FEF2F2]',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" fill="#FF0000" />
          <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FFFFFF" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@devsupai',
      label: isEn ? 'DevSupAi on TikTok' : 'Compte TikTok DevSupAi',
      hoverBorder: 'hover:border-[#FE2C55] hover:bg-[#FFF1F3]',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ filter: 'drop-shadow(-0.8px -0.8px 0px #25F4EE) drop-shadow(0.8px 0.8px 0px #FE2C55)' }}>
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="#000000" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/people/Devsupai/61593272035287',
      label: isEn ? 'DevSupAi Facebook Page' : 'Page Facebook DevSupAi',
      hoverBorder: 'hover:border-[#1877F2] hover:bg-[#F0F6FF]',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'Google Maps',
      href: 'https://maps.app.goo.gl/8YXpdiyL6YEgEoYe7',
      label: isEn ? 'Google Business Profile & Verified Reviews' : 'Fiche Google Maps et Avis clients vérifiés',
      hoverBorder: 'hover:border-[#EA4335] hover:bg-[#FEF2F2]',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335" />
          <circle cx="12" cy="9" r="2.8" fill="#FFFFFF" />
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
          <Link to={isEn ? '/en/terms' : '/cgv'}>
            {isEn ? 'Terms of Sale' : 'CGV'}
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
              className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[#E5E5E5] bg-white transition-all duration-200 shadow-sm ${item.hoverBorder}`}
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

