export default function GlacierParallaxBreak() {
  return (
    <section className="glacier-parallax-break" aria-label="Engagement et Philosophie DevSupAi">
      <div 
        className="break-parallax-bg" 
        style={{ backgroundImage: "url('/hero-bg-mockup.webp')" }}
      />
      <div className="break-tint" />
      <div className="break-content">
        <span className="break-tag">L'ENGAGEMENT DEVSUPAI</span>
        <h2 className="break-quote">
          "UN CODE SUR-MESURE DURABLE, <br />
          <span className="hero-serif-italic">sans aucun abonnement captif."</span>
        </h2>
        <p className="break-sub">
          0 € de plugins payants chaque année • 100% propriétaire • Vitesse instantanée
        </p>
      </div>
    </section>
  );
}
