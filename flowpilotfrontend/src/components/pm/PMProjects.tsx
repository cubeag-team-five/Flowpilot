import { useState } from 'react';

interface Project {
  id: string;
  name: string;
  status: string;
  statusColor: "green" | "yellow" | "red";
  sprint: string;
  team: string;
  budget: string;
  progress: number;
}

const projects: Project[] = [
  {
    id: "PRJ-001",
    name: "IPMT Platform v2",
    status: "On Track",
    statusColor: "green",
    sprint: "Sprint 12",
    team: "12 members",
    budget: "₹24L / ₹40L",
    progress: 72,
  },
  {
    id: "PRJ-002",
    name: "E-Commerce Relaunch",
    status: "At Risk",
    statusColor: "yellow",
    sprint: "Sprint 8",
    team: "8 members",
    budget: "₹32L / ₹50L",
    progress: 45,
  },
  {
    id: "PRJ-003",
    name: "Mobile App Development",
    status: "On Track",
    statusColor: "green",
    sprint: "Sprint 2",
    team: "6 members",
    budget: "₹8L / ₹50L",
    progress: 22,
  },
  {
    id: "PRJ-004",
    name: "API Gateway Migration",
    status: "Delayed",
    statusColor: "red",
    sprint: "Sprint 5",
    team: "5 members",
    budget: "₹12L / ₹18L",
    progress: 58,
  },
];

const notifications = [
  {
    text: "Sprint 12 planning meeting in 30 mins",
    time: "5m ago",
    color: "bg-green-500",
  },
  {
    text: "Priya Rajan marked task #T-042 as Done",
    time: "18m ago",
    color: "bg-purple-400",
  },
  {
    text: "New bug report filed: BUG-089",
    time: "1h ago",
    color: "bg-red-500",
  },
  {
    text: "Daily standup reminder",
    time: "2h ago",
    color: "bg-orange-500",
  },
];

export default function PMProjects() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f6f7f9] text-slate-900">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-[278px]
          bg-[#0d0f17] text-white
          transition-transform duration-300
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex h-[108px] items-center border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/20">
              <div className="grid grid-cols-2 gap-1">
                <span className="h-2.5 w-2.5 rounded-sm bg-white" />
                <span className="h-2.5 w-2.5 rounded-sm bg-white" />
                <span className="h-2.5 w-2.5 rounded-sm bg-white" />
                <span className="h-2.5 w-2.5 rounded-sm bg-white" />
              </div>
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight">
                IPMT
              </h1>
              <p className="text-[11px] font-semibold tracking-wide text-slate-500">
                PLATFORM V2.0
              </p>
            </div>
          </div>

          {/* Mobile Close */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto text-2xl text-slate-400 lg:hidden"
          >
            ×
          </button>
        </div>

        {/* Role */}
        <div className="px-6 py-5">
          <div className="inline-flex items-center gap-2 rounded-lg border border-purple-400/40 bg-purple-500/10 px-3 py-2 text-xs font-bold text-purple-300">
            <span className="h-2.5 w-2.5 rounded-full bg-purple-400" />
            SENIOR PROJECT MANAGER
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 px-3">

          <NavItem icon="⌂" text="Dashboard" />

          <NavItem
            icon="▣"
            text="My Projects"
            active
          />

          <NavItem icon="⚒" text="Sprint Planning" />

          <NavItem icon="▣" text="Task Board" />

          <NavItem icon="♟" text="Team Workload" />

          <NavItem icon="▥" text="Analytics & Reports" />

        </nav>

        {/* User */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-5">
          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-300 to-purple-500 font-bold text-white">
              AS
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">
                Arjun Shah
              </p>
              <p className="text-xs text-slate-500">
                Product
              </p>
            </div>

            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:bg-white/5">
              ⏻
            </button>

          </div>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="min-h-screen lg:ml-[278px]">

        {/* HEADER */}
        <header className="sticky top-0 z-30 flex min-h-[108px] items-center justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-4">

            {/* Mobile Menu */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-xl lg:hidden"
            >
              ☰
            </button>

            <div>
              <h2 className="text-xl font-extrabold sm:text-2xl">
                My Projects
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Monday, 10 August 2026
              </p>
            </div>

          </div>

          <div className="flex items-center gap-2 sm:gap-4">

            {/* Search */}
            <div className="relative hidden sm:block">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  h-10 w-40 rounded-xl border border-slate-200
                  bg-slate-50 pl-9 pr-3 text-sm
                  outline-none transition
                  placeholder:text-slate-400
                  focus:border-purple-400
                  focus:ring-2 focus:ring-purple-100
                  md:w-52
                "
              />
            </div>

            {/* Notification */}
            <div className="relative">

              <button
                onClick={() =>
                  setNotificationOpen(!notificationOpen)
                }
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl hover:bg-slate-50"
              >
                🔔

                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
              </button>

              {/* Notification Dropdown */}
              {notificationOpen && (
                <div className="
                  absolute right-0 top-12 z-50
                  w-[320px] overflow-hidden rounded-2xl
                  border border-slate-200 bg-white
                  shadow-2xl
                ">

                  <div className="border-b border-slate-100 px-5 py-4">
                    <h3 className="font-bold">
                      Notifications
                    </h3>

                    <p className="text-xs text-slate-400">
                      4 unread
                    </p>
                  </div>

                  {notifications.map((notification, index) => (
                    <div
                      key={index}
                      className="border-b border-slate-100 px-5 py-4 last:border-0 hover:bg-slate-50"
                    >
                      <div className="flex gap-3">

                        <span
                          className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${notification.color}`}
                        />

                        <div>
                          <p className="text-sm text-slate-700">
                            {notification.text}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {notification.time}
                          </p>
                        </div>

                      </div>
                    </div>
                  ))}

                </div>
              )}
            </div>

            {/* Profile */}
            <button className="
              flex h-10 w-10 items-center justify-center
              rounded-xl bg-gradient-to-br
              from-purple-300 to-purple-500
              text-sm font-bold text-white
            ">
              AS
            </button>

          </div>
        </header>

        {/* CONTENT */}
        <section className="px-4 py-6 sm:px-6 lg:px-8">

          {/* Mobile Search */}
          <div className="mb-5 sm:hidden">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  h-11 w-full rounded-xl
                  border border-slate-200
                  bg-white pl-9 pr-4
                  text-sm outline-none
                  focus:border-purple-400
                  focus:ring-2 focus:ring-purple-100
                "
              />
            </div>
          </div>

          {/* PROJECT GRID */}
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}

          </div>

          {/* Empty Search */}
          {filteredProjects.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
              <p className="font-semibold text-slate-700">
                No projects found
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Try another search term.
              </p>
            </div>
          )}

        </section>
      </main>
    </div>
  );
}


/* NAV ITEM */

function NavItem({
  icon,
  text,
  active = false,
}: {
  icon: string;
  text: string;
  active?: boolean;
}) {
  return (
    <button
      className={`
        group flex w-full items-center gap-4 rounded-xl
        px-4 py-3.5 text-left text-sm font-semibold
        transition
        ${
          active
            ? "border-l-2 border-purple-400 bg-purple-500/15 text-purple-300"
            : "text-slate-400 hover:bg-white/5 hover:text-white"
        }
      `}
    >
      <span className="w-5 text-center text-lg">
        {icon}
      </span>

      <span>{text}</span>
    </button>
  );
}


/* PROJECT CARD */

function ProjectCard({
  project,
}: {
  project: Project;
}) {

  const statusStyles = {
    green: {
      badge:
        "border-green-200 bg-green-50 text-green-600",
      bar: "bg-green-500",
      percentage: "text-green-500",
      border: "border-green-100",
    },

    yellow: {
      badge:
        "border-orange-200 bg-orange-50 text-orange-500",
      bar: "bg-orange-500",
      percentage: "text-orange-500",
      border: "border-orange-100",
    },

    red: {
      badge:
        "border-red-200 bg-red-50 text-red-500",
      bar: "bg-red-500",
      percentage: "text-red-500",
      border: "border-red-100",
    },
  };

  const style = statusStyles[project.statusColor];

  return (
    <article
      className={`
        rounded-2xl border ${style.border}
        bg-white p-5 shadow-sm
        transition duration-200
        hover:-translate-y-0.5 hover:shadow-md
        sm:p-6
      `}
    >

      {/* Top */}
      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">
          <p className="text-xs font-medium tracking-wide text-slate-400">
            {project.id}
          </p>

          <h3 className="mt-2 truncate text-lg font-extrabold sm:text-xl">
            {project.name}
          </h3>
        </div>

        <span
          className={`
            shrink-0 rounded-lg border
            px-3 py-1.5 text-xs font-bold
            ${style.badge}
          `}
        >
          {project.status}
        </span>

      </div>

      {/* Details */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

        <InfoBox
          label="Sprint"
          value={project.sprint}
        />

        <InfoBox
          label="Team"
          value={project.team}
        />

        <InfoBox
          label="Budget"
          value={project.budget}
        />

      </div>

      {/* Progress */}
      <div className="mt-6">

        <div className="mb-2 flex items-center justify-between">

          <span className="text-sm text-slate-500">
            Overall Progress
          </span>

          <span
            className={`text-sm font-extrabold ${style.percentage}`}
          >
            {project.progress}%
          </span>

        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">

          <div
            className={`h-full rounded-full ${style.bar} transition-all duration-500`}
            style={{
              width: `${project.progress}%`,
            }}
          />

        </div>

      </div>

    </article>
  );
}


/* INFO BOX */

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 px-4 py-3">

      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-slate-800">
        {value}
      </p>

    </div>
  );
}