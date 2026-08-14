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
  { label: "Sprint Planning", icon: PersonStanding },
  { label: "Task Board", icon: Kanban },
  { label: "Team Workload", icon: Users, active: true },
  { label: "Analytics & Reports", icon: BarChart3 },
];

// Each member has a color theme: avatar bg/text, filled segment, empty segment
const colorThemes = {
  teal: {
    avatarBg: "bg-teal-100",
    avatarText: "text-teal-600",
    filled: "bg-teal-400",
    empty: "bg-teal-50",
  },
  violet: {
    avatarBg: "bg-violet-100",
    avatarText: "text-violet-600",
    filled: "bg-violet-400",
    empty: "bg-violet-50",
  },
  amber: {
    avatarBg: "bg-amber-100",
    avatarText: "text-amber-600",
    filled: "bg-amber-500",
    empty: "bg-amber-50",
  },
  green: {
    avatarBg: "bg-green-100",
    avatarText: "text-green-600",
    filled: "bg-green-500",
    empty: "bg-green-50",
  },
  red: {
    avatarBg: "bg-rose-100",
    avatarText: "text-rose-600",
    filled: "bg-rose-500",
    empty: "bg-rose-50",
  },
};

const team = [
  {
    initials: "SR",
    name: "Sneha Rao",
    role: "Frontend Dev",
    done: 5,
    assigned: 8,
    theme: "teal",
  },
  {
    initials: "MK",
    name: "Mihir Khatri",
    role: "Backend Dev",
    done: 3,
    assigned: 6,
    theme: "violet",
  },
  {
    initials: "DM",
    name: "Divya Mehta",
    role: "UI Designer",
    done: 4,
    assigned: 5,
    theme: "amber",
  },
  {
    initials: "PR",
    name: "Priya Rajan",
    role: "QA Engineer",
    done: 2,
    assigned: 7,
    theme: "green",
  },
  {
    initials: "KD",
    name: "Karan Dev",
    role: "Backend Dev",
    done: 1,
    assigned: 4,
    theme: "red",
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
          Team Workload
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

function WorkloadBar({ done, assigned, theme }) {
  const segments = Array.from({ length: assigned }, (_, i) => i < done);

  return (
    <div className="flex w-full gap-1.5">
      {segments.map((isFilled, i) => (
        <div
          key={i}
          className={`h-3 flex-1 rounded-full ${
            isFilled ? theme.filled : theme.empty
          }`}
        />
      ))}
    </div>
  );
}

function WorkloadRow({ initials, name, role, done, assigned, theme: themeKey }) {
  const theme = colorThemes[themeKey];
  const percent = Math.round((done / assigned) * 100);

  return (
    <div className="flex flex-col gap-4 border-b border-slate-100 py-5 last:border-none sm:flex-row sm:items-center sm:gap-6">
      {/* Avatar + name */}
      <div className="flex items-center gap-3 sm:w-48 sm:shrink-0">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${theme.avatarBg} ${theme.avatarText}`}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-900">{name}</p>
          <p className="truncate text-xs text-slate-400">{role}</p>
        </div>
      </div>

      {/* Bar + caption */}
      <div className="flex-1">
        <WorkloadBar done={done} assigned={assigned} theme={theme} />
        <p className="mt-2 text-xs text-slate-400">
          {done} done / {assigned} assigned
        </p>
      </div>

      {/* Percent */}
      <div className="text-right sm:w-24 sm:shrink-0">
        <p className="text-lg font-bold text-slate-900">{percent}%</p>
        <p className="text-xs text-slate-400">complete</p>
      </div>
    </div>
  );
}

function TeamWorkloadCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
      <h2 className="mb-2 text-base font-bold text-slate-900 sm:text-lg">
        Team Workload — Sprint 12
      </h2>
      <div>
        {team.map((member) => (
          <WorkloadRow key={member.name} {...member} />
        ))}
      </div>
    </div>
  );
}

export function PMWorkload() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
      <h2 className="mb-2 text-base font-bold text-slate-900 sm:text-lg">
        Team Workload — Sprint 12
      </h2>
      <div>
        {team.map((member) => (
          <WorkloadRow key={member.name} {...member} />
        ))}
      </div>
    </div>
  );
}