import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MagneticWrapper from './MagneticWrapper';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close dropdown on route change
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const projectLinks = [
    {
      title: 'Les Jumeaux',
      sub: 'Restauration & Réservation sur-mesure',
      href: '/projets/les-jumeaux',
    },
    {
      title: 'LocaTool',
      sub: 'Logiciel SaaS de gestion de parc matériel',
      href: '/projets/locatool',
    },
    {
      title: 'Abogame',
      sub: 'Plateforme interactive de tirage au sort live',
      href: '/projets/abogame',
    },
  ];

  const mainLinks = [
    { label: 'nos prestations', href: '/nos-services' },
    { label: 'réalisations', href: '/#projets' },
    { label: 'offres', href: '/#services' },
    { label: 'comparatif', href: '/#comparatif' },
    { label: 'à propos', href: '/a-propos' },
    { label: 'blog', href: '/blog' },
  ];

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <nav className="flex items-center justify-between pl-2 pr-6 py-3 bg-[#121729]/85 backdrop-blur-md rounded-full border border-[rgba(245,246,250,0.08)] shadow-2xl relative">
        {/* Overflowing Logo completely masking the left rounded corner */}
        <Link 
          to="/" 
          className="cursor-target relative flex items-center shrink-0 -my-6 -ml-8 md:-ml-10 z-30 group"
          title="DevSupAi - Accueil"
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
          {mainLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => {
                if (link.href.startsWith('/#') && location.pathname === '/') {
                  const id = link.href.replace('/#', '');
                  const element = document.getElementById(id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }
              }}
              className="cursor-target label-mono text-[11px] text-text-secondary hover:text-text-primary transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Header Action Buttons & Dropdown */}
        <div className="flex items-center gap-2">
          {/* Desktop Dropdown Button for Réalisations */}
          <div 
            ref={dropdownRef} 
            className="relative hidden md:block"
          >
            <MagneticWrapper range={25} strength={0.2}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDropdownOpen((prev) => !prev);
                }}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                className={`cursor-target label-mono text-[10px] px-3.5 py-1.5 border rounded-full text-text-primary transition-all duration-150 inline-flex items-center gap-1.5 cursor-pointer ${
                  isDropdownOpen 
                    ? 'border-accent bg-accent/20 text-white' 
                    : 'border-[rgba(245,246,250,0.15)] bg-[#121729]/60 hover:border-text-primary'
                }`}
              >
                <span>réalisations</span>
                <svg 
                  className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-accent' : 'text-text-secondary'}`} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </MagneticWrapper>

            {/* Dropdown Menu Content */}
            {isDropdownOpen && (
              <div 
                className="absolute top-full right-0 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <div className="w-72 p-3 bg-[#0B0F1E]/95 border border-[rgba(245,246,250,0.12)] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl text-left">
                  <div className="px-3 py-1.5 text-[9px] label-mono text-purple-300 font-bold tracking-widest uppercase border-b border-[rgba(245,246,250,0.06)] mb-2">
                    NOS ÉTUDES DE CAS
                  </div>

                  <div className="space-y-1">
                    {projectLinks.map((proj) => (
                      <Link
                        key={proj.href}
                        to={proj.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className="block p-2.5 rounded-xl hover:bg-[#121729] border border-transparent hover:border-[rgba(245,246,250,0.08)] transition-all duration-150 group"
                      >
                        <div className="text-xs font-bold text-text-primary group-hover:text-accent transition-colors">
                          {proj.title}
                        </div>
                        <div className="text-[10px] text-text-secondary mt-0.5 leading-snug">
                          {proj.sub}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Contact CTA Button */}
          <div className="hidden md:block">
            <MagneticWrapper range={30} strength={0.25}>
              <Link
                to="/#contact"
                onClick={() => {
                  if (location.pathname === '/') {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }
                }}
                className="cursor-target label-mono text-[10px] px-4 py-1.5 border border-accent rounded-full bg-accent hover:bg-cyan-200 transition-all duration-150 inline-block font-bold"
                style={{ color: '#020617' }}
              >
                contact
              </Link>
            </MagneticWrapper>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="cursor-target p-2 text-text-primary hover:text-accent transition-colors cursor-pointer flex items-center justify-center rounded-full border border-[rgba(245,246,250,0.15)] bg-[#121729]/60"
              aria-label="Toggle menu"
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
              {/* Main Links */}
              <div className="flex flex-col gap-4 text-left">
                {mainLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (link.href.startsWith('/#') && location.pathname === '/') {
                        const id = link.href.replace('/#', '');
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

              {/* Divider */}
              <div className="h-px bg-[rgba(245,246,250,0.06)]" />

              {/* Case Studies */}
              <div className="space-y-3 text-left">
                <div className="text-[9px] label-mono text-purple-300 font-bold tracking-widest uppercase">
                  Nos Réalisations
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {projectLinks.map((proj) => (
                    <Link
                      key={proj.href}
                      to={proj.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block p-3 rounded-xl bg-[#121729]/50 border border-[rgba(245,246,250,0.04)] hover:bg-[#121729] transition-all"
                    >
                      <div className="text-xs font-bold text-text-primary">
                        {proj.title}
                      </div>
                      <div className="text-[10px] text-text-secondary mt-0.5 leading-snug">
                        {proj.sub}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact Button */}
              <div className="pt-2">
                <Link
                  to="/#contact"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (location.pathname === '/') {
                      const element = document.getElementById('contact');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }
                  }}
                  className="block w-full text-center py-3 rounded-full bg-accent text-slate-950 font-bold text-xs label-mono uppercase hover:bg-cyan-200 transition-colors"
                >
                  nous contacter
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
