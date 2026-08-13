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

export function PMProjects() {
  const [search, setSearch] = useState("");

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="relative">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 w-64 rounded-xl border border-slate-200 bg-white pl-4 pr-3 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
        />
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {filteredProjects.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
          <p className="font-semibold text-slate-700">No projects found</p>
          <p className="mt-1 text-sm text-slate-400">Try another search term.</p>
        </div>
      )}
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