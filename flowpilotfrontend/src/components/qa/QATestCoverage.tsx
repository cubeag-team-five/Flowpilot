import React from "react";

export const QATestCoverage: React.FC = () => {
  const coverageData = [
    {
      name: "Authentication & JWT",
      cases: "12 cases",
      percentage: 92,
      barColor: "bg-emerald-400",
      textColor: "text-emerald-500",
    },
    {
      name: "Task Management",
      cases: "18 cases",
      percentage: 78,
      barColor: "bg-amber-500",
      textColor: "text-amber-500",
    },
    {
      name: "Sprint Board",
      cases: "14 cases",
      percentage: 65,
      barColor: "bg-orange-500",
      textColor: "text-orange-500",
    },
    {
      name: "File Upload / S3",
      cases: "8 cases",
      percentage: 55,
      barColor: "bg-red-500",
      textColor: "text-red-500",
    },
    {
      name: "Notifications",
      cases: "10 cases",
      percentage: 40,
      barColor: "bg-red-500",
      textColor: "text-red-500",
    },
    {
      name: "Analytics / Charts",
      cases: "9 cases",
      percentage: 88,
      barColor: "bg-emerald-400",
      textColor: "text-emerald-500",
    },
  ];

  return (
    <div className="w-full min-h-full bg-[#f8fafc] text-slate-800">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-6 py-4 sm:py-5">

        {/* =========================================================
            COVERAGE SUMMARY
            Mobile: 2 columns
            Desktop: 4 columns
        ========================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5">

          {/* Total Test Cases */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm min-w-0">
            <div className="text-[9px] sm:text-[10px] font-medium tracking-[0.08em] text-slate-400 uppercase">
              Total Test Cases
            </div>

            <div className="mt-2 text-2xl sm:text-3xl font-bold text-emerald-500">
              48
            </div>
          </div>

          {/* Executed */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm min-w-0">
            <div className="text-[9px] sm:text-[10px] font-medium tracking-[0.08em] text-slate-400 uppercase">
              Executed
            </div>

            <div className="mt-2 text-2xl sm:text-3xl font-bold text-green-600">
              40
            </div>
          </div>

          {/* Passed */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm min-w-0">
            <div className="text-[9px] sm:text-[10px] font-medium tracking-[0.08em] text-slate-400 uppercase">
              Passed
            </div>

            <div className="mt-2 text-2xl sm:text-3xl font-bold text-green-600">
              34
            </div>
          </div>

          {/* Failed / Blocked */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm min-w-0">
            <div className="text-[9px] sm:text-[10px] font-medium tracking-[0.08em] text-slate-400 uppercase">
              Failed / Blocked
            </div>

            <div className="mt-2 text-2xl sm:text-3xl font-bold text-red-500">
              6
            </div>
          </div>

        </div>

        {/* =========================================================
            COVERAGE BY MODULE
        ========================================================= */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 sm:p-5">

          {/* Heading */}
          <div className="mb-4">
            <h2 className="text-sm sm:text-[15px] font-semibold text-slate-900">
              Coverage by Module
            </h2>
          </div>

          {/* Module list */}
          <div className="space-y-4">

            {coverageData.map((item) => (
              <div key={item.name} className="w-full">

                {/* Module information */}
                <div className="flex items-center justify-between gap-3 mb-1.5">

                  {/* Left side */}
                  <div className="flex items-center min-w-0 flex-1">
                    <span className="text-[11px] sm:text-xs font-medium text-slate-700 truncate">
                      {item.name}
                    </span>
                  </div>

                  {/* Right side */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[9px] sm:text-[10px] text-slate-400">
                      {item.cases}
                    </span>

                    <span
                      className={`text-[10px] sm:text-[11px] font-semibold ${item.textColor}`}
                    >
                      {item.percentage}%
                    </span>
                  </div>

                </div>

                {/* Progress bar */}
                <div className="w-full h-[5px] sm:h-[6px] bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.barColor}`}
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  />
                </div>

              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
};

export default QATestCoverage;