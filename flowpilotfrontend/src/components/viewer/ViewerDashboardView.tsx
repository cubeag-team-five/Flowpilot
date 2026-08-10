import React from 'react';
import { Eye } from 'lucide-react';

export const ViewerDashboardView: React.FC = () => {
  return (
    <>
      <div className="bg-slate-100/80 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
          <Eye size={16} className="text-slate-500" />
          You have read-only access. To request additional permissions, contact your Admin.
        </div>
        <button className="px-4 py-1.5 bg-slate-200/80 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer">
          Request Access
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">TOTAL PROJECTS</div>
          <div className="text-3xl font-black text-slate-900 leading-none">24</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">ACTIVE / IN PROGRESS</div>
          <div className="text-3xl font-black text-emerald-500 leading-none">16</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">TEAMS INVOLVED</div>
          <div className="text-3xl font-black text-slate-900 leading-none">6</div>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { id: 'PRJ-001', name: 'Flowpilot Platform v2', pm: 'Arjun Shah · 12 members', sprint: 'Sprint 12', pct: '72%', status: 'On Track', barColor: 'bg-emerald-500', badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
          { id: 'PRJ-002', name: 'E-Commerce Relaunch', pm: 'Rohit Varma · 8 members', sprint: 'Sprint 8', pct: '45%', status: 'At Risk', barColor: 'bg-amber-500', badgeColor: 'bg-amber-50 text-amber-600 border-amber-200' },
          { id: 'PRJ-003', name: 'Mobile App Development', pm: 'Arjun Shah · 6 members', sprint: 'Sprint 2', pct: '22%', status: 'On Track', barColor: 'bg-emerald-500', badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
          { id: 'PRJ-004', name: 'API Gateway Migration', pm: 'Karan Mehta · 5 members', sprint: 'Sprint 5', pct: '58%', status: 'Delayed', barColor: 'bg-rose-500', badgeColor: 'bg-rose-50 text-rose-600 border-rose-200' }
        ].map((prj) => (
          <div key={prj.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase mb-0.5">{prj.id}</div>
              <div className="text-base font-extrabold text-slate-900">{prj.name}</div>
              <div className="text-xs text-slate-400 mt-0.5">PM: {prj.pm}</div>
            </div>

            <div className="flex items-center gap-6 w-full sm:w-auto">
              <div className="flex-1 sm:w-48">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-400">{prj.sprint}</span>
                  <span className="text-slate-900">{prj.pct}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${prj.barColor}`} style={{ width: prj.pct }}></div>
                </div>
              </div>
              <span className={`text-xs font-bold border px-3 py-1 rounded-full ${prj.badgeColor}`}>{prj.status}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
