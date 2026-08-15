import { Link } from 'react-router-dom';
import SectionReveal from './SectionReveal';
import MagneticWrapper from './MagneticWrapper';
import { ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';

interface ProjectItem {
  tag: string;
  title: string;
  desc: string;
  img: string;
  href: string;
  externalHref?: string;
}

export default function Projects() {
  const projects: ProjectItem[] = [
    {
      tag: 'Application SaaS & Entreprise',
      title: 'LocaTool',
      desc: 'Logiciel de gestion de parc matériel, devis et facturation tout-en-un.',
      img: '/locatool.webp',
      href: '/projets/locatool',
      externalHref: 'https://locatool.devsupai.fr',
    },
    {
      tag: 'Application Interactive',
      title: 'Abogame',
      desc: 'Plateforme interactive en direct : tirages au sort dynamiques et roue animée.',
      img: '/abogame.webp',
      href: '/projets/abogame',
      externalHref: 'https://abogame.devsupai.fr',
    },
    {
      tag: 'Restauration & Gastronomie',
      title: 'Les Jumeaux',
      desc: 'Site vitrine immersif et système de réservation directe en ligne.',
      img: '/les-jumeaux.webp',
      href: '/projets/les-jumeaux',
    },
  ];

  return (
    <SectionReveal id="projets" className="py-16 sm:py-20 md:py-28 lg:py-36" style={{ position: 'relative' }}>
      <div className="wrap-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Colonne Gauche : Uniquement du texte structuré et aéré (sans cartes) */}
          <div className="lg:col-span-5 text-left space-y-4 sm:space-y-5 reveal">
            <div className="eyebrow">RÉALISATIONS & ÉTUDES DE CAS</div>
            
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight">
              Nos réalisations et études de cas sur-mesure
            </h2>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
              Découvrez comment nous concevons des outils et des sites adaptés aux besoins réels de chaque activité : du logiciel SaaS métier à la vitrine de restaurant avec réservation en ligne, en passant par des plateformes interactives en direct.
            </p>

            <div className="space-y-2.5 sm:space-y-3 pt-2 border-y border-[rgba(245,246,250,0.08)] py-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong className="text-text-primary font-semibold">Conception sur-mesure :</strong> Pensée pour refléter fidèlement votre identité et vos objectifs.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong className="text-text-primary font-semibold">Résultats concrets :</strong> Gain de temps, augmentation des contacts et fidélisation.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong className="text-text-primary font-semibold">Autonomie totale :</strong> Code 100% propriétaire sans abonnement logiciel imposé.
                </p>
              </div>
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
                  <span>Discuter de votre projet</span>
                  <ArrowRight size={14} className="text-[#0B122C]" />
                </a>
              </MagneticWrapper>
            </div>
          </div>

          {/* Colonne Droite : 3 Cartes compactes empilées parfaitement adaptées mobile et PC */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 sm:gap-4">
            {projects.map((project, idx) => {
              return (
                <div
                  key={idx}
                  className="cursor-target proj-card reveal group relative rounded-2xl overflow-hidden border border-[rgba(245,246,250,0.08)] hover:border-[#2E8FE0]/50 transition-all duration-300 shadow-lg flex items-center min-h-[140px] sm:min-h-[155px] md:h-[165px] w-full"
                >
                  {/* Background Image with Zoom */}
                  <div
                    className="proj-bg absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                    style={{
                      background: `url(${project.img}) center top / cover no-repeat`,
                    }}
                  />

                  {/* Dark horizontal gradient shade for high contrast */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(to right, rgba(7, 9, 19, 0.95) 0%, rgba(7, 9, 19, 0.78) 55%, rgba(7, 9, 19, 0.35) 100%)',
                    }}
                  />

                  {/* Main Link to Case Study */}
                  <Link
                    to={project.href}
                    className="absolute inset-0 z-10"
                    aria-label={`Lire l'étude de cas : ${project.title}`}
                  >
                    <span className="sr-only">Voir {project.title}</span>
                  </Link>

                  {/* Card Content (Left aligned) */}
                  <div className="relative z-20 p-4 sm:p-5 md:p-6 text-left max-w-[78%] sm:max-w-[72%]">
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
                  <div className="absolute right-3.5 sm:right-5 top-1/2 -translate-y-1/2 z-20 flex items-center gap-2 sm:gap-3">
                    {project.externalHref && (
                      <a
                        href={project.externalHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Consulter le site officiel ${project.title}`}
                        className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-[#2E8FE0] text-white hover:text-[#0B122C] border border-white/20 transition-all duration-200 hidden sm:flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                        title="Visiter le site en ligne"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}

                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#2E8FE0] group-hover:text-[#0B122C] group-hover:rotate-45">
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
