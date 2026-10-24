import React from 'react';
import { CATEGORIES } from '../data/articles';
import { CategoryType } from '../types';

interface CategoryGridProps {
  onSelectCategory: (category: CategoryType) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  const handleClick = (catId: CategoryType) => {
    onSelectCategory(catId);
    const element = document.getElementById('all-articles');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section container" id="stories">
      <div className="section-heading">
        <div>
          <div className="eyebrow">
            <span></span> अपनी पसंद चुनें
          </div>
          <h2>
            साहित्य की <em>दुनिया</em>
          </h2>
        </div>
        <p className="heading-note">
          हर विधा में एक नया अनुभव,
          <br />
          हर रचना में एक नई दृष्टि।
        </p>
      </div>

      <div className="category-grid" id="categoryGrid">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className={`category-tile ${cat.tileClass}`}
            data-filter={cat.id}
            role="button"
            tabIndex={0}
            onClick={() => handleClick(cat.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleClick(cat.id);
              }
            }}
          >
            <span className="cat-icon">{cat.icon}</span>
            <span className="cat-number">{cat.number}</span>
            <h3>{cat.title}</h3>
            <p>{cat.description}</p>
            <span className="cat-arrow">↗</span>
          </div>
        ))}
      </div>
    </section>
  );
};
