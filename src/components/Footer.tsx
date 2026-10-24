import React from 'react';
import { CategoryType } from '../types';

interface FooterProps {
  onSelectCategory: (cat: CategoryType) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigateSection,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact">
      <div className="container footer-main">
        <div className="footer-brand">
          <a
            className="brand brand-light"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="brand-mark">
              सा<span>हि</span>
            </span>
            <span className="brand-copy">
              <strong>साहित्यानामा</strong>
              <small>शब्दों से संवेदना तक</small>
            </span>
          </a>
          <p>
            हिंदी साहित्य, कहानियों, कविताओं, ग़ज़लों, विचारों और सांस्कृतिक विरासत को समर्पित एक साहित्यिक मंच।
          </p>
          <a
            className="footer-original"
            href="https://sahityanama.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            मूल वेबसाइट देखें ↗
          </a>
        </div>

        <div className="footer-links">
          <h3>अन्वेषण</h3>
          <a
            href="#stories"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('कहानी');
              onNavigateSection('stories');
            }}
          >
            कहानी
          </a>
          <a
            href="#all-articles"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('कविता');
              onNavigateSection('all-articles');
            }}
          >
            कविता और गीत
          </a>
          <a
            href="#thoughts"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('आलेख');
              onNavigateSection('thoughts');
            }}
          >
            आलेख और विचार
          </a>
          <a
            href="#heritage"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('धरोहर');
              onNavigateSection('heritage');
            }}
          >
            इतिहास और धरोहर
          </a>
          <a
            href="#news"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('समाचार');
              onNavigateSection('news');
            }}
          >
            साहित्य समाचार
          </a>
        </div>

        <div className="footer-links">
          <h3>संपर्क</h3>
          <a href="mailto:sahityanamaa@gmail.com">sahityanamaa@gmail.com</a>
          <a
            href="https://wa.me/919930007176"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp: +91 99300 07176
          </a>
          <a
            href="https://publication.sahityanama.com/contact-us/"
            target="_blank"
            rel="noopener noreferrer"
          >
            प्रकाशन संपर्क विवरण ↗
          </a>
          <p className="small-note">
            प्रकाशन संबंधी जानकारी और संपर्क विवरण प्रकाशित स्रोतों के आधार पर दिए गए हैं।
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-inner">
          <span>© {currentYear} साहित्यानामा — साहित्य के नाम।</span>
          <span>प्रेम से पढ़ें · सम्मान से साझा करें</span>
        </div>
      </div>
    </footer>
  );
};
