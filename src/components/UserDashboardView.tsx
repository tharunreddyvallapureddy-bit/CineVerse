import React, { useState } from 'react';
import { Movie } from '../types';
import { UserProfile } from '../services/api';

interface UserDashboardViewProps {
  user: UserProfile;
  watchlistMovies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onPlayMovie: (movie: Movie) => void;
  onLogout: () => void;
}

export const UserDashboardView: React.FC<UserDashboardViewProps> = ({
  user,
  watchlistMovies,
  onSelectMovie,
  onPlayMovie,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'watchlist' | 'settings'>('watchlist');

  return (
    <div id="user-dashboard-page" className="pt-24 pb-16 px-4 sm:px-8 max-w-[1600px] mx-auto space-y-8">
      {/* User Header Profile Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#121212] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff3e00]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center gap-5 z-10">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#ff3e00] shadow-lg"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#ff3e00]/20 text-[#ff3e00] font-black text-xl flex items-center justify-center border-2 border-[#ff3e00]">
              {user.initials || user.name.slice(0, 2).toUpperCase()}
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">{user.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#ff3e00]/20 text-[#ff3e00] border border-[#ff3e00]/40 text-[11px] font-bold">
                {user.tier || 'CineVerse VIP'}
              </span>
            </div>
            <p className="text-xs text-white/50 font-mono mt-0.5">{user.email}</p>
            <p className="text-[11px] text-white/40 mt-1">Member since {user.joinDate || '2026'}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3 z-10">
          <button
            onClick={() => setActiveTab('watchlist')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'watchlist'
                ? 'bg-white text-black shadow-md'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            My Saved Watchlist ({watchlistMovies.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-white text-black shadow-md'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            Account Settings
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-xl bg-[#ff3e00]/20 hover:bg-[#ff3e00]/30 text-[#ff3e00] border border-[#ff3e00]/40 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'watchlist' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ff3e00]">bookmark</span>
              My Saved Watchlist ({watchlistMovies.length})
            </h2>
          </div>

          {watchlistMovies.length === 0 ? (
            <div className="p-12 rounded-2xl bg-[#121212] border border-white/10 text-center space-y-3">
              <span className="material-symbols-outlined text-4xl text-white/30">bookmark_border</span>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Your Watchlist is Empty</h3>
              <p className="text-xs text-white/50 max-w-sm mx-auto">
                Explore the movies catalog and click "+" to add titles to your personal queue.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {watchlistMovies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => onSelectMovie(movie)}
                  className="group relative rounded-xl bg-[#121212] border border-white/10 hover:border-[#ff3e00]/60 overflow-hidden cursor-pointer transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#0a0a0a]">
                    <img
                      src={movie.posterImage}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayMovie(movie);
                      }}
                      className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-lg transform scale-80 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all"
                    >
                      <span className="material-symbols-outlined filled text-lg">play_arrow</span>
                    </button>
                  </div>
                  <div className="p-3">
                    <h3 className="text-xs font-bold text-white group-hover:text-[#ff3e00] truncate transition-colors">
                      {movie.title}
                    </h3>
                    <p className="text-[11px] text-white/50">{movie.year} • {movie.genres[0]}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#121212] border border-white/10 space-y-6 max-w-2xl">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">Subscriber Account Details</h2>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-white/40 mb-1 font-semibold uppercase tracking-wider">Account Name</label>
              <input
                type="text"
                readOnly
                value={user.name}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-white font-semibold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-white/40 mb-1 font-semibold uppercase tracking-wider">Registered Email</label>
              <input
                type="email"
                readOnly
                value={user.email}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-white/40 mb-1 font-semibold uppercase tracking-wider">Subscription Tier</label>
              <div className="p-3 rounded-xl bg-[#0a0a0a] border border-white/10 flex items-center justify-between">
                <span className="font-bold text-[#ff3e00]">{user.tier || 'CineVerse VIP'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white font-mono">Active</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
