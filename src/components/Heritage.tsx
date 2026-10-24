import React from 'react';
import { HERITAGE_LIST } from '../data/articles';

interface HeritageProps {
  onOpenHeritageItem: (id: string) => void;
}

export const Heritage: React.FC<HeritageProps> = ({ onOpenHeritageItem }) => {
  return (
    <section className="section container" id="heritage">
      <div className="section-heading">
        <div>
          <div className="eyebrow">
            <span></span> याद रखे जाने वाले नाम
          </div>
          <h2>
            इतिहास की <em>आवाज़ें</em>
          </h2>
        </div>
        <a
          className="text-link"
          href="https://sahityanama.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          और पढ़ें <span>↗</span>
        </a>
      </div>

      <div className="heritage-grid">
        {HERITAGE_LIST.map((item) => (
          <div
            key={item.id}
            className={`heritage-card ${item.colorClass} searchable`}
            data-category="धरोहर"
            role="button"
            tabIndex={0}
            onClick={() => onOpenHeritageItem(item.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onOpenHeritageItem(item.id);
              }
            }}
          >
            <span>{item.role}</span>
            <h3>{item.title}</h3>
            <p>{item.subtitle}</p>
            <b>↗</b>
          </div>
        ))}
      </div>
    </section>
  );
};
