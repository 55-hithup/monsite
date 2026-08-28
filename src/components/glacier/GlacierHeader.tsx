import { Link, useLocation, useNavigate } from 'react-router-dom';

interface GlacierHeaderProps {
  onNavClick?: (targetId: string) => void;
}

export default function GlacierHeader({ onNavClick }: GlacierHeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/' || location.pathname === '/en';

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
      navigate(`/#${targetId}`);
    }
  };

  return (
    <header className="glacier-main-header">
      <div className="header-logo-block">
        <Link to="/" className="glacier-logo-text">
          DEVSUPAI
        </Link>
        <span className="glacier-logo-sub">
          L'Atelier Web d'Alexandre Pabst • Meuse
        </span>
      </div>

      <nav className="glacier-nav-strip" aria-label="Navigation principale">
        <a 
          href="/#services" 
          onClick={(e) => handleAnchorClick(e, 'services')} 
          className="glacier-nav-link"
        >
          NOS SERVICES
        </a>
        <a 
          href="/#realisations" 
          onClick={(e) => handleAnchorClick(e, 'realisations')} 
          className="glacier-nav-link"
        >
          RÉALISATIONS
        </a>
        <a 
          href="/#avis" 
          onClick={(e) => handleAnchorClick(e, 'avis')} 
          className="glacier-nav-link"
        >
          AVIS
        </a>
        <a 
          href="/#atelier" 
          onClick={(e) => handleAnchorClick(e, 'atelier')} 
          className="glacier-nav-link"
        >
          L'ATELIER
        </a>
        <a 
          href="/#occasions" 
          onClick={(e) => handleAnchorClick(e, 'occasions')} 
          className="glacier-nav-link"
        >
          SUR-MESURE
        </a>
        <a 
          href="/#contact" 
          onClick={(e) => handleAnchorClick(e, 'contact')} 
          className="glacier-nav-link"
        >
          CONTACT &amp; DEVIS
        </a>
        <Link 
          to="/nos-services" 
          className={`glacier-nav-link ${location.pathname === '/nos-services' ? 'text-[#0284C7] font-extrabold' : ''}`}
        >
          PRESTATIONS
        </Link>
        <Link 
          to="/a-propos" 
          className={`glacier-nav-link ${location.pathname === '/a-propos' ? 'text-[#0284C7] font-extrabold' : ''}`}
        >
          À PROPOS
        </Link>
        <Link 
          to="/blog" 
          className={`glacier-nav-link ${location.pathname.startsWith('/blog') ? 'text-[#0284C7] font-extrabold' : ''}`}
        >
          BLOG
        </Link>
      </nav>
    </header>
  );
}
