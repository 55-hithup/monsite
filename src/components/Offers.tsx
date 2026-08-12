import SectionReveal from './SectionReveal';

export default function Offers() {
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
      question: 'Comment améliorer son positionnement sur Google et les moteurs de recherche IA ?',
      answer: 'En rédigeant des contenus clairs, bien structurés avec des réponses directes aux questions fréquentes des utilisateurs.',
      badge: 'Référencement SEO',
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
        <div className="head-row mb-10">
          <div>
            <div className="eyebrow reveal">SERVICES & SOLUTIONS</div>
            <h2 className="section-title reveal">Quels types de projets web créons-nous pour vous ?</h2>
          </div>
          <div className="section-sub reveal bg-[#121729]/80 p-4 rounded-xl border border-[rgba(245,246,250,0.08)]">
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              DevSupAi propose 6 prestations principales adaptées aux entreprises et associations : création de site vitrine, portail associatif, boutique en ligne, application web métier, optimisation du référencement et maintenance régulière.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.num} className="cursor-target p-6 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.08)] hover:border-[#2E8FE0]/40 transition-all duration-300 reveal flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs label-mono text-purple-300 font-bold">{service.num}</span>
                  <span className="text-[10px] label-mono px-2.5 py-1 rounded-full bg-[#2E8FE0]/15 text-[#2E8FE0] border border-[#2E8FE0]/30 font-bold">
                    {service.badge}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#0B0F1E] border border-[rgba(245,246,250,0.06)] flex items-center justify-center text-[#2E8FE0] mb-4">
                  {service.icon}
                </div>

                <h3 className="text-base font-bold text-text-primary mb-3 leading-snug">
                  {service.question}
                </h3>

                <p className="text-xs text-text-secondary leading-relaxed">
                  {service.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
