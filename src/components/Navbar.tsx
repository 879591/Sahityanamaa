import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  Headphones,
  User,
  ShieldCheck,
  Moon,
  Sun,
  Menu,
  X,
  Feather,
} from 'lucide-react';
import { SectionView } from '../types';

interface NavbarProps {
  currentView: SectionView;
  onNavigate: (view: SectionView) => void;
  onOpenSearch: () => void;
  onToggleAudio: () => void;
  isPlayingAudio: boolean;
  onOpenUserDashboard: () => void;
  onOpenAdmin: () => void;
  isAdmin: boolean;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenSubmit: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onToggleAudio,
  isPlayingAudio,
  onOpenUserDashboard,
  onOpenAdmin,
  isAdmin,
  isDark,
  onToggleTheme,
  onOpenSubmit,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; view: SectionView }[] = [
    { label: 'मुख्य पृष्ठ', view: 'home' },
    { label: 'कहानियाँ', view: 'stories' },
    { label: 'कविताएँ', view: 'poetry' },
    { label: 'ग़ज़ल व शायरी', view: 'ghazals' },
    { label: 'उपन्यास', view: 'novels' },
    { label: 'रचनाकार', view: 'authors' },
    { label: 'श्रव्य साहित्य', view: 'audio' },
    { label: 'विशेषांक', view: 'special-editions' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F4]/95 dark:bg-[#0D1322]/95 backdrop-blur-md border-b border-[#E8DFD6] dark:border-[#222E42] transition-colors duration-300">
      {/* Editorial Top utility ribbon */}
      <div className="bg-[#1A1321] dark:bg-[#05080E] text-[#D9C9D5] text-[11px] font-sans-ui tracking-wider py-1.5 px-4 md:px-8 border-b border-[#2C2034]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[#C89D56] font-semibold">अखिल भारतीय साहित्यिक मंच</span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:inline text-white/70 italic font-devanagari">
              जहाँ शब्द जीवंत होते हैं, विचार उड़ान भरते हैं
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onOpenSubmit}
              className="text-[#E4C88E] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Feather className="w-3.5 h-3.5" />
              <span>रचना भेजें</span>
            </button>
            <span className="text-white/30">|</span>
            <button
              onClick={onOpenAdmin}
              className={`hover:text-white transition-colors flex items-center gap-1 cursor-pointer ${
                isAdmin ? 'text-[#C89D56] font-semibold' : 'text-stone-400'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAdmin ? 'संपादक पैनल' : 'प्रशासन'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Brand) - Zone 2 (Nav links) - Zone 3 (Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element Brand Wordmark */}
        <button
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 text-left group cursor-pointer shrink-0"
        >
          <div className="w-10 h-10 rounded-lg bg-[#3B1838] dark:bg-[#501D47] text-[#C89D56] flex items-center justify-center font-brand font-bold text-xl shadow-md border border-[#C89D56]/40 group-hover:scale-105 transition-transform">
            सा
          </div>
          <div className="flex flex-col">
            <span className="font-brand font-bold text-2xl tracking-wider text-[#1A1321] dark:text-[#FBF9F4] leading-tight">
              SAHITYANAMA
            </span>
            <span className="font-devanagari text-[11px] text-[#78350F] dark:text-[#C89D56] font-medium tracking-wide">
              साहित्यानामा • शब्दों से संवेदना तक
            </span>
          </div>
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-[14px] font-devanagari font-medium text-[#4A3D4E] dark:text-[#B9C6D9]">
          {navLinks.map((link) => (
            <button
              key={link.view}
              onClick={() => {
                onNavigate(link.view);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`whitespace-nowrap transition-colors relative py-1 hover:text-[#6E1A2D] dark:hover:text-[#E4C88E] cursor-pointer ${
                currentView === link.view
                  ? 'text-[#6E1A2D] dark:text-[#E4C88E] font-semibold'
                  : ''
              }`}
            >
              {link.label}
              {currentView === link.view && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C89D56] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Actions & Utilities */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Audio toggle button */}
          <button
            onClick={onToggleAudio}
            title="श्रव्य साहित्य प्लेयर"
            className={`p-2 md:px-3 md:py-2 rounded-lg border transition-all flex items-center gap-2 text-xs font-sans-ui cursor-pointer ${
              isPlayingAudio
                ? 'bg-[#3B1838] text-[#E4C88E] border-[#C89D56] shadow-sm animate-pulse'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-[#C89D56]'
            }`}
          >
            <Headphones className="w-4 h-4" />
            <span className="hidden xl:inline font-medium">श्रव्य साहित्य</span>
          </button>

          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="p-2 md:px-3 md:py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#161F33] text-stone-700 dark:text-stone-300 hover:border-[#C89D56] transition-colors flex items-center gap-2 text-xs font-sans-ui cursor-pointer shadow-xs"
            title="साहित्य खोजें (Cmd+K)"
          >
            <Search className="w-4 h-4 text-stone-500" />
            <span className="hidden md:inline font-devanagari">खोजें...</span>
            <kbd className="hidden md:inline text-[10px] bg-stone-100 dark:bg-stone-800 text-stone-500 px-1.5 py-0.5 rounded border border-stone-300 dark:border-stone-700 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* User Reader Profile / Dashboard */}
          <button
            onClick={onOpenUserDashboard}
            className="p-2 md:px-3 md:py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#161F33] text-stone-700 dark:text-stone-300 hover:border-[#C89D56] transition-colors flex items-center gap-1.5 text-xs font-sans-ui cursor-pointer shadow-xs"
            title="पाठक डैशबोर्ड व सहेजे गए लेख"
          >
            <User className="w-4 h-4 text-[#C89D56]" />
            <span className="hidden sm:inline font-devanagari">पाठक कक्ष</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#161F33] text-stone-600 dark:text-stone-300 hover:text-[#C89D56] transition-colors cursor-pointer"
            title={isDark ? 'प्रकाशित शैली' : 'गोधूलि / डार्क शैली'}
          >
            {isDark ? <Sun className="w-4 h-4 text-[#E4C88E]" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#161F33] text-stone-700 dark:text-stone-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBF9F4] dark:bg-[#0D1322] border-b border-[#E8DFD6] dark:border-[#222E42] px-6 py-4 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 text-sm font-devanagari">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => {
                  onNavigate(link.view);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-left py-2 px-3 rounded-md transition-colors ${
                  currentView === link.view
                    ? 'bg-[#3B1838] text-white font-semibold'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-800 flex justify-between gap-3">
            <button
              onClick={() => {
                onOpenSubmit();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center text-xs font-semibold bg-[#6E1A2D] text-white rounded-lg shadow-sm"
            >
              रचना भेजें
            </button>
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-xs border border-stone-300 dark:border-stone-700 rounded-lg text-stone-700 dark:text-stone-300"
            >
              प्रशासन
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
