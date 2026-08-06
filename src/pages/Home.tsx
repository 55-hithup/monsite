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
      "streetAddress": "",
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
    <main>
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
