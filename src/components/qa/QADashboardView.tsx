import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const QADashboardView: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">TESTS IN PROGRESS</div>
          <div className="text-3xl font-black text-slate-900 leading-none mb-2">2</div>
          <div className="text-xs font-bold text-emerald-500">Active testing tasks</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">TESTS PASSED</div>
          <div className="text-3xl font-black text-slate-900 leading-none mb-2">8</div>
          <div className="text-xs font-bold text-emerald-500">This sprint</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">OPEN BUGS</div>
          <div className="text-3xl font-black text-slate-900 leading-none mb-2">3</div>
          <div className="text-xs font-bold text-rose-500">1 high severity</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase mb-2">PASS RATE</div>
          <div className="text-3xl font-black text-slate-900 leading-none mb-2">84%</div>
          <div className="text-xs font-bold text-emerald-500">Sprint 12 average</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
          <h3 className="text-sm font-extrabold text-slate-900 mb-5">Test Task Status</h3>
          <div className="space-y-3">
            {[
              { title: 'Test velocity tracking module', sub: 'Functional · T-042', status: 'Passed', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
              { title: 'Test mobile responsive layout', sub: 'UI/UX · T-044', status: 'In Testing', color: 'bg-amber-50 text-amber-600 border-amber-200' },
              { title: 'Test file upload S3 integration', sub: 'Integration · T-045', status: 'In Testing', color: 'bg-amber-50 text-amber-600 border-amber-200' },
              { title: 'Test JWT token refresh', sub: 'Security · T-046', status: 'Passed', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
              { title: 'API endpoint response validation', sub: 'API · T-041', status: 'Pending', color: 'bg-slate-50 text-slate-500 border-slate-200' }
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${t.status === 'Passed' ? 'bg-emerald-500' : t.status === 'In Testing' ? 'bg-amber-500' : 'bg-slate-300'}`}></span>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{t.title}</div>
                    <div className="text-[11px] text-slate-400">{t.sub}</div>
                  </div>
                </div>
                <span className={`text-[10px] font-bold border px-2.5 py-0.5 rounded-full ${t.color}`}>{t.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
          <h3 className="text-sm font-extrabold text-slate-900 mb-5">Recent Bugs Filed</h3>
          <div className="space-y-3">
            {[
              { title: 'Velocity chart not rendering on Firefox', sub: 'BUG-089 · Aug 4', sev: 'Medium', color: 'bg-amber-50 text-amber-600 border-amber-200' },
              { title: 'File upload fails for PDF > 10MB', sub: 'BUG-088 · Aug 3', sev: 'High', color: 'bg-rose-50 text-rose-600 border-rose-200' },
              { title: 'Mobile nav menu overlaps content at 320px', sub: 'BUG-087 · Aug 3', sev: 'Low', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
              { title: 'Sprint board drag-drop resets on refresh', sub: 'BUG-085 · Jul 30', sev: 'High', color: 'bg-rose-50 text-rose-600 border-rose-200' }
            ].map((b, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={14} className="text-rose-500 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{b.title}</div>
                    <div className="text-[11px] text-slate-400">{b.sub}</div>
                  </div>
                </div>
                <span className={`text-[10px] font-bold border px-2.5 py-0.5 rounded-full ${b.color}`}>{b.sev}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
