import React from 'react';
import { FileText, Flame, User, Building2, Scale, Clock } from 'lucide-react';

export const AnalyticsSection: React.FC = () => {
  const kpis = [
    { label: 'Sprint Velocity', value: '87%', sub: '87 pts • target 80', stroke: '#10b981' },
    { label: 'Sprint Progress', value: '72%', sub: '42 of 58 tasks', stroke: '#a855f7' },
    { label: 'Estimation Accuracy', value: '95%', sub: 'Est. vs Actual hrs', stroke: '#06b6d4' },
    { label: 'Resource Utilization', value: '68%', sub: 'Team capacity', stroke: '#34d399' },
    { label: 'Dev Productivity', value: '91%', sub: 'Story pts delivered', stroke: '#8b5cf6' },
    { label: 'On-Time Tasks', value: '83%', sub: 'Due date adherence', stroke: '#10b981' }
  ];

  const reports = [
    { icon: <FileText size={18} className="text-slate-400" />, title: 'Project Report', type: 'PDF/Excel/CSV' },
    { icon: <Flame size={18} className="text-amber-500" />, title: 'Sprint Report', type: 'PDF/Excel/CSV' },
    { icon: <User size={18} className="text-cyan-500" />, title: 'Employee Report', type: 'PDF/Excel/CSV' },
    { icon: <Building2 size={18} className="text-slate-400" />, title: 'Department Report', type: 'PDF/Excel/CSV' },
    { icon: <Scale size={18} className="text-purple-400" />, title: 'Workload Report', type: 'Excel/CSV' },
    { icon: <Clock size={18} className="text-rose-500" />, title: 'Task Aging Report', type: 'PDF/Excel' }
  ];

  return (
    <section className="bg-[#0b0f19] text-white py-24 px-6 relative overflow-hidden my-12">
      {/* Background Ambient Glow Lighting */}
      <div className="absolute top-1/4 -left-20 w-[45vw] h-[45vw] bg-emerald-500/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-[45vw] h-[45vw] bg-purple-500/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1240px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-[750px] mx-auto mb-16">
          <span className="inline-block text-xs font-extrabold tracking-widest text-emerald-400 uppercase mb-3">
            ANALYTICS & REPORTS
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-5">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Data-driven</span> decisions, always
          </h2>
          <p className="text-base text-slate-400 leading-relaxed font-medium">
            7 report types, 6 chart formats, PDF/Excel/CSV export. Built for Scrum Masters and management alike.
          </p>
        </div>

        {/* Top Dark KPI Card Panel */}
        <div className="bg-[#121826]/90 border border-slate-800/80 rounded-[32px] p-8 mb-8 shadow-2xl backdrop-blur-md">
          <div className="text-[10px] font-black tracking-widest text-slate-500 uppercase mb-8">
            SPRINT 14 KPIS
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {kpis.map((kpi, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {/* SVG Donut Ring */}
                <div className="relative w-24 h-24 flex items-center justify-center mb-3">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      strokeWidth="3.5"
                      strokeDasharray="100"
                      strokeDashoffset={100 - parseInt(kpi.value)}
                      strokeLinecap="round"
                      stroke={kpi.stroke}
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-lg font-black text-white">{kpi.value}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-200 mb-0.5">{kpi.label}</h4>
                <span className="text-[10px] text-slate-500">{kpi.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Charts Grid (Velocity, Task Distribution, Burndown) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Sprint Velocity Dark Chart */}
          <div className="bg-[#121826]/90 border border-slate-800/80 rounded-[28px] p-7 shadow-xl">
            <h3 className="text-base font-extrabold text-white mb-1">Sprint Velocity</h3>
            <p className="text-xs text-slate-500 mb-6">Story points per sprint (S8–S14)</p>

            <div className="flex items-end justify-between h-40 pt-4 px-1 gap-2">
              {[
                { val: 62, lbl: 'S8', heightPx: 45 },
                { val: 68, lbl: 'S9', heightPx: 58 },
                { val: 71, lbl: 'S10', heightPx: 64 },
                { val: 75, lbl: 'S11', heightPx: 72 },
                { val: 80, lbl: 'S12', heightPx: 85 },
                { val: 84, lbl: 'S13', heightPx: 95 },
                { val: 87, lbl: 'S14', heightPx: 110, highlight: true }
              ].map((bar, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 flex-1 h-full justify-end">
                  <span className="text-[10px] font-medium text-slate-400">{bar.val}</span>
                  <div 
                    style={{ height: `${bar.heightPx}px` }} 
                    className={`w-full rounded-md transition-all ${
                      bar.highlight 
                        ? 'bg-gradient-to-t from-[#8b5cf6] to-[#a855f7] shadow-lg shadow-purple-500/40 border border-purple-400/30' 
                        : 'bg-[#8b5cf6]/20 border border-purple-400/10 hover:bg-[#8b5cf6]/35'
                    }`}
                  ></div>
                  <span className="text-[10px] text-slate-500 font-medium">{bar.lbl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Task Distribution Donut Chart */}
          <div className="bg-[#121826]/90 border border-slate-800/80 rounded-[28px] p-7 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-base font-extrabold text-white mb-1">Task Distribution</h3>
              <p className="text-xs text-slate-500 mb-4">By status • Sprint 14</p>
            </div>

            <div className="flex items-center justify-center my-2">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="40 100" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#a855f7" strokeWidth="4" strokeDasharray="22 100" strokeDashoffset="-40" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#06b6d4" strokeWidth="4" strokeDasharray="20 100" strokeDashoffset="-62" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="10 100" strokeDashoffset="-82" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="8 100" strokeDashoffset="-92" />
                </svg>
                <div className="absolute text-center">
                  <div className="text-xl font-black text-white">58</div>
                  <div className="text-[9px] text-slate-500 uppercase font-bold">tasks</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-xs">
              <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Done</span> <span className="font-bold text-emerald-400">24</span></div>
              <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500"></span> In Progress</span> <span className="font-bold text-purple-400">13</span></div>
              <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-cyan-500"></span> Review</span> <span className="font-bold text-cyan-400">12</span></div>
              <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Blocked</span> <span className="font-bold text-amber-400">6</span></div>
              <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Backlog</span> <span className="font-bold text-rose-400">3</span></div>
            </div>
          </div>

          {/* Burndown Chart Dark Card */}
          <div className="bg-[#121826]/90 border border-slate-800/80 rounded-[28px] p-7 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-base font-extrabold text-white mb-1">Burndown Chart</h3>
              <p className="text-xs text-slate-500 mb-4">Remaining story points</p>
            </div>

            <div className="my-4">
              <svg viewBox="0 0 200 70" className="w-full h-24">
                <line x1="0" y1="10" x2="200" y2="60" stroke="#334155" strokeDasharray="3 3" strokeWidth="1.5" />
                <path d="M0 60 Q 50 40, 100 25 T 200 10 L 200 70 L 0 70 Z" fill="rgba(16,185,129,0.15)"/>
                <path d="M0 60 Q 50 40, 100 25 T 200 10" fill="none" stroke="#10b981" strokeWidth="2.5" />
              </svg>
              <div className="flex justify-between text-[10px] text-slate-500 font-bold mt-1">
                <span>Day 1</span>
                <span>Day 14</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
              <div>
                <div className="text-xl font-black text-emerald-400">3</div>
                <div className="text-[10px] text-slate-500 font-medium">Remaining pts</div>
              </div>
              <div>
                <div className="text-xl font-black text-white">55</div>
                <div className="text-[10px] text-slate-500 font-medium">Completed pts</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom 6 Export Reports Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {reports.map((rep, i) => (
            <div key={i} className="bg-[#121826]/80 border border-slate-800/80 hover:border-emerald-500/50 p-4 rounded-2xl flex items-center gap-3 transition-all cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                {rep.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">{rep.title}</h4>
                <p className="text-[10px] text-slate-500">{rep.type}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
