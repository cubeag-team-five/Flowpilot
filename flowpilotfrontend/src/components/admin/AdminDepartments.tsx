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
}

const departments: Department[] = [
  {
    id: 1,
    name: 'Engineering',
    head: 'Karan Mehta',
    members: 18,
    progress: 40,
    color: 'bg-teal-400',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-500',
    borderColor: 'border-teal-100',
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
    borderColor: 'border-slate-200',
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
          gap-4
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {departments.map((department) => (
          <div
            key={department.id}
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-md
            "
          >
            {/* TOP SECTION */}
            <div className="flex items-start justify-between gap-4">

              <div className="min-w-0">

                {/* DEPARTMENT NAME */}
                <h2
                  className="
                    text-base
                    font-extrabold
                    leading-6
                    tracking-tight
                    text-slate-900
                  "
                >
                  {department.name}
                </h2>

                {/* HEAD */}
                <p
                  className="
                    mt-1
                    text-sm
                    font-medium
                    leading-5
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
                  h-8
                  min-w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  px-2.5
                  text-xs
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
                  h-[3px]
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
                mt-3
                flex
                h-9
                w-full
                items-center
                justify-center
                rounded-lg
                border
                ${department.borderColor}
                ${department.bgColor}
                ${department.textColor}
                text-xs
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