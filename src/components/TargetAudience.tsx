import SectionReveal from './SectionReveal';

export default function TargetAudience() {
  return (
    <SectionReveal id="solutions" className="section-pad bg-[#090D1E]/60 border-t border-b border-[rgba(245,246,250,0.06)]">
      <div className="wrap">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="eyebrow reveal justify-center">SOLUTIONS PME & ASSOCIATIONS</div>
          <h2 className="section-title reveal mt-2 mb-4">
            Solutions web adaptées aux PME et Associations
          </h2>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed reveal bg-[#121729]/90 p-4 rounded-xl border border-[#2E8FE0]/30 text-left">
            Chaque secteur a ses propres priorités : une entreprise cherche à rassurer ses prospects et recevoir des demandes de devis, tandis qu'une association souhaite simplifier l'inscription de ses membres et valoriser ses actions. DevSupAi conçoit des outils sur-mesure pour répondre précisément à ces objectifs, sans bloquer l'utilisateur avec des menus complexes ou des lenteurs d'affichage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card PME */}
          <div className="reveal p-8 rounded-2xl bg-[#121729]/70 border border-[#2E8FE0]/30 hover:border-[#2E8FE0]/60 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#2E8FE0]/20 border-b border-l border-[#2E8FE0]/40 text-[10px] label-mono text-cyan-300 rounded-bl-xl font-bold">
              POUR LES PME & TPE
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
                Comment développer la visibilité et les demandes de devis d'une PME ?
              </h3>

              <div className="p-3 rounded-lg bg-[#2E8FE0]/10 border border-[#2E8FE0]/20 text-xs text-text-primary font-medium mb-4">
                <strong>Cas réel :</strong> Pour le restaurant <em>Les Jumeaux</em>, la création d'un système de réservation sur-mesure a permis d'enregistrer une hausse de 40% des réservations directes en ligne et de réduire de 50% la charge d'appels pendant le service.
              </div>

              <p className="text-xs text-text-secondary leading-relaxed mb-6">
                Selon les données Google, un site qui met plus de 3 secondes à s'afficher perd une part importante de ses visiteurs mobiles. En créant un site léger et clair, votre entreprise installe sa crédibilité dès les premières secondes et simplifie la prise de contact pour vos futurs clients.
              </p>

              <div className="space-y-2 mb-8 text-xs text-text-secondary">
                <div className="font-bold text-text-primary mb-2 label-mono text-[10px] text-purple-300 uppercase">Solutions apportées aux PME :</div>
                <div className="flex items-center gap-2">
                  <span className="text-[#2E8FE0] font-bold">-</span>
                  <span>Chargement instantané de la page sur smartphone</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#2E8FE0] font-bold">-</span>
                  <span>Formulaires de contact et de demande de devis clairs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#2E8FE0] font-bold">-</span>
                  <span>Structure optimisée pour le référencement naturel sur Google</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(245,246,250,0.06)]">
              <a href="#contact" className="btn btn-primary text-xs w-full text-center py-3" style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)', color: '#fff' }}>
                Échanger sur votre projet de PME →
              </a>
            </div>
          </div>

          {/* Card Associations */}
          <div className="reveal p-8 rounded-2xl bg-[#121729]/70 border border-[#6B4FE0]/30 hover:border-[#6B4FE0]/60 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#6B4FE0]/20 border-b border-l border-[#6B4FE0]/40 text-[10px] label-mono text-purple-300 rounded-bl-xl font-bold">
              POUR LES ASSOCIATIONS
            </div>

            <div>
              <div className="w-12 h-12 rounded-xl bg-[#6B4FE0]/15 border border-[#6B4FE0]/30 flex items-center justify-center text-[#6B4FE0] mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-text-primary mb-3">
                Comment faciliter l'engagement et l'inscription des membres d'une association ?
              </h3>

              <div className="p-3 rounded-lg bg-[#6B4FE0]/10 border border-[#6B4FE0]/20 text-xs text-text-primary font-medium mb-4">
                <strong>Objectif :</strong> Doter l'association d'un outil simple pour présenter ses activités, collecter des inscriptions et partager l'agenda des événements sans nécessiter d'équipe technique dédiée.
              </div>

              <p className="text-xs text-text-secondary leading-relaxed mb-6">
                Les membres et adhérents recherchent des informations simples : horaires, tarifs, formulaires d'inscription ou démarches de don. Une structure épurée permet d'accéder directement à ces informations indispensables.
              </p>

              <div className="space-y-2 mb-8 text-xs text-text-secondary">
                <div className="font-bold text-text-primary mb-2 label-mono text-[10px] text-purple-300 uppercase">Solutions apportées aux Associations :</div>
                <div className="flex items-center gap-2">
                  <span className="text-[#6B4FE0] font-bold">-</span>
                  <span>Présentation claire des événements et actualités</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#6B4FE0] font-bold">-</span>
                  <span>Formulaires en ligne pour les adhésions et prises de contact</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#6B4FE0] font-bold">-</span>
                  <span>Prise en main facile pour la mise à jour des contenus</span>
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
