import { Link } from 'react-router-dom';
import SectionReveal from './SectionReveal';
import MagneticWrapper from './MagneticWrapper';
import { ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

interface ProjectDisplayItem {
  tag: string;
  title: string;
  desc: string;
  img: string;
  href: string;
  externalHref?: string;
  externalTitle?: string;
}

export default function Projects() {
  const { language } = useLanguage();
  const t = translations[language].projects;

  const projects: ProjectDisplayItem[] = [
    {
      ...t.items[0],
      img: '/locatool.webp',
    },
    {
      ...t.items[1],
      img: '/abogame.webp',
    },
    {
      ...t.items[2],
      img: '/atelier-gourmand.webp',
    },
  ];

  return (
    <SectionReveal id="projets" className="py-16 sm:py-20 md:py-28 lg:py-36" style={{ position: 'relative' }}>
      {/* Anchor alias for #realisations */}
      <div id="realisations" className="absolute -top-24 pointer-events-none" />

      <div className="wrap-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text & Benefits */}
          <div className="lg:col-span-5 text-left space-y-4 sm:space-y-5 reveal">
            <div className="eyebrow">{t.eyebrow}</div>
            
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight">
              {t.title}
            </h2>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
              {t.desc}
            </p>

            <div className="space-y-2.5 sm:space-y-3 pt-2 border-y border-[rgba(245,246,250,0.08)] py-4">
              {t.checkpoints.map((cp, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-text-secondary leading-relaxed">
                    <strong className="text-text-primary font-semibold">{cp.title} </strong>
                    {cp.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <MagneticWrapper range={25} strength={0.2}>
                <a
                  href="#contact"
                  className="btn btn-primary w-full sm:w-auto justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)',
                    color: '#0B122C',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 700,
                  }}
                >
                  <span>{t.cta}</span>
                  <ArrowRight size={14} className="text-[#0B122C]" />
                </a>
              </MagneticWrapper>
            </div>
          </div>

          {/* Right Column: 3 Project Cards */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 sm:gap-4">
            {projects.map((project, idx) => {
              return (
                <div
                  key={idx}
                  className="cursor-target proj-card reveal group relative rounded-2xl overflow-hidden border border-[rgba(245,246,250,0.08)] hover:border-[#2E8FE0]/50 transition-all duration-300 shadow-lg flex items-center min-h-[140px] sm:min-h-[155px] md:h-[165px] w-full"
                >
                  {/* Background Image with Zoom */}
                  <div
                    className="proj-bg absolute inset-0 transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                    style={{
                      background: `url(${project.img}) center top / cover no-repeat`,
                    }}
                  />

                  {/* Dark horizontal gradient shade for high contrast */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to right, rgba(7, 9, 19, 0.95) 0%, rgba(7, 9, 19, 0.78) 55%, rgba(7, 9, 19, 0.35) 100%)',
                    }}
                  />

                  {/* Main Link to Case Study - Full clickable card */}
                  <Link
                    to={project.href}
                    className="absolute inset-0 z-10 focus:outline-none"
                    aria-label={`${project.title}`}
                  >
                    <span className="sr-only">{project.title}</span>
                  </Link>

                  {/* Card Content (Left aligned) */}
                  <div className="relative z-20 pointer-events-none p-4 sm:p-5 md:p-6 text-left max-w-[78%] sm:max-w-[72%]">
                    <div className="text-xs label-mono font-bold text-cyan-300 uppercase tracking-wider mb-0.5 sm:mb-1">
                      {project.tag}
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl font-black text-text-primary mb-0.5 sm:mb-1 tracking-tight group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </div>
                    <div className="text-xs text-text-secondary leading-snug font-light line-clamp-2">
                      {project.desc}
                    </div>
                  </div>

                  {/* Action Buttons & Arrow on the Right */}
                  <div className="absolute right-3.5 sm:right-5 top-1/2 -translate-y-1/2 z-20 flex items-center gap-2 sm:gap-3 pointer-events-none">
                    {project.externalHref && (
                      <a
                        href={project.externalHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title}`}
                        className="pointer-events-auto p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-[#2E8FE0] text-white hover:text-[#0B122C] border border-white/20 transition-all duration-200 hidden sm:flex items-center justify-center cursor-pointer relative z-30"
                        onClick={(e) => e.stopPropagation()}
                        title={project.externalTitle || 'Visit live site'}
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}

                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#2E8FE0] group-hover:text-[#0B122C] group-hover:rotate-45 pointer-events-none">
                      <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </SectionReveal>
  );
}
