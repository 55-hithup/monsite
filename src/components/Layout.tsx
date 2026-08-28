import { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import GlacierTopBar from './glacier/GlacierTopBar';
import GlacierHeader from './glacier/GlacierHeader';
import GlacierFooter from './glacier/GlacierFooter';
import 'lenis/dist/lenis.css';

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { pathname, hash } = useLocation();

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

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <div className="min-h-screen bg-white text-[#4A4A4A] selection:bg-[#0284C7]/20 relative z-10 flex flex-col">
        <GlacierTopBar />
        <GlacierHeader />
        <div className="flex-grow">
          {children || <Outlet />}
        </div>
        <GlacierFooter />
      </div>
    </ReactLenis>
  );
}
