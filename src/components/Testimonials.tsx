import { useState, useEffect } from 'react';
import SectionReveal from './SectionReveal';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "« Le résultat dépasse largement nos attentes. Notre taux de conversion a doublé en deux mois et nos clients nous complimentent sur le site à chaque échange. »",
      name: "Claire Dubosc",
      role: "Fondatrice, Studio Verrière",
    },
    {
      quote: "« Un vrai partenaire, pas juste un prestataire. Chaque détail a été pensé pour notre marque, du premier pixel jusqu'à la mise en ligne. »",
      name: "Karim Belaïd",
      role: "CEO, Neuron Labs",
    },
    {
      quote: "« Rapide, réactif et incroyablement précis. Le site est aujourd'hui notre meilleur commercial, disponible 24h/24. »",
      name: "Léa Fontaine",
      role: "Directrice, Maison Lucine",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <SectionReveal id="apropos" className="section-pad">
      <div className="wrap">
        <div className="text-center mb-[70px]">
          <div className="eyebrow reveal justify-center">Témoignages</div>
          <h2 className="section-title reveal">Ils m'ont fait confiance.</h2>
        </div>
        
        <div className="testi-wrap reveal">
          <div className="testi-track">
            <div
              className="testi-slides transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)`, display: 'flex' }}
            >
              {testimonials.map((testi, idx) => (
                <div key={idx} className="testi-slide w-full flex-shrink-0">
                  <div className="testi-card">
                    <p className="testi-quote">{testi.quote}</p>
                    <div className="testi-person">
                      <div className="testi-avatar"></div>
                      <div>
                        <div className="testi-name">{testi.name}</div>
                        <div className="testi-role">{testi.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="testi-dots">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`testi-dot ${current === idx ? 'active' : ''}`}
                onClick={() => setCurrent(idx)}
                aria-label={`Aller au témoignage ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
