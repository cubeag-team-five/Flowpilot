import React from 'react';
import {
  Settings,
  Package,
  ShieldCheck,
  Palette,
  Briefcase,
  Crown,
  Users,
  FolderKanban,
} from 'lucide-react';

interface Department {
  name: string;
  head: string;
  members: number;
  projects: number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  buttonBg: string;
  buttonColor: string;
}

const departments: Department[] = [
  {
    name: 'Engineering',
    head: 'Karan Mehta',
    members: 18,
    projects: 8,
    icon: <Settings size={17} />,
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-500',
    buttonBg: 'bg-emerald-50',
    buttonColor: 'text-emerald-600',
  },
  {
    name: 'Product',
    head: 'Arjun Shah',
    members: 6,
    projects: 5,
    icon: <Package size={17} />,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
    buttonBg: 'bg-slate-50',
    buttonColor: 'text-slate-500',
  },
  {
    name: 'Quality Assurance',
    head: 'Sana Sheikh',
    members: 7,
    projects: 6,
    icon: <ShieldCheck size={17} />,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    buttonBg: 'bg-emerald-50',
    buttonColor: 'text-emerald-600',
  },
  {
    name: 'Design',
    head: 'Divya Mehta',
    members: 5,
    projects: 4,
    icon: <Palette size={17} />,
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-400',
    buttonBg: 'bg-amber-50',
    buttonColor: 'text-amber-500',
  },
  {
    name: 'Operations',
    head: 'Hina Agarwal',
    members: 8,
    projects: 3,
    icon: <Briefcase size={17} />,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    buttonBg: 'bg-rose-50',
    buttonColor: 'text-rose-500',
  },
  {
    name: 'Leadership',
    head: 'Aditya Kate',
    members: 3,
    projects: 24,
    icon: <Crown size={17} />,
    iconBg: 'bg-yellow-50',
    iconColor: 'text-yellow-500',
    buttonBg: 'bg-slate-50',
    buttonColor: 'text-slate-500',
  },
];

export const SuperAdminDepartments: React.FC = () => {
  return (
    <div className="space-y-6">

      {/* PAGE INTRO */}
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">
          Department Overview
        </h2>

        <p className="text-sm text-slate-400 mt-1">
          Manage departments, members and assigned projects
        </p>
      </div>

      {/* DEPARTMENT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {departments.map((department) => (
          <div
            key={department.name}
            className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >

            {/* TOP */}
            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">

                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${department.iconBg} ${department.iconColor}`}
                >
                  {department.icon}
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    {department.name}
                  </h3>

                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Head: {department.head}
                  </p>
                </div>

              </div>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-6 mt-7">

              <div>
                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                  <Users size={13} />
                  <span className="text-[10px] font-bold">
                    Members
                  </span>
                </div>

                <div className="text-2xl font-extrabold text-slate-900">
                  {department.members}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                  <FolderKanban size={13} />
                  <span className="text-[10px] font-bold">
                    Projects
                  </span>
                </div>

                <div className="text-2xl font-extrabold text-slate-900">
                  {department.projects}
                </div>
              </div>

            </div>

            {/* DIVIDER */}
            <div className="border-t border-slate-100 my-5" />

            {/* MANAGE BUTTON */}
            <button
              className={`w-full py-2.5 rounded-xl text-xs font-extrabold transition-colors ${department.buttonBg} ${department.buttonColor} hover:opacity-80 cursor-pointer`}
            >
              Manage Members
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default SuperAdminDepartments;