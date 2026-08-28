import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const t = translations[language].footer;

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
          <div className="flex flex-col gap-4 text-left">
            <div className="flex items-center gap-2">
              <img 
                src="/logo.webp" 
                alt="DevSupAi Logo" 
                width="28"
                height="28"
                className="h-7 w-7 object-contain rounded-full border border-[rgba(245,246,250,0.08)]" 
              />
              <span className="label-mono font-bold text-sm tracking-normal text-text-primary">
                devsup<span className="brand-gradient-text">ai</span>
              </span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              {t.brandDesc}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(245,246,250,0.06)] bg-[rgba(245,246,250,0.02)] text-xs label-mono text-text-secondary self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              {t.status}
            </div>
            
            <div className="flex items-center gap-2.5 mt-1">
              <a 
                href="https://www.facebook.com/people/Devsupai/61593272035287" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-100 opacity-90 transition-opacity duration-150 cursor-target"
                title="Facebook DevSupAi"
              >
                <img 
                  src="/logo-facebook.webp" 
                  alt="Facebook Logo" 
                  width="24" 
                  height="24"
                  className="h-6 w-6 object-contain rounded-lg border border-[rgba(245,246,250,0.12)] bg-[#070913]" 
                />
              </a>
              <a 
                href="https://www.youtube.com/@devsupai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-100 opacity-90 transition-opacity duration-150 cursor-target"
                title="YouTube DevSupAi"
              >
                <img 
                  src="/logo-youtube.webp" 
                  alt="YouTube Logo" 
                  width="24" 
                  height="24"
                  className="h-6 w-6 object-contain rounded-lg border border-[rgba(245,246,250,0.12)] bg-[#070913]" 
                />
              </a>
              <a 
                href="https://www.pagesjaunes.fr/pros/65267281" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-100 opacity-90 transition-opacity duration-150 cursor-target"
                title="Pages Jaunes DevSupAi"
              >
                <img 
                  src="/logo-pagesjaunes.webp" 
                  alt="Pages Jaunes Logo" 
                  className="h-6 w-6 object-contain rounded-lg border border-[rgba(245,246,250,0.12)] bg-[#070913]" 
                />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="text-left">
            <h4 className="label-mono text-xs font-bold text-text-primary mb-5 tracking-wider uppercase">{t.navTitle}</h4>
            <ul className="flex flex-col gap-3 text-xs text-text-secondary">
              <li>
                <Link to={language === 'en' ? '/en' : '/'} onClick={() => window.scrollTo(0,0)} className="hover:text-text-primary transition-colors cursor-target">{t.home}</Link>
              </li>
              <li>
                <Link to={language === 'en' ? '/en/services' : '/nos-services'} className="hover:text-text-primary transition-colors cursor-target text-[#38BDF8] font-bold">{t.services}</Link>
              </li>
              <li>
                <Link to={language === 'en' ? '/en#services' : '/#services'} onClick={() => handleNavClick('services')} className="hover:text-text-primary transition-colors cursor-target">{t.offers}</Link>
              </li>
              <li>
                <Link to={language === 'en' ? '/en#realisations' : '/#realisations'} onClick={() => handleNavClick('realisations')} className="hover:text-text-primary transition-colors cursor-target">{t.projects}</Link>
              </li>
              <li>
                <Link to={language === 'en' ? '/en/about' : '/a-propos'} className="hover:text-text-primary transition-colors cursor-target">{t.about}</Link>
              </li>
              <li>
                <Link to={language === 'en' ? '/en/blog' : '/blog'} className="hover:text-text-primary transition-colors cursor-target">{t.blog}</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="text-left">
            <h4 className="label-mono text-xs font-bold text-text-primary mb-5 tracking-wider uppercase">{t.contactTitle}</h4>
            <div className="flex flex-col gap-4 text-xs text-text-secondary">
              <div>
                <span className="text-text-primary block font-medium mb-1">{t.phoneLabel}</span>
                <a href="tel:0783666098" className="hover:text-text-primary transition-colors cursor-target text-[#38BDF8] font-medium">
                  07 83 66 60 98
                </a>
              </div>
              <div>
                <span className="text-text-primary block font-medium mb-1">{t.emailLabel}</span>
                <a href="mailto:contact@devsupai.fr" className="hover:text-text-primary transition-colors cursor-target text-[#38BDF8] font-medium">
                  contact@devsupai.fr
                </a>
              </div>
              <div>
                <span className="text-text-primary block font-medium mb-1">{t.headquarters}</span>
                <span className="leading-relaxed block">
                  13 Allée des Roses,<br />
                  55300 Saint-Mihiel (Meuse)
                </span>
              </div>
              <div>
                <span className="text-text-primary block font-medium mb-1">{t.serviceAreaLabel}</span>
                <span className="leading-relaxed block text-text-secondary">
                  {t.serviceAreaText}
                </span>
              </div>
            </div>
          </div>

          {/* Hours Section */}
          <div className="text-left">
            <h4 className="label-mono text-xs font-bold text-text-primary mb-5 tracking-wider uppercase">{t.hoursTitle}</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-text-secondary">
              <li className="flex justify-between border-b border-[rgba(245,246,250,0.04)] pb-1.5">
                <span>{t.weekdays}</span>
                <span className="text-text-primary font-medium">{t.weekdaysHours}</span>
              </li>
              <li className="flex justify-between border-b border-[rgba(245,246,250,0.04)] pb-1.5">
                <span>{t.saturday}</span>
                <span className="text-text-primary font-medium">{t.saturdayHours}</span>
              </li>
              <li className="flex justify-between pb-1.5">
                <span>{t.sunday}</span>
                <span className="text-red-400 font-semibold uppercase text-xs tracking-wider">{t.closed}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[rgba(245,246,250,0.06)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-text-secondary">
            &copy; {currentYear} devsupai. {t.rights}
          </div>
          <div className="flex flex-wrap gap-6 text-xs text-text-secondary">
            <Link to={language === 'en' ? '/en/legal-notices' : '/mentions-legales'} className="cursor-target hover:text-text-primary transition-colors">{t.legal}</Link>
            <Link to={language === 'en' ? '/en/privacy-policy' : '/politique-de-confidentialite'} className="cursor-target hover:text-text-primary transition-colors">{t.privacy}</Link>
            <Link to="/admin/login" className="cursor-target hover:text-text-primary transition-colors">{t.proSpace}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
