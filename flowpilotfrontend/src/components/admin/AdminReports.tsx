import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  FileText,
  Users,
  Building2,
  FolderKanban,
  TrendingUp,
  CalendarDays,
  ChevronDown,
} from 'lucide-react';

interface ReportData {
  department: string;
  users: number;
  projects: number;
  completed: number;
  utilization: number;
}

const reportData: ReportData[] = [
  {
    department: 'Engineering',
    users: 18,
    projects: 8,
    completed: 5,
    utilization: 86,
  },
  {
    department: 'Quality Assurance',
    users: 7,
    projects: 4,
    completed: 3,
    utilization: 78,
  },
  {
    department: 'Project Management',
    users: 4,
    projects: 6,
    completed: 4,
    utilization: 91,
  },
  {
    department: 'Human Resources',
    users: 6,
    projects: 2,
    completed: 1,
    utilization: 68,
  },
  {
    department: 'Finance',
    users: 5,
    projects: 3,
    completed: 2,
    utilization: 74,
  },
  {
    department: 'DevOps',
    users: 6,
    projects: 5,
    completed: 3,
    utilization: 83,
  },
];

export const AdminReports: React.FC = () => {
  const [period, setPeriod] = useState('This Month');

  const totalUsers = reportData.reduce(
    (total, item) => total + item.users,
    0
  );

  const totalProjects = reportData.reduce(
    (total, item) => total + item.projects,
    0
  );

  const completedProjects = reportData.reduce(
    (total, item) => total + item.completed,
    0
  );

  const averageUtilization = Math.round(
    reportData.reduce(
      (total, item) => total + item.utilization,
      0
    ) / reportData.length
  );

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Reports
          </h1>

          <p className="mt-1 text-sm font-medium text-slate-400">
            View organization performance and activity reports
          </p>
        </div>

        <div className="flex items-center gap-3">

          {/* PERIOD */}

          <div className="relative">

            <CalendarDays
              size={14}
              className="pointer-events-none absolute left-3 top-3 text-slate-400"
            />

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="appearance-none rounded-xl border
              border-slate-200 bg-white py-2.5 pl-9 pr-9
              text-xs font-bold text-slate-600 outline-none
              focus:border-slate-400"
            >
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>

            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-3 text-slate-400"
            />

          </div>

          {/* EXPORT */}

          <button
            className="inline-flex items-center gap-2
            rounded-xl bg-slate-900 px-4 py-2.5
            text-xs font-extrabold text-white
            transition hover:bg-slate-800"
          >
            <Download size={15} />
            Export
          </button>

        </div>

      </div>

      {/* SUMMARY CARDS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* USERS */}

        <div className="rounded-2xl border border-slate-200/80
        bg-white p-5 shadow-2xs">

          <div className="mb-2 flex items-center justify-between">

            <div className="text-[11px] font-extrabold
            uppercase tracking-wider text-slate-400">
              TOTAL USERS
            </div>

            <div className="rounded-lg bg-slate-100 p-2">
              <Users size={15} className="text-slate-600" />
            </div>

          </div>

          <div className="mb-2 text-3xl font-black
          leading-none text-slate-900">
            {totalUsers}
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-emerald-500">
            <TrendingUp size={13} />
            +3 this month
          </div>

        </div>

        {/* DEPARTMENTS */}

        <div className="rounded-2xl border border-slate-200/80
        bg-white p-5 shadow-2xs">

          <div className="mb-2 flex items-center justify-between">

            <div className="text-[11px] font-extrabold
            uppercase tracking-wider text-slate-400">
              DEPARTMENTS
            </div>

            <div className="rounded-lg bg-slate-100 p-2">
              <Building2 size={15} className="text-slate-600" />
            </div>

          </div>

          <div className="mb-2 text-3xl font-black
          leading-none text-slate-900">
            {reportData.length}
          </div>

          <div className="text-xs font-bold text-emerald-500">
            All operational
          </div>

        </div>

        {/* PROJECTS */}

        <div className="rounded-2xl border border-slate-200/80
        bg-white p-5 shadow-2xs">

          <div className="mb-2 flex items-center justify-between">

            <div className="text-[11px] font-extrabold
            uppercase tracking-wider text-slate-400">
              TOTAL PROJECTS
            </div>

            <div className="rounded-lg bg-slate-100 p-2">
              <FolderKanban
                size={15}
                className="text-slate-600"
              />
            </div>

          </div>

          <div className="mb-2 text-3xl font-black
          leading-none text-slate-900">
            {totalProjects}
          </div>

          <div className="text-xs font-bold text-cyan-500">
            {completedProjects} completed
          </div>

        </div>

        {/* UTILIZATION */}

        <div className="rounded-2xl border border-slate-200/80
        bg-white p-5 shadow-2xs">

          <div className="mb-2 flex items-center justify-between">

            <div className="text-[11px] font-extrabold
            uppercase tracking-wider text-slate-400">
              TEAM UTILIZATION
            </div>

            <div className="rounded-lg bg-slate-100 p-2">
              <BarChart3
                size={15}
                className="text-slate-600"
              />
            </div>

          </div>

          <div className="mb-2 text-3xl font-black
          leading-none text-slate-900">
            {averageUtilization}%
          </div>

          <div className="text-xs font-bold text-purple-500">
            Average utilization
          </div>

        </div>

      </div>

      {/* REPORT CONTENT */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">

        {/* DEPARTMENT PERFORMANCE */}

        <div className="rounded-2xl border border-slate-200/80
        bg-white p-6 shadow-2xs">

          <div className="mb-5 flex items-center justify-between">

            <div>

              <h3 className="text-sm font-extrabold text-slate-900">
                Department Performance
              </h3>

              <p className="mt-1 text-[11px] font-medium text-slate-400">
                Performance overview for {period.toLowerCase()}
              </p>

            </div>

            <BarChart3
              size={18}
              className="text-slate-400"
            />

          </div>

          <div className="space-y-5">

            {reportData.map((item, index) => (

              <div key={index}>

                <div className="mb-2 flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    <div className="flex h-7 w-7 items-center
                    justify-center rounded-lg bg-slate-100">

                      <Building2
                        size={13}
                        className="text-slate-500"
                      />

                    </div>

                    <span className="text-xs font-bold text-slate-700">
                      {item.department}
                    </span>

                  </div>

                  <span className="text-xs font-black text-slate-900">
                    {item.utilization}%
                  </span>

                </div>

                <div className="h-1.5 w-full overflow-hidden
                rounded-full bg-slate-100">

                  <div
                    className={`h-full rounded-full ${
                      index === 0
                        ? 'bg-cyan-400'
                        : index === 1
                        ? 'bg-emerald-400'
                        : index === 2
                        ? 'bg-purple-400'
                        : index === 3
                        ? 'bg-amber-400'
                        : index === 4
                        ? 'bg-indigo-400'
                        : 'bg-slate-400'
                    }`}
                    style={{
                      width: `${item.utilization}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* QUICK REPORTS */}

        <div className="rounded-2xl border border-slate-200/80
        bg-white p-6 shadow-2xs">

          <h3 className="mb-5 text-sm font-extrabold text-slate-900">
            Available Reports
          </h3>

          <div className="space-y-3">

            {/* USER REPORT */}

            <button
              className="flex w-full items-center gap-3
              rounded-xl border border-slate-100 p-3
              text-left transition hover:bg-slate-50"
            >

              <div className="flex h-9 w-9 shrink-0 items-center
              justify-center rounded-lg bg-slate-100">

                <Users
                  size={16}
                  className="text-slate-600"
                />

              </div>

              <div className="min-w-0 flex-1">

                <div className="text-xs font-extrabold text-slate-800">
                  User Activity Report
                </div>

                <div className="mt-0.5 text-[10px] font-medium text-slate-400">
                  Login and activity overview
                </div>

              </div>

              <FileText
                size={15}
                className="text-slate-400"
              />

            </button>

            {/* PROJECT REPORT */}

            <button
              className="flex w-full items-center gap-3
              rounded-xl border border-slate-100 p-3
              text-left transition hover:bg-slate-50"
            >

              <div className="flex h-9 w-9 shrink-0 items-center
              justify-center rounded-lg bg-slate-100">

                <FolderKanban
                  size={16}
                  className="text-slate-600"
                />

              </div>

              <div className="min-w-0 flex-1">

                <div className="text-xs font-extrabold text-slate-800">
                  Project Report
                </div>

                <div className="mt-0.5 text-[10px] font-medium text-slate-400">
                  Project progress and delivery
                </div>

              </div>

              <FileText
                size={15}
                className="text-slate-400"
              />

            </button>

            {/* DEPARTMENT REPORT */}

            <button
              className="flex w-full items-center gap-3
              rounded-xl border border-slate-100 p-3
              text-left transition hover:bg-slate-50"
            >

              <div className="flex h-9 w-9 shrink-0 items-center
              justify-center rounded-lg bg-slate-100">

                <Building2
                  size={16}
                  className="text-slate-600"
                />

              </div>

              <div className="min-w-0 flex-1">

                <div className="text-xs font-extrabold text-slate-800">
                  Department Report
                </div>

                <div className="mt-0.5 text-[10px] font-medium text-slate-400">
                  Department-wise performance
                </div>

              </div>

              <FileText
                size={15}
                className="text-slate-400"
              />

            </button>

            {/* UTILIZATION REPORT */}

            <button
              className="flex w-full items-center gap-3
              rounded-xl border border-slate-100 p-3
              text-left transition hover:bg-slate-50"
            >

              <div className="flex h-9 w-9 shrink-0 items-center
              justify-center rounded-lg bg-slate-100">

                <BarChart3
                  size={16}
                  className="text-slate-600"
                />

              </div>

              <div className="min-w-0 flex-1">

                <div className="text-xs font-extrabold text-slate-800">
                  Utilization Report
                </div>

                <div className="mt-0.5 text-[10px] font-medium text-slate-400">
                  Team workload and utilization
                </div>

              </div>

              <FileText
                size={15}
                className="text-slate-400"
              />

            </button>

          </div>

        </div>

      </div>

      {/* PROJECT COMPLETION */}

      <div className="rounded-2xl border border-slate-200/80
      bg-white p-6 shadow-2xs">

        <div className="mb-5 flex items-center justify-between">

          <div>

            <h3 className="text-sm font-extrabold text-slate-900">
              Project Completion
            </h3>

            <p className="mt-1 text-[11px] font-medium text-slate-400">
              Completed projects compared with total projects
            </p>

          </div>

          <span className="text-lg font-black text-slate-900">
            {completedProjects}/{totalProjects}
          </span>

        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">

          <div
            className="h-full rounded-full bg-emerald-400"
            style={{
              width: `${Math.round(
                (completedProjects / totalProjects) * 100
              )}%`,
            }}
          />

        </div>

        <div className="mt-3 flex justify-between">

          <span className="text-[11px] font-bold text-slate-400">
            Completion rate
          </span>

          <span className="text-[11px] font-black text-emerald-500">
            {Math.round(
              (completedProjects / totalProjects) * 100
            )}%
          </span>

        </div>

      </div>

    </div>
  );
};