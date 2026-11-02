import React from 'react';
import {
  Headphones,
  Video,
  Calendar,
  Trophy,
  Newspaper,
  BookMarked,
  ArrowRight,
  Play,
  Clock,
  MapPin,
  CheckCircle,
} from 'lucide-react';
import {
  AudioItem,
  VideoItem,
  EventItem,
  CompetitionItem,
  SpecialEditionItem,
} from '../../types';

interface MediaAndEventsSectionProps {
  audioTracks: AudioItem[];
  videos: VideoItem[];
  events: EventItem[];
  competitions: CompetitionItem[];
  specialEditions: SpecialEditionItem[];
  onSelectAudioTrack: (index: number) => void;
  onOpenSubmit: () => void;
  onOpenArticle: (id: string) => void;
}

export const MediaAndEventsSection: React.FC<MediaAndEventsSectionProps> = ({
  audioTracks,
  videos,
  events,
  competitions,
  specialEditions,
  onSelectAudioTrack,
  onOpenSubmit,
  onOpenArticle,
}) => {
  return (
    <div className="py-16 space-y-24 max-w-7xl mx-auto px-4 md:px-8">
      
      {/* 1. Special Editions (विशेषांक) */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-stone-200 dark:border-stone-800 pb-5">
          <div>
            <span className="text-xs font-sans-ui text-[#C89D56] font-semibold uppercase tracking-widest block mb-1">
              त्रैमासिक विशेषांक • Curated Anthologies
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-[#1A1321] dark:text-[#FBF9F4]">
              साहित्यानामा विशेषांक संग्रह
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {specialEditions.map((ed) => (
            <div
              key={ed.id}
              className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 p-7 sm:p-9 flex flex-col justify-between hover:border-[#C89D56] hover:shadow-xl transition-all"
            >
              <div>
                <span className="text-xs font-sans-ui text-[#C89D56] font-bold uppercase tracking-wider block mb-2">
                  {ed.issueNumber}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1A1321] dark:text-[#FBF9F4] mb-3 leading-snug">
                  {ed.title}
                </h3>
                <p className="font-devanagari text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                  {ed.description}
                </p>

                <div className="space-y-1.5 my-4 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 text-xs font-devanagari text-stone-700 dark:text-stone-300">
                  <span className="font-bold text-[#6E1A2D] dark:text-[#E4C88E] block mb-1">
                    अंक के प्रमुख आकर्षण:
                  </span>
                  {ed.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C89D56]" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-sans-ui">
                <span className="text-stone-500">{ed.articleCount} शोध आलेख व रचनाएँ</span>
                <button
                  onClick={() => onOpenArticle('godaan-analysis')}
                  className="text-[#6E1A2D] dark:text-[#E4C88E] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>विशेषांक पढ़ें</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Audio Literature (श्रव्य साहित्य) */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-stone-200 dark:border-stone-800 pb-5">
          <div>
            <span className="text-xs font-sans-ui text-[#C89D56] font-semibold uppercase tracking-widest block mb-1">
              ध्वनि एवं स्वर • Audio Literature & Recitations
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-[#1A1321] dark:text-[#FBF9F4]">
              श्रव्य साहित्य : शब्दों की मधुर झंकार
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audioTracks.map((track, idx) => (
            <div
              key={track.id}
              onClick={() => onSelectAudioTrack(idx)}
              className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 p-6 flex flex-col justify-between hover:border-[#C89D56] hover:shadow-xl transition-all cursor-pointer group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B1838] to-[#6E1A2D] text-[#E4C88E] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-md">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <span className="text-[11px] font-sans-ui text-[#C89D56] font-semibold block mb-1">
                  {track.genre}
                </span>
                <h4 className="font-devanagari font-bold text-lg leading-snug group-hover:text-[#6E1A2D] dark:group-hover:text-[#E4C88E] transition-colors mb-2">
                  {track.title}
                </h4>
                <p className="font-devanagari text-xs text-stone-500 mb-4">
                  {track.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-sans-ui text-stone-400">
                <span>अवधि: {track.duration}</span>
                <span className="text-[#6E1A2D] dark:text-[#E4C88E] font-semibold group-hover:underline">
                  अभी सुनें →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Video Gallery (दृश्य दीर्घा) */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-stone-200 dark:border-stone-800 pb-5">
          <div>
            <span className="text-xs font-sans-ui text-[#C89D56] font-semibold uppercase tracking-widest block mb-1">
              दृश्य दीर्घा • Literary Panels & Documentaries
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-[#1A1321] dark:text-[#FBF9F4]">
              कवि सम्मेलन एवं साहित्यिक परिचर्चा
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 overflow-hidden flex flex-col justify-between group hover:border-[#C89D56] hover:shadow-xl transition-all"
            >
              <div className="relative h-44 bg-gradient-to-br from-[#1A1321] to-[#3B1838] flex items-center justify-center text-white p-4 overflow-hidden">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-[#E4C88E] group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
                <span className="absolute bottom-3 right-3 text-[10px] font-mono bg-black/70 px-2 py-0.5 rounded text-white">
                  {vid.duration}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-sans-ui text-[#C89D56] font-semibold block mb-1">
                    {vid.category} • {vid.event}
                  </span>
                  <h4 className="font-devanagari font-bold text-base leading-snug mb-2">
                    {vid.title}
                  </h4>
                  <p className="font-devanagari text-xs text-stone-500 line-clamp-2">
                    वक्ता: {vid.speaker}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 text-xs font-sans-ui text-stone-400 flex items-center justify-between">
                  <span>पूर्ण व्याख्यान</span>
                  <span className="text-[#6E1A2D] dark:text-[#E4C88E] font-medium">देखें →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Literary Events & Competitions (उत्सव व प्रतियोगिताएँ) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Events Calendar */}
        <div>
          <div className="mb-6 border-b border-stone-200 dark:border-stone-800 pb-3">
            <span className="text-xs font-sans-ui text-[#C89D56] font-semibold uppercase tracking-widest block mb-1">
              साहित्य उत्सव • Literary Festivals & Meets
            </span>
            <h3 className="font-editorial text-2xl font-bold">आगामी साहित्यिक आयोजन</h3>
          </div>

          <div className="space-y-4">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 hover:border-[#C89D56] transition-all"
              >
                <div className="flex items-center justify-between text-xs font-sans-ui mb-2">
                  <span className="font-semibold text-[#6E1A2D] dark:text-[#E4C88E] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {ev.date}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-medium">
                    {ev.mode}
                  </span>
                </div>
                <h4 className="font-devanagari font-bold text-lg leading-snug mb-2">
                  {ev.title}
                </h4>
                <p className="font-devanagari text-xs text-stone-600 dark:text-stone-300 line-clamp-2 mb-3">
                  {ev.description}
                </p>
                <div className="text-xs font-sans-ui text-stone-400 flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
                  <span className="flex items-center gap-1 truncate max-w-xs">
                    <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                    {ev.location}
                  </span>
                  <span className="text-[#C89D56] font-semibold">निःशुल्क पंजीकरण</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitions */}
        <div>
          <div className="mb-6 border-b border-stone-200 dark:border-stone-800 pb-3">
            <span className="text-xs font-sans-ui text-[#C89D56] font-semibold uppercase tracking-widest block mb-1">
              राष्ट्रीय पुरस्कार • Writing Awards & Contests
            </span>
            <h3 className="font-editorial text-2xl font-bold">सक्रिय लेखन प्रतियोगिताएँ</h3>
          </div>

          <div className="space-y-4">
            {competitions.map((comp) => (
              <div
                key={comp.id}
                className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 hover:border-[#C89D56] transition-all"
              >
                <div className="flex items-center justify-between text-xs font-sans-ui text-stone-500 mb-2">
                  <span className="text-[#C89D56] font-bold">अंतिम तिथि: {comp.deadline}</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    {comp.prize}
                  </span>
                </div>
                <h4 className="font-devanagari font-bold text-lg mb-2">{comp.title}</h4>
                <p className="font-devanagari text-xs text-stone-600 dark:text-stone-300 mb-3">
                  <strong>विषय:</strong> {comp.theme} ({comp.wordLimit})
                </p>
                <button
                  onClick={onOpenSubmit}
                  className="w-full py-2.5 bg-[#6E1A2D] hover:bg-[#852037] text-white rounded-lg text-xs font-sans-ui font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>प्रतियोगिता हेतु प्रविष्टि भेजें</span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
};
