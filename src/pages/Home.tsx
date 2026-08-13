import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Offers from '../components/Offers';
import TargetAudience from '../components/TargetAudience';
import Projects from '../components/Projects';
import Process from '../components/Process';
import Comparison from '../components/Comparison';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Stack from '../components/Stack';
import Contact from '../components/Contact';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import StructuredData from '../components/StructuredData';

export default function Home() {
  useDocumentMetadata(
    "DevSupAi | Développeur Web Freelance en Meuse (55)",
    "DevSupAi, développeur web freelance basé en Meuse (Grand Est). Sites vitrines, e-commerce et applications sur-mesure pour PME et associations, en France.",
    "/"
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const reveals = containerRef.current?.querySelectorAll('.reveal');
      reveals?.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, containerRef);

    // Handle scroll to hash on mount (useful when navigating back from project description)
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          if (lenis) {
            lenis.scrollTo(element, { duration: 1.2 });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300); // Wait for transition exit animation to complete and GSAP to settle
      }
    }

    // Refresh triggers after DOM settles
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [lenis]);

  return (
    <main ref={containerRef}>
      <StructuredData />
      <Hero />
      <Stats />
      <Offers />
      <TargetAudience />
      <Projects />
      <Process />
      <Comparison />
      <Testimonials />
      <FAQ />
      <Stack />
      <ZoneIntervention />
      <Contact />
    </main>
  );
}

function ZoneIntervention() {
  return (
    <section className="section-pad border-t border-[rgba(245,246,250,0.06)] bg-[#070913]/30">
      <div className="wrap text-center">
        <p className="text-xs md:text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed reveal">
          Basé à Saint-Mihiel (Meuse), j'interviens en présentiel dans le Grand Est et à distance partout en France.
        </p>
      </div>
    </section>
  );
}
