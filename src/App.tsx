import React, { useState, useEffect } from 'react';
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

import { UserDashboardView } from './components/UserDashboardView';
import { AuthModal } from './components/AuthModal';
import { UserProfile, fetchMoviesApi } from './services/api';
import { UserSubscription } from './types';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<UserSubscription[]>([
    {
      id: 'u-admin-master',
      name: 'Tharun Reddy',
      email: 'vallapureddytharunreddy6281@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      joinDate: 'Aug 2026',
      tier: 'CineVerse Master Admin',
      status: 'Active'
    }
  ]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [activePlayingMovie, setActivePlayingMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isWatchPartyOpen, setIsWatchPartyOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('cineverse_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    async function loadCatalog() {
      const fetched = await fetchMoviesApi();
      if (fetched && Array.isArray(fetched)) {
        setMoviesList(fetched);
        if (fetched.length > 0 && !selectedMovie) {
          setSelectedMovie(fetched[0]);
        }
      }
    }
    loadCatalog();
  }, []);

  const handleAddMovie = (newMovie: Movie) => {
    setMoviesList(prev => [newMovie, ...prev]);
    if (!selectedMovie) {
      setSelectedMovie(newMovie);
    }
  };

  const handleUserAuthSuccess = (user: UserProfile) => {
    setUserProfile(user);
    localStorage.setItem('cineverse_user', JSON.stringify(user));
    
    // Add user to registered users list if not present
    setRegisteredUsers(prev => {
      if (prev.some(u => u.email.toLowerCase() === user.email.toLowerCase())) return prev;
      return [...prev, {
        id: user.id || `usr-${Date.now()}`,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        joinDate: 'Aug 2026',
        tier: user.tier || 'CineVerse VIP',
        status: 'Active'
      }];
    });
  };

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
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          userProfile={userProfile}
          onLogout={() => {
            localStorage.removeItem('cineverse_user');
            setUserProfile(null);
          }}
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
            {currentView === 'console-overview' && (
              <ConsoleOverview moviesCount={moviesList.length} usersCount={registeredUsers.length} />
            )}
            {currentView === 'console-cms' && <ConsoleCMS onAddMovie={handleAddMovie} />}
            {currentView === 'console-users' && <ConsoleUsers users={registeredUsers} />}
          </main>
        </div>
      ) : (
        <main className="flex-1">
          {currentView === 'user-dashboard' && userProfile && (
            <UserDashboardView
              user={userProfile}
              watchlistMovies={moviesList}
              onSelectMovie={handleSelectMovie}
              onPlayMovie={handlePlayMovie}
              onLogout={() => {
                localStorage.removeItem('cineverse_user');
                setUserProfile(null);
                setCurrentView('home');
              }}
            />
          )}

          {currentView === 'home' && (
            <HomeView
              onSelectMovie={handleSelectMovie}
              onPlayMovie={handlePlayMovie}
              onStartWatchParty={handleStartWatchParty}
              movies={moviesList}
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
              onOpenConsole={() => setCurrentView('console-cms')}
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
              {moviesList.length === 0 ? (
                <div className="p-8 rounded-2xl bg-[#121212] border border-white/10 text-center text-xs text-white/60">
                  No feature films in catalog yet. Admin can upload movies from the Studio Console.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {moviesList.map(movie => (
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
              )}
            </div>
          )}

          {currentView === 'series' && (
            <div className="pt-24 max-w-[1680px] mx-auto px-4 sm:px-8 space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Original Sci-Fi Series</h1>
                <p className="text-xs text-white/50">Multi-episode neural narratives and episodic thrillers</p>
              </div>
              {moviesList.filter(m => m.type === 'series').length === 0 ? (
                <div className="p-8 rounded-2xl bg-[#121212] border border-white/10 text-center text-xs text-white/60">
                  No original series in catalog yet. Admin can upload series from the Studio Console.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {moviesList.filter(m => m.type === 'series').map((series, idx) => (
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
              )}
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
                  { tag: '#Cyberpunk & Neo-Noir', desc: 'Rain-slicked streets and neural memory heists', count: `${moviesList.filter(m => m.genres.includes('Cyberpunk')).length} Titles`, color: 'from-[#ff3e00]/20 to-[#121212]' },
                  { tag: '#HardSciFi & Deep Space', desc: 'Gravitational anomalies and quantum transit', count: `${moviesList.filter(m => m.genres.includes('Sci-Fi')).length} Titles`, color: 'from-white/10 to-[#121212]' },
                  { tag: '#MindBending Surrealism', desc: 'Non-linear realities and spatial geometry', count: `${moviesList.filter(m => m.genres.includes('Psychological')).length} Titles`, color: 'from-[#ff3e00]/15 to-[#121212]' },
                  { tag: '#HighOctane Stunts', desc: 'Adrenaline vehicular kinetic action', count: `${moviesList.filter(m => m.genres.includes('Action')).length} Titles`, color: 'from-white/5 to-[#121212]' }
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

          {currentView === 'movie-detail' && selectedMovie && (
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

      {/* 6. USER AUTH MODAL */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleUserAuthSuccess}
      />
    </div>
  );
};

export default App;
