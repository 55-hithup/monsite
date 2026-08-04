import SectionReveal from './SectionReveal';

export default function Projects() {
  const projects = [
    {
      tag: 'Restauration',
      title: 'Les Jumeaux',
      desc: 'Site vitrine immersif et système de réservation en ligne sur-mesure pour un restaurant-brasserie.',
      img: '/les-jumeaux.png',
    },
    {
      tag: 'Entreprise',
      title: 'LocaTool',
      desc: 'Logiciel de gestion de location tout-en-un pour simplifier le suivi du matériel, des clients et des devis.',
      img: '/locatool.png',
    },
    {
      tag: 'Application Streamer',
      title: 'Abogame',
      desc: 'Plateforme innovante pour les créateurs de contenu et leur communauté.',
      bg: 'linear-gradient(155deg,#0e0a1a,#05030a)',
      inProgress: true,
    },
  ];

  return (
    <SectionReveal id="realisations" className="section-pad" style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="wrap">
        <div className="head-row">
          <div>
            <div className="eyebrow reveal">Réalisations</div>
            <h2 className="section-title reveal">Des projets pensés<br />pour marquer.</h2>
          </div>
          <p className="section-sub reveal">Une sélection de collaborations récentes, tous secteurs confondus.</p>
        </div>
        
        <div className="portfolio-grid">
          {projects.map((project, idx) => (
            <div key={idx} className="proj-card reveal">
              <div 
                className="proj-bg" 
                style={{ 
                  background: project.img ? `url(${project.img}) center top / cover no-repeat` : project.bg 
                }}
              ></div>
              <div className="proj-shade"></div>
              
              {project.inProgress && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-radial from-[#6B4FE0]/15 to-transparent z-10 select-none">
                  <div className="w-12 h-12 rounded-full border border-dashed border-[#6B4FE0]/40 flex items-center justify-center animate-spin" style={{ animationDuration: '6s' }}>
                    <span className="text-[#6B4FE0] text-xs font-bold">&lt;/&gt;</span>
                  </div>
                  <div className="text-[10px] label-mono text-[#6B4FE0] mt-3 uppercase tracking-widest animate-pulse">En cours</div>
                </div>
              )}

              <div className="proj-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </div>
              <div className="proj-content">
                <div className="proj-tag">{project.tag}</div>
                <div className="proj-title">{project.title}</div>
                <div className="proj-desc">{project.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
