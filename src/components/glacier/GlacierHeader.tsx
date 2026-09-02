import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { Languages } from 'lucide-react';
import GlacierLogoReveal from './GlacierLogoReveal';

interface GlacierHeaderProps {
  onNavClick?: (targetId: string) => void;
}

export default function GlacierHeader({ onNavClick }: GlacierHeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, isEn } = useLanguage();
  const isHomePage = location.pathname === '/' || location.pathname === '/en';
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsSubtitleVisible(false);
  }, [location.pathname]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      // Ne descend que lorsque le premier header est complètement sorti de l'écran (220px)
      setIsScrolled(scrollY > 220);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (isHomePage) {
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
    } else {
      navigate(`${isEn ? '/en' : ''}/#${targetId}`);
    }
  };

  const navLinks = isEn
    ? {
        services: 'SERVICES',
        realisations: 'PROJECTS',
        avis: 'REVIEWS',
        contact: 'CONTACT & QUOTE',
        catalog: 'CATALOG',
        catalogPath: '/en/services',
        about: 'ABOUT',
        aboutPath: '/en/about',
        blog: 'BLOG',
        blogPath: '/en/blog',
      }
    : {
        services: 'NOS SERVICES',
        realisations: 'RÉALISATIONS',
        avis: 'AVIS',
        contact: 'CONTACT & DEVIS',
        catalog: 'PRESTATIONS',
        catalogPath: '/nos-services',
        about: 'À PROPOS',
        aboutPath: '/a-propos',
        blog: 'BLOG',
        blogPath: '/blog',
      };

  const renderNavLinks = () => (
    <div className="flex items-center justify-center gap-[clamp(8px,1.8vw,28px)] flex-nowrap whitespace-nowrap mx-auto">
      <a 
        href={`${isEn ? '/en' : ''}/#services`} 
        onClick={(e) => handleAnchorClick(e, 'services')} 
        className="glacier-nav-link"
      >
        {navLinks.services}
      </a>
      <a 
        href={`${isEn ? '/en' : ''}/#realisations`} 
        onClick={(e) => handleAnchorClick(e, 'realisations')} 
        className="glacier-nav-link"
      >
        {navLinks.realisations}
      </a>
      <a 
        href={`${isEn ? '/en' : ''}/#avis`} 
        onClick={(e) => handleAnchorClick(e, 'avis')} 
        className="glacier-nav-link"
      >
        {navLinks.avis}
      </a>
      <a 
        href={`${isEn ? '/en' : ''}/#contact`} 
        onClick={(e) => handleAnchorClick(e, 'contact')} 
        className="glacier-nav-link"
      >
        {navLinks.contact}
      </a>
      <Link 
        to={navLinks.catalogPath} 
        className={`glacier-nav-link ${location.pathname === navLinks.catalogPath ? 'text-[#0284C7] font-extrabold' : ''}`}
      >
        {navLinks.catalog}
      </Link>
      <Link 
        to={navLinks.aboutPath} 
        className={`glacier-nav-link ${location.pathname === navLinks.aboutPath ? 'text-[#0284C7] font-extrabold' : ''}`}
      >
        {navLinks.about}
      </Link>
      <Link 
        to={navLinks.blogPath} 
        className={`glacier-nav-link ${location.pathname.startsWith(navLinks.blogPath) ? 'text-[#0284C7] font-extrabold' : ''}`}
      >
        {navLinks.blog}
      </Link>

      {/* Language Switcher */}
      <div className="inline-flex items-center gap-1 ml-1 pl-2 border-l border-[#E5E5E5] text-xs font-['Montserrat'] font-bold">
        <Languages size={13} className="text-[#0284C7]" aria-hidden="true" />
        <button
          type="button"
          onClick={() => setLanguage('fr')}
          className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
            language === 'fr' ? 'text-[#0284C7] font-black' : 'text-[#888888] hover:text-[#1A1A1A]'
          }`}
          aria-label="Version Française"
          aria-current={language === 'fr' ? 'true' : undefined}
        >
          FR
        </button>
        <span className="text-[#CCCCCC]" aria-hidden="true">/</span>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
            language === 'en' ? 'text-[#0284C7] font-black' : 'text-[#888888] hover:text-[#1A1A1A]'
          }`}
          aria-label="English Version"
          aria-current={language === 'en' ? 'true' : undefined}
        >
          EN
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Header principal d'origine (100% centré, logo + liens) */}
      <header className="glacier-main-header">
        <div className="header-logo-block">
          <Link 
            to={isEn ? '/en' : '/'} 
            className="glacier-logo-link"
            aria-label={isEn ? 'DevSupAi - Home' : 'DevSupAi - Accueil'}
          >
            <GlacierLogoReveal 
              isEn={isEn} 
              onComplete={() => setIsSubtitleVisible(true)} 
            />
          </Link>
          <span className={`glacier-logo-sub transition-all duration-700 ease-out ${isSubtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
            {isEn
              ? "Custom Web Atelier"
              : "L'Atelier Web Sur-Mesure"}
          </span>
        </div>

        <nav className="glacier-nav-strip" aria-label={isEn ? 'Main navigation' : 'Navigation principale'}>
          {renderNavLinks()}
        </nav>
      </header>

      {/* 2. Barre flottante fixée lors du défilement (Pleine largeur, 1 ligne, centré, glissade douce) */}
      <div 
        className={`glacier-fixed-floating-nav ${
          isScrolled 
            ? 'translate-y-0 opacity-100 pointer-events-auto' 
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isScrolled}
      >
        <nav className="w-full flex items-center justify-center" aria-label={isEn ? 'Floating navigation' : 'Navigation flottante'}>
          {renderNavLinks()}
        </nav>
      </div>
    </>
  );
}

