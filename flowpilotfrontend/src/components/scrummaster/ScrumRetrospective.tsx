import React from 'react';
import { FiCheck, FiX, FiZap } from 'react-icons/fi';

export const ScrumRetrospective: React.FC = () => {
  const wentWell = [
    'Velocity up 12% from last sprint',
    'Zero missed standup this sprint',
    'PR review time down to < 24h avg',
    'Strong cross-team collaboration on API module'
  ];

  const needsImprovement = [
    'Blocker on brand color tokens delayed 2 tasks',
    'Sprint scope crept mid-sprint (+3 tasks added)',
    'QA environment was down for 1 day'
  ];

  const actionItems = [
    { title: 'Lock sprint scope after day 1', owner: 'Arjun Shah', due: 'Sprint 13' },
    { title: 'Set up staging env health check alerts', owner: 'Karan Dev', due: 'Aug 10' },
    { title: 'Share design tokens 1 sprint ahead', owner: 'Divya Mehta', due: 'Sprint 13 start' }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl px-4 py-3 text-[12.5px] font-medium text-emerald-700">
        Sprint 12 Retrospective — Aug 9, 2026 · 10:00 AM · Facilitated by Aryan Kapoor
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* What went well */}
        <div className="bg-white border border-emerald-500/20 rounded-2xl p-6 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3">✅ What Went Well</div>
          {wentWell.map((item, i) => (
            <div key={i} className="flex gap-2.5 mb-2.5 last:mb-0">
              <div className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <FiCheck size={11} strokeWidth={3} />
              </div>
              <div className="text-[12.5px] text-slate-700 leading-snug">{item}</div>
            </div>
          ))}
        </div>

        {/* What needs improvement */}
        <div className="bg-white border border-rose-500/20 rounded-2xl p-6 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-3">⚠️ What Needs Improvement</div>
          {needsImprovement.map((item, i) => (
            <div key={i} className="flex gap-2.5 mb-2.5 last:mb-0">
              <div className="w-5 h-5 rounded-md bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0">
                <FiX size={11} strokeWidth={3} />
              </div>
              <div className="text-[12.5px] text-slate-600 leading-snug">{item}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Action items */}
      <div className="bg-white border border-violet-500/20 rounded-2xl p-6 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-600 mb-4">
          <FiZap size={13} /> Action Items for Sprint 13
        </div>

        {actionItems.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3.5 pb-3 mb-3 border-b border-slate-100 last:border-0 last:pb-0 last:mb-0"
          >
            <div className="w-6 h-6 rounded-[7px] bg-violet-500/10 text-violet-600 flex items-center justify-center text-xs font-extrabold shrink-0">
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-slate-900">{item.title}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Owner: {item.owner}</div>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-[7px] bg-violet-500/10 text-violet-600 border border-violet-500/20 shrink-0">
              {item.due}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
