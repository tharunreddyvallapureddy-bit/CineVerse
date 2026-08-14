import React, { useState } from 'react';
import { WATCH_PARTY_PARTICIPANTS, ADMIN_AVATAR } from '../data/mockData';
import { Movie } from '../types';

interface WatchPartyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeMovie?: Movie;
  onLaunchPartyInPlayer: (movie: Movie) => void;
}

export const WatchPartyDrawer: React.FC<WatchPartyDrawerProps> = ({
  isOpen,
  onClose,
  activeMovie,
  onLaunchPartyInPlayer
}) => {
  const [roomCode, setRoomCode] = useState('CYBER-404');
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      id="floating-watch-party-drawer"
      className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 rounded-2xl bg-[#121212]/95 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      {/* Drawer Header */}
      <div className="p-4 bg-[#0a0a0a] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff3e00] animate-pulse"></div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Live Watch Party Hub</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-white/40 hover:text-white rounded-lg transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4 text-xs">
        {/* Active Title Banner */}
        <div className="p-3 rounded-xl bg-[#0a0a0a] border border-white/10 flex items-center gap-3">
          {activeMovie && (
            <img
              src={activeMovie.posterImage}
              alt={activeMovie.title}
              className="w-10 h-14 rounded-lg object-cover"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold text-[#ff3e00] uppercase tracking-wider">Now Synchronized</span>
            <h4 className="text-xs font-bold text-white truncate">
              {activeMovie ? activeMovie.title : 'Neon Shadows: S1 E4'}
            </h4>
            <p className="text-[10px] text-white/40">Room #{roomCode} • 4 Online</p>
          </div>
        </div>

        {/* Connected Friends */}
        <div>
          <label className="block text-[11px] font-semibold text-white/40 mb-2 uppercase tracking-wider">Connected Watchers</label>
          <div className="space-y-2">
            {WATCH_PARTY_PARTICIPANTS.map(p => (
              <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-[#181818]">
                <div className="flex items-center gap-2">
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="w-7 h-7 rounded-full object-cover border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-xs font-medium text-white">{p.name}</span>
                </div>
                <div className="flex items-center gap-2 text-white/40">
                  {p.reaction && <span className="text-sm">{p.reaction}</span>}
                  <span className="material-symbols-outlined text-sm">
                    {p.micMuted ? 'mic_off' : 'mic'}
                  </span>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#181818]">
              <div className="flex items-center gap-2">
                <img
                  src={ADMIN_AVATAR}
                  alt="You"
                  className="w-7 h-7 rounded-full object-cover border-2 border-[#ff3e00]"
                  referrerPolicy="no-referrer"
                />
                <span className="text-xs font-bold text-[#ff3e00]">You (Host)</span>
              </div>
              <span className="material-symbols-outlined text-sm text-[#ff3e00]">mic</span>
            </div>
          </div>
        </div>

        {/* Room Code & Invite */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={`https://cineverse.app/party/${roomCode}`}
            className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl px-3 py-2 text-[11px] font-mono text-white/80 focus:outline-none"
          />
          <button
            onClick={handleCopyLink}
            className="px-3 py-2 rounded-xl bg-[#181818] hover:bg-white/10 text-white font-semibold text-xs border border-white/10 cursor-pointer"
          >
            {isCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Launch in Player CTA */}
        {activeMovie && (
          <button
            onClick={() => onLaunchPartyInPlayer(activeMovie)}
            className="w-full py-3 rounded-xl bg-[#ff3e00] hover:bg-[#e03700] text-white font-bold text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            <span className="material-symbols-outlined filled text-lg">play_arrow</span>
            <span>Launch Stream with Party</span>
          </button>
        )}
      </div>
    </div>
  );
};
