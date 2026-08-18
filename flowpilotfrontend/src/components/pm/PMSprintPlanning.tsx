const backlogItems = [
  {
    title: "AI-powered task suggestions",
    tag: "Automation",
    points: 13,
    priority: "Low",
  },
  {
    title: "Bi-directional Jira sync",
    tag: "Integrations",
    points: 8,
    priority: "Medium",
  },
  {
    title: "OKR tracking module",
    tag: "Analytics",
    points: 21,
    priority: "Medium",
  },
  {
    title: "SSO / LDAP integration",
    tag: "Auth",
    points: 13,
    priority: "High",
  },
  {
    title: "Custom fields on tasks",
    tag: "Core",
    points: 5,
    priority: "Medium",
  },
];

const priorityStyles = {
  Low: "bg-emerald-50 text-emerald-600",
  Medium: "bg-amber-50 text-amber-600",
  High: "bg-rose-50 text-rose-600",
};

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 px-4 py-4 sm:px-5 sm:py-5">
      <p className="text-xs sm:text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-lg sm:text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function ActiveSprintCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <h2 className="mb-4 text-base font-bold text-slate-900 sm:text-lg">
        Active Sprint — Sprint 12
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <StatCard label="Story Points" value="86 / 120 SP" />
        <StatCard label="Tasks" value="18 tasks" />
        <StatCard label="Days Left" value="14 days" />
        <StatCard label="Velocity" value="41 SP/sprint" />
      </div>

      <button className="mt-5 w-full rounded-xl bg-rose-50 py-3.5 text-sm font-semibold text-rose-500 transition-colors hover:bg-rose-100">
        Close Sprint 12
      </button>
    </div>
  );
}

function BacklogRow({ title, tag, points, priority }: { title: string; tag: string; points: number; priority: keyof typeof priorityStyles }) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-100 py-4 last:border-none sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-900">
          {title}
        </p>
        <p className="text-xs text-slate-400">
          {tag} · {points} SP
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span
          className={`rounded-md px-2.5 py-1 text-xs font-semibold ${priorityStyles[priority]}`}
        >
          {priority}
        </span>
        <button className="rounded-md bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-600 hover:bg-violet-100">
          Add to Sprint
        </button>
      </div>
    </div>
  );
}

function ProductBacklogCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <h2 className="mb-2 text-base font-bold text-slate-900 sm:text-lg">
        Product Backlog
      </h2>
      <div>
        {backlogItems.map((item) => (
          <BacklogRow key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}

export function PMSprintPlanning() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
      <ActiveSprintCard />
      <ProductBacklogCard />
    </div>
  );
}