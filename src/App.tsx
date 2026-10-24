import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Ticker } from './components/Ticker';
import { Featured } from './components/Featured';
import { QuoteBand } from './components/QuoteBand';
import { CategoryGrid } from './components/CategoryGrid';
import { Thoughts } from './components/Thoughts';
import { Heritage } from './components/Heritage';
import { News } from './components/News';
import { AllArticles } from './components/AllArticles';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { ArticleModal } from './components/ArticleModal';
import { SavedModal } from './components/SavedModal';
import { Toast } from './components/Toast';
import {
  ARTICLES_DATA,
  EDITORIAL_STORIES,
  HERITAGE_LIST,
  NEWS_LIST,
} from './data/articles';
import { ArticleItem, CategoryType } from './types';

export const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('sahityanama_saved');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [savedModalOpen, setSavedModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync saved to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'sahityanama_saved',
        JSON.stringify(savedArticleIds)
      );
    } catch {
      // ignore
    }
  }, [savedArticleIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleToggleSave = (id: string) => {
    setSavedArticleIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenArticle = (id: string) => {
    // Check main articles
    const mainArt = ARTICLES_DATA.find((a) => a.id === id);
    if (mainArt) {
      setActiveArticle(mainArt);
      return;
    }

    // Check editorial
    const editStory = EDITORIAL_STORIES.find((e) => e.id === id);
    if (editStory) {
      setActiveArticle({
        id: editStory.id,
        title: editStory.title,
        category: editStory.category as CategoryType,
        subCategory: editStory.tag,
        excerpt: editStory.excerpt,
        content: editStory.content,
        author: 'संपादकीय मंडल',
        readTime: '4 मिनट',
        originalUrl: editStory.originalUrl,
      });
      return;
    }

    // Check heritage
    const heritage = HERITAGE_LIST.find((h) => h.id === id);
    if (heritage) {
      setActiveArticle({
        id: heritage.id,
        title: heritage.title,
        category: 'धरोहर',
        subCategory: heritage.role,
        excerpt: heritage.subtitle,
        content: heritage.content,
        author: 'इतिहास शोध प्रकोष्ठ',
        readTime: '3 मिनट',
        originalUrl: heritage.originalUrl,
      });
      return;
    }

    // Check news
    const news = NEWS_LIST.find((n) => n.id === id);
    if (news) {
      setActiveArticle({
        id: news.id,
        title: news.title,
        category: 'समाचार',
        subCategory: `${news.day} ${news.month} · ${news.tag}`,
        excerpt: news.excerpt,
        content: news.content,
        author: 'साहित्य संवाद',
        date: `${news.day} ${news.month} 2024`,
        readTime: '3 मिनट',
        originalUrl: news.originalUrl,
      });
    }
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const savedArticlesList: ArticleItem[] = savedArticleIds
    .map((id) => {
      const art = ARTICLES_DATA.find((a) => a.id === id);
      if (art) return art;
      const edit = EDITORIAL_STORIES.find((e) => e.id === id);
      if (edit) {
        return {
          id: edit.id,
          title: edit.title,
          category: edit.category as CategoryType,
          excerpt: edit.excerpt,
          content: edit.content,
          originalUrl: edit.originalUrl,
        };
      }
      return null;
    })
    .filter((a): a is ArticleItem => a !== null);

  return (
    <div className="sahityanama-app">
      <Header
        onSearch={(q) => setSearchQuery(q)}
        searchQuery={searchQuery}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        savedCount={savedArticleIds.length}
        onOpenSavedModal={() => setSavedModalOpen(true)}
      />

      <main>
        <Hero
          onExploreClick={() => handleScrollTo('latest')}
          onAboutClick={() => handleScrollTo('thoughts')}
        />

        <Ticker />

        <Featured
          onOpenArticle={handleOpenArticle}
          onViewAllClick={() => handleScrollTo('all-articles')}
        />

        <QuoteBand />

        <CategoryGrid
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        <Thoughts
          onOpenEditorialStory={handleOpenArticle}
          onExploreThoughts={() => {
            setSelectedCategory('आलेख');
            handleScrollTo('all-articles');
          }}
        />

        <Heritage onOpenHeritageItem={handleOpenArticle} />

        <News
          onOpenNewsItem={handleOpenArticle}
          onViewAllNews={() => {
            setSelectedCategory('समाचार');
            handleScrollTo('all-articles');
          }}
        />

        <AllArticles
          articles={ARTICLES_DATA}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          onOpenArticle={handleOpenArticle}
          savedIds={savedArticleIds}
        />

        <Newsletter
          onSubscribe={(_email) => {
            showToast('सदस्यता सफल! साहित्यानामा से जुड़ने के लिए धन्यवाद।');
          }}
        />
      </main>

      <Footer
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onNavigateSection={handleScrollTo}
      />

      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        isSaved={activeArticle ? savedArticleIds.includes(activeArticle.id) : false}
        onToggleSave={handleToggleSave}
        onShowToast={showToast}
      />

      <SavedModal
        isOpen={savedModalOpen}
        onClose={() => setSavedModalOpen(false)}
        savedArticles={savedArticlesList}
        onOpenArticle={handleOpenArticle}
        onRemoveSave={handleToggleSave}
      />

      <Toast message={toastMessage} />
    </div>
  );
};

export default App;
