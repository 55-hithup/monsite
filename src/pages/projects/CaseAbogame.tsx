import SectionReveal from '../../components/SectionReveal';
import { Link } from 'react-router-dom';

export default function CaseAbogame() {
  return (
    <SectionReveal className="section-pad text-left" style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', paddingTop: '140px' }}>
      <div className="wrap max-w-3xl">
        <Link to="/#realisations" className="text-xs label-mono text-accent hover:text-text-primary transition-colors inline-flex items-center gap-1.5 mb-8">
          <span>←</span> Retour aux réalisations
        </Link>
        
        <div className="flex items-center gap-3 text-[10px] label-mono text-purple-300 mb-4">
          <span>Étude de cas</span>
          <span>•</span>
          <span>Application Streamer</span>
          <span>•</span>
          <span>Vitesse 100/100</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-6 leading-tight">
          Abogame — Plateforme interactive mobile-first de tirage au sort & de planification live
        </h1>

        <p className="text-base text-text-secondary leading-relaxed mb-10">
          Création d'une application web dynamique et mobile-first conçue spécifiquement pour les créateurs de contenu sur Twitch et YouTube, facilitant l'interaction avec leur communauté sur smartphone grâce à une roue de tirage interactive et un gestionnaire de planning en direct.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.06)] mb-10">
          <div>
            <div className="text-[10px] label-mono text-purple-300">ROLE</div>
            <div className="text-sm font-bold text-text-primary mt-1">Dev & Design</div>
          </div>
          <div>
            <div className="text-[10px] label-mono text-purple-300">TECH STACK</div>
            <div className="text-sm font-bold text-text-primary mt-1">React, GSAP, WebSockets</div>
          </div>
          <div>
            <div className="text-[10px] label-mono text-purple-300">PERFORMANCE</div>
            <div className="text-sm font-bold text-text-primary mt-1">Lighthouse 100%</div>
          </div>
          <div>
            <div className="text-[10px] label-mono text-purple-300">RESULTAT</div>
            <div className="text-sm font-bold text-text-primary mt-1">Engagement +50%</div>
          </div>
        </div>

        <div className="prose text-text-secondary leading-relaxed space-y-6 text-sm">
          <h2 className="text-lg font-bold text-text-primary pt-4">Le Défi</h2>
          <p>
            Les streamers ont souvent des difficultés à animer leurs sessions de jeu avec leurs abonnés ou à réaliser des giveaways de manière simple, transparente et instantanée. Les outils existants de tirage au sort manquent souvent d'intégration visuelle ou alourdissent le flux vidéo du direct. L'objectif était de concevoir une application web ultra-légère permettant aux streamers de gérer leur planning de live et de lancer des roues de tirage au sort interactives en direct.
          </p>

          <h2 className="text-lg font-bold text-text-primary pt-4">Mon Approche</h2>
          <p>
            J'ai conçu une plateforme entièrement pensée "mobile-first". Les spectateurs regardant généralement le direct sur leur ordinateur ou leur télévision, ils utilisent majoritairement leur smartphone pour participer aux tirages, faire tourner la roue en temps réel et consulter le planning de diffusion.
          </p>
          <p>
            J'ai donc développé une interface réactive et ergonomique, utilisant React et GSAP pour les animations physiques fluides de la roue de sélection. Pour assurer l'affichage en temps réel du nombre de participants sans aucun décalage de connexion, la synchronisation est propulsée par un canal WebSockets ultra-léger. La mise en page a été construite dans un style sombre aux accents néons violets et roses, parfaitement adapté aux codes graphiques des communautés de gamers et de streamers.
          </p>

          <h2 className="text-lg font-bold text-text-primary pt-4">Les Résultats</h2>
          <p>
            Une plateforme épurée et performante qui charge en 0.4s. La fluidité et l'aspect ludique de la roue de sélection interactive ont permis d'augmenter le taux d'engagement des spectateurs en direct de plus de 50% par rapport aux tirages textuels classiques, offrant une expérience enrichie pour la communauté sur mobile et un outil puissant pour le créateur de contenu.
          </p>
        </div>
      </div>
    </SectionReveal>
  );
}
