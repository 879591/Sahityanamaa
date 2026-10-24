import React from 'react';

export const QuoteBand: React.FC = () => {
  return (
    <section className="quote-band" aria-label="साहित्यिक विचार">
      <div className="container quote-inner">
        <span className="quote-decoration">“</span>
        <div>
          <p>साहित्य केवल पढ़ा नहीं जाता—वह जिया जाता है।</p>
          <span>शब्दों में समय, समाज और मनुष्य की कहानी</span>
        </div>
        <span className="quote-flower">✳</span>
      </div>
    </section>
  );
};
