import React from 'react';

interface FeaturedProps {
  onOpenArticle: (articleId: string) => void;
  onViewAllClick: () => void;
}

export const Featured: React.FC<FeaturedProps> = ({ onOpenArticle, onViewAllClick }) => {
  return (
    <section className="section container" id="latest">
      <div className="section-heading">
        <div>
          <div className="eyebrow">
            <span></span> अभी पढ़ें
          </div>
          <h2>
            नई <em>रचनाएँ</em>
          </h2>
        </div>
        <a
          className="text-link"
          href="#all-articles"
          onClick={(e) => {
            e.preventDefault();
            onViewAllClick();
          }}
        >
          सभी रचनाएँ देखें <span>↗</span>
        </a>
      </div>

      <div className="featured-grid">
        {/* Story Card */}
        <article
          className="feature-card feature-large searchable"
          data-category="कहानी"
          onClick={() => onOpenArticle('kiraye-ke-phool')}
        >
          <div className="feature-art art-story">
            <span className="art-label">कहानी</span>
            <span className="moon"></span>
            <span className="window-shape"></span>
            <span className="art-poem">
              कुछ बातें
              <br />
              कहानी बन जाती हैं।
            </span>
          </div>
          <div className="card-content">
            <div className="meta">
              <span>कहानी</span>
              <span>•</span>
              <span>पाठक के लिए</span>
            </div>
            <h3>किराए के फूल</h3>
            <p>रिश्तों, यादों और रोज़मर्रा की ज़िंदगी के बीच छिपे मानवीय भावों की एक कहानी।</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenArticle('kiraye-ke-phool');
              }}
            >
              रचना पढ़ें <span>↗</span>
            </button>
          </div>
        </article>

        {/* Person Card */}
        <article
          className="feature-card searchable"
          data-category="शख्सियत"
          onClick={() => onOpenArticle('devika-rani')}
        >
          <div className="feature-art art-person">
            <span className="art-label">शख्सियत</span>
            <div className="portrait-circle">दे</div>
            <span className="portrait-name">कला • सिनेमा • इतिहास</span>
          </div>
          <div className="card-content">
            <div className="meta">
              <span>शख्सियत</span>
              <span>•</span>
              <span>सिनेमा</span>
            </div>
            <h3>भारतीय सिनेमा की पहली नायिका — देविका रानी</h3>
            <p>भारतीय सिनेमा के इतिहास में एक महत्वपूर्ण नाम और उसकी विरासत।</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenArticle('devika-rani');
              }}
            >
              लेख पढ़ें <span>↗</span>
            </button>
          </div>
        </article>

        {/* Thought Card */}
        <article
          className="feature-card searchable"
          data-category="आलेख"
          onClick={() => onOpenArticle('sahitya-viheen-shiksha')}
        >
          <div className="feature-art art-thought">
            <span className="art-label">आलेख</span>
            <span className="big-quote">“</span>
            <span className="thought-line">
              साहित्य
              <br />
              और समाज
            </span>
          </div>
          <div className="card-content">
            <div className="meta">
              <span>आलेख</span>
              <span>•</span>
              <span>समाज</span>
            </div>
            <h3>साहित्यविहीन शिक्षा : संवेदनाशून्य समाज की ओर</h3>
            <p>शिक्षा और साहित्य के रिश्ते पर विचार करने का एक अवसर।</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenArticle('sahitya-viheen-shiksha');
              }}
            >
              लेख पढ़ें <span>↗</span>
            </button>
          </div>
        </article>
      </div>
    </section>
  );
};
