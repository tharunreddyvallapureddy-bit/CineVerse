import React, { useState } from 'react';
import { Movie } from '../types';
import { MOVIES_DATA } from '../data/mockData';

interface AISearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMovie: (movie: Movie) => void;
  initialQuery?: string;
}

export const AISearchModal: React.FC<AISearchModalProps> = ({
  isOpen,
  onClose,
  onSelectMovie,
  initialQuery = ''
}) => {
  const [query, setQuery] = useState(initialQuery);

  if (!isOpen) return null;

  const quickPrompts = [
    'Mind-bending cyberpunk with spatial audio',
    'Rain-slicked slow burn detective noir',
    'High octane adrenaline car chase',
    'Surrealist psychological mind bender'
  ];

  const results = MOVIES_DATA.filter(m => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      m.title.toLowerCase().includes(q) ||
      m.synopsis.toLowerCase().includes(q) ||
      m.tags.some(t => t.toLowerCase().includes(q)) ||
      m.genres.some(g => g.toLowerCase().includes(q))
    );
  });

  return (
    <div
      id="ai-search-modal"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 pt-20 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-3xl rounded-2xl bg-[#121212] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-white/10 bg-[#0a0a0a] flex items-center gap-3">
          <span className="material-symbols-outlined text-[#ff3e00] text-2xl">
            auto_awesome
          </span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask CineAI: Describe a mood, atmosphere, or visual style..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-white/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-white/40 hover:text-white rounded-lg cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-[#181818] text-xs font-semibold text-white/80 hover:text-white border border-white/10 cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Quick Prompts */}
        <div className="px-6 py-3 bg-[#0a0a0a]/60 border-b border-white/5 flex items-center gap-2 overflow-x-auto hide-scrollbar">
          <span className="text-[10px] uppercase font-bold text-white/40 whitespace-nowrap">Try CineAI:</span>
          {quickPrompts.map(prompt => (
            <button
              key={prompt}
              onClick={() => setQuery(prompt)}
              className="px-3 py-1 rounded-full bg-[#181818] hover:bg-[#ff3e00] text-[11px] text-white/80 hover:text-white border border-white/10 whitespace-nowrap transition-colors cursor-pointer"
            >
              "{prompt}"
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between text-xs text-white/40">
            <span>{results.length} Neural Matches Found</span>
            <span className="text-[11px] text-[#ff3e00] flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">psychology</span>
              Ranked by semantic affinity
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map(movie => (
              <div
                key={movie.id}
                onClick={() => {
                  onSelectMovie(movie);
                  onClose();
                }}
                className="group p-3 rounded-xl bg-[#0a0a0a] border border-white/10 hover:border-[#ff3e00]/60 flex gap-3.5 cursor-pointer transition-all hover:bg-white/5"
              >
                <img
                  src={movie.posterImage}
                  alt={movie.title}
                  className="w-16 h-24 rounded-lg object-cover flex-shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-white group-hover:text-[#ff3e00] transition-colors truncate">
                        {movie.title}
                      </h4>
                      <span className="px-1.5 py-0.2 rounded bg-[#ff3e00]/20 text-[#ff3e00] text-[10px] font-bold">
                        {movie.matchScore}%
                      </span>
                    </div>
                    <p className="text-[11px] text-white/40 mt-0.5">
                      {movie.year} • {movie.genres.slice(0, 2).join(', ')}
                    </p>
                    <p className="text-[11px] text-white/60 line-clamp-2 mt-1 leading-snug">
                      {movie.synopsis}
                    </p>
                  </div>

                  <div className="flex gap-1 mt-2">
                    {movie.tags.slice(0, 2).map(t => (
                      <span key={t} className="text-[9px] px-1.5 py-0.2 rounded bg-[#181818] text-white/60">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
