import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const ScrumMasterDashboardView: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">SPRINT NAME</div>
          <div className="text-2xl font-black text-slate-900 leading-none mb-2">Sprint 12</div>
          <div className="text-xs font-bold text-emerald-500">IPMT Platform v2</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">DAYS REMAINING</div>
          <div className="text-3xl font-black text-slate-900 leading-none mb-2">14</div>
          <div className="text-xs font-bold text-slate-400">of 21 total</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">TASKS DONE</div>
          <div className="text-3xl font-black text-slate-900 leading-none mb-2">7 / 18</div>
          <div className="text-xs font-bold text-emerald-500">38% complete</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">BLOCKERS</div>
          <div className="text-3xl font-black text-slate-900 leading-none mb-2">1</div>
          <div className="text-xs font-bold text-rose-500">Needs resolution</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
          <span className="text-[10px] font-extrabold tracking-wider text-emerald-500 uppercase">SPRINT GOAL</span>
          <p className="text-lg font-extrabold text-slate-900 mt-3 leading-relaxed">
            "Deliver the core design system, task board enhancements, and mobile responsiveness for the IPMT Platform."
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
          <h3 className="text-sm font-extrabold text-slate-900 mb-4">Ceremony Schedule</h3>
          <div className="space-y-3">
            {[
              { name: 'Daily Standup', time: '9:30 AM — Daily', status: 'Scheduled', color: 'text-emerald-500' },
              { name: 'Sprint Review / Demo', time: 'Aug 8 · 3:00 PM', status: 'Scheduled', color: 'text-purple-400' },
              { name: 'Sprint Retrospective', time: 'Aug 9 · 10:00 AM', status: 'Scheduled', color: 'text-cyan-500' },
              { name: 'Sprint 13 Planning', time: 'Aug 18 · 9:00 AM', status: 'Scheduled', color: 'text-amber-500' }
            ].map((c, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${c.color.replace('text-', 'bg-')}`}></span>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{c.name}</div>
                    <div className="text-[10px] text-slate-400">{c.time}</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-6 shadow-2xs">
        <div className="text-xs font-extrabold text-rose-600 uppercase tracking-wider mb-3 flex items-center gap-2">
          <AlertTriangle size={16} /> Active Blockers
        </div>
        <div className="bg-white border border-rose-100 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-extrabold text-slate-900">Divya Mehta — Waiting for brand color tokens</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Blocks: T-044 Mobile responsive layout · T-047 Dark mode theming · Raised 2 days ago</div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-rose-50 text-rose-600 border border-rose-200 rounded-lg text-xs font-bold hover:bg-rose-100 cursor-pointer">Escalate</button>
            <button className="px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-lg text-xs font-bold hover:bg-emerald-100 cursor-pointer">Mark Resolved</button>
          </div>
        </div>
      </div>
    </>
  );
};
