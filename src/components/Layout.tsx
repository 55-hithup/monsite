import { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import GlacierHeader from './glacier/GlacierHeader';
import GlacierFooter from './glacier/GlacierFooter';

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { pathname, hash } = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || ('ontouchstart' in window && window.innerWidth <= 1024));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll to top or to hash on page change
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (hash) {
      const id = hash.replace('#', '').split('?')[0];
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  const content = (
    <div className="min-h-screen bg-white text-[#4A4A4A] selection:bg-[#0284C7]/20 relative z-10 flex flex-col">
      <GlacierHeader />
      <div className="flex-grow">
        {children || <Outlet />}
      </div>
      <GlacierFooter />
    </div>
  );

  if (isMobile) {
    return content;
  }

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      {content}
    </ReactLenis>
  );
}
