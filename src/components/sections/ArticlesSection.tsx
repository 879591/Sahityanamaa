import React from 'react';
import { FileText, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { ArticleItem } from '../../types';

interface ArticlesSectionProps {
  articles: ArticleItem[];
  onOpenArticle: (id: string) => void;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({ articles, onOpenArticle }) => {
  const editorialArticles = articles.filter(
    (a) => a.category === 'आलेख' || a.category === 'धरोहर' || a.category === 'भारतीय वाङ्मय'
  );

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div>
          <span className="text-xs font-sans-ui text-[#C89D56] font-semibold uppercase tracking-widest block mb-2">
            विमर्श एवं समालोचना • Literary Essays & Criticism
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1321] dark:text-[#FBF9F4]">
            साहित्यिक आलेख व दार्शनिक चिंतन
          </h2>
          <p className="font-devanagari text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2 max-w-2xl">
            शोधार्थियों, विचारकों और आलोचकों द्वारा रचित गंभीर आलेख, जो भारतीय वाङ्मय की अंतर्धाराओं का विश्लेषण करते हैं।
          </p>
        </div>
      </div>

      {/* Magazine Editorial Stream */}
      <div className="space-y-6">
        {editorialArticles.map((art) => (
          <div
            key={art.id}
            onClick={() => onOpenArticle(art.id)}
            className="p-7 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 hover:border-[#C89D56] hover:shadow-lg transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 group"
          >
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-sans-ui text-stone-500 mb-2">
                <span className="text-[#6E1A2D] dark:text-[#E4C88E] font-semibold">
                  {art.category}
                </span>
                <span>·</span>
                <span>{art.genre}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {art.readTime}
                </span>
              </div>

              <h3 className="font-editorial text-2xl font-bold text-[#1A1321] dark:text-[#FBF9F4] group-hover:text-[#6E1A2D] dark:group-hover:text-[#E4C88E] transition-colors leading-snug mb-3">
                {art.title}
              </h3>

              <p className="font-devanagari text-sm text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-2">
                {art.excerpt}
              </p>

              <div className="flex items-center gap-2 mt-4 text-xs font-devanagari text-stone-500">
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  {art.author}
                </span>
                <span>·</span>
                <span className="font-sans-ui text-stone-400">{art.date}</span>
              </div>
            </div>

            <div className="shrink-0 flex md:flex-col items-center justify-between gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-stone-100 dark:border-stone-800">
              <span className="text-xs font-sans-ui font-semibold text-[#6E1A2D] dark:text-[#E4C88E] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>आलेख पढ़ें</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
