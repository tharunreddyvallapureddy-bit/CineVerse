import React from 'react';

interface ConsoleOverviewProps {
  moviesCount?: number;
  usersCount?: number;
}

export const ConsoleOverview: React.FC<ConsoleOverviewProps> = ({
  moviesCount = 0,
  usersCount = 1
}) => {
  return (
    <div id="console-overview-page" className="p-6 sm:p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff3e00] animate-ping"></span>
            <h1 className="text-2xl font-black text-white tracking-tight uppercase">Master Studio Telemetry & System Controls</h1>
          </div>
          <p className="text-xs text-white/40 mt-1">
            Real-time server telemetry and studio ingestion metrics for Admin <strong className="text-white font-mono">vallapureddytharunreddy6281@gmail.com</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#ff3e00]"></span>
            Render Edge Cluster: Online
          </span>
        </div>
      </div>

      {/* 4 DYNAMIC REAL METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Metric 1: Published Movies */}
        <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Published Titles in Catalog</span>
            <div className="w-8 h-8 rounded-lg bg-[#ff3e00]/10 text-[#ff3e00] flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">movie</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-white">{moviesCount}</span>
            <span className="text-xs font-bold text-[#ff3e00] bg-[#ff3e00]/10 px-2 py-0.5 rounded">
              Live Catalog
            </span>
          </div>
          <p className="text-[11px] text-white/40">Uploaded & published by Studio Admin</p>
        </div>

        {/* Metric 2: Registered Members */}
        <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Total Registered Accounts</span>
            <div className="w-8 h-8 rounded-lg bg-[#ff3e00]/10 text-[#ff3e00] flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">group</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-white">{usersCount}</span>
            <span className="text-xs font-bold text-white/80 bg-white/10 px-2 py-0.5 rounded">
              Active Accounts
            </span>
          </div>
          <p className="text-[11px] text-white/40">Master Admin & registered subscribers</p>
        </div>

        {/* Metric 3: Active CDN Node */}
        <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Edge CDN Deployment</span>
            <div className="w-8 h-8 rounded-lg bg-[#ff3e00]/10 text-[#ff3e00] flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">cloud_done</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-white">Vercel / Render</span>
            <span className="text-xs font-bold text-[#ff3e00] bg-[#ff3e00]/10 px-2 py-0.5 rounded">
              Active
            </span>
          </div>
          <p className="text-[11px] text-white/40">4K HDR & Spatial Audio CDN Sync</p>
        </div>

        {/* Metric 4: Admin Authority */}
        <div className="p-5 rounded-2xl bg-[#121212] border border-[#ff3e00]/40 space-y-3 shadow-lg shadow-[#ff3e00]/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#ff3e00] flex items-center gap-1 uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              Master Admin
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff3e00] animate-pulse"></span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-bold text-white truncate max-w-[200px]" title="vallapureddytharunreddy6281@gmail.com">
              vallapureddytharunreddy6281
            </span>
          </div>
          <p className="text-[11px] text-white/60">Full Studio Console & CMS Access</p>
        </div>
      </div>

      {/* SYSTEM ACTIVITIES */}
      <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff3e00]">timeline</span>
            <h3 className="text-base font-bold text-white uppercase tracking-wider">Studio System Activity Stream</h3>
          </div>
          <span className="text-xs text-[#ff3e00] flex items-center gap-1 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff3e00] animate-pulse"></span>
            Real-time Log
          </span>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-start gap-3.5 pb-3 border-b border-white/5">
            <div className="w-8 h-8 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-base">admin_panel_settings</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white">
                  Master Admin authenticated: <span className="text-[#ff3e00]">vallapureddytharunreddy6281@gmail.com</span>
                </h4>
                <span className="text-[10px] text-white/40 font-mono ml-2">Active Session</span>
              </div>
              <p className="text-[11px] text-white/60 mt-0.5">
                Granted full Studio Management, CMS Ingestion, and User Telemetry authority.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 pb-3 border-b border-white/5">
            <div className="w-8 h-8 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-base">movie</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white">
                  Catalog Status: <span className="text-[#ff3e00]">{moviesCount} published title(s)</span>
                </h4>
                <span className="text-[10px] text-white/40 font-mono ml-2">Live</span>
              </div>
              <p className="text-[11px] text-white/60 mt-0.5">
                Movies published via Studio Console immediately stream to all frontend clients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
