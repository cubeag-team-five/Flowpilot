import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  UserCheck,
  UserX,
  ShieldCheck,
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

  const [search, setSearch] = useState('');

  const [statusFilter, setStatusFilter] =
    useState<'All' | 'Active' | 'Inactive'>('All');

  const [openMenu, setOpenMenu] =
    useState<number | null>(null);

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      user.name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText) ||
      user.role.toLowerCase().includes(searchText) ||
      user.department.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === 'All' ||
      user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const activeUsers = users.filter(
    (user) => user.status === 'Active'
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === 'Inactive'
  ).length;

  const deleteUser = (id: number) => {
    setUsers((previous) =>
      previous.filter((user) => user.id !== id)
    );

    setOpenMenu(null);
  };

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

    setOpenMenu(null);
  };

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Users
          </h1>

          <p className="mt-1 text-sm font-medium text-slate-400">
            Manage users, roles and access permissions
          </p>
        </div>

        <button
          className="inline-flex items-center justify-center
          gap-2 rounded-xl bg-slate-900 px-4 py-2.5
          text-xs font-extrabold text-white
          transition hover:bg-slate-800"
        >
          <UserPlus size={16} />
          Add User
        </button>

      </div>

      {/* SUMMARY CARDS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* TOTAL USERS */}

        <div
          className="rounded-2xl border border-slate-200/80
          bg-white p-5 shadow-2xs"
        >

          <div className="mb-2 text-[11px] font-extrabold
          uppercase tracking-wider text-slate-400">
            TOTAL USERS
          </div>

          <div className="mb-2 text-3xl font-black
          leading-none text-slate-900">
            {users.length}
          </div>

          <div className="text-xs font-bold text-slate-500">
            Registered users
          </div>

        </div>

        {/* ACTIVE USERS */}

        <div
          className="rounded-2xl border border-slate-200/80
          bg-white p-5 shadow-2xs"
        >

          <div className="mb-2 text-[11px] font-extrabold
          uppercase tracking-wider text-slate-400">
            ACTIVE USERS
          </div>

          <div className="mb-2 text-3xl font-black
          leading-none text-slate-900">
            {activeUsers}
          </div>

          <div className="flex items-center gap-1.5
          text-xs font-bold text-emerald-500">

            <UserCheck size={13} />

            Currently active

          </div>

        </div>

        {/* INACTIVE USERS */}

        <div
          className="rounded-2xl border border-slate-200/80
          bg-white p-5 shadow-2xs"
        >

          <div className="mb-2 text-[11px] font-extrabold
          uppercase tracking-wider text-slate-400">
            INACTIVE USERS
          </div>

          <div className="mb-2 text-3xl font-black
          leading-none text-slate-900">
            {inactiveUsers}
          </div>

          <div className="flex items-center gap-1.5
          text-xs font-bold text-rose-500">

            <UserX size={13} />

            Requires attention

          </div>

        </div>

      </div>

      {/* USERS TABLE */}

      <div
        className="rounded-2xl border border-slate-200/80
        bg-white p-6 shadow-2xs"
      >

        {/* TABLE HEADER */}

        <div
          className="mb-5 flex flex-col gap-4
          lg:flex-row lg:items-center lg:justify-between"
        >

          <div>

            <h3 className="text-sm font-extrabold text-slate-900">
              All Users
            </h3>

            <p className="mt-1 text-[11px] font-medium text-slate-400">
              {filteredUsers.length} users found
            </p>

          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            {/* SEARCH */}

            <div className="relative">

              <Search
                size={15}
                className="absolute left-3 top-3 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search users..."
                className="w-full rounded-xl border
                border-slate-200 bg-white py-2.5 pl-9 pr-3
                text-xs font-semibold text-slate-700
                outline-none placeholder:text-slate-400
                focus:border-slate-400 sm:w-64"
              />

            </div>

            {/* STATUS */}

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value as
                    | 'All'
                    | 'Active'
                    | 'Inactive'
                )
              }
              className="rounded-xl border border-slate-200
              bg-white px-3 py-2.5 text-xs font-bold
              text-slate-600 outline-none
              focus:border-slate-400"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

          </div>

        </div>

        {/* DESKTOP TABLE */}

        <div className="hidden overflow-x-auto md:block">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-100">

                <th className="px-3 py-3 text-left text-[10px]
                font-extrabold uppercase tracking-wider
                text-slate-400">
                  User
                </th>

                <th className="px-3 py-3 text-left text-[10px]
                font-extrabold uppercase tracking-wider
                text-slate-400">
                  Role
                </th>

                <th className="px-3 py-3 text-left text-[10px]
                font-extrabold uppercase tracking-wider
                text-slate-400">
                  Department
                </th>

                <th className="px-3 py-3 text-left text-[10px]
                font-extrabold uppercase tracking-wider
                text-slate-400">
                  Status
                </th>

                <th className="px-3 py-3 text-left text-[10px]
                font-extrabold uppercase tracking-wider
                text-slate-400">
                  Last Active
                </th>

                <th className="px-3 py-3 text-right text-[10px]
                font-extrabold uppercase tracking-wider
                text-slate-400">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.map((user) => (

                <tr
                  key={user.id}
                  className="border-b border-slate-100
                  last:border-0 hover:bg-slate-50/60"
                >

                  {/* USER */}

                  <td className="px-3 py-4">

                    <div className="flex items-center gap-3">

                      <div
                        className="flex h-9 w-9 shrink-0
                        items-center justify-center
                        rounded-xl bg-slate-100
                        text-xs font-black text-slate-600"
                      >
                        {user.name
                          .split(' ')
                          .map((name) => name[0])
                          .join('')}
                      </div>

                      <div>

                        <div className="text-xs font-extrabold text-slate-800">
                          {user.name}
                        </div>

                        <div className="mt-0.5 text-[10px]
                        font-medium text-slate-400">
                          {user.email}
                        </div>

                      </div>

                    </div>

                  </td>

                  {/* ROLE */}

                  <td className="px-3 py-4">

                    <div className="inline-flex items-center gap-1.5">

                      <ShieldCheck
                        size={13}
                        className="text-slate-400"
                      />

                      <span className="text-xs font-bold text-slate-600">
                        {user.role}
                      </span>

                    </div>

                  </td>

                  {/* DEPARTMENT */}

                  <td className="px-3 py-4">

                    <span className="text-xs font-bold text-slate-600">
                      {user.department}
                    </span>

                  </td>

                  {/* STATUS */}

                  <td className="px-3 py-4">

                    <span
                      className={`inline-flex items-center
                      gap-1.5 rounded-full px-2.5 py-1
                      text-[10px] font-extrabold ${
                        user.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-rose-50 text-rose-500'
                      }`}
                    >

                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          user.status === 'Active'
                            ? 'bg-emerald-500'
                            : 'bg-rose-500'
                        }`}
                      />

                      {user.status}

                    </span>

                  </td>

                  {/* LAST ACTIVE */}

                  <td className="px-3 py-4">

                    <span className="text-xs font-medium text-slate-400">
                      {user.lastActive}
                    </span>

                  </td>

                  {/* ACTION */}

                  <td className="px-3 py-4 text-right">

                    <div className="relative inline-block">

                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === user.id
                              ? null
                              : user.id
                          )
                        }
                        className="rounded-lg p-1.5
                        text-slate-400 transition
                        hover:bg-slate-100
                        hover:text-slate-700"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {openMenu === user.id && (

                        <div
                          className="absolute right-0 top-9
                          z-20 w-40 rounded-xl border
                          border-slate-200 bg-white
                          py-1.5 text-left shadow-lg"
                        >

                          <button
                            onClick={() =>
                              setOpenMenu(null)
                            }
                            className="flex w-full items-center
                            gap-2 px-3 py-2 text-xs
                            font-bold text-slate-600
                            hover:bg-slate-50"
                          >
                            <Pencil size={13} />
                            Edit User
                          </button>

                          <button
                            onClick={() =>
                              toggleUserStatus(user.id)
                            }
                            className="flex w-full items-center
                            gap-2 px-3 py-2 text-xs
                            font-bold text-slate-600
                            hover:bg-slate-50"
                          >
                            {user.status === 'Active' ? (
                              <>
                                <UserX size={13} />
                                Disable User
                              </>
                            ) : (
                              <>
                                <UserCheck size={13} />
                                Enable User
                              </>
                            )}
                          </button>

                          <button
                            onClick={() =>
                              deleteUser(user.id)
                            }
                            className="flex w-full items-center
                            gap-2 px-3 py-2 text-xs
                            font-bold text-rose-500
                            hover:bg-rose-50"
                          >
                            <Trash2 size={13} />
                            Delete User
                          </button>

                        </div>

                      )}

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* MOBILE USER CARDS */}

        <div className="space-y-3 md:hidden">

          {filteredUsers.map((user) => (

            <div
              key={user.id}
              className="rounded-xl border border-slate-100
              p-4"
            >

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div
                    className="flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-xl bg-slate-100
                    text-xs font-black text-slate-600"
                  >
                    {user.name
                      .split(' ')
                      .map((name) => name[0])
                      .join('')}
                  </div>

                  <div>

                    <div className="text-xs font-extrabold text-slate-800">
                      {user.name}
                    </div>

                    <div className="mt-0.5 text-[10px]
                    font-medium text-slate-400">
                      {user.email}
                    </div>

                  </div>

                </div>

                <span
                  className={`rounded-full px-2 py-1
                  text-[9px] font-extrabold ${
                    user.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-rose-50 text-rose-500'
                  }`}
                >
                  {user.status}
                </span>

              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">

                <div>

                  <div className="text-[9px] font-extrabold
                  uppercase tracking-wider text-slate-400">
                    ROLE
                  </div>

                  <div className="mt-1 text-xs font-bold text-slate-600">
                    {user.role}
                  </div>

                </div>

                <div>

                  <div className="text-[9px] font-extrabold
                  uppercase tracking-wider text-slate-400">
                    DEPARTMENT
                  </div>

                  <div className="mt-1 text-xs font-bold text-slate-600">
                    {user.department}
                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* EMPTY STATE */}

        {filteredUsers.length === 0 && (

          <div className="py-12 text-center">

            <Users
              size={28}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 text-sm font-extrabold text-slate-600">
              No users found
            </p>

            <p className="mt-1 text-xs font-medium text-slate-400">
              Try changing your search or status filter.
            </p>

          </div>

        )}

      </div>

    </div>
  );
};