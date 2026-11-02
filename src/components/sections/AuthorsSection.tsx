import React, { useState } from 'react';
import { User, Award, BookOpen, Quote, ChevronRight, Sparkles } from 'lucide-react';
import { AuthorItem } from '../../types';

interface AuthorsSectionProps {
  authors: AuthorItem[];
  onOpenAuthor: (id: string) => void;
  filterMode?: 'all' | 'famous' | 'emerging';
}

export const AuthorsSection: React.FC<AuthorsSectionProps> = ({
  authors,
  onOpenAuthor,
  filterMode = 'all',
}) => {
  const [tab, setTab] = useState<'all' | 'famous' | 'emerging'>(filterMode);

  const filteredAuthors = authors.filter((a) => {
    if (tab === 'emerging') return a.isEmerging;
    if (tab === 'famous') return !a.isEmerging;
    return true;
  });

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div>
          <span className="text-xs font-sans-ui text-[#C89D56] font-semibold uppercase tracking-widest block mb-2">
            साहित्यिक विभूतियाँ व नवस्वर • Author Dossiers
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1321] dark:text-[#FBF9F4]">
            अमर रचनाकार एवं उभरती प्रतिभाएँ
          </h2>
          <p className="font-devanagari text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2 max-w-2xl">
            हिंदी के युगप्रवर्तक साहित्यकारों के जीवन-दर्शन, अप्रतिम कृतियों और नवोदित लेखकों के क्रांतिकारी स्वरों का प्रामाणिक परिचय।
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-900 rounded-lg text-xs font-sans-ui border border-stone-200 dark:border-stone-800">
          <button
            onClick={() => setTab('all')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              tab === 'all'
                ? 'bg-white dark:bg-[#161F33] text-[#6E1A2D] dark:text-[#E4C88E] font-semibold shadow-xs'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            सभी रचनाकार
          </button>
          <button
            onClick={() => setTab('famous')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              tab === 'famous'
                ? 'bg-white dark:bg-[#161F33] text-[#6E1A2D] dark:text-[#E4C88E] font-semibold shadow-xs'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            महान विभूतियाँ
          </button>
          <button
            onClick={() => setTab('emerging')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              tab === 'emerging'
                ? 'bg-white dark:bg-[#161F33] text-[#6E1A2D] dark:text-[#E4C88E] font-semibold shadow-xs'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            उभरते रचनाकार
          </button>
        </div>
      </div>

      {/* Authors Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAuthors.map((au) => (
          <div
            key={au.id}
            onClick={() => onOpenAuthor(au.id)}
            className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 p-7 flex flex-col justify-between hover:border-[#C89D56] hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
          >
            <div>
              {/* Profile Top Lockup */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3B1838] to-[#5E1929] text-[#E4C88E] flex items-center justify-center font-brand font-bold text-2xl border-2 border-[#C89D56] shadow-md shrink-0 group-hover:scale-105 transition-transform">
                  {au.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-sans-ui text-[#C89D56] font-semibold">
                    <span>{au.era}</span>
                  </div>
                  <h3 className="font-editorial text-2xl font-bold group-hover:text-[#6E1A2D] dark:group-hover:text-[#E4C88E] transition-colors leading-snug">
                    {au.name}
                  </h3>
                  <span className="text-xs text-stone-500 font-sans-ui">
                    {au.birthDeath}
                  </span>
                </div>
              </div>

              <p className="font-devanagari text-xs text-[#6E1A2D] dark:text-[#E4C88E] font-medium mb-3">
                {au.role}
              </p>

              <p className="font-devanagari text-sm text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3 mb-5">
                {au.bio}
              </p>

              {/* Notable Works */}
              <div className="text-xs font-sans-ui text-stone-500 mb-6">
                <strong className="text-stone-700 dark:text-stone-300 font-devanagari">
                  प्रमुख कृतियाँ:
                </strong>{' '}
                {au.notableWorks.join(' · ')}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-sans-ui">
              <span className="text-stone-400">
                {au.articlesCount ? `${au.articlesCount} रचनाएँ उपलब्ध` : 'रचनावली'}
              </span>
              <span className="text-[#6E1A2D] dark:text-[#E4C88E] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>प्रोफाइल देखें</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
