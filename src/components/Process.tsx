import SectionReveal from './SectionReveal';

interface StepItem {
  num: string;
  title: string;
  desc: string;
}

const steps: StepItem[] = [
  {
    num: '01',
    title: 'Échange & Besoins',
    desc: 'Nous échangeons sans jargon sur vos objectifs, vos utilisateurs et les fonctionnalités indispensables pour votre activité.',
  },
  {
    num: '02',
    title: 'Conception & Design',
    desc: 'Création d\'un design sur-mesure adapté à votre identité visuelle, validé avec vous avant d\'écrire la moindre ligne de code.',
  },
  {
    num: '03',
    title: 'Développement',
    desc: 'Développement sur-mesure soigné pour vous assurer une navigation fluide, une sécurité renforcée et une grande durabilité.',
  },
  {
    num: '04',
    title: 'Tests & SEO',
    desc: 'Contrôle rigoureux des formulaires, de l\'ergonomie sur tous les écrans et optimisation de la visibilité sur Google.',
  },
  {
    num: '05',
    title: 'Livraison & Suivi',
    desc: 'Explications simples pour administrer vos contenus en autonomie et possibilité d\'accompagnement (maintenance, suivi).',
  },
];

export default function Process() {
  return (
    <SectionReveal id="process" className="section-pad">
      <div className="wrap">
        <div className="text-center mb-12">
          <div className="eyebrow reveal justify-center">MÉTHODE DE TRAVAIL</div>
          <h2 className="section-title reveal mt-2">Le processus de création en 5 étapes</h2>
          <p className="text-sm text-text-secondary mt-3 reveal max-w-2xl mx-auto">
            Un accompagnement structuré et transparent, de l'étude de vos besoins jusqu'au suivi après la mise en ligne.
          </p>
        </div>

        {/* Grille des étapes de travail */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 reveal">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-6 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.06)] hover:border-[#2E8FE0]/30 transition-all duration-300 flex flex-col text-left group"
            >
              <span className="text-xs label-mono text-cyan-300 font-bold mb-4 block group-hover:text-[#2E8FE0] transition-colors duration-300">
                {step.num}
              </span>
              <h3 className="text-base font-bold text-text-primary mb-3 leading-snug">
                {step.title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
