import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

interface Project {
  code: string;
  name: string;
  manager: string;
  status: 'In Progress' | 'Planning' | 'On Hold';
  sprint: string;
  startDate: string;
  endDate: string;
  progress: number;
  health: 'On Track' | 'At Risk' | 'Delayed' | 'On Hold';
}

const initialProjects: Project[] = [
  {
    code: 'PRJ-001',
    name: 'IPMT Platform v2',
    manager: 'Arjun Shah',
    status: 'In Progress',
    sprint: 'Sprint 12',
    startDate: '01 Jan 2026',
    endDate: '30 Jun 2026',
    progress: 72,
    health: 'On Track',
  },
  {
    code: 'PRJ-002',
    name: 'E-Commerce Relaunch',
    manager: 'Rohit Varma',
    status: 'In Progress',
    sprint: 'Sprint 8',
    startDate: '15 Feb 2026',
    endDate: '30 Sep 2026',
    progress: 45,
    health: 'At Risk',
  },
  {
    code: 'PRJ-003',
    name: 'Mobile App Dev',
    manager: 'Arjun Shah',
    status: 'Planning',
    sprint: 'Sprint 2',
    startDate: '01 Apr 2026',
    endDate: '31 Dec 2026',
    progress: 22,
    health: 'On Track',
  },
  {
    code: 'PRJ-004',
    name: 'API Gateway Migration',
    manager: 'Karan Mehta',
    status: 'In Progress',
    sprint: 'Sprint 5',
    startDate: '01 Mar 2026',
    endDate: '31 Aug 2026',
    progress: 58,
    health: 'Delayed',
  },
  {
    code: 'PRJ-005',
    name: 'Analytics Dashboard',
    manager: 'Priya Rajan',
    status: 'On Hold',
    sprint: '—',
    startDate: '01 May 2026',
    endDate: '31 Oct 2026',
    progress: 0,
    health: 'On Hold',
  },
];

const statusClasses: Record<Project['status'], string> = {
  'In Progress': 'bg-slate-100 text-slate-600',
  Planning: 'bg-slate-100 text-slate-600',
  'On Hold': 'bg-slate-100 text-slate-600',
};

const healthClasses: Record<Project['health'], string> = {
  'On Track': 'border border-emerald-100 bg-emerald-50 text-emerald-600',
  'At Risk': 'border border-amber-100 bg-amber-50 text-amber-600',
  Delayed: 'border border-rose-100 bg-rose-50 text-rose-500',
  'On Hold': 'border border-slate-200 bg-slate-50 text-slate-500',
};

export const SuperAdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState('');
  const [showAddProject, setShowAddProject] = useState(false);

  const [newProject, setNewProject] = useState({
    code: '',
    name: '',
    manager: '',
    status: 'In Progress' as Project['status'],
    sprint: '',
    startDate: '',
    endDate: '',
    progress: 0,
    health: 'On Track' as Project['health'],
  });

  /*
    Existing functionality retained:
    - Search state
    - Search filtering
    - Matching by project name
    - Matching by project code
    - Matching by manager
    - Matching by sprint
  */
  const filteredProjects = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return projects;
    }

    return projects.filter(
      (project) =>
        project.name.toLowerCase().includes(query) ||
        project.code.toLowerCase().includes(query) ||
        project.manager.toLowerCase().includes(query) ||
        project.sprint.toLowerCase().includes(query)
    );
  }, [search, projects]);

  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <style>{`
        .projects-scroll {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }

        .projects-scroll::-webkit-scrollbar {
          height: 6px;
        }

        .projects-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .projects-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 999px;
        }
      `}</style>

      <div className="w-full">
        {/* SEARCH */}
        <div className="mb-[14px] flex items-center justify-center gap-[10px] flex-wrap sm:flex-nowrap">
          <div className="relative w-full sm:w-[290px]">
            <Search
              size={16}
              strokeWidth={2}
              className="
                pointer-events-none
                absolute
                left-[14px]
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search projects..."
              className="
                h-[42px]
                w-full
                rounded-[10px]
                border
                border-slate-200
                bg-white
                pl-[40px]
                pr-[14px]
                text-[12px]
                font-medium
                text-slate-700
                outline-none
                placeholder:text-slate-400
                focus:border-slate-300
                focus:ring-2
                focus:ring-slate-100
              "
            />
          </div>

          <button
            type="button"
            onClick={() => setShowAddProject(true)}
            className="h-[42px] w-full sm:w-auto rounded-[10px] bg-red-500 px-[18px] text-[12px] font-bold text-white shadow-sm transition hover:bg-red-600 active:scale-[0.98] whitespace-nowrap"
          >
            + Add Project
          </button>
        </div>

        {showAddProject && (
          <div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-slate-900/30
              p-4
            "
          >
            <div
              className="
                w-full
                max-w-[520px]
                rounded-[16px]
                bg-white
                p-[24px]
                shadow-xl
                max-sm:p-[18px]
              "
            >
              <div className="mb-[20px] flex items-start justify-between">
                <div>
                  <h3 className="text-[18px] font-bold text-slate-900">
                    Add New Project
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Create a new project.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddProject(false)}
                  className="
                    text-[22px]
                    leading-none
                    text-slate-400
                    hover:text-slate-700
                  "
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();

                  const project: Project = {
                    ...newProject,
                    sprint: newProject.sprint || '—',
                    progress: Math.max(
                      0,
                      Math.min(100, Number(newProject.progress))
                    ),
                  };

                  setProjects((current) => [...current, project]);
                  setShowAddProject(false);

                  setNewProject({
                    code: '',
                    name: '',
                    manager: '',
                    status: 'In Progress',
                    sprint: '',
                    startDate: '',
                    endDate: '',
                    progress: 0,
                    health: 'On Track',
                  });
                }}
                className="grid grid-cols-2 gap-[12px] max-sm:grid-cols-1"
              >
                <label>
                  <span className="mb-[6px] block text-[11px] font-bold text-slate-500">
                    Project Code
                  </span>
                  <input
                    required
                    value={newProject.code}
                    onChange={(event) =>
                      setNewProject((current) => ({
                        ...current,
                        code: event.target.value,
                      }))
                    }
                    placeholder="PRJ-006"
                    className="
                      h-[40px]
                      w-full
                      rounded-[9px]
                      border
                      border-slate-200
                      px-[12px]
                      text-[12px]
                      outline-none
                      focus:border-slate-300
                    "
                  />
                </label>

                <label>
                  <span className="mb-[6px] block text-[11px] font-bold text-slate-500">
                    Project Name
                  </span>
                  <input
                    required
                    value={newProject.name}
                    onChange={(event) =>
                      setNewProject((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Project name"
                    className="
                      h-[40px]
                      w-full
                      rounded-[9px]
                      border
                      border-slate-200
                      px-[12px]
                      text-[12px]
                      outline-none
                      focus:border-slate-300
                    "
                  />
                </label>

                <label>
                  <span className="mb-[6px] block text-[11px] font-bold text-slate-500">
                    Project Manager
                  </span>
                  <input
                    required
                    value={newProject.manager}
                    onChange={(event) =>
                      setNewProject((current) => ({
                        ...current,
                        manager: event.target.value,
                      }))
                    }
                    placeholder="Manager name"
                    className="
                      h-[40px]
                      w-full
                      rounded-[9px]
                      border
                      border-slate-200
                      px-[12px]
                      text-[12px]
                      outline-none
                      focus:border-slate-300
                    "
                  />
                </label>

                <label>
                  <span className="mb-[6px] block text-[11px] font-bold text-slate-500">
                    Active Sprint
                  </span>
                  <input
                    value={newProject.sprint}
                    onChange={(event) =>
                      setNewProject((current) => ({
                        ...current,
                        sprint: event.target.value,
                      }))
                    }
                    placeholder="Sprint 1"
                    className="
                      h-[40px]
                      w-full
                      rounded-[9px]
                      border
                      border-slate-200
                      px-[12px]
                      text-[12px]
                      outline-none
                      focus:border-slate-300
                    "
                  />
                </label>

                <label>
                  <span className="mb-[6px] block text-[11px] font-bold text-slate-500">
                    Start Date
                  </span>
                  <input
                    required
                    value={newProject.startDate}
                    onChange={(event) =>
                      setNewProject((current) => ({
                        ...current,
                        startDate: event.target.value,
                      }))
                    }
                    placeholder="01 Jan 2026"
                    className="
                      h-[40px]
                      w-full
                      rounded-[9px]
                      border
                      border-slate-200
                      px-[12px]
                      text-[12px]
                      outline-none
                      focus:border-slate-300
                    "
                  />
                </label>

                <label>
                  <span className="mb-[6px] block text-[11px] font-bold text-slate-500">
                    End Date
                  </span>
                  <input
                    required
                    value={newProject.endDate}
                    onChange={(event) =>
                      setNewProject((current) => ({
                        ...current,
                        endDate: event.target.value,
                      }))
                    }
                    placeholder="30 Jun 2026"
                    className="
                      h-[40px]
                      w-full
                      rounded-[9px]
                      border
                      border-slate-200
                      px-[12px]
                      text-[12px]
                      outline-none
                      focus:border-slate-300
                    "
                  />
                </label>

                <label>
                  <span className="mb-[6px] block text-[11px] font-bold text-slate-500">
                    Status
                  </span>
                  <select
                    value={newProject.status}
                    onChange={(event) =>
                      setNewProject((current) => ({
                        ...current,
                        status: event.target.value as Project['status'],
                      }))
                    }
                    className="
                      h-[40px]
                      w-full
                      rounded-[9px]
                      border
                      border-slate-200
                      px-[12px]
                      text-[12px]
                      outline-none
                    "
                  >
                    <option>In Progress</option>
                    <option>Planning</option>
                    <option>On Hold</option>
                  </select>
                </label>

                <label>
                  <span className="mb-[6px] block text-[11px] font-bold text-slate-500">
                    Health
                  </span>
                  <select
                    value={newProject.health}
                    onChange={(event) =>
                      setNewProject((current) => ({
                        ...current,
                        health: event.target.value as Project['health'],
                      }))
                    }
                    className="
                      h-[40px]
                      w-full
                      rounded-[9px]
                      border
                      border-slate-200
                      px-[12px]
                      text-[12px]
                      outline-none
                    "
                  >
                    <option>On Track</option>
                    <option>At Risk</option>
                    <option>Delayed</option>
                    <option>On Hold</option>
                  </select>
                </label>

                <label className="col-span-2 max-sm:col-span-1">
                  <span className="mb-[6px] block text-[11px] font-bold text-slate-500">
                    Progress %
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newProject.progress}
                    onChange={(event) =>
                      setNewProject((current) => ({
                        ...current,
                        progress: Number(event.target.value),
                      }))
                    }
                    className="
                      h-[40px]
                      w-full
                      rounded-[9px]
                      border
                      border-slate-200
                      px-[12px]
                      text-[12px]
                      outline-none
                    "
                  />
                </label>

                <div className="col-span-2 mt-[6px] flex justify-end gap-[10px] max-sm:col-span-1">
                  <button
                    type="button"
                    onClick={() => setShowAddProject(false)}
                    className="
                      h-[40px]
                      rounded-[9px]
                      border
                      border-slate-200
                      px-[16px]
                      text-[12px]
                      font-bold
                      text-slate-500
                      hover:bg-slate-50
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="
                      h-[40px]
                      rounded-[9px]
                      bg-red-500
                      px-[18px]
                      text-[12px]
                      font-bold
                      text-white
                      hover:bg-red-600
                    "
                  >
                    Add Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TABLE — desktop */}
        <div className="hidden md:block w-full overflow-hidden rounded-[16px] border border-slate-200/80 bg-white shadow-[0_2px_7px_rgba(15,23,42,0.04)]">
          <div className="projects-scroll w-full overflow-x-auto">
            <table className="w-full min-w-[1260px] border-collapse">
              <colgroup>
                <col style={{ width: '8%' }} />
                <col style={{ width: '17%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '11%' }} />
                <col style={{ width: '11%' }} />
                <col style={{ width: '11%' }} />
                <col style={{ width: '11%' }} />
                <col style={{ width: '9%' }} />
                <col style={{ width: '7%' }} />
              </colgroup>

              <thead>
                <tr className="border-b border-slate-100">
                  {[
                    'CODE',
                    'PROJECT NAME',
                    'PROJECT MANAGER',
                    'STATUS',
                    'ACTIVE SPRINT',
                    'START DATE',
                    'END DATE',
                    'PROGRESS',
                    'HEALTH',
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="
                        h-[50px]
                        px-[20px]
                        text-left
                        align-middle
                        text-[10px]
                        font-bold
                        tracking-[0.04em]
                        text-slate-500
                        whitespace-nowrap
                        max-md:px-[16px]
                      "
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredProjects.map((project) => (
                  <tr
                    key={project.code}
                    className="
                      border-b
                      border-slate-100
                      last:border-b-0
                      transition-colors
                      hover:bg-slate-50/40
                    "
                  >
                    <td className="h-[61px] px-[20px] align-middle text-[13px] font-medium text-slate-400 whitespace-nowrap max-md:px-[16px]">
                      {project.code}
                    </td>

                    <td className="h-[61px] px-[20px] align-middle text-[13px] font-bold text-slate-900 whitespace-nowrap max-md:px-[16px]">
                      {project.name}
                    </td>

                    <td className="h-[61px] px-[20px] align-middle text-[13px] font-medium text-slate-500 whitespace-nowrap max-md:px-[16px]">
                      {project.manager}
                    </td>

                    <td className="h-[61px] px-[20px] align-middle max-md:px-[16px]">
                      <span
                        className={`
                          inline-flex
                          items-center
                          rounded-[8px]
                          px-[10px]
                          py-[4px]
                          text-[10px]
                          font-bold
                          leading-[15px]
                          whitespace-nowrap
                          ${statusClasses[project.status]}
                        `}
                      >
                        {project.status}
                      </span>
                    </td>

                    <td className="h-[61px] px-[20px] align-middle text-[13px] font-medium text-slate-500 whitespace-nowrap max-md:px-[16px]">
                      {project.sprint}
                    </td>

                    <td className="h-[61px] px-[20px] align-middle text-[13px] font-medium text-slate-400 whitespace-nowrap max-md:px-[16px]">
                      {project.startDate}
                    </td>

                    <td className="h-[61px] px-[20px] align-middle text-[13px] font-medium text-slate-400 whitespace-nowrap max-md:px-[16px]">
                      {project.endDate}
                    </td>

                    {/* EXISTING PROGRESS FUNCTIONALITY */}
                    <td className="h-[61px] px-[20px] align-middle max-md:px-[16px]">
                      <div className="w-[120px]">
                        <div className="mb-[5px] text-[10px] font-medium text-slate-500">
                          {project.progress}%
                        </div>

                        <div className="h-[5px] w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`
                              h-full
                              rounded-full
                              transition-all
                              ${
                                project.health === 'At Risk'
                                  ? 'bg-amber-500'
                                  : project.health === 'Delayed'
                                    ? 'bg-rose-500'
                                    : 'bg-emerald-500'
                              }
                            `}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="h-[61px] px-[20px] align-middle max-md:px-[16px]">
                      <span
                        className={`
                          inline-flex
                          items-center
                          rounded-[8px]
                          px-[10px]
                          py-[4px]
                          text-[10px]
                          font-bold
                          leading-[15px]
                          whitespace-nowrap
                          ${healthClasses[project.health]}
                        `}
                      >
                        {project.health}
                      </span>
                    </td>
                  </tr>
                ))}

                {filteredProjects.length === 0 && (
                  <tr>
                    <td colSpan={9} className="py-[55px] text-center">
                      <p className="text-[13px] font-bold text-slate-600">
                        No projects found
                      </p>
                      <p className="mt-1 text-[11px] text-slate-400">
                        Try another project name, code, manager or sprint.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* CARDS — mobile */}
        <div className="md:hidden space-y-3">
          {filteredProjects.length === 0 ? (
            <div className="rounded-[14px] border border-dashed border-slate-200 bg-white p-8 text-center">
              <p className="text-[13px] font-bold text-slate-600">No projects found</p>
              <p className="mt-1 text-[11px] text-slate-400">Try another project name, code, manager or sprint.</p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div key={project.code} className="rounded-[14px] border border-slate-200/80 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 font-mono mb-0.5">{project.code}</p>
                    <p className="text-[13px] font-bold text-slate-900 leading-tight">{project.name}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{project.manager}</p>
                  </div>
                  <span className={`shrink-0 inline-flex items-center rounded-[8px] px-[10px] py-[4px] text-[10px] font-bold whitespace-nowrap ${healthClasses[project.health]}`}>
                    {project.health}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 mb-3">
                  <div><span className="text-slate-400">Sprint: </span>{project.sprint}</div>
                  <div><span className="text-slate-400">Status: </span>{project.status}</div>
                  <div><span className="text-slate-400">Start: </span>{project.startDate}</div>
                  <div><span className="text-slate-400">End: </span>{project.endDate}</div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-slate-400">Progress</span>
                    <span className="text-[10px] font-semibold text-slate-600">{project.progress}%</span>
                  </div>
                  <div className="h-[5px] w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${project.health === 'At Risk' ? 'bg-amber-500' : project.health === 'Delayed' ? 'bg-rose-500' : 'bg-emerald-500'}`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminProjects;