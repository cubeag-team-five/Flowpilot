
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
      <p className={`mt-2 text-2xl font-extrabold sm:text-3xl ${valueClass}`}>
        {value}
      </p>
    </div>
  );
}

function VelocityChart() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-8 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-slate-900 sm:text-lg">
          Velocity by Sprint
        </h2>
        <button className="shrink-0 rounded-lg border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-600 hover:bg-violet-50">
          Export PDF
        </button>
      </div>

      <div className="flex items-end justify-between gap-2 overflow-x-auto sm:gap-4">
        {velocityData.map(({ sprint, value, current }) => (
          <div
            key={sprint}
            className="flex min-w-[2.5rem] flex-1 flex-col items-center gap-2"
          >
            <span className="text-xs font-semibold text-slate-500 sm:text-sm">
              {value}
            </span>
            <div className="flex h-40 w-full items-end sm:h-48">
              <div
                className={`w-full rounded-t-md transition-all ${
                  current ? "bg-violet-500" : "bg-violet-100"
                }`}
                style={{ height: `${(value / maxValue) * 100}%` }}
              />
            </div>
            <span className="text-xs text-slate-400">{sprint}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PMAnalytics() {
  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>
      <VelocityChart />
    </div>
  );
}