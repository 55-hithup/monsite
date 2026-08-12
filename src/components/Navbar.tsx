import { Link } from 'react-router-dom';
import MagneticWrapper from './MagneticWrapper';

export default function Navbar() {
  const links = [
    { label: 'pme & assos', href: '/#solutions' },
    { label: 'offres', href: '/#services' },
    { label: 'comparatif', href: '/#faq' },
    { label: 'réalisations', href: '/realisations' },
    { label: 'à propos', href: '/a-propos' },
    { label: 'blog', href: '/blog' },
  ];

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <nav className="flex items-center justify-between px-6 py-3 bg-[#121729]/75 backdrop-blur-md rounded-full border border-[rgba(245,246,250,0.08)]">
        {/* Logo */}
        <Link to="/" className="cursor-target flex items-center gap-2 label-mono font-bold text-sm tracking-normal text-text-primary hover:text-accent transition-colors duration-150">
          <img src="/logo.png" alt="DevSupAi Logo" className="h-7 w-7 object-contain rounded-full border border-[rgba(245,246,250,0.08)]" />
          <span>devsup<span className="brand-gradient-text">ai</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="cursor-target label-mono text-[11px] text-text-secondary hover:text-text-primary transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2">
          <MagneticWrapper range={25} strength={0.2}>
            <Link
              to="/realisations"
              className="cursor-target label-mono text-[10px] px-3.5 py-1.5 border border-[rgba(245,246,250,0.15)] rounded-full text-text-secondary hover:text-text-primary hover:border-text-primary transition-all duration-150 inline-block"
            >
              réalisations
            </Link>
          </MagneticWrapper>

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
