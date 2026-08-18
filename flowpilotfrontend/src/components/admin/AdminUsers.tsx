import React, { useState } from 'react';
import {
  Users,
  Pencil,
  UserCheck,
  UserX,
  AlertTriangle,
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive';
  lastActive: string;
}

const initialUsers: User[] = [
  {
    id: 1,
    name: 'Rohit Varma',
    email: 'rohit.varma@ipmt.com',
    role: 'Business Analyst',
    department: 'Engineering',
    status: 'Active',
    lastActive: '2 hours ago',
  },
  {
    id: 2,
    name: 'Divya Mehta',
    email: 'divya.mehta@ipmt.com',
    role: 'Developer',
    department: 'Engineering',
    status: 'Inactive',
    lastActive: '30 days ago',
  },
  {
    id: 3,
    name: 'Vikram Jain',
    email: 'vikram.jain@ipmt.com',
    role: 'Project Manager',
    department: 'Project Management',
    status: 'Active',
    lastActive: '1 hour ago',
  },
  {
    id: 4,
    name: 'Priya Shah',
    email: 'priya.shah@ipmt.com',
    role: 'QA Engineer',
    department: 'Quality Assurance',
    status: 'Active',
    lastActive: '3 hours ago',
  },
  {
    id: 5,
    name: 'Karan Joshi',
    email: 'karan.joshi@ipmt.com',
    role: 'DevOps Engineer',
    department: 'DevOps',
    status: 'Active',
    lastActive: '5 hours ago',
  },
  {
    id: 6,
    name: 'Sneha Patil',
    email: 'sneha.patil@ipmt.com',
    role: 'HR Manager',
    department: 'Human Resources',
    status: 'Active',
    lastActive: 'Yesterday',
  },
  {
    id: 7,
    name: 'Amit Kulkarni',
    email: 'amit.kulkarni@ipmt.com',
    role: 'Finance Executive',
    department: 'Finance',
    status: 'Active',
    lastActive: 'Yesterday',
  },
  {
    id: 8,
    name: 'Nisha Agarwal',
    email: 'nisha.agarwal@ipmt.com',
    role: 'Developer',
    department: 'Engineering',
    status: 'Inactive',
    lastActive: '12 days ago',
  },
];

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const [_search] = useState('');

  const [_statusFilter] =
    useState<'All' | 'Active' | 'Inactive'>('All');

  const filteredUsers = users.filter((user) => {
    const searchText = _search.toLowerCase();

    const matchesSearch =
      user.name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText) ||
      user.role.toLowerCase().includes(searchText) ||
      user.department.toLowerCase().includes(searchText);

    const matchesStatus =
      _statusFilter === 'All' ||
      user.status === _statusFilter;

    return matchesSearch && matchesStatus;
  });

  const toggleUserStatus = (id: number) => {
    setUsers((previous) =>
      previous.map((user) =>
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
    <div className="space-y-2 pb-2">


      {/* ADMIN WARNING */}

      <div
        className="
        -mt-1
        flex items-start gap-2.5
        rounded-lg
        border border-amber-200
        bg-amber-50
        px-3 py-2
        text-[11px] sm:text-[12px]
        font-medium
        text-amber-700
        "
      >
        <AlertTriangle
          size={14}
          className="mt-0.5 shrink-0 text-amber-600"
        />

        <span>
          Admin can edit or disable users. Permanent deletion requires
          Super Admin access.
        </span>
      </div>


      {/* USERS TABLE CARD */}

      <div
        className="
        overflow-hidden
        rounded-xl
        border border-slate-200/80
        bg-white
        shadow-[0_4px_18px_rgba(15,23,42,0.05)]
        "
      >


        {/* DESKTOP TABLE */}

        <div className="hidden overflow-x-auto md:block">

          <table className="w-full min-w-[800px]">

            {/* TABLE HEADER */}

            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/40">

                <th className="px-3 py-2.5 text-left text-[12px] font-extrabold uppercase tracking-[0.05em] text-slate-500">
                  Employee ID
                </th>

                <th className="px-3 py-2.5 text-left text-[12px] font-extrabold uppercase tracking-[0.05em] text-slate-500">
                  Name
                </th>

                <th className="px-3 py-2.5 text-left text-[12px] font-extrabold uppercase tracking-[0.05em] text-slate-500">
                  Email
                </th>

                <th className="px-3 py-2.5 text-left text-[12px] font-extrabold uppercase tracking-[0.05em] text-slate-500">
                  Role
                </th>

                <th className="px-3 py-2.5 text-left text-[12px] font-extrabold uppercase tracking-[0.05em] text-slate-500">
                  Department
                </th>

                <th className="px-3 py-2.5 text-left text-[12px] font-extrabold uppercase tracking-[0.05em] text-slate-500">
                  Status
                </th>

                <th className="px-3 py-2.5 text-left text-[12px] font-extrabold uppercase tracking-[0.05em] text-slate-500">
                  Actions
                </th>

              </tr>
            </thead>


            {/* TABLE BODY */}

            <tbody>

              {filteredUsers.map((user) => {

                const employeeId = `EMP-${String(
                  user.id + 2
                ).padStart(3, '0')}`;

                return (
                  <tr
                    key={user.id}
                    className="
                      border-b border-slate-100
                      last:border-0
                      hover:bg-slate-50/50
                      transition-colors
                    "
                  >

                    {/* EMPLOYEE ID */}

                    <td className="px-3 py-2.5">
                      <span className="text-[13px] font-medium text-slate-600">
                        {employeeId}
                      </span>
                    </td>


                    {/* NAME */}

                    <td className="px-3 py-2.5">
                      <span className="text-[13px] font-bold text-slate-900">
                        {user.name}
                      </span>
                    </td>


                    {/* EMAIL */}

                    <td className="px-3 py-2.5">
                      <span className="text-[13px] font-medium text-slate-600">
                        {user.email}
                      </span>
                    </td>


                    {/* ROLE */}

                    <td className="px-3 py-2.5">
                      <span
                        className="
                        inline-flex
                        rounded-md
                        bg-slate-100
                        px-2
                        py-1
                        text-[13px]
                        font-semibold
                        text-slate-700
                        whitespace-nowrap
                        "
                      >
                        {user.role}
                      </span>
                    </td>


                    {/* DEPARTMENT */}

                    <td className="px-3 py-2.5">
                      <span className="text-[13px] font-medium text-slate-700">
                        {user.department}
                      </span>
                    </td>


                    {/* STATUS */}

                    <td className="px-3 py-2.5">
                   
                      <span
                        className={`
                          inline-flex
                          items-center
                          rounded-md
                          px-2
                          py-1
                          text-[13px]
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

                    <td className="px-3 py-2.5">

                      <div className="flex items-center gap-1.5">

                        {/* EDIT */}

                        <button
                          onClick={() => {
                            // Existing edit behavior is preserved.
                            // Add edit functionality here when required.
                          }}
                          className="
                            inline-flex
                            items-center
                            gap-1
                            rounded-md
                            border border-amber-200
                            bg-amber-50
                            px-2.5 py-1.5
                            text-[12px]
                            font-bold
                            text-amber-700
                            transition
                            hover:bg-amber-100
                          "
                        >
                          <Pencil size={11} />
                          Edit
                        </button>


                        {/* ENABLE / DISABLE */}

                        <button
                          onClick={() =>
                            toggleUserStatus(user.id)
                          }
                          className="
                            inline-flex
                            items-center
                            gap-1
                            rounded-md
                            border border-slate-200
                            bg-slate-50
                            px-2.5 py-1.5
                            text-[12px]
                            font-bold
                            text-slate-600
                            transition
                            hover:bg-slate-100
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
                );
              })}

            </tbody>

          </table>

        </div>


        {/* MOBILE USER CARDS */}

        <div className="space-y-3 p-3 md:hidden">

          {filteredUsers.map((user) => {

            const employeeId = `EMP-${String(
              user.id + 2
            ).padStart(3, '0')}`;

            return (
              <div
                key={user.id}
                className="
                  rounded-lg
                  border border-slate-200
                  p-4
                "
              >

                {/* NAME + STATUS */}

                <div className="flex items-start justify-between gap-3">

                  <div>
                    <div className="text-[13px] font-bold text-slate-900">
                      {user.name}
                    </div>

                    <div className="mt-1 text-[11px] font-medium text-slate-500">
                      {user.email}
                    </div>
                  </div>

                  <span
                    className={`
                      shrink-0
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


                {/* DETAILS */}

                <div className="mt-4 grid grid-cols-2 gap-3">

                  <div>
                    <div className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">
                      Employee ID
                    </div>

                    <div className="mt-1 text-[11px] font-medium text-slate-700">
                      {employeeId}
                    </div>
                  </div>


                  <div>
                    <div className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">
                      Role
                    </div>

                    <div className="mt-1 text-[11px] font-semibold text-slate-700">
                      {user.role}
                    </div>
                  </div>


                  <div>
                    <div className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">
                      Department
                    </div>

                    <div className="mt-1 text-[11px] font-semibold text-slate-700">
                      {user.department}
                    </div>
                  </div>


                  <div>
                    <div className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">
                      Last Active
                    </div>

                    <div className="mt-1 text-[11px] font-medium text-slate-500">
                      {user.lastActive}
                    </div>
                  </div>

                </div>


                {/* MOBILE ACTIONS */}

                <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3">

                  <button
                    onClick={() => {}}
                    className="
                      inline-flex
                      items-center
                      gap-1
                      rounded-md
                      border border-amber-200
                      bg-amber-50
                      px-3 py-1.5
                      text-[10px]
                      font-bold
                      text-amber-700
                    "
                  >
                    <Pencil size={11} />
                    Edit
                  </button>


                  <button
                    onClick={() =>
                      toggleUserStatus(user.id)
                    }
                    className="
                      inline-flex
                      items-center
                      gap-1
                      rounded-md
                      border border-slate-200
                      bg-slate-50
                      px-3 py-1.5
                      text-[10px]
                      font-bold
                      text-slate-600
                    "
                  >
                    {user.status === 'Active' ? (
                      <>
                        <UserX size={11} />
                        Disable
                      </>
                    ) : (
                      <>
                        <UserCheck size={11} />
                        Enable
                      </>
                    )}
                  </button>

                </div>

              </div>
            );
          })}

        </div>


        {/* EMPTY STATE */}

        {filteredUsers.length === 0 && (
          <div className="py-12 text-center">

            <Users
              size={30}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 text-[14px] font-bold text-slate-600">
              No users found
            </p>

            <p className="mt-1 text-[12px] font-medium text-slate-400">
              Try changing your search or status filter.
            </p>

          </div>
        )}

      </div>

    </div>
  );
};