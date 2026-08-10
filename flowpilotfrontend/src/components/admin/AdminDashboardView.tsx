import React from 'react';
import { Activity } from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">ACTIVE USERS</div>
          <div className="text-3xl font-black text-slate-900 leading-none mb-2">46</div>
          <div className="text-xs font-bold text-amber-500">+3 this month</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">DEPARTMENTS</div>
          <div className="text-3xl font-black text-slate-900 leading-none mb-2">6</div>
          <div className="text-xs font-bold text-emerald-500">All operational</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">OPEN TICKETS</div>
          <div className="text-3xl font-black text-slate-900 leading-none mb-2">12</div>
          <div className="text-xs font-bold text-rose-500">3 urgent</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">PENDING APPROVALS</div>
          <div className="text-3xl font-black text-slate-900 leading-none mb-2">5</div>
          <div className="text-xs font-bold text-purple-500">Role changes</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
          <h3 className="text-sm font-extrabold text-slate-900 mb-5">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { text: 'Role assigned to Rohit Varma: Business Analyst', time: '2h ago' },
              { text: 'New department "DevOps" created', time: '5h ago' },
              { text: 'User Divya Mehta disabled — inactive 30 days', time: 'Yesterday' },
              { text: 'Password reset for Vikram Jain', time: '2 days ago' },
              { text: '12 users onboarded to IPMT Platform v2', time: 'Last week' }
            ].map((act, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
                <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Activity size={14} className="text-slate-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">{act.text}</div>
                  <div className="text-[11px] text-slate-400">{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
          <h3 className="text-sm font-extrabold text-slate-900 mb-5">User Role Distribution</h3>
          <div className="space-y-3.5">
            {[
              { role: 'Developer', count: 18, pct: '75%', color: 'bg-cyan-400' },
              { role: 'QA Engineer', count: 7, pct: '30%', color: 'bg-emerald-400' },
              { role: 'Project Manager', count: 4, pct: '18%', color: 'bg-purple-400' },
              { role: 'Scrum Master', count: 3, pct: '14%', color: 'bg-emerald-500' },
              { role: 'Admin', count: 2, pct: '10%', color: 'bg-amber-400' },
              { role: 'Viewer', count: 8, pct: '35%', color: 'bg-indigo-400' },
              { role: 'Others', count: 6, pct: '25%', color: 'bg-slate-300' }
            ].map((r, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-600">{r.role}</span>
                  <span className="text-slate-900">{r.count}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${r.color}`} style={{ width: r.pct }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
