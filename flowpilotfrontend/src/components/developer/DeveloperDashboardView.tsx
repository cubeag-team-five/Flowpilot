import React from "react";

import DeveloperTasks from "./DeveloperTasks";
import DeveloperSprintBoard from "./DeveloperSprintBoard";
import DeveloperTimeLog from "./DeveloperTimeLog";
import DeveloperMentions from "./DeveloperMentions";

interface DeveloperDashboardViewProps {
  activePage?: string;
}

export const DeveloperDashboardView: React.FC<
  DeveloperDashboardViewProps
> = ({ activePage = "dashboard" }) => {
  /*
   * ============================================================
   * MY DASHBOARD
   * Keep the existing Dashboard UI exactly as it is.
   * ============================================================
   */
    if (activePage === 'My Tasks') {
    return <DeveloperTasks />;
  }

  if (activePage === 'Sprint Board') {
    return <DeveloperSprintBoard />;
  }

  if (activePage === 'Time Log') {
    return <DeveloperTimeLog />;
  }

  if (activePage === 'Mentions') {
    return <DeveloperMentions />;
  }


  const renderDashboard = () => {
    return (
      <>
        {/* ================= TOP STATS ================= */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
            <div className="mb-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              TASKS THIS SPRINT
            </div>

            <div className="mb-2 text-3xl font-black leading-none text-slate-900">
              4
            </div>

            <div className="text-xs font-bold text-emerald-500">
              1 done · 2 in progress
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
            <div className="mb-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              STORY POINTS
            </div>

            <div className="mb-2 text-3xl font-black leading-none text-slate-900">
              23 SP
            </div>

            <div className="text-xs font-bold text-emerald-500">
              10 SP completed
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
            <div className="mb-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              HOURS THIS WEEK
            </div>

            <div className="mb-2 text-3xl font-black leading-none text-slate-900">
              18h
            </div>

            <div className="text-xs font-bold text-emerald-500">
              across 5 tasks
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
            <div className="mb-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              UNREAD MENTIONS
            </div>

            <div className="mb-2 text-3xl font-black leading-none text-slate-900">
              2
            </div>

            <div className="text-xs font-bold text-purple-500">
              Need your attention
            </div>
          </div>
        </div>

        {/* ================= DASHBOARD CONTENT ================= */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* Sprint Tasks */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
            <h3 className="mb-5 text-sm font-extrabold text-slate-900">
              My Sprint Tasks
            </h3>

            <div className="space-y-3">
              {[
                {
                  title: "Design system component library",
                  code: "T-040 · 8 SP · Due Aug 8",
                  status: "In Progress",
                  color: "bg-amber-100 text-amber-700",
                },
                {
                  title: "Mobile responsive layout",
                  code: "T-044 · 5 SP · Due Aug 7",
                  status: "In Progress",
                  color: "bg-amber-100 text-amber-700",
                },
                {
                  title: "JWT token refresh logic",
                  code: "T-046 · 2 SP · Due Aug 3",
                  status: "Done",
                  color: "bg-emerald-100 text-emerald-700",
                },
                {
                  title: "Kanban drag & drop",
                  code: "T-049 · 8 SP · Due Aug 12",
                  status: "To Do",
                  color: "bg-slate-100 text-slate-600",
                },
              ].map((task, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-slate-100 p-3 transition-colors hover:border-slate-200"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        task.status === "Done"
                          ? "bg-emerald-500"
                          : task.status === "In Progress"
                          ? "bg-amber-500"
                          : "bg-slate-300"
                      }`}
                    />

                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {task.title}
                      </div>

                      <div className="text-[10px] text-slate-400">
                        {task.code}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${task.color}`}
                  >
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Hours */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
            <h3 className="mb-5 text-sm font-extrabold text-slate-900">
              Daily Hours (This Week)
            </h3>

            <div className="flex h-36 items-end justify-between gap-3 pt-6">
              {[
                { day: "Mon", hrs: "3.5h", pct: "45%" },
                { day: "Tue", hrs: "5h", pct: "65%" },
                { day: "Wed", hrs: "4.5h", pct: "58%" },
                { day: "Thu", hrs: "6.5h", pct: "85%" },
                { day: "Fri", hrs: "6h", pct: "80%" },
              ].map((bar, i) => (
                <div
                  key={i}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <span className="text-[10px] font-bold text-slate-500">
                    {bar.hrs}
                  </span>

                  <div
                    className="relative w-full rounded-t-lg bg-emerald-100"
                    style={{ height: bar.pct }}
                  >
                    <div className="absolute inset-0 rounded-t-lg bg-teal-300 opacity-80" />
                  </div>

                  <span className="text-[11px] font-bold text-slate-400">
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-extrabold">
              <span className="text-slate-400">Week Total</span>

              <span className="text-emerald-500">18h</span>
            </div>
          </div>
        </div>
      </>
    );
  };

  /*
   * ============================================================
   * PAGE SWITCHING
   * ============================================================
   *
   * dashboard
   * tasks
   * sprint-board
   * time-log
   * mentions
   */

  switch (activePage) {
    case "tasks":
      return <DeveloperTasks />;

    case "sprint-board":
      return <DeveloperSprintBoard />;

    case "time-log":
      return <DeveloperTimeLog />;

    case "mentions":
      return <DeveloperMentions />;

    case "dashboard":
    default:
      return renderDashboard();
  }
};