import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CinematicHero } from './components/CinematicHero';
import { ReaderView } from './components/ReaderView';
import { AuthorModal } from './components/AuthorModal';
import { SearchModal } from './components/SearchModal';
import { AudioPlayerDrawer } from './components/AudioPlayerDrawer';
import { UserDashboardModal } from './components/UserDashboardModal';
import { AdminDashboard } from './components/AdminDashboard';
import { SubmissionModal } from './components/SubmissionModal';
import { Footer } from './components/Footer';

// Section Components
import { FeaturedLiterature } from './components/sections/FeaturedLiterature';
import { StoriesSection } from './components/sections/StoriesSection';
import { PoetrySection } from './components/sections/PoetrySection';
import { GhazalsSection } from './components/sections/GhazalsSection';
import { NovelsSection } from './components/sections/NovelsSection';
import { ArticlesSection } from './components/sections/ArticlesSection';
import { AuthorsSection } from './components/sections/AuthorsSection';
import { HeritageAndIndianLitSection } from './components/sections/HeritageAndIndianLitSection';
import { MediaAndEventsSection } from './components/sections/MediaAndEventsSection';
import { AboutAndContactSection } from './components/sections/AboutAndContactSection';

import {
  ARTICLES_DATA,
  AUTHORS_DATA,
  BOOKS_DATA,
  AUDIO_TRACKS,
  VIDEO_GALLERY,
  LITERARY_EVENTS,
  WRITING_COMPETITIONS,
  SPECIAL_EDITIONS,
  INITIAL_COMMENTS,
} from './data/literaryData';
import {
  ArticleItem,
  AuthorItem,
  BookItem,
  SubmissionItem,
  CommentItem,
  UserProfile,
  SectionView,
} from './types';

export const App: React.FC = () => {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<SectionView>('home');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [activeAuthorId, setActiveAuthorId] = useState<string | null>(null);

  // Modals & Panels
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAudioPlayerOpen, setIsAudioPlayerOpen] = useState(false);
  const [currentAudioTrackIndex, setCurrentAudioTrackIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isUserDashboardOpen, setIsUserDashboardOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);

  // Dual Theme (Dark / Light Mode)
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('sahityanama_theme');
      if (stored) return stored === 'dark';
      return true; // Default to dark for cinematic Awwwards aesthetic
    } catch {
      return true;
    }
  });

  // Data Store with State
  const [articles, setArticles] = useState<ArticleItem[]>(ARTICLES_DATA);
  const [authors, setAuthors] = useState<AuthorItem[]>(AUTHORS_DATA);
  const [books] = useState<BookItem[]>(BOOKS_DATA);
  const [comments, setComments] = useState<CommentItem[]>(INITIAL_COMMENTS);
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([
    {
      id: 'sub-init-1',
      authorName: 'आरण्या शुक्ला',
      email: 'aranya@example.com',
      title: 'काँच का परिंदा और नगर का शोर',
      category: 'कविता',
      genre: 'समकालीन',
      content: 'रात की आखिरी मेट्रो जब स्टेशन छोड़ती है, एक काँच का परिंदा पटरियों पर अपने पंख फड़फड़ाता है...',
      bio: 'युवा कवयित्री, लखनऊ',
      status: 'approved',
      submittedAt: '3 दिन पूर्व',
      feedback: 'उत्कृष्ट बिंब और गहरी मानवीय संवेदना।',
    },
    {
      id: 'sub-init-2',
      authorName: 'विकास रंजन',
      email: 'vikas@example.com',
      title: 'धूप का आखिरी सिरा',
      category: 'कहानी',
      genre: 'यथार्थवाद',
      content: 'बाबूजी की पुरानी साइकिल की घंटी जब बजती, तो लगता जैसे बचपन अभी-अभी मोड़ से गुजरा हो...',
      bio: 'कथाकार, पटना',
      status: 'pending',
      submittedAt: 'कल',
    },
  ]);

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('sahityanama_bookmarks');
      return stored ? JSON.parse(stored) : ['rashmirathi-dinkar', 'eidgah-premchand'];
    } catch {
      return ['rashmirathi-dinkar', 'eidgah-premchand'];
    }
  });

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'user-guest-1',
    name: 'साहित्य साधक',
    email: 'reader@sahityanama.in',
    role: 'reader',
    bookmarks: bookmarkedIds,
    history: [
      { articleId: 'rashmirathi-dinkar', readAt: 'आज', progress: 100 },
      { articleId: 'eidgah-premchand', readAt: 'कल', progress: 75 },
    ],
    preferences: {
      fontSize: 'base',
      theme: 'paper',
      fontFamily: 'devanagari',
    },
  });

  // Synchronize Dark Theme class on <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('sahityanama_theme', isDark ? 'dark' : 'light');
    } catch {
      // ignore
    }
  }, [isDark]);

  // Synchronize Bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('sahityanama_bookmarks', JSON.stringify(bookmarkedIds));
    } catch {
      // ignore
    }
  }, [bookmarkedIds]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddComment = (articleId: string, content: string, name: string) => {
    const newComment: CommentItem = {
      id: `comm-${Date.now()}`,
      articleId,
      userName: name,
      content,
      timestamp: 'अभी-अभी',
      likes: 1,
    };
    setComments((prev) => [newComment, ...prev]);
  };

  const handleCreateSubmission = (
    subData: Omit<SubmissionItem, 'id' | 'status' | 'submittedAt'>
  ) => {
    const newSub: SubmissionItem = {
      ...subData,
      id: `sub-${Date.now()}`,
      status: 'pending',
      submittedAt: 'अभी-अभी',
    };
    setSubmissions((prev) => [newSub, ...prev]);
  };

  const handleApproveSubmission = (id: string) => {
    const sub = submissions.find((s) => s.id === id);
    if (!sub) return;

    // Update submission status
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'approved' } : s))
    );

    // Publish into live articles!
    const newArticle: ArticleItem = {
      id: `art-sub-${Date.now()}`,
      title: sub.title,
      category: sub.category,
      genre: sub.genre || 'समकालीन',
      author: sub.authorName,
      authorId: 'premchand',
      date: '2026',
      readTime: '4 मिनट',
      excerpt: sub.content.slice(0, 120) + '...',
      content: sub.content,
      featured: true,
      views: 1,
      likes: 1,
    };
    setArticles((prev) => [newArticle, ...prev]);
  };

  const handleRejectSubmission = (id: string, reason: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'rejected', feedback: reason } : s))
    );
  };

  const handleDeleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const handleDeleteComment = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSelectAudioTrack = (index: number) => {
    setCurrentAudioTrackIndex(index);
    setIsPlayingAudio(true);
    setIsAudioPlayerOpen(true);
  };

  // Find active article & author
  const activeArticle = articles.find((a) => a.id === activeArticleId) || null;
  const activeAuthor = authors.find((au) => au.id === activeAuthorId) || null;
  const activeAuthorArticles = activeAuthor
    ? articles.filter((a) => a.author.includes(activeAuthor.name) || a.authorId === activeAuthor.id)
    : [];

  const bookmarkedArticlesList = articles.filter((a) => bookmarkedIds.includes(a.id));
  const userSubmissionsList = submissions;

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4] dark:bg-[#090D16] text-[#1A1321] dark:text-[#E8E2D8] transition-colors duration-300">
      
      {/* Primary Top Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={(v) => {
          setCurrentView(v);
          setActiveArticleId(null);
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleAudio={() => {
          setIsAudioPlayerOpen(!isAudioPlayerOpen);
          if (!isAudioPlayerOpen) setIsPlayingAudio(true);
        }}
        isPlayingAudio={isPlayingAudio && isAudioPlayerOpen}
        onOpenUserDashboard={() => setIsUserDashboardOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdmin={isAdminAuthenticated}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onOpenSubmit={() => setIsSubmissionModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Full-screen Literature Reader View */}
        {activeArticle ? (
          <ReaderView
            article={activeArticle}
            author={authors.find((a) => a.id === activeArticle.authorId || a.name === activeArticle.author)}
            allArticles={articles}
            isBookmarked={bookmarkedIds.includes(activeArticle.id)}
            onToggleBookmark={handleToggleBookmark}
            onClose={() => setActiveArticleId(null)}
            onSelectArticle={(id) => setActiveArticleId(id)}
            onOpenAuthor={(id) => setActiveAuthorId(id)}
            comments={comments.filter((c) => c.articleId === activeArticle.id)}
            onAddComment={handleAddComment}
          />
        ) : (
          <>
            {/* VIEW 1: Full Cinematic Home Page */}
            {currentView === 'home' && (
              <>
                <CinematicHero
                  onNavigate={setCurrentView}
                  onOpenArticle={(id) => setActiveArticleId(id)}
                  onOpenAuthor={(id) => setActiveAuthorId(id)}
                  onOpenSubmit={() => setIsSubmissionModalOpen(true)}
                />

                <FeaturedLiterature
                  articles={articles}
                  onOpenArticle={(id) => setActiveArticleId(id)}
                  onOpenAuthor={(id) => setActiveAuthorId(id)}
                  onNavigateSection={setCurrentView}
                />

                <StoriesSection
                  articles={articles}
                  onOpenArticle={(id) => setActiveArticleId(id)}
                  onOpenAuthor={(id) => setActiveAuthorId(id)}
                />

                <PoetrySection
                  articles={articles}
                  onOpenArticle={(id) => setActiveArticleId(id)}
                  onOpenAuthor={(id) => setActiveAuthorId(id)}
                />

                <GhazalsSection
                  articles={articles}
                  onOpenArticle={(id) => setActiveArticleId(id)}
                  onOpenAuthor={(id) => setActiveAuthorId(id)}
                />

                <NovelsSection
                  books={books}
                  onOpenArticle={(id) => setActiveArticleId(id)}
                />

                <ArticlesSection
                  articles={articles}
                  onOpenArticle={(id) => setActiveArticleId(id)}
                />

                <AuthorsSection
                  authors={authors}
                  onOpenAuthor={(id) => setActiveAuthorId(id)}
                />

                <HeritageAndIndianLitSection
                  articles={articles}
                  onOpenArticle={(id) => setActiveArticleId(id)}
                />

                <MediaAndEventsSection
                  audioTracks={AUDIO_TRACKS}
                  videos={VIDEO_GALLERY}
                  events={LITERARY_EVENTS}
                  competitions={WRITING_COMPETITIONS}
                  specialEditions={SPECIAL_EDITIONS}
                  onSelectAudioTrack={handleSelectAudioTrack}
                  onOpenSubmit={() => setIsSubmissionModalOpen(true)}
                  onOpenArticle={(id) => setActiveArticleId(id)}
                />

                <AboutAndContactSection />
              </>
            )}

            {/* VIEW 2: Featured Literature Dedicated */}
            {currentView === 'featured' && (
              <FeaturedLiterature
                articles={articles}
                onOpenArticle={(id) => setActiveArticleId(id)}
                onOpenAuthor={(id) => setActiveAuthorId(id)}
                onNavigateSection={setCurrentView}
              />
            )}

            {/* VIEW 3: Hindi Stories Dedicated */}
            {currentView === 'stories' && (
              <StoriesSection
                articles={articles}
                onOpenArticle={(id) => setActiveArticleId(id)}
                onOpenAuthor={(id) => setActiveAuthorId(id)}
              />
            )}

            {/* VIEW 4: Poetry Collection Dedicated */}
            {currentView === 'poetry' && (
              <PoetrySection
                articles={articles}
                onOpenArticle={(id) => setActiveArticleId(id)}
                onOpenAuthor={(id) => setActiveAuthorId(id)}
              />
            )}

            {/* VIEW 5: Ghazals & Shayari Dedicated */}
            {currentView === 'ghazals' && (
              <GhazalsSection
                articles={articles}
                onOpenArticle={(id) => setActiveArticleId(id)}
                onOpenAuthor={(id) => setActiveAuthorId(id)}
              />
            )}

            {/* VIEW 6: Novels & Books Dedicated */}
            {currentView === 'novels' && (
              <NovelsSection
                books={books}
                onOpenArticle={(id) => setActiveArticleId(id)}
              />
            )}

            {/* VIEW 7: Literary Articles Dedicated */}
            {currentView === 'articles' && (
              <ArticlesSection
                articles={articles}
                onOpenArticle={(id) => setActiveArticleId(id)}
              />
            )}

            {/* VIEW 8: Famous Authors Dedicated */}
            {currentView === 'authors' && (
              <AuthorsSection
                authors={authors}
                onOpenAuthor={(id) => setActiveAuthorId(id)}
                filterMode="famous"
              />
            )}

            {/* VIEW 9: Emerging Writers Dedicated */}
            {currentView === 'emerging' && (
              <AuthorsSection
                authors={authors}
                onOpenAuthor={(id) => setActiveAuthorId(id)}
                filterMode="emerging"
              />
            )}

            {/* VIEW 10: Cultural Heritage & Indian Lit */}
            {(currentView === 'heritage' || currentView === 'indian-lit') && (
              <HeritageAndIndianLitSection
                articles={articles}
                onOpenArticle={(id) => setActiveArticleId(id)}
              />
            )}

            {/* VIEW 11: Audio, Video, Events, Competitions, Special Editions, News */}
            {(currentView === 'audio' ||
              currentView === 'videos' ||
              currentView === 'events' ||
              currentView === 'competitions' ||
              currentView === 'special-editions' ||
              currentView === 'news') && (
              <MediaAndEventsSection
                audioTracks={AUDIO_TRACKS}
                videos={VIDEO_GALLERY}
                events={LITERARY_EVENTS}
                competitions={WRITING_COMPETITIONS}
                specialEditions={SPECIAL_EDITIONS}
                onSelectAudioTrack={handleSelectAudioTrack}
                onOpenSubmit={() => setIsSubmissionModalOpen(true)}
                onOpenArticle={(id) => setActiveArticleId(id)}
              />
            )}

            {/* VIEW 12: About & Contact */}
            {(currentView === 'about' || currentView === 'contact') && (
              <AboutAndContactSection />
            )}

            {/* VIEW 13: Submit Dedicated */}
            {currentView === 'submit' && (
              <div className="py-16 text-center max-w-2xl mx-auto px-4 font-devanagari">
                <h2 className="font-editorial text-4xl font-bold mb-4">रचना प्रेषण पोर्टल</h2>
                <p className="text-stone-600 dark:text-stone-300 mb-8">
                  साहित्यानामा पर अपनी कविता, कहानी या आलेख भेजें।
                </p>
                <button
                  onClick={() => setIsSubmissionModalOpen(true)}
                  className="px-8 py-3.5 bg-[#6E1A2D] text-white rounded-xl font-sans-ui font-semibold shadow-lg cursor-pointer"
                >
                  रचना प्रेषण फॉर्म खोलें
                </button>
              </div>
            )}
          </>
        )}

      </main>

      {/* Footer */}
      <Footer
        onNavigate={(v) => {
          setCurrentView(v);
          setActiveArticleId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSubmit={() => setIsSubmissionModalOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Audio Player Drawer */}
      <AudioPlayerDrawer
        isOpen={isAudioPlayerOpen}
        onClose={() => setIsAudioPlayerOpen(false)}
        tracks={AUDIO_TRACKS}
        currentTrackIndex={currentAudioTrackIndex}
        onSelectTrack={(idx) => {
          setCurrentAudioTrackIndex(idx);
          setIsPlayingAudio(true);
        }}
        isPlaying={isPlayingAudio}
        onTogglePlay={() => setIsPlayingAudio(!isPlayingAudio)}
      />

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={articles}
        authors={authors}
        books={books}
        onSelectArticle={(id) => {
          setActiveArticleId(id);
          setIsSearchOpen(false);
        }}
        onSelectAuthor={(id) => {
          setActiveAuthorId(id);
          setIsSearchOpen(false);
        }}
      />

      <AuthorModal
        author={activeAuthor}
        authorArticles={activeAuthorArticles}
        onClose={() => setActiveAuthorId(null)}
        onSelectArticle={(id) => setActiveArticleId(id)}
      />

      <UserDashboardModal
        isOpen={isUserDashboardOpen}
        onClose={() => setIsUserDashboardOpen(false)}
        userProfile={userProfile}
        bookmarkedArticles={bookmarkedArticlesList}
        userSubmissions={userSubmissionsList}
        onRemoveBookmark={handleToggleBookmark}
        onSelectArticle={(id) => {
          setActiveArticleId(id);
          setIsUserDashboardOpen(false);
        }}
        onOpenSubmit={() => {
          setIsUserDashboardOpen(false);
          setIsSubmissionModalOpen(true);
        }}
        onUpdateProfile={(name, email) => {
          setUserProfile((prev) => ({ ...prev, name, email }));
        }}
      />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        articles={articles}
        authors={authors}
        submissions={submissions}
        comments={comments}
        onAddArticle={(art) => setArticles((prev) => [art, ...prev])}
        onDeleteArticle={handleDeleteArticle}
        onApproveSubmission={handleApproveSubmission}
        onRejectSubmission={handleRejectSubmission}
        onDeleteComment={handleDeleteComment}
        isAdminAuthenticated={isAdminAuthenticated}
        onAuthenticate={setIsAdminAuthenticated}
      />

      <SubmissionModal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
        onSubmit={handleCreateSubmission}
      />

    </div>
  );
};

export default App;
