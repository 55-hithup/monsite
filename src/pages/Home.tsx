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
  return (
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
  );
}
