import React, { useState } from 'react';
import { SYSTEM_ACTIVITIES } from '../data/mockData';

export const ConsoleOverview: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('24h');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(4); // default show peak

  // Chart data points according to timeframe
  const chartData = {
    '24h': [
      { time: '00:00', val: 22.4 },
      { time: '04:00', val: 18.2 },
      { time: '08:00', val: 29.5 },
      { time: '12:00', val: 38.0 },
      { time: '16:00', val: 42.6 },
      { time: '20:00', val: 48.2, isPeak: true },
      { time: '23:59', val: 45.2 }
    ],
    '7d': [
      { time: 'Mon', val: 34.2 },
      { time: 'Tue', val: 36.8 },
      { time: 'Wed', val: 39.5 },
      { time: 'Thu', val: 41.0 },
      { time: 'Fri', val: 47.8 },
      { time: 'Sat', val: 52.4, isPeak: true },
      { time: 'Sun', val: 49.1 }
    ],
    '30d': [
      { time: 'W1', val: 32.0 },
      { time: 'W2', val: 38.5 },
      { time: 'W3', val: 44.2 },
      { time: 'W4', val: 51.9, isPeak: true }
    ]
  };

  const currentPoints = chartData[timeframe];
  const maxVal = 60;
  const chartW = 700;
  const chartH = 220;

  // Build SVG path
  const pointsString = currentPoints.map((pt, i) => {
    const x = (i / (currentPoints.length - 1)) * (chartW - 60) + 30;
    const y = chartH - (pt.val / maxVal) * (chartH - 40) - 20;
    return `${x},${y}`;
  });

  const pathD = `M ${pointsString.join(' L ')}`;
  const areaD = `M ${pointsString[0]} L ${pointsString.join(' L ')} L ${(chartW - 30)},${chartH - 20} L 30,${chartH - 20} Z`;

  return (
    <div id="console-overview-page" className="p-6 sm:p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff3e00] animate-ping"></span>
            <h1 className="text-2xl font-black text-white tracking-tight uppercase">System Telemetry & Controls</h1>
          </div>
          <p className="text-xs text-white/40 mt-1">
            Real-time neural network streaming performance and studio ingest metrics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#ff3e00]"></span>
            Edge Clusters: Nominal
          </span>
          <button
            onClick={() => alert("Diagnostic trace exported to system logs.")}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-colors cursor-pointer"
          >
            Export Logs
          </button>
        </div>
      </div>

      {/* 4 PRIMARY METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Metric 1: Total ARR */}
        <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white/40">Total Annual Run Rate (ARR)</span>
            <div className="w-8 h-8 rounded-lg bg-[#ff3e00]/10 text-[#ff3e00] flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">payments</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-white">$2.4M</span>
            <span className="flex items-center text-xs font-bold text-[#ff3e00] bg-[#ff3e00]/10 px-2 py-0.5 rounded">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              +12.5% YoY
            </span>
          </div>
          <p className="text-[11px] text-white/40">Subscriber recurring expansion on VIP tier</p>
        </div>

        {/* Metric 2: Active Streams */}
        <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white/40">Active 4K Concurrent Streams</span>
            <div className="w-8 h-8 rounded-lg bg-[#ff3e00]/10 text-[#ff3e00] flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">sensors</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-white">45.2K</span>
            <span className="flex items-center text-xs font-bold text-[#ff3e00] bg-[#ff3e00]/10 px-2 py-0.5 rounded">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              +3.2% /hr
            </span>
          </div>
          <p className="text-[11px] text-white/40">Bitrate average: 24.8 Mbps per client</p>
        </div>

        {/* Metric 3: Churn Rate */}
        <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white/40">Monthly Churn Rate</span>
            <div className="w-8 h-8 rounded-lg bg-[#ff3e00]/10 text-[#ff3e00] flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">person_remove</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-white">1.2%</span>
            <span className="flex items-center text-xs font-bold text-white/80 bg-white/10 px-2 py-0.5 rounded">
              <span className="material-symbols-outlined text-sm">trending_down</span>
              -0.4% MoM
            </span>
          </div>
          <p className="text-[11px] text-white/40">Industry benchmark lowest across OTT</p>
        </div>

        {/* Metric 4: AI Match Engagement */}
        <div className="p-5 rounded-2xl bg-[#121212] border border-[#ff3e00]/40 space-y-3 shadow-lg shadow-[#ff3e00]/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#ff3e00] flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              AI Match Accuracy
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff3e00] animate-pulse"></span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-white">94%</span>
            <span className="flex items-center text-xs font-bold text-[#ff3e00] bg-[#ff3e00]/20 px-2 py-0.5 rounded">
              +8.1% vs base
            </span>
          </div>
          <p className="text-[11px] text-white/60">94% of viewers complete recommended titles</p>
        </div>
      </div>

      {/* STREAM TRAFFIC CHART WITH NEON GLOW */}
      <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">Live Stream Traffic & Ingestion Bandwidth</h2>
            <p className="text-xs text-white/40">Real-time edge CDN throughput (Gigabits/sec)</p>
          </div>

          {/* Timeframe Selectors */}
          <div className="flex items-center gap-1 bg-[#0a0a0a] p-1 rounded-xl border border-white/10">
            {(['24h', '7d', '30d'] as const).map(tf => (
              <button
                key={tf}
                onClick={() => {
                  setTimeframe(tf);
                  setHoveredPointIndex(null);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  timeframe === tf
                    ? 'bg-[#ff3e00] text-white'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                {tf.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* SVG Neon Glow Area Chart */}
        <div className="relative w-full h-[240px] overflow-hidden">
          <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ff3e00" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ff3e00" stopOpacity="0.0" />
              </linearGradient>
              <filter id="neonLineGlow" x1="-20%" y1="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Horizontal Grid lines */}
            {[0, 20, 40, 60].map(val => {
              const y = chartH - (val / maxVal) * (chartH - 40) - 20;
              return (
                <g key={val}>
                  <line
                    x1="30"
                    y1={y}
                    x2={chartW - 30}
                    y2={y}
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text x="5" y={y + 3} className="fill-white/40 text-[9px] font-mono">
                    {val}k
                  </text>
                </g>
              );
            })}

            {/* Area fill */}
            <path d={areaD} fill="url(#chartGradient)" />

            {/* Neon line */}
            <path
              d={pathD}
              fill="none"
              stroke="#ff3e00"
              strokeWidth="2.5"
              filter="url(#neonLineGlow)"
              className="transition-all duration-700"
            />

            {/* Interactive Data Nodes */}
            {currentPoints.map((pt, idx) => {
              const x = (idx / (currentPoints.length - 1)) * (chartW - 60) + 30;
              const y = chartH - (pt.val / maxVal) * (chartH - 40) - 20;
              const isHovered = hoveredPointIndex === idx;

              return (
                <g
                  key={idx}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPointIndex(idx)}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered || pt.isPeak ? "6" : "4"}
                    fill={pt.isPeak ? "#ffffff" : "#ff3e00"}
                    stroke="#0a0a0a"
                    strokeWidth="2"
                  />
                  {pt.isPeak && (
                    <circle
                      cx={x}
                      cy={y}
                      r="10"
                      fill="#ff3e00"
                      opacity="0.3"
                      className="animate-ping"
                    />
                  )}

                  {/* Time label on X axis */}
                  <text
                    x={x}
                    y={chartH - 2}
                    textAnchor="middle"
                    className="fill-white/40 text-[10px] font-mono"
                  >
                    {pt.time}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Hover Tooltip Box */}
          {hoveredPointIndex !== null && currentPoints[hoveredPointIndex] && (
            <div
              className="absolute top-2 right-4 bg-[#181818]/95 border border-white/10 p-2.5 rounded-xl text-xs backdrop-blur-md shadow-xl"
            >
              <div className="text-white/40 text-[10px]">Point in Time: {currentPoints[hoveredPointIndex].time}</div>
              <div className="text-white font-bold font-mono text-sm flex items-center gap-1.5 mt-0.5">
                <span className="text-[#ff3e00]">{currentPoints[hoveredPointIndex].val}k Streams</span>
                {currentPoints[hoveredPointIndex].isPeak && (
                  <span className="px-1.5 py-0.2 rounded bg-[#ff3e00]/20 text-[#ff3e00] text-[10px]">Peak</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DUAL SECTION: POPULAR AI RECOMMENDATIONS & REAL-TIME SYSTEM ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Popular AI Recommendations Ranking */}
        <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ff3e00]">auto_awesome</span>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">Popular AI Recommendations</h3>
            </div>
            <span className="text-xs text-white/40">Neural Conversion Rate</span>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { title: 'Neon Shadows: The Genesis Protocol', match: 98, views: '42.1k', color: 'from-[#ff3e00] to-[#ffa17a]' },
              { title: 'The Architecture of Silence', match: 94, views: '31.8k', color: 'from-[#ff3e00] to-amber-300' },
              { title: 'Void Transit', match: 91, views: '27.4k', color: 'from-[#ff3e00] to-rose-400' },
              { title: 'Echoes in the Rain (S2)', match: 88, views: '19.2k', color: 'from-[#ff3e00] to-orange-300' }
            ].map(item => (
              <div key={item.title} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white truncate max-w-[280px]">{item.title}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[#ff3e00] font-bold">{item.match}% Match</span>
                    <span className="font-mono text-white/40">{item.views}</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-[#0a0a0a] overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                    style={{ width: `${item.match}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: System Activity Real-Time Timeline */}
        <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ff3e00]">timeline</span>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">System Activity Stream</h3>
            </div>
            <span className="text-xs text-[#ff3e00] flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3e00] animate-pulse"></span>
              Live Sync
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {SYSTEM_ACTIVITIES.map(act => (
              <div key={act.id} className="flex items-start gap-3.5 pb-3 border-b border-white/5 last:border-none">
                <div className="w-8 h-8 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-base">
                    {act.type === 'ingest' ? 'cloud_upload' : act.type === 'spike' ? 'trending_up' : 'psychology'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white truncate">
                      {act.title} {act.highlight && <span className="text-[#ff3e00]">"{act.highlight}"</span>}
                    </h4>
                    <span className="text-[10px] text-white/40 font-mono whitespace-nowrap ml-2">
                      {act.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/60 mt-0.5">
                    {act.subtitle}
                  </p>
                  {act.badge && (
                    <span className="inline-block mt-1 px-2 py-0.2 rounded bg-white/10 text-white text-[10px] font-bold font-mono">
                      {act.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
