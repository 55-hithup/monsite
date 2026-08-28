import { useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import StructuredData from '../components/StructuredData';
import GlacierHero from '../components/glacier/GlacierHero';
import GlacierOffers from '../components/glacier/GlacierOffers';
import GlacierParallaxBreak from '../components/glacier/GlacierParallaxBreak';
import GlacierPromoTiles from '../components/glacier/GlacierPromoTiles';
import GlacierGallery from '../components/glacier/GlacierGallery';
import Testimonials from '../components/Testimonials';
import GlacierContact from '../components/glacier/GlacierContact';

export default function Home() {
  useDocumentMetadata(
    {
      fr: "DEVSUPAI • Alexandre Pabst | L'Atelier du Web Sur-Mesure",
      en: "DEVSUPAI • Alexandre Pabst | Custom Web Atelier & Development",
    },
    {
      fr: "Alexandre Pabst • Développeur web indépendant à Saint-Mihiel (Meuse 55). Création artisanale de sites internet et applications sur-mesure pour PME et artisans.",
      en: "Alexandre Pabst • Independent web developer in Saint-Mihiel (Meuse 55, France). Bespoke websites and custom web applications for SMEs and artisans.",
    },
    "/"
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
        <GlacierPromoTiles onNavClick={handleNavClick} />
        <GlacierGallery onNavClick={handleNavClick} />
        <Testimonials />
        <GlacierContact />
      </main>
    </div>
  );
}
