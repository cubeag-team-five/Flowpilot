import React, { useState } from 'react';
import {
  AlertTriangle,
  Pencil,
  UserCheck,
  UserX,
} from 'lucide-react';

interface User {
  id: number;
  employeeId: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive';
}

const initialUsers: User[] = [
  {
    id: 1,
    employeeId: 'EMP-003',
    name: 'Arjun Shah',
    email: 'a.shah@ipmt.com',
    role: 'Project Manager',
    department: 'Product',
    status: 'Active',
  },
  {
    id: 2,
    employeeId: 'EMP-004',
    name: 'Aryan Kapoor',
    email: 'a.kapoor@ipmt.com',
    role: 'Scrum Master',
    department: 'Engineering',
    status: 'Active',
  },
  {
    id: 3,
    employeeId: 'EMP-005',
    name: 'Sneha Rao',
    email: 's.rao@ipmt.com',
    role: 'Developer',
    department: 'Engineering',
    status: 'Active',
  },
  {
    id: 4,
    employeeId: 'EMP-006',
    name: 'Mihir Khatri',
    email: 'm.khatri@ipmt.com',
    role: 'Developer',
    department: 'Engineering',
    status: 'Active',
  },
  {
    id: 5,
    employeeId: 'EMP-007',
    name: 'Priya Rajan',
    email: 'p.rajan@ipmt.com',
    role: 'QA Engineer',
    department: 'Quality',
    status: 'Active',
  },
  {
    id: 6,
    employeeId: 'EMP-008',
    name: 'Vikram Jain',
    email: 'v.jain@ipmt.com',
    role: 'Viewer',
    department: 'Management',
    status: 'Active',
  },
  {
    id: 7,
    employeeId: 'EMP-009',
    name: 'Divya Mehta',
    email: 'd.mehta@ipmt.com',
    role: 'Developer',
    department: 'Design',
    status: 'Inactive',
  },
  {
    id: 8,
    employeeId: 'EMP-010',
    name: 'Rohit Varma',
    email: 'r.varma@ipmt.com',
    role: 'Business Analyst',
    department: 'Product',
    status: 'Active',
  },
];

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const toggleUserStatus = (id: number) => {
    setUsers((previousUsers) =>
      previousUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === 'Active'
                  ? 'Inactive'
                  : 'Active',
            }
          : user
      )
    );
  };

  return (
    <div
      className="w-full font-sans"
      style={{
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* =====================================================
          WARNING MESSAGE
      ====================================================== */}

      <div
        className="
          mb-3
          flex
          items-center
          gap-2
          rounded-lg
          border
          border-amber-200
          bg-amber-50
          px-4
          py-2.5
          text-[12px]
          font-medium
          text-amber-700
        "
      >
        <AlertTriangle
          size={14}
          className="shrink-0 text-amber-500"
        />

        <span>
          Admin can edit or disable users. Permanent deletion
          requires Super Admin access.
        </span>
      </div>

      {/* =====================================================
          DESKTOP TABLE
      ====================================================== */}

      <div
        className="
          hidden
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-[0_2px_8px_rgba(15,23,42,0.04)]
          md:block
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] border-collapse">

            {/* HEADER */}

            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/40">

                <th
                  className="
                    w-[12%]
                    px-3.5
                    py-3
                    text-left
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-slate-400
                  "
                >
                  Employee ID
                </th>

                <th
                  className="
                    w-[14%]
                    px-3.5
                    py-3
                    text-left
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-slate-400
                  "
                >
                  Name
                </th>

                <th
                  className="
                    w-[17%]
                    px-3.5
                    py-3
                    text-left
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-slate-400
                  "
                >
                  Email
                </th>

                <th
                  className="
                    w-[16%]
                    px-3.5
                    py-3
                    text-left
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-slate-400
                  "
                >
                  Role
                </th>

                <th
                  className="
                    w-[14%]
                    px-3.5
                    py-3
                    text-left
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-slate-400
                  "
                >
                  Department
                </th>

                <th
                  className="
                    w-[10%]
                    px-3.5
                    py-3
                    text-left
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-slate-400
                  "
                >
                  Status
                </th>

                <th
                  className="
                    w-[17%]
                    px-3.5
                    py-3
                    text-left
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-slate-400
                  "
                >
                  Actions
                </th>

              </tr>
            </thead>

            {/* BODY */}

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="
                    border-b
                    border-slate-100
                    last:border-b-0
                    transition-colors
                    hover:bg-slate-50/40
                  "
                >

                  {/* EMPLOYEE ID */}

                  <td className="px-3.5 py-3.5">
                    <span
                      className="
                        font-mono
                        text-[11px]
                        font-medium
                        text-slate-400
                      "
                    >
                      {user.employeeId}
                    </span>
                  </td>

                  {/* NAME */}

                  <td className="px-3.5 py-3.5">
                    <span
                      className="
                        text-[13px]
                        font-bold
                        text-slate-900
                      "
                    >
                      {user.name}
                    </span>
                  </td>

                  {/* EMAIL */}

                  <td className="px-3.5 py-3.5">
                    <span
                      className="
                        text-[12px]
                        font-medium
                        text-slate-500
                      "
                    >
                      {user.email}
                    </span>
                  </td>

                  {/* ROLE */}

                  <td className="px-3.5 py-3.5">
                    <span
                      className="
                        inline-flex
                        rounded-md
                        bg-slate-100
                        px-2
                        py-1
                        text-[11px]
                        font-semibold
                        text-slate-600
                      "
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* DEPARTMENT */}

                  <td className="px-3.5 py-3.5">
                    <span
                      className="
                        text-[12px]
                        font-medium
                        text-slate-600
                      "
                    >
                      {user.department}
                    </span>
                  </td>

                  {/* STATUS */}

                  <td className="px-3.5 py-3.5">
                    <span
                      className={`
                        inline-flex
                        items-center
                        rounded-md
                        px-2
                        py-1
                        text-[11px]
                        font-bold
                        ${
                          user.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-slate-100 text-slate-500'
                        }
                      `}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* ACTIONS */}

                  <td className="px-3.5 py-3.5">
                    <div className="flex items-center gap-2">

                      {/* EDIT */}

                      <button
                        type="button"
                        onClick={() =>
                          alert(`Edit ${user.name}`)
                        }
                        className="
                          inline-flex
                          h-8
                          items-center
                          gap-1.5
                          rounded-md
                          border
                          border-amber-200
                          bg-amber-50
                          px-2.5
                          text-[11px]
                          font-semibold
                          text-amber-700
                          transition
                          hover:bg-amber-100
                        "
                      >
                        <Pencil size={12} />
                        Edit
                      </button>

                      {/* DISABLE / ENABLE */}

                      <button
                        type="button"
                        onClick={() =>
                          toggleUserStatus(user.id)
                        }
                        className="
                          inline-flex
                          h-8
                          items-center
                          gap-1.5
                          rounded-md
                          border
                          border-slate-200
                          bg-slate-50
                          px-2.5
                          text-[11px]
                          font-semibold
                          text-slate-500
                          transition
                          hover:bg-slate-100
                          hover:text-slate-700
                        "
                      >
                        {user.status === 'Active' ? (
                          <>
                            <UserX size={12} />
                            Disable
                          </>
                        ) : (
                          <>
                            <UserCheck size={12} />
                            Enable
                          </>
                        )}
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* =====================================================
          MOBILE VIEW
      ====================================================== */}

      <div className="space-y-3 md:hidden">

        {users.map((user) => (
          <div
            key={user.id}
            className="
              rounded-xl
              border
              border-slate-200
              bg-white
              p-4
              shadow-[0_2px_6px_rgba(15,23,42,0.04)]
            "
          >

            {/* NAME + STATUS */}

            <div className="flex items-start justify-between gap-3">

              <div>
                <div
                  className="
                    text-[14px]
                    font-bold
                    text-slate-900
                  "
                >
                  {user.name}
                </div>

                <div
                  className="
                    mt-1
                    font-mono
                    text-[10px]
                    text-slate-400
                  "
                >
                  {user.employeeId}
                </div>
              </div>

              <span
                className={`
                  rounded-md
                  px-2
                  py-1
                  text-[10px]
                  font-bold
                  ${
                    user.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-slate-100 text-slate-500'
                  }
                `}
              >
                {user.status}
              </span>

            </div>

            {/* EMAIL */}

            <div className="mt-4">

              <div
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >
                Email
              </div>

              <div
                className="
                  mt-1
                  break-all
                  text-[12px]
                  font-medium
                  text-slate-600
                "
              >
                {user.email}
              </div>

            </div>

            {/* ROLE + DEPARTMENT */}

            <div className="mt-4 grid grid-cols-2 gap-4">

              <div>
                <div
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-slate-400
                  "
                >
                  Role
                </div>

                <div
                  className="
                    mt-1
                    text-[12px]
                    font-semibold
                    text-slate-700
                  "
                >
                  {user.role}
                </div>
              </div>

              <div>
                <div
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-slate-400
                  "
                >
                  Department
                </div>

                <div
                  className="
                    mt-1
                    text-[12px]
                    font-semibold
                    text-slate-700
                  "
                >
                  {user.department}
                </div>
              </div>

            </div>

            {/* ACTIONS */}

            <div
              className="
                mt-4
                flex
                gap-2
                border-t
                border-slate-100
                pt-3
              "
            >

              <button
                type="button"
                onClick={() =>
                  alert(`Edit ${user.name}`)
                }
                className="
                  flex-1
                  inline-flex
                  items-center
                  justify-center
                  gap-1.5
                  rounded-md
                  border
                  border-amber-200
                  bg-amber-50
                  px-3
                  py-2
                  text-[11px]
                  font-semibold
                  text-amber-700
                "
              >
                <Pencil size={12} />
                Edit
              </button>

              <button
                type="button"
                onClick={() =>
                  toggleUserStatus(user.id)
                }
                className="
                  flex-1
                  inline-flex
                  items-center
                  justify-center
                  gap-1.5
                  rounded-md
                  border
                  border-slate-200
                  bg-slate-50
                  px-3
                  py-2
                  text-[11px]
                  font-semibold
                  text-slate-600
                "
              >
                {user.status === 'Active' ? (
                  <>
                    <UserX size={12} />
                    Disable
                  </>
                ) : (
                  <>
                    <UserCheck size={12} />
                    Enable
                  </>
                )}
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default AdminUsers;