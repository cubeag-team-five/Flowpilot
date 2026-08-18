import React from 'react';

interface Department {
  id: number;
  name: string;
  head: string;
  members: number;
  progress: number;
  color: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  shadowColor: string;
}

const departments: Department[] = [
  {
    id: 1,
    name: 'Engineering',
    head: 'Karan Mehta',
    members: 18,
    progress: 40,
    color: 'bg-[#69E8D0]',
    bgColor: 'bg-[#F4FEFC]',
    textColor: 'text-[#5DD9C3]',
    borderColor: 'border-[#D8F5EF]',
    shadowColor: 'shadow-[0_2px_8px_rgba(45,212,191,0.08)]',
  },
  {
    id: 2,
    name: 'Product',
    head: 'Arjun Shah',
    members: 6,
    progress: 14,
    color: 'bg-purple-400',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-500',
    borderColor: 'border-purple-100',
    shadowColor: 'shadow-[0_2px_8px_rgba(192,132,252,0.08)]',
  },
  {
    id: 3,
    name: 'Quality Assurance',
    head: 'Sana Sheikh',
    members: 7,
    progress: 16,
    color: 'bg-emerald-400',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-500',
    borderColor: 'border-emerald-100',
    shadowColor: 'shadow-[0_2px_8px_rgba(52,211,153,0.08)]',
  },
  {
    id: 4,
    name: 'Design',
    head: 'Divya Mehta',
    members: 5,
    progress: 11,
    color: 'bg-amber-400',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-500',
    borderColor: 'border-amber-100',
    shadowColor: 'shadow-[0_2px_8px_rgba(251,191,36,0.08)]',

  },
  {
    id: 5,
    name: 'Operations',
    head: 'Nisha Agarwal',
    members: 8,
    progress: 20,
    color: 'bg-rose-400',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-500',
    borderColor: 'border-rose-100',
    shadowColor: 'shadow-[0_2px_8px_rgba(251,113,133,0.08)]',
  },
  {
    id: 6,
    name: 'Leadership',
    head: 'Rajeev Kumar',
    members: 3,
    progress: 8,
    color: 'bg-slate-400',
    bgColor: 'bg-slate-50',
    textColor: 'text-slate-500',
    borderColor: 'border-slate-100',
    shadowColor: 'shadow-[0_2px_8px_rgba(100,116,139,0.06)]',
  },
];

export const AdminDepartments: React.FC = () => {
  const handleViewMembers = (department: string) => {
    console.log(`View members: ${department}`);
  };

  return (
    <div className="w-full">

      {/* DEPARTMENT GRID */}
      <div
        className="
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {departments.map((department) => (
          <div
            key={department.id}
            className={`
              w-full
              min-h-[96px]
              rounded-xl
              border
              ${department.borderColor}
              bg-white
              px-5
              py-5
              ${department.shadowColor}
              transition-all
              duration-200
              hover:-translate-y-0.5
        `}
          >

            {/* TOP SECTION */}
            <div className="flex items-start justify-between gap-3">

              <div className="min-w-0">

                {/* DEPARTMENT NAME */}
                <h2
                  className="
                    text-[16px]
                    font-extrabold
                    leading-4
                    tracking-tight
                    text-slate-900
                  "
                >
                  {department.name}
                </h2>

                {/* HEAD */}
                <p
                  className="
                    mt-2
                    text-[12.5px]
                    font-medium
                    leading-3.5
                    text-slate-500
                  "
                >
                  Head: {department.head}
                </p>

              </div>

              {/* MEMBER COUNT */}
              <div
                className={`
                  flex
                  h-9.5
                  min-w-9.5
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  px-1.5
                  text-[13px]
                  font-extrabold
                  ${department.bgColor}
                  ${department.textColor}
                `}
              >
                {department.members}
              </div>

            </div>

            {/* PROGRESS BAR */}
            <div className="mt-4">

              <div
                className="
                  h-[4px]
                  w-full
                  overflow-hidden
                  rounded-full
                  bg-slate-100
                "
              >
                <div
                  className={`
                    h-full
                    rounded-full
                    ${department.color}
                  `}
                  style={{
                    width: `${department.progress}%`,
                  }}
                />
              </div>

            </div>

            {/* VIEW MEMBERS BUTTON */}
            <button
              type="button"
              onClick={() => handleViewMembers(department.name)}
              className={`
                mt-2
                flex
                h-8.5
                w-full
                items-center
                justify-center
                rounded-md
                border
                ${department.borderColor}
                ${department.bgColor}
                ${department.textColor}
                text-[12px]
                font-bold
                transition-all
                duration-200
                hover:brightness-95
              `}
            >
              View Members
            </button>

          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminDepartments;