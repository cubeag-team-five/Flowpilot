import React from 'react';

export const DeveloperDashboardView: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">TASKS THIS SPRINT</div>
          <div className="text-3xl font-black text-slate-900 leading-none mb-2">4</div>
          <div className="text-xs font-bold text-emerald-500">1 done · 2 in progress</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">STORY POINTS</div>
          <div className="text-3xl font-black text-slate-900 leading-none mb-2">23 SP</div>
          <div className="text-xs font-bold text-emerald-500">10 SP completed</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">HOURS THIS WEEK</div>
          <div className="text-3xl font-black text-slate-900 leading-none mb-2">18h</div>
          <div className="text-xs font-bold text-emerald-500">across 5 tasks</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">UNREAD MENTIONS</div>
          <div className="text-3xl font-black text-slate-900 leading-none mb-2">2</div>
          <div className="text-xs font-bold text-purple-500">Need your attention</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
          <h3 className="text-sm font-extrabold text-slate-900 mb-5">My Sprint Tasks</h3>
          <div className="space-y-3">
            {[
              { title: 'Design system component library', code: 'T-040 · 8 SP · Due Aug 8', status: 'In Progress', color: 'bg-amber-100 text-amber-700' },
              { title: 'Mobile responsive layout', code: 'T-044 · 5 SP · Due Aug 7', status: 'In Progress', color: 'bg-amber-100 text-amber-700' },
              { title: 'JWT token refresh logic', code: 'T-046 · 2 SP · Due Aug 3', status: 'Done', color: 'bg-emerald-100 text-emerald-700' },
              { title: 'Kanban drag & drop', code: 'T-049 · 8 SP · Due Aug 12', status: 'To Do', color: 'bg-slate-100 text-slate-600' }
            ].map((task, i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:border-slate-200 transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${task.status === 'Done' ? 'bg-emerald-500' : task.status === 'In Progress' ? 'bg-amber-500' : 'bg-slate-300'}`}></span>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{task.title}</div>
                    <div className="text-[10px] text-slate-400">{task.code}</div>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${task.color}`}>{task.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
          <h3 className="text-sm font-extrabold text-slate-900 mb-5">Daily Hours (This Week)</h3>
          <div className="flex items-end justify-between gap-3 h-36 pt-6">
            {[
              { day: 'Mon', hrs: '3.5h', pct: '45%' },
              { day: 'Tue', hrs: '5h', pct: '65%' },
              { day: 'Wed', hrs: '4.5h', pct: '58%' },
              { day: 'Thu', hrs: '6.5h', pct: '85%' },
              { day: 'Fri', hrs: '6h', pct: '80%' }
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold text-slate-500">{bar.hrs}</span>
                <div className="w-full bg-emerald-100 rounded-t-lg relative" style={{ height: bar.pct }}>
                  <div className="absolute inset-0 bg-teal-300 rounded-t-lg opacity-80"></div>
                </div>
                <span className="text-[11px] font-bold text-slate-400">{bar.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold">
            <span className="text-slate-400">Week Total</span>
            <span className="text-emerald-500">18h</span>
          </div>
        </div>
      </div>
    </>
  );
};
