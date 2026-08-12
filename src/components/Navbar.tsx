import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MagneticWrapper from './MagneticWrapper';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close dropdown on route change
  useEffect(() => {
    setIsDropdownOpen(false);
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
    { label: 'pme & assos', href: '/#solutions' },
    { label: 'offres', href: '/#services' },
    { label: 'comparatif', href: '/#faq' },
    { label: 'à propos', href: '/a-propos' },
    { label: 'blog', href: '/blog' },
  ];

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <nav className="flex items-center justify-between px-6 py-3 bg-[#121729]/85 backdrop-blur-md rounded-full border border-[rgba(245,246,250,0.08)] shadow-2xl">
        {/* Logo */}
        <Link to="/" className="cursor-target flex items-center gap-2 label-mono font-bold text-sm tracking-normal text-text-primary hover:text-accent transition-colors duration-150">
          <img src="/logo.png" alt="DevSupAi Logo" className="h-7 w-7 object-contain rounded-full border border-[rgba(245,246,250,0.08)]" />
          <span>devsup<span className="brand-gradient-text">ai</span></span>
        </Link>

        {/* Desktop Main Links */}
        <div className="hidden md:flex items-center gap-6">
          {mainLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="cursor-target label-mono text-[11px] text-text-secondary hover:text-text-primary transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Header Action Buttons & Dropdown */}
        <div className="flex items-center gap-2">
          {/* Dropdown Button for Réalisations */}
          <div 
            ref={dropdownRef} 
            className="relative"
            onMouseEnter={() => {
              // Only auto-open on mouse hover if device has fine pointer (mouse)
              if (window.matchMedia('(pointer: fine)').matches) {
                setIsDropdownOpen(true);
              }
            }}
            onMouseLeave={() => {
              if (window.matchMedia('(pointer: fine)').matches) {
                setIsDropdownOpen(false);
              }
            }}
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
                className="absolute top-full right-0 mt-2 w-72 p-3 bg-[#0B0F1E]/95 border border-[rgba(245,246,250,0.12)] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl z-50 text-left animate-in fade-in slide-in-from-top-2 duration-200"
              >
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

                <div className="mt-2 pt-2 border-t border-[rgba(245,246,250,0.06)]">
                  <Link
                    to="/realisations"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-3 py-2 text-center rounded-xl bg-[#2E8FE0]/10 border border-[#2E8FE0]/20 text-[11px] label-mono text-[#2E8FE0] font-bold hover:bg-accent hover:text-white transition-all duration-150"
                  >
                    Toutes les réalisations →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Contact CTA Button */}
          <MagneticWrapper range={30} strength={0.25}>
            <Link
              to="/#contact"
              className="cursor-target label-mono text-[10px] px-4 py-1.5 border border-accent rounded-full text-text-primary bg-accent/20 hover:bg-accent hover:border-accent transition-all duration-150 inline-block font-bold"
            >
              contact
            </Link>
          </MagneticWrapper>
        </div>
      </nav>
    </header>
  );
}
