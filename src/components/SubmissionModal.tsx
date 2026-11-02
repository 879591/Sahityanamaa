import React, { useState } from 'react';
import { X, Feather, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CategoryType, SubmissionItem } from '../types';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (submission: Omit<SubmissionItem, 'id' | 'status' | 'submittedAt'>) => void;
}

export const SubmissionModal: React.FC<SubmissionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('कविता');
  const [genre, setGenre] = useState('');
  const [content, setContent] = useState('');
  const [bio, setBio] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !authorName.trim()) return;

    onSubmit({
      authorName: authorName.trim(),
      email: email.trim(),
      title: title.trim(),
      category,
      genre: genre.trim() || 'समकालीन',
      content: content.trim(),
      bio: bio.trim(),
    });

    // Celebratory confetti explosion
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C89D56', '#5E1929', '#3B1838', '#E4C88E'],
      });
    } catch {
      // ignore
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setTitle('');
    setContent('');
    setGenre('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FBF9F4] dark:bg-[#0D1322] border border-[#C89D56]/50 rounded-2xl shadow-2xl text-[#1A1321] dark:text-[#E8E2D8] overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#6E1A2D] text-[#E4C88E] flex items-center justify-center shadow-md border border-[#C89D56]/40">
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-2xl font-bold">साहित्यानामा रचना प्रेषण</h3>
              <p className="text-xs text-stone-500 font-devanagari">
                आपकी मौलिक कलम, लाखों प्रबुद्ध पाठकों तक
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-red-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body or Success State */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4 font-devanagari">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="font-editorial text-2xl font-bold text-stone-900 dark:text-stone-100">
                रचना सफलतापूर्वक प्राप्त हुई!
              </h4>
              <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto leading-relaxed">
                आदरणीय <strong className="text-[#6E1A2D] dark:text-[#E4C88E]">{authorName}</strong> जी, आपकी रचना ‘{title}’ साहित्यानामा संपादकीय मंडल को विचारार्थ प्रेषित कर दी गई है। स्वीकृति उपरांत आपको ईमेल द्वारा सूचित किया जाएगा।
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-[#3B1838] hover:bg-[#501D47] text-[#E4C88E] font-sans-ui text-xs font-semibold rounded-lg shadow-sm cursor-pointer"
                >
                  समाप्त करें
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-devanagari">
              
              {/* Guidelines Notice */}
              <div className="p-3.5 rounded-xl bg-[#C89D56]/10 border border-[#C89D56]/30 text-xs text-[#501D47] dark:text-[#E4C88E] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-[#C89D56]" />
                <p>
                  रचना अप्रकाशित और मौलिक होनी चाहिए। कविता, कहानी, ग़ज़ल या शोध आलेख यूनिकोड (देवनागरी) में टाइप करें।
                </p>
              </div>

              {/* Author & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans-ui font-semibold text-stone-500 mb-1">
                    रचनाकार का नाम *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. राहुल शर्मा"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900/70 text-sm outline-none focus:border-[#C89D56]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans-ui font-semibold text-stone-500 mb-1">
                    ईमेल पता (संपर्क हेतु) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900/70 text-sm font-sans-ui outline-none focus:border-[#C89D56]"
                  />
                </div>
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-sans-ui font-semibold text-stone-500 mb-1">
                    रचना का शीर्षक *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. जीवन की साँझ"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900/70 text-sm outline-none focus:border-[#C89D56]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans-ui font-semibold text-stone-500 mb-1">
                    विधा (Category) *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryType)}
                    className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900/70 text-sm outline-none focus:border-[#C89D56]"
                  >
                    <option value="कविता">कविता</option>
                    <option value="कहानी">कहानी</option>
                    <option value="ग़ज़ल">ग़ज़ल व शायरी</option>
                    <option value="आलेख">साहित्यिक आलेख</option>
                    <option value="उपन्यास">उपन्यास अंश</option>
                  </select>
                </div>
              </div>

              {/* Content Area */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-sans-ui font-semibold text-stone-500">
                    सम्पूर्ण रचना पाठ *
                  </label>
                  <span className="text-[11px] font-mono text-stone-400">
                    {wordCount} शब्द
                  </span>
                </div>
                <textarea
                  rows={8}
                  required
                  placeholder="यहाँ अपनी रचना लिखें या पेस्ट करें..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900/70 text-sm leading-relaxed outline-none focus:border-[#C89D56]"
                />
              </div>

              {/* Author Bio */}
              <div>
                <label className="block text-xs font-sans-ui font-semibold text-stone-500 mb-1">
                  संक्षिप्त लेखक परिचय (2-3 पंक्तियों में)
                </label>
                <input
                  type="text"
                  placeholder="उदा. दिल्ली विश्वविद्यालय से साहित्य में स्नातकोत्तर, दो पत्रिकाओं में कविताएँ प्रकाशित।"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900/70 text-sm outline-none focus:border-[#C89D56]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-sans-ui cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#6E1A2D] hover:bg-[#852037] text-white rounded-lg text-xs font-sans-ui font-semibold flex items-center gap-2 cursor-pointer shadow-md transition-colors"
                >
                  <Feather className="w-4 h-4" />
                  <span>संपादकीय मंडल को प्रेषित करें</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
