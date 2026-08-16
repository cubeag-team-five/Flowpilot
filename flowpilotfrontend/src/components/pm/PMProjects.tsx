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
    budget: "₹18L / ₹35L",
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

export function PMProjects() {
  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Project grid: 1 col on mobile, 2 on tablet+, still 2 on wide screens */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
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
        group flex w-full items-center gap-2 rounded-xl
        px-4 py-3.5 text-left text-sm font-bold
        transition
        ${
          active
            ? "border-l-2 border-purple-400 bg-purple-500/15 text-purple-300"
            : "text-slate-400 hover:bg-white/5 hover:text-white"
        }
      `}
    >
      <span className="w-3 shrink-0 text-center text-lg">{icon}</span>
      <span className="truncate">{text}</span>
    </button>
  );
}

/* PROJECT CARD */

const statusStyles = {
  green: {
    badge: "border-green-200 bg-green-50 text-green-500",
    bar: "bg-green-400",
    percentage: "text-green-500",
    border: "border-green-100",
  },
  yellow: {
    badge: "border-orange-200 bg-orange-50 text-orange-500",
    bar: "bg-orange-400",
    percentage: "text-orange-500",
    border: "border-orange-100",
  },
  red: {
    badge: "border-red-200 bg-red-50 text-red-500",
    bar: "bg-red-400",
    percentage: "text-red-500",
    border: "border-red-100",
  },
} as const;

function ProjectCard({ project }: { project: Project }) {
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
      <div className="flex flex-wrap items-start justify-between gap-0">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium tracking-wide text-slate-400">
            {project.id}
          </p>
          <h3 className="mt-1 truncate text-slate-800 text-lg font-bold sm:text-xl">
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
      <div className="mt-1 grid grid-cols-2 gap-x-2 gap-y-1 sm:grid-cols-3">
        <InfoBox label="Sprint" value={project.sprint} />
        <InfoBox label="Team" value={project.team} />
        <InfoBox label="Budget" value={project.budget} />
      </div>

      {/* Progress */}
      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm text-slate-400">Overall Progress</span>
          <span className={`text-sm font-bold ${style.percentage}`}>
            {project.progress}%
          </span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className={`h-full rounded-full ${style.bar} transition-all duration-500`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>
    </article>
  );
}

/* INFO BOX */

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl px-2 py-2 sm:px-3.5">
      <p className="mt-2  text-xs font-sm text-slate-400">{label}</p>
      <p className="mt-1 truncate text-sm font-bold text-slate-700">{value}</p>
    </div>
  );
}