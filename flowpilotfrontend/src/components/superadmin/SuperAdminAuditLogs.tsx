import React, { useMemo, useState } from 'react';
import {
  Search,
  Filter,
  ShieldCheck,
  UserPlus,
  UserCog,
  Trash2,
  Settings,
  FolderPlus,
  KeyRound,
  Download,
  CheckCircle2,
  XCircle,
  ChevronDown,
  MoreHorizontal,
} from 'lucide-react';

type ActionType =
  | 'User Created'
  | 'User Updated'
  | 'User Deleted'
  | 'Project Created'
  | 'Permission Changed'
  | 'Settings Updated'
  | 'Report Exported';

type LogStatus = 'Success' | 'Failed';

interface AuditLog {
  id: number;
  user: string;
  initials: string;
  role: string;
  action: ActionType;
  target: string;
  date: string;
  time: string;
  ip: string;
  status: LogStatus;
}

const auditLogs: AuditLog[] = [
  {
    id: 1,
    user: 'Aditya Kate',
    initials: 'AK',
    role: 'Super Admin',
    action: 'Permission Changed',
    target: 'Admin Role',
    date: '12 Aug 2026',
    time: '10:42 AM',
    ip: '192.168.1.24',
    status: 'Success',
  },
  {
    id: 2,
    user: 'Nisha Agarwal',
    initials: 'NA',
    role: 'Admin',
    action: 'User Created',
    target: 'Aarav Mehta',
    date: '12 Aug 2026',
    time: '10:18 AM',
    ip: '192.168.1.31',
    status: 'Success',
  },
  {
    id: 3,
    user: 'Arjun Shah',
    initials: 'AS',
    role: 'Project Manager',
    action: 'Project Created',
    target: 'Mobile App Development',
    date: '12 Aug 2026',
    time: '09:56 AM',
    ip: '192.168.1.45',
    status: 'Success',
  },
  {
    id: 4,
    user: 'Aryan Kapoor',
    initials: 'AK',
    role: 'Scrum Master',
    action: 'User Updated',
    target: 'Sneh Rao',
    date: '12 Aug 2026',
    time: '09:32 AM',
    ip: '192.168.1.51',
    status: 'Success',
  },
  {
    id: 5,
    user: 'Sneha Rao',
    initials: 'SR',
    role: 'Developer',
    action: 'Settings Updated',
    target: 'Notification Settings',
    date: '12 Aug 2026',
    time: '09:14 AM',
    ip: '192.168.1.67',
    status: 'Success',
  },
  {
    id: 6,
    user: 'Aditya Kate',
    initials: 'AK',
    role: 'Super Admin',
    action: 'User Deleted',
    target: 'Temporary Account',
    date: '11 Aug 2026',
    time: '06:41 PM',
    ip: '192.168.1.24',
    status: 'Success',
  },
  {
    id: 7,
    user: 'Karan Mehta',
    initials: 'KM',
    role: 'Admin',
    action: 'Report Exported',
    target: 'Monthly Activity Report',
    date: '11 Aug 2026',
    time: '05:27 PM',
    ip: '192.168.1.72',
    status: 'Success',
  },
  {
    id: 8,
    user: 'Rohit Verma',
    initials: 'RV',
    role: 'Project Manager',
    action: 'Permission Changed',
    target: 'Project Team',
    date: '11 Aug 2026',
    time: '04:52 PM',
    ip: '192.168.1.83',
    status: 'Failed',
  },
];

const actionIcons: Record<ActionType, React.ReactNode> = {
  'User Created': <UserPlus size={13} />,
  'User Updated': <UserCog size={13} />,
  'User Deleted': <Trash2 size={13} />,
  'Project Created': <FolderPlus size={13} />,
  'Permission Changed': <KeyRound size={13} />,
  'Settings Updated': <Settings size={13} />,
  'Report Exported': <Download size={13} />,
};

const actionColors: Record<ActionType, string> = {
  'User Created': 'bg-emerald-50 text-emerald-600',
  'User Updated': 'bg-blue-50 text-blue-600',
  'User Deleted': 'bg-red-50 text-red-500',
  'Project Created': 'bg-violet-50 text-violet-600',
  'Permission Changed': 'bg-rose-50 text-rose-500',
  'Settings Updated': 'bg-slate-100 text-slate-500',
  'Report Exported': 'bg-amber-50 text-amber-600',
};

const SuperAdminAuditLogs: React.FC = () => {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('All Actions');
  const [roleFilter, setRoleFilter] = useState('All Roles');

  const filteredLogs = useMemo(() => {
    const query = search.toLowerCase().trim();

    return auditLogs.filter((log) => {
      const matchesSearch =
        !query ||
        log.user.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query) ||
        log.target.toLowerCase().includes(query) ||
        log.ip.toLowerCase().includes(query);

      const matchesAction =
        actionFilter === 'All Actions' ||
        log.action === actionFilter;

      const matchesRole =
        roleFilter === 'All Roles' ||
        log.role === roleFilter;

      return matchesSearch && matchesAction && matchesRole;
    });
  }, [search, actionFilter, roleFilter]);

  return (
    <div className="space-y-5">

      {/* HEADER */}
      <div>
        <h1 className="text-[19px] font-extrabold tracking-tight text-slate-900">
          Audit Logs
        </h1>

        <p className="mt-1 text-[11px] font-medium text-slate-400">
          Track important activities and changes across the system
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                Total Events
              </p>

              <p className="mt-2 text-[24px] font-extrabold text-slate-900">
                1,248
              </p>

              <p className="mt-1 text-[9px] font-semibold text-emerald-500">
                +18 today
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <ShieldCheck size={17} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                Successful
              </p>

              <p className="mt-2 text-[24px] font-extrabold text-emerald-500">
                1,226
              </p>

              <p className="mt-1 text-[9px] font-semibold text-slate-400">
                98.2% of events
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500">
              <CheckCircle2 size={17} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                Failed Events
              </p>

              <p className="mt-2 text-[24px] font-extrabold text-red-500">
                22
              </p>

              <p className="mt-1 text-[9px] font-semibold text-red-400">
                Requires attention
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500">
              <XCircle size={17} />
            </div>
          </div>
        </div>

      </div>

      {/* FILTERS */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm">

        <div className="flex flex-col gap-2 lg:flex-row">

          <div className="relative flex-1">

            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user, action, target or IP..."
              className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50/40 pl-9 pr-3 text-[10px] font-medium text-slate-700 outline-none placeholder:text-slate-400 focus:border-slate-300 focus:bg-white"
            />

          </div>

          <div className="relative">

            <Filter
              size={12}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-8 pr-8 text-[10px] font-semibold text-slate-600 outline-none sm:w-[165px]"
            >
              <option>All Actions</option>
              <option>User Created</option>
              <option>User Updated</option>
              <option>User Deleted</option>
              <option>Project Created</option>
              <option>Permission Changed</option>
              <option>Settings Updated</option>
              <option>Report Exported</option>
            </select>

            <ChevronDown
              size={12}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

          </div>

          <div className="relative">

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-8 text-[10px] font-semibold text-slate-600 outline-none sm:w-[150px]"
            >
              <option>All Roles</option>
              <option>Super Admin</option>
              <option>Admin</option>
              <option>Project Manager</option>
              <option>Scrum Master</option>
              <option>Developer</option>
            </select>

            <ChevronDown
              size={12}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

          </div>

        </div>

      </div>

      {/* AUDIT TABLE */}
      <section className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">

        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">

          <div>
            <h2 className="text-[12px] font-extrabold text-slate-800">
              Recent Activity
            </h2>

            <p className="mt-0.5 text-[9px] font-medium text-slate-400">
              {filteredLogs.length} events displayed
            </p>
          </div>

          <button
            type="button"
            className="hidden items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-[9px] font-bold text-slate-500 transition hover:bg-slate-50 sm:flex"
          >
            <Download size={11} />
            Export Logs
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px] border-collapse">

            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">

                <th className="px-5 py-3 text-left text-[8px] font-extrabold uppercase tracking-wider text-slate-400">
                  User
                </th>

                <th className="px-3 py-3 text-left text-[8px] font-extrabold uppercase tracking-wider text-slate-400">
                  Action
                </th>

                <th className="px-3 py-3 text-left text-[8px] font-extrabold uppercase tracking-wider text-slate-400">
                  Target
                </th>

                <th className="px-3 py-3 text-left text-[8px] font-extrabold uppercase tracking-wider text-slate-400">
                  Date & Time
                </th>

                <th className="px-3 py-3 text-left text-[8px] font-extrabold uppercase tracking-wider text-slate-400">
                  IP Address
                </th>

                <th className="px-3 py-3 text-center text-[8px] font-extrabold uppercase tracking-wider text-slate-400">
                  Status
                </th>

                <th className="px-3 py-3" />

              </tr>
            </thead>

            <tbody>

              {filteredLogs.length > 0 ? (

                filteredLogs.map((log) => (

                  <tr
                    key={log.id}
                    className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/40"
                  >

                    {/* USER */}
                    <td className="px-5 py-3.5">

                      <div className="flex items-center gap-2.5">

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[9px] font-extrabold text-slate-500">
                          {log.initials}
                        </div>

                        <div>
                          <p className="text-[10px] font-bold text-slate-700">
                            {log.user}
                          </p>

                          <p className="mt-0.5 text-[8px] font-medium text-slate-400">
                            {log.role}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* ACTION */}
                    <td className="px-3 py-3.5">

                      <div className="flex items-center gap-2">

                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-lg ${actionColors[log.action]}`}
                        >
                          {actionIcons[log.action]}
                        </span>

                        <span className="text-[9px] font-bold text-slate-600">
                          {log.action}
                        </span>

                      </div>

                    </td>

                    {/* TARGET */}
                    <td className="px-3 py-3.5">

                      <span className="text-[9px] font-semibold text-slate-600">
                        {log.target}
                      </span>

                    </td>

                    {/* DATE */}
                    <td className="px-3 py-3.5">

                      <p className="text-[9px] font-semibold text-slate-600">
                        {log.date}
                      </p>

                      <p className="mt-0.5 text-[8px] font-medium text-slate-400">
                        {log.time}
                      </p>

                    </td>

                    {/* IP */}
                    <td className="px-3 py-3.5">

                      <span className="font-mono text-[8px] text-slate-500">
                        {log.ip}
                      </span>

                    </td>

                    {/* STATUS */}
                    <td className="px-3 py-3.5 text-center">

                      {log.status === 'Success' ? (

                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[7px] font-extrabold text-emerald-600">
                          <CheckCircle2 size={9} />
                          Success
                        </span>

                      ) : (

                        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-[7px] font-extrabold text-red-500">
                          <XCircle size={9} />
                          Failed
                        </span>

                      )}

                    </td>

                    {/* MORE */}
                    <td className="px-3 py-3.5">

                      <button
                        type="button"
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                      >
                        <MoreHorizontal size={14} />
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan={7}
                    className="py-16 text-center"
                  >

                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                      <Search size={16} />
                    </div>

                    <p className="mt-3 text-[11px] font-bold text-slate-700">
                      No audit logs found
                    </p>

                    <p className="mt-1 text-[9px] text-slate-400">
                      Try changing your search or filters.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
};

export default SuperAdminAuditLogs;