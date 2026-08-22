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
  borderColor: string;
  memberColor: string;
  projectColor: string;
}

const departments: Department[] = [
  {
    name: 'Engineering',
    head: 'Karan Mehta',
    members: 18,
    projects: 8,
    icon: <Settings size={18} />,
    iconBg: 'bg-cyan-50',
    iconColor: 'text-slate-400',
    buttonBg: 'bg-cyan-50',
    buttonColor: 'text-cyan-400',
    borderColor: 'border-cyan-100',
    memberColor: 'text-slate-900',
    projectColor: 'text-cyan-400',
  },
  {
    name: 'Product',
    head: 'Arjun Shah',
    members: 6,
    projects: 5,
    icon: <Package size={18} />,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-400',
    buttonBg: 'bg-purple-50',
    buttonColor: 'text-purple-400',
    borderColor: 'border-purple-100',
    memberColor: 'text-slate-900',
    projectColor: 'text-purple-400',
  },
  {
    name: 'Quality Assurance',
    head: 'Sana Sheikh',
    members: 7,
    projects: 6,
    icon: <ShieldCheck size={18} />,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-400',
    buttonBg: 'bg-emerald-50',
    buttonColor: 'text-emerald-500',
    borderColor: 'border-emerald-100',
    memberColor: 'text-slate-900',
    projectColor: 'text-emerald-500',
  },
  {
    name: 'Design',
    head: 'Divya Mehta',
    members: 5,
    projects: 4,
    icon: <Palette size={18} />,
    iconBg: 'bg-orange-50',
    iconColor: 'text-pink-400',
    buttonBg: 'bg-orange-50',
    buttonColor: 'text-orange-500',
    borderColor: 'border-orange-100',
    memberColor: 'text-slate-900',
    projectColor: 'text-orange-500',
  },
  {
    name: 'Operations',
    head: 'Hina Agarwal',
    members: 8,
    projects: 3,
    icon: <Briefcase size={18} />,
    iconBg: 'bg-rose-50',
    iconColor: 'text-blue-400',
    buttonBg: 'bg-rose-50',
    buttonColor: 'text-rose-500',
    borderColor: 'border-rose-100',
    memberColor: 'text-slate-900',
    projectColor: 'text-red-500',
  },
  {
    name: 'Leadership',
    head: 'Aditya Kate',
    members: 3,
    projects: 24,
    icon: <Crown size={18} />,
    iconBg: 'bg-slate-50',
    iconColor: 'text-orange-400',
    buttonBg: 'bg-slate-50',
    buttonColor: 'text-slate-400',
    borderColor: 'border-slate-100',
    memberColor: 'text-slate-900',
    projectColor: 'text-slate-400',
  },
];

export const SuperAdminDepartments: React.FC = () => {
  return (
    <div className="w-full overflow-x-hidden">

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-[18px]
          w-full
        "
      >

        {departments.map((department) => (
          <div
            key={department.name}
            className={`
              w-full
              h-[240px]
              bg-white
              border
              ${department.borderColor}
              rounded-[16px]
              px-[24px]
              py-[20px]
              shadow-[0_2px_8px_rgba(15,23,42,0.05)]
              transition-all
              duration-200
              hover:shadow-[0_5px_15px_rgba(15,23,42,0.08)]

              max-md:h-auto
              max-md:min-h-[240px]
              max-md:px-[20px]
              max-md:py-[18px]

              max-sm:px-[16px]
              max-sm:py-[16px]
              max-sm:rounded-[14px]
            `}
          >

            {/* TOP SECTION */}

            <div className="flex items-center gap-[12px] min-w-0">

              <div
                className={`
                  w-[48px]
                  h-[48px]
                  min-w-[48px]
                  rounded-[14px]
                  flex
                  items-center
                  justify-center
                  shrink-0
                  ${department.iconBg}
                  ${department.iconColor}

                  max-sm:w-[44px]
                  max-sm:h-[44px]
                  max-sm:min-w-[44px]
                  max-sm:rounded-[12px]
                `}
              >
                {department.icon}
              </div>

              <div className="min-w-0 flex-1">

                <h3
                  className="
                    text-[15px]
                    leading-[19px]
                    font-extrabold
                    text-slate-900
                    truncate

                    max-sm:text-[14px]
                    max-sm:leading-[18px]
                  "
                >
                  {department.name}
                </h3>

                <p
                  className="
                    text-[12px]
                    leading-[17px]
                    text-slate-400
                    mt-[2px]
                    truncate

                    max-sm:text-[11px]
                    max-sm:leading-[16px]
                  "
                >
                  Head: {department.head}
                </p>

              </div>

            </div>

            {/* STAT BOXES */}

            <div
              className="
                grid
                grid-cols-2
                gap-[10px]
                mt-[17px]

                max-sm:mt-[15px]
                max-sm:gap-[8px]
              "
            >

              {/* MEMBERS */}

              <div
                className="
                  h-[70px]
                  rounded-[11px]
                  bg-slate-50
                  px-[14px]
                  py-[10px]

                  max-sm:h-[66px]
                  max-sm:px-[11px]
                  max-sm:py-[9px]
                "
              >

                <div className="flex items-center gap-[7px]">

                  <Users
                    size={14}
                    strokeWidth={1.8}
                    className="text-slate-400 shrink-0"
                  />

                  <span
                    className="
                      text-[11px]
                      leading-[15px]
                      text-slate-400
                      font-medium

                      max-sm:text-[10px]
                    "
                  >
                    Members
                  </span>

                </div>

                <div
                  className={`
                    mt-[4px]
                    text-[22px]
                    leading-[25px]
                    font-extrabold
                    ${department.memberColor}

                    max-sm:text-[20px]
                    max-sm:leading-[23px]
                  `}
                >
                  {department.members}
                </div>

              </div>

              {/* PROJECTS */}

              <div
                className="
                  h-[70px]
                  rounded-[11px]
                  bg-slate-50
                  px-[14px]
                  py-[10px]

                  max-sm:h-[66px]
                  max-sm:px-[11px]
                  max-sm:py-[9px]
                "
              >

                <div className="flex items-center gap-[7px]">

                  <FolderKanban
                    size={14}
                    strokeWidth={1.8}
                    className="text-slate-400 shrink-0"
                  />

                  <span
                    className="
                      text-[11px]
                      leading-[15px]
                      text-slate-400
                      font-medium

                      max-sm:text-[10px]
                    "
                  >
                    Projects
                  </span>

                </div>

                <div
                  className={`
                    mt-[4px]
                    text-[22px]
                    leading-[25px]
                    font-extrabold
                    ${department.projectColor}

                    max-sm:text-[20px]
                    max-sm:leading-[23px]
                  `}
                >
                  {department.projects}
                </div>

              </div>

            </div>

            {/* MANAGE BUTTON */}

            <button
              type="button"
              className={`
                w-full
                h-[42px]
                mt-[15px]
                rounded-[10px]
                border
                ${department.borderColor}
                ${department.buttonBg}
                ${department.buttonColor}
                text-[13px]
                leading-[17px]
                font-extrabold
                cursor-pointer
                transition-all
                duration-150
                hover:brightness-[0.98]

                max-sm:h-[40px]
                max-sm:mt-[14px]
                max-sm:text-[12px]
              `}
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