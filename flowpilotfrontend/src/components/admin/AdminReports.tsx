import React from 'react';
import {
  Users,
  Building2,
  Folder,
  GraduationCap,
  ClipboardList,
  BarChart3,
} from 'lucide-react';

interface Report {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  buttonBg: string;
  buttonText: string;
}

const reports: Report[] = [
  {
    id: 1,
    title: 'User Activity Report',
    description: 'Login history, session times, feature usage per user',
    icon: <Users size={18} />,
    iconBg: 'bg-amber-50',
    iconColor: 'text-purple-700',
    buttonBg: 'bg-amber-50 border-amber-100',
    buttonText: 'text-amber-500',
  },
  {
    id: 2,
    title: 'Department Summary',
    description: 'Members, projects, workload per department',
    icon: <Building2 size={18} />,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-500',
    buttonBg: 'bg-purple-50 border-purple-100',
    buttonText: 'text-purple-400',
  },
  {
    id: 3,
    title: 'Project Status Report',
    description: 'All projects, health, sprint progress, risk flags',
    icon: <Folder size={18} />,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    buttonBg: 'bg-emerald-50 border-emerald-100',
    buttonText: 'text-emerald-500',
  },
  {
    id: 4,
    title: 'Onboarding Report',
    description: 'New users, pending setups, license usage',
    icon: <GraduationCap size={18} />,
    iconBg: 'bg-cyan-50',
    iconColor: 'text-slate-700',
    buttonBg: 'bg-cyan-50 border-cyan-100',
    buttonText: 'text-cyan-400',
  },
  {
    id: 5,
    title: 'Compliance & Audit',
    description: 'System events, permission changes, admin actions',
    icon: <ClipboardList size={18} />,
    iconBg: 'bg-rose-50',
    iconColor: 'text-orange-400',
    buttonBg: 'bg-rose-50 border-rose-100',
    buttonText: 'text-rose-500',
  },
  {
    id: 6,
    title: 'System Usage Report',
    description: 'Feature adoption, API calls, storage consumption',
    icon: <BarChart3 size={18} />,
    iconBg: 'bg-slate-50',
    iconColor: 'text-slate-500',
    buttonBg: 'bg-slate-100 border-slate-200',
    buttonText: 'text-slate-400',
  },
];

export const AdminReports: React.FC = () => {
  const handleGenerateReport = (reportTitle: string) => {
    console.log(`Generate report: ${reportTitle}`);
  };

  return (
    <div className="w-full space-y-5 font-sans">

      {/* ==================== PAGE HEADER ==================== */}

      <div>
        <h1 className="text-[18px] sm:text-[19px] font-extrabold tracking-tight text-slate-900">
          Reports
        </h1>

        <p className="mt-0.5 text-[11px] sm:text-[12px] font-medium text-slate-400">
          Thursday, 13 August 2026
        </p>
      </div>

      {/* ==================== REPORT GRID ==================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-3
          md:grid-cols-2
          lg:grid-cols-3
        "
      >

        {reports.map((report) => (

          <div
            key={report.id}
            className="
              min-h-[166px]
              rounded-xl
              border border-slate-200
              bg-white
              px-4
              py-5
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-[1px]
              hover:shadow-md
            "
          >

            {/* ==================== ICON ==================== */}

            <div
              className={`
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                ${report.iconBg}
                ${report.iconColor}
              `}
            >
              {report.icon}
            </div>

            {/* ==================== TITLE ==================== */}

            <h2
              className="
                mt-3
                text-[13px]
                sm:text-[14px]
                font-extrabold
                leading-tight
                text-slate-800
              "
            >
              {report.title}
            </h2>

            {/* ==================== DESCRIPTION ==================== */}

            <p
              className="
                mt-1.5
                text-[10px]
                sm:text-[11px]
                font-medium
                leading-relaxed
                text-slate-400
              "
            >
              {report.description}
            </p>

            {/* ==================== BUTTON ==================== */}

            <button
              type="button"
              onClick={() => handleGenerateReport(report.title)}
              className={`
                mt-3
                inline-flex
                items-center
                justify-center
                rounded-lg
                border
                px-3
                py-2
                text-[10px]
                sm:text-[11px]
                font-extrabold
                transition-all
                hover:brightness-95
                active:scale-[0.98]
                ${report.buttonBg}
                ${report.buttonText}
              `}
            >
              Generate Report
            </button>

          </div>

        ))}

      </div>

    </div>
  );
};

export default AdminReports;