import React, { useState } from 'react';
import { CMS_RECENT_ITEMS } from '../data/mockData';
import { publishMovieApi } from '../services/api';
import { Movie, CMSItem } from '../types';

interface ConsoleCMSProps {
  onAddMovie?: (movie: Movie) => void;
}

export const ConsoleCMS: React.FC<ConsoleCMSProps> = ({ onAddMovie }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [items, setItems] = useState<CMSItem[]>(CMS_RECENT_ITEMS);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [runtime, setRuntime] = useState('');
  const [year, setYear] = useState('2025');
  const [selectedGenres, setSelectedGenres] = useState<string[]>(['Sci-Fi', 'Cyberpunk']);
  const [synopsis, setSynopsis] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [audioFormat, setAudioFormat] = useState('Dolby Atmos Spatial');
  const [resolution, setResolution] = useState('4K HDR10+');

  const availableGenres = ['Sci-Fi', 'Cyberpunk', 'Noir', 'Thriller', 'Mystery', 'Action', 'Psychological', 'Fantasy', 'Horror', 'Documentary'];

  const handleToggleGenre = (g: string) => {
    if (selectedGenres.includes(g)) {
      setSelectedGenres(selectedGenres.filter(item => item !== g));
    } else {
      setSelectedGenres([...selectedGenres, g]);
    }
  };

  const handleAIAutoFill = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setTitle('Chronos Paradox: Echo Chamber');
      setRuntime('2h 18m');
      setYear('2025');
      setSelectedGenres(['Sci-Fi', 'Thriller', 'Cyberpunk']);
      setSynopsis('When a temporal communications array intercepts audio recordings from 50 years in the future, an acoustic forensics analyst discovers her own voice among the casualties.');
      setPosterUrl('https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80');
      setAudioFormat('Dolby Atmos 7.1.4');
      setResolution('4K HDR10+ / Dolby Vision');
      setIsSubmitting(false);
    }, 500);
  };

  const handlePublishContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);

    const defaultPoster = posterUrl.trim() || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80';

    const moviePayload: any = {
      id: `movie-${Date.now()}`,
      title: title.trim(),
      subtitle: `${year} • ${runtime || '2h 00m'}`,
      year: year || '2025',
      duration: runtime || '2h 00m',
      rating: '5.0',
      ratingCount: '1',
      matchScore: 98,
      type: selectedGenres.includes('Series') ? 'series' : 'movie',
      genres: selectedGenres.length > 0 ? selectedGenres : ['Sci-Fi'],
      tags: ['#4KMaster', '#StudioRelease'],
      features: ['4K HDR', audioFormat],
      posterImage: defaultPoster,
      backdropImage: defaultPoster,
      synopsis: synopsis.trim() || 'Official release published by Studio Admin.',
      aiPickReason: 'Featured release uploaded by Studio Admin.',
      progressPercent: 0,
      remainingTime: runtime || '2h 00m',
      cast: [],
      mood: {
        tension: 88,
        action: 80,
        visuals: 95,
        mystery: 85,
        pacing: 75,
        description: 'High sensory neural cinema uploaded by Studio Admin.'
      },
      audienceConsensus: 'Official Studio Master release.'
    };

    // Call backend API
    const res = await publishMovieApi(moviePayload);
    const publishedMovie = res?.movie || moviePayload;

    if (onAddMovie) {
      onAddMovie(publishedMovie);
    }

    const newItem: CMSItem = {
      id: `cms-${Date.now()}`,
      title: title.trim(),
      status: 'Live',
      genre: selectedGenres.join(', ') || 'Sci-Fi',
      duration: runtime || '2h 00m',
      poster: defaultPoster
    };

    setItems([newItem, ...items]);
    setTitle('');
    setRuntime('');
    setSynopsis('');
    setPosterUrl('');
    setIsSubmitting(false);
    setCurrentStep(1);

    alert(`Successfully published "${publishedMovie.title}" to the global catalog!`);
  };

  return (
    <div id="console-cms-page" className="p-6 sm:p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight uppercase">CMS Content & AI Master Ingestion</h1>
          <p className="text-xs text-white/40 mt-1">
            Automated neural tagging, acoustic mastering, and CDN delivery orchestration
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 bg-[#121212] p-1.5 rounded-2xl border border-white/10">
          {[
            { step: 1, label: '1. Metadata' },
            { step: 2, label: '2. Media Upload' },
            { step: 3, label: '3. AI Enrich' }
          ].map(s => (
            <button
              key={s.step}
              onClick={() => setCurrentStep(s.step as 1 | 2 | 3)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentStep === s.step
                  ? 'bg-[#ff3e00] text-white shadow-md font-bold'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Ingestion Wizard Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-6 shadow-xl">
            {/* AI Auto-fill banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#ff3e00]/10 via-[#181818] to-[#121212] border border-[#ff3e00]/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#ff3e00]/20 text-[#ff3e00] flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">auto_awesome</span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">AI Neural Metadata Copilot</h3>
                  <p className="text-[11px] text-white/60">
                    Auto-generate title concepts, psychological mood vectors, and synopsis.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAIAutoFill}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-xl bg-white hover:bg-[#ff3e00] text-black hover:text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-base">psychology</span>
                <span>{isSubmitting ? 'Generating...' : 'AI Auto-Fill'}</span>
              </button>
            </div>

            {/* Ingestion Form */}
            <form onSubmit={handlePublishContent} className="space-y-5">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5">
                      Title of Movie or Series
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Neon Shadows: The Genesis Protocol"
                      className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#ff3e00] rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">
                        Runtime Duration
                      </label>
                      <input
                        type="text"
                        value={runtime}
                        onChange={(e) => setRuntime(e.target.value)}
                        placeholder="e.g. 2h 14m or 58m"
                        className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#ff3e00] rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">
                        Release Year
                      </label>
                      <input
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="2025"
                        className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#ff3e00] rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Genre Tags Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-2">
                      Primary & Neural Genre Tags
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {availableGenres.map(g => (
                        <button
                          type="button"
                          key={g}
                          onClick={() => handleToggleGenre(g)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                            selectedGenres.includes(g)
                              ? 'bg-[#ff3e00] text-white font-bold shadow-sm'
                              : 'bg-[#0a0a0a] text-white/40 hover:text-white border border-white/10'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5">
                      Synopsis & Logline
                    </label>
                    <textarea
                      value={synopsis}
                      onChange={(e) => setSynopsis(e.target.value)}
                      placeholder="Write a high-concept narrative synopsis for AI neural indexing..."
                      rows={4}
                      className="w-full bg-[#0a0a0a] border border-white/10 focus:border-[#ff3e00] rounded-xl p-3 text-xs text-white placeholder-white/40 focus:outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  {/* Master ProRes/IMF Dropzone */}
                  <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center bg-[#0a0a0a] hover:bg-white/5 transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-[#ff3e00]/10 text-[#ff3e00] flex items-center justify-center mx-auto mb-3">
                      <span className="material-symbols-outlined text-2xl">upload_file</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">Drag & Drop 4K HDR ProRes / IMF Master</h4>
                    <p className="text-xs text-white/40 mt-1">Supports ProRes 4444 XQ, DNxHR, or uncompressed MP4</p>
                    <span className="inline-block mt-3 px-3 py-1 rounded-full bg-[#181818] text-[10px] text-white/80 font-mono border border-white/10">
                      Direct High-Speed Edge Upload
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Audio Pipeline</label>
                      <select
                        value={audioFormat}
                        onChange={(e) => setAudioFormat(e.target.value)}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                      >
                        <option>Dolby Atmos 7.1.4 Spatial</option>
                        <option>DTS:X Master Audio</option>
                        <option>5.1 Surround High Definition</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">Video Master Profile</label>
                      <select
                        value={resolution}
                        onChange={(e) => setResolution(e.target.value)}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                      >
                        <option>4K HDR10+ / Dolby Vision (HEVC)</option>
                        <option>4K UHD Standard 60fps</option>
                        <option>1080p IMAX Enhanced</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#0a0a0a] border border-white/10 space-y-3">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                      <span className="material-symbols-outlined text-sm text-[#ff3e00]">auto_awesome</span>
                      Neural Mood Vector Generation
                    </h4>
                    <p className="text-xs text-white/60">
                      AI will analyze the 24 fps master frame histogram and soundscape dynamics to compute the 6-axis mood polygon.
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded bg-[#181818] text-[#ff3e00] font-mono">Tension: 88%</div>
                      <div className="p-2 rounded bg-[#181818] text-[#ff3e00] font-mono">Visuals: 94%</div>
                      <div className="p-2 rounded bg-[#181818] text-[#ff3e00] font-mono">Mystery: 90%</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-medium">
                    <span className="material-symbols-outlined text-sm text-[#ff3e00]">verified</span>
                    <span>Ready for 14 Edge CDN Nodes Global Distribution</span>
                  </div>
                </div>
              )}

              {/* Wizard Navigation Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((currentStep - 1) as 1 | 2 | 3)}
                    className="px-4 py-2 rounded-xl bg-[#181818] hover:bg-white/10 text-xs font-semibold text-white border border-white/10 cursor-pointer"
                  >
                    Previous Step
                  </button>
                ) : <div></div>}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((currentStep + 1) as 1 | 2 | 3)}
                    className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#ff3e00] text-black hover:text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#ff3e00] hover:bg-[#e03700] text-white font-black text-xs shadow-lg transition-colors cursor-pointer uppercase tracking-wider"
                  >
                    Publish to Global Catalog
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right 1 Col: System Status & Recent Ingestion Library */}
        <div className="space-y-6">
          {/* System Status Card */}
          <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Ingest Cluster Status</h3>
              <span className="w-2 h-2 rounded-full bg-[#ff3e00] animate-pulse"></span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-white/40 mb-1">
                  <span>CDN Ingest Bandwidth</span>
                  <span className="font-mono text-white">45% Capacity</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#0a0a0a] overflow-hidden">
                  <div className="h-full bg-[#ff3e00] w-[45%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-white/40 mb-1">
                  <span>AI Transcode Pipeline</span>
                  <span className="font-mono text-[#ff3e00] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff3e00] animate-ping"></span>
                    2 Active Jobs
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#0a0a0a] overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#ff3e00] to-[#ffa17a] w-[68%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Content Library */}
          <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Ingestion Library</h3>
              <span className="text-xs text-white/40">{items.length} titles</span>
            </div>

            <div className="space-y-3">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0a0a0a] border border-white/5"
                >
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="w-10 h-14 rounded-lg object-cover flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                    <p className="text-[10px] text-white/40">{item.genre} • {item.duration}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-full ${
                        item.status === 'Live'
                          ? 'bg-white/10 text-white border border-white/20'
                          : 'bg-[#ff3e00]/15 text-[#ff3e00] border border-[#ff3e00]/30 flex items-center gap-1'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
