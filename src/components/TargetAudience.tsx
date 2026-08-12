import SectionReveal from './SectionReveal';

export default function TargetAudience() {
  return (
    <SectionReveal id="solutions" className="section-pad bg-[#090D1E]/60 border-t border-b border-[rgba(245,246,250,0.06)]">
      <div className="wrap">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="eyebrow reveal justify-center">SOLUTIONS & CAS RÉELS</div>
          <h2 className="section-title reveal mt-2 mb-4">
            Comment DevSupAi répond-il aux besoins des PME et Associations ?
          </h2>
          <div className="p-4 rounded-xl bg-[#121729]/90 border border-[#2E8FE0]/30 text-xs md:text-sm text-text-secondary leading-relaxed reveal text-left">
            <strong className="text-text-primary">Réponse directe :</strong> DevSupAi crée des architectures web et applications SaaS sur-mesure qui résolvent les problèmes concrets des PME (génération de leads, crédibilité, automatisation) et des Associations (gestion d'adhérents, formulaires de dons, visibilité locale) avec des exemples concrets mesurables.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card PME */}
          <div className="reveal p-8 rounded-2xl bg-[#121729]/70 border border-[#2E8FE0]/30 hover:border-[#2E8FE0]/60 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#2E8FE0]/20 border-b border-l border-[#2E8FE0]/40 text-[10px] label-mono text-[#2E8FE0] rounded-bl-xl font-bold">
              CAS PME & TPE
            </div>

            <div>
              <div className="w-12 h-12 rounded-xl bg-[#2E8FE0]/15 border border-[#2E8FE0]/30 flex items-center justify-center text-[#2E8FE0] mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M3 21h18" />
                  <path d="M3 7v14" />
                  <path d="M13 3v18" />
                  <path d="M21 11v10" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-text-primary mb-3">
                Comment une PME accélère-t-elle sa croissance avec un site sur-mesure ?
              </h3>

              <div className="p-3 rounded-lg bg-[#2E8FE0]/10 border border-[#2E8FE0]/20 text-xs text-text-primary font-medium mb-4">
                <strong>Exemple réel :</strong> Le restaurant <em>Les Jumeaux</em> a remplacé sa solution tiers par un système de réservation sur-mesure ultra-rapide (chargement en 0.4s) et a enregistré une <strong>hausse de +40% des réservations directes</strong> en moins de 3 mois.
              </div>

              <p className="text-xs text-text-secondary leading-relaxed mb-6">
                Selon une étude Google, 73% des utilisateurs quittent un site PME s'il met plus de 3 secondes à charger. En concevant un site sur-mesure léger, sans dépendances lourdes, votre PME gagne des positions sur Google et convertit plus de visiteurs en clients.
              </p>

              <div className="space-y-2 mb-8 text-xs text-text-secondary">
                <div className="font-bold text-text-primary mb-2 label-mono text-[10px] text-purple-300 uppercase">Bénéfices chiffrés PME :</div>
                <div className="flex items-center gap-2">
                  <span className="text-[#2E8FE0] font-bold">✓</span>
                  <span>Temps d'affichage sous les <strong>600ms</strong> sur smartphone (4G)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#2E8FE0] font-bold">✓</span>
                  <span>Score <strong>Google PageSpeed / Lighthouse de 100/100</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#2E8FE0] font-bold">✓</span>
                  <span>Formulaires de devis interactifs réduisant le temps de relance</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(245,246,250,0.06)]">
              <a href="#contact" className="btn btn-primary text-xs w-full text-center py-3" style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)', color: '#fff' }}>
                Demander une étude gratuite pour votre PME →
              </a>
            </div>
          </div>

          {/* Card Associations */}
          <div className="reveal p-8 rounded-2xl bg-[#121729]/70 border border-[#6B4FE0]/30 hover:border-[#6B4FE0]/60 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#6B4FE0]/20 border-b border-l border-[#6B4FE0]/40 text-[10px] label-mono text-purple-300 rounded-bl-xl font-bold">
              CAS ASSOCIATIONS
            </div>

            <div>
              <div className="w-12 h-12 rounded-xl bg-[#6B4FE0]/15 border border-[#6B4FE0]/30 flex items-center justify-center text-[#6B4FE0] mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-text-primary mb-3">
                Comment une Association digitalise-t-elle ses adhésions et ses événements ?
              </h3>

              <div className="p-3 rounded-lg bg-[#6B4FE0]/10 border border-[#6B4FE0]/20 text-xs text-text-primary font-medium mb-4">
                <strong>Exemple réel :</strong> Pour un club sportif et culturel associatif, la mise en place d'un portail avec formulaires d'adhésion en ligne a divisé par 3 le temps de traitement administratif des bénévoles lors de la rentrée.
              </div>

              <p className="text-xs text-text-secondary leading-relaxed mb-6">
                Les associations manquent souvent de temps et de budget. Une plateforme web sur-mesure permet de présenter clairement les actions, de centraliser les inscriptions et de collecter des dons sans bug technique.
              </p>

              <div className="space-y-2 mb-8 text-xs text-text-secondary">
                <div className="font-bold text-text-primary mb-2 label-mono text-[10px] text-purple-300 uppercase">Bénéfices chiffrés Association :</div>
                <div className="flex items-center gap-2">
                  <span className="text-[#6B4FE0] font-bold">✓</span>
                  <span>Formulaires d'adhésion et de don simplifiés à 100%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#6B4FE0] font-bold">✓</span>
                  <span>Mise en valeur claire des événements et assemblées générales</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#6B4FE0] font-bold">✓</span>
                  <span>Administration facile utilisable par tout bénévole sans compétence technique</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(245,246,250,0.06)]">
              <a href="#contact" className="btn btn-ghost text-xs w-full text-center py-3 border border-[rgba(245,246,250,0.12)]">
                Échanger sur votre projet d'association →
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
