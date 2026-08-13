import React, { useMemo, useState } from "react";

interface TimeEntry {
  id: number;
  date: string;
  task: string;
  hours: number;
  notes: string;
}

const initialEntries: TimeEntry[] = [
  {
    id: 1,
    date: "Aug 4, 2026",
    task: "T-040 — Design system component library",
    hours: 4.5,
    notes: "Built Button, Input, and Card components",
  },
  {
    id: 2,
    date: "Aug 4, 2026",
    task: "T-044 — Mobile responsive layout",
    hours: 2,
    notes: "Navbar responsive fixes",
  },
  {
    id: 3,
    date: "Aug 3, 2026",
    task: "T-046 — JWT token refresh logic",
    hours: 3,
    notes: "Completed refresh handler and tests",
  },
  {
    id: 4,
    date: "Aug 2, 2026",
    task: "T-040 — Design system component library",
    hours: 5,
    notes: "Started typography and spacing tokens",
  },
  {
    id: 5,
    date: "Aug 1, 2026",
    task: "T-044 — Mobile responsive layout",
    hours: 3.5,
    notes: "Dashboard layout breakpoints",
  },
];

const DeveloperTimeLog: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState(
    "T-040 — Design system component library"
  );

  const [hours, setHours] = useState("2.5");
  const [notes, setNotes] = useState("");

  const [entries, setEntries] = useState<TimeEntry[]>(initialEntries);
  const [success, setSuccess] = useState("");

  const totalHours = useMemo(() => {
    return entries.reduce((sum, entry) => sum + entry.hours, 0);
  }, [entries]);

  const handleLogTime = (event: React.FormEvent) => {
    event.preventDefault();

    const numericHours = Number(hours);

    if (!selectedTask) {
      setSuccess("Please select a task.");
      return;
    }

    if (!numericHours || numericHours <= 0) {
      setSuccess("Please enter valid hours.");
      return;
    }

    if (!notes.trim()) {
      setSuccess("Please enter notes.");
      return;
    }

    const newEntry: TimeEntry = {
      id: Date.now(),
      date: "Aug 12, 2026",
      task: selectedTask,
      hours: numericHours,
      notes: notes.trim(),
    };

    setEntries((prev) => [newEntry, ...prev]);
    setNotes("");
    setHours("2.5");
    setSuccess("Time logged successfully.");

    setTimeout(() => {
      setSuccess("");
    }, 2500);
  };

  return (
    <div className="w-full space-y-5">
      {/* Log Time Card */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_3px_15px_rgba(0,0,0,0.04)]">
        <h2 className="text-base font-semibold text-gray-900">
          Log Time for Today
        </h2>

        <form onSubmit={handleLogTime} className="mt-5">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_130px]">
            {/* Task */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                Task
              </label>

              <select
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
              >
                <option>
                  T-040 — Design system component library
                </option>
                <option>
                  T-044 — Mobile responsive layout
                </option>
                <option>T-046 — JWT token refresh logic</option>
                <option>T-049 — Kanban drag & drop</option>
              </select>
            </div>

            {/* Hours */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                Hours
              </label>

              <input
                type="number"
                min="0.5"
                step="0.5"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-700 outline-none transition focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="mt-4">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-400">
              Notes
            </label>

            <input
              type="text"
              placeholder="What did you work on?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          {/* Bottom */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-100 transition hover:-translate-y-[1px] hover:shadow-xl"
            >
              Log Time
            </button>

            {success && (
              <span
                className={`text-sm ${
                  success.includes("successfully")
                    ? "text-emerald-500"
                    : "text-red-400"
                }`}
              >
                {success}
              </span>
            )}
          </div>
        </form>
      </div>

      {/* History */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_3px_15px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-base font-semibold text-gray-900">
            Time Log History
          </h2>

          <span className="text-sm font-semibold text-teal-400">
            {totalHours}h this week
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[850px] w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-400">
                  DATE
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400">
                  TASK
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400">
                  HOURS
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400">
                  NOTES
                </th>
              </tr>
            </thead>

            <tbody>
              {entries.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {entry.date}
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-600">
                    {entry.task}
                  </td>

                  <td className="px-4 py-4 text-sm font-semibold text-teal-400">
                    {entry.hours}h
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-400">
                    {entry.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeveloperTimeLog;