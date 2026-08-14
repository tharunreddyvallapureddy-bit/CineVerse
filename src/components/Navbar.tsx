import React, { useState } from 'react';
import { ViewMode, Movie } from '../types';
import { LOGO_URL, ADMIN_AVATAR } from '../data/mockData';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onSelectMovie: (movie: Movie) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenSearchModal: () => void;
  onToggleWatchParty: () => void;
  isWatchPartyOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  searchQuery,
  onSearchChange,
  onOpenSearchModal,
  onToggleWatchParty,
  isWatchPartyOpen
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isConsole = currentView.startsWith('console');

  return (
    <header
      id="main-navbar"
      className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 transition-all duration-300"
    >
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Left: Brand & Navigation */}
        <div className="flex items-center gap-8">
          <button
            id="brand-logo-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group focus:outline-none"
          >
            <div className="relative w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#ff3e00] to-[#ff6a3d] p-[1px] shadow-[0_0_15px_rgba(255,62,0,0.35)]">
              <img
                src={LOGO_URL}
                alt="CineVerse Logo"
                className="w-full h-full object-cover rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-black tracking-widest text-xl text-white group-hover:text-[#ff3e00] transition-colors">
              CINEVERSE
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              id="nav-home-btn"
              onClick={() => onNavigate('home')}
              className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                currentView === 'home'
                  ? 'text-white bg-white/10 border border-white/15'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </button>
            <button
              id="nav-movies-btn"
              onClick={() => onNavigate('movies')}
              className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                currentView === 'movies'
                  ? 'text-white bg-white/10 border border-white/15'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Movies
            </button>
            <button
              id="nav-series-btn"
              onClick={() => onNavigate('series')}
              className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                currentView === 'series'
                  ? 'text-white bg-white/10 border border-white/15'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Series
            </button>
            <button
              id="nav-categories-btn"
              onClick={() => onNavigate('categories')}
              className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                currentView === 'categories'
                  ? 'text-white bg-white/10 border border-white/15'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Categories
            </button>
          </nav>
        </div>

        {/* Center: AI Search input */}
        <div className="flex-1 max-w-xl mx-4 hidden lg:block">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-white/40 text-xl pointer-events-none">
              search
            </span>
            <input
              id="global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onClick={onOpenSearchModal}
              placeholder="Ask CineAI: e.g. 'mind-bending cyber noir' or title..."
              className="w-full bg-[#121212] hover:bg-[#181818] focus:bg-[#181818] text-sm text-white placeholder-white/40 rounded-full pl-11 pr-28 py-2 border border-white/10 focus:border-[#ff3e00] focus:outline-none focus:ring-1 focus:ring-[#ff3e00]/40 transition-all"
            />
            <div className="absolute right-2 flex items-center gap-1.5 bg-[#ff3e00]/15 border border-[#ff3e00]/30 text-[#ff3e00] px-2.5 py-0.5 rounded-full text-xs font-semibold">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              <span>AI Match</span>
            </div>
          </div>
        </div>

        {/* Right: Actions & Switchers */}
        <div className="flex items-center gap-3">
          {/* Mobile search button */}
          <button
            id="mobile-search-btn"
            onClick={onOpenSearchModal}
            className="lg:hidden p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">search</span>
          </button>

          {/* Watch Party Toggle */}
          <button
            id="watch-party-toggle-btn"
            onClick={onToggleWatchParty}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              isWatchPartyOpen
                ? 'bg-[#ff3e00] text-white shadow-[0_0_15px_rgba(255,62,0,0.5)]'
                : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
            }`}
          >
            <span className="material-symbols-outlined text-sm">groups</span>
            <span className="hidden sm:inline">Watch Party</span>
            <span className="w-2 h-2 rounded-full bg-[#ff3e00] animate-pulse"></span>
          </button>

          {/* Console / Studio Mode Switcher */}
          <button
            id="studio-console-mode-btn"
            onClick={() => onNavigate(isConsole ? 'home' : 'console-overview')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              isConsole
                ? 'bg-white text-black font-bold uppercase tracking-wider shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10'
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {isConsole ? 'tv' : 'dashboard'}
            </span>
            <span className="hidden sm:inline">
              {isConsole ? 'Consumer View' : 'Studio Console'}
            </span>
          </button>

          {/* Notifications */}
          <button
            id="nav-notifications-btn"
            className="relative p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#ff3e00] rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="relative group">
            <button
              id="nav-profile-btn"
              className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-[#ff3e00]/50 transition-all cursor-pointer"
            >
              <img
                src={ADMIN_AVATAR}
                alt="User Profile"
                className="w-8 h-8 rounded-full object-cover border border-white/20"
                referrerPolicy="no-referrer"
              />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-white/10 px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/5"
          >
            Home
          </button>
          <button
            onClick={() => { onNavigate('movies'); setIsMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:bg-white/5"
          >
            Movies
          </button>
          <button
            onClick={() => { onNavigate('series'); setIsMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:bg-white/5"
          >
            Series
          </button>
          <button
            onClick={() => { onNavigate('categories'); setIsMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:bg-white/5"
          >
            Categories
          </button>
          <button
            onClick={() => { onNavigate('console-overview'); setIsMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#ff3e00] hover:bg-white/5 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">dashboard</span>
            Studio Console
          </button>
        </div>
      )}
    </header>
  );
};
