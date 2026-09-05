import { useState, useEffect, useMemo, Fragment } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { Languages } from 'lucide-react';
import GlacierLogoReveal from './GlacierLogoReveal';

interface GlacierHeaderProps {
  onNavClick?: (targetId: string) => void;
}

interface GlacierNavLinksProps {
  isSticky?: boolean;
  activeTab: string;
  isScrolled: boolean;
  navLinks: {
    services: string;
    realisations: string;
    avis: string;
    contact: string;
    catalog: string;
    catalogPath: string;
    about: string;
    aboutPath: string;
    blog: string;
    blogPath: string;
  };
  isEn: boolean;
  language: string;
  setLanguage: (lang: 'fr' | 'en') => void;
  onAnchorClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  onLogoClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onLinkClick: (id: string) => void;
}

function GlacierNavLinks({
  isSticky = false,
  activeTab,
  isScrolled,
  navLinks,
  isEn,
  language,
  setLanguage,
  onAnchorClick,
  onLogoClick,
  onLinkClick,
}: GlacierNavLinksProps) {
  const navItems = [
    { id: 'services', label: navLinks.services, isAnchor: true, href: `${isEn ? '/en' : ''}/#services` },
    { id: 'realisations', label: navLinks.realisations, isAnchor: true, href: `${isEn ? '/en' : ''}/#realisations` },
    { id: 'avis', label: navLinks.avis, isAnchor: true, href: `${isEn ? '/en' : ''}/#avis` },
    { id: 'contact', label: navLinks.contact, isAnchor: true, href: `${isEn ? '/en' : ''}/#contact` },
    { id: 'catalog', label: navLinks.catalog, isAnchor: false, path: navLinks.catalogPath },
    { id: 'about', label: navLinks.about, isAnchor: false, path: navLinks.aboutPath },
    { id: 'blog', label: navLinks.blog, isAnchor: false, path: navLinks.blogPath },
  ];

  return (
    <div className="relative flex items-center justify-center gap-[clamp(4px,0.8vw,14px)] flex-nowrap whitespace-nowrap mx-auto">
      {isSticky && (
        <Link 
          key={isScrolled ? 'sticky-logo-active' : 'sticky-logo-idle'}
          to={isEn ? '/en' : '/'} 
          onClick={onLogoClick}
          className={`sticky-nav-logo inline-flex items-center gap-2 group cursor-pointer mr-1 sm:mr-3 ${
            isScrolled ? 'sticky-logo-enter' : 'sticky-logo-exit'
          }`}
          aria-label={isEn ? 'DevSupAi - Back to top' : 'DevSupAi - Retour en haut'}
        >
          <img 
            src="/logo.webp" 
            alt="DevSupAi" 
            width={28} 
            height={28} 
            className="w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-110 shrink-0" 
          />
          <span className="font-['Montserrat'] font-black text-xs sm:text-sm tracking-widest text-[#1A1A1A] group-hover:text-[#0284C7] transition-colors hidden md:inline">
            DEVSUPAI
          </span>
        </Link>
      )}

      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        const linkClasses = `glacier-nav-link relative z-10 px-3 sm:px-3.5 py-1.5 rounded-full transition-colors duration-150 cursor-pointer inline-flex items-center justify-center ${
          isActive ? 'text-[#0284C7] font-black' : 'text-[#475569] hover:text-[#0F172A]'
        }`;
        const isFirstPageLink = item.id === 'catalog';

        return (
          <Fragment key={item.id}>
            {isFirstPageLink && (
              <span
                aria-hidden="true"
                className="h-3.5 w-px bg-[#CBD5E1] mx-0.5 sm:mx-1 opacity-75 flex-shrink-0 self-center pointer-events-none"
              />
            )}
            {item.isAnchor ? (
              <a
                href={item.href}
                onClick={(e) => onAnchorClick(e, item.id)}
                className={linkClasses}
              >
                {isActive && <span aria-hidden="true" className="glacier-nav-capsule" />}
                <span className="relative z-10">{item.label}</span>
              </a>
            ) : (
              <Link
                to={item.path!}
                onClick={() => onLinkClick(item.id)}
                className={linkClasses}
              >
                {isActive && <span aria-hidden="true" className="glacier-nav-capsule" />}
                <span className="relative z-10">{item.label}</span>
              </Link>
            )}
          </Fragment>
        );
      })}

      {/* Language Switcher */}
      <div className="inline-flex items-center gap-1 ml-1 pl-2 border-l border-[#E5E5E5] text-xs font-['Montserrat'] font-bold relative z-10">
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
}

export default function GlacierHeader({ onNavClick }: GlacierHeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, isEn } = useLanguage();
  const isHomePage = location.pathname === '/' || location.pathname === '/en';
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    setIsSubtitleVisible(false);
    setIsScrolled(false);
  }, [location.pathname]);

  const navLinks = useMemo(() => isEn
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
      }, [isEn]);

  // 1. Définition de l'onglet actif sur les pages dédiées
  useEffect(() => {
    if (isHomePage) return;

    if (location.pathname === navLinks.catalogPath || location.pathname.startsWith('/nos-services') || location.pathname.startsWith('/en/services')) {
      setActiveTab('catalog');
    } else if (location.pathname === navLinks.aboutPath || location.pathname.startsWith('/a-propos') || location.pathname.startsWith('/en/about')) {
      setActiveTab('about');
    } else if (location.pathname === navLinks.blogPath || location.pathname.startsWith('/blog') || location.pathname.startsWith('/en/blog')) {
      setActiveTab('blog');
    } else {
      setActiveTab('');
    }
  }, [isHomePage, location.pathname, navLinks]);

  // 2. Écouteur de scroll universel (gère isScrolled sur toutes les pages et le scroll spy sur la landing page)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || document.documentElement.scrollTop;
          // La barre flottante ne descend QUE si on a scrollé au-delà de 220px
          setIsScrolled(scrollY > 220);

          // Si on est sur la page d'accueil, mettre à jour la section visible
          if (isHomePage) {
            if (scrollY < 180) {
              setActiveTab('');
              ticking = false;
              return;
            }

            if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 140) {
              setActiveTab('contact');
              ticking = false;
              return;
            }

            const sections = ['services', 'realisations', 'avis', 'contact'];
            for (const id of sections) {
              const el = document.getElementById(id);
              if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= window.innerHeight * 0.42 && rect.bottom >= window.innerHeight * 0.15) {
                  setActiveTab(id);
                  break;
                }
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setActiveTab(targetId);
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

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHomePage) {
      e.preventDefault();
      setActiveTab('');
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

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
          <GlacierNavLinks 
            isSticky={false}
            activeTab={activeTab}
            isScrolled={isScrolled}
            navLinks={navLinks}
            isEn={isEn}
            language={language}
            setLanguage={setLanguage}
            onAnchorClick={handleAnchorClick}
            onLogoClick={handleLogoClick}
            onLinkClick={setActiveTab}
          />
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
        inert={!isScrolled ? true : undefined}
      >
        <nav className="w-full flex items-center justify-center" aria-label={isEn ? 'Floating navigation' : 'Navigation flottante'}>
          <GlacierNavLinks 
            isSticky={true}
            activeTab={activeTab}
            isScrolled={isScrolled}
            navLinks={navLinks}
            isEn={isEn}
            language={language}
            setLanguage={setLanguage}
            onAnchorClick={handleAnchorClick}
            onLogoClick={handleLogoClick}
            onLinkClick={setActiveTab}
          />
        </nav>
      </div>
    </>
  );
}

