import React from 'react';
import { EDITORIAL_STORIES } from '../data/articles';

interface ThoughtsProps {
  onOpenEditorialStory: (id: string) => void;
  onExploreThoughts: () => void;
}

export const Thoughts: React.FC<ThoughtsProps> = ({
  onOpenEditorialStory,
  onExploreThoughts,
}) => {
  return (
    <section className="section section-tinted" id="thoughts">
      <div className="container two-column">
        <div className="editorial-copy">
          <div className="eyebrow">
            <span></span> विचारों का कोना
          </div>
          <h2>
            पढ़ना एक आदत नहीं,
            <br />
            <em>एक नई खिड़की है।</em>
          </h2>
          <p>
            किसी कविता में अपना मन मिल सकता है, किसी कहानी में किसी और का जीवन, और किसी लेख में दुनिया को देखने का नया तरीका। साहित्यानामा इसी संवाद को आगे बढ़ाने का एक मंच है।
          </p>
          <a
            className="btn btn-primary"
            href="#all-articles"
            onClick={(e) => {
              e.preventDefault();
              onExploreThoughts();
            }}
          >
            विचारों में उतरें <span>↗</span>
          </a>
        </div>

        <div className="editorial-stack">
          {EDITORIAL_STORIES.map((item) => (
            <article
              key={item.id}
              className="mini-story searchable"
              data-category={item.category}
              onClick={() => onOpenEditorialStory(item.id)}
            >
              <span className="mini-symbol">{item.symbol}</span>
              <div>
                <small>{item.tag}</small>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
              </div>
              <button
                type="button"
                aria-label={`पढ़ें: ${item.title}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenEditorialStory(item.id);
                }}
              >
                ↗
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
