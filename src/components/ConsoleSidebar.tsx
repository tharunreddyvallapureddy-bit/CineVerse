import React from 'react';
import { ViewMode } from '../types';
import { LOGO_URL, ADMIN_AVATAR } from '../data/mockData';

interface ConsoleSidebarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
}

export const ConsoleSidebar: React.FC<ConsoleSidebarProps> = ({ currentView, onNavigate }) => {
  return (
    <aside
      id="console-sidebar"
      className="w-64 bg-[#0a0a0a] border-r border-white/10 flex flex-col justify-between flex-shrink-0 min-h-screen py-6 px-4"
    >
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#ff3e00] to-[#ff6a3d] p-[1px]">
            <img
              src={LOGO_URL}
              alt="CineVerse Logo"
              className="w-full h-full object-cover rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="font-black tracking-widest text-base text-white uppercase">CINEVERSE</h2>
            <p className="text-[10px] text-[#ff3e00] font-mono uppercase tracking-wider font-semibold">
              Studio Console
            </p>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-1">
          <p className="px-3 text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2">
            Main Management
          </p>

          <button
            id="console-nav-overview"
            onClick={() => onNavigate('console-overview')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              currentView === 'console-overview'
                ? 'bg-[#ff3e00] text-white shadow-[0_0_15px_rgba(255,62,0,0.3)]'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-lg">dashboard</span>
            <span>Overview & Telemetry</span>
          </button>

          <button
            id="console-nav-cms"
            onClick={() => onNavigate('console-cms')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              currentView === 'console-cms'
                ? 'bg-[#ff3e00] text-white shadow-[0_0_15px_rgba(255,62,0,0.3)]'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-lg">movie</span>
            <span>CMS & AI Ingestion</span>
          </button>

          <button
            id="console-nav-users"
            onClick={() => onNavigate('console-users')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              currentView === 'console-users'
                ? 'bg-[#ff3e00] text-white shadow-[0_0_15px_rgba(255,62,0,0.3)]'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-lg">group</span>
            <span>Users & Subscriptions</span>
          </button>
        </nav>

        {/* Platform Tools */}
        <div className="space-y-1 pt-2 border-t border-white/10">
          <p className="px-3 text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2">
            System
          </p>

          <button
            onClick={() => alert("AI Model Orchestration & Cloud CDN settings are operational.")}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-white/60 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">tune</span>
            <span>Neural Model v4.2</span>
          </button>

          <button
            onClick={() => alert("Edge CDN Ingestion Node: Tokyo, Frankfurt, US-East: All Healthy.")}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-white/60 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">hub</span>
            <span>CDN Ingestion (14 Nodes)</span>
          </button>
        </div>
      </div>

      {/* Footer / Switch back to OTT Viewer & Admin badge */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <button
          id="console-return-app-btn"
          onClick={() => onNavigate('home')}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span>Back to Consumer OTT</span>
        </button>

        <div className="flex items-center gap-3 p-2 rounded-xl bg-[#121212] border border-white/10">
          <img
            src={ADMIN_AVATAR}
            alt="Studio Admin"
            className="w-8 h-8 rounded-full object-cover border border-[#ff3e00]"
            referrerPolicy="no-referrer"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-white truncate">Studio Master</h4>
            <p className="text-[10px] text-[#ff3e00] font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3e00]"></span>
              Admin Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
