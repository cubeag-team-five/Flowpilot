import React, { useState } from 'react';
import {
  FolderKanban,
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  Users,
  CalendarDays,
  CheckCircle2,
  Clock3,
  AlertCircle,
} from 'lucide-react';

interface Project {
  id: number;
  name: string;
  code: string;
  manager: string;
  department: string;
  members: number;
  deadline: string;
  progress: number;
  status: 'Active' | 'Completed' | 'On Hold';
}

const initialProjects: Project[] = [
  {
    id: 1,
    name: 'IPMT Platform v2',
    code: 'IPMT-102',
    manager: 'Vikram Jain',
    department: 'Engineering',
    members: 12,
    deadline: '30 Aug 2026',
    progress: 68,
    status: 'Active',
  },
  {
    id: 2,
    name: 'QA Automation',
    code: 'QA-205',
    manager: 'Priya Shah',
    department: 'Quality Assurance',
    members: 7,
    deadline: '25 Aug 2026',
    progress: 82,
    status: 'Active',
  },
  {
    id: 3,
    name: 'Employee Portal',
    code: 'HR-110',
    manager: 'Sneha Patil',
    department: 'Human Resources',
    members: 6,
    deadline: '15 Sep 2026',
    progress: 45,
    status: 'Active',
  },
  {
    id: 4,
    name: 'Cloud Migration',
    code: 'DEV-301',
    manager: 'Karan Joshi',
    department: 'DevOps',
    members: 8,
    deadline: '10 Aug 2026',
    progress: 100,
    status: 'Completed',
  },
  {
    id: 5,
    name: 'Finance Dashboard',
    code: 'FIN-120',
    manager: 'Amit Kulkarni',
    department: 'Finance',
    members: 5,
    deadline: '20 Sep 2026',
    progress: 32,
    status: 'On Hold',
  },
  {
    id: 6,
    name: 'Mobile Application',
    code: 'ENG-220',
    manager: 'Rohit Varma',
    department: 'Engineering',
    members: 10,
    deadline: '05 Oct 2026',
    progress: 56,
    status: 'Active',
  },
];

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] =
    useState<Project[]>(initialProjects);

  const [search, setSearch] = useState('');

  const [statusFilter, setStatusFilter] =
    useState<'All' | 'Active' | 'Completed' | 'On Hold'>(
      'All'
    );

  const [openMenu, setOpenMenu] =
    useState<number | null>(null);

  const filteredProjects = projects.filter((project) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      project.name.toLowerCase().includes(searchText) ||
      project.code.toLowerCase().includes(searchText) ||
      project.manager.toLowerCase().includes(searchText) ||
      project.department
        .toLowerCase()
        .includes(searchText);

    const matchesStatus =
      statusFilter === 'All' ||
      project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const activeProjects = projects.filter(
    (project) => project.status === 'Active'
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === 'Completed'
  ).length;

  const onHoldProjects = projects.filter(
    (project) => project.status === 'On Hold'
  ).length;

  const toggleProjectStatus = (id: number) => {
    setProjects((previous) =>
      previous.map((project) => {
        if (project.id !== id) {
          return project;
        }

        if (project.status === 'Active') {
          return {
            ...project,
            status: 'On Hold',
          };
        }

        return {
          ...project,
          status: 'Active',
        };
      })
    );

    setOpenMenu(null);
  };

  const deleteProject = (id: number) => {
    setProjects((previous) =>
      previous.filter((project) => project.id !== id)
    );

    setOpenMenu(null);
  };

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}

      <div
        className="flex flex-col gap-4
        sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Projects
          </h1>

          <p className="mt-1 text-sm font-medium text-slate-400">
            Manage projects, teams and project progress
          </p>
        </div>

        <button
          className="inline-flex items-center
          justify-center gap-2 rounded-xl
          bg-slate-900 px-4 py-2.5
          text-xs font-extrabold text-white
          transition hover:bg-slate-800"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {/* SUMMARY CARDS */}

      <div
        className="grid grid-cols-1 gap-4
        sm:grid-cols-2 xl:grid-cols-4"
      >

        {/* TOTAL PROJECTS */}

        <div
          className="rounded-2xl border
          border-slate-200/80 bg-white
          p-5 shadow-2xs"
        >
          <div
            className="mb-2 text-[11px]
            font-extrabold uppercase
            tracking-wider text-slate-400"
          >
            TOTAL PROJECTS
          </div>

          <div
            className="mb-2 text-3xl
            font-black leading-none text-slate-900"
          >
            {projects.length}
          </div>

          <div className="flex items-center gap-1.5
          text-xs font-bold text-slate-500">
            <FolderKanban size={13} />
            All projects
          </div>
        </div>

        {/* ACTIVE */}

        <div
          className="rounded-2xl border
          border-slate-200/80 bg-white
          p-5 shadow-2xs"
        >
          <div
            className="mb-2 text-[11px]
            font-extrabold uppercase
            tracking-wider text-slate-400"
          >
            ACTIVE PROJECTS
          </div>

          <div
            className="mb-2 text-3xl
            font-black leading-none text-slate-900"
          >
            {activeProjects}
          </div>

          <div className="flex items-center gap-1.5
          text-xs font-bold text-cyan-500">
            <Clock3 size={13} />
            Currently running
          </div>
        </div>

        {/* COMPLETED */}

        <div
          className="rounded-2xl border
          border-slate-200/80 bg-white
          p-5 shadow-2xs"
        >
          <div
            className="mb-2 text-[11px]
            font-extrabold uppercase
            tracking-wider text-slate-400"
          >
            COMPLETED
          </div>

          <div
            className="mb-2 text-3xl
            font-black leading-none text-slate-900"
          >
            {completedProjects}
          </div>

          <div className="flex items-center gap-1.5
          text-xs font-bold text-emerald-500">
            <CheckCircle2 size={13} />
            Successfully delivered
          </div>
        </div>

        {/* ON HOLD */}

        <div
          className="rounded-2xl border
          border-slate-200/80 bg-white
          p-5 shadow-2xs"
        >
          <div
            className="mb-2 text-[11px]
            font-extrabold uppercase
            tracking-wider text-slate-400"
          >
            ON HOLD
          </div>

          <div
            className="mb-2 text-3xl
            font-black leading-none text-slate-900"
          >
            {onHoldProjects}
          </div>

          <div className="flex items-center gap-1.5
          text-xs font-bold text-amber-500">
            <AlertCircle size={13} />
            Requires attention
          </div>
        </div>
      </div>

      {/* PROJECT LIST */}

      <div
        className="rounded-2xl border
        border-slate-200/80 bg-white
        p-6 shadow-2xs"
      >

        {/* LIST HEADER */}

        <div
          className="mb-5 flex flex-col gap-4
          lg:flex-row lg:items-center
          lg:justify-between"
        >
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">
              All Projects
            </h3>

            <p
              className="mt-1 text-[11px]
              font-medium text-slate-400"
            >
              {filteredProjects.length} projects found
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            {/* SEARCH */}

            <div className="relative">

              <Search
                size={15}
                className="absolute left-3 top-3
                text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search projects..."
                className="w-full rounded-xl
                border border-slate-200
                bg-white py-2.5 pl-9 pr-3
                text-xs font-semibold
                text-slate-700 outline-none
                placeholder:text-slate-400
                focus:border-slate-400
                sm:w-64"
              />
            </div>

            {/* STATUS */}

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value as
                    | 'All'
                    | 'Active'
                    | 'Completed'
                    | 'On Hold'
                )
              }
              className="rounded-xl border
              border-slate-200 bg-white
              px-3 py-2.5 text-xs
              font-bold text-slate-600
              outline-none focus:border-slate-400"
            >
              <option value="All">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="On Hold">
                On Hold
              </option>
            </select>
          </div>
        </div>

        {/* DESKTOP TABLE */}

        <div className="hidden overflow-x-auto md:block">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-100">

                <th
                  className="px-3 py-3 text-left
                  text-[10px] font-extrabold
                  uppercase tracking-wider
                  text-slate-400"
                >
                  Project
                </th>

                <th
                  className="px-3 py-3 text-left
                  text-[10px] font-extrabold
                  uppercase tracking-wider
                  text-slate-400"
                >
                  Manager
                </th>

                <th
                  className="px-3 py-3 text-left
                  text-[10px] font-extrabold
                  uppercase tracking-wider
                  text-slate-400"
                >
                  Department
                </th>

                <th
                  className="px-3 py-3 text-left
                  text-[10px] font-extrabold
                  uppercase tracking-wider
                  text-slate-400"
                >
                  Progress
                </th>

                <th
                  className="px-3 py-3 text-left
                  text-[10px] font-extrabold
                  uppercase tracking-wider
                  text-slate-400"
                >
                  Deadline
                </th>

                <th
                  className="px-3 py-3 text-left
                  text-[10px] font-extrabold
                  uppercase tracking-wider
                  text-slate-400"
                >
                  Status
                </th>

                <th
                  className="px-3 py-3 text-right
                  text-[10px] font-extrabold
                  uppercase tracking-wider
                  text-slate-400"
                >
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredProjects.map((project) => (

                <tr
                  key={project.id}
                  className="border-b
                  border-slate-100
                  last:border-0
                  hover:bg-slate-50/60"
                >

                  {/* PROJECT */}

                  <td className="px-3 py-4">

                    <div className="flex items-center gap-3">

                      <div
                        className="flex h-10 w-10
                        shrink-0 items-center
                        justify-center rounded-xl
                        bg-slate-100"
                      >
                        <FolderKanban
                          size={17}
                          className="text-slate-600"
                        />
                      </div>

                      <div>

                        <div
                          className="text-xs
                          font-extrabold
                          text-slate-800"
                        >
                          {project.name}
                        </div>

                        <div
                          className="mt-0.5 text-[10px]
                          font-bold text-slate-400"
                        >
                          {project.code}
                        </div>

                      </div>
                    </div>
                  </td>

                  {/* MANAGER */}

                  <td className="px-3 py-4">

                    <span
                      className="text-xs font-bold
                      text-slate-600"
                    >
                      {project.manager}
                    </span>

                  </td>

                  {/* DEPARTMENT */}

                  <td className="px-3 py-4">

                    <span
                      className="text-xs font-bold
                      text-slate-600"
                    >
                      {project.department}
                    </span>

                  </td>

                  {/* PROGRESS */}

                  <td className="px-3 py-4">

                    <div className="w-28">

                      <div
                        className="mb-1 flex
                        justify-between"
                      >
                        <span
                          className="text-[10px]
                          font-bold text-slate-400"
                        >
                          {project.progress}%
                        </span>

                        <span
                          className="flex items-center
                          gap-1 text-[10px]
                          font-bold text-slate-400"
                        >
                          <Users size={10} />
                          {project.members}
                        </span>
                      </div>

                      <div
                        className="h-1.5 w-full
                        overflow-hidden rounded-full
                        bg-slate-100"
                      >
                        <div
                          className={`h-full rounded-full ${
                            project.progress === 100
                              ? 'bg-emerald-400'
                              : project.progress >= 70
                              ? 'bg-cyan-400'
                              : project.progress >= 40
                              ? 'bg-purple-400'
                              : 'bg-amber-400'
                          }`}
                          style={{
                            width: `${project.progress}%`,
                          }}
                        />
                      </div>

                    </div>
                  </td>

                  {/* DEADLINE */}

                  <td className="px-3 py-4">

                    <div
                      className="flex items-center
                      gap-1.5 text-xs
                      font-medium text-slate-400"
                    >
                      <CalendarDays size={13} />
                      {project.deadline}
                    </div>

                  </td>

                  {/* STATUS */}

                  <td className="px-3 py-4">

                    <span
                      className={`inline-flex
                      items-center gap-1.5
                      rounded-full px-2.5 py-1
                      text-[10px] font-extrabold ${
                        project.status === 'Active'
                          ? 'bg-cyan-50 text-cyan-600'
                          : project.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-amber-50 text-amber-600'
                      }`}
                    >

                      <span
                        className={`h-1.5 w-1.5
                        rounded-full ${
                          project.status === 'Active'
                            ? 'bg-cyan-500'
                            : project.status ===
                              'Completed'
                            ? 'bg-emerald-500'
                            : 'bg-amber-500'
                        }`}
                      />

                      {project.status}

                    </span>
                  </td>

                  {/* ACTION */}

                  <td className="px-3 py-4 text-right">

                    <div className="relative inline-block">

                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === project.id
                              ? null
                              : project.id
                          )
                        }
                        className="rounded-lg p-1.5
                        text-slate-400 transition
                        hover:bg-slate-100
                        hover:text-slate-700"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {openMenu === project.id && (

                        <div
                          className="absolute right-0
                          top-9 z-20 w-44 rounded-xl
                          border border-slate-200
                          bg-white py-1.5
                          text-left shadow-lg"
                        >

                          <button
                            onClick={() =>
                              setOpenMenu(null)
                            }
                            className="flex w-full
                            items-center gap-2
                            px-3 py-2 text-xs
                            font-bold text-slate-600
                            hover:bg-slate-50"
                          >
                            <Pencil size={13} />
                            Edit Project
                          </button>

                          <button
                            onClick={() =>
                              toggleProjectStatus(
                                project.id
                              )
                            }
                            className="flex w-full
                            items-center gap-2
                            px-3 py-2 text-xs
                            font-bold text-slate-600
                            hover:bg-slate-50"
                          >
                            {project.status ===
                            'Active' ? (
                              <>
                                <Clock3 size={13} />
                                Put On Hold
                              </>
                            ) : (
                              <>
                                <CheckCircle2 size={13} />
                                Set Active
                              </>
                            )}
                          </button>

                          <button
                            onClick={() =>
                              deleteProject(
                                project.id
                              )
                            }
                            className="flex w-full
                            items-center gap-2
                            px-3 py-2 text-xs
                            font-bold text-rose-500
                            hover:bg-rose-50"
                          >
                            <Trash2 size={13} />
                            Delete Project
                          </button>

                        </div>
                      )}

                    </div>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        </div>

        {/* MOBILE PROJECT CARDS */}

        <div className="space-y-3 md:hidden">

          {filteredProjects.map((project) => (

            <div
              key={project.id}
              className="rounded-xl
              border border-slate-100 p-4"
            >

              <div
                className="flex items-start
                justify-between"
              >

                <div className="flex items-center gap-3">

                  <div
                    className="flex h-10 w-10
                    items-center justify-center
                    rounded-xl bg-slate-100"
                  >
                    <FolderKanban
                      size={17}
                      className="text-slate-600"
                    />
                  </div>

                  <div>

                    <div
                      className="text-xs
                      font-extrabold
                      text-slate-800"
                    >
                      {project.name}
                    </div>

                    <div
                      className="mt-0.5 text-[10px]
                      font-bold text-slate-400"
                    >
                      {project.code}
                    </div>

                  </div>

                </div>

                <span
                  className={`rounded-full
                  px-2 py-1 text-[9px]
                  font-extrabold ${
                    project.status === 'Active'
                      ? 'bg-cyan-50 text-cyan-600'
                      : project.status ===
                        'Completed'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-amber-50 text-amber-600'
                  }`}
                >
                  {project.status}
                </span>

              </div>

              <div
                className="mt-4 grid
                grid-cols-2 gap-3"
              >

                <div>
                  <div
                    className="text-[9px]
                    font-extrabold uppercase
                    tracking-wider
                    text-slate-400"
                  >
                    MANAGER
                  </div>

                  <div
                    className="mt-1 text-xs
                    font-bold text-slate-600"
                  >
                    {project.manager}
                  </div>
                </div>

                <div>
                  <div
                    className="text-[9px]
                    font-extrabold uppercase
                    tracking-wider
                    text-slate-400"
                  >
                    MEMBERS
                  </div>

                  <div
                    className="mt-1 flex items-center
                    gap-1 text-xs font-bold
                    text-slate-600"
                  >
                    <Users size={12} />
                    {project.members}
                  </div>
                </div>

                <div>
                  <div
                    className="text-[9px]
                    font-extrabold uppercase
                    tracking-wider
                    text-slate-400"
                  >
                    DEADLINE
                  </div>

                  <div
                    className="mt-1 text-xs
                    font-bold text-slate-600"
                  >
                    {project.deadline}
                  </div>
                </div>

                <div>
                  <div
                    className="text-[9px]
                    font-extrabold uppercase
                    tracking-wider
                    text-slate-400"
                  >
                    PROGRESS
                  </div>

                  <div
                    className="mt-1 text-xs
                    font-black text-slate-700"
                  >
                    {project.progress}%
                  </div>
                </div>

              </div>

              <div className="mt-4">

                <div
                  className="h-1.5 w-full
                  overflow-hidden rounded-full
                  bg-slate-100"
                >
                  <div
                    className={`h-full rounded-full ${
                      project.progress === 100
                        ? 'bg-emerald-400'
                        : project.progress >= 70
                        ? 'bg-cyan-400'
                        : project.progress >= 40
                        ? 'bg-purple-400'
                        : 'bg-amber-400'
                    }`}
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />
                </div>

              </div>

            </div>

          ))}

        </div>

        {/* EMPTY STATE */}

        {filteredProjects.length === 0 && (

          <div className="py-12 text-center">

            <FolderKanban
              size={28}
              className="mx-auto text-slate-300"
            />

            <p
              className="mt-3 text-sm
              font-extrabold text-slate-600"
            >
              No projects found
            </p>

            <p
              className="mt-1 text-xs
              font-medium text-slate-400"
            >
              Try changing your search or status filter.
            </p>

          </div>
        )}

      </div>

      {/* PROJECT OVERVIEW */}

      <div
        className="rounded-2xl border
        border-slate-200/80 bg-white
        p-6 shadow-2xs"
      >

        <div
          className="flex flex-col gap-4
          sm:flex-row sm:items-center
          sm:justify-between"
        >

          <div>

            <h3
              className="text-sm font-extrabold
              text-slate-900"
            >
              Project Overview
            </h3>

            <p
              className="mt-1 text-[11px]
              font-medium text-slate-400"
            >
              Current project status across the organization
            </p>

          </div>

          <div
            className="flex flex-wrap gap-3"
          >

            <div
              className="flex items-center gap-2
              rounded-xl bg-cyan-50
              px-3 py-2"
            >
              <span
                className="h-2 w-2 rounded-full
                bg-cyan-500"
              />

              <span
                className="text-[11px]
                font-extrabold text-cyan-600"
              >
                {activeProjects} Active
              </span>
            </div>

            <div
              className="flex items-center gap-2
              rounded-xl bg-emerald-50
              px-3 py-2"
            >
              <span
                className="h-2 w-2 rounded-full
                bg-emerald-500"
              />

              <span
                className="text-[11px]
                font-extrabold
                text-emerald-600"
              >
                {completedProjects} Completed
              </span>
            </div>

            <div
              className="flex items-center gap-2
              rounded-xl bg-amber-50
              px-3 py-2"
            >
              <span
                className="h-2 w-2 rounded-full
                bg-amber-500"
              />

              <span
                className="text-[11px]
                font-extrabold
                text-amber-600"
              >
                {onHoldProjects} On Hold
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};