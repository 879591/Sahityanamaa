import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, User, Book, Sparkles, ArrowRight } from 'lucide-react';
import { ArticleItem, AuthorItem, BookItem, CategoryType } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: ArticleItem[];
  authors: AuthorItem[];
  books: BookItem[];
  onSelectArticle: (id: string) => void;
  onSelectAuthor: (id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  authors,
  books,
  onSelectArticle,
  onSelectAuthor,
}) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'articles' | 'authors' | 'books'>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // Search results
  const filteredArticles = q
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.author.toLowerCase().includes(q) ||
          a.genre.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q)
      )
    : [];

  const filteredAuthors = q
    ? authors.filter(
        (au) =>
          au.name.toLowerCase().includes(q) ||
          au.nameEn.toLowerCase().includes(q) ||
          au.role.toLowerCase().includes(q) ||
          au.era.toLowerCase().includes(q)
      )
    : [];

  const filteredBooks = q
    ? books.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.genre.toLowerCase().includes(q) ||
          b.synopsis.toLowerCase().includes(q)
      )
    : [];

  const trendingTags = ['मुंशी प्रेमचंद', 'रश्मिरथी', 'मिर्ज़ा ग़ालिब', 'गोदान', 'मधुशाला', 'छायावाद', 'ईदगाह'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FBF9F4] dark:bg-[#0D1322] border border-[#C89D56]/50 rounded-2xl shadow-2xl text-[#1A1321] dark:text-[#E8E2D8] overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C89D56] shrink-0" />
          <input
            type="text"
            placeholder="कहानी, कविता, ग़ज़ल, लेखक या पुस्तक खोजें..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-lg font-devanagari outline-none placeholder:text-stone-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 text-xs font-sans-ui text-stone-500 hover:text-[#C89D56] cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Filter Segmented Buttons */}
        <div className="px-5 py-2.5 bg-stone-100 dark:bg-[#161F33] border-b border-stone-200 dark:border-stone-800 flex items-center gap-2 overflow-x-auto text-xs font-sans-ui">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              filterType === 'all'
                ? 'bg-[#3B1838] text-white font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            सभी परिणाम
          </button>
          <button
            onClick={() => setFilterType('articles')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              filterType === 'articles'
                ? 'bg-[#3B1838] text-white font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            रचनाएँ ({filteredArticles.length})
          </button>
          <button
            onClick={() => setFilterType('authors')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              filterType === 'authors'
                ? 'bg-[#3B1838] text-white font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            साहित्यकार ({filteredAuthors.length})
          </button>
          <button
            onClick={() => setFilterType('books')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              filterType === 'books'
                ? 'bg-[#3B1838] text-white font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            उपन्यास व पुस्तकें ({filteredBooks.length})
          </button>
        </div>

        {/* Results Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-6">
          {!q ? (
            <div>
              <div className="flex items-center gap-2 text-xs font-sans-ui text-stone-500 uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C89D56]" />
                <span>लोकप्रिय खोजें</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-stone-900/60 text-xs font-devanagari text-stone-700 dark:text-stone-300 hover:border-[#C89D56] transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Articles */}
              {(filterType === 'all' || filterType === 'articles') && filteredArticles.length > 0 && (
                <div>
                  <h4 className="text-xs font-sans-ui uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#C89D56]" />
                    <span>रचनाएँ व साहित्य</span>
                  </h4>
                  <div className="space-y-2">
                    {filteredArticles.map((art) => (
                      <button
                        key={art.id}
                        onClick={() => {
                          onSelectArticle(art.id);
                          onClose();
                        }}
                        className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-[#C89D56] bg-white/60 dark:bg-stone-900/40 text-left transition-colors flex items-center justify-between cursor-pointer group"
                      >
                        <div>
                          <div className="flex items-center gap-2 text-[11px] font-sans-ui text-[#C89D56]">
                            <span>{art.category}</span>
                            <span>·</span>
                            <span className="text-stone-500">{art.author}</span>
                          </div>
                          <h5 className="font-devanagari font-bold text-base group-hover:text-[#6E1A2D] dark:group-hover:text-[#E4C88E]">
                            {art.title}
                          </h5>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#C89D56] transition-transform group-hover:translate-x-1 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Authors */}
              {(filterType === 'all' || filterType === 'authors') && filteredAuthors.length > 0 && (
                <div>
                  <h4 className="text-xs font-sans-ui uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#C89D56]" />
                    <span>साहित्यकार</span>
                  </h4>
                  <div className="space-y-2">
                    {filteredAuthors.map((au) => (
                      <button
                        key={au.id}
                        onClick={() => {
                          onSelectAuthor(au.id);
                          onClose();
                        }}
                        className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-[#C89D56] bg-white/60 dark:bg-stone-900/40 text-left transition-colors flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#3B1838] text-[#E4C88E] flex items-center justify-center font-bold text-sm border border-[#C89D56]">
                            {au.name.charAt(0)}
                          </div>
                          <div>
                            <h5 className="font-editorial font-bold text-base group-hover:text-[#6E1A2D] dark:group-hover:text-[#E4C88E]">
                              {au.name}
                            </h5>
                            <p className="text-xs text-stone-500 font-devanagari">
                              {au.role} ({au.birthDeath})
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#C89D56] transition-transform group-hover:translate-x-1 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Books */}
              {(filterType === 'all' || filterType === 'books') && filteredBooks.length > 0 && (
                <div>
                  <h4 className="text-xs font-sans-ui uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5">
                    <Book className="w-3.5 h-3.5 text-[#C89D56]" />
                    <span>उपन्यास व पुस्तकें</span>
                  </h4>
                  <div className="space-y-2">
                    {filteredBooks.map((bk) => (
                      <div
                        key={bk.id}
                        className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-stone-900/40 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-[11px] font-sans-ui text-[#C89D56]">
                            <span>{bk.year}</span>
                            <span> · </span>
                            <span className="text-stone-500">{bk.author}</span>
                          </div>
                          <h5 className="font-editorial font-bold text-base">{bk.title}</h5>
                          <p className="font-devanagari text-xs text-stone-500 line-clamp-1">
                            {bk.synopsis}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredArticles.length === 0 &&
                filteredAuthors.length === 0 &&
                filteredBooks.length === 0 && (
                  <div className="text-center py-10 font-devanagari text-stone-400">
                    <p className="text-lg">‘{query}’ के लिए कोई परिणाम नहीं मिला।</p>
                    <p className="text-xs mt-1">कृपया अन्य शब्द या लेखक का नाम लिखकर खोजें।</p>
                  </div>
                )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
