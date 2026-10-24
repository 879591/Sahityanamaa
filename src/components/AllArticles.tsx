import React from 'react';
import { ArticleItem, CategoryType } from '../types';

interface AllArticlesProps {
  articles: ArticleItem[];
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  searchQuery: string;
  onClearSearch: () => void;
  onOpenArticle: (id: string) => void;
  savedIds: string[];
}

const CATEGORY_CHIPS: { id: CategoryType; label: string }[] = [
  { id: 'all', label: 'सभी' },
  { id: 'कहानी', label: 'कहानी' },
  { id: 'कविता', label: 'कविता' },
  { id: 'शायरी', label: 'शायरी' },
  { id: 'आलेख', label: 'आलेख' },
  { id: 'धरोहर', label: 'धरोहर' },
  { id: 'शख्सियत', label: 'शख्सियत' },
  { id: 'यात्रा', label: 'यात्रा' },
  { id: 'समाचार', label: 'समाचार' },
];

export const AllArticles: React.FC<AllArticlesProps> = ({
  articles,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
  onOpenArticle,
  savedIds,
}) => {
  const filtered = articles.filter((item) => {
    // category filter
    const matchesCat =
      selectedCategory === 'all' || item.category === selectedCategory;

    // search filter
    if (!searchQuery.trim()) {
      return matchesCat;
    }
    const q = searchQuery.toLowerCase().trim();
    const titleMatch = item.title.toLowerCase().includes(q);
    const excerptMatch = item.excerpt.toLowerCase().includes(q);
    const catMatch = item.category.toLowerCase().includes(q);
    const contentMatch = item.content.toLowerCase().includes(q);
    const authorMatch = item.author ? item.author.toLowerCase().includes(q) : false;

    return matchesCat && (titleMatch || excerptMatch || catMatch || contentMatch || authorMatch);
  });

  return (
    <section className="section container" id="all-articles">
      <div className="section-heading">
        <div>
          <div className="eyebrow">
            <span></span> खोजें और खोजते रहें
          </div>
          <h2>
            अपनी अगली <em>पसंदीदा रचना</em>
          </h2>
        </div>
        {searchQuery && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
              खोज: "{searchQuery}"
            </span>
            <button
              type="button"
              onClick={onClearSearch}
              style={{
                background: 'none',
                border: '1px solid var(--line)',
                borderRadius: '4px',
                padding: '2px 8px',
                fontSize: '11px',
                cursor: 'pointer',
                color: 'var(--plum)',
              }}
            >
              हटाएँ ✕
            </button>
          </div>
        )}
      </div>

      <div className="filter-row" id="filterRow">
        {CATEGORY_CHIPS.map((chip) => (
          <button
            key={chip.id}
            className={`filter-chip ${selectedCategory === chip.id ? 'selected' : ''}`}
            data-filter={chip.id}
            onClick={() => onSelectCategory(chip.id)}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="article-results" id="articleResults">
          {filtered.map((item) => {
            const isSaved = savedIds.includes(item.id);
            return (
              <article
                key={item.id}
                className="result-card searchable"
                data-category={item.category}
                onClick={() => onOpenArticle(item.id)}
              >
                <span className="result-icon">{item.icon || '✦'}</span>
                <div>
                  <small>
                    {item.category}
                    {item.readTime ? ` · ${item.readTime}` : ''}
                    {isSaved ? ' · ★ सहेजा गया' : ''}
                  </small>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenArticle(item.id);
                  }}
                >
                  पढ़ें ↗
                </button>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="no-results" id="noResults">
          इस खोज से मेल खाती रचना नहीं मिली। कोई दूसरा शब्द या श्रेणी चुनें।
        </p>
      )}
    </section>
  );
};
