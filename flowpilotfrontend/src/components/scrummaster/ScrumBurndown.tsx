import React from 'react';
import { TYPE, SURFACE, STATUS } from './scrumUI';

/** Chart canvas: 400x160 plot area, 25px gutter beneath for axis labels. */
const PLOT_W = 400;
const PLOT_H = 160;
const CANVAS_H = 185;

export const ScrumBurndown: React.FC = () => {
  /** Remaining work, sampled every other day. Read straight off the sprint board. */
  const burndown = [
    { x: 0, y: 10 }, { x: 28, y: 18 }, { x: 56, y: 24 }, { x: 84, y: 38 },
    { x: 112, y: 50 }, { x: 140, y: 52 }, { x: 168, y: 68 }, { x: 196, y: 72 },
    { x: 224, y: 90 }, { x: 252, y: 96 }, { x: 280, y: 108 }
  ];
  const actualPoints = burndown.map((p) => `${p.x},${p.y}`).join(' ');
  const lastPoint = burndown[burndown.length - 1];

  const dayLabels = [
    { x: 10, label: 'D1' }, { x: 65, label: 'D4' }, { x: 120, label: 'D7' },
    { x: 175, label: 'D10' }, { x: 230, label: 'D14' }, { x: 285, label: 'D17' },
    { x: 340, label: 'D21' }
  ];

  const velocity = [
    { sprint: 'S5', points: 28 }, { sprint: 'S6', points: 33 },
    { sprint: 'S7', points: 36 }, { sprint: 'S8', points: 29 },
    { sprint: 'S9', points: 38 }, { sprint: 'S10', points: 41 },
    { sprint: 'S11', points: 35 }, { sprint: 'S12', points: 41, current: true }
  ];

  // Bar geometry is derived so the average line can never drift from the data.
  const BAR_W = 32;
  const BAR_GAP = 16;
  const maxPoints = 45;
  const scale = PLOT_H / maxPoints;
  const average = velocity.reduce((sum, v) => sum + v.points, 0) / velocity.length;
  const averageY = PLOT_H - average * scale;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {/* Burndown */}
      <section className={`${SURFACE.card} ${SURFACE.pad}`}>
        <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
          <h3 className={`${TYPE.title} text-slate-900`}>Sprint 12 burndown</h3>
          <div className="flex items-center gap-3">
            <span className={`${TYPE.meta} inline-flex items-center gap-1.5 text-slate-500`}>
              <span className="w-3 h-0.5 rounded-full bg-emerald-500" aria-hidden="true" /> Actual
            </span>
            <span className={`${TYPE.meta} inline-flex items-center gap-1.5 text-slate-500`}>
              <span className="w-3 border-t-[1.5px] border-dashed border-slate-300" aria-hidden="true" /> Ideal
            </span>
          </div>
        </header>
        <p className={`${TYPE.meta} text-slate-500 mb-4`}>
          Tracking behind the ideal line since day 7
        </p>

        <svg
          viewBox={`0 0 ${PLOT_W} ${CANVAS_H}`}
          className="block w-full"
          role="img"
          aria-label="Burndown chart for sprint 12. Remaining work is tracking above the ideal line, meaning the sprint is behind schedule."
        >
          <defs>
            <linearGradient id="scrumBurnFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22C55E" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 40, 80, 120, 160].map((y) => (
            <line key={y} x1="0" y1={y} x2={PLOT_W} y2={y} stroke="#F1F5F9" strokeWidth="1" />
          ))}

          <line
            x1="0" y1="10" x2={PLOT_W} y2="150"
            stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="6 4"
          />

          <polygon
            fill="url(#scrumBurnFill)"
            points={`${actualPoints} ${lastPoint.x},${PLOT_H} 0,${PLOT_H}`}
          />
          <polyline
            fill="none" stroke="#22C55E" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            points={actualPoints}
          />
          <circle cx={lastPoint.x} cy={lastPoint.y} r="4" fill="#22C55E" stroke="#fff" strokeWidth="2" />

          {dayLabels.map((d) => (
            <text key={d.label} x={d.x} y="176" fontSize="10" fill="#94A3B8" textAnchor="middle">
              {d.label}
            </text>
          ))}
        </svg>
      </section>

      {/* Velocity */}
      <section className={`${SURFACE.card} ${SURFACE.pad}`}>
        <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
          <h3 className={`${TYPE.title} text-slate-900`}>Velocity</h3>
          <span className={`${TYPE.meta} font-semibold ${STATUS.done.text} tabular-nums`}>
            {average.toFixed(1)} avg
          </span>
        </header>
        <p className={`${TYPE.meta} text-slate-500 mb-4`}>
          Points completed over the last 8 sprints
        </p>

        <svg
          viewBox={`0 0 ${PLOT_W + 26} ${CANVAS_H}`}
          className="block w-full"
          role="img"
          aria-label={`Velocity for the last 8 sprints, averaging ${average.toFixed(1)} points. Sprint 12 completed 41 points.`}
        >
          {velocity.map((bar, i) => {
            const height = bar.points * scale;
            const x = 8 + i * (BAR_W + BAR_GAP);
            const y = PLOT_H - height;

            return (
              <g key={bar.sprint}>
                <rect
                  x={x} y={y} width={BAR_W} height={height} rx="5"
                  fill="#22C55E" fillOpacity={bar.current ? 1 : 0.18}
                />
                <text
                  x={x + BAR_W / 2} y={y - 6} textAnchor="middle" fontSize="10"
                  fill={bar.current ? '#16A34A' : '#94A3B8'}
                  fontWeight={bar.current ? 700 : 500}
                >
                  {bar.points}
                </text>
                <text x={x + BAR_W / 2} y="176" textAnchor="middle" fontSize="10" fill="#94A3B8">
                  {bar.sprint}
                </text>
              </g>
            );
          })}

          <line
            x1="0" y1={averageY} x2={PLOT_W} y2={averageY}
            stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 3"
          />
          <text x={PLOT_W + 4} y={averageY + 3.5} fontSize="10" fill="#94A3B8">avg</text>
        </svg>
      </section>
    </div>
  );
};
