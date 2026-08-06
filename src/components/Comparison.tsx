import { useState, useRef, useEffect } from 'react';
import SectionReveal from './SectionReveal';

export default function Comparison() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseDown = () => {
    isDraggingRef.current = true;
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <SectionReveal className="section-pad" style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="wrap">
        <div className="head-row mb-12">
          <div>
            <div className="eyebrow reveal">Pourquoi investir</div>
            <h2 className="section-title reveal">L'écart se voit<br />immédiatement.</h2>
          </div>
        </div>

        {/* Comparison Lists */}
        <div className="compare-wrap reveal">
          <div className="compare-col before">
            <span className="compare-label">Avant (Template standard)</span>
            <ul className="compare-list">
              <li>
                <svg className="compare-icon" viewBox="0 0 24 24" fill="none" stroke="#767676" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                Un site générique qui ne reflète pas votre valeur
              </li>
              <li>
                <svg className="compare-icon" viewBox="0 0 24 24" fill="none" stroke="#767676" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                Des visiteurs qui repartent sans agir (taux de rebond élevé)
              </li>
              <li>
                <svg className="compare-icon" viewBox="0 0 24 24" fill="none" stroke="#767676" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                Un design daté, lourd et lent sur mobile (8.7s de chargement)
              </li>
              <li>
                <svg className="compare-icon" viewBox="0 0 24 24" fill="none" stroke="#767676" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                Une image amateur qui freine la confiance des clients
              </li>
            </ul>
          </div>

          <div className="compare-col after">
            <span className="compare-label text-[#2E8FE0]">Après (Sur-mesure DevSupAi)</span>
            <ul className="compare-list">
              <li>
                <svg className="compare-icon" viewBox="0 0 24 24" fill="none" stroke="#2E8FE0" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Une identité forte, sur-mesure et haut de gamme
              </li>
              <li>
                <svg className="compare-icon" viewBox="0 0 24 24" fill="none" stroke="#2E8FE0" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Un parcours optimisé pensé pour maximiser les conversions
              </li>
              <li>
                <svg className="compare-icon" viewBox="0 0 24 24" fill="none" stroke="#2E8FE0" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Une expérience instantanée et fluide (0.3s de chargement, 100/100 Lighthouse)
              </li>
              <li>
                <svg className="compare-icon" viewBox="0 0 24 24" fill="none" stroke="#2E8FE0" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Une crédibilité immédiate, à la hauteur de vos ambitions
              </li>
            </ul>
          </div>
        </div>

        {/* Interactive Before/After Image Slider */}
        <div className="reveal mt-16 max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-[10px] label-mono text-text-secondary tracking-widest uppercase">
              ↔ Glissez le curseur pour comparer les performances réelles
            </span>
          </div>

          <div 
            ref={containerRef}
            className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[rgba(245,246,250,0.06)] select-none cursor-ew-resize cursor-target"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            {/* Before Image (underneath) */}
            <img 
              src="/compare_before.webp" 
              alt="Site internet lent et surchargé avant optimisation" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />

            {/* After Image (overlay, clipped) */}
            <img 
              src="/compare_after.webp" 
              alt="Site sur-mesure et performant après optimisation" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            />

            {/* Labels */}
            <div className="absolute bottom-4 left-4 bg-red-950/80 border border-red-500/20 px-3 py-1 rounded-md text-[10px] label-mono text-red-400 font-bold pointer-events-none">
              Avant (Template lent : 34%)
            </div>
            <div className="absolute bottom-4 right-4 bg-cyan-950/80 border border-cyan-500/20 px-3 py-1 rounded-md text-[10px] label-mono text-cyan-400 font-bold pointer-events-none">
              Après (Sur-mesure : 100%)
            </div>

            {/* Divider Line */}
            <div 
              className="absolute inset-y-0 w-0.5 bg-gradient-to-b from-[#2E8FE0] to-[#6B4FE0] pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Center Handle Button */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900 border border-[rgba(245,246,250,0.15)] flex items-center justify-center shadow-[0_0_20px_rgba(46,143,224,0.3)] pointer-events-none">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
