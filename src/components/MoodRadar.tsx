import React from 'react';
import { MoodProfile } from '../types';

interface MoodRadarProps {
  mood: MoodProfile;
}

export const MoodRadar: React.FC<MoodRadarProps> = ({ mood }) => {
  // Dimensions in order: Tension, Action, Visuals, Romance, Mystery, Pacing
  const axes = [
    { name: 'TENSION', value: mood.tension },
    { name: 'ACTION', value: mood.action },
    { name: 'VISUALS', value: mood.visuals },
    { name: 'ROMANCE', value: mood.romance },
    { name: 'MYSTERY', value: mood.mystery },
    { name: 'PACING', value: mood.pacing }
  ];

  const size = 260;
  const center = size / 2;
  const radius = size * 0.38;
  const numAxes = axes.length;

  const getCoordinates = (index: number, valuePct: number) => {
    const angle = (Math.PI * 2 / numAxes) * index - Math.PI / 2;
    const r = radius * (valuePct / 100);
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Generate polygon points for data
  const dataPoints = axes.map((axis, i) => {
    const { x, y } = getCoordinates(i, axis.value);
    return `${x},${y}`;
  }).join(' ');

  // Web rings (20%, 40%, 60%, 80%, 100%)
  const rings = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div id="mood-radar-container" className="flex flex-col items-center">
      <div className="relative w-[260px] h-[260px]">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff3e00" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ff6a33" stopOpacity="0.15" />
            </linearGradient>
            <filter id="glow" x1="-20%" y1="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Concentric grid rings */}
          {rings.map((factor, rIdx) => {
            const ringPoints = axes.map((_, i) => {
              const { x, y } = getCoordinates(i, factor * 100);
              return `${x},${y}`;
            }).join(' ');
            return (
              <polygon
                key={`ring-${rIdx}`}
                points={ringPoints}
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
                strokeDasharray={rIdx === rings.length - 1 ? 'none' : '3 3'}
              />
            );
          })}

          {/* Radial axis lines */}
          {axes.map((_, i) => {
            const outer = getCoordinates(i, 100);
            return (
              <line
                key={`axis-${i}`}
                x1={center}
                y1={center}
                x2={outer.x}
                y2={outer.y}
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="1"
              />
            );
          })}

          {/* Radar area polygon */}
          <polygon
            points={dataPoints}
            fill="url(#radarFill)"
            stroke="#ff3e00"
            strokeWidth="2"
            filter="url(#glow)"
            className="transition-all duration-700 ease-out"
          />

          {/* Data point dots */}
          {axes.map((axis, i) => {
            const { x, y } = getCoordinates(i, axis.value);
            return (
              <g key={`dot-${i}`}>
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#ff3e00"
                  className="transition-all duration-700"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="8"
                  fill="#ff3e00"
                  opacity="0.3"
                  className="animate-ping"
                />
              </g>
            );
          })}

          {/* Axis Labels */}
          {axes.map((axis, i) => {
            const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
            const labelR = radius + 22;
            const lx = center + labelR * Math.cos(angle);
            const ly = center + labelR * Math.sin(angle);
            return (
              <text
                key={`label-${i}`}
                x={lx}
                y={ly + 4}
                textAnchor="middle"
                className="fill-white/60 text-[10px] font-semibold tracking-wider"
              >
                {axis.name}
              </text>
            );
          })}
        </svg>
      </div>

      <p className="text-xs text-white/60 text-center mt-3 max-w-[260px] leading-relaxed">
        {mood.description}
      </p>
    </div>
  );
};
