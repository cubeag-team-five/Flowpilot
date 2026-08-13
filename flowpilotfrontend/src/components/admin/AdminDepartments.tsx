import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  Users,
  FolderKanban,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface Department {
  id: number;
  name: string;
  code: string;
  manager: string;
  users: number;
  projects: number;
  status: 'Operational' | 'Inactive';
}

const initialDepartments: Department[] = [
  {
    id: 1,
    name: 'Engineering',
    code: 'ENG',
    manager: 'Vikram Jain',
    users: 18,
    projects: 8,
    status: 'Operational',
  },
  {
    id: 2,
    name: 'Quality Assurance',
    code: 'QA',
    manager: 'Priya Shah',
    users: 7,
    projects: 4,
    status: 'Operational',
  },
  {
    id: 3,
    name: 'Project Management',
    code: 'PM',
    manager: 'Rohit Varma',
    users: 4,
    projects: 6,
    status: 'Operational',
  },
  {
    id: 4,
    name: 'Human Resources',
    code: 'HR',
    manager: 'Sneha Patil',
    users: 6,
    projects: 2,
    status: 'Operational',
  },
  {
    id: 5,
    name: 'Finance',
    code: 'FIN',
    manager: 'Amit Kulkarni',
    users: 5,
    projects: 3,
    status: 'Operational',
  },
  {
    id: 6,
    name: 'DevOps',
    code: 'DEV',
    manager: 'Karan Joshi',
    users: 6,
    projects: 5,
    status: 'Operational',
  },
];

export const AdminDepartments: React.FC = () => {
  const [departments, setDepartments] =
    useState<Department[]>(initialDepartments);

  const [search, setSearch] = useState('');

  const [statusFilter, setStatusFilter] =
    useState<'All' | 'Operational' | 'Inactive'>('All');

  const [openMenu, setOpenMenu] =
    useState<number | null>(null);

  const filteredDepartments = departments.filter(
    (department) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        department.name
          .toLowerCase()
          .includes(searchText) ||
        department.code
          .toLowerCase()
          .includes(searchText) ||
        department.manager
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === 'All' ||
        department.status === statusFilter;

      return matchesSearch && matchesStatus;
    }
  );

  const operationalDepartments =
    departments.filter(
      (department) =>
        department.status === 'Operational'
    ).length;

  const totalUsers = departments.reduce(
    (total, department) =>
      total + department.users,
    0
  );

  const totalProjects = departments.reduce(
    (total, department) =>
      total + department.projects,
    0
  );

  const toggleDepartmentStatus = (id: number) => {
    setDepartments((previous) =>
      previous.map((department) =>
        department.id === id
          ? {
              ...department,
              status:
                department.status === 'Operational'
                  ? 'Inactive'
                  : 'Operational',
            }
          : department
      )
    );

    setOpenMenu(null);
  };

  const deleteDepartment = (id: number) => {
    setDepartments((previous) =>
      previous.filter(
        (department) => department.id !== id
      )
    );

    setOpenMenu(null);
  };

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}

      <div
        className="flex flex-col gap-4
        sm:flex-row sm:items-center sm:justify-between"
      >

        <div>

          <h1 className="text-2xl font-black text-slate-900">
            Departments
          </h1>

          <p className="mt-1 text-sm font-medium text-slate-400">
            Manage departments and their organizational structure
          </p>

        </div>

        <button
          className="inline-flex items-center
          justify-center gap-2 rounded-xl
          bg-slate-900 px-4 py-2.5
          text-xs font-extrabold text-white
          transition hover:bg-slate-800"
        >
          <Plus size={16} />
          Add Department
        </button>

      </div>

      {/* SUMMARY CARDS */}

      <div
        className="grid grid-cols-1 gap-4
        sm:grid-cols-3"
      >

        {/* DEPARTMENTS */}

        <div
          className="rounded-2xl border
          border-slate-200/80 bg-white p-5
          shadow-2xs"
        >

          <div
            className="mb-2 text-[11px]
            font-extrabold uppercase
            tracking-wider text-slate-400"
          >
            TOTAL DEPARTMENTS
          </div>

          <div
            className="mb-2 text-3xl
            font-black leading-none text-slate-900"
          >
            {departments.length}
          </div>

          <div className="text-xs font-bold text-slate-500">
            Organization units
          </div>

        </div>

        {/* USERS */}

        <div
          className="rounded-2xl border
          border-slate-200/80 bg-white p-5
          shadow-2xs"
        >

          <div
            className="mb-2 text-[11px]
            font-extrabold uppercase
            tracking-wider text-slate-400"
          >
            TOTAL USERS
          </div>

          <div
            className="mb-2 text-3xl
            font-black leading-none text-slate-900"
          >
            {totalUsers}
          </div>

          <div
            className="flex items-center gap-1.5
            text-xs font-bold text-cyan-500"
          >
            <Users size={13} />
            Across all departments
          </div>

        </div>

        {/* PROJECTS */}

        <div
          className="rounded-2xl border
          border-slate-200/80 bg-white p-5
          shadow-2xs"
        >

          <div
            className="mb-2 text-[11px]
            font-extrabold uppercase
            tracking-wider text-slate-400"
          >
            TOTAL PROJECTS
          </div>

          <div
            className="mb-2 text-3xl
            font-black leading-none text-slate-900"
          >
            {totalProjects}
          </div>

          <div
            className="flex items-center gap-1.5
            text-xs font-bold text-purple-500"
          >
            <FolderKanban size={13} />
            Assigned to departments
          </div>

        </div>

      </div>

      {/* DEPARTMENT LIST */}

      <div
        className="rounded-2xl border
        border-slate-200/80 bg-white
        p-6 shadow-2xs"
      >

        {/* LIST HEADER */}

        <div
          className="mb-5 flex flex-col gap-4
          lg:flex-row lg:items-center
          lg:justify-between"
        >

          <div>

            <h3 className="text-sm font-extrabold text-slate-900">
              All Departments
            </h3>

            <p className="mt-1 text-[11px]
            font-medium text-slate-400">
              {filteredDepartments.length} departments found
            </p>

          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            {/* SEARCH */}

            <div className="relative">

              <Search
                size={15}
                className="absolute left-3 top-3
                text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search departments..."
                className="w-full rounded-xl
                border border-slate-200
                bg-white py-2.5 pl-9 pr-3
                text-xs font-semibold
                text-slate-700 outline-none
                placeholder:text-slate-400
                focus:border-slate-400
                sm:w-64"
              />

            </div>

            {/* STATUS FILTER */}

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value as
                    | 'All'
                    | 'Operational'
                    | 'Inactive'
                )
              }
              className="rounded-xl border
              border-slate-200 bg-white
              px-3 py-2.5 text-xs
              font-bold text-slate-600
              outline-none focus:border-slate-400"
            >
              <option value="All">
                All Status
              </option>

              <option value="Operational">
                Operational
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>

          </div>

        </div>

        {/* DESKTOP TABLE */}

        <div className="hidden overflow-x-auto md:block">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-100">

                <th
                  className="px-3 py-3 text-left
                  text-[10px] font-extrabold
                  uppercase tracking-wider
                  text-slate-400"
                >
                  Department
                </th>

                <th
                  className="px-3 py-3 text-left
                  text-[10px] font-extrabold
                  uppercase tracking-wider
                  text-slate-400"
                >
                  Manager
                </th>

                <th
                  className="px-3 py-3 text-left
                  text-[10px] font-extrabold
                  uppercase tracking-wider
                  text-slate-400"
                >
                  Users
                </th>

                <th
                  className="px-3 py-3 text-left
                  text-[10px] font-extrabold
                  uppercase tracking-wider
                  text-slate-400"
                >
                  Projects
                </th>

                <th
                  className="px-3 py-3 text-left
                  text-[10px] font-extrabold
                  uppercase tracking-wider
                  text-slate-400"
                >
                  Status
                </th>

                <th
                  className="px-3 py-3 text-right
                  text-[10px] font-extrabold
                  uppercase tracking-wider
                  text-slate-400"
                >
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredDepartments.map(
                (department) => (

                  <tr
                    key={department.id}
                    className="border-b
                    border-slate-100
                    last:border-0
                    hover:bg-slate-50/60"
                  >

                    {/* DEPARTMENT */}

                    <td className="px-3 py-4">

                      <div className="flex items-center gap-3">

                        <div
                          className="flex h-10 w-10
                          shrink-0 items-center
                          justify-center rounded-xl
                          bg-slate-100"
                        >
                          <Building2
                            size={17}
                            className="text-slate-600"
                          />
                        </div>

                        <div>

                          <div
                            className="text-xs
                            font-extrabold
                            text-slate-800"
                          >
                            {department.name}
                          </div>

                          <div
                            className="mt-0.5
                            text-[10px]
                            font-bold
                            text-slate-400"
                          >
                            {department.code}
                          </div>

                        </div>

                      </div>

                    </td>

                    {/* MANAGER */}

                    <td className="px-3 py-4">

                      <span
                        className="text-xs
                        font-bold text-slate-600"
                      >
                        {department.manager}
                      </span>

                    </td>

                    {/* USERS */}

                    <td className="px-3 py-4">

                      <div
                        className="flex items-center
                        gap-1.5 text-xs
                        font-bold text-slate-600"
                      >
                        <Users
                          size={13}
                          className="text-slate-400"
                        />

                        {department.users}
                      </div>

                    </td>

                    {/* PROJECTS */}

                    <td className="px-3 py-4">

                      <div
                        className="flex items-center
                        gap-1.5 text-xs
                        font-bold text-slate-600"
                      >
                        <FolderKanban
                          size={13}
                          className="text-slate-400"
                        />

                        {department.projects}
                      </div>

                    </td>

                    {/* STATUS */}

                    <td className="px-3 py-4">

                      <span
                        className={`inline-flex
                        items-center gap-1.5
                        rounded-full px-2.5 py-1
                        text-[10px] font-extrabold
                        ${
                          department.status ===
                          'Operational'
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-rose-50 text-rose-500'
                        }`}
                      >

                        {department.status ===
                        'Operational' ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <XCircle size={12} />
                        )}

                        {department.status}

                      </span>

                    </td>

                    {/* ACTION */}

                    <td className="px-3 py-4 text-right">

                      <div className="relative inline-block">

                        <button
                          onClick={() =>
                            setOpenMenu(
                              openMenu ===
                                department.id
                                ? null
                                : department.id
                            )
                          }
                          className="rounded-lg
                          p-1.5 text-slate-400
                          transition
                          hover:bg-slate-100
                          hover:text-slate-700"
                        >
                          <MoreVertical size={16} />
                        </button>

                        {openMenu ===
                          department.id && (

                          <div
                            className="absolute
                            right-0 top-9 z-20
                            w-44 rounded-xl
                            border
                            border-slate-200
                            bg-white py-1.5
                            text-left shadow-lg"
                          >

                            <button
                              onClick={() =>
                                setOpenMenu(null)
                              }
                              className="flex w-full
                              items-center gap-2
                              px-3 py-2 text-xs
                              font-bold text-slate-600
                              hover:bg-slate-50"
                            >
                              <Pencil size={13} />
                              Edit Department
                            </button>

                            <button
                              onClick={() =>
                                toggleDepartmentStatus(
                                  department.id
                                )
                              }
                              className="flex w-full
                              items-center gap-2
                              px-3 py-2 text-xs
                              font-bold text-slate-600
                              hover:bg-slate-50"
                            >

                              {department.status ===
                              'Operational' ? (
                                <>
                                  <XCircle size={13} />
                                  Disable
                                </>
                              ) : (
                                <>
                                  <CheckCircle2
                                    size={13}
                                  />
                                  Enable
                                </>
                              )}

                            </button>

                            <button
                              onClick={() =>
                                deleteDepartment(
                                  department.id
                                )
                              }
                              className="flex w-full
                              items-center gap-2
                              px-3 py-2 text-xs
                              font-bold text-rose-500
                              hover:bg-rose-50"
                            >
                              <Trash2 size={13} />
                              Delete Department
                            </button>

                          </div>

                        )}

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

        {/* MOBILE CARDS */}

        <div className="space-y-3 md:hidden">

          {filteredDepartments.map(
            (department) => (

              <div
                key={department.id}
                className="rounded-xl
                border border-slate-100 p-4"
              >

                <div
                  className="flex items-start
                  justify-between"
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="flex h-10 w-10
                      items-center justify-center
                      rounded-xl bg-slate-100"
                    >
                      <Building2
                        size={17}
                        className="text-slate-600"
                      />
                    </div>

                    <div>

                      <div
                        className="text-xs
                        font-extrabold
                        text-slate-800"
                      >
                        {department.name}
                      </div>

                      <div
                        className="mt-0.5 text-[10px]
                        font-bold text-slate-400"
                      >
                        {department.code}
                      </div>

                    </div>

                  </div>

                  <span
                    className={`rounded-full
                    px-2 py-1 text-[9px]
                    font-extrabold
                    ${
                      department.status ===
                      'Operational'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-rose-50 text-rose-500'
                    }`}
                  >
                    {department.status}
                  </span>

                </div>

                <div
                  className="mt-4 grid
                  grid-cols-2 gap-3"
                >

                  <div>

                    <div
                      className="text-[9px]
                      font-extrabold uppercase
                      tracking-wider
                      text-slate-400"
                    >
                      MANAGER
                    </div>

                    <div
                      className="mt-1 text-xs
                      font-bold text-slate-600"
                    >
                      {department.manager}
                    </div>

                  </div>

                  <div>

                    <div
                      className="text-[9px]
                      font-extrabold uppercase
                      tracking-wider
                      text-slate-400"
                    >
                      USERS
                    </div>

                    <div
                      className="mt-1 text-xs
                      font-bold text-slate-600"
                    >
                      {department.users}
                    </div>

                  </div>

                  <div>

                    <div
                      className="text-[9px]
                      font-extrabold uppercase
                      tracking-wider
                      text-slate-400"
                    >
                      PROJECTS
                    </div>

                    <div
                      className="mt-1 text-xs
                      font-bold text-slate-600"
                    >
                      {department.projects}
                    </div>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

        {/* EMPTY STATE */}

        {filteredDepartments.length === 0 && (

          <div className="py-12 text-center">

            <Building2
              size={28}
              className="mx-auto text-slate-300"
            />

            <p
              className="mt-3 text-sm
              font-extrabold text-slate-600"
            >
              No departments found
            </p>

            <p
              className="mt-1 text-xs
              font-medium text-slate-400"
            >
              Try changing your search or status filter.
            </p>

          </div>

        )}

      </div>

      {/* OPERATIONAL STATUS */}

      <div
        className="rounded-2xl border
        border-slate-200/80 bg-white
        p-6 shadow-2xs"
      >

        <div
          className="flex flex-col gap-4
          sm:flex-row sm:items-center
          sm:justify-between"
        >

          <div>

            <h3 className="text-sm font-extrabold text-slate-900">
              Department Status
            </h3>

            <p
              className="mt-1 text-[11px]
              font-medium text-slate-400"
            >
              Current operational status across the organization
            </p>

          </div>

          <div
            className="flex items-center gap-2
            rounded-xl bg-emerald-50
            px-4 py-2.5"
          >

            <CheckCircle2
              size={16}
              className="text-emerald-500"
            />

            <span
              className="text-xs font-extrabold
              text-emerald-600"
            >
              {operationalDepartments} of{' '}
              {departments.length} operational
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};