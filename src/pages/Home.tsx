import { useEffect, useRef } from 'react';
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
    if (typeof window === 'undefined') return;

    const reveals = containerRef.current?.querySelectorAll('.reveal');
    if (reveals && reveals.length > 0) {
      // Immediate fallback safety: ensure all items activate smoothly
      const fallbackTimer = setTimeout(() => {
        reveals.forEach((el) => el.classList.add('active'));
      }, 1000);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.01, rootMargin: '50px 0px 50px 0px' }
      );

      reveals.forEach((el) => observer.observe(el));

      // Cleanup
      const observerDisconnect = () => {
        clearTimeout(fallbackTimer);
        observer.disconnect();
      };

      // Handle scroll to hash on mount (useful when navigating back from project description or offers)
      if (window.location.hash) {
        const rawId = window.location.hash.replace('#', '').split('?')[0];
        const element = document.getElementById(rawId);
        if (element) {
          setTimeout(() => {
            if (lenis) {
              lenis.scrollTo(element, { duration: 1.2 });
            } else {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 300);
        }
      }

      return observerDisconnect;
    }
  }, [lenis]);

  return (
    <main ref={containerRef}>
      <StructuredData />
      <Hero />
      <div className="bg-primary-bg border-t border-border-color">
        <Stats />
      </div>
      <div className="bg-raised-bg border-t border-border-color">
        <Offers />
      </div>
      <div className="bg-primary-bg border-t border-border-color">
        <TargetAudience />
      </div>
      <div className="bg-primary-bg border-t border-border-color">
        <Projects />
      </div>
      <div className="bg-raised-bg border-t border-border-color">
        <Process />
      </div>
      <div className="bg-primary-bg border-t border-border-color">
        <Comparison />
      </div>
      <div className="bg-primary-bg border-t border-border-color">
        <Testimonials />
      </div>
      <div className="bg-primary-bg border-t border-border-color">
        <FAQ />
      </div>
      <div className="bg-primary-bg border-t border-border-color">
        <Stack />
      </div>
      <div className="bg-raised-bg border-t border-border-color">
        <Contact />
      </div>
    </main>
  );
}
