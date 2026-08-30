import { useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import StructuredData from '../components/StructuredData';
import GlacierHero from '../components/glacier/GlacierHero';
import GlacierOffers from '../components/glacier/GlacierOffers';
import GlacierParallaxBreak from '../components/glacier/GlacierParallaxBreak';
import GlacierGallery from '../components/glacier/GlacierGallery';
import Testimonials from '../components/Testimonials';
import GlacierFaq from '../components/glacier/GlacierFaq';
import GlacierContact from '../components/glacier/GlacierContact';

export default function Home() {
  useDocumentMetadata(
    {
      fr: "DevSupAi | Développeur Web & Création de Sites Sur-Mesure",
      en: "DevSupAi | Bespoke Web Developer & Engineering",
    },
    {
      fr: "Création de sites vitrines, e-commerce et applications web sur-mesure pour PME, artisans et associations en Meuse (55), Grand Est et France. 0% abonnement captif, temps de chargement optimisés.",
      en: "Handcrafted showcase websites, e-commerce, and custom SaaS web applications for SMEs, artisans, and non-profits in France and worldwide. Zero recurring software fees, optimized loading times.",
    },
    'https://www.devsupai.fr/hero-bg-mockup.webp'
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const handleNavClick = (targetId: string) => {
    if (typeof window === 'undefined') return;
    const element = document.getElementById(targetId);
    if (element) {
      if (lenis) {
        lenis.scrollTo(element, { duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.location.hash) {
      const rawId = window.location.hash.replace('#', '').split('?')[0];
      const element = document.getElementById(rawId);
      if (element) {
        setTimeout(() => {
          if (lenis) {
            lenis.scrollTo(element, { duration: 1.2 });
          } else {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      }
    }
  }, [lenis]);

  return (
    <div ref={containerRef} className="glacier-theme-wrapper w-full bg-white text-[#4A4A4A]">
      <StructuredData />
      <main>
        <GlacierHero onNavClick={handleNavClick} />
        <GlacierOffers onNavClick={handleNavClick} />
        <GlacierParallaxBreak />
        <GlacierGallery onNavClick={handleNavClick} />
        <Testimonials />
        <GlacierFaq />
        <GlacierContact />
      </main>
    </div>
  );
}
