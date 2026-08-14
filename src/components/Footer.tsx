import React from 'react';
import { LOGO_URL } from '../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer id="app-footer" className="bg-[#0a0a0a] border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#ff3e00] to-[#ff6a3d] p-[1px]">
              <img
                src={LOGO_URL}
                alt="CineVerse Logo"
                className="w-full h-full object-cover rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-black tracking-widest text-lg text-white">CINEVERSE</span>
          </div>
          <p className="text-xs text-white/40 leading-relaxed max-w-sm">
            Next-generation OTT streaming platform engineered with predictive neural discovery, spatial acoustics, and synchronous real-time co-watching.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-3">Navigation</h4>
          <ul className="space-y-2 text-xs text-white/60">
            <li><a href="#movies" className="hover:text-[#ff3e00] transition-colors">Movies & Premieres</a></li>
            <li><a href="#series" className="hover:text-[#ff3e00] transition-colors">Original Series</a></li>
            <li><a href="#ai-picks" className="hover:text-[#ff3e00] transition-colors">CineAI Curated</a></li>
            <li><a href="#watch-party" className="hover:text-[#ff3e00] transition-colors">Live Watch Parties</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-3">Engine & Studio</h4>
          <ul className="space-y-2 text-xs text-white/60">
            <li><a href="#console" className="hover:text-[#ff3e00] transition-colors">Studio Management Console</a></li>
            <li><a href="#metadata" className="hover:text-[#ff3e00] transition-colors">AI Metadata Ingestion</a></li>
            <li><a href="#analytics" className="hover:text-[#ff3e00] transition-colors">Neural Matching Analytics</a></li>
            <li><a href="#api" className="hover:text-[#ff3e00] transition-colors">Dolby Atmos & 4K Pipelines</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-3">Account & Audio</h4>
          <p className="text-xs text-white/40 mb-3">
            Ultra-low latency streaming with HDR10+ and spatial audio virtualization.
          </p>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[#121212] text-[11px] font-mono text-white/80 border border-white/10">
              4K HDR
            </span>
            <span className="px-2.5 py-1 rounded bg-[#121212] text-[11px] font-mono text-white/80 border border-white/10">
              Dolby Atmos
            </span>
            <span className="px-2.5 py-1 rounded bg-[#ff3e00]/10 text-[11px] font-mono text-[#ff3e00] border border-[#ff3e00]/30">
              AI Powered
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40">
        <p>© 2024 CineVerse Streaming Technologies Inc. All rights reserved.</p>
        <div className="flex gap-4 mt-3 sm:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">System Status</a>
        </div>
      </div>
    </footer>
  );
};
