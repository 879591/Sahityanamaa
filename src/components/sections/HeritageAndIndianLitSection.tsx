import React from 'react';
import { Landmark, Globe, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { ArticleItem } from '../../types';

interface HeritageAndIndianLitSectionProps {
  articles: ArticleItem[];
  onOpenArticle: (id: string) => void;
}

export const HeritageAndIndianLitSection: React.FC<HeritageAndIndianLitSectionProps> = ({
  articles,
  onOpenArticle,
}) => {
  const heritageArticles = articles.filter(
    (a) => a.category === 'धरोहर' || a.category === 'भारतीय वाङ्मय'
  );

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Visual Heritage Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden mb-16 border border-stone-200 dark:border-stone-800 shadow-xl bg-[#1C1424] text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/vintage_library_heritage_1793591088662.jpg"
            alt="Heritage Indian Literature Library"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#140E1B] via-[#21162B]/85 to-[#140E1B]/70" />
        </div>

        <div className="relative z-10 p-8 sm:p-14 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-sans-ui text-[#E4C88E] uppercase tracking-widest font-semibold mb-3">
            <Landmark className="w-4 h-4" />
            <span>सांस्कृतिक धरोहर • भारतीय वाङ्मय</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold leading-tight mb-4">
            कबीर से कालिदास तक : भारतीय आत्मा का अखंड स्वर
          </h2>
          <p className="font-devanagari text-base sm:text-lg text-stone-300 leading-relaxed mb-8">
            भारतीय साहित्य विभिन्न भाषाओं में लिखा गया एक ही विचार है। संत परंपरा, संस्कृत प्राकृत धरोहर और बंगाली, मराठी, तमिल के श्रेष्ठ अनुवादों का संगम।
          </p>

          <button
            onClick={() => onOpenArticle('kabeer-amrit-vaani')}
            className="px-6 py-3 bg-[#C89D56] hover:bg-[#DFBA73] text-[#1A1321] rounded-lg text-xs font-sans-ui font-semibold flex items-center gap-2 cursor-pointer shadow-lg transition-all"
          >
            <span>कबीर की अमर साखियाँ पढ़ें</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Heritage & Indian Literature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {heritageArticles.map((art) => (
          <div
            key={art.id}
            onClick={() => onOpenArticle(art.id)}
            className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 p-8 flex flex-col justify-between hover:border-[#C89D56] hover:shadow-xl transition-all cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-sans-ui text-stone-500 mb-4">
                <span className="text-[#6E1A2D] dark:text-[#E4C88E] font-semibold">
                  {art.category}
                </span>
                <span>{art.genre}</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1A1321] dark:text-[#FBF9F4] group-hover:text-[#6E1A2D] dark:group-hover:text-[#E4C88E] transition-colors leading-snug mb-4">
                {art.title}
              </h3>

              <p className="font-devanagari text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3 mb-6">
                {art.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
              <span className="font-devanagari font-semibold text-stone-700 dark:text-stone-300">
                {art.author}
              </span>
              <span className="font-sans-ui text-[#C89D56] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>विस्तार से पढ़ें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
