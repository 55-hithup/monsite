import MagneticWrapper from './MagneticWrapper';

export default function Navbar() {
  const links = [
    { label: 'offres', href: '#offres' },
    { label: 'process', href: '#process' },
    { label: 'projets', href: '#projets' },
    { label: 'stack', href: '#stack' },
    { label: 'contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <nav className="flex items-center justify-between px-6 py-3 bg-[#121729]/75 backdrop-blur-md rounded-full border border-[rgba(245,246,250,0.08)]">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 label-mono font-bold text-sm tracking-normal text-text-primary hover:text-accent transition-colors duration-150">
          <img src="/logo.png" alt="DevSupAi Logo" className="h-7 w-7 object-contain rounded-full border border-[rgba(245,246,250,0.08)]" />
          <span>devsup<span className="brand-gradient-text">ai</span></span>
        </a>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="label-mono text-[11px] text-text-secondary hover:text-text-primary transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Navigation Action */}
        <div>
          <MagneticWrapper range={30} strength={0.25}>
            <a
              href="#contact"
              className="label-mono text-[10px] px-4 py-2 border border-accent rounded-full text-text-primary hover:bg-accent hover:border-accent transition-all duration-150 inline-block"
            >
              let's talk
            </a>
          </MagneticWrapper>
        </div>
      </nav>
    </header>
  );
}
