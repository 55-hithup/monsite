import MagneticWrapper from './MagneticWrapper';

export default function Hero() {
  return (
    <section className="hero" id="accueil" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      {/* Widescreen Background Mockup Image */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none overflow-hidden">
        <picture>
          <source media="(max-width: 768px)" srcSet="/hero-bg-mockup-mobile.webp" type="image/webp" />
          <img
            src="/hero-bg-mockup.webp"
            alt="DevSupAi 3D Showcase Widescreen Background"
            width="1672"
            height="941"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-right max-md:object-[82%_center] max-md:scale-[1.8] max-md:origin-[82%_center]"
          />
        </picture>
        {/* Soft gradient masks to guarantee high contrast on all screens */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B122C] via-[#0B122C]/60 to-transparent md:block hidden"></div>
        <div className="absolute inset-0 bg-[#0B122C]/70 md:hidden block"></div>
      </div>
      
      {/* Overlay Text Content */}
      <div className="wrap relative z-10 w-full" style={{ maxWidth: '1440px', paddingLeft: 'var(--space-xl)', paddingRight: 'var(--space-xl)' }}>
        <div className="max-w-[620px] text-left">
          {/* Heading */}
          <h1 className="hero-title cursor-default text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.01] tracking-tight">
            <span className="line">
              <span>Création de sites web <span className="inline-block whitespace-nowrap">sur&#8209;mesure</span></span>
            </span>
            <span className="line">
              <span className="grad">pour PME & Associations</span>
            </span>
          </h1>

          {/* Subtitle / Key Information Box */}
          <div className="hero-sub mt-3 mb-5 p-3.5 rounded-2xl bg-[#121729]/80 border border-[#2E8FE0]/30 text-xs md:text-sm text-text-secondary leading-relaxed backdrop-blur-sm shadow-[0_0_30px_rgba(46,143,224,0.1)]">
            <p className="font-semibold text-text-primary mb-1">
              <strong>Des sites rapides, clairs et efficaces :</strong>
            </p>
            <p>
              Développeur freelance basé à Saint-Mihiel (Meuse), je me déplace à votre rencontre dans tout le Grand Est et collabore à distance avec des PME et associations dans toute la France pour créer des solutions web sur-mesure.
            </p>
          </div>

          {/* CTAs */}
          <div className="hero-ctas flex flex-wrap items-center gap-4">
            <MagneticWrapper range={40} strength={0.3}>
              <a href="#contact" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #2E8FE0, #6B4FE0)', color: '#0B122C', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Demander un devis PME / Asso →
              </a>
            </MagneticWrapper>
            
            <MagneticWrapper range={35} strength={0.25}>
              <a href="#solutions" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(245,246,250,0.15)' }}>
                Voir les solutions PME & Asso
              </a>
            </MagneticWrapper>
          </div>
        </div>
      </div>
      
      <div className="scroll-cue"><span>Scroll</span><div className="scroll-line"></div></div>
    </section>
  );
}
