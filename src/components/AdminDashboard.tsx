import React, { useState } from 'react';
import {
  ShieldCheck,
  PlusCircle,
  Trash2,
  Check,
  X,
  FileText,
  Users,
  MessageSquare,
  BarChart3,
  Feather,
  Bell,
  Sparkles,
  Lock,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react';
import { ArticleItem, AuthorItem, SubmissionItem, CommentItem, CategoryType } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  articles: ArticleItem[];
  authors: AuthorItem[];
  submissions: SubmissionItem[];
  comments: CommentItem[];
  onAddArticle: (article: ArticleItem) => void;
  onDeleteArticle: (id: string) => void;
  onApproveSubmission: (id: string) => void;
  onRejectSubmission: (id: string, reason: string) => void;
  onDeleteComment: (id: string) => void;
  isAdminAuthenticated: boolean;
  onAuthenticate: (success: boolean) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  articles,
  authors,
  submissions,
  comments,
  onAddArticle,
  onDeleteArticle,
  onApproveSubmission,
  onRejectSubmission,
  onDeleteComment,
  isAdminAuthenticated,
  onAuthenticate,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'submissions' | 'comments' | 'announcements'>('overview');
  
  // Login State
  const [pin, setPin] = useState('');
  const [authError, setAuthError] = useState(false);

  // New Article Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('कहानी');
  const [genre, setGenre] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [readTime, setReadTime] = useState('5 मिनट');
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Rejection modal state
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Pre-configured simple admin passcode or demo one-click
    if (pin === 'admin2026' || pin === 'sahitya' || pin === '1234') {
      onAuthenticate(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleQuickDemoLogin = () => {
    onAuthenticate(true);
    setAuthError(false);
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !authorName.trim()) return;

    const newArt: ArticleItem = {
      id: `art-${Date.now()}`,
      title: title.trim(),
      category,
      genre: genre.trim() || 'समकालीन साहित्य',
      author: authorName.trim(),
      authorId: 'premchand',
      date: '2026',
      readTime: readTime.trim() || '5 मिनट',
      excerpt: content.trim().slice(0, 140) + '...',
      content: content.trim(),
      featured: true,
      views: 10,
      likes: 1,
    };

    onAddArticle(newArt);
    setPublishSuccess(true);
    setTimeout(() => {
      setPublishSuccess(false);
      setTitle('');
      setContent('');
      setGenre('');
      setAuthorName('');
    }, 2000);
  };

  const confirmRejection = (id: string) => {
    onRejectSubmission(id, rejectReason || 'रचना में संपादन व संशोधन अपेक्षित है।');
    setRejectingId(null);
    setRejectReason('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#FBF9F4] dark:bg-[#0D1322] border border-[#C89D56]/60 rounded-2xl shadow-2xl text-[#1A1321] dark:text-[#E8E2D8] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 dark:border-stone-800 bg-[#1A1321] text-[#FBF9F4] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#3B1838] border border-[#C89D56] flex items-center justify-center text-[#E4C88E]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold">साहित्यानामा संपादकीय पीठ</h3>
              <p className="text-[11px] font-sans-ui text-[#C89D56]">
                Editorial & Governance Console
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                onClick={() => onAuthenticate(false)}
                className="text-xs text-stone-400 hover:text-white px-3 py-1 rounded border border-stone-700 cursor-pointer"
              >
                लॉगआउट
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-stone-800 text-stone-300 hover:text-red-400 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Gate if not authenticated */}
        {!isAdminAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto font-devanagari">
            <div className="w-16 h-16 rounded-full bg-[#3B1838] text-[#E4C88E] flex items-center justify-center mx-auto mb-4 border border-[#C89D56]">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="font-editorial text-2xl font-bold mb-2">संपादक प्रमाणीकरण</h4>
            <p className="text-xs text-stone-500 font-sans-ui mb-6">
              प्रशासनिक कार्यों हेतु संपादक पिन या क्रेडेंशियल दर्ज करें।
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="पिन दर्ज करें (उदा. admin2026)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full p-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-center text-lg tracking-widest outline-none focus:border-[#C89D56]"
              />
              {authError && (
                <p className="text-xs text-red-500">
                  अमान्य पिन। कृपया पुनः प्रयास करें अथवा त्वरित डेमो लॉगिन का उपयोग करें।
                </p>
              )}
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#6E1A2D] hover:bg-[#852037] text-white rounded-lg text-xs font-sans-ui font-semibold cursor-pointer shadow-md"
                >
                  संपादक पैनल में प्रवेश करें
                </button>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2 bg-[#C89D56]/20 text-[#C89D56] hover:bg-[#C89D56]/30 rounded-lg text-xs font-sans-ui font-semibold cursor-pointer border border-[#C89D56]/40"
                >
                  त्वरित डेमो एडमिन लॉगिन (1-Click)
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            {/* Admin Tabs */}
            <div className="flex border-b border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-[#161F33] text-xs font-sans-ui overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-5 py-3 flex items-center gap-2 border-b-2 font-medium transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'border-[#C89D56] text-[#6E1A2D] dark:text-[#E4C88E] bg-white dark:bg-[#0D1322]'
                    : 'border-transparent text-stone-600 dark:text-stone-400'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>सांख्यिकी व सिंहावलोकन</span>
              </button>

              <button
                onClick={() => setActiveTab('content')}
                className={`px-5 py-3 flex items-center gap-2 border-b-2 font-medium transition-colors cursor-pointer ${
                  activeTab === 'content'
                    ? 'border-[#C89D56] text-[#6E1A2D] dark:text-[#E4C88E] bg-white dark:bg-[#0D1322]'
                    : 'border-transparent text-stone-600 dark:text-stone-400'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>नई रचना प्रकाशित करें</span>
              </button>

              <button
                onClick={() => setActiveTab('submissions')}
                className={`px-5 py-3 flex items-center gap-2 border-b-2 font-medium transition-colors cursor-pointer ${
                  activeTab === 'submissions'
                    ? 'border-[#C89D56] text-[#6E1A2D] dark:text-[#E4C88E] bg-white dark:bg-[#0D1322]'
                    : 'border-transparent text-stone-600 dark:text-stone-400'
                }`}
              >
                <Feather className="w-4 h-4" />
                <span>प्राप्त रचनाएँ ({submissions.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('comments')}
                className={`px-5 py-3 flex items-center gap-2 border-b-2 font-medium transition-colors cursor-pointer ${
                  activeTab === 'comments'
                    ? 'border-[#C89D56] text-[#6E1A2D] dark:text-[#E4C88E] bg-white dark:bg-[#0D1322]'
                    : 'border-transparent text-stone-600 dark:text-stone-400'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>टिप्पणी नियंत्रण</span>
              </button>
            </div>

            {/* Admin Body */}
            <div className="p-6 overflow-y-auto flex-1">
              
              {/* TAB 1: Overview & Stats */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-white/70 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
                      <span className="text-xs font-sans-ui text-stone-500 block">कुल प्रकाशित कृतियाँ</span>
                      <span className="font-brand font-bold text-3xl text-[#C89D56] tabular-nums">
                        {articles.length}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/70 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
                      <span className="text-xs font-sans-ui text-stone-500 block">रचनाकार संग्रह</span>
                      <span className="font-brand font-bold text-3xl text-[#6E1A2D] dark:text-[#E4C88E] tabular-nums">
                        {authors.length}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/70 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
                      <span className="text-xs font-sans-ui text-stone-500 block">समीक्षाधीन प्रेषण</span>
                      <span className="font-brand font-bold text-3xl text-amber-500 tabular-nums">
                        {submissions.filter((s) => s.status === 'pending').length}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/70 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
                      <span className="text-xs font-sans-ui text-stone-500 block">सक्रिय पाठक संवाद</span>
                      <span className="font-brand font-bold text-3xl text-emerald-600 tabular-nums">
                        {comments.length}
                      </span>
                    </div>
                  </div>

                  {/* Published articles list table */}
                  <div>
                    <h4 className="font-editorial text-lg font-bold mb-3">वर्तमान प्रकाशित साहित्य सूची</h4>
                    <div className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
                      <table className="w-full text-left text-xs font-sans-ui">
                        <thead className="bg-stone-100 dark:bg-stone-800/80 text-stone-500">
                          <tr>
                            <th className="p-3 font-semibold">शीर्षक</th>
                            <th className="p-3 font-semibold">विधा</th>
                            <th className="p-3 font-semibold">लेखक</th>
                            <th className="p-3 font-semibold">पठन समय</th>
                            <th className="p-3 font-semibold text-right">कार्रवाई</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200 dark:divide-stone-800 font-devanagari">
                          {articles.map((art) => (
                            <tr key={art.id} className="hover:bg-black/5 dark:hover:bg-white/5">
                              <td className="p-3 font-semibold">{art.title}</td>
                              <td className="p-3">{art.category}</td>
                              <td className="p-3">{art.author}</td>
                              <td className="p-3 font-sans-ui text-stone-400">{art.readTime}</td>
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => onDeleteArticle(art.id)}
                                  className="text-stone-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                                  title="हटाएँ"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Content Creation */}
              {activeTab === 'content' && (
                <form onSubmit={handleCreateArticle} className="space-y-4 max-w-2xl font-devanagari">
                  <h4 className="font-editorial text-xl font-bold">नवीन रचना प्रकाशन</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-sans-ui font-semibold text-stone-500 mb-1">
                        शीर्षक *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="रचना का शीर्षक"
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
                        <option value="कहानी">कहानी</option>
                        <option value="कविता">कविता</option>
                        <option value="ग़ज़ल">ग़ज़ल व शायरी</option>
                        <option value="आलेख">साहित्यिक आलेख</option>
                        <option value="उपन्यास">उपन्यास</option>
                        <option value="धरोहर">धरोहर</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-sans-ui font-semibold text-stone-500 mb-1">
                        रचनाकार का नाम *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="लेखक का नाम"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900/70 text-sm outline-none focus:border-[#C89D56]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans-ui font-semibold text-stone-500 mb-1">
                        शैली / उप-विधा (Genre)
                      </label>
                      <input
                        type="text"
                        placeholder="उदा. छायावाद, यथार्थवाद, व्यंग्य"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900/70 text-sm outline-none focus:border-[#C89D56]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-sans-ui font-semibold text-stone-500 mb-1">
                      सम्पूर्ण रचना पाठ *
                    </label>
                    <textarea
                      rows={8}
                      required
                      placeholder="रचना का पाठ यहाँ लिखें..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900/70 text-sm leading-relaxed outline-none focus:border-[#C89D56]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#3B1838] hover:bg-[#501D47] text-[#E4C88E] font-sans-ui text-xs font-semibold rounded-lg flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>तत्काल लाइव प्रकाशित करें</span>
                  </button>

                  {publishSuccess && (
                    <p className="text-xs text-emerald-600 flex items-center gap-1.5 mt-2">
                      <CheckCircle className="w-4 h-4" />
                      रचना साहित्यानामा पर सफलतापूर्वक प्रकाशित कर दी गई है!
                    </p>
                  )}
                </form>
              )}

              {/* TAB 3: Submissions Review */}
              {activeTab === 'submissions' && (
                <div className="space-y-4">
                  <h4 className="font-editorial text-lg font-bold">लेखकों से प्राप्त रचनाएँ</h4>
                  {submissions.length === 0 ? (
                    <p className="text-sm text-stone-500">वर्तमान में कोई समीक्षाधीन प्रेषण नहीं है।</p>
                  ) : (
                    submissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-900/40"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-devanagari font-bold text-lg block">{sub.title}</span>
                            <span className="text-xs text-[#C89D56] font-sans-ui">
                              {sub.authorName} ({sub.email}) • {sub.category} • {sub.submittedAt}
                            </span>
                          </div>
                          <span
                            className={`text-[10px] font-sans-ui px-2 py-0.5 rounded font-bold uppercase ${
                              sub.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : sub.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {sub.status}
                          </span>
                        </div>

                        <div className="p-3 bg-stone-100 dark:bg-stone-800/60 rounded-lg text-xs font-devanagari my-3 leading-relaxed">
                          {sub.content}
                        </div>

                        {sub.bio && (
                          <p className="text-xs text-stone-400 font-devanagari mb-3">
                            <strong>लेखक परिचय:</strong> {sub.bio}
                          </p>
                        )}

                        {sub.status === 'pending' && (
                          <div className="flex items-center gap-3 pt-2">
                            <button
                              onClick={() => onApproveSubmission(sub.id)}
                              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-sans-ui font-semibold flex items-center gap-1.5 cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>स्वीकृत करें व प्रकाशित करें</span>
                            </button>
                            <button
                              onClick={() => setRejectingId(sub.id)}
                              className="px-4 py-1.5 bg-stone-200 dark:bg-stone-700 hover:bg-red-600 hover:text-white text-stone-700 dark:text-stone-300 rounded text-xs font-sans-ui font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>संशोधन हेतु लौटाएँ</span>
                            </button>
                          </div>
                        )}

                        {rejectingId === sub.id && (
                          <div className="mt-3 p-3 rounded-lg border border-red-300 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20 space-y-2">
                            <input
                              type="text"
                              placeholder="अस्वीकृति अथवा संशोधन का कारण..."
                              value={rejectReason}
                              onChange={(e) => setRejectReason(e.target.value)}
                              className="w-full p-2 text-xs rounded border border-stone-300 dark:border-stone-700"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => confirmRejection(sub.id)}
                                className="px-3 py-1 bg-red-600 text-white text-xs rounded cursor-pointer"
                              >
                                पुष्टि करें
                              </button>
                              <button
                                onClick={() => setRejectingId(null)}
                                className="px-3 py-1 text-xs rounded cursor-pointer"
                              >
                                रद्द
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 4: Comments Moderation */}
              {activeTab === 'comments' && (
                <div className="space-y-3">
                  <h4 className="font-editorial text-lg font-bold">पाठक टिप्पणियाँ</h4>
                  {comments.map((comm) => (
                    <div
                      key={comm.id}
                      className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-900/40 flex items-start justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-xs font-sans-ui text-stone-500 mb-1">
                          <span className="font-bold text-[#6E1A2D] dark:text-[#E4C88E]">
                            {comm.userName}
                          </span>
                          <span>•</span>
                          <span>{comm.timestamp}</span>
                        </div>
                        <p className="font-devanagari text-sm">{comm.content}</p>
                      </div>
                      <button
                        onClick={() => onDeleteComment(comm.id)}
                        className="text-stone-400 hover:text-red-500 p-1 cursor-pointer"
                        title="टिप्पणी हटाएँ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </>
        )}

      </div>
    </div>
  );
};
