import React from 'react';

export const QATestCoverage: React.FC = () => {
  const coverage = [
    {
      name: 'Functional Testing',
      percentage: 92,
      tests: '46 / 50 tests',
    },
    {
      name: 'UI / UX Testing',
      percentage: 84,
      tests: '42 / 50 tests',
    },
    {
      name: 'Integration Testing',
      percentage: 78,
      tests: '39 / 50 tests',
    },
    {
      name: 'Security Testing',
      percentage: 88,
      tests: '44 / 50 tests',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Test Coverage
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Monitor testing coverage across the application
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
          <div className="text-[11px] font-extrabold text-slate-400 uppercase">
            Overall Coverage
          </div>

          <div className="text-3xl font-black text-slate-900 mt-2">
            86%
          </div>

          <div className="text-xs font-bold text-emerald-500 mt-2">
            Good coverage
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
          <div className="text-[11px] font-extrabold text-slate-400 uppercase">
            Total Tests
          </div>

          <div className="text-3xl font-black text-slate-900 mt-2">
            200
          </div>

          <div className="text-xs text-slate-400 mt-2">
            Test cases
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
          <div className="text-[11px] font-extrabold text-slate-400 uppercase">
            Passed
          </div>

          <div className="text-3xl font-black text-slate-900 mt-2">
            172
          </div>

          <div className="text-xs font-bold text-emerald-500 mt-2">
            86% passed
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
          <div className="text-[11px] font-extrabold text-slate-400 uppercase">
            Remaining
          </div>

          <div className="text-3xl font-black text-slate-900 mt-2">
            28
          </div>

          <div className="text-xs text-amber-500 font-bold mt-2">
            Needs testing
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <h2 className="text-base font-extrabold text-slate-900 mb-5">
          Coverage by Test Area
        </h2>

        <div className="space-y-5">
          {coverage.map((item) => (
            <div key={item.name}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {item.name}
                  </div>

                  <div className="text-[11px] text-slate-400">
                    {item.tests}
                  </div>
                </div>

                <span className="text-sm font-bold text-slate-700">
                  {item.percentage}%
                </span>
              </div>

              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};