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
import GlowOrbCursor from './components/GlowOrbCursor';
import Ferrofluid from './components/Ferrofluid';
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
      <GlowOrbCursor />
      
      {/* Fixed global background container with OGL WebGL Ferrofluid shader */}
      <div 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          zIndex: 0, 
          pointerEvents: 'none',
          backgroundColor: '#0B0F1E',
          overflow: 'hidden'
        }}
      >
        <Ferrofluid
          colors={["#061050","#7f8ded","#ffffff"]}
          speed={0.5}
          scale={1.6}
          turbulence={1}
          fluidity={0.1}
          rimWidth={0.2}
          sharpness={2.5}
          shimmer={1.5}
          glow={2}
          flowDirection="down"
          opacity={0.4}
          mouseInteraction
          mouseStrength={1}
          mouseRadius={0.35}
        />
      </div>

      <AnimatePresence>
        <motion.div
          initial="initial"
          animate="animate"
          variants={pageVariants}
          className="min-h-screen bg-transparent text-text-primary selection:bg-accent/30 relative z-10"
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
