import SectionReveal from '../components/SectionReveal';
import { Link } from 'react-router-dom';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { useLanguage } from '../i18n/LanguageContext';
import { articlesData } from '../i18n/articlesData';

export default function Blog() {
  const { language } = useLanguage();
  const t = articlesData[language] || articlesData.fr;

  useDocumentMetadata(
    {
      fr: "Blog & Actualités Développement Web Sur-Mesure | DevSupAi",
      en: "Blog & Technical Insights on Custom Web Engineering | DevSupAi",
    },
    {
      fr: "Conseils, guides techniques et bonnes pratiques sur le développement web sur-mesure, la performance, l'accessibilité et le référencement SEO pour PME et Associations.",
      en: "Actionable guides and technical best practices on custom web engineering, loading performance, accessibility, and SEO for SMEs and Non-Profits.",
    },
    "/blog"
  );

  return (
    <SectionReveal className="section-pad text-left" style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', paddingTop: '140px' }}>
      <div className="wrap max-w-4xl">
        <div className="eyebrow">{t.blogPage.eyebrow}</div>
        <h1 className="section-title mt-4 mb-12">{t.blogPage.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.blogList.map((article) => (
            <Link 
              key={article.slug} 
              to={language === 'en' ? `/en/blog/${article.slug}` : `/blog/${article.slug}`}
              className="cursor-target block p-6 rounded-2xl bg-[#121729]/60 border border-[rgba(245,246,250,0.06)] hover:border-accent/40 hover:bg-[#121729]/80 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="flex items-center gap-3 text-xs label-mono text-purple-300 mb-4">
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
                <span className="px-3 py-1 text-xs label-mono font-semibold rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-300">
                  {article.tag}
                </span>
                
                <span className="text-xs font-bold text-accent group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  {t.blogPage.readArticle} <span className="text-sm">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
