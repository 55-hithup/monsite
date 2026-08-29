import { useLanguage } from '../../i18n/LanguageContext';

export default function GlacierParallaxBreak() {
  const { isEn } = useLanguage();

  return (
    <section 
      className="glacier-parallax-break" 
      aria-label={isEn ? "DevSupAi Commitment and Philosophy" : "Engagement et Philosophie DevSupAi"}
    >
      <div 
        className="break-parallax-bg" 
        style={{ backgroundImage: "url('/hero-bg-mockup.webp')" }}
      />
      <div className="break-tint" />
      <div className="break-content">
        <span className="break-tag">
          {isEn ? "THE DEVSUPAI COMMITMENT" : "L'ENGAGEMENT DEVSUPAI"}
        </span>
        <h2 className="break-quote">
          {isEn ? (
            <>
              &ldquo;SUSTAINABLE BESPOKE CODE, <br />
              <span className="hero-serif-italic">free from recurring software lock-in.&rdquo;</span>
            </>
          ) : (
            <>
              &laquo;&nbsp;UN CODE SUR-MESURE DURABLE, <br />
              <span className="hero-serif-italic">sans aucun abonnement captif.&nbsp;&raquo;</span>
            </>
          )}
        </h2>
        <p className="break-sub">
          {isEn
            ? "€0 annual plugin fees • 100% proprietary code • Lightweight & optimized architecture"
            : "0 € de plugins payants chaque année • 100% propriétaire • Architecture légère & optimisée"}
        </p>
      </div>
    </section>
  );
}

