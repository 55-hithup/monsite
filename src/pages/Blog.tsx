import SectionReveal from '../components/SectionReveal';
import { Link } from 'react-router-dom';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { useLanguage } from '../i18n/LanguageContext';
import { articlesData } from '../i18n/articlesData';
import { Sparkles, ArrowRight, Calendar, Clock } from 'lucide-react';

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
    <div className="w-full bg-white text-[#4A4A4A] min-h-screen py-16 md:py-24">
      <SectionReveal className="text-left">
        <div className="container max-w-5xl mx-auto px-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#0284C7]/30 bg-[#0284C7]/10 text-xs font-bold font-['Montserrat'] text-[#0284C7] mb-6">
            <Sparkles size={14} className="text-[#0284C7]" aria-hidden="true" />
            <span>{t.blogPage.eyebrow}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Montserrat'] text-[#1A1A1A] mb-12 leading-tight max-w-3xl">
            {t.blogPage.title}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.blogList.map((article) => (
              <Link 
                key={article.slug} 
                to={language === 'en' ? `/en/blog/${article.slug}` : `/blog/${article.slug}`}
                className="block p-8 rounded-xl bg-white border border-[#E5E5E5] hover:border-[#0284C7] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 text-xs font-semibold text-[#888888] mb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#0284C7]" aria-hidden="true" />
                      {article.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={13} className="text-[#0284C7]" aria-hidden="true" />
                      {article.readTime}
                    </span>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-bold font-['Montserrat'] text-[#1A1A1A] mb-3 group-hover:text-[#0284C7] transition-colors leading-snug">
                    {article.title}
                  </h2>
                  
                  <p className="text-sm text-[#555555] leading-relaxed mb-6 font-['Plus_Jakarta_Sans']">
                    {article.excerpt}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9] mt-auto">
                  <span className="px-3 py-1 text-xs font-bold font-['Montserrat'] rounded-md bg-[#F1F5F9] text-[#0284C7] border border-[#E2E8F0]">
                    {article.tag}
                  </span>
                  
                  <span className="text-xs font-bold font-['Montserrat'] text-[#1A1A1A] group-hover:text-[#0284C7] inline-flex items-center gap-1.5">
                    {t.blogPage.readArticle}
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </SectionReveal>
    </div>
  );
}
