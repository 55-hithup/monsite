import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import SectionReveal from './SectionReveal';

export default function FAQ() {
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [activeLeftIndex, setActiveLeftIndex] = useState<number | null>(null);
  const [activeRightIndex, setActiveRightIndex] = useState<number | null>(null);

  const faqColumnLeft = [
    {
      q: 'Comment est défini le tarif d\'un projet sur-mesure ?',
      short: 'Mes forfaits sont transparents et adaptés à vos besoins réels : dès 690 € pour le Pack Présence (One-Page), dès 1 350 € pour le Pack Croissance (site vitrine 3 à 5 pages), et dès 2 450 € pour une application web ou un outil SaaS sur-mesure (base TJM 350 €).',
      detail: 'Chaque projet fait l\'objet d\'un devis détaillé chiffrant exactement ce dont vous avez besoin, sans frais cachés ni abonnements obligatoires de plugins.',
    },
    {
      q: 'Pourquoi le sur-mesure est-il plus rentable sur la durée ?',
      short: 'Un site sous modèle générique accumule souvent des abonnements payants de plugins (sécurité, formulaires, thème) générant 400 € à 1 200 € par an.',
      detail: 'Avec DevSupAi, vous ne payez aucun abonnement tiers obligatoire. Votre code est propre, ne souffre d\'aucune obsolescence et conserve un affichage instantané qui maximise vos conversions.',
    },
    {
      q: 'Combien de temps dure la réalisation d\'un projet web ?',
      short: 'Les délais de livraison varient de 1 à 2 semaines pour un Pack Présence, de 2 à 4 semaines pour un Pack Croissance (vitrine 3-5 pages), et de 4 à 8 semaines pour une application SaaS.',
      detail: 'Un calendrier précis avec des jalons de validation intermédiaire est fixé dès la signature du devis pour garantir le respect des échéances.',
    },
    {
      q: 'Proposez-vous la gestion de la fiche Google Business et le référencement local ?',
      short: 'Oui, une prestation mensuelle dédiée est proposée dès 29 €/mois pour animer, optimiser et référencer votre fiche d\'établissement sur Google Maps.',
      detail: 'Elle comprend l\'optimisation initiale, la publication régulière d\'actualités/photos, la réponse aux avis clients et le suivi de positionnement local.',
    },
  ];

  const faqColumnRight = [
    {
      q: 'Suis-je propriétaire à 100 % de mon site internet et de mes données ?',
      short: 'Oui, vous êtes l\'unique et total propriétaire de l\'intégralité du code source, de vos contenus, de votre base de données et de votre nom de domaine.',
      detail: 'Aucun contrat d\'engagement forcé : vous êtes libre de faire évoluer ou d\'héberger votre projet où vous le souhaitez.',
    },
    {
      q: 'Quels sont les frais récurrents à prévoir (hébergement & domaine) ?',
      short: 'L\'hébergement sécurisé haute performance et votre nom de domaine sont inclus la première année dans chaque forfait.',
      detail: 'Par la suite, le coût technique direct de renouvellement reste minime (généralement entre 40 € et 90 € par an selon l\'envergure du projet), sans surcoût imposé.',
    },
    {
      q: 'Puis-je administrer moi-même les contenus ou les données de mon site ?',
      short: 'Selon vos besoins, une interface d\'administration intuitive peut être intégrée à votre projet.',
      detail: 'Si votre activité nécessite de mettre à jour des actualités, des réservations ou du matériel (comme pour LocaTool), l\'outil est conçu pour être simple sans compétences techniques.',
    },
    {
      q: 'Quel suivi ou accompagnement est proposé après la mise en ligne ?',
      short: 'Chaque livraison s\'accompagne d\'une période de garantie technique et d\'une assistance à la prise en main.',
      detail: 'Des forfaits d\'infogérance, de maintenance préventive et de sauvegardes régulières sont disponibles dès 29 €/mois pour assurer votre sérénité.',
    },
  ];

  const allFaq = [...faqColumnLeft, ...faqColumnRight];

  const faqSchemaMarkup = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaq.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${item.short} ${item.detail}`,
      },
    })),
  };

  return (
    <SectionReveal id="faq" className="faq-section">
      <script type="application/ld+json">
        {JSON.stringify(faqSchemaMarkup)}
      </script>

      <div className="wrap max-w-6xl">
        <div className="text-center mb-6">
          <div className="eyebrow reveal justify-center">FOIRE AUX QUESTIONS</div>
          <h2 className="section-title reveal mt-2">Questions fréquentes</h2>
          <p className="text-sm text-text-secondary mt-3 reveal max-w-2xl mx-auto">
            Retrouvez des réponses claires sur les tarifs, la propriété du code, les délais et le suivi de vos projets.
          </p>
        </div>

        {/* Bouton de contrôle global de la FAQ */}
        <div className="flex justify-center mb-6 reveal">
          <button
            onClick={() => setIsFaqOpen(!isFaqOpen)}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#2E8FE0]/40 bg-[#121729]/80 text-xs md:text-sm font-semibold text-[#2E8FE0] hover:bg-[#2E8FE0]/10 transition-all duration-300 shadow-[0_0_20px_rgba(46,143,224,0.1)] cursor-pointer"
            aria-expanded={isFaqOpen}
          >
            <HelpCircle size={16} />
            <span>{isFaqOpen ? 'Masquer la foire aux questions' : 'Afficher les questions fréquentes'}</span>
            {isFaqOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Grille Double-Colonne masquable */}
        <div
          className="transition-all duration-500 ease-in-out overflow-hidden text-left"
          style={{
            maxHeight: isFaqOpen ? '2500px' : '0px',
            opacity: isFaqOpen ? 1 : 0,
            pointerEvents: isFaqOpen ? 'auto' : 'none',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            
            {/* Colonne de Gauche : Tarifs & Délais */}
            <div>
              <h3 className="text-xs label-mono font-bold text-text-primary uppercase tracking-wider mb-6 border-b border-[rgba(245,246,250,0.08)] pb-2">
                Tarifs, Délais & Visibilité
              </h3>
              <div className="faq-list space-y-4">
                {faqColumnLeft.map((item, idx) => {
                  const isActive = activeLeftIndex === idx;
                  return (
                    <div key={idx} className={`faq-item rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.08)] transition-colors ${isActive ? 'active border-[#2E8FE0]/40' : ''}`}>
                      <button
                        className="faq-q w-full text-left flex items-center justify-between cursor-pointer focus:outline-none gap-4"
                        onClick={() => setActiveLeftIndex(isActive ? null : idx)}
                        aria-expanded={isActive}
                      >
                        <span className="font-semibold text-text-primary text-sm md:text-base leading-snug">{item.q}</span>
                        <span className="faq-plus flex-shrink-0 text-accent font-bold text-lg">{isActive ? '−' : '+'}</span>
                      </button>
                      <div
                        className="faq-a transition-all duration-300 ease-in-out"
                        style={{
                          maxHeight: isActive ? '500px' : '0px',
                          opacity: isActive ? 1 : 0,
                          overflow: 'hidden',
                        }}
                      >
                        <div className="faq-a-in pt-4 pb-5 px-6 border-t border-[rgba(245,246,250,0.06)] text-xs md:text-sm text-text-secondary space-y-2">
                          <p className="p-3 rounded-lg bg-[#2E8FE0]/10 border border-[#2E8FE0]/20 text-text-primary font-medium">
                            {item.short}
                          </p>
                          <p className="leading-relaxed pt-1">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Colonne de Droite : Propriété, Hébergement & Suivi */}
            <div>
              <h3 className="text-xs label-mono font-bold text-text-primary uppercase tracking-wider mb-6 border-b border-[rgba(245,246,250,0.08)] pb-2">
                Propriété, Hébergement & Suivi
              </h3>
              <div className="faq-list space-y-4">
                {faqColumnRight.map((item, idx) => {
                  const isActive = activeRightIndex === idx;
                  return (
                    <div key={idx} className={`faq-item rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.08)] transition-colors ${isActive ? 'active border-[#2E8FE0]/40' : ''}`}>
                      <button
                        className="faq-q w-full text-left flex items-center justify-between cursor-pointer focus:outline-none gap-4"
                        onClick={() => setActiveRightIndex(isActive ? null : idx)}
                        aria-expanded={isActive}
                      >
                        <span className="font-semibold text-text-primary text-sm md:text-base leading-snug">{item.q}</span>
                        <span className="faq-plus flex-shrink-0 text-accent font-bold text-lg">{isActive ? '−' : '+'}</span>
                      </button>
                      <div
                        className="faq-a transition-all duration-300 ease-in-out"
                        style={{
                          maxHeight: isActive ? '500px' : '0px',
                          opacity: isActive ? 1 : 0,
                          overflow: 'hidden',
                        }}
                      >
                        <div className="faq-a-in pt-4 pb-5 px-6 border-t border-[rgba(245,246,250,0.06)] text-xs md:text-sm text-text-secondary space-y-2">
                          <p className="p-3 rounded-lg bg-[#2E8FE0]/10 border border-[#2E8FE0]/20 text-text-primary font-medium">
                            {item.short}
                          </p>
                          <p className="leading-relaxed pt-1">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
