import { Link } from 'react-router-dom';
import SectionReveal from '../../components/SectionReveal';
import { useDocumentMetadata } from '../../hooks/useDocumentMetadata';

export default function CaseAbogame() {
  useDocumentMetadata(
    "Étude de cas : Abogame | Plateforme Web Interactive Live | DevSupAi",
    "Découvrez comment la plateforme interactive mobile-first Abogame a permis de dynamiser les animations en direct et d'augmenter l'engagement de 50%."
  );

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Abogame — Plateforme interactive de tirage au sort live",
    "description": "Création d'une application web mobile-first de planification et de tirage au sort en direct pour créateurs de contenu.",
    "author": {
      "@type": "Person",
      "name": "Alexandre Pabst",
    },
    "publisher": {
      "@type": "Organization",
      "name": "DevSupAi",
      "url": "https://www.devsupai.fr",
    },
    "mainEntityOfPage": "https://www.devsupai.fr/projets/abogame",
  };

  return (
    <SectionReveal className="section-pad text-left" style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', paddingTop: '140px' }}>
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>

      <div className="wrap max-w-3xl">
        <Link to="/realisations" className="text-xs label-mono text-accent hover:text-text-primary transition-colors inline-flex items-center gap-1.5 mb-8">
          <span>←</span> Retour aux réalisations
        </Link>

        <div className="flex items-center gap-3 text-[10px] label-mono text-purple-300 mb-4">
          <span>Étude de cas</span>
          <span>•</span>
          <span>Streaming & Communauté</span>
          <span>•</span>
          <span>Application Mobile-First</span>
        </div>

        {/* Single H1 Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-6 leading-tight">
          Abogame — Plateforme interactive de tirage au sort live
        </h1>

        <p className="text-base text-text-secondary leading-relaxed mb-10">
          Création d'une application web mobile-first facilitant l'interaction en direct entre les créateurs de contenu et leur communauté lors des diffusions live.
        </p>

        {/* Project Facts Box */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.06)] mb-10">
          <div>
            <div className="text-[10px] label-mono text-purple-300">USAGE</div>
            <div className="text-sm font-bold text-text-primary mt-1">Animation Live</div>
          </div>
          <div>
            <div className="text-[10px] label-mono text-purple-300">CONCEPTION</div>
            <div className="text-sm font-bold text-text-primary mt-1">Mobile-First</div>
          </div>
          <div>
            <div className="text-[10px] label-mono text-purple-300">AFFICHAGE</div>
            <div className="text-sm font-bold text-text-primary mt-1">Temps réel</div>
          </div>
          <div>
            <div className="text-[10px] label-mono text-purple-300">RÉSULTAT</div>
            <div className="text-sm font-bold text-text-primary mt-1">+50% Engagement</div>
          </div>
        </div>

        {/* Main QFO Content Sections */}
        <div className="prose text-text-secondary leading-relaxed space-y-8 text-sm">
          <div>
            <h2 className="text-lg font-bold text-text-primary mb-3">
              1. Pourquoi créer un outil d'animation spécifique pour le streaming ?
            </h2>
            <p>
              Pendant des diffusions en direct, les créateurs de contenu ont besoin d'outils simples et transparents pour faire participer les spectateurs. Les solutions classiques manquent souvent de réactivité ou s'affichent mal sur l'écran d'un smartphone.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-text-primary mb-3">
              2. Comment l'application mobile-first a-t-elle été conçue ?
            </h2>
            <p>
              L'application <em>Abogame</em> a été pensée en priorité pour une utilisation fluide sur mobile. Elle intègre une roue de tirage interactive visuelle et un gestionnaire de planning en direct qui se synchronisent immédiatement pour l'ensemble des participants.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-text-primary mb-3">
              3. Quels sont les résultats d'engagement observés pendant les directs ?
            </h2>
            <div className="p-4 rounded-xl bg-[#2E8FE0]/10 border border-[#2E8FE0]/20 text-text-primary text-xs font-medium mb-3">
              <strong>Bilan :</strong> L'aspect visuel et la réactivité de la roue interactive ont permis de faire progresser le taux d'engagement des spectateurs de plus de 50% par rapport aux tirages textuels ordinaires.
            </div>
            <p>
              La plateforme se charge immédiatement et garantit un confort d'utilisation optimal pour le streamer comme pour ses spectateurs.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12 pt-6 border-t border-[rgba(245,246,250,0.06)]">
          <Link to="/realisations" className="btn btn-ghost text-xs inline-flex items-center gap-2 border border-[rgba(245,246,250,0.12)]">
            ← Voir toutes les réalisations
          </Link>
        </div>
      </div>
    </SectionReveal>
  );
}
