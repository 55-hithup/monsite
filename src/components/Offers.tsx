import SectionReveal from './SectionReveal';

export default function Offers() {
  const services = [
    {
      num: '01',
      question: 'Comment un site vitrine sur-mesure génère-t-il des clients pour une PME ?',
      answer: 'Un site vitrine sur-mesure élimine la lenteur des templates. Il charge en 0.4s et guide l\'utilisateur vers la prise de contact instantanée.',
      example: 'Exemple : Un artisan du bâtiment a augmenté ses demandes de devis de +35% après refonte de son site vitrine sur-mesure.',
      badge: 'Acquisition PME',
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
      question: 'Comment un portail web simplifie-t-il la gestion d\'une association ?',
      answer: 'En centralisant les formulaires d\'adhésion, les appels à cotisations et la présentation des projets sur une interface réactive accessible sur mobile.',
      example: 'Exemple : Une association culturelle a numérisé 100% de ses formulaires et libéré ses bénévoles de la saisie manuelle.',
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
      question: 'Pourquoi une boutique e-commerce sur-mesure convertit-elle mieux ?',
      answer: 'Parce que 53% des acheteurs abandonnent leur panier si le paiement ou la page produit met plus de 3 secondes à répondre.',
      example: 'Exemple : Un commerce local a réduit son temps de passage en caisse web sous la seconde, augmentant son panier moyen de +22%.',
      badge: 'E-Commerce Ventes',
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
      question: 'Comment une application SaaS métier fait-elle gagner du temps à une PME ?',
      answer: 'En remplaçant les fichiers Excel complexes par un outil web sur-mesure qui automatise les tâches quotidiennes et les plannings.',
      example: 'Exemple : L\'application LocaTool a permis d\'automatiser le suivi de parc matériel et d\'économiser 10h de gestion par semaine.',
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
      question: 'Comment faire recommander son site par les IA (Google AI Overviews) ?',
      answer: 'En structurant les données en JSON-LD (FAQPage, ProfessionalService) et en appliquant les préceptes de l\'étude GEO de Princeton.',
      example: 'Statistique : Intégrer des données chiffrées précises augmente le taux de citation par les LLMs de +37% à +41%.',
      badge: 'SEO & GEO IA',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      ),
    },
    {
      num: '06',
      question: 'Comment assurer la sécurité et le suivi de son site sans bugs ?',
      answer: 'Une architecture sur-mesure en React / TypeScript est nativement sécurisée et nécessite 80% de maintenance en moins qu\'un site WordPress.',
      example: 'Résultat : 0 vulnérabilité de plugins et une disponibilité garantie à 99.9% sur les serveurs EDGE de Vercel.',
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
            <div className="eyebrow reveal">OFFRES & RÉPONSES AUX BESOINS</div>
            <h2 className="section-title reveal">Quels services web répondent<br />aux enjeux des PME et Associations ?</h2>
          </div>
          <div className="section-sub reveal bg-[#121729]/80 p-4 rounded-xl border border-[rgba(245,246,250,0.08)]">
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              <strong className="text-text-primary">⚡ Réponse directe :</strong> DevSupAi conçoit 6 types de projets sur-mesure (site vitrine, portail association, e-commerce, application SaaS métier, SEO/GEO IA et maintenance) formulés sous forme de questions-réponses concrètes et accompagnés d'exemples réels.
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

                <p className="text-xs text-text-secondary leading-relaxed mb-4">
                  <strong className="text-text-primary">Réponse :</strong> {service.answer}
                </p>
              </div>

              <div className="pt-3 border-t border-[rgba(245,246,250,0.06)] bg-[#2E8FE0]/5 p-3 rounded-lg border border-[#2E8FE0]/10 text-[11px] text-cyan-300 font-medium">
                📌 {service.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
