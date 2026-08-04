import { useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Offers from './components/Offers';
import Process from './components/Process';
import Projects from './components/Projects';
import Comparison from './components/Comparison';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Stack from './components/Stack';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Register scroll reveal for elements with .reveal class
    const reveals = document.querySelectorAll('.reveal');
    const ctx = gsap.context(() => {
      reveals.forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // Page load transition configurations
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
      <CustomCursor />
      
      <AnimatePresence>
        <motion.div
          initial="initial"
          animate="animate"
          variants={pageVariants}
          className="min-h-screen bg-[#0B0F1E] text-text-primary selection:bg-accent/30"
        >
          <Navbar />
          
          <main>
            <Hero />
            <Stats />
            <Offers />
            <Projects />
            <Process />
            <Comparison />
            <Testimonials />
            <FAQ />
            <Stack />
            <Contact />
          </main>

          <Footer />
        </motion.div>
      </AnimatePresence>
    </ReactLenis>
  );
}

export default App;
