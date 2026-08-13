import React, { useState } from 'react';
import {
  FolderKanban,
  Users,
  TrendingUp,
  Search,
  MoreHorizontal,
  CalendarDays,
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  manager: string;
  members: number;
  sprint: string;
  progress: number;
  status: 'On Track' | 'At Risk' | 'Completed';
}

const projects: Project[] = [
  {
    id: 'PRJ-001',
    name: 'Flowpilot Platform v2',
    manager: 'Arjun Shah',
    members: 12,
    sprint: 'Sprint 12',
    progress: 72,
    status: 'On Track',
  },
  {
    id: 'PRJ-002',
    name: 'E-Commerce Relaunch',
    manager: 'Rohit Verma',
    members: 8,
    sprint: 'Sprint 8',
    progress: 45,
    status: 'At Risk',
  },
  {
    id: 'PRJ-003',
    name: 'Mobile App Development',
    manager: 'Arjun Shah',
    members: 6,
    sprint: 'Sprint 2',
    progress: 22,
    status: 'On Track',
  },
  {
    id: 'PRJ-004',
    name: 'CRM Integration',
    manager: 'Nisha Agarwal',
    members: 9,
    sprint: 'Sprint 5',
    progress: 58,
    status: 'At Risk',
  },
  {
    id: 'PRJ-005',
    name: 'Analytics Dashboard',
    manager: 'Karan Mehta',
    members: 7,
    sprint: 'Sprint 4',
    progress: 84,
    status: 'On Track',
  },
  {
    id: 'PRJ-006',
    name: 'Internal Automation',
    manager: 'Sneha Rao',
    members: 5,
    sprint: 'Sprint 7',
    progress: 100,
    status: 'Completed',
  },
];

const statusStyles = {
  'On Track': {
    text: 'text-emerald-600',
    bg: 'bg-emerald-50',
    bar: 'bg-emerald-500',
  },
  'At Risk': {
    text: 'text-amber-600',
    bg: 'bg-amber-50',
    bar: 'bg-amber-500',
  },
  Completed: {
    text: 'text-blue-600',
    bg: 'bg-blue-50',
    bar: 'bg-blue-500',
  },
};

const SuperAdminProjects: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredProjects = projects.filter((project) => {
    const query = search.toLowerCase().trim();

    return (
      project.name.toLowerCase().includes(query) ||
      project.id.toLowerCase().includes(query) ||
      project.manager.toLowerCase().includes(query) ||
      project.sprint.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-5">

      {/* PAGE HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <h1 className="text-[19px] font-extrabold tracking-tight text-slate-900">
            Projects Overview
          </h1>

          <p className="mt-1 text-[11px] font-medium text-slate-400">
            Monitor and manage all organization projects
          </p>
        </div>

        {/* WORKING SEARCH */}
        <div className="relative w-full sm:w-[260px]">

          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-[11px] font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />

        </div>

      </div>

      {/* INFO BANNER */}
      <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
          <FolderKanban size={15} />
        </div>

        <div>
          <p className="text-[10px] font-bold text-slate-700">
            Organization Projects
          </p>

          <p className="mt-0.5 text-[9px] font-medium text-slate-400">
            View project progress, teams and sprint status across the organization.
          </p>
        </div>

      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                Total Projects
              </p>

              <p className="mt-2 text-[25px] font-extrabold text-slate-900">
                24
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <FolderKanban size={17} />
            </div>

          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                Active / In Progress
              </p>

              <p className="mt-2 text-[25px] font-extrabold text-emerald-500">
                16
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500">
              <TrendingUp size={17} />
            </div>

          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                Teams Involved
              </p>

              <p className="mt-2 text-[25px] font-extrabold text-slate-900">
                6
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-500">
              <Users size={17} />
            </div>

          </div>
        </div>

      </div>

      {/* PROJECT LIST */}
      <section className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-[1.8fr_1fr_1fr_1.5fr_auto] items-center gap-4 border-b border-slate-100 bg-slate-50/50 px-5 py-3">

          <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
            Project
          </p>

          <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
            Team
          </p>

          <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
            Sprint
          </p>

          <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
            Progress
          </p>

          <span />

        </div>

        {/* PROJECTS */}
        {filteredProjects.length > 0 ? (

          filteredProjects.map((project) => {

            const style = statusStyles[project.status];

            return (
              <div
                key={project.id}
                className="grid grid-cols-[1.8fr_1fr_1fr_1.5fr_auto] items-center gap-4 border-b border-slate-100 px-5 py-4 transition hover:bg-slate-50/50 last:border-b-0"
              >

                {/* PROJECT */}
                <div className="min-w-0">

                  <p className="text-[8px] font-extrabold uppercase tracking-wider text-slate-400">
                    {project.id}
                  </p>

                  <p className="mt-1 truncate text-[11px] font-extrabold text-slate-800">
                    {project.name}
                  </p>

                  <p className="mt-1 text-[9px] font-medium text-slate-400">
                    PM: {project.manager}
                  </p>

                </div>

                {/* TEAM */}
                <div className="flex items-center gap-2">

                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <Users size={12} />
                  </div>

                  <span className="text-[9px] font-semibold text-slate-600">
                    {project.members} members
                  </span>

                </div>

                {/* SPRINT */}
                <div className="flex items-center gap-2">

                  <CalendarDays
                    size={12}
                    className="text-slate-400"
                  />

                  <span className="text-[9px] font-semibold text-slate-600">
                    {project.sprint}
                  </span>

                </div>

                {/* PROGRESS */}
                <div>

                  <div className="mb-1.5 flex items-center justify-between">

                    <span className="text-[9px] font-bold text-slate-500">
                      {project.progress}%
                    </span>

                    <span
                      className={`rounded-full px-2 py-0.5 text-[7px] font-extrabold ${style.bg} ${style.text}`}
                    >
                      {project.status}
                    </span>

                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

                    <div
                      className={`h-full rounded-full transition-all ${style.bar}`}
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />

                  </div>

                </div>

                {/* MENU */}
                <button
                  type="button"
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  <MoreHorizontal size={15} />
                </button>

              </div>
            );
          })

        ) : (

          /* NO RESULTS */
          <div className="flex min-h-[180px] flex-col items-center justify-center">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400">
              <Search size={17} />
            </div>

            <p className="mt-3 text-[11px] font-bold text-slate-700">
              No projects found
            </p>

            <p className="mt-1 text-[9px] text-slate-400">
              Try searching with another project name or ID.
            </p>

          </div>

        )}

      </section>

    </div>
  );
};

export default SuperAdminProjects;