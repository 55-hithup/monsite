import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MagneticWrapper from './MagneticWrapper';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage } = useLanguage();
  const t = translations[language].navbar;

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <nav className="flex items-center justify-between pl-2 pr-6 py-3 bg-[#121729]/85 backdrop-blur-md rounded-full border border-[rgba(245,246,250,0.08)] shadow-2xl relative">
        {/* Overflowing Logo completely masking the left rounded corner */}
        <Link 
          to={language === 'en' ? '/en' : '/'} 
          className="cursor-target relative flex items-center shrink-0 -my-6 -ml-8 md:-ml-10 z-30 group"
          title="DevSupAi"
        >
          <img 
            src="/logo.webp" 
            alt="DevSupAi Logo" 
            width="96"
            height="96"
            className="h-18 w-18 md:h-24 md:w-24 object-contain drop-shadow-[0_8px_28px_rgba(46,143,224,0.5)] -translate-x-4 md:-translate-x-5 translate-y-0 md:translate-y-0.5 transition-transform duration-300 group-hover:scale-105" 
          />
        </Link>

        {/* Desktop Main Links */}
        <div className="hidden md:flex items-center gap-6">
          {t.links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => {
                const isHomePage = location.pathname === '/' || location.pathname === '/en';
                if (link.href.includes('#') && isHomePage) {
                  const id = link.href.split('#')[1];
                  const element = document.getElementById(id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }
              }}
              className="cursor-target label-mono text-xs text-text-secondary hover:text-text-primary transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Header Action Buttons & Language Selector */}
        <div className="flex items-center gap-2">
          {/* Language Selector (Desktop) */}
          <div className="hidden sm:flex items-center bg-[#0B0F1E]/80 border border-[rgba(245,246,250,0.12)] rounded-full p-0.5 shadow-inner">
            <button
              type="button"
              onClick={() => setLanguage('fr')}
              className={`px-2.5 py-1 rounded-full text-[11px] label-mono font-bold transition-all duration-150 cursor-pointer ${
                language === 'fr'
                  ? 'bg-[#2E8FE0] text-[#0B122C] shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              aria-label="Passer en Français"
              title="Version Française"
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full text-[11px] label-mono font-bold transition-all duration-150 cursor-pointer ${
                language === 'en'
                  ? 'bg-[#2E8FE0] text-[#0B122C] shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              aria-label="Switch to English"
              title="English version"
            >
              EN
            </button>
          </div>

          {/* Desktop Contact CTA Button */}
          <div className="hidden md:block">
            <MagneticWrapper range={30} strength={0.25}>
              <Link
                to={language === 'en' ? '/en#contact' : '/#contact'}
                onClick={() => {
                  const isHomePage = location.pathname === '/' || location.pathname === '/en';
                  if (isHomePage) {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }
                }}
                className="cursor-target label-mono text-xs px-4 py-1.5 border border-accent rounded-full bg-accent hover:bg-cyan-200 transition-all duration-150 inline-block font-bold"
                style={{ color: '#020617' }}
              >
                {t.contactBtn}
              </Link>
            </MagneticWrapper>
          </div>

          {/* Mobile Language Switcher + Hamburger Button */}
          <div className="flex sm:hidden items-center bg-[#0B0F1E]/80 border border-[rgba(245,246,250,0.12)] rounded-full p-0.5 mr-1">
            <button
              type="button"
              onClick={() => setLanguage('fr')}
              className={`px-2 py-0.5 rounded-full text-[11px] label-mono font-bold transition-all ${
                language === 'fr'
                  ? 'bg-[#2E8FE0] text-[#0B122C]'
                  : 'text-text-secondary'
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-full text-[11px] label-mono font-bold transition-all ${
                language === 'en'
                  ? 'bg-[#2E8FE0] text-[#0B122C]'
                  : 'text-text-secondary'
              }`}
            >
              EN
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="cursor-target p-2 text-text-primary hover:text-accent transition-colors cursor-pointer flex items-center justify-center rounded-full border border-[rgba(245,246,250,0.15)] bg-[#121729]/60"
              aria-label={t.mobileMenuAria}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className="absolute top-[calc(100%+12px)] left-0 right-0 z-40 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="p-6 bg-[#0B0F1E]/95 border border-[rgba(245,246,250,0.12)] rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl space-y-6">
              
              {/* Language Switcher in Mobile Menu */}
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(245,246,250,0.06)]">
                <div className="flex items-center gap-2 text-xs label-mono text-text-secondary">
                  <Globe size={14} className="text-[#38BDF8]" />
                  <span>Language / Langue :</span>
                </div>
                <div className="flex items-center bg-[#121729] border border-[rgba(245,246,250,0.12)] rounded-full p-0.5">
                  <button
                    type="button"
                    onClick={() => setLanguage('fr')}
                    className={`px-3 py-1 rounded-full text-xs label-mono font-bold transition-all ${
                      language === 'fr'
                        ? 'bg-[#2E8FE0] text-[#0B122C]'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    Français
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded-full text-xs label-mono font-bold transition-all ${
                      language === 'en'
                        ? 'bg-[#2E8FE0] text-[#0B122C]'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Main Links */}
              <div className="flex flex-col gap-4 text-left">
                {t.links.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      const isHomePage = location.pathname === '/' || location.pathname === '/en';
                      if (link.href.includes('#') && isHomePage) {
                        const id = link.href.split('#')[1];
                        const element = document.getElementById(id);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }
                    }}
                    className="text-xs font-bold text-text-secondary hover:text-text-primary transition-colors label-mono uppercase"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Contact Button */}
              <div className="pt-2">
                <Link
                  to={language === 'en' ? '/en#contact' : '/#contact'}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    const isHomePage = location.pathname === '/' || location.pathname === '/en';
                    if (isHomePage) {
                      const element = document.getElementById('contact');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }
                  }}
                  className="block w-full text-center py-3 rounded-full bg-accent text-slate-950 font-bold text-xs label-mono uppercase hover:bg-cyan-200 transition-colors"
                >
                  {t.contactMe}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
