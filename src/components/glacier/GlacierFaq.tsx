import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useJsonLd } from '../../hooks/useJsonLd';

const homeFaqItems = [
  {
    question: "Combien coûte la création d'un site internet sur-mesure avec DevSupAi ?",
    answer: "Les forfaits de départ sont transparents : le Pack Présence (One-Page) démarre à 950 €, le Pack Croissance PME (site vitrine 3 à 5 pages) à 1 850 €, et les applications web SaaS ou outils métiers à partir de 3 200 €. Chaque devis est gratuit, détaillé et sans aucun abonnement logiciel mensuel captif.",
  },
  {
    question: "Pourquoi choisir un développement artisanal sur-mesure plutôt qu'un CMS (WordPress, Wix) ?",
    answer: "Un site codé sur-mesure (React, TypeScript, Tailwind) est jusqu'à 10 fois plus rapide qu'un thème WordPress surchargé de plugins payants. Il garantit une note de 100/100 sur Google Lighthouse, une sécurité renforcée contre les piratages et une propriété totale de votre code source sans redevance.",
  },
  {
    question: "Dans quelles zones géographiques intervenez-vous pour vos prestations web ?",
    answer: "L'atelier DevSupAi est situé au 13 Allée des Roses à Saint-Mihiel (55300) en Meuse. J'interviens en présentiel à Saint-Mihiel, Commercy, Verdun, Bar-le-Duc, Nancy, Metz et dans toute la région Grand Est, ainsi qu'à distance par visioconférence pour des clients partout en France.",
  },
  {
    question: "Quels sont les délais de conception et de mise en ligne d'un projet ?",
    answer: "Comptez généralement 1 à 2 semaines pour un site One-Page, 2 à 4 semaines pour un site vitrine multi-pages, et 4 à 8 semaines pour une application SaaS métier sur-mesure. Un calendrier de livraison précis est établi dès la validation du devis.",
  },
  {
    question: "Suis-je propriétaire de mon site internet et de mon nom de domaine ?",
    answer: "Oui, absolument. Dès le règlement de la facture finale, vous êtes l'unique propriétaire du code source, des identifiants, des visuels et du nom de domaine. Vous ne subissez aucun engagement de maintenance obligatoire.",
  },
];

export default function GlacierFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Schema.org FAQPage for Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": homeFaqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  useJsonLd(faqSchema, "home-faqpage-schema");

  return (
    <section className="py-20 md:py-28 bg-white border-t border-[#E5E5E5] text-left" id="faq-atelier" aria-labelledby="faq-title">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#0284C7]/30 bg-[#0284C7]/10 text-xs font-bold font-['Montserrat'] text-[#0284C7] mb-4">
            <HelpCircle size={14} className="text-[#0284C7]" aria-hidden="true" />
            <span>RÉPONSES &amp; CONSEILS</span>
          </div>
          
          <h2 id="faq-title" className="text-2xl sm:text-3xl md:text-4xl font-black font-['Montserrat'] text-[#1A1A1A] mb-3 tracking-tight">
            QUESTIONS FRÉQUENTES
          </h2>
          <p className="text-sm sm:text-base text-[#666666] font-['Plus_Jakarta_Sans']">
            Tout ce qu'il faut savoir sur la méthode sur-mesure, les tarifs et l'accompagnement DevSupAi en Meuse et France.
          </p>
        </div>

        <div className="space-y-4">
          {homeFaqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`p-6 rounded-xl bg-[#F8F8F8] border transition-all duration-200 ${
                  isOpen ? 'border-[#0284C7] bg-white shadow-sm' : 'border-[#E5E5E5] hover:border-[#CCCCCC]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                >
                  <h3 className="text-sm sm:text-base font-bold font-['Montserrat'] text-[#1A1A1A] leading-snug">
                    {item.question}
                  </h3>
                  <span className="text-[#0284C7] shrink-0 p-1 rounded-full bg-white border border-[#E5E5E5]">
                    {isOpen ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                    className="mt-4 pt-4 border-t border-[#E5E5E5] text-xs sm:text-sm text-[#555555] leading-relaxed font-['Plus_Jakarta_Sans']"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
