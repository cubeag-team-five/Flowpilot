import React from 'react';

interface Project {
  id: number;
  name: string;
  members: number;
  progress: number;
  status: 'On Track' | 'At Risk' | 'Delayed';
}

const projects: Project[] = [
  {
    id: 1,
    name: 'IPMT Platform v2',
    members: 12,
    progress: 72,
    status: 'On Track',
  },
  {
    id: 2,
    name: 'E-Commerce Relaunch',
    members: 8,
    progress: 45,
    status: 'At Risk',
  },
  {
    id: 3,
    name: 'Mobile App Development',
    members: 6,
    progress: 22,
    status: 'On Track',
  },
  {
    id: 4,
    name: 'API Gateway Migration',
    members: 5,
    progress: 58,
    status: 'Delayed',
  },
];

export const AdminProjects: React.FC = () => {
  return (
    <div className="w-full space-y-5 font-sans">

      {/* ==================== PAGE HEADER ==================== */}

      <div>
        <h1 className="text-[18px] sm:text-[19px] font-extrabold tracking-tight text-slate-900">
          Projects Overview
        </h1>

        <p className="mt-0.5 text-[11px] sm:text-[12px] font-medium text-slate-400">
          Thursday, 13 August 2026
        </p>
      </div>

      {/* ==================== SUMMARY CARDS ==================== */}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

        {/* TOTAL PROJECTS */}

        <div
          className="
            rounded-xl
            border border-slate-200
            bg-white
            px-4 py-4
            shadow-sm
            transition-shadow
            hover:shadow-md
          "
        >
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Total Projects
          </p>

          <p className="mt-2 text-[23px] sm:text-[24px] font-extrabold leading-none text-amber-500">
            24
          </p>
        </div>

        {/* IN PROGRESS */}

        <div
          className="
            rounded-xl
            border border-slate-200
            bg-white
            px-4 py-4
            shadow-sm
            transition-shadow
            hover:shadow-md
          "
        >
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
            In Progress
          </p>

          <p className="mt-2 text-[23px] sm:text-[24px] font-extrabold leading-none text-emerald-500">
            16
          </p>
        </div>

        {/* BLOCKED / AT RISK */}

        <div
          className="
            rounded-xl
            border border-slate-200
            bg-white
            px-4 py-4
            shadow-sm
            transition-shadow
            hover:shadow-md
          "
        >
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Blocked / At Risk
          </p>

          <p className="mt-2 text-[23px] sm:text-[24px] font-extrabold leading-none text-rose-500">
            5
          </p>
        </div>

      </div>

      {/* ==================== PROJECT LIST ==================== */}

      <div
        className="
          overflow-hidden
          rounded-xl
          border border-slate-200
          bg-white
          shadow-sm
        "
      >

        {/* TITLE */}

        <div className="px-4 py-4 sm:px-5">

          <h2 className="text-[13px] sm:text-[14px] font-extrabold text-slate-900">
            Project List
          </h2>

        </div>

        {/* ==================== DESKTOP / TABLET PROJECT LIST ==================== */}

        <div className="hidden sm:block">

          {projects.map((project, index) => (

            <div
              key={project.id}
              className={`
                flex
                items-center
                justify-between
                gap-5
                px-5
                py-4
                transition-colors
                hover:bg-slate-50/60
                ${
                  index !== projects.length - 1
                    ? 'border-b border-slate-100'
                    : ''
                }
              `}
            >

              {/* PROJECT INFORMATION */}

              <div className="min-w-0 flex-1">

                <h3 className="text-[13px] sm:text-[14px] font-extrabold text-slate-800">
                  {project.name}
                </h3>

                <p className="mt-1 text-[10px] sm:text-[11px] font-medium text-slate-400">
                  {project.members} members
                </p>

              </div>

              {/* RIGHT SIDE */}

              <div className="flex shrink-0 items-center gap-4">

                {/* PROGRESS */}

                <div className="flex w-[145px] items-center gap-3">

                  <div className="flex-1">

                    <div className="mb-1 flex items-center justify-between">

                      <span className="text-[10px] font-medium text-slate-400">
                        Progress
                      </span>

                    </div>

                    <div className="h-[4px] w-full overflow-hidden rounded-full bg-slate-100">

                      <div
                        className={`h-full rounded-full ${
                          project.status === 'On Track'
                            ? 'bg-emerald-500'
                            : project.status === 'At Risk'
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{
                          width: `${project.progress}%`,
                        }}
                      />

                    </div>

                  </div>

                  <span className="w-[32px] text-right text-[11px] font-extrabold text-slate-700">
                    {project.progress}%
                  </span>

                </div>

                {/* STATUS */}

                <div className="w-[62px]">

                  <span
                    className={`
                      inline-flex
                      items-center
                      justify-center
                      rounded-md
                      px-2
                      py-1
                      text-[9px]
                      font-extrabold
                      ${
                        project.status === 'On Track'
                          ? 'bg-emerald-50 text-emerald-500'
                          : project.status === 'At Risk'
                          ? 'bg-amber-50 text-amber-500'
                          : 'bg-rose-50 text-rose-500'
                      }
                    `}
                  >
                    {project.status}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* ==================== MOBILE PROJECT CARDS ==================== */}

        <div className="space-y-3 p-3 sm:hidden">

          {projects.map((project) => (

            <div
              key={project.id}
              className="
                rounded-xl
                border border-slate-100
                bg-white
                p-4
                shadow-sm
              "
            >

              {/* PROJECT NAME + STATUS */}

              <div className="flex items-start justify-between gap-3">

                <div className="min-w-0">

                  <h3 className="text-[13px] font-extrabold text-slate-800">
                    {project.name}
                  </h3>

                  <p className="mt-1 text-[10px] font-medium text-slate-400">
                    {project.members} members
                  </p>

                </div>

                <span
                  className={`
                    shrink-0
                    rounded-md
                    px-2
                    py-1
                    text-[9px]
                    font-extrabold
                    ${
                      project.status === 'On Track'
                        ? 'bg-emerald-50 text-emerald-500'
                        : project.status === 'At Risk'
                        ? 'bg-amber-50 text-amber-500'
                        : 'bg-rose-50 text-rose-500'
                    }
                  `}
                >
                  {project.status}
                </span>

              </div>

              {/* PROGRESS */}

              <div className="mt-4">

                <div className="mb-1.5 flex items-center justify-between">

                  <span className="text-[10px] font-medium text-slate-400">
                    Progress
                  </span>

                  <span className="text-[10px] font-extrabold text-slate-700">
                    {project.progress}%
                  </span>

                </div>

                <div className="h-[5px] w-full overflow-hidden rounded-full bg-slate-100">

                  <div
                    className={`h-full rounded-full ${
                      project.status === 'On Track'
                        ? 'bg-emerald-500'
                        : project.status === 'At Risk'
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
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

      </div>

    </div>
  );
};

export default AdminProjects;