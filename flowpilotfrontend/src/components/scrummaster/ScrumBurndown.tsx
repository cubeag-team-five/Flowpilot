import React from 'react';

export const ScrumBurndown: React.FC = () => {
  const burndownActual = '0,10 28,18 56,24 84,38 112,50 140,52 168,68 196,72 224,90 252,96 280,108';
  const dayLabels = [
    { x: 10, label: 'D1' },
    { x: 65, label: 'D4' },
    { x: 120, label: 'D7' },
    { x: 175, label: 'D10' },
    { x: 230, label: 'D14' },
    { x: 285, label: 'D17' },
    { x: 340, label: 'D21' }
  ];

  const velocity = [
    { sprint: 'S5', points: 28, x: 8, y: 62, height: 98 },
    { sprint: 'S6', points: 33, x: 56, y: 44.5, height: 115.5 },
    { sprint: 'S7', points: 36, x: 104, y: 34, height: 126 },
    { sprint: 'S8', points: 29, x: 152, y: 58.5, height: 101.5 },
    { sprint: 'S9', points: 38, x: 200, y: 27, height: 133 },
    { sprint: 'S10', points: 41, x: 248, y: 16.5, height: 143.5 },
    { sprint: 'S11', points: 35, x: 296, y: 37.5, height: 122.5 },
    { sprint: 'S12', points: 41, x: 344, y: 16.5, height: 143.5, current: true }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Sprint burndown */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-extrabold text-slate-900">Sprint 12 Burndown</h3>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
              <span className="w-3 h-0.5 rounded-full bg-emerald-500"></span> Actual
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
              <span className="w-3 border-t-[1.5px] border-dashed border-slate-300"></span> Ideal
            </span>
          </div>
        </div>

        <svg viewBox="0 0 400 185" className="block w-full">
          <defs>
            <linearGradient id="burnGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22C55E" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 40, 80, 120, 160].map((y) => (
            <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#F3F4F6" strokeWidth="1" />
          ))}

          {/* Ideal trend */}
          <line x1="0" y1="10" x2="400" y2="150" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="6 4" />

          {/* Actual remaining work */}
          <polygon fill="url(#burnGrad)" points={`${burndownActual} 280,160 0,160`} />
          <polyline
            fill="none"
            stroke="#22C55E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={burndownActual}
          />

          {dayLabels.map((d) => (
            <text key={d.label} x={d.x} y="175" fontSize="9" fill="#bbb" textAnchor="middle">
              {d.label}
            </text>
          ))}
        </svg>
      </div>

      {/* Sprint velocity */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
        <h3 className="text-sm font-extrabold text-slate-900 mb-4">Sprint Velocity (Last 8 Sprints)</h3>

        <svg viewBox="0 0 425 185" className="block w-full">
          {velocity.map((bar) => (
            <g key={bar.sprint}>
              <rect
                x={bar.x}
                y={bar.y}
                width="32"
                height={bar.height}
                rx="5"
                fill="#22C55E"
                fillOpacity={bar.current ? 1 : 0.19}
              />
              <text
                x={bar.x + 16}
                y={bar.y - 5}
                textAnchor="middle"
                fontSize="10"
                fill={bar.current ? '#22C55E' : '#aaa'}
                fontWeight={bar.current ? 800 : 500}
              >
                {bar.points}
              </text>
              <text x={bar.x + 16} y="175" textAnchor="middle" fontSize="9" fill="#bbb">
                {bar.sprint}
              </text>
            </g>
          ))}

          {/* Average velocity */}
          <line x1="0" y1="34" x2="400" y2="34" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 3" />
          <text x="405" y="38" fontSize="9" fill="#bbb">avg</text>
        </svg>
      </div>
    </div>
  );
};
