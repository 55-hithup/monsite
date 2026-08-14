import { Link } from 'react-router-dom';
import SectionReveal from '../../components/SectionReveal';
import { useDocumentMetadata } from '../../hooks/useDocumentMetadata';

export default function CaseLesJumeaux() {
  useDocumentMetadata(
    "Étude de cas : Les Jumeaux | Site Vitrine & Réservation Sur-Mesure | DevSupAi",
    "Découvrez l'étude de cas du restaurant Les Jumeaux : création d'un site vitrine sur-mesure et d'un système de réservation directe sans widget tiers.",
    "/projets/les-jumeaux"
  );

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Les Jumeaux — Site vitrine & Système de réservation sur-mesure",
    "description": "Création d'un site vitrine et d'un formulaire de réservation sur-mesure pour le restaurant Les Jumeaux.",
    "author": {
      "@type": "Person",
      "name": "Alexandre Pabst",
    },
    "publisher": {
      "@type": "Organization",
      "name": "DevSupAi",
      "url": "https://www.devsupai.fr",
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.devsupai.fr/projets/les-jumeaux"
    },
  };

  return (
    <SectionReveal className="section-pad text-left" style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', paddingTop: '140px' }}>
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>

      <div className="wrap max-w-3xl">
        <Link to="/#realisations" className="text-xs label-mono text-accent hover:text-text-primary transition-colors inline-flex items-center gap-1.5 mb-8">
          <span>←</span> Retour aux réalisations
        </Link>

        <div className="flex items-center gap-3 text-[10px] label-mono text-purple-300 mb-4">
          <span>Étude de cas</span>
          <span>•</span>
          <span>Restauration</span>
          <span>•</span>
          <span>Site Sur-Mesure</span>
        </div>

        {/* Single H1 Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-6 leading-tight">
          Les Jumeaux — Site vitrine & Système de réservation sur-mesure
        </h1>

        <p className="text-base text-text-secondary leading-relaxed mb-10">
          Création d'un site internet et d'un module de réservation en ligne sur-mesure pour un restaurant-brasserie traditionnel, facilitant la prise de réservation directe par les clients sans dépendre de widgets externes ralentissant la page.
        </p>

        {/* Project Facts Box */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.06)] mb-10">
          <div>
            <div className="text-[10px] label-mono text-purple-300">SECTEUR</div>
            <div className="text-sm font-bold text-text-primary mt-1">Restauration</div>
          </div>
          <div>
            <div className="text-[10px] label-mono text-purple-300">LIVRABLES</div>
            <div className="text-sm font-bold text-text-primary mt-1">Site & Réservation</div>
          </div>
          <div>
            <div className="text-[10px] label-mono text-purple-300">AFFICHAGE</div>
            <div className="text-sm font-bold text-text-primary mt-1">Instantané mobile</div>
          </div>
          <div>
            <div className="text-[10px] label-mono text-purple-300">RÉSULTAT</div>
            <div className="text-sm font-bold text-text-primary mt-1">+40% Résas directes</div>
          </div>
        </div>

        {/* Main QFO Content Sections */}
        <div className="prose text-text-secondary leading-relaxed space-y-8 text-sm">
          <div>
            <h2 className="text-lg font-bold text-text-primary mb-3">
              1. Quel était le besoin initial du restaurant Les Jumeaux ?
            </h2>
            <p>
              Le restaurant <em>Les Jumeaux</em> souhaitait moderniser sa présence sur internet avec deux objectifs clairs : mettre en valeur la carte et l'ambiance de l'établissement, tout en proposant aux clients un moyen simple d'effectuer une réservation en ligne à toute heure.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-text-primary mb-3">
              2. Quelle solution technique a été mise en place pour la réservation ?
            </h2>
            <p>
              Au lieu d'utiliser des modules tiers intégrés par fenêtres externes (iframes) qui alourdissent l'affichage du site sur smartphone, un formulaire de réservation sur-mesure ultra-léger a été conçu. L'interface s'adapte à tous les écrans et permet de renseigner la date, l'heure et le nombre de convives en quelques secondes.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-text-primary mb-3">
              3. Quels sont les résultats concrets mesurés après la mise en ligne ?
            </h2>
            <div className="p-4 rounded-xl bg-[#2E8FE0]/10 border border-[#2E8FE0]/20 text-text-primary text-xs font-medium mb-3">
              <strong>Bilan :</strong> La simplicité de réservation en ligne a permis au restaurant d'enregistrer une augmentation de 40% des réservations directes via son site, tout en réduisant de 50% la charge d'appels téléphoniques pendant les services.
            </div>
            <p>
              Grâce à un code épuré, le site se charge immédiatement, même sur un téléphone connecté en réseau mobile.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12 pt-6 border-t border-[rgba(245,246,250,0.06)]">
          <Link to="/#realisations" className="btn btn-ghost text-xs inline-flex items-center gap-2 border border-[rgba(245,246,250,0.12)]">
            ← Voir toutes les réalisations
          </Link>
        </div>
      </div>
    </SectionReveal>
  );
}
