import { Link } from 'react-router-dom';
import SectionReveal from '../../components/SectionReveal';
import { useDocumentMetadata } from '../../hooks/useDocumentMetadata';

export default function CaseLocaTool() {
  useDocumentMetadata(
    "Étude de cas : LocaTool | Application Web SaaS Sur-Mesure | DevSupAi",
    "Découvrez comment l'application web métier LocaTool a été conçue pour centraliser et simplifier la gestion de location de matériel professionnel.",
    "/projets/locatool"
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
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.devsupai.fr/projets/locatool"
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

        <div className="flex items-center gap-3 text-xs label-mono text-purple-300 mb-4">
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

        <p className="text-base text-text-secondary leading-relaxed mb-6">
          Développement d'une application web métier (SaaS) complète pour centraliser la réservation, le suivi de stock et la facturation de matériel pour les professionnels du BTP.
        </p>

        {/* Live Demo CTA */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <a
            href="https://locatool.devsupai.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target label-mono text-xs font-bold px-5 py-2.5 rounded-full text-white bg-accent hover:bg-accent-hover transition-all duration-150 inline-flex items-center gap-2 shadow-lg shadow-accent/20 hover:scale-105"
          >
            <span>Visiter la démo LocaTool</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
          <span className="text-xs label-mono text-text-secondary">
            • Application en direct
          </span>
        </div>

        {/* Project Facts Box */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.06)] mb-10">
          <div>
            <div className="text-xs label-mono text-purple-300">TYPE</div>
            <div className="text-sm font-bold text-text-primary mt-1">Logiciel SaaS</div>
          </div>
          <div>
            <div className="text-xs label-mono text-purple-300">USAGE</div>
            <div className="text-sm font-bold text-text-primary mt-1">Gestion de parc</div>
          </div>
          <div>
            <div className="text-xs label-mono text-purple-300">ACCÈS</div>
            <div className="text-sm font-bold text-text-primary mt-1">Tableau de bord</div>
          </div>
          <div>
            <div className="text-xs label-mono text-purple-300">RÉSULTAT</div>
            <div className="text-sm font-bold text-text-primary mt-1">Gestion centralisée</div>
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
              <strong>Bilan :</strong> La centralisation de l'activité sur un outil unique permet de simplifier le traitement des dossiers, de fluidifier le suivi du matériel et d'éviter les erreurs de disponibilité.
            </div>
            <p>
              L'interface réactive s'utilise facilement sur ordinateur comme sur tablette sur le terrain.
            </p>
          </div>
        </div>

        {/* Live Demo Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#2E8FE0]/15 via-[#6B4FE0]/15 to-[#121729] border border-[rgba(245,246,250,0.12)] mt-10 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs label-mono font-bold text-accent mb-1 tracking-wider uppercase">DÉMO INTERACTIVE</div>
            <div className="text-sm font-bold text-text-primary">Tester l'application LocaTool en direct</div>
            <div className="text-xs text-text-secondary mt-0.5">Explorez l'interface et ses fonctionnalités en temps réel.</div>
          </div>
          <a
            href="https://locatool.devsupai.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target label-mono text-xs font-bold px-5 py-2.5 rounded-full text-white bg-accent hover:bg-accent-hover transition-all duration-150 inline-flex items-center justify-center gap-2 shadow-lg shadow-accent/25 shrink-0 hover:scale-105"
          >
            <span>Accéder à LocaTool</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

        {/* Back Link */}
        <div className="mt-8 pt-6 border-t border-[rgba(245,246,250,0.06)]">
          <Link to="/#realisations" className="btn btn-ghost text-xs inline-flex items-center gap-2 border border-[rgba(245,246,250,0.12)]">
            ← Voir toutes les réalisations
          </Link>
        </div>
      </div>
    </SectionReveal>
  );
}
