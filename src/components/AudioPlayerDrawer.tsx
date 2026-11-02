import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
  ChevronUp,
  ChevronDown,
  Headphones,
  Music,
} from 'lucide-react';
import { AudioItem } from '../types';

interface AudioPlayerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tracks: AudioItem[];
  currentTrackIndex: number;
  onSelectTrack: (index: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const AudioPlayerDrawer: React.FC<AudioPlayerDrawerProps> = ({
  isOpen,
  onClose,
  tracks,
  currentTrackIndex,
  onSelectTrack,
  isPlaying,
  onTogglePlay,
}) => {
  const [currentTime, setCurrentTime] = useState(42);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  // Simulated progress timer when playing
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentTrack.durationSec) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentTrack.durationSec]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = (currentTime / currentTrack.durationSec) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Mini Bar & Drawer Container */}
      <div className="max-w-4xl mx-auto px-4 pb-4">
        <div className="bg-[#120E19] text-[#FBF9F4] border border-[#C89D56]/60 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
          
          {/* Top Mini Bar */}
          <div className="p-3.5 sm:p-4 flex items-center justify-between gap-4">
            
            {/* Track Info with Equalizer */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#3B1838] to-[#5E1929] flex items-center justify-center text-[#E4C88E] border border-[#C89D56]/40 shrink-0 relative overflow-hidden">
                <Music className="w-5 h-5" />
                {isPlaying && (
                  <div className="absolute inset-0 bg-[#C89D56]/10 flex items-end justify-center gap-0.5 pb-1">
                    <span className="w-1 h-3 bg-[#C89D56] animate-pulse" />
                    <span className="w-1 h-5 bg-[#C89D56] animate-pulse delay-75" />
                    <span className="w-1 h-2 bg-[#C89D56] animate-pulse delay-150" />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-sans-ui text-[#C89D56] uppercase tracking-wider block">
                  श्रव्य साहित्य • {currentTrack.poet}
                </span>
                <h4 className="font-devanagari font-bold text-sm sm:text-base text-white truncate">
                  {currentTrack.title}
                </h4>
                <p className="text-xs text-stone-400 font-sans-ui hidden sm:block">
                  वाचन: {currentTrack.narrator}
                </p>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <button
                onClick={() =>
                  onSelectTrack(
                    currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1
                  )
                }
                className="p-2 text-stone-300 hover:text-white transition-colors cursor-pointer"
                title="पिछला पाठ"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={onTogglePlay}
                className="w-10 h-10 rounded-full bg-[#C89D56] text-[#1A1321] flex items-center justify-center hover:scale-105 transition-transform shadow-md cursor-pointer"
                title={isPlaying ? 'रोकें' : 'चलाएँ'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              <button
                onClick={() =>
                  onSelectTrack(
                    currentTrackIndex === tracks.length - 1 ? 0 : currentTrackIndex + 1
                  )
                }
                className="p-2 text-stone-300 hover:text-white transition-colors cursor-pointer"
                title="अगला पाठ"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              {/* Volume Mute Toggle */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 text-stone-300 hover:text-white transition-colors cursor-pointer hidden sm:block"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Expand Toggle */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 text-stone-400 hover:text-[#C89D56] transition-colors cursor-pointer"
                title={isExpanded ? 'सूची छुपाएँ' : 'प्लेलिस्ट देखें'}
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>

              {/* Close Bar */}
              <button
                onClick={onClose}
                className="p-2 text-stone-500 hover:text-white transition-colors cursor-pointer"
                title="प्लेयर बंद करें"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Progress Timeline Scrubber */}
          <div className="px-4 pb-2">
            <div className="relative w-full h-1.5 bg-stone-800 rounded-full cursor-pointer overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C89D56] to-[#E4C88E] transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-stone-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{currentTrack.duration}</span>
            </div>
          </div>

          {/* Expanded Playlist Drawer */}
          {isExpanded && (
            <div className="border-t border-stone-800/80 p-4 max-h-60 overflow-y-auto space-y-2 bg-[#09070D]">
              <span className="text-xs font-sans-ui uppercase tracking-wider text-[#C89D56] font-semibold block mb-2">
                श्रव्य वाचनालय सूची ({tracks.length} संकलन)
              </span>
              {tracks.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => onSelectTrack(idx)}
                  className={`w-full p-2.5 rounded-lg text-left transition-all flex items-center justify-between text-xs cursor-pointer ${
                    idx === currentTrackIndex
                      ? 'bg-[#3B1838] text-[#E4C88E] border border-[#C89D56]/50'
                      : 'text-stone-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-stone-500">0{idx + 1}</span>
                    <div>
                      <span className="font-devanagari font-bold block">{t.title}</span>
                      <span className="text-[11px] text-stone-400 font-sans-ui">
                        {t.poet} • {t.genre}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-stone-400">{t.duration}</span>
                </button>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
