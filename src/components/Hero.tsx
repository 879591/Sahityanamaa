import React from 'react';

interface HeroProps {
  onExploreClick: () => void;
  onAboutClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onAboutClick }) => {
  return (
    <section className="hero container">
      <div className="hero-copy">
        <div className="eyebrow">
          <span></span> हिंदी साहित्य का अपना संसार
        </div>
        <h1>
          जहाँ शब्दों में
          <br />
          <em>धड़कती है ज़िंदगी।</em>
        </h1>
        <p>
          कविता की कोमलता, कहानी की गहराई, विचारों की रोशनी और हमारी सांस्कृतिक विरासत—सब एक ही साहित्यिक ठिकाने पर।
        </p>
        <div className="hero-actions">
          <a
            className="btn btn-primary"
            href="#latest"
            onClick={(e) => {
              e.preventDefault();
              onExploreClick();
            }}
          >
            रचनाएँ पढ़ें <span>↗</span>
          </a>
          <a
            className="btn btn-ghost"
            href="#thoughts"
            onClick={(e) => {
              e.preventDefault();
              onAboutClick();
            }}
          >
            हमारे बारे में
          </a>
        </div>
        <div className="hero-note">
          <span className="note-line"></span>
          <span>पढ़िए • सोचिए • महसूस कीजिए</span>
        </div>
      </div>

      <div className="hero-art" aria-label="साहित्य और लेखन की कलात्मक सज्जा">
        <div className="art-orbit orbit-one"></div>
        <div className="art-orbit orbit-two"></div>
        <div className="book book-back"></div>
        <div className="book book-mid"></div>
        <div className="book book-front">
          <span className="book-kicker">साहित्य • संवेदना</span>
          <span className="book-title">
            शब्दों का
            <br />
            अनंत आकाश
          </span>
          <span className="book-rule"></span>
          <span className="book-bottom">साहित्यानामा</span>
        </div>
        <span className="floating quote-mark">“</span>
        <span className="floating star star-a">✳</span>
        <span className="floating star star-b">✦</span>
        <div className="art-caption">
          <span>01 / 05</span>
          <span>एक नई दृष्टि, हर दिन</span>
        </div>
      </div>
    </section>
  );
};
