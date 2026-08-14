import { useEffect, useState, useRef } from 'react';
import SectionReveal from './SectionReveal';

interface SkillStep {
  num: string;
  title: string;
  desc: string;
}

const steps: SkillStep[] = [
  {
    num: '01',
    title: 'Étape 1 : Échange et étude de vos besoins',
    desc: "Nous échangeons sans jargon sur vos objectifs, vos utilisateurs et les fonctionnalités indispensables pour votre activité.",
  },
  {
    num: '02',
    title: 'Étape 2 : Conception visuelle et maquettes',
    desc: "Création d'un design sur-mesure adapté à votre identité visuelle, validé avec vous avant d'écrire la moindre ligne de code.",
  },
  {
    num: '03',
    title: 'Étape 3 : Développement et optimisation',
    desc: "Programmation épurée de votre site pour garantir une navigation fluide et un affichage rapide sur ordinateur et smartphone.",
  },
  {
    num: '04',
    title: 'Étape 4 : Tests et mise en ligne',
    desc: "Vérification complète du fonctionnement des formulaires, de l'affichage mobile et de la préparation au référencement sur Google.",
  },
  {
    num: '05',
    title: 'Étape 5 : Prise en main et suivi',
    desc: "Explications simples pour vous permettre de mettre à jour vos contenus en toute autonomie et possibilité d'accompagnement mensuel facultatif (maintenance, gestion Google Business dès 29 €/mois).",
  },
];

// Single Step Node component
function SkillNode({
  step,
  index,
  isUnlocked,
  onUnlock,
}: {
  step: SkillStep;
  index: number;
  isUnlocked: boolean;
  onUnlock: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onUnlock();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [onUnlock]);

  useEffect(() => {
    if (isUnlocked && !reducedMotion) {
      const wrap = containerRef.current;
      if (!wrap) return;

      const node = wrap.querySelector('.node');
      if (!node) return;

      // Spawn particle explosion from center of the node
      const particleCount = 14;
      for (let p = 0; p < particleCount; p++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const angle = (p / particleCount) * Math.PI * 2;
        const dist = 40 + Math.random() * 30;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;

        node.appendChild(particle);

        particle.animate(
          [
            { transform: 'translate(-50%,-50%) translate(0,0)', opacity: 1 },
            { transform: `translate(-50%,-50%) translate(${dx}px, ${dy}px)`, opacity: 0 }
          ],
          {
            duration: 700 + Math.random() * 300,
            easing: 'ease-out',
          }
        );

        setTimeout(() => {
          particle.remove();
        }, 1100);
      }
    }
  }, [isUnlocked, reducedMotion]);

  return (
    <div className="branch-row">
      {/* Top Connector */}
      <div className="connector">
        <div 
          className="connector-fill" 
          style={{ height: isUnlocked ? '100%' : '0%' }}
        ></div>
      </div>
      
      {/* Node Content wrapper */}
      <div 
        ref={containerRef} 
        className={`node-wrap ${isUnlocked ? 'unlocked' : ''}`}
        data-index={index}
      >
        {!reducedMotion && isUnlocked && (
          <div className="toast" role="status" aria-live="polite">ÉTAPE EFFECTUÉE</div>
        )}
        <div className="node-ring"></div>
        <div className="node">{step.num}</div>
        <div className="node-title">{step.title}</div>
        <div className="node-desc">{step.desc}</div>
        
        {/* XP Bar */}
        <div className="xp-bar" aria-hidden="true">
          <div 
            className="xp-fill" 
            style={{ width: isUnlocked ? '100%' : '0%' }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default function Process() {
  const [unlocked, setUnlocked] = useState<boolean[]>([false, false, false, false, false]);

  const handleUnlock = (index: number) => {
    setUnlocked((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  const unlockedCount = unlocked.filter(Boolean).length;
  const progressPercent = (unlockedCount / steps.length) * 100;

  return (
    <SectionReveal id="process" className="section-pad">
      <div className="wrap">
        <div className="head-row">
          <div>
            <div className="eyebrow reveal">MÉTHODE DE TRAVAIL</div>
            <h2 className="section-title reveal">Les étapes de création de votre projet web</h2>
          </div>
        </div>

        {/* Global Progress HUD */}
        <div className="hud reveal">
          <span className="hud-label">PROGRESSION</span>
          <div className="hud-bar" role="progressbar" aria-label="Progression du parcours de la méthode de travail" aria-valuenow={unlockedCount} aria-valuemin={0} aria-valuemax={steps.length}>
            <div className="hud-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <span className="hud-count">{unlockedCount}/{steps.length}</span>
        </div>

        {/* Skill Tree Nodes */}
        <div className="tree">
          {steps.map((step, idx) => (
            <SkillNode
              key={step.num}
              step={step}
              index={idx}
              isUnlocked={unlocked[idx]}
              onUnlock={() => handleUnlock(idx)}
            />
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
