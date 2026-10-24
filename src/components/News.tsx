import React from 'react';
import { NEWS_LIST } from '../data/articles';

interface NewsProps {
  onOpenNewsItem: (id: string) => void;
  onViewAllNews: () => void;
}

export const News: React.FC<NewsProps> = ({ onOpenNewsItem, onViewAllNews }) => {
  return (
    <section className="section news-section" id="news">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span></span> साहित्यिक हलचल
            </div>
            <h2>
              समाचार और <em>आयोजन</em>
            </h2>
          </div>
          <a
            className="text-link"
            href="#all-articles"
            onClick={(e) => {
              e.preventDefault();
              onViewAllNews();
            }}
          >
            सभी समाचार <span>↗</span>
          </a>
        </div>

        <div className="news-list">
          {NEWS_LIST.map((item) => (
            <article
              key={item.id}
              className="news-item searchable"
              data-category="समाचार"
              onClick={() => onOpenNewsItem(item.id)}
            >
              <span className="news-date">
                {item.day} <small>{item.month}</small>
              </span>
              <div>
                <small>{item.tag}</small>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenNewsItem(item.id);
                }}
              >
                पूरा समाचार ↗
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
