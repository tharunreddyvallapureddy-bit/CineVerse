import React, { useState } from 'react';
import { ViewMode, Movie } from './types';
import { MOVIES_DATA } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { MovieDetailView } from './components/MovieDetailView';
import { PlayerView } from './components/PlayerView';
import { ConsoleSidebar } from './components/ConsoleSidebar';
import { ConsoleOverview } from './components/ConsoleOverview';
import { ConsoleCMS } from './components/ConsoleCMS';
import { ConsoleUsers } from './components/ConsoleUsers';
import { WatchPartyDrawer } from './components/WatchPartyDrawer';
import { AISearchModal } from './components/AISearchModal';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedMovie, setSelectedMovie] = useState<Movie>(MOVIES_DATA[0]);
  const [activePlayingMovie, setActivePlayingMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isWatchPartyOpen, setIsWatchPartyOpen] = useState(false);

  const isConsoleView = currentView.startsWith('console');

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setCurrentView('movie-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayMovie = (movie: Movie) => {
    setActivePlayingMovie(movie);
  };

  const handleStartWatchParty = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsWatchPartyOpen(true);
  };

  const handleLaunchPartyInPlayer = (movie: Movie) => {
    setIsWatchPartyOpen(false);
    setActivePlayingMovie(movie);
  };

  return (
    <div id="cineverse-app-root" className="min-h-screen bg-[#0a0a0a] text-[#f2f2f2] flex flex-col">
      {/* 1. TOP NAVBAR (For Consumer Views) */}
      {!isConsoleView && (
        <Navbar
          currentView={currentView}
          onNavigate={(v) => {
            setCurrentView(v);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectMovie={handleSelectMovie}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          onOpenSearchModal={() => setIsSearchModalOpen(true)}
          onToggleWatchParty={() => setIsWatchPartyOpen(!isWatchPartyOpen)}
          isWatchPartyOpen={isWatchPartyOpen}
        />
      )}

      {/* 2. MAIN BODY CONTENT */}
      {isConsoleView ? (
        <div className="flex min-h-screen">
          {/* Console Sidebar */}
          <ConsoleSidebar
            currentView={currentView}
            onNavigate={(v) => setCurrentView(v)}
          />

          {/* Console Sub-Screens */}
          <main className="flex-1 bg-[#0a0a0a] overflow-y-auto min-h-screen">
            {currentView === 'console-overview' && <ConsoleOverview />}
            {currentView === 'console-cms' && <ConsoleCMS />}
            {currentView === 'console-users' && <ConsoleUsers />}
          </main>
        </div>
      ) : (
        <main className="flex-1">
          {currentView === 'home' && (
            <HomeView
              onSelectMovie={handleSelectMovie}
              onPlayMovie={handlePlayMovie}
              onStartWatchParty={handleStartWatchParty}
            />
          )}

          {currentView === 'movies' && (
            <div className="pt-24 max-w-[1680px] mx-auto px-4 sm:px-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Feature Films & Premieres</h1>
                  <p className="text-xs text-white/50">All 4K HDR master theatrical releases</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {MOVIES_DATA.map(movie => (
                  <div
                    key={movie.id}
                    onClick={() => handleSelectMovie(movie)}
                    className="group relative rounded-xl bg-[#121212] border border-white/10 hover:border-[#ff3e00]/60 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-[#ff3e00]/10 flex flex-col"
                  >
                    <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#0a0a0a]">
                      <img
                        src={movie.posterImage}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#0a0a0a]/90 backdrop-blur-md border border-[#ff3e00]/40 text-[#ff3e00] text-[11px] font-bold">
                        {movie.matchScore}%
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-xs font-bold text-white group-hover:text-[#ff3e00] truncate transition-colors">{movie.title}</h3>
                      <p className="text-[11px] text-white/50">{movie.year} • {movie.genres[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'series' && (
            <div className="pt-24 max-w-[1680px] mx-auto px-4 sm:px-8 space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Original Sci-Fi Series</h1>
                <p className="text-xs text-white/50">Multi-episode neural narratives and episodic thrillers</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOVIES_DATA.filter(m => m.type === 'series').concat(MOVIES_DATA[0], MOVIES_DATA[2]).map((series, idx) => (
                  <div
                    key={`${series.id}-${idx}`}
                    onClick={() => handleSelectMovie(series)}
                    className="group rounded-2xl bg-[#121212] border border-white/10 overflow-hidden cursor-pointer hover:border-[#ff3e00]/60 transition-all shadow-lg"
                  >
                    <div className="relative aspect-video w-full overflow-hidden">
                      <img
                        src={series.backdropImage}
                        alt={series.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
                      <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-xs font-mono text-[#ff3e00] border border-white/10">
                        {series.episodesInfo || 'Season 1'}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-white group-hover:text-[#ff3e00] transition-colors">{series.title}</h3>
                      <p className="text-xs text-white/60 line-clamp-2 mt-1">{series.synopsis}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'categories' && (
            <div className="pt-24 max-w-[1680px] mx-auto px-4 sm:px-8 space-y-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Browse by Neural Aesthetic</h1>
                <p className="text-xs text-white/50">Algorithmic mood tags and acoustic formats</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { tag: '#Cyberpunk & Neo-Noir', desc: 'Rain-slicked streets and neural memory heists', count: '14 Titles', color: 'from-[#ff3e00]/20 to-[#121212]' },
                  { tag: '#HardSciFi & Deep Space', desc: 'Gravitational anomalies and quantum transit', count: '9 Titles', color: 'from-white/10 to-[#121212]' },
                  { tag: '#MindBending Surrealism', desc: 'Non-linear realities and spatial geometry', count: '12 Titles', color: 'from-[#ff3e00]/15 to-[#121212]' },
                  { tag: '#HighOctane Stunts', desc: 'Adrenaline vehicular kinetic action', count: '8 Titles', color: 'from-white/5 to-[#121212]' }
                ].map((cat) => (
                  <div
                    key={cat.tag}
                    onClick={() => setCurrentView('movies')}
                    className={`p-6 rounded-2xl bg-gradient-to-br ${cat.color} bg-[#121212] border border-white/10 hover:border-[#ff3e00] cursor-pointer transition-all hover:scale-[1.02] shadow-xl`}
                  >
                    <h3 className="text-base font-bold text-white">{cat.tag}</h3>
                    <p className="text-xs text-white/60 mt-2 leading-relaxed">{cat.desc}</p>
                    <span className="inline-block mt-4 text-[11px] font-mono text-[#ff3e00] font-semibold">
                      {cat.count} →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'movie-detail' && (
            <MovieDetailView
              movie={selectedMovie}
              onBack={() => setCurrentView('home')}
              onPlayMovie={handlePlayMovie}
              onStartWatchParty={handleStartWatchParty}
            />
          )}

          {/* Footer on Consumer Views */}
          <Footer />
        </main>
      )}

      {/* 3. FULL SCREEN VIDEO PLAYER MODAL / OVERLAY */}
      {activePlayingMovie && (
        <PlayerView
          movie={activePlayingMovie}
          onClose={() => setActivePlayingMovie(null)}
        />
      )}

      {/* 4. FLOATING WATCH PARTY DRAWER */}
      <WatchPartyDrawer
        isOpen={isWatchPartyOpen}
        onClose={() => setIsWatchPartyOpen(false)}
        activeMovie={selectedMovie}
        onLaunchPartyInPlayer={handleLaunchPartyInPlayer}
      />

      {/* 5. AI SEARCH MODAL */}
      <AISearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectMovie={handleSelectMovie}
        initialQuery={searchQuery}
      />
    </div>
  );
};

export default App;
