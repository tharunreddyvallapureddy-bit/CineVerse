import React, { useState } from 'react';
import { Movie, Review } from '../types';
import { MoodRadar } from './MoodRadar';
import { WATCH_PARTY_PARTICIPANTS } from '../data/mockData';

interface MovieDetailViewProps {
  movie: Movie;
  onBack: () => void;
  onPlayMovie: (movie: Movie) => void;
  onStartWatchParty: (movie: Movie) => void;
}

export const MovieDetailView: React.FC<MovieDetailViewProps> = ({
  movie,
  onBack,
  onPlayMovie,
  onStartWatchParty
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [reviewsList, setReviewsList] = useState<Review[]>(movie.reviews);
  const [newReviewText, setNewReviewText] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [showReviewInput, setShowReviewInput] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: 'You',
      initials: 'ME',
      rating: newRating,
      text: newReviewText.trim()
    };
    setReviewsList([newRev, ...reviewsList]);
    setNewReviewText('');
    setShowReviewInput(false);
  };

  return (
    <div id="movie-detail-view" className="pt-20 pb-20 min-h-screen">
      {/* 1. IMMERSIVE HERO BACKDROP */}
      <div className="relative w-full min-h-[480px] lg:h-[580px] overflow-hidden">
        {/* Backdrop Image */}
        <img
          src={movie.backdropImage}
          alt={movie.title}
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />

        {/* Cinematic Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/75 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-radial from-transparent via-[#0a0a0a]/40 to-[#0a0a0a]"></div>

        {/* Top Back navigation */}
        <div className="absolute top-6 left-4 sm:left-8 z-20">
          <button
            id="detail-back-btn"
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0a0a]/80 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 backdrop-blur-md transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            <span className="text-xs font-semibold uppercase tracking-wider">Back to Browse</span>
          </button>
        </div>

        {/* Hero Title & Primary CTAs */}
        <div className="absolute bottom-0 left-0 right-0 max-w-[1600px] mx-auto px-4 sm:px-8 pb-10 z-10">
          <div className="max-w-3xl space-y-4">
            {/* Match & Format Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#ff3e00]/20 border border-[#ff3e00]/40 text-white text-xs font-bold shadow-[0_0_12px_rgba(255,62,0,0.3)]">
                <span className="material-symbols-outlined text-[14px] text-[#ff3e00]">auto_awesome</span>
                {movie.matchScore}% Match
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-white/80">
                {movie.year}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-white/80">
                {movie.duration}
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-bold text-amber-300">
                <span className="material-symbols-outlined filled text-[14px]">star</span>
                {movie.rating} ({movie.ratingCount})
              </span>
              {movie.features.map(f => (
                <span
                  key={f}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-white/70"
                >
                  {f}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
              {movie.title}
            </h1>

            {/* Synopsis */}
            <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl">
              {movie.synopsis}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="detail-watch-now-btn"
                onClick={() => onPlayMovie(movie)}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white hover:bg-[#ff3e00] text-black hover:text-white font-black text-xs uppercase tracking-wider shadow-2xl transition-all transform hover:scale-105 cursor-pointer"
              >
                <span className="material-symbols-outlined filled text-2xl">play_arrow</span>
                <span>Watch Now</span>
              </button>

              <button
                id="detail-start-party-btn"
                onClick={() => onStartWatchParty(movie)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-xs uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer shadow-md"
              >
                <span className="material-symbols-outlined text-xl">groups</span>
                <span>Start Watch Party</span>
              </button>

              <button
                id="detail-favorite-btn"
                onClick={() => setIsFavorited(!isFavorited)}
                className={`p-3.5 rounded-xl border backdrop-blur-md transition-all cursor-pointer ${
                  isFavorited
                    ? 'bg-[#ff3e00]/20 border-[#ff3e00] text-[#ff3e00]'
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                }`}
                title={isFavorited ? 'In Favorites' : 'Add to Favorites'}
              >
                <span className="material-symbols-outlined text-xl">
                  {isFavorited ? 'favorite' : 'favorite_border'}
                </span>
              </button>

              <button
                id="detail-share-btn"
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Movie share link copied to clipboard!");
                  }
                }}
                className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white backdrop-blur-md transition-all cursor-pointer"
                title="Share"
              >
                <span className="material-symbols-outlined text-xl">share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BODY CONTENT: CAST, AI MOOD RADAR, AUDIENCE CONSENSUS, WATCH PARTY */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Columns: Cast, Mood Analysis, Audience Reviews */}
        <div className="lg:col-span-2 space-y-12">
          {/* Top Cast Row */}
          {movie.cast && movie.cast.length > 0 && (
            <section id="top-cast-section" className="space-y-4">
              <h2 className="text-xl font-bold text-white tracking-tight uppercase">Top Cast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {movie.cast.map(actor => (
                  <div
                    key={actor.id}
                    className="p-3.5 rounded-xl bg-[#121212] border border-white/10 flex items-center gap-3.5"
                  >
                    <img
                      src={actor.image}
                      alt={actor.name}
                      className="w-12 h-12 rounded-full object-cover border border-white/15 flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold text-white truncate">{actor.name}</h3>
                      <p className="text-[11px] text-white/40 truncate">{actor.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* AI Mood Analysis Radar Section */}
          <section id="ai-mood-section" className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#ff3e00]/20 flex items-center justify-center text-[#ff3e00]">
                  <span className="material-symbols-outlined text-lg">psychology</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white uppercase tracking-tight">AI Mood & Acoustic Profile</h2>
                  <p className="text-xs text-white/40">Neural breakdown across five narrative vectors</p>
                </div>
              </div>
              <span className="text-xs font-mono text-[#ff3e00] px-2.5 py-1 rounded bg-[#ff3e00]/10 border border-[#ff3e00]/30 self-start sm:self-auto">
                Model: CineNeural-v4
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Radar Chart */}
              <div className="flex justify-center">
                <MoodRadar mood={movie.mood} />
              </div>

              {/* Vector Meters */}
              <div className="space-y-3.5 text-xs">
                {[
                  { name: 'Tension & Suspense', val: movie.mood.tension, color: 'from-[#ff3e00] to-[#ffa17a]' },
                  { name: 'Action & Pacing', val: movie.mood.action, color: 'from-amber-400 to-rose-400' },
                  { name: 'Visual Aesthetics & VFX', val: movie.mood.visuals, color: 'from-white/60 to-white' },
                  { name: 'Mystery & Mind-bending', val: movie.mood.mystery, color: 'from-[#ff3e00] to-amber-400' },
                  { name: 'Narrative Tempo', val: movie.mood.pacing, color: 'from-emerald-400 to-teal-300' }
                ].map(item => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-white/70 font-medium">
                      <span>{item.name}</span>
                      <span className="font-mono text-white">{item.val}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#0a0a0a] overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                        style={{ width: `${item.val}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Audience Consensus & Reviews */}
          <section id="audience-consensus-section" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#ff3e00]">reviews</span>
                <h2 className="text-xl font-bold text-white tracking-tight uppercase">Audience Consensus</h2>
              </div>
              <button
                onClick={() => setShowReviewInput(!showReviewInput)}
                className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
              >
                {showReviewInput ? 'Cancel' : 'Write a Review'}
              </button>
            </div>

            {/* AI Summarized Badge Card */}
            <div className="p-5 rounded-xl bg-[#121212] border border-white/10 relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-bold text-[#ff3e00] mb-2">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span>AI-Summarized Consensus</span>
                <span className="text-[10px] text-white/40 font-normal">• Derived from 12,400+ verified ratings</span>
              </div>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                "{movie.audienceConsensus}"
              </p>
            </div>

            {/* Add Review Form */}
            {showReviewInput && (
              <form onSubmit={handleAddReview} className="p-4 rounded-xl bg-[#121212] border border-[#ff3e00]/40 space-y-3">
                <h4 className="text-xs font-bold text-white">Your Rating & Review</h4>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className={`p-1 cursor-pointer ${star <= newRating ? 'text-amber-400' : 'text-white/20'}`}
                    >
                      <span className="material-symbols-outlined filled text-xl">star</span>
                    </button>
                  ))}
                </div>
                <textarea
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="Share your thoughts on the cinematography, pacing, and performances..."
                  rows={3}
                  className="w-full bg-[#0a0a0a] rounded-lg p-3 text-xs text-white placeholder-white/40 border border-white/10 focus:border-[#ff3e00] focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-white hover:bg-[#ff3e00] text-black hover:text-white font-bold uppercase tracking-wider text-xs shadow-md cursor-pointer transition-colors"
                >
                  Submit Review
                </button>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-3">
              {reviewsList.map(rev => (
                <div key={rev.id} className="p-4 rounded-xl bg-[#121212] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#ff3e00]/20 border border-[#ff3e00]/40 flex items-center justify-center text-[10px] font-bold text-white">
                        {rev.initials}
                      </div>
                      <span className="text-xs font-bold text-white">{rev.author}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/5 text-white/40">Verified</span>
                    </div>
                    <div className="flex items-center text-amber-400 text-xs">
                      <span className="material-symbols-outlined filled text-[14px]">star</span>
                      <span className="ml-1 font-mono font-bold">{rev.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">{rev.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right 1 Column: Active Watch Party Card */}
        <div className="space-y-6">
          <div
            id="detail-watch-party-card"
            className="p-6 rounded-2xl bg-[#121212] border border-white/10 shadow-xl space-y-5 sticky top-24"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff3e00] animate-pulse"></span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Active Watch Party</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#ff3e00]/20 text-[#ff3e00] text-[10px] font-bold">
                Live Now
              </span>
            </div>

            <p className="text-xs text-white/60 leading-relaxed">
              3 friends are currently streaming this title in Room <strong>#CYBER-ROOM-404</strong>.
            </p>

            {/* Participants */}
            <div className="space-y-2.5 pt-1">
              {WATCH_PARTY_PARTICIPANTS.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#0a0a0a] border border-white/10"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <img
                        src={participant.avatar}
                        alt={participant.name}
                        className="w-8 h-8 rounded-full object-cover border border-white/20"
                        referrerPolicy="no-referrer"
                      />
                      {participant.reaction && (
                        <span className="absolute -bottom-1 -right-1 text-xs">{participant.reaction}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">{participant.name}</h4>
                      <p className="text-[10px] text-white/40 capitalize">{participant.status}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-white/40">
                    <span className="material-symbols-outlined text-[16px]">
                      {participant.micMuted ? 'mic_off' : 'mic'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onStartWatchParty(movie)}
              className="w-full py-3 rounded-xl bg-white hover:bg-[#ff3e00] text-black hover:text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">login</span>
              <span>Join Active Room</span>
            </button>

            <button
              onClick={() => {
                alert("Room invite link copied to clipboard: https://cineverse.app/party/CYBER-404");
              }}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">person_add</span>
              <span>Invite More Friends</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
