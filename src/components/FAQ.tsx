import { useState } from 'react';
import SectionReveal from './SectionReveal';

export default function FAQ() {
  const faqData = [
    {
      q: 'Combien de temps dure un projet ?',
      a: 'Comptez en moyenne 3 à 6 semaines selon la complexité du projet, de la découverte à la mise en ligne.',
    },
    {
      q: 'Quel est votre budget de départ ?',
      a: 'Chaque projet est unique. Un devis détaillé est établi après un premier échange, sans engagement.',
    },
    {
      q: 'Proposez-vous la maintenance après livraison ?',
      a: 'Oui, plusieurs formules d\'accompagnement existent pour garder votre site à jour, rapide et sécurisé.',
    },
    {
      q: 'Travaillez-vous avec des entreprises hors de France ?',
      a: 'Tout à fait. La majorité des échanges se font à distance, avec des points réguliers en visio.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <SectionReveal className="section-pad" style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="wrap">
        <div className="text-center mb-[60px]">
          <div className="eyebrow reveal justify-center">FAQ</div>
          <h2 className="section-title reveal">Questions fréquentes.</h2>
        </div>
        
        <div className="faq-list">
          {faqData.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div key={idx} className={`faq-item reveal ${isActive ? 'active' : ''}`}>
                <button
                  className="faq-q w-full text-left flex items-center justify-between cursor-pointer focus:outline-none"
                  onClick={() => toggleIndex(idx)}
                >
                  <span>{item.q}</span>
                  <span className="faq-plus"></span>
                </button>
                <div
                  className="faq-a transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isActive ? '200px' : '0px',
                    opacity: isActive ? 1 : 0,
                    overflow: 'hidden',
                  }}
                >
                  <div className="faq-a-in">{item.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
}
