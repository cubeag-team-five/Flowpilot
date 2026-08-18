import React from 'react';
import { Eye } from 'lucide-react';

interface Sprint {
  project: string;
  sprint: string;
  done: number;
  inProgress: number;
  todo: number;
  completion: number;
  barColor: string;
  textColor: string;
}

export const ViewerSprintStatus: React.FC = () => {
  const sprints: Sprint[] = [
    {
      project: 'IPMT Platform v2',
      sprint: 'Sprint 12',
      done: 7,
      inProgress: 6,
      todo: 5,
      completion: 39,
      barColor: 'bg-emerald-500',
      textColor: 'text-emerald-500',
    },
    {
      project: 'E-Commerce Relaunch',
      sprint: 'Sprint 8',
      done: 4,
      inProgress: 5,
      todo: 5,
      completion: 29,
      barColor: 'bg-amber-500',
      textColor: 'text-amber-500',
    },
    {
      project: 'Mobile App Dev',
      sprint: 'Sprint 2',
      done: 2,
      inProgress: 3,
      todo: 3,
      completion: 25,
      barColor: 'bg-purple-400',
      textColor: 'text-purple-400',
    },
    {
      project: 'API Migration',
      sprint: 'Sprint 5',
      done: 5,
      inProgress: 3,
      todo: 3,
      completion: 45,
      barColor: 'bg-teal-400',
      textColor: 'text-teal-400',
    },
  ];

  return (
    <div className="w-full min-w-0 space-y-5">

      {/* =====================================================
          READ-ONLY ACCESS BANNER
          ===================================================== */}
      <section className="w-full rounded-2xl border border-slate-200 bg-slate-100/70 px-4 py-3.5 sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex min-w-0 items-start gap-3 text-xs font-semibold leading-5 text-slate-600 sm:items-center">
            <Eye
              size={16}
              strokeWidth={2}
              className="mt-0.5 shrink-0 text-slate-500 sm:mt-0"
            />

            <span>
              You have read-only access. To request additional permissions,
              contact your Admin.
            </span>
          </div>

          <button
            type="button"
            className="w-full shrink-0 rounded-xl border border-slate-200 bg-slate-200/70 px-4 py-2 text-xs font-bold text-slate-700 transition-colors duration-200 hover:bg-slate-300 sm:w-auto"
          >
            Request Access
          </button>

        </div>
      </section>


      {/* =====================================================
          SPRINT CARDS
          ===================================================== */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">

        {sprints.map((sprint) => (
          <article
            key={sprint.sprint}
            className="w-full min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6"
          >

            {/* Project name */}
            <div className="mb-5">
              <p className="mb-1 text-xs font-medium text-slate-400">
                {sprint.project}
              </p>

              <h2 className="text-[17px] font-extrabold leading-tight text-slate-900 sm:text-[18px]">
                {sprint.sprint}
              </h2>
            </div>


            {/* =================================================
                TASK COUNTS
                ================================================= */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">

              {/* Done */}
              <div className="flex min-h-[60px] flex-col items-center justify-center rounded-xl bg-slate-50 px-2 py-3">
                <span className="text-xl font-black leading-none text-emerald-500">
                  {sprint.done}
                </span>

                <span className="mt-1 text-[10px] font-medium text-slate-400 sm:text-[11px]">
                  Done
                </span>
              </div>


              {/* In Progress */}
              <div className="flex min-h-[60px] flex-col items-center justify-center rounded-xl bg-slate-50 px-2 py-3">
                <span className="text-xl font-black leading-none text-amber-500">
                  {sprint.inProgress}
                </span>

                <span className="mt-1 text-[10px] font-medium text-slate-400 sm:text-[11px]">
                  In Progress
                </span>
              </div>


              {/* To Do */}
              <div className="flex min-h-[60px] flex-col items-center justify-center rounded-xl bg-slate-50 px-2 py-3">
                <span className="text-xl font-black leading-none text-slate-400">
                  {sprint.todo}
                </span>

                <span className="mt-1 text-[10px] font-medium text-slate-400 sm:text-[11px]">
                  To Do
                </span>
              </div>

            </div>


            {/* =================================================
                SPRINT COMPLETION
                ================================================= */}
            <div className="mt-5">

              <div className="mb-2 flex items-center justify-between gap-3">

                <span className="text-xs font-medium text-slate-500">
                  Sprint Completion
                </span>

                <span
                  className={`shrink-0 text-sm font-extrabold ${sprint.textColor}`}
                >
                  {sprint.completion}%
                </span>

              </div>


              {/* Progress Bar */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${sprint.barColor}`}
                  style={{
                    width: `${sprint.completion}%`,
                  }}
                />
              </div>

            </div>

          </article>
        ))}

      </section>

    </div>
  );
};

export default ViewerSprintStatus;