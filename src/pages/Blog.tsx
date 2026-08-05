import SectionReveal from '../components/SectionReveal';
import { Link } from 'react-router-dom';

export default function Blog() {
  const articles = [
    {
      slug: 'pourquoi-eviter-les-templates',
      title: 'Pourquoi éviter les templates en 2026 ?',
      excerpt: 'Les thèmes pré-conçus pénalisent votre vitesse et brident votre référencement Google. Découvrez pourquoi le sur-mesure est devenu incontournable.',
      date: '04 Août 2026',
      readTime: '4 min read',
      tag: 'Technologie',
    },
    {
      slug: 'performance-web-sur-mesure',
      title: 'Vitesse de chargement & Taux de conversion',
      excerpt: 'Chaque milliseconde de retard coûte cher. Analyse chiffrée de l\'impact direct des performances web d\'élite sur le chiffre d\'affaires.',
      date: '02 Août 2026',
      readTime: '5 min read',
      tag: 'Performance',
    },
  ];

  return (
    <SectionReveal className="section-pad text-left" style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', paddingTop: '140px' }}>
      <div className="wrap max-w-4xl">
        <div className="eyebrow">Blog</div>
        <h1 className="section-title mt-4 mb-12">Ressources & Performance</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <Link 
              key={article.slug} 
              to={`/blog/${article.slug}`}
              className="cursor-target block p-6 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.06)] hover:border-accent/40 hover:bg-[#121729]/80 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="flex items-center gap-3 text-[10px] label-mono text-purple-300 mb-4">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
              
              <h2 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors leading-tight">
                {article.title}
              </h2>
              
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="px-2.5 py-1 text-[10px] label-mono font-semibold rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-300">
                  {article.tag}
                </span>
                
                <span className="text-xs font-bold text-accent group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Lire l'article <span className="text-sm">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
