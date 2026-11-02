import React from 'react';
import { Moon, Sparkles, ArrowRight, Quote, Feather } from 'lucide-react';
import { ArticleItem } from '../../types';

interface GhazalsSectionProps {
  articles: ArticleItem[];
  onOpenArticle: (id: string) => void;
  onOpenAuthor: (id: string) => void;
}

export const GhazalsSection: React.FC<GhazalsSectionProps> = ({
  articles,
  onOpenArticle,
  onOpenAuthor,
}) => {
  const ghazals = articles.filter((a) => a.category === 'ग़ज़ल');

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Cinematic Nocturnal Banner */}
      <div className="relative rounded-3xl overflow-hidden mb-16 border border-[#C89D56]/40 shadow-2xl bg-[#090D16] text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/ghazal_poetic_night_1793591087313.jpg"
            alt="Ghazal Poetic Night"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090D16] via-[#1A1024]/90 to-[#090D16]/60" />
        </div>

        <div className="relative z-10 p-8 sm:p-14 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-sans-ui text-[#E4C88E] uppercase tracking-widest font-semibold mb-3">
            <Moon className="w-4 h-4" />
            <span>शायर-ए-आज़म • ग़ज़ल व शायरी</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold leading-tight mb-4">
            तहज़ीब, इश्क़ और बगावत का तरन्नुम
          </h2>
          <p className="font-devanagari text-base sm:text-lg text-stone-300 leading-relaxed mb-8">
            ग़ालिब की रूहानी दास्तान से लेकर दुष्यंत कुमार के क्रांतिकारी अशआर तक—हर मिसरे में धड़कती है हिंदुस्तान की मुश्तरका तहज़ीब।
          </p>

          <button
            onClick={() => onOpenArticle('ghalib-ghazal-1')}
            className="px-6 py-3 bg-[#C89D56] hover:bg-[#DFBA73] text-[#1A1321] rounded-lg text-xs font-sans-ui font-semibold flex items-center gap-2 cursor-pointer shadow-lg transition-all"
          >
            <span>मिर्ज़ा ग़ालिब की प्रसिद्ध ग़ज़ल पढ़ें</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Ghazal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ghazals.map((ghazal) => (
          <div
            key={ghazal.id}
            onClick={() => onOpenArticle(ghazal.id)}
            className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 p-8 flex flex-col justify-between hover:border-[#C89D56] hover:shadow-xl transition-all cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-sans-ui text-stone-500 mb-4">
                <span className="text-[#6E1A2D] dark:text-[#E4C88E] font-semibold">
                  {ghazal.genre}
                </span>
                <span className="text-stone-400">{ghazal.readTime}</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1A1321] dark:text-[#FBF9F4] group-hover:text-[#6E1A2D] dark:group-hover:text-[#E4C88E] transition-colors leading-snug mb-6">
                “{ghazal.title}”
              </h3>

              {/* Verses */}
              <div className="space-y-4 font-devanagari text-base text-stone-700 dark:text-stone-300 border-l-2 border-[#C89D56]/50 pl-4 py-1 italic">
                {ghazal.verses?.slice(0, 4).map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#3B1838] text-[#E4C88E] flex items-center justify-center font-bold text-xs border border-[#C89D56]">
                  {ghazal.author.charAt(0)}
                </div>
                <span className="font-devanagari font-bold text-sm text-stone-800 dark:text-stone-200">
                  {ghazal.author}
                </span>
              </div>

              <span className="font-sans-ui text-[#C89D56] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>सम्पूर्ण ग़ज़ल</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
