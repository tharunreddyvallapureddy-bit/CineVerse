import React, { useState } from 'react';
import { Movie } from '../types';
import { MOVIES_DATA, TOP_10_TODAY, PREMIERE_ATTENDEES } from '../data/mockData';

interface HomeViewProps {
  onSelectMovie: (movie: Movie) => void;
  onPlayMovie: (movie: Movie) => void;
  onStartWatchParty: (movie: Movie) => void;
  activeFilter?: string;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectMovie,
  onPlayMovie,
  onStartWatchParty
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [showAIPickTooltip, setShowAIPickTooltip] = useState(false);
  const [watchlist, setWatchlist] = useState<string[]>(['neon-resonance']);
  const [hasRsvpd, setHasRsvpd] = useState(false);

  const heroMovie = MOVIES_DATA[0]; // Neon Shadows
  const continueWatchingMovies = MOVIES_DATA.filter(m => m.progressPercent !== undefined);
  
  const allCuratedTags = ['All', '#MindBending', '#Surreal', '#Cyberpunk', '#Noir', '#HardSciFi', '#Atmospheric'];
  
  const curatedMovies = MOVIES_DATA.filter(m => {
    if (selectedTag === 'All') return true;
    return m.tags.includes(selectedTag);
  });

  const toggleWatchlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (watchlist.includes(id)) {
      setWatchlist(watchlist.filter(item => item !== id));
    } else {
      setWatchlist([...watchlist, id]);
    }
  };

  return (
    <div id="home-view-container" className="pt-18 pb-16 space-y-12">
      {/* 1. HERO BANNER SECTION */}
      <section
        id="hero-banner-section"
        className="relative w-full min-h-[580px] lg:h-[720px] rounded-2xl overflow-hidden max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 mt-4"
      >
        <div className="relative w-full h-full min-h-[560px] rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-2xl">
          {/* Hero Backdrop Image */}
          <img
            src={heroMovie.backdropImage}
            alt={heroMovie.title}
            className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />

          {/* Atmospheric Gradients & Rim light */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/75 to-transparent w-full lg:w-2/3"></div>
          <div className="absolute inset-0 bg-radial from-[#ff3e00]/10 via-transparent to-transparent opacity-40"></div>

          {/* Hero Content Overlay */}
          <div className="absolute inset-0 p-6 sm:p-10 lg:p-14 flex flex-col justify-end max-w-3xl z-10">
            {/* CineAI Pick Chip with Interactive Explainer */}
            <div className="relative mb-3 inline-block">
              <button
                id="hero-ai-pick-chip"
                onClick={() => setShowAIPickTooltip(!showAIPickTooltip)}
                onMouseEnter={() => setShowAIPickTooltip(true)}
                onMouseLeave={() => setShowAIPickTooltip(false)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff3e00]/20 backdrop-blur-md border border-[#ff3e00]/40 text-white text-xs font-semibold hover:bg-[#ff3e00]/30 transition-all cursor-pointer shadow-[0_0_15px_rgba(255,62,0,0.3)]"
              >
                <span className="material-symbols-outlined text-[16px] text-[#ff3e00]">auto_awesome</span>
                <span>CineAI Top Pick</span>
                <span className="bg-[#ff3e00] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {heroMovie.matchScore}% Match
                </span>
              </button>

              {/* Tooltip Popup */}
              {showAIPickTooltip && (
                <div className="absolute bottom-full left-0 mb-2 w-80 bg-[#181818]/95 backdrop-blur-xl border border-[#ff3e00]/30 rounded-xl p-3.5 shadow-2xl text-xs text-white/70 z-30 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center gap-1.5 text-[#ff3e00] font-semibold mb-1">
                    <span className="material-symbols-outlined text-[14px]">psychology</span>
                    Why CineAI picked this for you:
                  </div>
                  <p className="leading-relaxed text-[11px] text-white/90">
                    {heroMovie.aiPickReason}
                  </p>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-2 drop-shadow-md">
              {heroMovie.title}
            </h1>

            {/* Subtitle / Season info */}
            {heroMovie.subtitle && (
              <p className="text-sm font-semibold text-[#ff3e00] mb-3 tracking-wide">
                {heroMovie.subtitle}
              </p>
            )}

            {/* Badges & Features */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80">
                {heroMovie.year}
              </span>
              <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80">
                {heroMovie.duration}
              </span>
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-xs font-semibold text-amber-300">
                <span className="material-symbols-outlined filled text-[14px]">star</span>
                {heroMovie.rating}
              </span>
              {heroMovie.features.map(f => (
                <span
                  key={f}
                  className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-xs text-white/70"
                >
                  {f}
                </span>
              ))}
            </div>

            {/* Synopsis */}
            <p className="text-xs sm:text-sm text-white/70 line-clamp-3 mb-6 leading-relaxed max-w-2xl">
              {heroMovie.synopsis}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                id="hero-play-now-btn"
                onClick={() => onPlayMovie(heroMovie)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#ff3e00] text-black hover:text-white font-bold uppercase tracking-wider text-xs shadow-xl transition-all transform hover:scale-105 cursor-pointer"
              >
                <span className="material-symbols-outlined filled text-xl">play_arrow</span>
                <span>Play Now</span>
              </button>

              <button
                id="hero-start-party-btn"
                onClick={() => onStartWatchParty(heroMovie)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-xs uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">groups</span>
                <span>Watch Party</span>
              </button>

              <button
                id="hero-watchlist-btn"
                onClick={(e) => toggleWatchlist(heroMovie.id, e)}
                className={`p-3 rounded-xl border backdrop-blur-md transition-all cursor-pointer ${
                  watchlist.includes(heroMovie.id)
                    ? 'bg-[#ff3e00]/20 border-[#ff3e00] text-[#ff3e00]'
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                }`}
                title={watchlist.includes(heroMovie.id) ? 'In Watchlist' : 'Add to Watchlist'}
              >
                <span className="material-symbols-outlined text-xl">
                  {watchlist.includes(heroMovie.id) ? 'check' : 'add'}
                </span>
              </button>

              <button
                id="hero-info-btn"
                onClick={() => onSelectMovie(heroMovie)}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white backdrop-blur-md transition-all cursor-pointer"
                title="View Full Details"
              >
                <span className="material-symbols-outlined text-xl">info</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTINUE WATCHING WITH REAL PROGRESS BARS */}
      <section id="continue-watching-section" className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#ff3e00]">history</span>
            <h2 className="text-xl font-bold text-white tracking-tight uppercase">Continue Watching</h2>
          </div>
          <span className="text-xs text-white/40">3 items in queue</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {continueWatchingMovies.map((movie) => (
            <div
              key={movie.id}
              id={`continue-card-${movie.id}`}
              onClick={() => onPlayMovie(movie)}
              className="group relative rounded-xl bg-[#121212] border border-white/10 hover:border-[#ff3e00]/50 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-[#ff3e00]/10"
            >
              {/* Thumbnail backdrop */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#0a0a0a]">
                <img
                  src={movie.backdropImage}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>

                {/* Center Hover Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <span className="material-symbols-outlined filled text-2xl">play_arrow</span>
                  </div>
                </div>

                {/* Episodes / Time Remaining chip */}
                {movie.remainingTime && (
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-[#ff3e00] border border-white/10">
                    {movie.remainingTime}
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="relative w-full h-1.5 bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[#ff3e00] to-[#ffa17a] transition-all duration-500"
                  style={{ width: `${movie.progressPercent}%` }}
                ></div>
              </div>

              {/* Info text */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#ff3e00] transition-colors truncate">
                    {movie.title}
                  </h3>
                  <p className="text-xs text-white/40 mt-0.5">
                    {movie.subtitle || `${movie.year} • ${movie.duration}`}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectMovie(movie);
                  }}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                  title="Details"
                >
                  <span className="material-symbols-outlined text-lg">info</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CINEAI CURATED FOR YOU WITH TAG FILTERING */}
      <section id="cineai-curated-section" className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#ff3e00]">auto_awesome</span>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight uppercase">CineAI Curated For You</h2>
              <p className="text-xs text-white/40">Personalized predictions based on neural genre mapping</p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
            {allCuratedTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-[#ff3e00] text-white shadow-md'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {curatedMovies.map((movie) => (
            <div
              key={movie.id}
              id={`curated-movie-card-${movie.id}`}
              onClick={() => onSelectMovie(movie)}
              className="group relative rounded-xl bg-[#121212] border border-white/10 hover:border-[#ff3e00]/60 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-[#ff3e00]/10 flex flex-col"
            >
              {/* Poster Image */}
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#0a0a0a]">
                <img
                  src={movie.posterImage}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80"></div>

                {/* Match Badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#0a0a0a]/90 backdrop-blur-md border border-[#ff3e00]/40 text-[#ff3e00] text-[11px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
                  {movie.matchScore}%
                </div>

                {/* Quick Add to Watchlist */}
                <button
                  onClick={(e) => toggleWatchlist(movie.id, e)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/80 text-white/70 hover:text-white hover:bg-[#ff3e00]/30 transition-all opacity-0 group-hover:opacity-100"
                  title="Add to Watchlist"
                >
                  <span className="material-symbols-outlined text-sm">
                    {watchlist.includes(movie.id) ? 'check' : 'add'}
                  </span>
                </button>

                {/* Quick Play Trigger */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayMovie(movie);
                  }}
                  className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-lg transform scale-80 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all"
                  title="Play"
                >
                  <span className="material-symbols-outlined filled text-lg">play_arrow</span>
                </button>
              </div>

              {/* Title & Tags */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#ff3e00] transition-colors line-clamp-1">
                    {movie.title}
                  </h3>
                  <p className="text-[11px] text-white/40 mt-0.5">
                    {movie.year} • {movie.genres[0]}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                  {movie.tags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-white/60 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DUAL COLUMN: TOP 10 TODAY & COMMUNITY WIDGETS */}
      <section className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Top 10 Today list */}
        <div id="top-10-section" className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#ff3e00]">trending_up</span>
              <h2 className="text-xl font-bold text-white tracking-tight uppercase">Top 10 Today</h2>
            </div>
            <span className="text-xs text-white/40">Global rankings</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOP_10_TODAY.map((item) => (
              <div
                key={item.rank}
                id={`top-10-item-${item.rank}`}
                onClick={() => {
                  const matched = MOVIES_DATA.find(m => m.title.includes(item.title)) || MOVIES_DATA[1];
                  onSelectMovie(matched);
                }}
                className="group flex items-center gap-4 p-3 rounded-xl bg-[#121212] border border-white/10 hover:border-[#ff3e00]/50 transition-all cursor-pointer"
              >
                <div className="relative font-black text-3xl sm:text-4xl text-white/20 group-hover:text-[#ff3e00] transition-colors w-8 text-center font-mono">
                  {item.rank}
                </div>

                <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#0a0a0a]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white group-hover:text-[#ff3e00] transition-colors truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/40 mt-0.5">
                    {item.genreDuration}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-[#ff3e00]">
                    <span className="material-symbols-outlined text-[14px]">play_circle</span>
                    <span className="text-[11px] font-medium">Watch preview</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Streaks & Weekend Premiere Countdown */}
        <div className="space-y-6">
          {/* Watch Streaks Card */}
          <div
            id="watch-streaks-card"
            className="p-5 rounded-2xl bg-[#121212] border border-white/10 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#ff3e00]/20 flex items-center justify-center text-[#ff3e00]">
                  <span className="material-symbols-outlined filled text-lg">local_fire_department</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Watch Streak</h3>
                  <p className="text-[11px] text-white/40">Keep your daily streak alive</p>
                </div>
              </div>
              <span className="text-xl font-black text-[#ff3e00] font-mono">7 Days</span>
            </div>

            {/* Streak Progress Dots */}
            <div className="flex items-center justify-between gap-1 pt-1">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      idx <= 5
                        ? 'bg-[#ff3e00] text-white shadow-[0_0_8px_rgba(255,62,0,0.5)]'
                        : 'bg-white/5 text-white/40 border border-white/10'
                    }`}
                  >
                    {idx <= 5 ? '✓' : day}
                  </div>
                  <span className="text-[10px] text-white/40">{day}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-white/70 bg-white/5 p-2.5 rounded-lg border border-white/5">
              🔥 <strong>7-Day Milestone Reached!</strong> You unlocked the <span className="text-[#ff3e00] font-semibold">Cyberpunk Audio Preset</span> for Dolby Atmos.
            </p>
          </div>

          {/* Weekend Premiere Countdown */}
          <div
            id="weekend-premiere-card"
            className="p-5 rounded-2xl bg-[#121212] border border-white/10 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#ff3e00]/20 text-[#ff3e00] text-[10px] font-bold uppercase tracking-wider">
                Weekend Live Premiere
              </span>
              <span className="flex items-center gap-1 text-xs font-mono text-[#ff3e00]">
                <span className="w-2 h-2 rounded-full bg-[#ff3e00] animate-pulse"></span>
                48h Left
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">The Synthetics: Final War</h3>
              <p className="text-xs text-white/60 mt-1 leading-relaxed">
                Live interactive premiere with director Q&A and synchronous chat reactions.
              </p>
            </div>

            {/* Attendees & RSVP */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center -space-x-2">
                {PREMIERE_ATTENDEES.map((avatar, idx) => (
                  <img
                    key={idx}
                    src={avatar}
                    alt="Attendee"
                    className="w-7 h-7 rounded-full border-2 border-[#121212] object-cover"
                    referrerPolicy="no-referrer"
                  />
                ))}
                <div className="w-7 h-7 rounded-full bg-white/10 border-2 border-[#121212] flex items-center justify-center text-[10px] font-bold text-white">
                  +3.4k
                </div>
              </div>

              <button
                id="rsvp-premiere-btn"
                onClick={() => setHasRsvpd(!hasRsvpd)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
                  hasRsvpd
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'bg-white hover:bg-[#ff3e00] text-black hover:text-white shadow-md'
                }`}
              >
                {hasRsvpd ? '✓ RSVP Confirmed' : 'RSVP Free'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
