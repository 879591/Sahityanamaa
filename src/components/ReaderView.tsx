import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Type,
  Sun,
  Moon,
  Coffee,
  Clock,
  Heart,
  ChevronLeft,
  ChevronRight,
  User,
  MessageSquare,
  Send,
  Check,
} from 'lucide-react';
import { ArticleItem, AuthorItem, CommentItem } from '../types';

interface ReaderViewProps {
  article: ArticleItem;
  author?: AuthorItem;
  allArticles: ArticleItem[];
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onClose: () => void;
  onSelectArticle: (id: string) => void;
  onOpenAuthor: (id: string) => void;
  comments: CommentItem[];
  onAddComment: (articleId: string, commentText: string, name: string) => void;
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  article,
  author,
  allArticles,
  isBookmarked,
  onToggleBookmark,
  onClose,
  onSelectArticle,
  onOpenAuthor,
  comments,
  onAddComment,
}) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [readerTheme, setReaderTheme] = useState<'paper' | 'dark' | 'sepia'>('paper');
  const [fontFamily, setFontFamily] = useState<'devanagari' | 'editorial' | 'sans'>('devanagari');
  const [likes, setLikes] = useState(article.likes || 120);
  const [hasLiked, setHasLiked] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  // Scroll depth progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Previous & Next navigation
  const currentIndex = allArticles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  // Related articles (same category or genre)
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && (a.category === article.category || a.genre === article.genre))
    .slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${article.title} — साहित्यानामा`,
          text: article.excerpt,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(article.id, commentText.trim(), commentAuthor.trim() || 'साहित्य अनुरागी');
    setCommentText('');
  };

  // Font size classes
  const fontSizes = {
    sm: 'text-base sm:text-lg leading-relaxed',
    base: 'text-lg sm:text-xl leading-loose',
    lg: 'text-xl sm:text-2xl leading-[2.1]',
    xl: 'text-2xl sm:text-3xl leading-[2.3]',
  };

  // Theme styling
  const themeClasses = {
    paper: 'bg-[#FBF9F4] text-[#1A1321] border-[#E8DFD6]',
    dark: 'bg-[#090D16] text-[#E5E0D6] border-[#222E42]',
    sepia: 'bg-[#F5EEDB] text-[#2B231D] border-[#DED0B9]',
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses[readerTheme]}`}>
      {/* Pinned Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-stone-200 dark:bg-stone-800">
        <div
          className="h-full bg-gradient-to-r from-[#C89D56] to-[#6E1A2D] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Floating Reader Controls Bar */}
      <nav className="sticky top-1 z-40 px-4 md:px-8 py-3 border-b backdrop-blur-md transition-colors bg-inherit/90">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back button */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-sans-ui hover:text-[#C89D56] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">वापस सूची में</span>
          </button>

          {/* Reader title indicator */}
          <span className="font-devanagari text-xs md:text-sm font-semibold truncate max-w-[200px] sm:max-w-xs opacity-70">
            {article.title}
          </span>

          {/* Utilities: Font Size, Theme, Bookmark, Share */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Font Size Selector */}
            <div className="flex items-center bg-black/5 dark:bg-white/5 rounded-lg p-1 border border-stone-300 dark:border-stone-700">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-0.5 text-xs rounded transition-colors ${fontSize === 'sm' ? 'bg-[#C89D56] text-white font-bold' : ''}`}
                title="छोटा अक्षर"
              >
                क-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-2 py-0.5 text-xs rounded transition-colors ${fontSize === 'base' ? 'bg-[#C89D56] text-white font-bold' : ''}`}
                title="सामान्य अक्षर"
              >
                क
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-0.5 text-xs rounded transition-colors ${fontSize === 'lg' ? 'bg-[#C89D56] text-white font-bold' : ''}`}
                title="बड़ा अक्षर"
              >
                क+
              </button>
            </div>

            {/* Reading Theme */}
            <div className="flex items-center bg-black/5 dark:bg-white/5 rounded-lg p-1 border border-stone-300 dark:border-stone-700">
              <button
                onClick={() => setReaderTheme('paper')}
                className={`p-1.5 rounded transition-colors ${readerTheme === 'paper' ? 'bg-[#C89D56] text-white' : ''}`}
                title="पत्र (हल्का)"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setReaderTheme('sepia')}
                className={`p-1.5 rounded transition-colors ${readerTheme === 'sepia' ? 'bg-[#C89D56] text-white' : ''}`}
                title="पुरातन (सेपिया)"
              >
                <Coffee className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setReaderTheme('dark')}
                className={`p-1.5 rounded transition-colors ${readerTheme === 'dark' ? 'bg-[#C89D56] text-white' : ''}`}
                title="निशा (डार्क)"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-[#6E1A2D] text-[#E4C88E] border-[#6E1A2D]'
                  : 'border-stone-300 dark:border-stone-700 hover:border-[#C89D56]'
              }`}
              title={isBookmarked ? 'सहेजा गया है' : 'पसंदीदा में सहेजें'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-2 rounded-lg border border-stone-300 dark:border-stone-700 hover:border-[#C89D56] transition-colors cursor-pointer"
              title="रचना साझा करें"
            >
              {shareCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Reading Canvas */}
      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-12 md:py-16">
        
        {/* Article Meta Header */}
        <header className="mb-12 border-b border-stone-300/60 dark:border-stone-700/60 pb-8 text-center sm:text-left">
          
          {/* Category & Read Time */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs font-sans-ui text-[#C89D56] font-semibold uppercase tracking-wider mb-4">
            <span>{article.category}</span>
            <span>·</span>
            <span className="text-stone-500">{article.genre}</span>
            <span>·</span>
            <span className="flex items-center gap-1 text-stone-500 normal-case">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold leading-tight mb-4 tracking-tight">
            {article.title}
          </h1>

          {/* Author line */}
          <div className="flex items-center justify-center sm:justify-start gap-3 mt-4 text-sm font-devanagari">
            <button
              onClick={() => onOpenAuthor(article.authorId)}
              className="flex items-center gap-2 hover:text-[#C89D56] transition-colors cursor-pointer font-medium"
            >
              <div className="w-8 h-8 rounded-full bg-[#3B1838] text-[#E4C88E] flex items-center justify-center text-xs font-bold border border-[#C89D56]/40">
                {article.author.charAt(0)}
              </div>
              <span className="font-semibold text-base">{article.author}</span>
            </button>
            <span className="text-stone-400">·</span>
            <span className="text-xs text-stone-500 font-sans-ui">{article.date}</span>
          </div>
        </header>

        {/* Poetry Verses Layout or Story Prose */}
        {article.verses && article.verses.length > 0 ? (
          <div className="space-y-6 my-10 max-w-xl mx-auto text-center font-devanagari">
            <div className="w-12 h-[1px] bg-[#C89D56] mx-auto mb-8" />
            {article.verses.map((line, idx) => {
              if (!line) {
                return (
                  <div key={idx} className="my-6 flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C89D56]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C89D56]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C89D56]" />
                  </div>
                );
              }
              return (
                <p key={idx} className={`${fontSizes[fontSize]} tracking-wide text-pretty`}>
                  {line}
                </p>
              );
            })}
            <div className="w-12 h-[1px] bg-[#C89D56] mx-auto mt-8" />
          </div>
        ) : (
          <article className={`space-y-6 font-devanagari ${fontSizes[fontSize]} text-pretty`}>
            {article.content.split('\n\n').map((paragraph, index) => {
              // Elegant drop cap for first paragraph
              if (index === 0) {
                return (
                  <p key={index} className="first-letter:text-5xl first-letter:font-editorial first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#6E1A2D] dark:first-letter:text-[#E4C88E]">
                    {paragraph}
                  </p>
                );
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </article>
        )}

        {/* Article Appreciation Strip */}
        <div className="my-14 py-6 border-y border-stone-300/60 dark:border-stone-700/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-sans-ui transition-all cursor-pointer ${
                hasLiked
                  ? 'bg-rose-50 text-rose-600 border-rose-300 dark:bg-rose-950/40 dark:border-rose-800'
                  : 'hover:border-rose-400 border-stone-300 dark:border-stone-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="tabular-nums font-semibold">{likes}</span>
              <span className="hidden sm:inline">प्रशंसा</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-300 dark:border-stone-700 hover:border-[#C89D56] text-sm font-sans-ui transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>साझा करें</span>
            </button>
          </div>

          <button
            onClick={() => onToggleBookmark(article.id)}
            className="flex items-center gap-1.5 text-xs font-sans-ui text-stone-500 hover:text-[#C89D56] transition-colors cursor-pointer"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#C89D56] text-[#C89D56]' : ''}`} />
            <span>{isBookmarked ? 'सहेजा हुआ है' : 'सहेजें'}</span>
          </button>
        </div>

        {/* Author Spotlight Box */}
        {author && (
          <div className="p-6 sm:p-8 rounded-xl bg-black/5 dark:bg-white/5 border border-stone-300 dark:border-stone-700 mb-12">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <div className="w-20 h-20 rounded-full bg-[#3B1838] text-[#E4C88E] flex items-center justify-center font-brand font-bold text-3xl border-2 border-[#C89D56] shadow-md shrink-0">
                {author.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="font-editorial text-2xl font-bold">{author.name}</h3>
                  <span className="text-xs text-[#C89D56] font-sans-ui font-semibold">
                    {author.era}
                  </span>
                </div>
                <p className="font-devanagari text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                  {author.bio}
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                  <button
                    onClick={() => onOpenAuthor(author.id)}
                    className="text-xs font-sans-ui font-semibold text-[#6E1A2D] dark:text-[#E4C88E] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>रचनाकार की संपूर्ण प्रोफाइल व कृतियाँ देखें</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Previous & Next Article Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {prevArticle ? (
            <button
              onClick={() => onSelectArticle(prevArticle.id)}
              className="p-5 rounded-xl border border-stone-300/80 dark:border-stone-700/80 hover:border-[#C89D56] text-left transition-all group cursor-pointer bg-white/40 dark:bg-black/20"
            >
              <div className="flex items-center gap-1 text-xs text-stone-500 font-sans-ui mb-1.5">
                <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                <span>पिछली रचना</span>
              </div>
              <h4 className="font-devanagari font-semibold text-base group-hover:text-[#6E1A2D] dark:group-hover:text-[#E4C88E] transition-colors">
                {prevArticle.title}
              </h4>
              <p className="text-xs text-stone-500 mt-1">{prevArticle.author}</p>
            </button>
          ) : (
            <div />
          )}

          {nextArticle && (
            <button
              onClick={() => onSelectArticle(nextArticle.id)}
              className="p-5 rounded-xl border border-stone-300/80 dark:border-stone-700/80 hover:border-[#C89D56] text-right transition-all group cursor-pointer bg-white/40 dark:bg-black/20"
            >
              <div className="flex items-center justify-end gap-1 text-xs text-stone-500 font-sans-ui mb-1.5">
                <span>अगली रचना</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
              <h4 className="font-devanagari font-semibold text-base group-hover:text-[#6E1A2D] dark:group-hover:text-[#E4C88E] transition-colors">
                {nextArticle.title}
              </h4>
              <p className="text-xs text-stone-500 mt-1">{nextArticle.author}</p>
            </button>
          )}
        </div>

        {/* Reader Comments & Community Reflection */}
        <section className="border-t border-stone-300/80 dark:border-stone-700/80 pt-10">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-[#C89D56]" />
            <h3 className="font-editorial text-2xl font-bold">पाठक संवेदना व विचार</h3>
            <span className="text-xs font-sans-ui text-stone-400">({comments.length})</span>
          </div>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-10 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="आपका शुभ नाम (वैकल्पिक)"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className="p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900/70 text-sm font-devanagari outline-none focus:border-[#C89D56]"
              />
            </div>
            <textarea
              rows={3}
              placeholder="इस रचना पर अपने विचार या प्रतिक्रिया लिखें..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full p-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900/70 text-sm font-devanagari outline-none focus:border-[#C89D56]"
              required
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#3B1838] hover:bg-[#501D47] text-[#E4C88E] rounded-lg text-xs font-sans-ui font-semibold flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>प्रतिक्रिया भेजें</span>
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comm) => (
              <div
                key={comm.id}
                className="p-4 rounded-xl border border-stone-300/60 dark:border-stone-700/60 bg-white/40 dark:bg-white/5"
              >
                <div className="flex items-center justify-between text-xs font-sans-ui mb-2">
                  <span className="font-semibold text-[#6E1A2D] dark:text-[#E4C88E] font-devanagari">
                    {comm.userName}
                  </span>
                  <span className="text-stone-400">{comm.timestamp}</span>
                </div>
                <p className="font-devanagari text-sm leading-relaxed">{comm.content}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};
