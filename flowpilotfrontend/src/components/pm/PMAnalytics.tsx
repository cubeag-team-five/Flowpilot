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
  { label: "Task Board", icon: Kanban },
  { label: "Team Workload", icon: Users },
  { label: "Analytics & Reports", icon: BarChart3, active: true },
];

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
          Analytics &amp; Reports
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

export default function AnalyticsReportsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50 lg:flex-row">
      <div className="lg:sticky lg:top-0 lg:h-screen">
        <Sidebar />
      </div>

      <div className="flex-1">
        <Topbar />

        <main className="space-y-5 p-4 sm:space-y-6 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
            {statCards.map((card) => (
              <StatCard key={card.label} {...card} />
            ))}
          </div>

          <VelocityChart />
        </main>
      </div>
    </div>
  );
}