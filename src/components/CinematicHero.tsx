import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, BookOpen, Sparkles, Feather, Compass, Volume2, Award } from 'lucide-react';
import { SectionView } from '../types';

interface CinematicHeroProps {
  onNavigate: (view: SectionView) => void;
  onOpenArticle: (id: string) => void;
  onOpenAuthor: (id: string) => void;
  onOpenSubmit: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  onNavigate,
  onOpenArticle,
  onOpenAuthor,
  onOpenSubmit,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'classics' | 'modern'>('classics');

  // Interactive 3D tilt tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 18, y: -y * 18 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Canvas literary particle constellation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Stardust golden particles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.6,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.15,
      alpha: Math.random() * 0.7 + 0.2,
      golden: Math.random() > 0.3,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.golden
          ? `rgba(200, 157, 86, ${p.alpha})`
          : `rgba(255, 248, 235, ${p.alpha * 0.8})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-[#0A0D15] text-[#FBF9F4] py-12 md:py-20">
      {/* Background Cinematic Artwork with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_literary_canvas_1793591086719.jpg"
          alt="Sahityanama Literary Archive"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out opacity-45"
        />
        {/* Layered atmospheric gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070A11] via-[#0D1322]/90 to-[#0A0D15]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D15] via-transparent to-[#070A11]/60" />
      </div>

      {/* Floating Canvas Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Cinematic Typography & Editorial Mission */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Top Curatorial Badge */}
            <div className="flex items-center gap-2.5 text-xs font-sans-ui uppercase tracking-widest text-[#E4C88E] mb-5">
              <span className="w-8 h-[1px] bg-[#C89D56]" />
              <span className="font-semibold">शब्द • विचार • संवेदना</span>
              <span className="w-2 h-[1px] bg-[#C89D56]" />
              <span className="text-white/60">प्रतिष्ठित साहित्यिक मंच</span>
            </div>

            {/* Master Headline: SAHITYANAMA */}
            <h1 className="font-brand font-bold text-4xl sm:text-6xl xl:text-7xl tracking-wide text-white leading-[1.08] mb-6">
              SAHITYANAMA
              <span className="block font-devanagari font-normal text-3xl sm:text-5xl text-[#E4C88E] mt-3">
                साहित्यानामा
              </span>
            </h1>

            {/* Tagline */}
            <p className="font-devanagari text-lg sm:text-2xl text-[#E0D5C7] leading-relaxed max-w-2xl font-light mb-8 border-l-2 border-[#C89D56]/60 pl-4 py-1">
              जहाँ शब्द जीवंत होते हैं, विचार उड़ान भरते हैं और साहित्य नई पहचान बनाता है।
            </p>

            <p className="font-sans-ui text-sm sm:text-base text-stone-300 leading-relaxed max-w-xl mb-10 text-pretty">
              हिंदी साहित्य की कालजयी धरोहर से लेकर समकालीन रचनाकारों के ताज़ातरीन स्वरों तक—कहानियाँ, कविताएँ, ग़ज़लें, समालोचना और वैचारिक विमर्श का जीवंत वैश्विक मंच।
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('featured-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else onNavigate('featured');
                }}
                className="px-6 py-3.5 bg-[#C89D56] hover:bg-[#DFBA73] text-[#1A1321] rounded-lg font-sans-ui font-semibold text-sm transition-all shadow-lg shadow-[#C89D56]/20 flex items-center gap-2.5 group cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#1A1321]" />
                <span>साहित्य अन्वेषण</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('authors')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-[#C89D56] rounded-lg font-sans-ui font-medium text-sm transition-all flex items-center gap-2 cursor-pointer backdrop-blur-xs"
              >
                <BookOpen className="w-4 h-4 text-[#E4C88E]" />
                <span>रचनाकार परिचय</span>
              </button>

              <button
                onClick={onOpenSubmit}
                className="px-5 py-3.5 text-stone-300 hover:text-[#E4C88E] font-devanagari text-sm transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Feather className="w-4 h-4 text-[#C89D56]" />
                <span>अपनी रचना भेजें</span>
              </button>
            </div>

            {/* Micro Stats / Trust markers */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10 max-w-lg">
              <div>
                <span className="font-brand font-bold text-2xl sm:text-3xl text-[#E4C88E] tabular-nums block">
                  150+
                </span>
                <span className="text-xs text-stone-400 font-devanagari">कालजयी कृतियाँ</span>
              </div>
              <div>
                <span className="font-brand font-bold text-2xl sm:text-3xl text-[#E4C88E] tabular-nums block">
                  50+
                </span>
                <span className="text-xs text-stone-400 font-devanagari">महान साहित्यकार</span>
              </div>
              <div>
                <span className="font-brand font-bold text-2xl sm:text-3xl text-[#E4C88E] tabular-nums block">
                  100%
                </span>
                <span className="text-xs text-stone-400 font-devanagari">प्रामाणिक पाठ</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Tilt Book Showcase & Interactive Masterpiece */}
          <div
            className="lg:col-span-5 flex justify-center perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="relative w-full max-w-[380px] transition-transform duration-300 ease-out transform-style-3d cursor-pointer"
              style={{
                transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
              }}
              onClick={() => onOpenArticle('rashmirathi-dinkar')}
            >
              {/* Golden Ambient Aura Behind */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#C89D56]/30 via-[#5E1929]/30 to-[#3B1838]/40 rounded-2xl blur-xl -z-10" />

              {/* 3D Book Container */}
              <div className="relative rounded-2xl bg-gradient-to-br from-[#1C1424] via-[#2A162B] to-[#130E1A] p-7 border border-[#C89D56]/40 shadow-2xl gold-glow text-left overflow-hidden">
                
                {/* Book Spine Simulation */}
                <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-[#C89D56] to-[#8C6228] opacity-80" />

                {/* Decorative Floral Gold Stamp */}
                <div className="flex justify-between items-start mb-6 pl-2">
                  <div className="w-10 h-10 rounded-full border border-[#C89D56]/60 flex items-center justify-center text-[#E4C88E] bg-[#C89D56]/10">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-sans-ui uppercase tracking-widest text-[#E4C88E] bg-[#C89D56]/20 px-2.5 py-1 rounded-sm border border-[#C89D56]/40">
                    आज का विशेष पाठ
                  </span>
                </div>

                {/* Book Title */}
                <div className="pl-2">
                  <span className="text-xs font-sans-ui text-stone-400 tracking-wider uppercase block mb-1">
                    महाकाव्य खंड • रामधारी सिंह दिनकर
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-white font-bold leading-tight mb-3">
                    रश्मिरथी
                  </h3>
                  <p className="text-xs font-devanagari text-[#E4C88E] italic mb-4">
                    तृतीय सर्ग : कृष्ण की चेतावनी
                  </p>

                  {/* Poetic Stanza Preview */}
                  <div className="bg-[#120B17]/80 rounded-lg p-4 border border-white/5 font-devanagari text-sm text-[#F5EDE3] leading-relaxed mb-6 italic">
                    <p className="text-[#DFBA73] font-medium">
                      “हित-वचन नहीं तूने माना,
                      <br />
                      मैत्री का मूल्य न पहचाना,
                      <br />
                      तो ले, मैं भी अब जाता हूँ,
                      <br />
                      अन्तिम संकल्प सुनाता हूँ।
                      <br />
                      याचना नहीं, अब रण होगा...”
                    </p>
                  </div>

                  {/* Book Footer Action */}
                  <div className="flex items-center justify-between text-xs font-sans-ui pt-3 border-t border-white/10 text-stone-300">
                    <span className="flex items-center gap-1.5 text-[#E4C88E]">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>6 मिनट पठन</span>
                    </span>
                    <span className="text-white hover:text-[#E4C88E] flex items-center gap-1 font-medium transition-colors">
                      सम्पूर्ण काव्य पढ़ें →
                    </span>
                  </div>
                </div>

                {/* Page Layers Effect at Bottom Right */}
                <div className="absolute right-0 bottom-0 w-12 h-12 bg-gradient-to-tl from-white/10 to-transparent pointer-events-none" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 bg-[#6E1A2D] text-white px-4 py-2 rounded-lg text-xs font-sans-ui font-semibold shadow-lg border border-[#C89D56]/50 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#E4C88E]" />
                <span>ज्ञानपीठ व राष्ट्रकवि संकलन</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Literary Marquee Ticker */}
      <div className="mt-16 border-y border-white/10 bg-[#070A11]/90 backdrop-blur-md py-3 overflow-hidden">
        <div className="flex items-center gap-12 whitespace-nowrap animate-shimmer text-xs sm:text-sm font-devanagari text-stone-300">
          <div className="flex items-center gap-8 shrink-0">
            <span className="text-[#C89D56] font-semibold">✦ प्रेमचंद:</span>
            <span>“विपत्ति से बढ़कर अनुभव सिखाने वाला कोई विद्यालय आज तक नहीं खुला।”</span>
            <span className="text-[#C89D56] font-semibold">✦ दिनकर:</span>
            <span>“सच है, विपत्ति जब आती है, कायर को ही दहलाती है।”</span>
            <span className="text-[#C89D56] font-semibold">✦ ग़ालिब:</span>
            <span>“हज़ारों ख़्वाहिशें ऐसी कि हर ख़्वाहिश पे दम निकले।”</span>
            <span className="text-[#C89D56] font-semibold">✦ महादेवी:</span>
            <span>“दुख मेरे निकट जीवन का सबसे बड़ा वरदान है।”</span>
            <span className="text-[#C89D56] font-semibold">✦ दुष्यंत:</span>
            <span>“हो कहीं भी आग, लेकिन आग जलनी चाहिए।”</span>
          </div>
          <div className="flex items-center gap-8 shrink-0">
            <span className="text-[#C89D56] font-semibold">✦ प्रेमचंद:</span>
            <span>“विपत्ति से बढ़कर अनुभव सिखाने वाला कोई विद्यालय आज तक नहीं खुला।”</span>
            <span className="text-[#C89D56] font-semibold">✦ दिनकर:</span>
            <span>“सच है, विपत्ति जब आती है, कायर को ही दहलाती है।”</span>
            <span className="text-[#C89D56] font-semibold">✦ ग़ालिब:</span>
            <span>“हज़ारों ख़्वाहिशें ऐसी कि हर ख़्वाहिश पे दम निकले।”</span>
          </div>
        </div>
      </div>
    </section>
  );
};
