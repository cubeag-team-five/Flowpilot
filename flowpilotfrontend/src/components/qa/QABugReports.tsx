import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const QABugReports: React.FC = () => {
  const bugs = [
    {
      id: 'BUG-089',
      title: 'Velocity chart not rendering on Firefox',
      date: 'Aug 4',
      severity: 'Medium',
      color: 'bg-amber-50 text-amber-600 border-amber-200',
    },
    {
      id: 'BUG-088',
      title: 'File upload fails for PDF > 10MB',
      date: 'Aug 3',
      severity: 'High',
      color: 'bg-rose-50 text-rose-600 border-rose-200',
    },
    {
      id: 'BUG-087',
      title: 'Mobile nav menu overlaps content at 320px',
      date: 'Aug 3',
      severity: 'Low',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      id: 'BUG-085',
      title: 'Sprint board drag-drop resets on refresh',
      date: 'Jul 30',
      severity: 'High',
      color: 'bg-rose-50 text-rose-600 border-rose-200',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Bug Reports
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Track and manage reported bugs
        </p>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <h2 className="text-base font-extrabold text-slate-900 mb-4">
          Recent Bugs Filed
        </h2>

        <div className="space-y-1">
          {bugs.map((bug) => (
            <div
              key={bug.id}
              className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle
                  size={16}
                  className="text-rose-500 shrink-0"
                />

                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {bug.title}
                  </div>

                  <div className="text-[11px] text-slate-400">
                    {bug.id} · {bug.date}
                  </div>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold border px-2.5 py-0.5 rounded-full ${bug.color}`}
              >
                {bug.severity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};