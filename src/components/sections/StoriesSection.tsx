import React, { useState } from 'react';
import { BookOpen, Clock, Heart, ArrowRight, Filter } from 'lucide-react';
import { ArticleItem } from '../../types';

interface StoriesSectionProps {
  articles: ArticleItem[];
  onOpenArticle: (id: string) => void;
  onOpenAuthor: (id: string) => void;
}

export const StoriesSection: React.FC<StoriesSectionProps> = ({
  articles,
  onOpenArticle,
  onOpenAuthor,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  const stories = articles.filter((a) => a.category === 'कहानी');
  const genres = ['all', 'यथार्थवाद / बाल मनोविज्ञान', 'अंतिम यथार्थवाद', 'समकालीन'];

  const filteredStories =
    selectedGenre === 'all'
      ? stories
      : stories.filter((s) => s.genre === selectedGenre || s.genre.includes(selectedGenre));

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div>
          <span className="text-xs font-sans-ui text-[#C89D56] font-semibold uppercase tracking-widest block mb-2">
            कथा संसार • Short Fiction & Novellas
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1321] dark:text-[#FBF9F4]">
            हिंदी कहानियों का अमर खजाना
          </h2>
          <p className="font-devanagari text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2 max-w-2xl">
            प्रेमचंद के सामाजिक यथार्थ से लेकर आधुनिक संवेदना तक—मानवीय रिश्तों, द्वंद्वों और जीवन के सच्चे रंगों की कालजयी दास्तानें।
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-900 rounded-lg text-xs font-sans-ui border border-stone-200 dark:border-stone-800 overflow-x-auto">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                selectedGenre === g
                  ? 'bg-white dark:bg-[#161F33] text-[#6E1A2D] dark:text-[#E4C88E] font-semibold shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              {g === 'all' ? 'सभी कहानियाँ' : g}
            </button>
          ))}
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => (
          <div
            key={story.id}
            onClick={() => onOpenArticle(story.id)}
            className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 p-6 flex flex-col justify-between hover:border-[#C89D56] hover:shadow-xl transition-all cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-sans-ui text-stone-500 mb-3">
                <span className="text-[#6E1A2D] dark:text-[#E4C88E] font-semibold">
                  {story.genre}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  {story.readTime}
                </span>
              </div>

              <h3 className="font-editorial text-2xl font-bold group-hover:text-[#6E1A2D] dark:group-hover:text-[#E4C88E] transition-colors mb-3">
                {story.title}
              </h3>

              <p className="font-devanagari text-sm text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-4 mb-6">
                {story.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#3B1838] text-[#E4C88E] flex items-center justify-center font-bold text-xs">
                  {story.author.charAt(0)}
                </div>
                <span className="font-devanagari font-semibold text-stone-800 dark:text-stone-200">
                  {story.author}
                </span>
              </div>

              <span className="font-sans-ui text-[#C89D56] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>कहानी पढ़ें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
