import React from 'react';
import { Plus, FileText, Settings } from 'lucide-react';

export const SuperAdminDashboard: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">TOTAL USERS</div>
          <div className="text-3xl font-black text-slate-900 leading-none mb-2">48</div>
          <div className="text-xs font-bold text-emerald-500 flex items-center gap-1">↑ 3 this week</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">DEPARTMENTS</div>
          <div className="text-3xl font-black text-slate-900 leading-none mb-2">6</div>
          <div className="text-xs font-bold text-emerald-500">All active</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">ACTIVE PROJECTS</div>
          <div className="text-3xl font-black text-slate-900 leading-none mb-2">24</div>
          <div className="text-xs font-bold text-amber-500">5 at risk</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">SYSTEM UPTIME</div>
          <div className="text-3xl font-black text-slate-900 leading-none mb-2">99.9%</div>
          <div className="text-xs font-bold text-emerald-500">Last 30 days</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
          <h3 className="text-sm font-extrabold text-slate-900 mb-5">Recent User Registrations</h3>
          <div className="flex flex-col gap-4">
            {[
              { name: 'Rajeev Kumar', role: 'Super Admin', dept: 'Leadership', time: '2 min ago', avatar: 'RK', bg: 'bg-emerald-500' },
              { name: 'Nisha Agarwal', role: 'Admin', dept: 'Operations', time: '12 min ago', avatar: 'NA', bg: 'bg-teal-500' },
              { name: 'Arjun Shah', role: 'Project Manager', dept: 'Product', time: '1 h ago', avatar: 'AS', bg: 'bg-emerald-500' },
              { name: 'Aryan Kapoor', role: 'Scrum Master', dept: 'Engineering', time: '30 min ago', avatar: 'AK', bg: 'bg-teal-500' },
              { name: 'Sneha Rao', role: 'Developer', dept: 'Engineering', time: '5 min ago', avatar: 'SR', bg: 'bg-emerald-500' }
            ].map((user, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${user.bg} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                    {user.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{user.name}</div>
                    <div className="text-[11px] text-slate-400">{user.role} · {user.dept}</div>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-slate-400">{user.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
          <h3 className="text-sm font-extrabold text-slate-900 mb-5">System Health</h3>
          <div className="space-y-4">
            {[
              { name: 'Database', pct: '99%', color: 'bg-emerald-500', text: 'text-emerald-500' },
              { name: 'API Server', pct: '100%', color: 'bg-emerald-500', text: 'text-emerald-500' },
              { name: 'Storage', pct: '67%', color: 'bg-amber-500', text: 'text-amber-500' },
              { name: 'Email Service', pct: '100%', color: 'bg-emerald-500', text: 'text-emerald-500' },
              { name: 'Auth Service', pct: '100%', color: 'bg-emerald-500', text: 'text-emerald-500' },
              { name: 'File CDN', pct: '88%', color: 'bg-cyan-500', text: 'text-cyan-500' }
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-600">{item.name}</span>
                  <span className={item.text}>{item.pct}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: item.pct }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
        <div className="text-xs font-extrabold text-slate-900 mb-3 uppercase tracking-wider">Quick Actions</div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-4 py-2 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors flex items-center gap-1.5 cursor-pointer">
            <Plus size={14} /> Add User
          </button>
          <button className="px-4 py-2 bg-purple-50 text-purple-600 border border-purple-200 rounded-xl text-xs font-bold hover:bg-purple-100 transition-colors flex items-center gap-1.5 cursor-pointer">
            <Plus size={14} /> New Department
          </button>
          <button className="px-4 py-2 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold hover:bg-rose-100 transition-colors flex items-center gap-1.5 cursor-pointer">
            <FileText size={14} /> View Audit Logs
          </button>
          <button className="px-4 py-2 bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer">
            <Settings size={14} /> System Settings
          </button>
        </div>
      </div>
    </>
  );
};
