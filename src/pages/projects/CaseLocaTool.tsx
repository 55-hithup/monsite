import { Link } from 'react-router-dom';
import SectionReveal from '../../components/SectionReveal';
import { useDocumentMetadata } from '../../hooks/useDocumentMetadata';

export default function CaseLocaTool() {
  useDocumentMetadata(
    "Étude de cas : LocaTool | Application Web SaaS Sur-Mesure | DevSupAi",
    "Découvrez comment l'application web métier LocaTool a été conçue pour optimiser la gestion de location de matériel et gagner 30% d'efficacité administrative."
  );

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "LocaTool — Application SaaS de gestion de parc matériel",
    "description": "Développement d'une application web métier sur-mesure pour la gestion de location de matériel professionnel.",
    "author": {
      "@type": "Person",
      "name": "Alexandre Pabst",
    },
    "publisher": {
      "@type": "Organization",
      "name": "DevSupAi",
      "url": "https://www.devsupai.fr",
    },
    "mainEntityOfPage": "https://www.devsupai.fr/projets/locatool",
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
          <span>BTP & Entreprise</span>
          <span>•</span>
          <span>Application SaaS</span>
        </div>

        {/* Single H1 Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-6 leading-tight">
          LocaTool — Application SaaS de gestion de parc matériel
        </h1>

        <p className="text-base text-text-secondary leading-relaxed mb-10">
          Développement d'une application web métier (SaaS) complète pour centraliser la réservation, le suivi de stock et la facturation de matériel pour les professionnels du BTP.
        </p>

        {/* Project Facts Box */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.06)] mb-10">
          <div>
            <div className="text-[10px] label-mono text-purple-300">TYPE</div>
            <div className="text-sm font-bold text-text-primary mt-1">Logiciel SaaS</div>
          </div>
          <div>
            <div className="text-[10px] label-mono text-purple-300">USAGE</div>
            <div className="text-sm font-bold text-text-primary mt-1">Gestion de parc</div>
          </div>
          <div>
            <div className="text-[10px] label-mono text-purple-300">ACCÈS</div>
            <div className="text-sm font-bold text-text-primary mt-1">Tableau de bord</div>
          </div>
          <div>
            <div className="text-[10px] label-mono text-purple-300">RÉSULTAT</div>
            <div className="text-sm font-bold text-text-primary mt-1">+30% Efficacité</div>
          </div>
        </div>

        {/* Main QFO Content Sections */}
        <div className="prose text-text-secondary leading-relaxed space-y-8 text-sm">
          <div>
            <h2 className="text-lg font-bold text-text-primary mb-3">
              1. Quel était le défi administratif rencontré dans la gestion de location ?
            </h2>
            <p>
              Les entreprises de location de matériel perdent souvent un temps précieux à cause d'outils administratifs éparpillés (fichiers tableurs, plannings papier, saisies manuelles répétitives). L'objectif était de regrouper l'intégralité du suivi du parc dans une seule interface claire et sécurisée.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-text-primary mb-3">
              2. Comment l'application SaaS a-t-elle été conçue sur-mesure ?
            </h2>
            <p>
              L'application <em>LocaTool</em> intègre un tableau de bord visuel interactif permettant de rechercher un équipement, de vérifier sa disponibilité en temps réel, de planifier les dates de location et d'éditer automatiquement les contrats en quelques clics.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-text-primary mb-3">
              3. Quels sont les gains réels d'efficacité constatés ?
            </h2>
            <div className="p-4 rounded-xl bg-[#2E8FE0]/10 border border-[#2E8FE0]/20 text-text-primary text-xs font-medium mb-3">
              <strong>Bilan :</strong> La centralisation de l'activité sur un outil unique a permis de réduire de 30% le temps de traitement administratif des dossiers et de supprimer totalement les erreurs de sur-réservation de matériel.
            </div>
            <p>
              L'interface réactive s'utilise facilement sur ordinateur comme sur tablette sur le terrain.
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
