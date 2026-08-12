import React, { useState } from 'react';
import { Flag, FolderPlus, RefreshCw, BarChart3, CheckCircle2 } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { id: 1, label: 'Set Up Your Workspace', icon: <Flag size={16} /> },
    { id: 2, label: 'Create Projects & Sprints', icon: <FolderPlus size={16} /> },
    { id: 3, label: 'Execute on the Scrum Board', icon: <RefreshCw size={16} /> },
    { id: 4, label: 'Track & Report in Real-Time', icon: <BarChart3 size={16} /> }
  ];

  return (
    <section className="w-full bg-white py-24 px-6" id="features">
      <div className="max-w-[1200px] mx-auto">
      <div className="text-center max-w-[850px] mx-auto mb-12">
        <span className="inline-block text-xs font-black tracking-[0.2em] text-emerald-500 uppercase mb-4">
          HOW IT WORKS
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-slate-900 mb-4 leading-tight">
          From chaos to clarity in 4 steps
        </h2>
        <p className="text-base sm:text-lg text-slate-500 leading-relaxed font-medium max-w-[550px] mx-auto">
          Setup to shipping in the same sprint. No steep learning curve.
        </p>
      </div>

      {/* 4 Steps Nav Switcher Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {steps.map(step => (
          <button
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold border transition-all cursor-pointer shadow-2xs ${
              activeStep === step.id
                ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/30'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span className="text-[11px] font-extrabold opacity-80">0{step.id}</span>
            <span>{step.icon}</span>
            <span>{step.label}</span>
          </button>
        ))}
      </div>

      {/* Dynamic Interactive Content Area */}
      <div className="bg-white/85 backdrop-blur-xl border border-white/90 p-8 sm:p-12 rounded-3xl shadow-xl shadow-slate-900/5">
        {activeStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 items-center">
            <div>
              <span className="inline-block text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-4">
                01
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Set Up Your Workspace
              </h3>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                Create your organization, define departments, and onboard team members with role-based access. Super Admin, Admin, Project Manager — all nine roles configurable in minutes.
              </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-md shadow-slate-900/5">
              <div className="text-xs font-bold text-slate-900 mb-5">User Onboarding • Engineering Dept.</div>
              
              <div className="flex items-center gap-3 py-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-full bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center">AK</div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-900">Aryan Kapoor</div>
                  <div className="text-[11px] text-slate-400">EMP-001 • Scrum Master • Engineering</div>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={12}/> Active
                </span>
              </div>

              <div className="flex items-center gap-3 py-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-full bg-amber-500 text-white font-extrabold text-xs flex items-center justify-center">SR</div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-900">Sneha Rao</div>
                  <div className="text-[11px] text-slate-400">EMP-002 • Developer • Frontend</div>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600">
                  Invited
                </span>
              </div>

              <div className="flex items-center gap-3 py-3">
                <div className="w-9 h-9 rounded-full bg-cyan-500 text-white font-extrabold text-xs flex items-center justify-center">MK</div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-900">Mihir Khatri</div>
                  <div className="text-[11px] text-slate-400">EMP-003 • QA Engineer • Quality</div>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={12}/> Active
                </span>
              </div>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 items-center">
            <div>
              <span className="inline-block text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-4">
                02
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Create Projects & Sprints
              </h3>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                Create projects with client, timeline, priority, and team. Build your product backlog, then run sprint planning to pull tasks into 2-week sprints with capacity and story points.
              </p>
            </div>
            
            {/* Interactive Mockup Panel matching Figma Screenshot 1 */}
            <div className="flex flex-col gap-4">
              {/* IPMT Platform Progress Card */}
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-md shadow-slate-900/5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900">IPMT Platform</h4>
                    <p className="text-[11px] font-semibold text-slate-400">PRJ-001 • Sprint 14 of 20</p>
                  </div>
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 uppercase tracking-wider">
                    ON TRACK
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                  <div className="bg-emerald-400 h-full w-[68%] rounded-full"></div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span>Sprint 14 active</span>
                  <span>68% complete</span>
                </div>
              </div>

              {/* Sprint 14 Backlog List Card */}
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-md shadow-slate-900/5">
                <div className="text-xs font-bold text-slate-900 mb-4">Sprint 14 Backlog • 58 story points</div>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between py-2 border-b border-slate-100 text-xs">
                    <div className="flex items-center gap-2 font-semibold text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      <span>FR-001 User Authentication</span>
                    </div>
                    <span className="text-[11px] font-bold text-purple-600">8sp</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-slate-100 text-xs">
                    <div className="flex items-center gap-2 font-semibold text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>FR-011 Project Dashboard</span>
                    </div>
                    <span className="text-[11px] font-bold text-purple-600">5sp</span>
                  </div>

                  <div className="flex items-center justify-between py-2 text-xs">
                    <div className="flex items-center gap-2 font-semibold text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>FR-024 Notifications System</span>
                    </div>
                    <span className="text-[11px] font-bold text-purple-600">3sp</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 items-center">
            <div>
              <span className="inline-block text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-4">
                03
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Execute on the Scrum Board
              </h3>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                Drag tasks across 8 columns: Backlog → Sprint Ready → In Progress → Code Review → Testing → Done. WIP limits, priority badges, sprint selector, and quick edit built in.
              </p>
            </div>
            
            {/* Step 3 Scrum Board Active Sprint Card Mockup matching Figma Image 2 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-md shadow-slate-900/5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-extrabold text-slate-900">Scrum Board • Sprint 14</div>
                <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">WIP: 6/8</span>
              </div>
              
              <div className="grid grid-cols-4 gap-2.5 bg-slate-50/50 p-3 rounded-xl">
                <div className="bg-slate-100/60 p-2 rounded-lg">
                  <div className="text-[9px] font-black text-cyan-600 mb-2 uppercase">TO DO</div>
                  <div className="flex flex-col gap-1.5">
                    <div className="bg-white p-2 rounded border border-slate-200/80 text-[10px] font-bold text-slate-800 shadow-2xs">IPMT-34 Reports</div>
                    <div className="bg-white p-2 rounded border border-slate-200/80 text-[10px] font-bold text-slate-800 shadow-2xs">IPMT-35 Export</div>
                  </div>
                </div>

                <div className="bg-slate-100/60 p-2 rounded-lg">
                  <div className="text-[9px] font-black text-purple-600 mb-2 uppercase">IN PROG.</div>
                  <div className="flex flex-col gap-1.5">
                    <div className="bg-white p-2 rounded border border-slate-200/80 text-[10px] font-bold text-slate-800 shadow-2xs">IPMT-28 Auth</div>
                    <div className="bg-white p-2 rounded border border-slate-200/80 text-[10px] font-bold text-slate-800 shadow-2xs">IPMT-29 RBAC</div>
                  </div>
                </div>

                <div className="bg-slate-100/60 p-2 rounded-lg">
                  <div className="text-[9px] font-black text-amber-500 mb-2 uppercase">REVIEW</div>
                  <div className="flex flex-col gap-1.5">
                    <div className="bg-white p-2 rounded border border-slate-200/80 text-[10px] font-bold text-slate-800 shadow-2xs">IPMT-22 API</div>
                  </div>
                </div>

                <div className="bg-slate-100/60 p-2 rounded-lg">
                  <div className="text-[9px] font-black text-emerald-500 mb-2 uppercase">DONE</div>
                  <div className="flex flex-col gap-1.5">
                    <div className="bg-white p-2 rounded border border-slate-200/80 text-[10px] font-bold text-slate-800 shadow-2xs">IPMT-18 UI</div>
                    <div className="bg-white p-2 rounded border border-slate-200/80 text-[10px] font-bold text-slate-800 shadow-2xs">IPMT-19 DB</div>
                    <div className="bg-white p-2 rounded border border-slate-200/80 text-[10px] font-bold text-slate-800 shadow-2xs">IPMT-20 Auth</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 items-center">
            <div>
              <span className="inline-block text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-4">
                04
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Track & Report in Real-Time
              </h3>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                Burndown, burnup, velocity charts, task aging, workload distribution, and KPI dashboards. Export as PDF, Excel, or CSV. Automated notifications keep everyone in sync.
              </p>
            </div>
            
            {/* Step 4 Real-time Analytics Mockup matching Figma Image 1 */}
            <div className="flex flex-col gap-3">
              {/* Velocity Bar Chart Card */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-md shadow-slate-900/5">
                <div className="text-xs font-extrabold text-slate-900 mb-4">Sprint Velocity • S8–S14</div>
                <div className="flex items-end gap-2.5 h-16 pt-2">
                  <div className="flex-1 bg-purple-100/60 rounded-md h-[40%]"></div>
                  <div className="flex-1 bg-purple-100/60 rounded-md h-[55%]"></div>
                  <div className="flex-1 bg-purple-100/60 rounded-md h-[50%]"></div>
                  <div className="flex-1 bg-purple-100/60 rounded-md h-[70%]"></div>
                  <div className="flex-1 bg-purple-100/60 rounded-md h-[65%]"></div>
                  <div className="flex-1 bg-purple-100/60 rounded-md h-[80%]"></div>
                  <div className="flex-1 bg-gradient-to-t from-purple-600 to-purple-500 rounded-md h-[100%] shadow-xs"></div>
                </div>
              </div>

              {/* 4 KPI Grid Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs">
                  <div className="text-2xl font-black text-emerald-500">94%</div>
                  <div className="text-[11px] font-semibold text-slate-400 mt-1">Completion Rate</div>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs">
                  <div className="text-2xl font-black text-cyan-500">2.4d</div>
                  <div className="text-[11px] font-semibold text-slate-400 mt-1">Avg Task Time</div>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs">
                  <div className="text-2xl font-black text-purple-500">3.2%</div>
                  <div className="text-[11px] font-semibold text-slate-400 mt-1">Bug Rate</div>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs">
                  <div className="text-2xl font-black text-emerald-500">91%</div>
                  <div className="text-[11px] font-semibold text-slate-400 mt-1">On-Time Delivery</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </section>
  );
};
