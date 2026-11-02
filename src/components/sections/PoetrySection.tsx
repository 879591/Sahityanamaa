import React from 'react';
import { Feather, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { ArticleItem } from '../../types';

interface PoetrySectionProps {
  articles: ArticleItem[];
  onOpenArticle: (id: string) => void;
  onOpenAuthor: (id: string) => void;
}

export const PoetrySection: React.FC<PoetrySectionProps> = ({
  articles,
  onOpenArticle,
  onOpenAuthor,
}) => {
  const poems = articles.filter((a) => a.category === 'कविता');

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs font-sans-ui text-[#C89D56] font-semibold uppercase tracking-widest block mb-2">
          काव्य मंजूषा • Poetry & Verse
        </span>
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1321] dark:text-[#FBF9F4]">
          काव्य धरोहर : भाव, छंद और चेतना
        </h2>
        <div className="w-16 h-[2px] bg-[#C89D56] mx-auto my-4" />
        <p className="font-devanagari text-base text-stone-600 dark:text-stone-400 leading-relaxed">
          छायावाद का कोमल रहस्य, प्रगतिवाद का विद्रोही शंखनाद, हालावाद की दार्शनिक मस्ती और राष्ट्रीय ओज का शाश्वत स्वर।
        </p>
      </div>

      {/* Poetry Layout - Visual Card Cards with Centered Stanzas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {poems.map((poem) => (
          <div
            key={poem.id}
            onClick={() => onOpenArticle(poem.id)}
            className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 p-7 flex flex-col justify-between hover:border-[#C89D56] hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
          >
            {/* Top Floral Border Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C89D56] to-transparent opacity-60" />

            <div>
              <div className="text-center mb-5">
                <span className="text-xs font-sans-ui text-[#C89D56] font-semibold uppercase tracking-wider">
                  {poem.genre}
                </span>
                <h3 className="font-editorial text-2xl font-bold mt-1 group-hover:text-[#6E1A2D] dark:group-hover:text-[#E4C88E] transition-colors">
                  {poem.title}
                </h3>
                <span className="text-xs font-devanagari text-stone-500 font-medium">
                  {poem.author}
                </span>
              </div>

              {/* Lyrical Stanza Preview Box */}
              <div className="p-5 rounded-xl bg-stone-50 dark:bg-[#120B17] border border-stone-200/60 dark:border-stone-800/80 font-devanagari text-sm leading-loose text-center italic text-stone-700 dark:text-[#E4C88E]/90 mb-6">
                {poem.verses && poem.verses.length > 0 ? (
                  poem.verses.slice(0, 4).map((line, idx) => (
                    <p key={idx} className="line-clamp-1">
                      {line || '...'}
                    </p>
                  ))
                ) : (
                  <p className="line-clamp-4">{poem.excerpt}</p>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-sans-ui">
              <span className="text-stone-500">{poem.readTime}</span>
              <span className="text-[#6E1A2D] dark:text-[#E4C88E] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>सम्पूर्ण कविता पाठ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
