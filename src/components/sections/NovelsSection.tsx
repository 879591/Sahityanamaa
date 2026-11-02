import React, { useState } from 'react';
import { Book, Star, Sparkles, BookOpen, ArrowRight, Check } from 'lucide-react';
import { BookItem } from '../../types';

interface NovelsSectionProps {
  books: BookItem[];
  onOpenArticle: (id: string) => void;
}

export const NovelsSection: React.FC<NovelsSectionProps> = ({ books, onOpenArticle }) => {
  const [activeSynopsisBook, setActiveSynopsisBook] = useState<BookItem | null>(books[0] || null);

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div>
          <span className="text-xs font-sans-ui text-[#C89D56] font-semibold uppercase tracking-widest block mb-2">
            उपन्यास वाङ्मय • Classic Novels & Masterpieces
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1321] dark:text-[#FBF9F4]">
            कालजयी उपन्यास एवं विस्तृत समीक्षा
          </h2>
          <p className="font-devanagari text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2 max-w-2xl">
            वे ऐतिहासिक उपन्यास जिन्होंने हिंदी गद्य की दिशा बदली—‘गोदान’ से लेकर ‘राग दरबारी’ तक की कथाभूमि और दार्शनिक आधार।
          </p>
        </div>
      </div>

      {/* Featured Book Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <div
            key={book.id}
            className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 p-7 flex flex-col justify-between hover:border-[#C89D56] hover:shadow-xl transition-all group"
          >
            <div>
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between text-xs font-sans-ui mb-4">
                <span className="text-[#C89D56] font-semibold">{book.genre}</span>
                <span className="flex items-center gap-1 text-amber-500 font-semibold font-mono">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {book.rating}
                </span>
              </div>

              {/* Book Spine Representation */}
              <div
                className="h-32 rounded-xl p-5 mb-5 text-white flex flex-col justify-between shadow-md relative overflow-hidden"
                style={{ backgroundColor: book.coverColor }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-white/10" />
                <span className="text-[10px] font-sans-ui uppercase tracking-widest text-[#E4C88E]">
                  प्रकाशन वर्ष • {book.year}
                </span>
                <h3 className="font-editorial text-2xl font-bold leading-tight">
                  {book.title}
                </h3>
                <span className="text-xs font-devanagari text-white/80">
                  {book.author}
                </span>
              </div>

              <p className="font-devanagari text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-4 line-clamp-3">
                {book.synopsis}
              </p>

              {/* Key Themes Chips (Unboxed Text with Separator) */}
              <div className="text-xs font-sans-ui text-stone-500 dark:text-stone-400 flex flex-wrap gap-x-2 gap-y-1 mb-6">
                <strong className="text-stone-700 dark:text-stone-300">प्रमुख विषय:</strong>
                {book.keyThemes.map((t, idx) => (
                  <span key={idx}>
                    {t}
                    {idx < book.keyThemes.length - 1 ? ' ·' : ''}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-sans-ui">
              <span className="text-stone-400">{book.year} क्लासिक</span>
              <button
                onClick={() => onOpenArticle('godaan-analysis')}
                className="text-[#6E1A2D] dark:text-[#E4C88E] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
              >
                <span>विस्तृत समीक्षा पढ़ें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
