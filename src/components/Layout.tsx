import { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import Navbar from './Navbar';
import Footer from './Footer';
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
      <Navbar />

      <div className="min-h-screen bg-transparent text-text-primary selection:bg-accent/30 relative z-10">
        {children || <Outlet />}
        <Footer />
      </div>
    </ReactLenis>
  );
}
