import React from "react";
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
  { label: "Sprint Planning", icon: PersonStanding, active: true },
  { label: "Task Board", icon: Kanban },
  { label: "Team Workload", icon: Users },
  { label: "Analytics & Reports", icon: BarChart3 },
];

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

function StatCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-slate-50 px-4 py-4 sm:px-5 sm:py-5">
      <p className="text-xs sm:text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-lg sm:text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="flex h-full w-full flex-col bg-[#0b0b12] text-slate-300 lg:w-72">
      {/* Logo */}
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

      {/* Role badge */}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-2 rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-violet-400" />
          <span className="text-xs font-semibold tracking-wide text-violet-300">
            SENIOR PROJECT MANAGER
          </span>
        </div>
      </div>

      <div className="border-t border-white/5" />

      {/* Nav */}
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
            <Icon className="h-4.5 w-4.5 shrink-0" size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* User footer */}
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
          Sprint Planning
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

function BacklogRow({ title, tag, points, priority }) {
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

export default function SprintPlanningDashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50 lg:flex-row">
      <div className="lg:h-screen lg:sticky lg:top-0">
        <Sidebar />
      </div>

      <div className="flex-1">
        <Topbar />

        <main className="grid grid-cols-1 gap-5 p-4 sm:p-6 lg:grid-cols-2 lg:gap-6 lg:p-8">
          <ActiveSprintCard />
          <ProductBacklogCard />
        </main>
      </div>
    </div>
  );
}