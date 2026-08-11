import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

export const ScrumStandups: React.FC = () => {
  const standups = [
    {
      avatar: 'SR',
      name: 'Sneha Rao',
      yesterday: 'Completed velocity module, started component library',
      today: 'Continue component library'
    },
    {
      avatar: 'MK',
      name: 'Mihir Khatri',
      yesterday: 'Finished REST API documentation PR',
      today: 'Review file upload S3 task'
    },
    {
      avatar: 'DM',
      name: 'Divya Mehta',
      yesterday: 'Mobile responsive layouts 80% done',
      today: 'Complete dark mode research',
      blocker: 'Waiting for brand color tokens from Design'
    },
    {
      avatar: 'KD',
      name: 'Karan Dev',
      yesterday: 'Started notification service scaffolding',
      today: 'Finish Slack hook integration'
    },
    {
      avatar: 'PR',
      name: 'Priya Rajan',
      yesterday: 'Tested file upload module, filed 2 bugs',
      today: 'Test notification service'
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-sm font-extrabold text-slate-900">Today — Daily Standup Notes</h3>
        <div className="text-xs font-medium text-slate-400">Aug 4, 2026 · 9:30 AM</div>
      </div>

      <div className="flex flex-col gap-3">
        {standups.map((member) => (
          <div
            key={member.avatar}
            className={`bg-white rounded-2xl p-[18px] shadow-2xs border ${
              member.blocker ? 'border-rose-500/20' : 'border-slate-200/80'
            }`}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-300 flex items-center justify-center text-[11px] font-extrabold text-white shrink-0">
                {member.avatar}
              </div>
              <div>
                <div className="text-[13px] font-bold text-slate-900">{member.name}</div>
                {member.blocker && (
                  <span className="inline-flex items-center gap-1 mt-0.5 text-[10px] font-bold text-rose-600 bg-rose-500/10 px-1.5 py-0.5 rounded-[5px]">
                    <FiAlertTriangle size={10} /> BLOCKED
                  </span>
                )}
              </div>
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-2 ${member.blocker ? 'lg:grid-cols-3' : ''} gap-2.5`}>
              <div className="bg-slate-50 rounded-lg px-3 py-2.5">
                <div className="text-[9.5px] font-bold uppercase tracking-wider text-emerald-500 mb-1">Yesterday</div>
                <div className="text-xs text-slate-600 leading-snug">{member.yesterday}</div>
              </div>

              <div className="bg-slate-50 rounded-lg px-3 py-2.5">
                <div className="text-[9.5px] font-bold uppercase tracking-wider text-violet-400 mb-1">Today</div>
                <div className="text-xs text-slate-600 leading-snug">{member.today}</div>
              </div>

              {member.blocker && (
                <div className="bg-rose-500/5 rounded-lg px-3 py-2.5">
                  <div className="text-[9.5px] font-bold uppercase tracking-wider text-rose-600 mb-1">Blockers</div>
                  <div className="text-xs text-rose-600 leading-snug">{member.blocker}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
