import React, { useState } from 'react';
import {
  X,
  User,
  Bookmark,
  History,
  Feather,
  Settings,
  LogOut,
  ChevronRight,
  BookOpen,
  Trash2,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { ArticleItem, SubmissionItem, UserProfile } from '../types';

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  bookmarkedArticles: ArticleItem[];
  userSubmissions: SubmissionItem[];
  onRemoveBookmark: (id: string) => void;
  onSelectArticle: (id: string) => void;
  onOpenSubmit: () => void;
  onUpdateProfile: (name: string, email: string) => void;
}

export const UserDashboardModal: React.FC<UserDashboardModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  bookmarkedArticles,
  userSubmissions,
  onRemoveBookmark,
  onSelectArticle,
  onOpenSubmit,
  onUpdateProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'history' | 'submissions' | 'profile'>('bookmarks');
  const [userName, setUserName] = useState(userProfile.name);
  const [userEmail, setUserEmail] = useState(userProfile.email);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(userName, userEmail);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#FBF9F4] dark:bg-[#0D1322] border border-[#C89D56]/50 rounded-2xl shadow-2xl text-[#1A1321] dark:text-[#E8E2D8] overflow-hidden flex flex-col max-h-[88vh]">
        
        {/* Header Bar */}
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#3B1838] text-[#E4C88E] flex items-center justify-center font-bold text-xl border-2 border-[#C89D56]">
              {userProfile.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-editorial text-2xl font-bold">{userProfile.name}</h3>
                <span className="text-[10px] font-sans-ui bg-[#C89D56]/20 text-[#C89D56] px-2 py-0.5 rounded font-semibold border border-[#C89D56]/30 uppercase">
                  {userProfile.role === 'admin' ? 'प्रधान संपादक' : 'साहित्य अनुरागी'}
                </span>
              </div>
              <p className="text-xs text-stone-500 font-sans-ui">{userProfile.email}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-red-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-[#161F33] text-xs font-sans-ui overflow-x-auto">
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-5 py-3 flex items-center gap-2 border-b-2 font-medium transition-colors cursor-pointer ${
              activeTab === 'bookmarks'
                ? 'border-[#C89D56] text-[#6E1A2D] dark:text-[#E4C88E] bg-white dark:bg-[#0D1322]'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>सहेजे गए पृष्ठ ({bookmarkedArticles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-5 py-3 flex items-center gap-2 border-b-2 font-medium transition-colors cursor-pointer ${
              activeTab === 'history'
                ? 'border-[#C89D56] text-[#6E1A2D] dark:text-[#E4C88E] bg-white dark:bg-[#0D1322]'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <History className="w-4 h-4" />
            <span>पठन इतिहास</span>
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-5 py-3 flex items-center gap-2 border-b-2 font-medium transition-colors cursor-pointer ${
              activeTab === 'submissions'
                ? 'border-[#C89D56] text-[#6E1A2D] dark:text-[#E4C88E] bg-white dark:bg-[#0D1322]'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Feather className="w-4 h-4" />
            <span>मेरी रचनाएँ ({userSubmissions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-5 py-3 flex items-center gap-2 border-b-2 font-medium transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'border-[#C89D56] text-[#6E1A2D] dark:text-[#E4C88E] bg-white dark:bg-[#0D1322]'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>खाता सेटिंग्स</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: Bookmarks */}
          {activeTab === 'bookmarks' && (
            <div>
              {bookmarkedArticles.length === 0 ? (
                <div className="text-center py-12 text-stone-500 font-devanagari">
                  <Bookmark className="w-10 h-10 mx-auto text-[#C89D56]/50 mb-3" />
                  <p className="text-lg">आपने अभी तक कोई रचना सहेजी नहीं है।</p>
                  <p className="text-xs text-stone-400 mt-1">
                    किसी भी कहानी या कविता को पढ़ते समय ऊपर बुकमार्क आइकन दबाकर सहेजें।
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookmarkedArticles.map((art) => (
                    <div
                      key={art.id}
                      className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-900/40 flex items-center justify-between group hover:border-[#C89D56] transition-all"
                    >
                      <button
                        onClick={() => {
                          onSelectArticle(art.id);
                          onClose();
                        }}
                        className="text-left flex-1 cursor-pointer"
                      >
                        <div className="flex items-center gap-2 text-xs font-sans-ui text-[#C89D56] mb-1">
                          <span>{art.category}</span>
                          <span>·</span>
                          <span className="text-stone-500">{art.author}</span>
                          <span>·</span>
                          <span className="text-stone-500">{art.readTime}</span>
                        </div>
                        <h4 className="font-devanagari font-bold text-lg group-hover:text-[#6E1A2D] dark:group-hover:text-[#E4C88E] transition-colors">
                          {art.title}
                        </h4>
                        <p className="text-xs text-stone-500 line-clamp-1 mt-1 font-devanagari">
                          {art.excerpt}
                        </p>
                      </button>

                      <button
                        onClick={() => onRemoveBookmark(art.id)}
                        className="p-2 text-stone-400 hover:text-red-500 transition-colors ml-4 cursor-pointer"
                        title="हटाएँ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: History */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <span className="text-xs font-sans-ui text-stone-500 uppercase tracking-wider block mb-2">
                हाल ही में पढ़े गए पृष्ठ (पठन प्रगति)
              </span>
              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-900/40 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-sans-ui text-[#C89D56]">
                    <span>कविता</span>
                    <span>·</span>
                    <span className="text-stone-500">रामधारी सिंह दिनकर</span>
                  </div>
                  <h4 className="font-devanagari font-bold text-base mt-1">रश्मिरथी : कृष्ण की चेतावनी</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-32 h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-[#C89D56]" />
                    </div>
                    <span className="text-[10px] font-mono text-stone-500">100% पूर्ण</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onSelectArticle('rashmirathi-dinkar');
                    onClose();
                  }}
                  className="px-3 py-1.5 text-xs bg-[#3B1838] text-[#E4C88E] rounded-md font-sans-ui cursor-pointer"
                >
                  पुनः पढ़ें
                </button>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-900/40 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-sans-ui text-[#C89D56]">
                    <span>कहानी</span>
                    <span>·</span>
                    <span className="text-stone-500">मुंशी प्रेमचंद</span>
                  </div>
                  <h4 className="font-devanagari font-bold text-base mt-1">ईदगाह</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-32 h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                      <div className="w-[75%] h-full bg-[#C89D56]" />
                    </div>
                    <span className="text-[10px] font-mono text-stone-500">75% पूर्ण</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onSelectArticle('eidgah-premchand');
                    onClose();
                  }}
                  className="px-3 py-1.5 text-xs bg-[#3B1838] text-[#E4C88E] rounded-md font-sans-ui cursor-pointer"
                >
                  आगे पढ़ें
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: My Submissions */}
          {activeTab === 'submissions' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-sans-ui text-stone-500 uppercase tracking-wider">
                  आपके द्वारा प्रेषित रचनाएँ
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenSubmit();
                  }}
                  className="px-3 py-1.5 bg-[#6E1A2D] text-white rounded-lg text-xs font-sans-ui font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Feather className="w-3.5 h-3.5" />
                  <span>नई रचना भेजें</span>
                </button>
              </div>

              {userSubmissions.length === 0 ? (
                <div className="text-center py-12 text-stone-500 font-devanagari">
                  <Feather className="w-10 h-10 mx-auto text-[#C89D56]/50 mb-3" />
                  <p className="text-lg">आपने अभी तक कोई रचना प्रेषित नहीं की है।</p>
                  <p className="text-xs text-stone-400 mt-1">
                    साहित्यानामा पर अपनी कविता, कहानी या आलेख भेजें और लाखों पाठकों तक पहुँचें।
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {userSubmissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-900/40"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-sans-ui text-[#C89D56] font-semibold">
                          {sub.category} • {sub.submittedAt}
                        </span>
                        <span
                          className={`text-[10px] font-sans-ui px-2 py-0.5 rounded-full font-bold uppercase ${
                            sub.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : sub.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          {sub.status === 'approved'
                            ? 'प्रकाशित / स्वीकृत'
                            : sub.status === 'rejected'
                            ? 'संशोधन अपेक्षित'
                            : 'संपादकीय समीक्षाधीन'}
                        </span>
                      </div>
                      <h4 className="font-devanagari font-bold text-lg">{sub.title}</h4>
                      <p className="font-devanagari text-xs text-stone-500 line-clamp-2 mt-1">
                        {sub.content}
                      </p>
                      {sub.feedback && (
                        <div className="mt-3 p-2.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-xs font-devanagari text-stone-700 dark:text-stone-300 border-l-2 border-[#C89D56]">
                          <span className="font-bold text-[#6E1A2D] dark:text-[#E4C88E]">
                            संपादक टिप्पणी:
                          </span>{' '}
                          {sub.feedback}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Profile & Preferences */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-sans-ui font-semibold text-stone-500 mb-1">
                  पूरा नाम
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900/70 text-sm font-devanagari outline-none focus:border-[#C89D56]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-sans-ui font-semibold text-stone-500 mb-1">
                  ईमेल पता
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900/70 text-sm font-sans-ui outline-none focus:border-[#C89D56]"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#3B1838] hover:bg-[#501D47] text-[#E4C88E] rounded-lg text-xs font-sans-ui font-semibold flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>परिवर्तन सहेजें</span>
                </button>
                {savedSuccess && (
                  <p className="text-xs text-emerald-600 mt-2 font-devanagari">
                    प्रोफाइल सफलतापूर्वक अपडेट हो गई है!
                  </p>
                )}
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
