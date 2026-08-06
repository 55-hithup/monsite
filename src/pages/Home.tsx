import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Offers from '../components/Offers';
import Projects from '../components/Projects';
import Process from '../components/Process';
import Comparison from '../components/Comparison';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Stack from '../components/Stack';
import Contact from '../components/Contact';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const reveals = containerRef.current?.querySelectorAll('.reveal');
      reveals?.forEach((el) => {
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

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "DevSupAi",
    "image": "https://devsupai.fr/logo.png",
    "@id": "https://devsupai.fr/#website",
    "url": "https://devsupai.fr",
    "telephone": "",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "13 Allée des Roses",
      "addressLocality": "Saint-Mihiel",
      "postalCode": "55300",
      "addressCountry": "FR",
      "addressRegion": "Meuse, Lorraine, Grand Est"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.8897,
      "longitude": 5.5414
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "12:00"
      }
    ],
    "sameAs": [
      "https://github.com/55-hithup"
    ]
  };

  return (
    <main ref={containerRef}>
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>
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
  );
}
