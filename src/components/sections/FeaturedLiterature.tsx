import React from 'react';
import { ArrowRight, Clock, BookOpen, Sparkles, Feather } from 'lucide-react';
import { ArticleItem } from '../../types';

interface FeaturedLiteratureProps {
  articles: ArticleItem[];
  onOpenArticle: (id: string) => void;
  onOpenAuthor: (id: string) => void;
  onNavigateSection: (view: any) => void;
}

export const FeaturedLiterature: React.FC<FeaturedLiteratureProps> = ({
  articles,
  onOpenArticle,
  onOpenAuthor,
  onNavigateSection,
}) => {
  const leadArticle = articles.find((a) => a.id === 'eidgah-premchand') || articles[0];
  const secondaryArticles = articles.filter((a) => a.id !== leadArticle.id).slice(0, 3);

  return (
    <section id="featured-section" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-sans-ui uppercase tracking-widest text-[#C89D56] font-semibold mb-2">
            <Sparkles className="w-4 h-4" />
            <span>संपादकीय चयन • विशेषांक संकलन</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1A1321] dark:text-[#FBF9F4]">
            विशेष रचनाएँ एवं कालजयी कृतियाँ
          </h2>
        </div>

        <button
          onClick={() => onNavigateSection('stories')}
          className="text-xs font-sans-ui font-semibold text-[#6E1A2D] dark:text-[#E4C88E] hover:underline flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <span>सम्पूर्ण कथा साहित्य देखें</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3-Tier Salience Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Tier 1: Dominant Lead Story Card */}
        <div
          onClick={() => onOpenArticle(leadArticle.id)}
          className="lg:col-span-7 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 p-7 sm:p-9 shadow-sm hover:shadow-xl hover:border-[#C89D56]/60 transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-sans-ui text-stone-500 mb-4">
              <span className="text-[#6E1A2D] dark:text-[#E4C88E] font-semibold">
                {leadArticle.category}
              </span>
              <span>·</span>
              <span>{leadArticle.genre}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {leadArticle.readTime}
              </span>
            </div>

            <h3 className="font-editorial text-2xl sm:text-4xl font-bold text-[#1A1321] dark:text-[#FBF9F4] group-hover:text-[#6E1A2D] dark:group-hover:text-[#E4C88E] transition-colors leading-tight mb-4">
              {leadArticle.title}
            </h3>

            <p className="font-devanagari text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed mb-6 line-clamp-4">
              {leadArticle.excerpt}
            </p>
          </div>

          <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#3B1838] text-[#E4C88E] flex items-center justify-center font-bold text-sm border border-[#C89D56]">
                {leadArticle.author.charAt(0)}
              </div>
              <div>
                <span className="font-devanagari font-bold text-sm block">
                  {leadArticle.author}
                </span>
                <span className="text-xs text-stone-400 font-sans-ui">
                  {leadArticle.authorRole}
                </span>
              </div>
            </div>

            <span className="text-xs font-sans-ui font-semibold text-[#6E1A2D] dark:text-[#E4C88E] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>सम्पूर्ण पाठ पढ़ें</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Tier 2: Secondary Features Stack */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-5">
          {secondaryArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => onOpenArticle(art.id)}
              className="p-5 sm:p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 hover:border-[#C89D56]/60 transition-all cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-center gap-2 text-[11px] font-sans-ui text-stone-500 mb-2">
                  <span className="text-[#6E1A2D] dark:text-[#E4C88E] font-semibold">
                    {art.category}
                  </span>
                  <span>·</span>
                  <span>{art.genre}</span>
                  <span>·</span>
                  <span>{art.readTime}</span>
                </div>

                <h4 className="font-editorial text-lg sm:text-xl font-bold text-[#1A1321] dark:text-[#FBF9F4] group-hover:text-[#6E1A2D] dark:group-hover:text-[#E4C88E] transition-colors leading-snug mb-2">
                  {art.title}
                </h4>

                <p className="font-devanagari text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs">
                <span className="font-devanagari font-semibold text-stone-700 dark:text-stone-300">
                  {art.author}
                </span>
                <span className="font-sans-ui text-[#C89D56] font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>पढ़ें →</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
