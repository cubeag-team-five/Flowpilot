import { useState } from "react";

const filters = ["All", "Mine", "Unassigned", "Blocked"];

const columnStyles = {
  "To Do": { headerText: "text-slate-500", badge: "bg-slate-200 text-slate-600" },
  "In Progress": { headerText: "text-amber-500", badge: "bg-amber-100 text-amber-600" },
  "In Review": { headerText: "text-violet-500", badge: "bg-violet-100 text-violet-600" },
  Done: { headerText: "text-emerald-500", badge: "bg-emerald-100 text-emerald-600" },
};

const priorityStyles = {
  Low: "bg-emerald-50 text-emerald-600",
  Medium: "bg-amber-50 text-amber-600",
  High: "bg-rose-50 text-rose-600",
};

type Task = { id: string; title: string; owner: string; priority: keyof typeof priorityStyles; points: number };
type Column = { title: keyof typeof columnStyles; tasks: Task[] };

const columns: Column[] = [
  {
    title: "To Do",
    tasks: [
      { id: "T-043", title: "Notification service integration", owner: "Karan", priority: "High", points: 8 },
      { id: "T-047", title: "Dark mode theming", owner: "Divya", priority: "Low", points: 5 },
    ],
  },
  {
    title: "In Progress",
    tasks: [
      { id: "T-040", title: "Design system component library", owner: "Sneha", priority: "High", points: 8 },
      { id: "T-044", title: "Mobile responsive layout", owner: "Divya", priority: "Medium", points: 5 },
    ],
  },
  {
    title: "In Review",
    tasks: [
      { id: "T-041", title: "REST API endpoint documentation", owner: "Mihir", priority: "Medium", points: 3 },
      { id: "T-045", title: "File upload to S3 bucket", owner: "Mihir", priority: "Low", points: 3 },
    ],
  },
  {
    title: "Done",
    tasks: [
      { id: "T-042", title: "Sprint velocity tracking module", owner: "Sneha", priority: "High", points: 5 },
      { id: "T-046", title: "JWT token refresh logic", owner: "Sneha", priority: "High", points: 2 },
    ],
  },
];

function FilterTabs({ active, onChange }: { active: string; onChange: (label: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((label) => {
        const isActive = label === active;
        return (
          <button
            key={label}
            onClick={() => onChange(label)}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
              isActive
                ? "border-violet-200 bg-violet-100 text-violet-600"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function TaskCard({ id, title, owner, priority, points }: { id: string; title: string; owner: string; priority: keyof typeof priorityStyles; points: number }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <p className="mb-1 text-xs text-slate-400">{id}</p>
      <p className="mb-3 text-sm font-bold leading-snug text-slate-900">
        {title}
      </p>
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-xs text-slate-400">{owner}</span>
        <div className="flex shrink-0 items-center gap-1.5">
          <span
            className={`rounded-md px-2 py-1 text-xs font-semibold ${priorityStyles[priority]}`}
          >
            {priority}
          </span>
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500">
            {points} SP
          </span>
        </div>
      </div>
    </div>
  );
}

function BoardColumn({ title, tasks }: { title: keyof typeof columnStyles; tasks: { id: string; title: string; owner: string; priority: keyof typeof priorityStyles; points: number }[] }) {
  const style = columnStyles[title];
  return (
    <div className="flex w-full shrink-0 flex-col gap-3 rounded-2xl bg-slate-100/60 p-3 sm:w-72 lg:w-auto">
      <div className="flex items-center justify-between px-1">
        <h3 className={`text-sm font-bold ${style.headerText}`}>{title}</h3>
        <span
          className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold ${style.badge}`}
        >
          {tasks.length}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
}

export function PMTaskBoard() {
  const [activeFilter, setActiveFilter] = useState("All");
  return (
    <div>
      <div className="mb-6">
        <FilterTabs active={activeFilter} onChange={setActiveFilter} />
      </div>
      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
        {columns.map((column) => (
          <BoardColumn key={column.title} {...column} />
        ))}
      </div>
    </div>
  );
}