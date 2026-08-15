import SectionReveal from '../components/SectionReveal';
import MagneticWrapper from '../components/MagneticWrapper';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export default function About() {
  useDocumentMetadata(
    "À Propos | Alexandre Pabst — Développeur Web Sur-Mesure | DevSupAi",
    "Découvrez le parcours d'Alex, fondateur de DevSupAi, et sa méthode de développement sans compromis pour concevoir des sites web rapides et entièrement sur-mesure.",
    "/a-propos"
  );

  return (
    <SectionReveal className="section-pad text-left" style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', paddingTop: '140px' }}>
      <div className="wrap max-w-4xl">
        <div className="eyebrow">L'Esprit DevSupAi</div>
        <h1 className="section-title mt-4 mb-10">Créer pour durer,<br />coder sans compromis.</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          {/* Main Story Column */}
          <div className="md:col-span-2 space-y-6 text-text-secondary leading-relaxed text-sm">
            <p className="text-base text-text-primary font-medium">
              Je suis Alex, développeur web freelance et fondateur de DevSupAi. Mon approche repose sur une conviction : concevoir des applications et des sites web sur-mesure ultra-performants spécialement taillés pour les <strong>PME</strong>, <strong>TPE</strong> et <strong>Associations</strong>.
            </p>
            <p>
              Trop souvent, les projets web sont ralentis par l'utilisation abusive de générateurs de pages (page builders) ou de thèmes surchargés. Ces solutions de facilité pénalisent votre vitesse de chargement, nuisent à votre référencement sur Google et limitent votre liberté graphique.
            </p>
            <p>
              Chez <strong>DevSupAi</strong>, je conçois des architectures sur-mesure basées sur les meilleures technologies modernes (React, TypeScript, GSAP, Tailwind CSS). Chaque ligne de code est écrite spécifiquement pour servir l'acquisition de vos clients ou l'engagement de vos adhérents.
            </p>
            <div className="pt-6">
              <h2 className="text-lg font-bold text-text-primary mb-3">Mes principes fondamentaux</h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">01/</span>
                  <div>
                    <strong className="text-text-primary">Performance Absolue :</strong> Des sites qui chargent en moins de 500ms, bâtis sur une architecture ultra-légère pour maximiser vos scores Google.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">02/</span>
                  <div>
                    <strong className="text-text-primary">Design Singulier :</strong> Des animations fluides et des micro-interactions physiques 3D adaptées à votre identité visuelle.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">03/</span>
                  <div>
                    <strong className="text-text-primary">Code Propre & Durable :</strong> Pas de dette technique ni de dépendances inutiles pour un site facile à faire évoluer au fil des ans.
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Sidebar / Profile Card */}
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.06)] relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-accent to-purple-600 flex items-center justify-center text-white font-bold text-xl mb-4">
                A
              </div>
              <h3 className="text-base font-bold text-text-primary mb-1">Alexandre Pabst</h3>
              <span className="text-xs label-mono text-purple-300 block">FONDATEUR & DÉVELOPPEUR</span>
              <span className="text-xs block text-text-secondary mt-1">Saint-Mihiel, Meuse (Grand Est)</span>
              
              <p className="text-xs text-text-secondary mt-4 leading-relaxed">
                Interlocuteur direct pour l'intégralité de vos projets web, de l'étude des besoins au développement final. Basé à Saint-Mihiel, j'interviens en présentiel dans le Grand Est et à distance dans toute la France.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-xs label-mono text-text-secondary uppercase tracking-wider">Discuter d'un projet</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Une question ? Une idée de site ou d'application web sur-mesure ?
              </p>
              <div className="pt-2">
                <MagneticWrapper range={20} strength={0.2}>
                  <a href="/#contact" className="btn btn-primary text-xs w-full text-center py-2.5" style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)', color: '#fff', display: 'inline-block', borderRadius: '8px' }}>
                    Commencer un projet
                  </a>
                </MagneticWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
