import { Link } from 'react-router-dom';
import SectionReveal from '../components/SectionReveal';
import MagneticWrapper from '../components/MagneticWrapper';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export default function ProjectsPage() {
  useDocumentMetadata(
    "Réalisations & Études de Cas Web Sur-Mesure | DevSupAi",
    "Découvrez nos réalisations de sites web et applications sur-mesure pour PME et Associations : études de cas réelles, choix techniques et résultats concrets."
  );

  const projects = [
    {
      id: 'les-jumeaux',
      title: 'Les Jumeaux — Site vitrine & Système de réservation',
      category: 'Restauration • Site Sur-Mesure',
      path: '/projets/les-jumeaux',
      image: '/case_les_jumeaux.webp',
      question: 'Comment simplifier la prise de réservation d\'un restaurant sans widget tiers lourd ?',
      answer: 'En créant un formulaire de réservation sur-mesure connecté en temps réel et intégré dans une interface épurée à affichage rapide.',
      metrics: 'Hausse de 40% des réservations directes en ligne et réduction de 50% de la charge d\'appels téléphoniques pendant le service.',
    },
    {
      id: 'locatool',
      title: 'LocaTool — Logiciel SaaS de gestion de parc matériel',
      category: 'BTP & Entreprise • Application Web SaaS',
      path: '/projets/locatool',
      image: '/case_locatool.webp',
      question: 'Comment regrouper le suivi de stock, la planification et la facturation dans un seul outil ?',
      answer: 'En développant un tableau de bord réactif intégrant un calendrier interactif et la génération automatique de contrats de location en PDF.',
      metrics: 'Gain de 30% d\'efficacité administrative pour les équipes et suppression des erreurs de sur-réservation.',
    },
    {
      id: 'abogame',
      title: 'Abogame — Plateforme interactive de tirage au sort live',
      category: 'Streaming & Communauté • Application Mobile-First',
      path: '/projets/abogame',
      image: '/case_abogame.webp',
      question: 'Comment animer des tirages au sort en direct de manière fluide et transparente sur smartphone ?',
      answer: 'En créant une interface mobile-first avec roue interactive animée et synchronisation en temps réel sans latence.',
      metrics: 'Augmentation de 50% de l\'engagement des spectateurs en direct par rapport aux tirages textuels ordinaires.',
    },
  ];

  const pageSchemaMarkup = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Réalisations & Études de Cas Web Sur-Mesure | DevSupAi",
    "description": "Découvrez nos réalisations de sites web et applications sur-mesure pour PME et Associations.",
    "url": "https://www.devsupai.fr/realisations",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": projects.map((p, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": p.title,
        "url": `https://www.devsupai.fr${p.path}`,
      })),
    },
  };

  return (
    <SectionReveal className="section-pad text-left" style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', paddingTop: '140px' }}>
      <script type="application/ld+json">
        {JSON.stringify(pageSchemaMarkup)}
      </script>

      <div className="wrap max-w-5xl">
        {/* Eyebrow */}
        <div className="eyebrow reveal">PORTFOLIO & ÉTUDES DE CAS</div>

        {/* Main H1 */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary mt-3 mb-6 leading-tight">
          Nos réalisations et études de cas sur-mesure
        </h1>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-12 max-w-3xl">
          Chaque projet est conçu sur-mesure pour répondre à un besoin précis : valoriser l'image d'un établissement, automatiser une gestion administrative ou dynamiser l'engagement d'une communauté. Découvrez des exemples concrets de réalisations et leurs résultats réels.
        </p>

        {/* Project Cards Grid */}
        <div className="space-y-10">
          {projects.map((project) => (
            <div
              key={project.id}
              className="reveal p-6 md:p-8 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.08)] hover:border-[#2E8FE0]/40 transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Image Preview */}
              <div className="md:col-span-5 rounded-xl overflow-hidden border border-[rgba(245,246,250,0.06)] aspect-video relative group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Right Column: Project Info & QFO Details */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] label-mono text-purple-300 uppercase tracking-wider block mb-1">
                    {project.category}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-3">
                    {project.title}
                  </h2>

                  {/* QFO Question & Answer */}
                  <div className="space-y-2 mb-4">
                    <h3 className="text-xs font-bold text-text-primary">
                      {project.question}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {project.answer}
                    </p>
                  </div>

                  {/* Real Metric Box */}
                  <div className="p-3 rounded-lg bg-[#2E8FE0]/10 border border-[#2E8FE0]/20 text-xs text-text-primary font-medium">
                    <strong>Résultat constaté :</strong> {project.metrics}
                  </div>
                </div>

                <div className="pt-2">
                  <MagneticWrapper range={20} strength={0.2}>
                    <Link
                      to={project.path}
                      className="btn btn-primary text-xs inline-flex items-center gap-2 py-2.5 px-5"
                      style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)', color: '#fff' }}
                    >
                      Consulter l'étude de cas complète →
                    </Link>
                  </MagneticWrapper>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Contact Footer */}
        <div className="mt-16 p-8 rounded-2xl bg-[#121729]/80 border border-[#2E8FE0]/30 text-center max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-text-primary mb-3">
            Vous avez un projet de site ou d'application web ?
          </h2>
          <p className="text-xs md:text-sm text-text-secondary mb-6 leading-relaxed">
            Échangeons gratuitement sur vos besoins pour étudier la solution la plus adaptée à votre entreprise ou association.
          </p>
          <MagneticWrapper range={30} strength={0.25}>
            <Link
              to="/#contact"
              className="btn btn-primary text-xs inline-block py-3 px-8"
              style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)', color: '#fff' }}
            >
              Discuter de mon projet →
            </Link>
          </MagneticWrapper>
        </div>
      </div>
    </SectionReveal>
  );
}
