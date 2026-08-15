import SectionReveal from './SectionReveal';
import MagneticWrapper from './MagneticWrapper';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export default function Offers() {
  const packages = [
    {
      id: 'presence',
      name: 'Pack Présence',
      badge: 'Artisans & Indépendants',
      price: '690 €',
      priceSub: 'Forfait sur-mesure clé en main',
      desc: 'Idéal pour créer une première vitrine professionnelle claire, percutante et rassurante.',
      popular: false,
      features: [
        'Page unique (One-Page / Landing) pensée pour convaincre',
        'Formulaire de contact direct & intégration Google Maps',
        'Optimisation SEO technique initiale & indexation Google',
        'Nom de domaine, hébergement SSL & code 100% propriétaire',
      ],
      ctaText: 'Choisir le Pack Présence',
    },
    {
      id: 'croissance',
      name: 'Pack Croissance PME',
      badge: 'Le plus plébiscité',
      price: '1 350 €',
      priceSub: 'Forfait complet sur-mesure',
      desc: 'La solution complète pour les PME souhaitant valoriser leur offre et convertir leurs visiteurs en clients.',
      popular: true,
      features: [
        'Architecture sur-mesure de 3 à 5 pages dédiées',
        'Design moderne de prestige & micro-animations GSAP fluides',
        'Stratégie de référencement naturel (SEO local ciblé)',
        'Galerie de réalisations, catalogue & formulaires de devis',
        'Intégration d\'avis clients Google & formation prise en main',
      ],
      ctaText: 'Choisir le Pack Croissance',
    },
    {
      id: 'saas',
      name: 'Pack SaaS & Métier',
      badge: 'Applications & Plateformes',
      price: '2 450 €',
      priceSub: 'Dès 2 450 € (Base TJM 350 €)',
      desc: 'Pour les applications sur-mesure, outils de réservation en ligne ou gestion de parc matériel.',
      popular: false,
      features: [
        'Développement full-stack sur-mesure en React & TypeScript',
        'Base de données sécurisée, authentification & rôles',
        'Tableaux de bord d\'administration personnalisés',
        'Intégration d\'API tierces (Stripe, agendas, SMS, cloud)',
      ],
      ctaText: 'Étudier mon projet SaaS',
    },
  ];

  return (
    <SectionReveal id="services" className="py-20 md:py-28 lg:py-36" style={{ position: 'relative' }}>
      <div className="wrap-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Colonne Gauche : 100% Texte & Réassurance (sans cartes) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 text-left space-y-5 reveal">
            <div className="eyebrow">FORFAITS & TARIFS SUR-MESURE</div>
            
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight">
              Des tarifs clairs et transparents, adaptés à votre projet
            </h2>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
              Développement sur-mesure pour votre succès, sans frais cachés ni abonnements logiciels captifs. Vous investissez dans une solution pérenne, dont vous êtes le seul propriétaire.
            </p>

            {/* Checklist de réassurance */}
            <div className="space-y-3 pt-2 border-y border-[rgba(245,246,250,0.08)] py-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong className="text-text-primary font-semibold">Solution clé en main :</strong> Conception personnalisée sans modèle pré-conçu générique.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong className="text-text-primary font-semibold">Zéro abonnement imposé :</strong> Vous possédez 100% du code source et de vos données.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong className="text-text-primary font-semibold">Domaine & hébergement inclus :</strong> Inclus la première année, sans surcoût imposé.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong className="text-text-primary font-semibold">Interlocuteur unique :</strong> Alexandre Pabst, développeur freelance dédié, réponse sous 24h.
                </p>
              </div>
            </div>

            {/* Option Google Business Profile */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] label-mono text-cyan-300 font-bold uppercase tracking-wider">
                  Option Mensuelle
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-bold text-text-primary">Dès 29 € / mois</span>
              </div>
              <p className="text-[11px] text-text-secondary leading-relaxed font-light">
                Gestion & animation de votre fiche Google Maps pour maximiser votre référencement local et répondre aux avis clients.
              </p>
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
                  <span>Demander un devis gratuit</span>
                  <ArrowRight size={14} className="text-[#0B122C]" />
                </a>
              </MagneticWrapper>
            </div>
          </div>

          {/* Colonne Droite : Les 3 Forfaits empilés verticalement avec Grands Prix en bas à droite */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`p-6 sm:p-7 rounded-2xl relative transition-all duration-300 reveal text-left ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-[#141b33] via-[#0f152b] to-[#141b33] border-2 border-[#2E8FE0] shadow-[0_0_35px_rgba(46,143,224,0.18)]'
                    : 'bg-[#121729]/70 border border-[rgba(245,246,250,0.08)] hover:border-[rgba(245,246,250,0.2)]'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 right-6 px-3.5 py-0.5 rounded-full bg-[#2E8FE0] text-[#0B122C] text-[10px] label-mono font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                    <Sparkles size={11} />
                    <span>Recommandé PME</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-stretch">
                  
                  {/* Partie Gauche : Badge, Titre, Description et Bouton (5 cols) */}
                  <div className="sm:col-span-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-[10px] label-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${
                          pkg.popular
                            ? 'bg-[#2E8FE0]/20 text-cyan-300 border border-[#2E8FE0]/40'
                            : 'bg-white/[0.04] text-text-secondary border border-white/5'
                        }`}>
                          {pkg.badge}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">
                        {pkg.name}
                      </h3>

                      <p className="text-xs text-text-secondary leading-relaxed font-light mb-4">
                        {pkg.desc}
                      </p>
                    </div>

                    <div className="pt-2">
                      <a
                        href={`#contact?pack=${pkg.id}`}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold label-mono transition-all duration-200 shadow-md ${
                          pkg.popular
                            ? 'bg-[#2E8FE0] text-[#0B122C] hover:bg-cyan-200'
                            : 'bg-white/10 text-text-primary hover:bg-white/20 border border-white/15'
                        }`}
                      >
                        <span>{pkg.ctaText}</span>
                        <ArrowRight size={13} />
                      </a>
                    </div>
                  </div>

                  {/* Partie Droite : Fonctionnalités & GRAND TARIF en bas à droite (7 cols) */}
                  <div className="sm:col-span-7 sm:border-l sm:border-[rgba(245,246,250,0.06)] sm:pl-5 pt-3 sm:pt-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] label-mono uppercase text-purple-300 font-bold tracking-wider block mb-2.5">
                        Inclus dans ce forfait :
                      </span>
                      <ul className="space-y-1.5 mb-4">
                        {pkg.features.map((feat, idx) => (
                          <li key={idx} className="text-xs text-text-secondary flex items-start gap-2 leading-snug">
                            <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Prix élégamment dosé à gauche du texte bleu */}
                    <div className="pt-3 mt-3 border-t border-[rgba(245,246,250,0.08)] flex flex-wrap items-baseline justify-end gap-3">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs text-slate-400 font-semibold label-mono uppercase">dès</span>
                        <span className="text-2xl sm:text-3xl font-extrabold text-white label-mono tracking-tight">
                          {pkg.price}
                        </span>
                      </div>
                      <span className="text-xs label-mono text-cyan-300 font-bold uppercase tracking-wider">
                        • {pkg.priceSub}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </SectionReveal>
  );
}
