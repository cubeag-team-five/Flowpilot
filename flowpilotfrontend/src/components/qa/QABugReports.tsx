import React, { useEffect, useMemo, useState } from "react";

type BugReport = {
  id?: number;
  bugId: string;
  title: string;
  linkedTaskId: string;
  environment: string;
  severity: string;
  assignedTo: string;
  stepsToReproduce: string;
  status?: string;
  createdAt?: string;
  filedDate?: string;
};

type BugForm = {
  bugId: string;
  bugTitle: string;
  linkedTaskId: string;
  environment: string;
  severity: string;
  assignedTo: string;
  stepsToReproduce: string;
};

const API_URL = "http://localhost:8080/api/qa/bugs";

const emptyForm: BugForm = {
  bugId: "",
  bugTitle: "",
  linkedTaskId: "",
  environment: "Dev",
  severity: "Medium",
  assignedTo: "",
  stepsToReproduce: "",
};

const QABugReports: React.FC = () => {
  const [bugs, setBugs] = useState<BugReport[]>([]);
  const [form, setForm] = useState<BugForm>(emptyForm);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [globalSearch, setGlobalSearch] = useState("");

  /*
   * Receive search text from the TOP QA search bar.
   */
  useEffect(() => {
    const handleGlobalSearch = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      setGlobalSearch(customEvent.detail || "");
    };

    window.addEventListener("qa-global-search", handleGlobalSearch);

    return () => {
      window.removeEventListener(
        "qa-global-search",
        handleGlobalSearch
      );
    };
  }, []);

  /*
   * Automatically remove success toast
   * after 4 seconds.
   */
  useEffect(() => {
    if (!success) {
      return;
    }

    const timer = window.setTimeout(() => {
      setSuccess("");
    }, 4000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [success]);

  /*
   * Get authentication token.
   */
  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("jwt") ||
      ""
    );
  };

  /*
   * Common headers for backend requests.
   */
  const getHeaders = () => {
    const token = getToken();

    return {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    };
  };

  /*
   * Load bugs from backend.
   */
  const loadBugs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, {
        method: "GET",
        headers: getHeaders(),
      });

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
          errorText ||
            `Failed to load bug reports (${response.status})`
        );
      }

      const result = await response.json();

      /*
       * Supports:
       *
       * [
       *   {...}
       * ]
       *
       * and:
       *
       * {
       *   success: true,
       *   data: [...]
       * }
       */
      const data = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
        ? result.data
        : [];

      setBugs(data);
    } catch (err) {
      console.error("Error loading bugs:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load bug reports"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBugs();
  }, []);

  /*
   * Update form fields.
   */
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
   * Open bug form.
   */
  const openForm = () => {
    setError("");
    setSuccess("");

    setForm({
      ...emptyForm,
      bugId: `BUG-${String(bugs.length + 1).padStart(3, "0")}`,
    });

    setShowForm(true);
  };

  /*
   * Close bug form.
   */
  const closeForm = () => {
    setShowForm(false);
    setForm(emptyForm);
    setError("");
  };

  /*
   * Submit bug to backend.
   */
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !form.bugId.trim() ||
      !form.bugTitle.trim() ||
      !form.linkedTaskId.trim() ||
      !form.assignedTo.trim() ||
      !form.stepsToReproduce.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setSaving(true);

      /*
       * IMPORTANT:
       *
       * Backend entity uses "title", NOT "bugTitle".
       *
       * Therefore we send:
       *
       * title: form.bugTitle.trim()
       */
      const response = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          bugId: form.bugId.trim(),

          // CORRECT BACKEND FIELD
          title: form.bugTitle.trim(),

          linkedTaskId: form.linkedTaskId.trim(),
          environment: form.environment,
          severity: form.severity,
          assignedTo: form.assignedTo.trim(),
          stepsToReproduce: form.stepsToReproduce.trim(),

          status: "Open",
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
          errorText ||
            `Failed to save bug report (${response.status})`
        );
      }

      /*
       * Show success toast.
       *
       * It will automatically disappear
       * after 4 seconds.
       */
      setSuccess("Bug successfully added.");

      setShowForm(false);
      setForm(emptyForm);

      /*
       * Reload bugs from backend.
       */
      await loadBugs();
    } catch (err) {
      console.error("Error saving bug:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to save bug report"
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * Search/filter using TOP search bar.
   */
 const filteredBugs = useMemo(() => {
  const search = globalSearch.trim().toLowerCase();

  if (!search) {
    return bugs;
  }

  return bugs.filter((bug) => {
    const values = [
      bug.bugId,
      bug.title,
      bug.linkedTaskId,
      bug.environment,
      bug.severity,
      bug.assignedTo,
      bug.status,
      bug.stepsToReproduce,
    ];

    return values.some((value) =>
      String(value ?? "")
        .toLowerCase()
        .includes(search)
    );
  });
}, [bugs, globalSearch]);


  const openCount = bugs.filter(
    (bug) => (bug.status || "Open").toLowerCase() === "open"
  ).length;

  const fixedCount = bugs.filter(
    (bug) => (bug.status || "").toLowerCase() === "fixed"
  ).length;

  const closedCount = bugs.filter(
    (bug) => (bug.status || "").toLowerCase() === "closed"
  ).length;

  /*
   * Format created date + time.
   *
   * Example:
   * Aug 21, 2026, 11:07 AM
   */
  const formatDateTime = (bug: BugReport) => {
    const value = bug.createdAt || bug.filedDate;

    if (!value) {
      return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full">

      {/* File Bug button */}
      <div className="flex justify-center mb-6">
        <button
          type="button"
          onClick={openForm}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg font-medium transition-colors"
        >
          + File Bug
        </button>
      </div>

      {/* =====================================================
          SUCCESS TOAST
          Appears above the table and disappears after 4 seconds
          ===================================================== */}
      {success && (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white text-xs">
              ✓
            </span>

            <span>{success}</span>
          </div>

          <button
            type="button"
            onClick={() => setSuccess("")}
            className="text-green-500 hover:text-green-700 text-lg leading-none"
          >
            ×
          </button>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* New Bug Form */}
      {showForm && (
        <div className="mb-6 rounded-xl border border-red-200 bg-white p-5 shadow-sm">

          <div className="flex items-start justify-between mb-5">

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                New Bug Report
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Enter the details of the bug
              </p>
            </div>

            <button
              type="button"
              onClick={closeForm}
              className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
            >
              ×
            </button>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* Bug ID */}
              <div>
                <label className="block mb-2 text-xs font-medium text-slate-600">
                  BUG ID
                </label>

                <input
                  name="bugId"
                  value={form.bugId}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-red-400"
                  placeholder="BUG-090"
                />
              </div>

              {/* Bug Title */}
              <div>
                <label className="block mb-2 text-xs font-medium text-slate-600">
                  BUG TITLE
                </label>

                <input
                  name="bugTitle"
                  value={form.bugTitle}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-red-400"
                  placeholder="Bug title"
                />
              </div>

              {/* Linked Task */}
              <div>
                <label className="block mb-2 text-xs font-medium text-slate-600">
                  LINKED TASK ID
                </label>

                <input
                  name="linkedTaskId"
                  value={form.linkedTaskId}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-red-400"
                  placeholder="T-044"
                />
              </div>

              {/* Environment */}
              <div>
                <label className="block mb-2 text-xs font-medium text-slate-600">
                  ENVIRONMENT
                </label>

                <select
                  name="environment"
                  value={form.environment}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-red-400 bg-white"
                >
                  <option value="Dev">Dev</option>
                  <option value="Staging">Staging</option>
                  <option value="Production">Production</option>
                </select>
              </div>

              {/* Severity */}
              <div>
                <label className="block mb-2 text-xs font-medium text-slate-600">
                  SEVERITY
                </label>

                <select
                  name="severity"
                  value={form.severity}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-red-400 bg-white"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              {/* Assigned To */}
              <div>
                <label className="block mb-2 text-xs font-medium text-slate-600">
                  ASSIGN TO
                </label>

                <input
                  name="assignedTo"
                  value={form.assignedTo}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-red-400"
                  placeholder="Sneha"
                />
              </div>

            </div>

            {/* Steps */}
            <div className="mt-4">

              <label className="block mb-2 text-xs font-medium text-slate-600">
                STEPS TO REPRODUCE
              </label>

              <textarea
                name="stepsToReproduce"
                value={form.stepsToReproduce}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none resize-none focus:border-red-400"
                placeholder="Enter steps to reproduce the bug..."
              />

            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-5">

              <button
                type="submit"
                disabled={saving}
                className="bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white px-5 py-2.5 rounded-lg text-sm font-medium"
              >
                {saving ? "Saving..." : "Submit Bug Report"}
              </button>

              <button
                type="button"
                onClick={closeForm}
                className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 px-5 py-2.5 rounded-lg text-sm"
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      )}

      {/* Count row */}
      <div className="flex items-center justify-between mb-3 text-xs text-slate-400">

        <span>
          {openCount} open · {fixedCount} in fix · {closedCount} closed
        </span>

        <button
          type="button"
          onClick={loadBugs}
          className="hover:text-slate-600"
        >
          Refresh
        </button>

      </div>

      {/* =====================================================
          TABLE
          ===================================================== */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">

        {loading ? (

          <div className="py-16 text-center text-sm text-slate-400">
            Loading bug reports...
          </div>

        ) : filteredBugs.length === 0 ? (

          <div className="py-16 text-center">

            <div className="text-slate-400 text-3xl mb-3">
              🐞
            </div>

            <p className="text-sm font-medium text-slate-700">
              {globalSearch
                ? "No matching bug reports found"
                : "No bug reports found"}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {globalSearch
                ? `No bugs match "${globalSearch}"`
                : 'Click "File Bug" to create a new bug report.'}
            </p>

          </div>

        ) : (

          <table className="w-full min-w-[1000px] text-sm">

            <thead>

              <tr className="border-b border-slate-200">

                <th className="px-3 py-3 text-left text-xs font-medium text-slate-500">
                  BUG ID
                </th>

                <th className="px-3 py-3 text-left text-xs font-medium text-slate-500">
                  TITLE
                </th>

                <th className="px-3 py-3 text-left text-xs font-medium text-slate-500">
                  SEVERITY
                </th>

                <th className="px-3 py-3 text-left text-xs font-medium text-slate-500">
                  STATUS
                </th>

                <th className="px-3 py-3 text-left text-xs font-medium text-slate-500">
                  LINKED TASK
                </th>

                <th className="px-3 py-3 text-left text-xs font-medium text-slate-500">
                  ASSIGNEE
                </th>

                <th className="px-3 py-3 text-left text-xs font-medium text-slate-500">
                  ENVIRONMENT
                </th>

                <th className="px-3 py-3 text-left text-xs font-medium text-slate-500">
                  CREATED
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredBugs.map((bug, index) => {

                const status = bug.status || "Open";

                return (

                  <tr
                    key={bug.id ?? `${bug.bugId}-${index}`}
                    className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
                  >

                    {/* Bug ID */}
                    <td className="px-3 py-4 text-sm text-slate-600">
                      {bug.bugId}
                    </td>

                    {/* Title */}
                    <td className="px-3 py-4">

                      <div className="flex items-center gap-2">

                        <span className="text-emerald-500">
                          🐞
                        </span>

                        <span className="text-sm text-slate-700">
                          {bug.title}
                        </span>

                      </div>

                    </td>

                    {/* Severity */}
                    <td className="px-3 py-4">

                      <span
                        className={`inline-flex rounded-md px-2 py-1 text-xs ${
                          bug.severity?.toLowerCase() === "critical"
                            ? "bg-red-50 text-red-500"
                            : bug.severity?.toLowerCase() === "high"
                            ? "bg-red-50 text-red-500"
                            : bug.severity?.toLowerCase() === "medium"
                            ? "bg-orange-50 text-orange-500"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        {bug.severity}
                      </span>

                    </td>

                    {/* Status */}
                    <td className="px-3 py-4">

                      <span className="inline-flex rounded-md bg-red-50 px-2 py-1 text-xs text-red-500">
                        {status}
                      </span>

                    </td>

                    {/* Linked Task */}
                    <td className="px-3 py-4 text-sm text-slate-600">
                      {bug.linkedTaskId}
                    </td>

                    {/* Assignee */}
                    <td className="px-3 py-4 text-sm text-slate-600">
                      {bug.assignedTo}
                    </td>

                    {/* Environment */}
                    <td className="px-3 py-4 text-sm text-slate-600">
                      {bug.environment}
                    </td>

                    {/* Created Date + Time */}
                    <td className="px-3 py-4 text-sm text-slate-500 whitespace-nowrap">
                      {formatDateTime(bug)}
                    </td>

                  </tr>

                );
              })}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
};

export default QABugReports;