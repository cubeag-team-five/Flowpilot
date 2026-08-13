import React, { useState } from "react";
import {
  LayoutGrid,
  Home,
  Folder,
  PersonStanding,
  Kanban,
  Users,
  BarChart3,
  Search,
  Bell,
  Power,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: Home },
  { label: "My Projects", icon: Folder },
  { label: "Sprint Planning", icon: PersonStanding },
  { label: "Task Board", icon: Kanban, active: true },
  { label: "Team Workload", icon: Users },
  { label: "Analytics & Reports", icon: BarChart3 },
];

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

const columns = [
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

function Sidebar() {
  return (
    <aside className="flex h-full w-full flex-col bg-[#0b0b12] text-slate-300 lg:w-72">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500">
          <LayoutGrid className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold tracking-wide text-white">IPMT</p>
          <p className="text-[10px] tracking-widest text-slate-500">
            PLATFORM V2.0
          </p>
        </div>
      </div>

      <div className="px-6 pb-4">
        <div className="flex items-center gap-2 rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-violet-400" />
          <span className="text-xs font-semibold tracking-wide text-violet-300">
            SENIOR PROJECT MANAGER
          </span>
        </div>
      </div>

      <div className="border-t border-white/5" />

      <nav className="flex-1 space-y-1 px-4 py-4">
        {navItems.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              active
                ? "bg-violet-500/15 font-semibold text-violet-300 ring-1 ring-inset ring-violet-500/20"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
            }`}
          >
            <Icon size={18} className="shrink-0" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-3 border-t border-white/5 px-4 py-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-500 text-xs font-bold text-white">
          AS
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">
            Arjun Shah
          </p>
          <p className="text-xs text-slate-500">Product</p>
        </div>
        <button
          aria-label="Sign out"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:text-white"
        >
          <Power className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <div>
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Task Board
        </h1>
        <p className="text-sm text-slate-400">Thursday, 13 August 2026</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
          />
        </div>

        <button
          aria-label="Notifications"
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
        </button>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500 text-sm font-bold text-white">
          AS
        </div>
      </div>
    </header>
  );
}

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

function TaskCard({ id, title, owner, priority, points }) {
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

function BoardColumn({ title, tasks }) {
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

export default function TaskBoardPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50 lg:flex-row">
      <div className="lg:sticky lg:top-0 lg:h-screen">
        <Sidebar />
      </div>

      <div className="flex-1">
        <Topbar />

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <FilterTabs active={activeFilter} onChange={setActiveFilter} />
          </div>

          {/* Horizontal scroll on small/medium screens, 4-col grid on large */}
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
            {columns.map((column) => (
              <BoardColumn key={column.title} {...column} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}