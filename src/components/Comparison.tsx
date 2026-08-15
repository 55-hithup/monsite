import SectionReveal from './SectionReveal';
import MagneticWrapper from './MagneticWrapper';
import { Check, X, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Comparison() {
  return (
    <SectionReveal id="comparatif" className="py-20 md:py-28 lg:py-36" style={{ position: 'relative' }}>
      <div className="wrap-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Colonne Gauche : 100% Texte & Argumentaire (sans cartes) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 text-left space-y-5 reveal">
            <div className="eyebrow">COMPARATIF OBJECTIF</div>
            
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight">
              Développement sur-mesure vs Modèles génériques
            </h2>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
              Les modèles pré-conçus imposent souvent des structures rigides, des fonctions superflues et des abonnements captifs. La création sur-mesure vous garantit une image de marque unique, une autonomie totale et une expérience intuitive qui rassure vos prospects.
            </p>

            {/* Checklist de bénéfices */}
            <div className="space-y-3 pt-2 border-y border-[rgba(245,246,250,0.08)] py-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong className="text-text-primary font-semibold">Identité exclusive :</strong> Une interface sur-mesure qui valorise votre réputation face aux modèles vus partout.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong className="text-text-primary font-semibold">Économies sur la durée :</strong> Zéro abonnement de plugin payant obligatoire (400 € à 1 200 € économisés par an).
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong className="text-text-primary font-semibold">Confort de navigation :</strong> Affichage immédiat pour ne perdre aucun visiteur impatient.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong className="text-text-primary font-semibold">Indexation Google :</strong> Code propre et sémantique pour remonter naturellement dans les recherches.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-1">
              <MagneticWrapper range={25} strength={0.2}>
                <a
                  href="#contact"
                  className="btn btn-primary w-full sm:w-auto justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)',
                    color: '#0B122C',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 700,
                  }}
                >
                  <span>Demander un devis sur-mesure</span>
                  <ArrowRight size={14} className="text-[#0B122C]" />
                </a>
              </MagneticWrapper>
            </div>
          </div>

          {/* Colonne Droite : 2 Cartes avec disparition du texte au roll-on pour révéler l'image nette */}
          <div className="lg:col-span-7 flex flex-col gap-5 lg:pt-9">
            
            {/* Carte 1 : Sur-mesure DevSupAi (avec compare_after.webp) */}
            <div className="group relative rounded-2xl overflow-hidden border-2 border-[#2E8FE0] shadow-[0_0_35px_rgba(46,143,224,0.18)] p-6 sm:p-7 text-left reveal cursor-pointer min-h-[300px] flex flex-col justify-between">
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: 'url(/compare_after.webp)' }}
              />

              {/* High-contrast dark gradient overlay (disparaît au hover) */}
              <div
                className="absolute inset-0 transition-opacity duration-500 ease-out group-hover:opacity-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, rgba(7, 9, 19, 0.96) 0%, rgba(7, 9, 19, 0.88) 55%, rgba(7, 9, 19, 0.72) 100%)',
                }}
              />

              {/* Contenu textuel (disparaît au hover et revient au roll-out) */}
              <div className="relative z-10 transition-all duration-500 ease-out group-hover:opacity-0 group-hover:translate-y-2 group-hover:pointer-events-none">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs label-mono px-3 py-1 rounded-full font-bold uppercase bg-[#2E8FE0]/25 text-cyan-300 border border-[#2E8FE0]/50 flex items-center gap-1.5 backdrop-blur-md">
                    <ShieldCheck size={12} />
                    <span>100% Optimisé & Pérenne</span>
                  </span>
                  <span className="text-xs font-bold text-cyan-300 drop-shadow">Recommandé</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2 tracking-tight">
                  Développement Sur-Mesure DevSupAi
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
                  Une solution taillée sur-mesure pour votre activité, sans compromis sur la qualité ni dépendance logicielle.
                </p>

                <ul className="space-y-2.5 pt-2 border-t border-white/10">
                  <li className="flex items-start gap-2.5 text-xs text-slate-200 leading-snug">
                    <Check size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Navigation instantanée :</strong> parcours visiteur fluide et sans friction pour maximiser vos prises de contact.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-slate-200 leading-snug">
                    <Check size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Design exclusif :</strong> identité visuelle unique conçue spécialement pour votre entreprise ou association.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-slate-200 leading-snug">
                    <Check size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Zéro abonnement forcé :</strong> code 100% propriétaire dont vous êtes l'unique et total détenteur.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-slate-200 leading-snug">
                    <Check size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Structure propre :</strong> balisage clair facilitant l'indexation par Google et les moteurs de recherche.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Carte 2 : Modèles pré-conçus (avec compare_before.webp) */}
            <div className="group relative rounded-2xl overflow-hidden border border-[rgba(245,246,250,0.08)] hover:border-red-500/40 p-6 sm:p-7 text-left reveal cursor-pointer min-h-[300px] flex flex-col justify-between">
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: 'url(/compare_before.webp)' }}
              />

              {/* High-contrast dark gradient overlay (disparaît au hover) */}
              <div
                className="absolute inset-0 transition-opacity duration-500 ease-out group-hover:opacity-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, rgba(7, 9, 19, 0.96) 0%, rgba(7, 9, 19, 0.88) 55%, rgba(7, 9, 19, 0.72) 100%)',
                }}
              />

              {/* Contenu textuel (disparaît au hover et revient au roll-out) */}
              <div className="relative z-10 transition-all duration-500 ease-out group-hover:opacity-0 group-hover:translate-y-2 group-hover:pointer-events-none">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs label-mono px-3 py-1 rounded-full font-bold uppercase bg-red-500/20 text-red-300 border border-red-500/40 backdrop-blur-md">
                    Lenteurs & Contraintes
                  </span>
                  <span className="text-xs text-red-400 font-medium drop-shadow">À éviter</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2 tracking-tight">
                  Modèles pré-conçus & thèmes génériques
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
                  Des solutions standardisées qui alourdissent votre site et créent une dépendance à des plugins payants.
                </p>

                <ul className="space-y-2.5 pt-2 border-t border-white/10">
                  <li className="flex items-start gap-2.5 text-xs text-slate-300 leading-snug">
                    <X size={15} className="text-red-400 shrink-0 mt-0.5" />
                    <span>Fonctionnalités superflues alourdissant le site et dégradant l'expérience de vos visiteurs.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-slate-300 leading-snug">
                    <X size={15} className="text-red-400 shrink-0 mt-0.5" />
                    <span>Mise en page générique déjà utilisée par des dizaines d'autres sites concurrents.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-slate-300 leading-snug">
                    <X size={15} className="text-red-400 shrink-0 mt-0.5" />
                    <span>Dépendance à des abonnements payants de plugins et risques de bugs ou pannes aux mises à jour.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-slate-300 leading-snug">
                    <X size={15} className="text-red-400 shrink-0 mt-0.5" />
                    <span>Référencement naturel plus difficile à optimiser face à des structures concurrentes bien conçues.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

        </div>
      </div>
    </SectionReveal>
  );
}
