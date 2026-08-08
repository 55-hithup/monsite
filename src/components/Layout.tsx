import { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import 'lenis/dist/lenis.css';

export default function Layout() {
  const { pathname, hash } = useLocation();

  // Scroll to top or to hash on page change
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
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

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 16,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.65, 0, 0.35, 1] as const, // ease-in-out cubic-bezier
      },
    },
  };

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial="initial"
          animate="animate"
          exit="initial"
          variants={pageVariants}
          className="min-h-screen bg-transparent text-text-primary selection:bg-accent/30 relative z-10"
        >
          <Outlet />
          <Footer />
        </motion.div>
      </AnimatePresence>
    </ReactLenis>
  );
}
