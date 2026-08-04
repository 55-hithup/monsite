import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionReveal from './SectionReveal';

export default function Stats() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const counts = statsRef.current?.querySelectorAll('.count');
    if (!counts) return;

    const ctx = gsap.context(() => {
      counts.forEach((c) => {
        const target = parseInt(c.getAttribute('data-target') || '0', 10);
        
        ScrollTrigger.create({
          trigger: c,
          start: 'top 92%',
          onEnter: () => {
            gsap.to(c, {
              innerText: target,
              duration: 1.5,
              snap: { innerText: 1 },
              ease: 'power1.out',
            });
          },
        });
      });
    }, statsRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionReveal className="stats-section">
      <div className="wrap" ref={statsRef}>
        <div className="stats-grid">
          <div className="stat-item reveal">
            <div className="stat-num">
              <span className="count" data-target="250">0</span>
              <span className="suffix">+</span>
            </div>
            <div className="stat-lbl">Projets livrés</div>
          </div>
          <div className="stat-item reveal">
            <div className="stat-num">
              <span className="count" data-target="98">0</span>
              <span className="suffix">%</span>
            </div>
            <div className="stat-lbl">Clients satisfaits</div>
          </div>
          <div className="stat-item reveal">
            <div className="stat-num">
              <span className="count" data-target="8">0</span>
              <span className="suffix"> ans</span>
            </div>
            <div className="stat-lbl">D'expérience</div>
          </div>
          <div className="stat-item reveal">
            <div className="stat-num">
              <span className="count" data-target="24">0</span>
              <span className="suffix">h</span>
            </div>
            <div className="stat-lbl">Temps de réponse</div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
