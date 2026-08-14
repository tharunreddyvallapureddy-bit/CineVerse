import React, { useState, useEffect, useRef } from 'react';
import { Movie, ChatMessage, WatchPartyParticipant } from '../types';
import { INITIAL_CHAT_MESSAGES, WATCH_PARTY_PARTICIPANTS, ADMIN_AVATAR } from '../data/mockData';

interface PlayerViewProps {
  movie: Movie;
  onClose: () => void;
}

interface FloatingReaction {
  id: number;
  emoji: string;
  left: number; // percentage
}

export const PlayerView: React.FC<PlayerViewProps> = ({ movie, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTimeSec, setCurrentTimeSec] = useState(1455); // 24:15
  const durationSec = 3480; // 58:00
  const [volume, setVolume] = useState(85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [subtitles, setSubtitles] = useState<string>('English [CC]');
  const [quality, setQuality] = useState<string>('4K HDR');
  const [showSettings, setShowSettings] = useState(false);
  const [isPartySidebarOpen, setIsPartySidebarOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputMsg, setInputMsg] = useState('');
  const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([]);
  const [controlsVisible, setControlsVisible] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-increment playback timer when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeSec(prev => (prev < durationSec ? prev + 1 : 0));
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, durationSec]);

  // Scroll chat to bottom on new message
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleMouseMove = () => {
    setControlsVisible(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setControlsVisible(false);
    }, 4000);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const newMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      user: 'You',
      avatar: ADMIN_AVATAR,
      isSelf: true,
      text: inputMsg.trim(),
      time: formatTime(currentTimeSec)
    };
    setChatMessages(prev => [...prev, newMsg]);
    setInputMsg('');
  };

  const triggerReaction = (emoji: string) => {
    const reactionId = Date.now() + Math.random();
    const randomLeft = 20 + Math.random() * 60;
    setFloatingReactions(prev => [...prev, { id: reactionId, emoji, left: randomLeft }]);
    setTimeout(() => {
      setFloatingReactions(prev => prev.filter(r => r.id !== reactionId));
    }, 2000);
  };

  const progressPercent = (currentTimeSec / durationSec) * 100;

  return (
    <div
      id="video-player-root"
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 bg-black flex flex-col lg:flex-row select-none overflow-hidden"
    >
      {/* 1. MAIN VIDEO CANVAS & CINEMATIC STREAM */}
      <div className="relative flex-1 h-full bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
        {/* Animated background movie canvas representing the video stream */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={movie.backdropImage}
            alt={movie.title}
            className={`w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'scale-105 filter brightness-95' : 'scale-100 filter brightness-75 blur-[1px]'}`}
            referrerPolicy="no-referrer"
          />

          {/* Simulated Cyberpunk Stream Overlay / Scanlines */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none"></div>
          <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/80 pointer-events-none"></div>

          {/* Subtitles Overlay */}
          {subtitles !== 'Off' && (
            <div className="absolute bottom-28 left-0 right-0 flex justify-center pointer-events-none px-6">
              <span className="bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-md text-white text-sm sm:text-base font-medium tracking-wide shadow-lg border border-white/10">
                "The neural fragments are stabilizing... deciphering the code."
              </span>
            </div>
          )}
        </div>

        {/* Floating Animated Reaction Emojis */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
          {floatingReactions.map(r => (
            <div
              key={r.id}
              style={{ left: `${r.left}%`, bottom: '20%' }}
              className="absolute text-4xl sm:text-5xl animate-float-up pointer-events-none drop-shadow-[0_0_10px_rgba(255,62,0,0.8)]"
            >
              {r.emoji}
            </div>
          ))}
        </div>

        {/* TOP OVERLAY HEADER */}
        <div
          className={`absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-40 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${
            controlsVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-4">
            <button
              id="player-back-btn"
              onClick={onClose}
              className="p-2.5 rounded-full bg-black/60 hover:bg-white/10 text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer"
              title="Close Player"
            >
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>

            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight uppercase">
                {movie.title}
              </h2>
              <p className="text-xs text-[#ff3e00]">
                {movie.subtitle || `${movie.year} • ${movie.duration}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-white/5 backdrop-blur-md border border-white/15 text-xs font-mono text-white/80">
              {quality}
            </span>
            <button
              id="toggle-party-sidebar-btn"
              onClick={() => setIsPartySidebarOpen(!isPartySidebarOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border transition-all cursor-pointer ${
                isPartySidebarOpen
                  ? 'bg-[#ff3e00] text-white border-[#ff3e00] shadow-[0_0_15px_rgba(255,62,0,0.4)]'
                  : 'bg-black/60 text-white border-white/20 hover:bg-black/80'
              }`}
            >
              <span className="material-symbols-outlined text-base">groups</span>
              <span className="hidden sm:inline">Watch Party</span>
              <span className="w-2 h-2 rounded-full bg-[#ff3e00] animate-pulse"></span>
            </button>
          </div>
        </div>

        {/* CENTER BIG PLAY/PAUSE TRIGGER (ON CLICK CANVAS) */}
        <div
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 cursor-pointer flex items-center justify-center"
        >
          {!isPlaying && (
            <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center shadow-2xl backdrop-blur-md transform scale-110 transition-transform">
              <span className="material-symbols-outlined filled text-4xl ml-1">play_arrow</span>
            </div>
          )}
        </div>

        {/* BOTTOM FLOATING GLASSMORHPIC CONTROLS */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-40 transition-opacity duration-300 ${
            controlsVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="max-w-4xl mx-auto space-y-3 bg-[#121212]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
            {/* Seek Bar */}
            <div className="space-y-1">
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickPct = (e.clientX - rect.left) / rect.width;
                  setCurrentTimeSec(clickPct * durationSec);
                }}
                className="relative w-full h-2 rounded-full bg-white/10 cursor-pointer group"
              >
                {/* Buffered line */}
                <div className="absolute h-full rounded-full bg-white/20 w-[70%]"></div>
                {/* Played line */}
                <div
                  className="absolute h-full rounded-full bg-gradient-to-r from-[#ff3e00] to-[#ffa17a]"
                  style={{ width: `${progressPercent}%` }}
                ></div>
                {/* Scrubber thumb */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_10px_#ff3e00] opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `calc(${progressPercent}% - 8px)` }}
                ></div>
              </div>

              <div className="flex justify-between text-[11px] font-mono text-white/40">
                <span>{formatTime(currentTimeSec)}</span>
                <span>{formatTime(durationSec)}</span>
              </div>
            </div>

            {/* Control Bar Actions */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              {/* Left Controls: Play/Pause, -10s, +10s, Volume */}
              <div className="flex items-center gap-3">
                <button
                  id="player-play-btn"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-white hover:bg-[#ff3e00] text-black hover:text-white flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined filled text-2xl">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>

                <button
                  id="player-rewind-btn"
                  onClick={() => setCurrentTimeSec(Math.max(0, currentTimeSec - 10))}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  title="Rewind 10s"
                >
                  <span className="material-symbols-outlined text-xl">replay_10</span>
                </button>

                <button
                  id="player-forward-btn"
                  onClick={() => setCurrentTimeSec(Math.min(durationSec, currentTimeSec + 10))}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  title="Forward 10s"
                >
                  <span className="material-symbols-outlined text-xl">forward_10</span>
                </button>

                {/* Volume Controls */}
                <div className="flex items-center gap-2 ml-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 text-white/60 hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {isMuted || volume === 0 ? 'volume_off' : volume > 50 ? 'volume_up' : 'volume_down'}
                    </span>
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(Number(e.target.value));
                      if (isMuted) setIsMuted(false);
                    }}
                    className="w-16 sm:w-24 h-1.5 rounded-full bg-white/20 accent-[#ff3e00] cursor-pointer"
                  />
                </div>
              </div>

              {/* Right Controls: Subtitles, Speed, Quality, Fullscreen */}
              <div className="flex items-center gap-2">
                {/* Subtitles toggle */}
                <button
                  onClick={() => setSubtitles(subtitles === 'Off' ? 'English [CC]' : 'Off')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-all cursor-pointer ${
                    subtitles !== 'Off'
                      ? 'bg-[#ff3e00]/20 border-[#ff3e00] text-white'
                      : 'bg-white/5 border-white/10 text-white/40 hover:text-white'
                  }`}
                  title="Subtitles"
                >
                  CC {subtitles !== 'Off' ? 'ON' : 'OFF'}
                </button>

                {/* Playback Speed selector */}
                <select
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                  className="bg-[#181818] text-xs text-white/80 border border-white/10 rounded-md px-2 py-1 focus:outline-none cursor-pointer"
                >
                  <option value={0.75}>0.75x</option>
                  <option value={1}>1.0x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2.0x</option>
                </select>

                {/* Quality selector */}
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="bg-[#181818] text-xs text-[#ff3e00] border border-[#ff3e00]/40 rounded-md px-2 py-1 focus:outline-none cursor-pointer"
                >
                  <option value="1080p">1080p HD</option>
                  <option value="4K HDR">4K HDR</option>
                  <option value="Dolby Vision">Dolby Vision</option>
                </select>

                {/* Fullscreen Button */}
                <button
                  onClick={() => {
                    if (!document.fullscreenElement) {
                      document.documentElement.requestFullscreen().catch(() => {});
                    } else {
                      document.exitFullscreen().catch(() => {});
                    }
                  }}
                  className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  title="Fullscreen"
                >
                  <span className="material-symbols-outlined text-xl">fullscreen</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LIVE WATCH PARTY SIDEBAR */}
      {isPartySidebarOpen && (
        <div
          id="player-watch-party-sidebar"
          className="w-full lg:w-96 h-80 lg:h-full bg-[#0a0a0a] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col z-40"
        >
          {/* Party Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#121212]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ff3e00]">groups</span>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Watch Party</h3>
                <p className="text-[10px] text-white/40">Room: #CYBER-404 • 4 Watching</p>
              </div>
            </div>

            <button
              onClick={() => setIsPartySidebarOpen(false)}
              className="p-1 text-white/40 hover:text-white rounded-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          {/* Active Participants Avatars Bar */}
          <div className="p-3 bg-[#121212]/60 border-b border-white/5 flex items-center justify-between gap-2 overflow-x-auto hide-scrollbar">
            <div className="flex items-center gap-3">
              {WATCH_PARTY_PARTICIPANTS.map(p => (
                <div key={p.id} className="relative flex flex-col items-center">
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="w-8 h-8 rounded-full object-cover border border-white/20"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[9px] text-white/60 truncate max-w-[48px] mt-0.5">{p.name}</span>
                </div>
              ))}
              <div className="relative flex flex-col items-center">
                <img
                  src={ADMIN_AVATAR}
                  alt="You"
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#ff3e00]"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[9px] text-[#ff3e00] font-bold mt-0.5">You</span>
              </div>
            </div>
          </div>

          {/* Chat Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {chatMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.isSelf ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <img
                  src={msg.avatar}
                  alt={msg.user}
                  className="w-7 h-7 rounded-full object-cover flex-shrink-0 mt-0.5 border border-white/20"
                  referrerPolicy="no-referrer"
                />
                <div className={`max-w-[80%] space-y-0.5 ${msg.isSelf ? 'items-end text-right' : 'items-start text-left'}`}>
                  <div className="flex items-center gap-1 text-[10px] text-white/40">
                    <span className="font-semibold text-white">{msg.user}</span>
                    {msg.time && <span>• {msg.time}</span>}
                  </div>
                  <div
                    className={`p-2.5 rounded-xl text-xs leading-relaxed ${
                      msg.isSelf
                        ? 'bg-[#ff3e00] text-white font-medium rounded-tr-none'
                        : 'bg-[#181818] text-white/90 border border-white/10 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Reaction Emojis Row */}
          <div className="px-4 py-2 bg-[#121212] border-t border-white/10 flex items-center justify-around">
            {['🔥', '🤯', '😂', '👀', '🍿', '👏'].map(emoji => (
              <button
                key={emoji}
                onClick={() => triggerReaction(emoji)}
                className="text-lg hover:scale-125 transition-transform p-1 cursor-pointer active:scale-95"
                title={`Send ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-white/10 bg-[#0a0a0a] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Send message to party..."
              className="flex-1 bg-[#181818] rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/40 border border-white/10 focus:border-[#ff3e00] focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-white hover:bg-[#ff3e00] text-black hover:text-white transition-colors cursor-pointer flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
