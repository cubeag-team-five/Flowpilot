import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import DeveloperTasks from "./DeveloperTasks";
import DeveloperSprintBoard from "./DeveloperSprintBoard";
import DeveloperTimeLog from "./DeveloperTimeLog";
import DeveloperMentions from "./DeveloperMentions";

interface DeveloperDashboardViewProps {
  activePage?: string;
}

interface SprintTask {
  id: number;
  taskCode: string;
  title: string;
  storyPoints: number;
  status: string;
  dueDate?: string | null;
}

interface DailyHours {
  day: string;
  hours: number;
}

interface DashboardData {
  tasksThisSprint: number;
  doneTasks: number;
  inProgressTasks: number;

  totalStoryPoints: number;
  completedStoryPoints: number;

  hoursThisWeek: number;
  tasksWorkedOn: number;

  unreadMentions: number;

  sprintTasks: SprintTask[];
  dailyHours: DailyHours[];
}

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8080";

const getToken = () => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("jwt") ||
    localStorage.getItem("accessToken")
  );
};

const getDeveloperName = () => {
  return (
    localStorage.getItem("developerName") ||
    localStorage.getItem("userName") ||
    localStorage.getItem("name") ||
    "Sneha Rao"
  );
};

const DeveloperDashboardView: React.FC<
  DeveloperDashboardViewProps
> = ({ activePage = "dashboard" }) => {

  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =====================================================
  // FETCH DASHBOARD
  // =====================================================

  useEffect(() => {
    if (activePage !== "dashboard") {
      return;
    }

    const loadDashboard = async () => {

      try {

        setLoading(true);
        setError("");

        const developerName =
          getDeveloperName();

        const token =
          getToken();

        const response =
          await fetch(
            `${API_BASE}/api/developer/dashboard?developerName=${encodeURIComponent(
              developerName
            )}`,
            {
              headers: {
                ...(token
                  ? {
                      Authorization:
                        `Bearer ${token}`,
                    }
                  : {}),
              },
            }
          );

        if (!response.ok) {
          throw new Error(
            `Failed to load dashboard (${response.status})`
          );
        }

        const data: DashboardData =
          await response.json();

        setDashboard(data);

      } catch (err) {

        console.error(
          "Dashboard error:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load dashboard."
        );

      } finally {

        setLoading(false);

      }
    };

    loadDashboard();

  }, [activePage]);

  // =====================================================
  // DAILY HOURS
  // =====================================================

  const maxHours = useMemo(() => {

    if (
      !dashboard?.dailyHours ||
      dashboard.dailyHours.length === 0
    ) {
      return 1;
    }

    return Math.max(
      1,
      ...dashboard.dailyHours.map(
        (item) => Number(item.hours) || 0
      )
    );

  }, [dashboard]);

  // =====================================================
  // PAGE SWITCHING
  // =====================================================

  if (activePage === "tasks") {
    return <DeveloperTasks />;
  }

  if (activePage === "sprint-board") {
    return <DeveloperSprintBoard />;
  }

  if (activePage === "time-log") {
    return <DeveloperTimeLog />;
  }

  if (activePage === "mentions") {
    return <DeveloperMentions />;
  }

  // =====================================================
  // STATUS CLASSES
  // =====================================================

  const getStatusClass = (
    status: string
  ) => {

    if (
      status === "Done"
    ) {
      return {
        dot: "bg-emerald-500",
        badge:
          "bg-emerald-50 text-emerald-500",
      };
    }

    if (
      status === "In Progress"
    ) {
      return {
        dot: "bg-orange-500",
        badge:
          "bg-orange-50 text-orange-500",
      };
    }

    return {
      dot: "bg-slate-300",
      badge:
        "bg-slate-50 text-slate-400",
    };
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-400">
        Loading dashboard...
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
        <div className="text-sm font-semibold text-red-500">
          Unable to load dashboard
        </div>

        <div className="mt-2 text-xs text-red-400">
          {error}
        </div>
      </div>
    );
  }

  const data: DashboardData =
    dashboard || {
      tasksThisSprint: 0,
      doneTasks: 0,
      inProgressTasks: 0,
      totalStoryPoints: 0,
      completedStoryPoints: 0,
      hoursThisWeek: 0,
      tasksWorkedOn: 0,
      unreadMentions: 0,
      sprintTasks: [],
      dailyHours: [],
    };

  // =====================================================
  // DASHBOARD
  // =====================================================

  return (
    <div className="w-full">

      {/* =================================================
          TOP STAT CARDS
      ================================================= */}

      <div className="grid grid-cols-2 gap-3 sm:gap-3 lg:grid-cols-4">

        {/* TASKS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">

          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.04em] text-slate-400">
            TASKS THIS SPRINT
          </div>

          <div className="mb-2 text-[25px] font-black leading-none text-slate-800">
            {data.tasksThisSprint}
          </div>

          <div className="text-[12px] font-medium text-cyan-400">
            {data.doneTasks} done ·{" "}
            {data.inProgressTasks} in progress
          </div>

        </div>

        {/* STORY POINTS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">

          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.04em] text-slate-400">
            STORY POINTS
          </div>

          <div className="mb-2 text-[25px] font-bold leading-none text-slate-800">
            {data.totalStoryPoints} SP
          </div>

          <div className="text-[12px] font-medium text-cyan-400">
            {data.completedStoryPoints} SP completed
          </div>

        </div>

        {/* HOURS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">

          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.04em] text-slate-400">
            HOURS THIS WEEK
          </div>

          <div className="mb-2 text-[25px] font-bold leading-none text-slate-900">
            {data.hoursThisWeek}h
          </div>

          <div className="text-[12px] font-medium text-emerald-500">
            across {data.tasksWorkedOn} tasks
          </div>

        </div>

        {/* MENTIONS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">

          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.04em] text-slate-400">
            UNREAD MENTIONS
          </div>

          <div className="mb-2 text-[25px] font-bold leading-none text-slate-800">
            {data.unreadMentions}
          </div>

          <div className="text-[12px] font-medium text-purple-400">
            Need your attention
          </div>

        </div>

      </div>

      {/* =================================================
          LOWER CONTENT
      ================================================= */}

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]">

        {/* ===============================================
            MY SPRINT TASKS
        =============================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">

          <h3 className="mb-4 text-[14px] font-bold text-slate-900">
            My Sprint Tasks
          </h3>

          <div className="space-y-3">

            {data.sprintTasks.length === 0 && (

              <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">
                No tasks assigned.
              </div>

            )}

            {data.sprintTasks.map(
              (task) => {

                const style =
                  getStatusClass(
                    task.status
                  );

                return (

                  <div
                    key={task.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2.5 transition-colors hover:border-slate-200"
                  >

                    <div className="flex min-w-0 items-center gap-3">

                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${style.dot}`}
                      />

                      <div className="min-w-0">

                        <div className="truncate text-[13px] font-semibold text-slate-900">
                          {task.title}
                        </div>

                        <div className="text-[11px] font-medium text-slate-400">

                          {task.taskCode} ·{" "}
                          {task.storyPoints || 0} SP

                          {task.dueDate
                            ? ` · Due ${task.dueDate}`
                            : ""}

                        </div>

                      </div>

                    </div>

                    <span
                      className={`ml-3 shrink-0 rounded-lg px-2.5 py-1 text-[10px] font-semibold ${style.badge}`}
                    >
                      {task.status}
                    </span>

                  </div>

                );
              }
            )}

          </div>

        </div>

        {/* ===============================================
            DAILY HOURS
        =============================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">

          <h3 className="mb-3 text-[14px] font-bold text-slate-900">
            Daily Hours (This Week)
          </h3>

          <div className="flex h-[160px] items-end justify-center">

            <div className="flex h-[155px] w-full max-w-[420px] items-end justify-between gap-2 px-3">

              {data.dailyHours.map(
                (item) => {

                  const hours =
                    Number(item.hours) || 0;

                  const height =
                    hours === 0
                      ? 4
                      : Math.max(
                          10,
                          (hours / maxHours) * 100
                        );

                  return (

                    <div
                      key={item.day}
                      className="flex h-full flex-1 flex-col items-center justify-end"
                    >

                      <span className="mb-2 text-[10px] font-medium text-slate-500">
                        {hours}h
                      </span>

                      <div
                        className="w-full max-w-[38px] rounded-t-lg bg-teal-200 transition-all"
                        style={{
                          height: `${height}px`,
                        }}
                      />

                      <span className="mt-2 text-[10px] font-medium text-slate-400">
                        {item.day}
                      </span>

                    </div>

                  );
                }
              )}

            </div>

          </div>

          {/* WEEK TOTAL */}

          <div className="mt-2 flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-3">

            <span className="text-[12px] font-medium text-slate-400">
              Week Total
            </span>

            <span className="text-[17px] font-semibold text-teal-500">
              {data.hoursThisWeek}h
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DeveloperDashboardView;