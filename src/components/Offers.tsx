import SectionReveal from './SectionReveal';

export default function Offers() {
  const services = [
    {
      num: '01',
      title: 'Site vitrine',
      desc: 'Une présence en ligne élégante et mémorable, pensée pour installer votre crédibilité en quelques secondes.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M3 5h18v14H3z" />
          <path d="M3 9h18" />
          <circle cx="6" cy="7" r=".6" />
        </svg>
      ),
    },
    {
      num: '02',
      title: 'E-commerce',
      desc: 'Des boutiques en ligne rapides et intuitives, conçues pour maximiser chaque conversion.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M6 6h15l-1.5 9h-12z" />
          <circle cx="9" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
          <path d="M3 3h3l1 3" />
        </svg>
      ),
    },
    {
      num: '03',
      title: 'Développement sur mesure',
      desc: 'Des solutions techniques taillées pour vos besoins spécifiques, sans compromis sur la qualité.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M4 17l6-6-6-6" />
          <path d="M12 19h8" />
        </svg>
      ),
    },
    {
      num: '04',
      title: 'Applications web',
      desc: 'Des interfaces riches et performantes pour piloter votre activité au quotidien.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M9 7h6M9 11h6M9 15h3" />
        </svg>
      ),
    },
    {
      num: '05',
      title: 'SEO',
      desc: 'Une visibilité renforcée sur Google grâce à une structure technique irréprochable.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      ),
    },
    {
      num: '06',
      title: 'Maintenance',
      desc: 'Un site à jour, sécurisé et surveillé, pour que vous puissiez vous concentrer sur votre métier.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 2l2.4 5 5.6.8-4 3.9.9 5.6L12 14.8 7.1 17.3l.9-5.6-4-3.9 5.6-.8z" />
        </svg>
      ),
    },
  ];

  return (
    <SectionReveal id="services" className="section-pad">
      <div className="wrap">
        <div className="head-row">
          <div>
            <div className="eyebrow reveal">Services</div>
            <h2 className="section-title reveal">Ce que nous pouvons<br />construire pour vous.</h2>
          </div>
          <p className="section-sub reveal">De la vitrine élégante à l'application web sur mesure, chaque projet est pensé pour votre croissance.</p>
        </div>
        
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.num} className="service-card reveal">
              <div className="service-num">{service.num}</div>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
