const statCards = [
  {
    label: "Story Points Done",
    value: "86 SP",
    valueClass: "text-violet-500",
  },
  {
    label: "Tasks Completed",
    value: "12 / 18",
    valueClass: "text-emerald-500",
  },
  {
    label: "Avg Cycle Time",
    value: "2.4 days",
    valueClass: "text-teal-400",
  },
];

const velocityData = [
  { sprint: "S5", value: 28 },
  { sprint: "S6", value: 33 },
  { sprint: "S7", value: 36 },
  { sprint: "S8", value: 29 },
  { sprint: "S9", value: 38 },
  { sprint: "S10", value: 41 },
  { sprint: "S11", value: 35 },
  { sprint: "S12", value: 41, current: true },
];

const maxValue = Math.max(...velocityData.map((d) => d.value));

interface StatCardProps {
  label: string;
  value: string;
  valueClass?: string;
}

function StatCard({ label, value, valueClass }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <p className="text-xs font-semibold tracking-wide text-slate-400">
        {label.toUpperCase()}
      </p>
      <p className={`mt-1 text-2xl font-extrabold  sm:text-[28px]  ${valueClass}`}>
        {value}
      </p>
    </div>
  );
}

// Sized to match reference: larger card padding, taller bars, wider gaps, filled pill button
function VelocityChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-4">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-slate-900 sm:text-[15px]">
          Velocity by Sprint
        </h2>
        <button className="shrink-0 rounded-lg bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-600 hover:bg-violet-200">
          Export PDF
        </button>
      </div>

      <div className="flex  items-end justify-centre gap-2 overflow-x-50 sm:max-w-[30rem]">
        {velocityData.map(({ sprint, value, current }) => (
          <div
            key={sprint}
            className="flex max-w-[10rem] flex-1 flex-col items-center gap-2 sm:max-w-[15rem]"
          >
            <span className="text-sm font-semibold text-slate-600">
              {value}
            </span>
            <div className="flex h-15 w-12 items-end sm:h-27">
              <div
                className={`w-full rounded-t-md transition-all ${
                  current ? "bg-violet-400" : "bg-violet-100"
                }`}
                style={{ height: `${(value / maxValue) * 100}%` }} 
              />
            </div>
            <span className="text-xs text-slate-500">{sprint}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PMAnalytics() {
  return (
    <div className="space-y-2 sm:space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>
      <VelocityChart />
    </div>
  );
}