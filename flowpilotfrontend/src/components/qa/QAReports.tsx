import React from 'react';

export const QAReports: React.FC = () => {
  const reports = [
    {
      name: 'Sprint 12 QA Report',
      type: 'Sprint Report',
      status: 'Completed',
      date: 'Aug 7, 2026',
    },
    {
      name: 'Application Quality Report',
      type: 'Quality Report',
      status: 'Completed',
      date: 'Aug 6, 2026',
    },
    {
      name: 'Regression Test Report',
      type: 'Regression',
      status: 'In Progress',
      date: 'Aug 5, 2026',
    },
    {
      name: 'Security Testing Report',
      type: 'Security',
      status: 'Completed',
      date: 'Aug 4, 2026',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Quality Reports
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          View QA reports and testing summaries
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
          <div className="text-[11px] font-extrabold text-slate-400 uppercase">
            Total Reports
          </div>

          <div className="text-3xl font-black text-slate-900 mt-2">
            24
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
          <div className="text-[11px] font-extrabold text-slate-400 uppercase">
            Completed
          </div>

          <div className="text-3xl font-black text-slate-900 mt-2">
            21
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
          <div className="text-[11px] font-extrabold text-slate-400 uppercase">
            In Progress
          </div>

          <div className="text-3xl font-black text-slate-900 mt-2">
            3
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <h2 className="text-base font-extrabold text-slate-900 mb-4">
          Recent Quality Reports
        </h2>

        <div>
          {reports.map((report) => (
            <div
              key={report.name}
              className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0"
            >
              <div>
                <div className="text-sm font-bold text-slate-900">
                  {report.name}
                </div>

                <div className="text-[11px] text-slate-400 mt-1">
                  {report.type} · {report.date}
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                  report.status === 'Completed'
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                    : 'bg-amber-50 text-amber-600 border-amber-200'
                }`}
              >
                {report.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};