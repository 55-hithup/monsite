import SectionReveal from '../../components/SectionReveal';
import { Link } from 'react-router-dom';
import { useDocumentMetadata } from '../../hooks/useDocumentMetadata';

export default function CaseLocaTool() {
  useDocumentMetadata(
    "Étude de cas : LocaTool | Portfolio DevSupAi",
    "Découvrez comment j'ai conçu LocaTool, une application web SaaS de gestion de stocks et de réservations de matériel en temps réel."
  );

  return (
    <SectionReveal className="section-pad text-left" style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', paddingTop: '140px' }}>
      <div className="wrap max-w-3xl">
        <Link to="/#realisations" className="text-xs label-mono text-accent hover:text-text-primary transition-colors inline-flex items-center gap-1.5 mb-8">
          <span>←</span> Retour aux réalisations
        </Link>
        
        <div className="flex items-center gap-3 text-[10px] label-mono text-purple-300 mb-4">
          <span>Étude de cas</span>
          <span>•</span>
          <span>Entreprise</span>
          <span>•</span>
          <span>SaaS / Métier</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-6 leading-tight">
          LocaTool — Logiciel SaaS de location de matériel
        </h1>

        <p className="text-base text-text-secondary leading-relaxed mb-10">
          Développement d'une application web métier (SaaS) complète pour optimiser la gestion de location de matériel pour les professionnels du BTP, améliorant la productivité administrative des équipes de 30% grâce à une interface ergonomique et réactive.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.06)] mb-10">
          <div>
            <div className="text-[10px] label-mono text-purple-300">ROLE</div>
            <div className="text-sm font-bold text-text-primary mt-1">Full-stack Dev</div>
          </div>
          <div>
            <div className="text-[10px] label-mono text-purple-300">TECH STACK</div>
            <div className="text-sm font-bold text-text-primary mt-1">React, Node, DB</div>
          </div>
          <div>
            <div className="text-[10px] label-mono text-purple-300">INTERFACE</div>
            <div className="text-sm font-bold text-text-primary mt-1">Dashboard SPA</div>
          </div>
          <div>
            <div className="text-[10px] label-mono text-purple-300">PRODUCTIVITÉ</div>
            <div className="text-sm font-bold text-text-primary mt-1">+30% Efficacité</div>
          </div>
        </div>

        <div className="prose text-text-secondary leading-relaxed space-y-6 text-sm">
          <h2 className="text-lg font-bold text-text-primary pt-4">Le Défi</h2>
          <p>
            Les professionnels de la location de matériel perdent souvent un temps précieux à cause d'outils administratifs éparpillés (tableurs Excel, devis papier, calendriers papier). *LocaTool* a été conçu pour regrouper en une seule interface réactive le suivi du stock en temps réel, l'historique des clients, la planification des locations et la facturation.
          </p>

          <h2 className="text-lg font-bold text-text-primary pt-4">Mon Approche</h2>
          <p>
            J'ai conçu une application web monopage (SPA) extrêmement réactive. L'accent a été mis sur l'ergonomie : recherche instantanée parmi des milliers d'équipements, tableau de bord visuel de type calendrier interactif (Drag & Drop), et génération automatisée des contrats de location en PDF en un clic.
          </p>
          <p>
            Afin de garantir un fonctionnement sans coupure sur le terrain, le logiciel intègre un système de cache local permettant aux techniciens de consulter l'état des machines même dans des zones de chantiers mal couvertes par le réseau 4G.
          </p>

          <h2 className="text-lg font-bold text-text-primary pt-4">Les Résultats</h2>
          <p>
            En centralisant l'intégralité du flux d'activité dans une interface ergonomique et performante, *LocaTool* a permis aux entreprises utilisatrices de réduire de 30% le temps de traitement administratif des dossiers. Les erreurs de sur-réservation de matériel ont quant à elles été totalement éliminées.
          </p>
        </div>
      </div>
    </SectionReveal>
  );
}
