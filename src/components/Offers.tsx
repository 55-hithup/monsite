import SectionReveal from './SectionReveal';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export default function Offers() {
  const packages = [
    {
      id: 'presence',
      name: 'Pack Présence',
      badge: 'Lancement & Visibilité',
      price: '690 €',
      priceSub: 'Forfait sur-mesure',
      desc: 'Idéal pour les artisans, indépendants et associations souhaitant une vitrine professionnelle claire et percutante.',
      popular: false,
      features: [
        'Page unique (One-Page / Landing) optimisée conversion',
        'Vitesse instantanée & score Google PageSpeed 95-100/100',
        'Formulaire de contact sécurisé & Google Maps',
        'Conception mobile-first adaptée à tous les écrans',
        'Optimisation SEO technique initiale',
        'Nom de domaine, hébergement SSL & code 100% propriétaire',
      ],
      ctaText: 'Commander le Pack Présence',
    },
    {
      id: 'croissance',
      name: 'Pack Croissance',
      badge: 'Le plus choisi par les PME',
      price: '1 350 €',
      priceSub: 'Forfait sur-mesure',
      desc: 'La solution complète pour les PME et commerces voulant valoriser leur offre et convertir leurs visiteurs en clients.',
      popular: true,
      features: [
        'Architecture sur-mesure de 3 à 5 pages dédiées',
        'Design moderne premium & micro-animations GSAP fluides',
        'Stratégie de référencement naturel (SEO local ciblé)',
        'Galerie de réalisations / catalogue de produits & services',
        'Intégration avis clients Google & formulaires de devis',
        'Accompagnement & formation à la prise en main',
      ],
      ctaText: 'Choisir le Pack Croissance',
    },
    {
      id: 'saas',
      name: 'Pack SaaS & Métier',
      badge: 'Outils & Plateformes',
      price: '2 450 €',
      priceSub: 'Dès 2 450 € (Base TJM 350 €)',
      desc: 'Pour les applications sur-mesure, outils de réservation en ligne ou gestion de parc matériel (LocaTool).',
      popular: false,
      features: [
        'Développement full-stack sur-mesure (React / TypeScript)',
        'Base de données sécurisée & gestion des utilisateurs',
        'Espace d\'administration sur-mesure & tableaux de bord',
        'Intégration d\'API tierces (paiements Stripe, agendas, SMS)',
        'Architecture évolutive sans aucune dette technique',
        'Maintenance et suivi technique personnalisé',
      ],
      ctaText: 'Étudier mon projet SaaS',
    },
  ];

  const services = [
    {
      num: '01',
      question: 'Comment un site vitrine permet-il à une PME de gagner la confiance de ses clients ?',
      answer: 'En proposant une navigation fluide, une présentation claire de vos services et un formulaire de contact accessible en un clic.',
      badge: 'Site Vitrine PME',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M3 5h18v14H3z" />
          <path d="M3 9h18" />
          <circle cx="6" cy="7" r=".6" />
        </svg>
      ),
    },
    {
      num: '02',
      question: 'Comment un portail web aide-t-il une association à informer et rassembler ses membres ?',
      answer: 'En centralisant la présentation des projets, l\'agenda des événements et les formulaires d\'adhésion sur une interface simple à utiliser.',
      badge: 'Portail Association',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        </svg>
      ),
    },
    {
      num: '03',
      question: 'Pourquoi une boutique en ligne sur-mesure facilite-t-elle le parcours d\'achat ?',
      answer: 'Parce que les pages de produits et les étapes de paiement s\'affichent sans lenteur, évitant de perdre le client avant la validation du panier.',
      badge: 'Vente en Ligne',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M6 6h15l-1.5 9h-12z" />
          <circle cx="9" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
        </svg>
      ),
    },
    {
      num: '04',
      question: 'Comment une application web métier simplifie-t-elle l\'organisation d\'une entreprise ?',
      answer: 'En remplaçant les documents éparpillés par un outil unique pour suivre l\'activité, gérer les plannings ou suivre le matériel (comme le logiciel LocaTool).',
      badge: 'Application & SaaS',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M9 7h6M9 11h6M9 15h3" />
        </svg>
      ),
    },
    {
      num: '05',
      question: 'Comment assurer la visibilité d\'un site sur Google ?',
      answer: 'En concevant une structure de code épurée et des contenus bien organisés pour faciliter l\'indexation par les moteurs de recherche.',
      badge: 'Structure & Visibilité',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      ),
    },
    {
      num: '06',
      question: 'Comment maintenir un site web sécurisé et à jour sur la durée ?',
      answer: 'En choisissant une structure propre et légère qui demande peu d\'interventions complexes tout en restant parfaitement protégée.',
      badge: 'Suivi & Sérénité',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 2l2.4 5 5.6.8-4 3.9.9 5.6L12 14.8 7.1 17.3l.9-5.6-4-3.9 5.6-.8z" />
        </svg>
      ),
    },
  ];

  return (
    <SectionReveal id="services" className="section-pad">
      <div className="wrap">
        {/* Section Header */}
        <div className="head-row mb-12">
          <div>
            <div className="eyebrow reveal">FORFAITS & TARIFS SUR-MESURE</div>
            <h2 className="section-title reveal">Nos offres de création web et applications sur-mesure</h2>
          </div>
          <div className="section-sub reveal bg-[#121729]/80 p-4 rounded-xl border border-[rgba(245,246,250,0.08)]">
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              Des tarifs clairs, compétitifs et sans coûts cachés. Zéro modèle générique : chaque produit est développé sur-mesure pour vous garantir une vitesse d'affichage maximale et un retour sur investissement durable.
            </p>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-7 rounded-2xl flex flex-col justify-between relative transition-all duration-300 reveal text-left ${
                pkg.popular
                  ? 'bg-gradient-to-b from-[#161d36] to-[#0d1224] border-2 border-[#2E8FE0] shadow-[0_0_35px_rgba(46,143,224,0.18)] lg:-translate-y-2'
                  : 'bg-[#121729]/70 border border-[rgba(245,246,250,0.08)] hover:border-[rgba(245,246,250,0.18)]'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#2E8FE0] text-[#0B122C] text-[10px] label-mono font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                  <Sparkles size={11} />
                  <span>Recommandé PME</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-text-primary">
                    {pkg.name}
                  </h3>
                  <span className={`text-[10px] label-mono px-2.5 py-1 rounded-full font-bold ${
                    pkg.popular 
                      ? 'bg-[#2E8FE0]/20 text-cyan-300 border border-[#2E8FE0]/40'
                      : 'bg-[#1b223d] text-text-secondary border border-[rgba(245,246,250,0.06)]'
                  }`}>
                    {pkg.badge}
                  </span>
                </div>

                <div className="my-5 pb-5 border-b border-[rgba(245,246,250,0.08)]">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs text-text-secondary font-medium">dès</span>
                    <span className="text-3xl md:text-4xl font-extrabold text-text-primary label-mono tracking-tight">
                      {pkg.price}
                    </span>
                  </div>
                  <span className="text-[11px] text-text-secondary block mt-1">
                    {pkg.priceSub}
                  </span>
                  <p className="text-xs text-text-secondary mt-3 leading-relaxed">
                    {pkg.desc}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <span className="text-[10px] label-mono uppercase text-purple-300 font-bold tracking-wider block">
                    Inclus dans cette offre :
                  </span>
                  <ul className="space-y-2.5">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="text-xs text-text-secondary flex items-start gap-2.5 leading-snug">
                        <CheckCircle2 size={15} className="text-[#2E8FE0] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantees & Transparency Strip */}
        <div className="p-6 rounded-2xl bg-[#0B0F1E]/90 border border-[rgba(245,246,250,0.08)] mb-16 reveal">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-[#2E8FE0]/10 border border-[#2E8FE0]/25 flex items-center justify-center text-[#2E8FE0] shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                  100% Propriétaire
                </h4>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  Zéro frais de licence cachés, pas d'abonnements de plugins obligatoires. Vous possédez l'intégralité du code source.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-[#2E8FE0]/10 border border-[#2E8FE0]/25 flex items-center justify-center text-[#2E8FE0] shrink-0">
                <Zap size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                  Vitesse & SEO Garantis
                </h4>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  Code épuré garantissant une note de 95 à 100/100 sur Google PageSpeed et un affichage instantané sur smartphone.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-[#2E8FE0]/10 border border-[#2E8FE0]/25 flex items-center justify-center text-[#2E8FE0] shrink-0">
                <Sparkles size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                  Interlocuteur Unique
                </h4>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  Échange direct avec Alexandre Pabst, sans intermédiaire d'agence, pour une réactivité et une écoute maximales.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Capability Question Cards */}
        <div className="mb-6">
          <div className="text-left mb-6 reveal">
            <h3 className="text-lg md:text-xl font-bold text-text-primary">
              Découvrez nos domaines d'expertise & cas d'usage
            </h3>
            <p className="text-xs text-text-secondary mt-1">
              Des réponses sur-mesure aux besoins quotidiens des entreprises et des associations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.num} className="cursor-target p-6 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.08)] hover:border-[#2E8FE0]/40 transition-all duration-300 reveal flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs label-mono text-purple-300 font-bold">{service.num}</span>
                    <span className="text-[10px] label-mono px-2.5 py-1 rounded-full bg-[#2E8FE0]/15 text-cyan-300 border border-[#2E8FE0]/30 font-bold">
                      {service.badge}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-[#0B0F1E] border border-[rgba(245,246,250,0.06)] flex items-center justify-center text-[#2E8FE0] mb-4">
                    {service.icon}
                  </div>

                  <h4 className="text-base font-bold text-text-primary mb-3 leading-snug">
                    {service.question}
                  </h4>

                  <p className="text-xs text-text-secondary leading-relaxed">
                    {service.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional Add-on Service Banner: Google Business & SEO Local */}
        <div className="mt-12 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#121729] via-[#0B0F1E] to-[#121729] border border-[#2E8FE0]/30 shadow-[0_0_30px_rgba(46,143,224,0.08)] reveal text-left">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E8FE0]/10 border border-[#2E8FE0]/30 text-[10px] label-mono text-cyan-300 font-bold mb-3 uppercase tracking-wider">
                <span>Prestation Mensuelle</span>
                <span>•</span>
                <span>Visibilité Locale</span>
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold text-text-primary mb-2">
                Gestion & Animation Google Business Profile
              </h3>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                Boostez votre présence sur Google Maps et attirez plus de clients locaux grâce à une gestion mensuelle clé en main de votre fiche d'établissement.
              </p>
            </div>
            
            <a
              href="#contact"
              className="cursor-target label-mono text-xs font-bold px-6 py-3 rounded-full bg-accent hover:bg-cyan-200 transition-all duration-150 inline-flex items-center justify-center gap-2 shadow-lg shadow-accent/25 shrink-0 hover:scale-105"
              style={{ backgroundColor: '#2E8FE0', color: '#020617' }}
            >
              <span style={{ color: '#020617' }}>Demander cette option</span>
              <ArrowRight size={13} style={{ color: '#020617' }} />
            </a>
          </div>

          {/* Formulas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-[rgba(245,246,250,0.08)]">
            <div className="p-4 rounded-xl bg-[#121729]/80 border border-[rgba(245,246,250,0.08)]">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-sm font-bold text-text-primary">Formule Starter</span>
                <span className="text-sm label-mono font-extrabold text-accent">29 € <span className="text-[10px] text-text-secondary font-normal">/ mois</span></span>
              </div>
              <ul className="text-xs text-text-secondary space-y-1.5 list-disc list-inside">
                <li>Optimisation initiale complète de la fiche Google</li>
                <li>2 à 4 publications / mois & ajouts de photos client</li>
                <li>Modération et réponse aux avis clients</li>
                <li>Suivi mensuel simple des statistiques de visites</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#2E8FE0]/10 border border-[#2E8FE0]/20">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-sm font-bold text-text-primary">Formule Boost SEO Local</span>
                <span className="text-sm label-mono font-extrabold text-cyan-300">99 – 179 € <span className="text-[10px] text-text-secondary font-normal">/ mois</span></span>
              </div>
              <ul className="text-xs text-text-secondary space-y-1.5 list-disc list-inside">
                <li>Publications renforcées & visuels sur-mesure</li>
                <li>Recherche approfondie de mots-clés locaux</li>
                <li>Optimisation SEO locale continue et positionnement Maps</li>
                <li>Rapport de performance et recommandations personnalisées</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
