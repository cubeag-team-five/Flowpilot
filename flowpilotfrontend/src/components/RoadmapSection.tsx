import React from 'react';
import { Check } from 'lucide-react';

export const RoadmapSection: React.FC = () => {
  return (
    <section className="py-24 px-6 max-w-[1240px] mx-auto">
      <div className="text-center max-w-[750px] mx-auto mb-16">
        <span className="inline-block text-xs font-extrabold tracking-widest text-emerald-600 uppercase mb-3">
          PRODUCT ROADMAP
        </span>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-5">
          What's coming next
        </h2>
        <p className="text-base text-slate-500 leading-relaxed font-medium">
          Based on the SRS Future Enhancements section — AI-powered features, mobile, and deeper integrations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1: V1.0 • Live */}
        <div className="bg-white rounded-[28px] p-8 border border-slate-100 shadow-xl shadow-slate-900/5 border-t-4 border-t-emerald-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-extrabold text-slate-900">V1.0 • Live</h3>
            <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 uppercase tracking-wider">
              ✓ LIVE
            </span>
          </div>

          <ul className="flex flex-col gap-3.5 text-xs font-medium text-slate-600">
            <li className="flex items-center gap-2.5"><Check size={14} className="text-emerald-500 shrink-0" /> Auth & RBAC (9 roles)</li>
            <li className="flex items-center gap-2.5"><Check size={14} className="text-emerald-500 shrink-0" /> Project Management</li>
            <li className="flex items-center gap-2.5"><Check size={14} className="text-emerald-500 shrink-0" /> Scrum Board (8 columns)</li>
            <li className="flex items-center gap-2.5"><Check size={14} className="text-emerald-500 shrink-0" /> Sprint Planning & Velocity</li>
            <li className="flex items-center gap-2.5"><Check size={14} className="text-emerald-500 shrink-0" /> Reports & Analytics</li>
            <li className="flex items-center gap-2.5"><Check size={14} className="text-emerald-500 shrink-0" /> Notifications</li>
            <li className="flex items-center gap-2.5"><Check size={14} className="text-emerald-500 shrink-0" /> File Attachments</li>
            <li className="flex items-center gap-2.5"><Check size={14} className="text-emerald-500 shrink-0" /> Audit Logs</li>
          </ul>
        </div>

        {/* Card 2: V2.0 • Q4 2026 */}
        <div className="bg-white rounded-[28px] p-8 border border-slate-100 shadow-xl shadow-slate-900/5 border-t-4 border-t-purple-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-extrabold text-slate-900">V2.0 • Q4 2026</h3>
            <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-purple-50 text-purple-600 uppercase tracking-wider">
              ⚡ BUILDING
            </span>
          </div>

          <ul className="flex flex-col gap-3.5 text-xs font-medium text-slate-600">
            <li className="flex items-center gap-2.5"><Check size={14} className="text-purple-500 shrink-0" /> Real-time Chat</li>
            <li className="flex items-center gap-2.5"><Check size={14} className="text-purple-500 shrink-0" /> Gantt Charts</li>
            <li className="flex items-center gap-2.5"><Check size={14} className="text-purple-500 shrink-0" /> AI Task Estimation</li>
            <li className="flex items-center gap-2.5"><Check size={14} className="text-purple-500 shrink-0" /> Calendar Sync (Google/Outlook)</li>
            <li className="flex items-center gap-2.5"><Check size={14} className="text-purple-500 shrink-0" /> GitHub Integration</li>
            <li className="flex items-center gap-2.5"><Check size={14} className="text-purple-500 shrink-0" /> Slack Notifications</li>
          </ul>
        </div>

        {/* Card 3: V3.0 • 2027 */}
        <div className="bg-white rounded-[28px] p-8 border border-slate-100 shadow-xl shadow-slate-900/5 border-t-4 border-t-slate-400">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-extrabold text-slate-900">V3.0 • 2027</h3>
            <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-500 uppercase tracking-wider">
              📅 PLANNED
            </span>
          </div>

          <ul className="flex flex-col gap-3.5 text-xs font-medium text-slate-400">
            <li className="flex items-center gap-2.5"><Check size={14} className="text-slate-300 shrink-0" /> Mobile App (React Native)</li>
            <li className="flex items-center gap-2.5"><Check size={14} className="text-slate-300 shrink-0" /> GitLab/Jira Import</li>
            <li className="flex items-center gap-2.5"><Check size={14} className="text-slate-300 shrink-0" /> Time Tracking & Timesheets</li>
            <li className="flex items-center gap-2.5"><Check size={14} className="text-slate-300 shrink-0" /> OCR Document Upload</li>
            <li className="flex items-center gap-2.5"><Check size={14} className="text-slate-300 shrink-0" /> Predictive Analytics AI</li>
            <li className="flex items-center gap-2.5"><Check size={14} className="text-slate-300 shrink-0" /> Workflow Automation</li>
          </ul>
        </div>

      </div>
    </section>
  );
};
