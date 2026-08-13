import React, { useMemo, useState } from 'react';
import {
  Search,
  Plus,
  SlidersHorizontal,
  MoreHorizontal,
  UserRound,
  Mail,
  Building2,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock3,
  X,
} from 'lucide-react';

type UserStatus = 'Active' | 'Inactive' | 'Pending';

interface User {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  status: UserStatus;
  lastActive: string;
  initials: string;
}

const initialUsers: User[] = [
  {
    id: 1,
    name: 'Aditya Kate',
    email: 'adityakate@flowpilot.com',
    department: 'Leadership',
    role: 'Super Admin',
    status: 'Active',
    lastActive: '2 min ago',
    initials: 'AK',
  },
  {
    id: 2,
    name: 'Nisha Agarwal',
    email: 'nisha.agarwal@flowpilot.com',
    department: 'Operations',
    role: 'Admin',
    status: 'Active',
    lastActive: '12 min ago',
    initials: 'NA',
  },
  {
    id: 3,
    name: 'Arjun Shah',
    email: 'arjun.shah@flowpilot.com',
    department: 'Product',
    role: 'Project Manager',
    status: 'Active',
    lastActive: '1 hour ago',
    initials: 'AS',
  },
  {
    id: 4,
    name: 'Aryan Kapoor',
    email: 'aryan.kapoor@flowpilot.com',
    department: 'Engineering',
    role: 'Scrum Master',
    status: 'Active',
    lastActive: '30 min ago',
    initials: 'AK',
  },
  {
    id: 5,
    name: 'Sneha Rao',
    email: 'sneha.rao@flowpilot.com',
    department: 'Engineering',
    role: 'Developer',
    status: 'Active',
    lastActive: '5 min ago',
    initials: 'SR',
  },
  {
    id: 6,
    name: 'Karan Mehta',
    email: 'karan.mehta@flowpilot.com',
    department: 'Engineering',
    role: 'Developer',
    status: 'Active',
    lastActive: '2 hours ago',
    initials: 'KM',
  },
  {
    id: 7,
    name: 'Divya Mehta',
    email: 'divya.mehta@flowpilot.com',
    department: 'Design',
    role: 'QA',
    status: 'Inactive',
    lastActive: 'Yesterday',
    initials: 'DM',
  },
  {
    id: 8,
    name: 'Rohan Verma',
    email: 'rohan.verma@flowpilot.com',
    department: 'Product',
    role: 'Viewer',
    status: 'Pending',
    lastActive: 'Not active',
    initials: 'RV',
  },
];

const avatarClasses = [
  'bg-emerald-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-indigo-500',
  'bg-violet-500',
  'bg-orange-500',
];

export const SuperAdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    department: 'Engineering',
    role: 'Developer',
  });

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        user.department.toLowerCase().includes(searchValue) ||
        user.role.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === 'All' || user.status === statusFilter;

      const matchesRole = roleFilter === 'All' || user.role === roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [users, search, statusFilter, roleFilter]);

  const activeUsers = users.filter((user) => user.status === 'Active').length;
  const inactiveUsers = users.filter(
    (user) => user.status === 'Inactive'
  ).length;
  const pendingUsers = users.filter(
    (user) => user.status === 'Pending'
  ).length;

  const handleAddUser = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newUser.name.trim() || !newUser.email.trim()) {
      return;
    }

    const initials = newUser.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const user: User = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      department: newUser.department,
      role: newUser.role,
      status: 'Pending',
      lastActive: 'Not active',
      initials,
    };

    setUsers((current) => [user, ...current]);

    setNewUser({
      name: '',
      email: '',
      department: 'Engineering',
      role: 'Developer',
    });

    setShowAddUser(false);
  };

  const changeStatus = (id: number, status: UserStatus) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === id ? { ...user, status } : user
      )
    );

    setOpenMenu(null);
  };

  const deleteUser = (id: number) => {
    setUsers((current) => current.filter((user) => user.id !== id));
    setOpenMenu(null);
  };

  const getStatusStyle = (status: UserStatus) => {
    if (status === 'Active') {
      return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    }

    if (status === 'Pending') {
      return 'bg-orange-50 text-orange-500 border-orange-100';
    }

    return 'bg-slate-100 text-slate-500 border-slate-200';
  };

  const getStatusIcon = (status: UserStatus) => {
    if (status === 'Active') {
      return <CheckCircle2 size={13} />;
    }

    if (status === 'Pending') {
      return <Clock3 size={13} />;
    }

    return <XCircle size={13} />;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white px-6 py-5 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              User Management
            </h1>

            <p className="mt-1 text-sm font-medium text-slate-400">
              Friday, 7 August 2026
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search users..."
                className="h-11 w-64 rounded-full border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-slate-300 focus:bg-white"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowAddUser(true)}
              className="flex h-11 items-center gap-2 rounded-xl bg-[#101827] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800"
            >
              <Plus size={17} />
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="px-6 py-6 lg:px-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Total Users
              </p>

              <div className="rounded-xl bg-slate-50 p-2.5 text-slate-500">
                <UserRound size={18} />
              </div>
            </div>

            <p className="mt-4 text-3xl font-extrabold text-slate-900">
              {users.length}
            </p>

            <p className="mt-1 text-xs font-semibold text-emerald-500">
              ↑ 3 this week
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Active Users
              </p>

              <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-500">
                <CheckCircle2 size={18} />
              </div>
            </div>

            <p className="mt-4 text-3xl font-extrabold text-slate-900">
              {activeUsers}
            </p>

            <p className="mt-1 text-xs font-semibold text-emerald-500">
              Currently active
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Pending
              </p>

              <div className="rounded-xl bg-orange-50 p-2.5 text-orange-500">
                <Clock3 size={18} />
              </div>
            </div>

            <p className="mt-4 text-3xl font-extrabold text-slate-900">
              {pendingUsers}
            </p>

            <p className="mt-1 text-xs font-semibold text-orange-500">
              Awaiting activation
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Inactive
              </p>

              <div className="rounded-xl bg-slate-100 p-2.5 text-slate-500">
                <XCircle size={18} />
              </div>
            </div>

            <p className="mt-4 text-3xl font-extrabold text-slate-900">
              {inactiveUsers}
            </p>

            <p className="mt-1 text-xs font-semibold text-slate-400">
              Currently inactive
            </p>
          </div>
        </div>

        {/* Table card */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          {/* Toolbar */}
          <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                All Users
              </h2>

              <p className="mt-1 text-xs font-medium text-slate-400">
                Manage users, roles and account access
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative sm:hidden">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search..."
                  className="h-10 w-44 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowFilters((value) => !value)}
                className={`flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-semibold transition ${
                  showFilters
                    ? 'border-slate-300 bg-slate-100 text-slate-900'
                    : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
                }`}
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="flex flex-wrap gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-4">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>

              <select
                value={roleFilter}
                onChange={(event) => setRoleFilter(event.target.value)}
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 outline-none"
              >
                <option value="All">All Roles</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Admin">Admin</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Scrum Master">Scrum Master</option>
                <option value="Developer">Developer</option>
                <option value="QA">QA</option>
                <option value="Viewer">Viewer</option>
              </select>

              <button
                type="button"
                onClick={() => {
                  setStatusFilter('All');
                  setRoleFilter('All');
                  setSearch('');
                }}
                className="h-10 rounded-lg px-3 text-sm font-semibold text-slate-400 hover:text-slate-700"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[850px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    User
                  </th>

                  <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Department
                  </th>

                  <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Role
                  </th>

                  <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Last Active
                  </th>

                  <th className="px-5 py-4 text-right text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white ${
                            avatarClasses[index % avatarClasses.length]
                          }`}
                        >
                          {user.initials}
                        </div>

                        <div>
                          <p className="text-sm font-bold text-slate-800">
                            {user.name}
                          </p>

                          <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-slate-400">
                            <Mail size={11} />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                        <Building2 size={15} className="text-slate-400" />
                        {user.department}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <ShieldCheck
                          size={15}
                          className="text-slate-400"
                        />

                        <span className="text-sm font-semibold text-slate-600">
                          {user.role}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${getStatusStyle(
                          user.status
                        )}`}
                      >
                        {getStatusIcon(user.status)}
                        {user.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-400">
                      {user.lastActive}
                    </td>

                    <td className="relative px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === user.id ? null : user.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {openMenu === user.id && (
                        <div className="absolute right-5 top-12 z-20 w-40 rounded-xl border border-slate-200 bg-white p-1.5 text-left shadow-xl">
                          <button
                            type="button"
                            onClick={() =>
                              changeStatus(
                                user.id,
                                user.status === 'Active'
                                  ? 'Inactive'
                                  : 'Active'
                              )
                            }
                            className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-600 hover:bg-slate-50"
                          >
                            {user.status === 'Active'
                              ? 'Deactivate'
                              : 'Activate'}
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteUser(user.id)}
                            className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-red-500 hover:bg-red-50"
                          >
                            Delete User
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="divide-y divide-slate-100 md:hidden">
            {filteredUsers.map((user, index) => (
              <div key={user.id} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white ${
                        avatarClasses[index % avatarClasses.length]
                      }`}
                    >
                      {user.initials}
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {user.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenu(
                        openMenu === user.id ? null : user.id
                      )
                    }
                    className="rounded-lg p-2 text-slate-400"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-500">
                    {user.department}
                  </span>

                  <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-500">
                    {user.role}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold ${getStatusStyle(
                      user.status
                    )}`}
                  >
                    {getStatusIcon(user.status)}
                    {user.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="px-5 py-16 text-center">
              <UserRound
                size={30}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 text-sm font-bold text-slate-600">
                No users found
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Try changing your search or filters.
              </p>
            </div>
          )}

          <div className="border-t border-slate-100 px-5 py-4">
            <p className="text-xs font-medium text-slate-400">
              Showing{' '}
              <span className="font-bold text-slate-600">
                {filteredUsers.length}
              </span>{' '}
              of{' '}
              <span className="font-bold text-slate-600">
                {users.length}
              </span>{' '}
              users
            </p>
          </div>
        </section>
      </main>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  Add New User
                </h2>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  Create a new Flowpilot user account
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddUser(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-600">
                    Full Name
                  </label>

                  <input
                    value={newUser.name}
                    onChange={(event) =>
                      setNewUser({
                        ...newUser,
                        name: event.target.value,
                      })
                    }
                    placeholder="Enter full name"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-slate-300 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-600">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(event) =>
                      setNewUser({
                        ...newUser,
                        email: event.target.value,
                      })
                    }
                    placeholder="name@flowpilot.com"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-slate-300 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-600">
                      Department
                    </label>

                    <select
                      value={newUser.department}
                      onChange={(event) =>
                        setNewUser({
                          ...newUser,
                          department: event.target.value,
                        })
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none"
                    >
                      <option>Engineering</option>
                      <option>Product</option>
                      <option>Design</option>
                      <option>Operations</option>
                      <option>Quality Assurance</option>
                      <option>Leadership</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-600">
                      Role
                    </label>

                    <select
                      value={newUser.role}
                      onChange={(event) =>
                        setNewUser({
                          ...newUser,
                          role: event.target.value,
                        })
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none"
                    >
                      <option>Developer</option>
                      <option>Admin</option>
                      <option>Project Manager</option>
                      <option>Scrum Master</option>
                      <option>QA</option>
                      <option>Viewer</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#101827] px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminUsers;