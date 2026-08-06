import SectionReveal from './SectionReveal';

export default function Stack() {
  const stack = [
    'React',
    'Vite',
    'TypeScript',
    'Tailwind CSS',
    'Node.js / Express',
    'Firebase / Firestore',
  ];

  return (
    <SectionReveal id="stack" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-[rgba(245,246,250,0.04)]">
      <div className="bg-[#121729] rounded-[20px] p-8 md:p-12 border border-[rgba(245,246,250,0.08)]">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="label-mono text-accent">stack technologique</span>
          <h2 className="text-2xl md:text-3xl font-medium mt-2 mb-8 text-text-primary">
            Des technologies modernes pour des performances maximales.
          </h2>
        </div>

        {/* Tech Grid */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-12">
          {stack.map((tech) => (
            <span
              key={tech}
              className="label-mono text-xs md:text-sm text-text-primary bg-[#0B0F1E] px-4 py-2.5 rounded-[6px] border border-[rgba(245,246,250,0.06)] hover:border-accent transition-colors duration-150"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Confident AI production statement */}
        <div className="max-w-3xl mx-auto text-center border-t border-[rgba(245,246,250,0.04)] pt-8">
          <span className="label-mono text-[9px] bg-accent-hover/10 text-accent-hover px-2 py-1 rounded-full border border-accent-hover/20 inline-block mb-4">
            ma philosophie de production
          </span>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed font-sans">
            J'intègre l'intelligence artificielle générative au cœur de mon processus de développement. Loin d'être un raccourci, l'IA agit comme un amplificateur cognitif : elle accélère la rédaction du code structurel, optimise les tests et réduit les cycles de production. Le résultat ? Plus de temps alloué à l'expérience utilisateur, au peaufinage de l'interface et à la valeur métier réelle de votre produit.
          </p>
        </div>
      </div>
    </SectionReveal>
  );
}
