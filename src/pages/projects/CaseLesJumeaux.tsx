import SectionReveal from '../../components/SectionReveal';
import { Link } from 'react-router-dom';

export default function CaseLesJumeaux() {
  return (
    <SectionReveal className="section-pad text-left" style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', paddingTop: '140px' }}>
      <div className="wrap max-w-3xl">
        <Link to="/#realisations" className="text-xs label-mono text-accent hover:text-text-primary transition-colors inline-flex items-center gap-1.5 mb-8">
          <span>←</span> Retour aux réalisations
        </Link>
        
        <div className="flex items-center gap-3 text-[10px] label-mono text-purple-300 mb-4">
          <span>Étude de cas</span>
          <span>•</span>
          <span>Restauration</span>
          <span>•</span>
          <span>Vitesse 100/100</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-6 leading-tight">
          Les Jumeaux — Site immersif & Réservation sur-mesure
        </h1>

        <p className="text-base text-text-secondary leading-relaxed mb-10">
          Création d'un site vitrine haut de gamme et d'un système de réservation en temps réel pour un restaurant-brasserie traditionnel, augmentant la conversion de réservation de 40% tout en maintenant un temps d'affichage sous la barre des 600 millisecondes.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.06)] mb-10">
          <div>
            <div className="text-[10px] label-mono text-purple-300">ROLE</div>
            <div className="text-sm font-bold text-text-primary mt-1">Dev & Design</div>
          </div>
          <div>
            <div className="text-[10px] label-mono text-purple-300">TECH STACK</div>
            <div className="text-sm font-bold text-text-primary mt-1">React, GSAP</div>
          </div>
          <div>
            <div className="text-[10px] label-mono text-purple-300">PERFORMANCE</div>
            <div className="text-sm font-bold text-text-primary mt-1">Lighthouse 100%</div>
          </div>
          <div>
            <div className="text-[10px] label-mono text-purple-300">RESULTAT</div>
            <div className="text-sm font-bold text-text-primary mt-1">+40% Résas</div>
          </div>
        </div>

        <div className="prose text-text-secondary leading-relaxed space-y-6 text-sm">
          <h2 className="text-lg font-bold text-text-primary pt-4">Le Défi</h2>
          <p>
            Le restaurant *Les Jumeaux* souhaitait moderniser sa présence en ligne avec deux objectifs majeurs : valoriser l'ambiance chaleureuse du lieu à travers un univers visuel premium, et simplifier la prise de réservation pour les clients tout en libérant le personnel des appels téléphoniques pendant le service.
          </p>

          <h2 className="text-lg font-bold text-text-primary pt-4">Mon Approche</h2>
          <p>
            J'ai opté pour une approche "Zéro Template". Le site intègre de superbes transitions fluides animées par GSAP et des visuels optimisés compressés en formats modernes (WebP). 
          </p>
          <p>
            Pour la réservation, au lieu d'intégrer une solution tierce lourde qui ralentirait le site (comme les widgets iframe standards), j'ai codé un formulaire de réservation sur-mesure ultra-léger communiquant directement avec une API de gestion de table en temps réel.
          </p>

          <h2 className="text-lg font-bold text-text-primary pt-4">Les Résultats</h2>
          <p>
            En éliminant les dépendances lourdes, le site s'affiche instantanément y compris sur mobile avec des connexions 3G. La simplicité du tunnel de réservation a permis au restaurant d'enregistrer une hausse de 40% des réservations directes par internet, réduisant la charge téléphonique de l'équipe de 50%.
          </p>
        </div>
      </div>
    </SectionReveal>
  );
}
