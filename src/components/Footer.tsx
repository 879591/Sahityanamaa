import React, { useState } from 'react';
import { Feather, Heart, ArrowUp, Send, Check } from 'lucide-react';
import { SectionView } from '../types';

interface FooterProps {
  onNavigate: (view: SectionView) => void;
  onOpenSubmit: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenSubmit,
  onOpenAdmin,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090D16] text-[#E8E2D8] border-t border-[#1C2638] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Top Literary Quote Band */}
        <div className="border-b border-white/10 pb-12 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-[11px] font-sans-ui uppercase tracking-widest text-[#C89D56] font-semibold block mb-2">
              साहित्यानामा ध्येय वाक्य
            </span>
            <p className="font-devanagari text-xl sm:text-2xl text-stone-200 font-light italic">
              “जहाँ शब्द जीवंत होते हैं, विचार उड़ान भरते हैं और साहित्य नई पहचान बनाता है।”
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white/5 hover:bg-[#C89D56] text-white hover:text-[#1A1321] transition-all cursor-pointer border border-white/10 shrink-0"
            title="शीर्ष पर जाएँ"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Columns Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14 text-xs font-devanagari">
          
          {/* Col 1: Literature Genres */}
          <div>
            <h4 className="font-editorial text-sm font-bold text-[#E4C88E] uppercase tracking-wider mb-4 font-sans-ui">
              साहित्य विधाएँ
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('stories')}
                  className="hover:text-[#E4C88E] transition-colors cursor-pointer"
                >
                  हिंदी कहानियाँ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('poetry')}
                  className="hover:text-[#E4C88E] transition-colors cursor-pointer"
                >
                  काव्य मंजूषा (कविताएँ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ghazals')}
                  className="hover:text-[#E4C88E] transition-colors cursor-pointer"
                >
                  ग़ज़ल व शायरी
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('novels')}
                  className="hover:text-[#E4C88E] transition-colors cursor-pointer"
                >
                  उपन्यास व समीक्षा
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('articles')}
                  className="hover:text-[#E4C88E] transition-colors cursor-pointer"
                >
                  साहित्यिक आलेख
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Authors & Heritage */}
          <div>
            <h4 className="font-editorial text-sm font-bold text-[#E4C88E] uppercase tracking-wider mb-4 font-sans-ui">
              विरासत व रचनाकार
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('authors')}
                  className="hover:text-[#E4C88E] transition-colors cursor-pointer"
                >
                  महान विभूतियाँ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('emerging')}
                  className="hover:text-[#E4C88E] transition-colors cursor-pointer"
                >
                  उभरते रचनाकार
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('heritage')}
                  className="hover:text-[#E4C88E] transition-colors cursor-pointer"
                >
                  सांस्कृतिक धरोहर
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('indian-lit')}
                  className="hover:text-[#E4C88E] transition-colors cursor-pointer"
                >
                  भारतीय वाङ्मय (अनुवाद)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('special-editions')}
                  className="hover:text-[#E4C88E] transition-colors cursor-pointer"
                >
                  त्रैमासिक विशेषांक
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Media & Programs */}
          <div>
            <h4 className="font-editorial text-sm font-bold text-[#E4C88E] uppercase tracking-wider mb-4 font-sans-ui">
              माध्यम एवं उत्सव
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('audio')}
                  className="hover:text-[#E4C88E] transition-colors cursor-pointer"
                >
                  श्रव्य साहित्य (Audio)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('videos')}
                  className="hover:text-[#E4C88E] transition-colors cursor-pointer"
                >
                  दृश्य दीर्घा (Video)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-[#E4C88E] transition-colors cursor-pointer"
                >
                  साहित्य महोत्सव
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('competitions')}
                  className="hover:text-[#E4C88E] transition-colors cursor-pointer"
                >
                  लेखन प्रतियोगिताएँ
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSubmit}
                  className="hover:text-[#E4C88E] text-[#C89D56] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Feather className="w-3 h-3" />
                  <span>अपनी रचना भेजें</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-editorial text-sm font-bold text-[#E4C88E] uppercase tracking-wider mb-4 font-sans-ui">
              साहित्य पत्रिका सदस्यता
            </h4>
            <p className="text-stone-400 mb-3 leading-relaxed">
              प्रत्येक रविवार को चुनिंदा रचनाएँ, अप्रकाशित कविताएँ और साहित्यिक समीक्षाएँ अपने इनबॉक्स में प्राप्त करें।
            </p>
            {subscribed ? (
              <p className="text-xs text-emerald-400 font-sans-ui flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                सदस्यता सफलतापूर्वक दर्ज हुई!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white outline-none focus:border-[#C89D56]"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#C89D56] hover:bg-[#DFBA73] text-[#1A1321] text-xs font-sans-ui font-semibold rounded-lg cursor-pointer transition-colors"
                >
                  निःशुल्क सदस्यता लें
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Governance */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans-ui text-stone-500">
          <div className="flex items-center gap-2">
            <span className="font-brand font-bold text-stone-300">SAHITYANAMA</span>
            <span>© 2026 साहित्यानामा न्यास (Sahityanama Trust)</span>
            <span>·</span>
            <span>सर्वाधिकार सुरक्षित</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              संस्थान परिचय
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              संपर्क सूत्र
            </button>
            <button
              onClick={onOpenAdmin}
              className="hover:text-[#C89D56] transition-colors cursor-pointer"
            >
              संपादक पैनल
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
