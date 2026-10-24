import React, { useState } from 'react';
import { CategoryType } from '../types';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onSelectCategory: (cat: CategoryType) => void;
  savedCount: number;
  onOpenSavedModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  searchQuery,
  onSelectCategory,
  savedCount,
  onOpenSavedModal,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearch);
    const target = document.getElementById('all-articles');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (sectionId?: string, category?: CategoryType) => {
    setMenuOpen(false);
    if (category) {
      onSelectCategory(category);
    }
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <div className="topline">
        <div className="container topbar">
          <span>शब्द • संवेदना • संस्कृति</span>
          <div className="toplinks">
            <a
              href="#latest"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('latest');
              }}
            >
              ताज़ा रचनाएँ
            </a>
            <span>✦</span>
            {savedCount > 0 && (
              <>
                <button
                  type="button"
                  onClick={onOpenSavedModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#e5bf7a',
                    cursor: 'pointer',
                    fontSize: '11px',
                    fontFamily: 'inherit',
                    padding: 0,
                  }}
                >
                  सहेजी रचनाएँ ({savedCount})
                </button>
                <span>✦</span>
              </>
            )}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
            >
              संपर्क
            </a>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-main">
          <a
            className="brand"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="साहित्यानामा होम"
          >
            <span className="brand-mark">
              सा<span>हि</span>
            </span>
            <span className="brand-copy">
              <strong>साहित्यानामा</strong>
              <small>शब्दों से संवेदना तक</small>
            </span>
          </a>

          <button
            className="menu-toggle"
            id="menuToggle"
            aria-label={menuOpen ? 'मेन्यू बंद करें' : 'मेन्यू खोलें'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>

          <nav className={`main-nav ${menuOpen ? 'open' : ''}`} id="mainNav">
            <a
              className="active"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setMenuOpen(false);
              }}
            >
              मुखपृष्ठ
            </a>
            <a
              href="#stories"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('stories', 'कहानी');
              }}
            >
              कहानी
            </a>
            <a
              href="#stories"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('all-articles', 'कविता');
              }}
            >
              कविता
            </a>
            <a
              href="#thoughts"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('thoughts', 'आलेख');
              }}
            >
              आलेख
            </a>
            <a
              href="#heritage"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('heritage', 'धरोहर');
              }}
            >
              धरोहर
            </a>
            <a
              href="#all-articles"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('all-articles', 'शख्सियत');
              }}
            >
              शख्सियत
            </a>
            <a
              href="#news"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('news', 'समाचार');
              }}
            >
              साहित्य समाचार
            </a>
          </nav>

          <button
            className="search-open"
            id="searchOpen"
            aria-label="खोजें"
            onClick={() => {
              setSearchOpen(!searchOpen);
            }}
          >
            ⌕ <span>खोजें</span>
          </button>
        </div>

        {searchOpen && (
          <div className="search-panel" id="searchPanel">
            <div className="container">
              <form className="search-inner" onSubmit={handleSearchSubmit}>
                <input
                  id="searchInput"
                  type="search"
                  value={localSearch}
                  onChange={(e) => {
                    setLocalSearch(e.target.value);
                    onSearch(e.target.value);
                  }}
                  placeholder="कविता, कहानी, लेखक या विषय खोजें…"
                  aria-label="वेबसाइट पर खोजें"
                  autoFocus
                />
                <button id="searchButton" type="submit">
                  खोजें ↗
                </button>
                <button
                  type="button"
                  id="searchClose"
                  className="close-search"
                  aria-label="खोज बंद करें"
                  onClick={() => setSearchOpen(false)}
                >
                  ×
                </button>
              </form>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
