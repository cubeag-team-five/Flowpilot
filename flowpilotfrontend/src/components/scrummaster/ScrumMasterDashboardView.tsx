import React from 'react';
import { FiAlertTriangle, FiArrowUpRight, FiCheck } from 'react-icons/fi';
import { TYPE, SURFACE, STATUS, type StatusKey } from './scrumUI';

export const ScrumMasterDashboardView: React.FC = () => {
  const kpis: { label: string; value: string; note: string; tone: StatusKey }[] = [
    { label: 'Sprint', value: 'Sprint 12', note: 'IPMT Platform v2', tone: 'done' },
    { label: 'Days remaining', value: '14', note: 'of 21 total', tone: 'active' },
    { label: 'Tasks done', value: '7 / 18', note: '38% complete', tone: 'done' },
    { label: 'Blockers', value: '1', note: 'Needs resolution', tone: 'blocked' }
  ];

  const ceremonies: { name: string; when: string; tone: StatusKey }[] = [
    { name: 'Daily standup', when: '9:30 AM — daily', tone: 'done' },
    { name: 'Sprint review / demo', when: 'Aug 8 · 3:00 PM', tone: 'plan' },
    { name: 'Sprint retrospective', when: 'Aug 9 · 10:00 AM', tone: 'done' },
    { name: 'Sprint 13 planning', when: 'Aug 18 · 9:00 AM', tone: 'active' }
  ];

  return (
    <>
      {/* Sprint health at a glance */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className={`${SURFACE.card} ${SURFACE.pad} relative overflow-hidden`}>
            <span className={`absolute inset-y-0 left-0 w-[3px] ${STATUS[kpi.tone].rail}`} aria-hidden="true" />
            <div className={`${TYPE.eyebrow} text-slate-400`}>{kpi.label}</div>
            <div className={`${TYPE.metric} text-slate-900 mt-2`}>{kpi.value}</div>
            <div className={`${TYPE.meta} font-medium mt-1 ${STATUS[kpi.tone].text}`}>{kpi.note}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4">
        {/* Sprint goal + progress */}
        <div className={`${SURFACE.card} ${SURFACE.pad} flex flex-col`}>
          <div className={`${TYPE.eyebrow} text-emerald-600`}>Sprint goal</div>
          <p className={`${TYPE.title} text-slate-900 mt-3 leading-relaxed`}>
            Deliver the core design system, task board enhancements, and mobile responsiveness for the IPMT Platform.
          </p>

          <div className="mt-auto pt-5 space-y-3">
            {[
              { label: 'Tasks completed', value: '7 of 18', pct: '38%', tone: 'done' as StatusKey },
              { label: 'Sprint elapsed', value: 'Day 7 of 21', pct: '33%', tone: 'active' as StatusKey }
            ].map((bar) => (
              <div key={bar.label}>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className={`${TYPE.meta} font-medium text-slate-500`}>{bar.label}</span>
                  <span className={`${TYPE.meta} font-semibold text-slate-900 tabular-nums`}>{bar.value}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className={`h-full rounded-full ${STATUS[bar.tone].rail}`} style={{ width: bar.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ceremony schedule */}
        <div className={`${SURFACE.card} ${SURFACE.pad}`}>
          <h3 className={`${TYPE.title} text-slate-900`}>Ceremony schedule</h3>
          <ul className="mt-4 space-y-1">
            {ceremonies.map((c) => (
              <li
                key={c.name}
                className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0"
              >
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS[c.tone].rail}`} aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <div className={`${TYPE.body} font-medium text-slate-900 truncate`}>{c.name}</div>
                  <div className={`${TYPE.meta} text-slate-400`}>{c.when}</div>
                </div>
                <span className={`${TYPE.meta} font-medium text-slate-400 shrink-0`}>Scheduled</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Blockers — the one thing a scrum master must act on today */}
      <div className={`${SURFACE.card} border-rose-500/20 overflow-hidden`}>
        <div className={`flex items-center gap-2 px-4 sm:px-5 py-3 border-b border-rose-500/15 bg-rose-500/5`}>
          <FiAlertTriangle className="text-rose-600 shrink-0" size={14} aria-hidden="true" />
          <h3 className={`${TYPE.eyebrow} text-rose-600`}>Active blockers · 1</h3>
        </div>

        <div className={`${SURFACE.pad} flex flex-col sm:flex-row sm:items-center gap-4`}>
          <div className="min-w-0 flex-1">
            <div className={`${TYPE.body} font-semibold text-slate-900`}>
              Divya Mehta — waiting for brand colour tokens
            </div>
            <div className={`${TYPE.meta} text-slate-500 mt-1`}>
              Blocks T-044 mobile responsive layout and T-047 dark mode theming · raised 2 days ago
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              className={`${TYPE.meta} font-semibold inline-flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer
                bg-rose-500/10 text-rose-700 border border-rose-500/20 hover:bg-rose-500/15
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 transition-colors`}
            >
              <FiArrowUpRight size={13} aria-hidden="true" /> Escalate
            </button>
            <button
              type="button"
              className={`${TYPE.meta} font-semibold inline-flex items-center gap-1.5 px-3 py-2 rounded-lg cursor-pointer
                bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 hover:bg-emerald-500/15
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 transition-colors`}
            >
              <FiCheck size={13} aria-hidden="true" /> Mark resolved
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
