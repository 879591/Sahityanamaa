import React from 'react';
import { X, Award, BookOpen, Quote, Calendar, Star, ChevronRight } from 'lucide-react';
import { AuthorItem, ArticleItem } from '../types';

interface AuthorModalProps {
  author: AuthorItem | null;
  authorArticles: ArticleItem[];
  onClose: () => void;
  onSelectArticle: (id: string) => void;
}

export const AuthorModal: React.FC<AuthorModalProps> = ({
  author,
  authorArticles,
  onClose,
  onSelectArticle,
}) => {
  if (!author) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FBF9F4] dark:bg-[#0D1322] border border-[#C89D56]/40 rounded-2xl shadow-2xl text-[#1A1321] dark:text-[#E8E2D8] p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-red-500 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Profile Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-stone-200 dark:border-stone-800 pb-8 text-center sm:text-left">
          
          {/* Author Portrait with Archival Medal Framing */}
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#3B1838] via-[#5E1929] to-[#1A1321] text-[#E4C88E] flex items-center justify-center font-brand font-bold text-4xl shadow-xl border-4 border-[#C89D56] shrink-0">
            {author.name.charAt(0)}
            <div className="absolute -bottom-2 -right-1 bg-[#C89D56] text-[#1A1321] text-[10px] font-sans-ui font-bold px-2 py-0.5 rounded-full shadow-sm">
              विभूति
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-xs font-sans-ui text-[#C89D56] font-semibold tracking-wider uppercase">
                {author.era}
              </span>
              <span className="text-stone-400">·</span>
              <span className="text-xs font-sans-ui text-stone-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {author.birthDeath}
              </span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl font-bold leading-tight">
              {author.name}
            </h2>
            <p className="font-sans-ui text-xs text-stone-500 tracking-wide mt-0.5">
              {author.nameEn}
            </p>
            <p className="text-sm font-devanagari text-[#6E1A2D] dark:text-[#E4C88E] font-medium mt-2">
              {author.role}
            </p>
          </div>
        </div>

        {/* Famous Quote Banner */}
        <div className="my-6 p-4 rounded-xl bg-[#3B1838]/10 dark:bg-[#3B1838]/30 border border-[#C89D56]/30 flex items-start gap-3">
          <Quote className="w-5 h-5 text-[#C89D56] shrink-0 mt-1" />
          <p className="font-devanagari text-sm italic leading-relaxed text-[#501D47] dark:text-[#E4C88E]">
            “{author.quote}”
          </p>
        </div>

        {/* Biography */}
        <div className="mb-8">
          <h3 className="font-editorial text-xl font-bold mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#C89D56]" />
            <span>जीवन परिचय व साहित्यिक यात्रा</span>
          </h3>
          <p className="font-devanagari text-base leading-relaxed text-stone-700 dark:text-stone-300">
            {author.bio}
          </p>
        </div>

        {/* Honors & Recognitions */}
        <div className="mb-8 p-5 rounded-xl bg-black/5 dark:bg-white/5 border border-stone-200 dark:border-stone-800">
          <h3 className="font-editorial text-lg font-bold mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-[#C89D56]" />
            <span>सम्मान एवं ऐतिहासिक उपाधियाँ</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {author.honors.map((h, i) => (
              <span
                key={i}
                className="text-xs font-devanagari font-medium px-3 py-1.5 rounded-md bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 flex items-center gap-1.5"
              >
                <Star className="w-3 h-3 text-[#C89D56] fill-[#C89D56]" />
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* Published Works on Sahityanama */}
        <div>
          <h3 className="font-editorial text-xl font-bold mb-4 flex items-center justify-between">
            <span>साहित्यानामा पर उपलब्ध रचनाएँ</span>
            <span className="text-xs font-sans-ui text-stone-400 font-normal">
              ({authorArticles.length} रचनाएँ)
            </span>
          </h3>

          <div className="space-y-3">
            {authorArticles.map((art) => (
              <button
                key={art.id}
                onClick={() => {
                  onSelectArticle(art.id);
                  onClose();
                }}
                className="w-full p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-[#C89D56] bg-white/60 dark:bg-stone-900/40 text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-sans-ui text-[#C89D56] mb-1">
                    <span>{art.category}</span>
                    <span>·</span>
                    <span className="text-stone-500">{art.genre}</span>
                    <span>·</span>
                    <span className="text-stone-500">{art.readTime}</span>
                  </div>
                  <h4 className="font-devanagari font-bold text-lg group-hover:text-[#6E1A2D] dark:group-hover:text-[#E4C88E] transition-colors">
                    {art.title}
                  </h4>
                  <p className="font-devanagari text-xs text-stone-500 line-clamp-1 mt-1">
                    {art.excerpt}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-[#C89D56] transition-transform group-hover:translate-x-1 shrink-0 ml-4" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
