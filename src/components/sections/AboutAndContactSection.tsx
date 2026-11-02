import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, Feather, Shield, Heart } from 'lucide-react';

export const AboutAndContactSection: React.FC = () => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setContactName('');
      setContactEmail('');
      setContactSubject('');
      setContactMessage('');
    }, 3000);
  };

  return (
    <div className="py-20 px-4 md:px-8 max-w-7xl mx-auto space-y-24">
      
      {/* About Sahityanama Manifesto */}
      <section>
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-sans-ui text-[#C89D56] font-semibold uppercase tracking-widest block mb-2">
            संस्थान परिचय • Curatorial Manifesto
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1321] dark:text-[#FBF9F4]">
            साहित्यानामा : शब्दों से संवेदना तक
          </h2>
          <div className="w-16 h-[2px] bg-[#C89D56] mx-auto my-4" />
          <p className="font-devanagari text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
            साहित्यानामा भारतीय साहित्य, चिंतन और कलात्मक चेतना का एक ऐसा प्रतिष्ठित डिजिटल धाम है, जहाँ सदियों की वाचिक व लिखित परंपरा अत्याधुनिक तकनीक और सौंदर्यबोध के साथ सजीव होती है।
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#3B1838] text-[#E4C88E] flex items-center justify-center mb-5 font-bold text-xl border border-[#C89D56]/40">
              १
            </div>
            <h3 className="font-editorial text-2xl font-bold mb-3">धरोहर का संरक्षण</h3>
            <p className="font-devanagari text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              तुलसी, कबीर, गालिब, प्रेमचंद, दिनकर और महादेवी से लेकर स्वातंत्र्योत्तर साहित्य की दुर्लभ कृतियों का प्रामाणिक, पाठ-शोधित एवं डिजिटल संचयन।
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#5E1929] text-[#E4C88E] flex items-center justify-center mb-5 font-bold text-xl border border-[#C89D56]/40">
              २
            </div>
            <h3 className="font-editorial text-2xl font-bold mb-3">नवोन्मेष व युवा स्वर</h3>
            <p className="font-devanagari text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              21वीं सदी के बदलते सामाजिक सरोकारों, स्त्री विमर्श, दलित चेतना और तकनीकी युग के मानवीय अंतर्द्वंद्व को अभिव्यक्ति देने वाले नवोदित रचनाकारों का प्रोत्साहन।
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#1A1321] text-[#E4C88E] flex items-center justify-center mb-5 font-bold text-xl border border-[#C89D56]/40">
              ३
            </div>
            <h3 className="font-editorial text-2xl font-bold mb-3">वैश्विक वाङ्मय संवाद</h3>
            <p className="font-devanagari text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              बंगाली, मराठी, कन्नड़, मलयालम और विश्व भाषाओं के उत्कृष्ट साहित्य का हिंदी में अनुवाद तथा भारतीय मनीषा को वैश्विक पटल पर प्रतिष्ठापित करना।
            </p>
          </div>
        </div>
      </section>

      {/* Contact & Editorial Desk */}
      <section className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 p-8 sm:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-sans-ui text-[#C89D56] font-semibold uppercase tracking-widest block mb-2">
                संपर्क सूत्र • Editorial Secretariat
              </span>
              <h3 className="font-editorial text-3xl font-bold text-[#1A1321] dark:text-[#FBF9F4]">
                संपादकीय मंडल से संवाद
              </h3>
              <p className="font-devanagari text-sm text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
                पांडुलिपि प्रेषण, विशेषांक प्रस्ताव, व्याख्यानमाला सहभागिता अथवा किसी भी साहित्यिक परामर्श हेतु हमसे संपर्क करें।
              </p>
            </div>

            <div className="space-y-4 text-xs font-sans-ui text-stone-600 dark:text-stone-300">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C89D56]" />
                <span>editor@sahityanama.in • desk@sahityanama.in</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#C89D56]" />
                <span>साहित्यानामा न्यास, साहित्य अकादमी मार्ग, नई दिल्ली 110001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C89D56]" />
                <span>+91 11 2338 7200 (सोमवार - शुक्रवार, प्रातः 10 से सायं 5)</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            {isSent ? (
              <div className="p-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center font-devanagari space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-lg text-emerald-800 dark:text-emerald-200">
                  संदेश सफलतापूर्वक प्रेषित!
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300">
                  संपादकीय डेस्क आपके संदेश का 2 कार्यदिवसों में प्रत्युत्तर देगा।
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-devanagari">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans-ui font-semibold text-stone-500 mb-1">
                      आपका नाम *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="नाम लिखें"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900/70 text-sm outline-none focus:border-[#C89D56]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans-ui font-semibold text-stone-500 mb-1">
                      ईमेल पता *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900/70 text-sm font-sans-ui outline-none focus:border-[#C89D56]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans-ui font-semibold text-stone-500 mb-1">
                    विषय *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="संदेश का विषय"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900/70 text-sm outline-none focus:border-[#C89D56]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans-ui font-semibold text-stone-500 mb-1">
                    संदेश विवरण *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="अपना संदेश यहाँ लिखें..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full p-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900/70 text-sm leading-relaxed outline-none focus:border-[#C89D56]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#3B1838] hover:bg-[#501D47] text-[#E4C88E] rounded-lg text-xs font-sans-ui font-semibold flex items-center gap-2 cursor-pointer shadow-md transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>संदेश प्रेषित करें</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};
