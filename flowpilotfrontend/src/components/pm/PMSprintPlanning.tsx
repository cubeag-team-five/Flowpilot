const backlogItems: { title: string; tag: string; points: number; priority: keyof typeof priorityStyles }[] = [
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
  Low: "bg-emerald-100 text-emerald-500",
  Medium: "bg-amber-100 text-amber-500",
  High: "bg-rose-100 text-rose-500",
};

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 px-3 py-2.5 sm:px-3 sm:py-4">
      <p className="text-[11px] text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm sm:text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}

function ActiveSprintCard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4">
      <h2 className="mb-2.5 text-sm font-bold text-slate-900 sm:text-base">
        Active Sprint — Sprint 12
      </h2>

      <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
        <StatCard label="Story Points" value="86 / 120 SP" />
        <StatCard label="Tasks" value="18 tasks" />
        <StatCard label="Days Left" value="14 days" />
        <StatCard label="Velocity" value="41 SP/sprint" />
      </div>

      <button className="mt-4 w-full rounded-lg border border-red-200 bg-red-50 py-2.5 text-base font-bold text-rose-500 transition-colors hover:bg-rose-100">
        Close Sprint 12
      </button>
    </div>
  );
}

function BacklogRow({ title, tag, points, priority }: { title: string; tag: string; points: number; priority: keyof typeof priorityStyles }) {
  return (
    <div className="flex flex-col gap-2 border-b border-slate-100 py-3 last:border-none sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold text-slate-900 sm:text-sm">
          {title}
        </p>
        <p className="text-[12px] text-slate-400">
          {tag} · {points} SP
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <span
          className={`rounded-md px-2 py-0.5 text-[12px] font-bold ${priorityStyles[priority]}`}
        >
          {priority}
        </span>
        <button className="rounded-md bg-violet-100 border border-violet-200  px-2.5 py-1 text-[12px] font-bold text-violet-600 hover:bg-violet-200">
          Add to Sprint
        </button>
      </div>
    </div>
  );
}

function ProductBacklogCard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-5 sm:py-6">
      <h2 className="mb-1.5 text-sm font-bold text-slate-900 sm:text-base">
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
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-4">
      <ActiveSprintCard />
      <ProductBacklogCard />
    </div>
  );
}