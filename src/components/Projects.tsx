import { Link } from 'react-router-dom';
import SectionReveal from './SectionReveal';

interface ProjectItem {
  tag: string;
  title: string;
  desc: string;
  img?: string;
  bg?: string;
  href?: string;
  externalHref?: string;
  inProgress?: boolean;
}

export default function Projects() {
  const projects: ProjectItem[] = [
    {
      tag: 'Restauration',
      title: 'Les Jumeaux',
      desc: 'Site vitrine immersif et système de réservation en ligne sur-mesure pour un restaurant-brasserie.',
      img: '/les-jumeaux.webp',
      href: '/projets/les-jumeaux',
    },
    {
      tag: 'Entreprise',
      title: 'LocaTool',
      desc: 'Logiciel de gestion de location tout-en-un pour simplifier le suivi du matériel, des clients et des devis.',
      img: '/locatool.webp',
      href: '/projets/locatool',
      externalHref: 'https://locatool.devsupai.fr',
    },
    {
      tag: 'Application Streamer',
      title: 'Abogame',
      desc: 'Plateforme interactive mobile-first pour streamers : roue de sélection en temps réel et planification de live.',
      img: '/abogame.webp',
      href: '/projets/abogame',
      externalHref: 'https://abogame.devsupai.fr',
    },
  ];

  return (
    <SectionReveal id="realisations" className="section-pad" style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', position: 'relative' }}>
      <div className="wrap">
        <div className="head-row">
          <div>
            <div className="eyebrow reveal">Réalisations</div>
            <h2 className="section-title reveal">Des projets pensés<br />pour marquer.</h2>
          </div>
          <p className="section-sub reveal">Une sélection de collaborations récentes, tous secteurs confondus.</p>
        </div>
        
        <div className="portfolio-grid">
          {projects.map((project, idx) => {
            const cardContent = (
              <>
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
              </>
            );

            return project.href ? (
              <Link 
                key={idx} 
                to={project.href} 
                onClick={() => window.history.replaceState(null, '', '/#realisations')}
                className="cursor-target proj-card reveal"
              >
                {cardContent}
                {project.externalHref && (
                  <a
                    href={project.externalHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] label-mono font-bold text-white transition-all duration-200 hover:scale-105"
                    style={{ background: 'rgba(46,143,224,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Voir le site
                  </a>
                )}
              </Link>
            ) : (
              <div key={idx} className="cursor-target proj-card reveal">
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
}
