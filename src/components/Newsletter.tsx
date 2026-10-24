import React, { useState } from 'react';

interface NewsletterProps {
  onSubscribe: (email: string) => void;
}

export const Newsletter: React.FC<NewsletterProps> = ({ onSubscribe }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    onSubscribe(email.trim());
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="newsletter">
      <div className="container newsletter-inner">
        <div>
          <div className="eyebrow">
            <span></span> साहित्य से जुड़े रहें
          </div>
          <h2>
            अच्छे शब्दों की <em>ख़बर रखिए।</em>
          </h2>
          <p>नई रचनाओं और साहित्यिक गतिविधियों के लिए हमसे जुड़ें।</p>
        </div>

        <form id="newsletterForm" onSubmit={handleSubmit}>
          <label htmlFor="emailInput">आपका ईमेल</label>
          <div className="newsletter-control">
            <input
              type="email"
              id="emailInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
            <button type="submit">जुड़ें ↗</button>
          </div>
          <small id="newsletterMessage">
            {submitted
              ? 'धन्यवाद! आपकी सदस्यता दर्ज कर ली गई है। शीघ्र ही साहित्यिक पत्र भेजा जाएगा।'
              : 'यह डेमो फ़ॉर्म है; ईमेल सूची से जोड़ने के लिए backend की ज़रूरत होगी।'}
          </small>
        </form>
      </div>
    </section>
  );
};
