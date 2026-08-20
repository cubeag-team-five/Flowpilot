import React, { useEffect, useState } from "react";
import {
  Bug,
  Plus,
  X,
  Search,
  ChevronDown,
  CheckCircle2,
  Clock3,
  CircleAlert,
} from "lucide-react";

interface BugReport {
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
  filedAt?: string;
}

interface BugForm {
  bugId: string;
  title: string;
  linkedTaskId: string;
  environment: string;
  severity: string;
  assignedTo: string;
  stepsToReproduce: string;
}

const API_URL = "http://localhost:8080/api/qa/bugs";

const emptyForm: BugForm = {
  bugId: "",
  title: "",
  linkedTaskId: "",
  environment: "",
  severity: "Critical",
  assignedTo: "",
  stepsToReproduce: "",
};

/*
 * ============================================================
 * AUTHORIZATION HEADER
 * ============================================================
 *
 * Gets the JWT token already stored by Flowpilot login.
 *
 * We are NOT changing SecurityConfig or JwtAuthenticationFilter.
 * The QA frontend simply sends the existing token with its
 * QA API requests.
 */

const getAuthHeaders = (): Record<string, string> => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("jwt") ||
    localStorage.getItem("accessToken");

  return {
    "Content-Type": "application/json",
    ...(token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}),
  };
};

const QABugReports: React.FC = () => {
  const [bugs, setBugs] = useState<BugReport[]>([]);

  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] =
    useState<BugForm>(emptyForm);

  const [searchTerm, setSearchTerm] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  /*
   * ============================================================
   * LOAD BUGS
   * ============================================================
   *
   * This runs whenever the QA Bug Reports page opens.
   *
   * Therefore, after browser refresh:
   *
   * PostgreSQL
   *     ↓
   * Spring Boot
   *     ↓
   * GET /api/qa/bugs
   *     ↓
   * React
   *     ↓
   * Bug table
   */

  useEffect(() => {
    loadBugs();
  }, []);

  const loadBugs = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch(API_URL, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "Your login session has expired. Please log in again."
          );
        }

        if (response.status === 403) {
          throw new Error(
            "You do not have permission to access QA bug reports."
          );
        }

        throw new Error(
          `Failed to load bug reports (${response.status})`
        );
      }

      const data: BugReport[] = await response.json();

      /*
       * Newest bugs should appear first.
       *
       * The backend normally returns the records in database order,
       * so we reverse the returned list here.
       */

      const sortedBugs = [...data].reverse();

      setBugs(sortedBugs);
    } catch (error) {
      console.error("Error loading QA bugs:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to load bug reports."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * ============================================================
   * INPUT CHANGE
   * ============================================================
   */

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
   * ============================================================
   * SUBMIT BUG
   * ============================================================
   *
   * React
   *   ↓
   * POST /api/qa/bugs
   *   ↓
   * Spring Boot
   *   ↓
   * QA Service
   *   ↓
   * QA Repository
   *   ↓
   * PostgreSQL
   */

  const handleSubmitBug = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    /*
     * Validation
     */

    if (!formData.bugId.trim()) {
      setErrorMessage("Please enter Bug ID.");
      return;
    }

    if (!formData.title.trim()) {
      setErrorMessage("Please enter Bug Title.");
      return;
    }

    if (!formData.linkedTaskId.trim()) {
      setErrorMessage("Please enter Linked Task ID.");
      return;
    }

    if (!formData.environment.trim()) {
      setErrorMessage("Please select Environment.");
      return;
    }

    if (!formData.assignedTo.trim()) {
      setErrorMessage("Please enter Assignee.");
      return;
    }

    if (!formData.stepsToReproduce.trim()) {
      setErrorMessage(
        "Please enter Steps to Reproduce."
      );
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(API_URL, {
        method: "POST",

        /*
         * IMPORTANT:
         * The JWT token is included here.
         */

        headers: getAuthHeaders(),

        body: JSON.stringify({
          bugId: formData.bugId.trim(),
          title: formData.title.trim(),
          linkedTaskId:
            formData.linkedTaskId.trim(),
          environment:
            formData.environment.trim(),
          severity: formData.severity,
          assignedTo:
            formData.assignedTo.trim(),
          stepsToReproduce:
            formData.stepsToReproduce.trim(),
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "Your login session has expired. Please log in again."
          );
        }

        if (response.status === 403) {
          throw new Error(
            "You do not have permission to create a QA bug."
          );
        }

        const errorText = await response.text();

        throw new Error(
          errorText ||
            `Failed to save bug (${response.status})`
        );
      }

      /*
       * Get the bug returned by the backend.
       *
       * This is the actual saved database record.
       */

      const savedBug: BugReport =
        await response.json();

      /*
       * Put the newly saved bug at the TOP.
       */

      setBugs((previousBugs) => [
        {
          ...savedBug,
          status:
            savedBug.status || "Open",
        },
        ...previousBugs,
      ]);

      /*
       * Reset form
       */

      setFormData(emptyForm);

      /*
       * Close form
       */

      setShowForm(false);

      setSuccessMessage(
        "Bug report submitted successfully."
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error(
        "Error submitting QA bug:",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to submit bug report."
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * ============================================================
   * CANCEL
   * ============================================================
   */

  const handleCancel = () => {
    setFormData(emptyForm);
    setErrorMessage("");
    setShowForm(false);
  };

  /*
   * ============================================================
   * SEARCH
   * ============================================================
   */

  const filteredBugs = bugs.filter((bug) => {
    const search =
      searchTerm.toLowerCase();

    return (
      bug.bugId
        ?.toLowerCase()
        .includes(search) ||
      bug.title
        ?.toLowerCase()
        .includes(search) ||
      bug.linkedTaskId
        ?.toLowerCase()
        .includes(search) ||
      bug.environment
        ?.toLowerCase()
        .includes(search) ||
      bug.severity
        ?.toLowerCase()
        .includes(search) ||
      bug.assignedTo
        ?.toLowerCase()
        .includes(search) ||
      bug.status
        ?.toLowerCase()
        .includes(search)
    );
  });

  /*
   * ============================================================
   * SEVERITY
   * ============================================================
   */

  const getSeverityClass = (
    severity?: string
  ) => {
    switch (
      severity?.toLowerCase()
    ) {
      case "critical":
        return "bg-red-50 text-red-600 border border-red-100";

      case "high":
        return "bg-red-50 text-red-500 border border-red-100";

      case "medium":
        return "bg-orange-50 text-orange-500 border border-orange-100";

      case "low":
        return "bg-emerald-50 text-emerald-500 border border-emerald-100";

      default:
        return "bg-slate-50 text-slate-500 border border-slate-100";
    }
  };

  /*
   * ============================================================
   * STATUS
   * ============================================================
   */

  const getStatusClass = (
    status?: string
  ) => {
    switch (
      status?.toLowerCase()
    ) {
      case "closed":
        return "bg-emerald-50 text-emerald-600";

      case "in fix":
        return "bg-orange-50 text-orange-500";

      case "open":
      default:
        return "bg-red-50 text-red-500";
    }
  };

  /*
   * ============================================================
   * DATE
   * ============================================================
   */

  const formatDate = (
    date?: string
  ) => {
    if (!date) {
      return "-";
    }

    try {
      return new Date(
        date
      ).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      );
    } catch {
      return date;
    }
  };

  /*
   * ============================================================
   * UI
   * ============================================================
   */

  return (
    <div className="min-h-full w-full bg-[#f8fafc] text-slate-800">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Bug Reports
            </h1>

            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              Report, track and manage QA bugs
            </p>
          </div>

          <div className="flex w-full items-center gap-2 md:w-auto">

            {/* SEARCH */}

            <div className="relative flex-1 md:w-64 md:flex-none">

              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }
                className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />

            </div>

            {/* FILE BUG */}

            <button
              type="button"
              onClick={() => {
                setShowForm(true);
                setErrorMessage("");
                setSuccessMessage("");
              }}
              className="flex h-10 shrink-0 items-center gap-2 rounded-lg bg-red-500 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600 active:scale-95"
            >
              <Plus size={17} />

              <span className="hidden sm:inline">
                File Bug
              </span>
            </button>

          </div>
        </div>
      </div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">

        {/* SUCCESS */}

        {successMessage && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-600">

            <CheckCircle2 size={17} />

            {successMessage}

          </div>
        )}

        {/* ERROR */}

        {errorMessage && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">

            <CircleAlert size={17} />

            {errorMessage}

          </div>
        )}

        {/* ====================================================
            NEW BUG FORM
        ==================================================== */}

        {showForm && (
          <div className="mb-6 rounded-xl border border-red-200 bg-white p-4 shadow-sm sm:p-5 lg:p-6">

            <div className="mb-5 flex items-center justify-between">

              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  New Bug Report
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Enter the details of the bug
                </p>
              </div>

              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>

            <form
              onSubmit={handleSubmitBug}
            >

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

                {/* BUG ID */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                    Bug ID
                  </label>

                  <input
                    type="text"
                    name="bugId"
                    value={formData.bugId}
                    onChange={
                      handleInputChange
                    }
                    placeholder="BUG-090"
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                {/* TITLE */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                    Bug Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={
                      handleInputChange
                    }
                    placeholder="Bug Title"
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                {/* TASK */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                    Linked Task ID
                  </label>

                  <input
                    type="text"
                    name="linkedTaskId"
                    value={
                      formData.linkedTaskId
                    }
                    onChange={
                      handleInputChange
                    }
                    placeholder="T-044"
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                {/* ENVIRONMENT */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                    Environment
                  </label>

                  <select
                    name="environment"
                    value={
                      formData.environment
                    }
                    onChange={
                      handleInputChange
                    }
                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="">
                      Select Environment
                    </option>

                    <option value="Dev">
                      Dev
                    </option>

                    <option value="Staging">
                      Staging
                    </option>

                    <option value="Production">
                      Production
                    </option>
                  </select>
                </div>

                {/* SEVERITY */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                    Severity
                  </label>

                  <div className="relative">

                    <select
                      name="severity"
                      value={
                        formData.severity
                      }
                      onChange={
                        handleInputChange
                      }
                      className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    >
                      <option value="Critical">
                        Critical
                      </option>

                      <option value="High">
                        High
                      </option>

                      <option value="Medium">
                        Medium
                      </option>

                      <option value="Low">
                        Low
                      </option>
                    </select>

                    <ChevronDown
                      size={15}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                  </div>
                </div>

                {/* ASSIGNEE */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                    Assign To
                  </label>

                  <input
                    type="text"
                    name="assignedTo"
                    value={
                      formData.assignedTo
                    }
                    onChange={
                      handleInputChange
                    }
                    placeholder="Enter name"
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              {/* STEPS */}

              <div className="mt-4">

                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  Steps to Reproduce
                </label>

                <textarea
                  name="stepsToReproduce"
                  value={
                    formData.stepsToReproduce
                  }
                  onChange={
                    handleInputChange
                  }
                  rows={4}
                  placeholder="1. Navigate to... 2. Click on... 3. Observe..."
                  className="w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                />

              </div>

              {/* BUTTONS */}

              <div className="mt-5 flex flex-wrap gap-2">

                <button
                  type="submit"
                  disabled={saving}
                  className="flex h-10 items-center justify-center rounded-lg bg-red-500 px-5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Submitting..."
                    : "Submit Bug Report"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="h-10 rounded-lg border border-slate-200 bg-white px-5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

              </div>

            </form>
          </div>
        )}

        {/* ====================================================
            SUMMARY
        ==================================================== */}

        <div className="mb-3 flex items-center justify-between">

          <div className="text-xs text-slate-400">

            {
              bugs.filter(
                (bug) =>
                  bug.status?.toLowerCase() ===
                  "open"
              ).length
            }{" "}
            open ·{" "}

            {
              bugs.filter(
                (bug) =>
                  bug.status?.toLowerCase() ===
                  "in fix"
              ).length
            }{" "}
            in fix ·{" "}

            {
              bugs.filter(
                (bug) =>
                  bug.status?.toLowerCase() ===
                  "closed"
              ).length
            }{" "}
            closed

          </div>

          <button
            type="button"
            onClick={loadBugs}
            disabled={loading}
            className="text-xs font-medium text-slate-400 hover:text-slate-600 disabled:opacity-50"
          >
            Refresh
          </button>

        </div>

        {/* ====================================================
            TABLE
        ==================================================== */}

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          {/* LOADING */}

          {loading ? (
            <div className="flex min-h-[250px] items-center justify-center">

              <div className="flex items-center gap-2 text-sm text-slate-400">

                <Clock3
                  size={17}
                  className="animate-spin"
                />

                Loading bug reports...

              </div>
            </div>
          ) : filteredBugs.length === 0 ? (

            /* EMPTY */

            <div className="flex min-h-[250px] flex-col items-center justify-center px-4 text-center">

              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">

                <Bug
                  size={22}
                  className="text-slate-400"
                />

              </div>

              <h3 className="text-sm font-semibold text-slate-700">
                No bug reports found
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Click "File Bug" to create a new bug report.
              </p>

            </div>

          ) : (

            <>
              {/* ==================================================
                  DESKTOP TABLE
              ================================================== */}

              <div className="hidden overflow-x-auto md:block">

                <table className="w-full min-w-[950px] border-collapse">

                  <thead>

                    <tr className="border-b border-slate-100 bg-white">

                      <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                        Bug ID
                      </th>

                      <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                        Title
                      </th>

                      <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                        Severity
                      </th>

                      <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                        Status
                      </th>

                      <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                        Linked Task
                      </th>

                      <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                        Assignee
                      </th>

                      <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                        Environment
                      </th>

                      <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                        Filed
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredBugs.map(
                      (bug, index) => (

                        <tr
                          key={
                            bug.id ??
                            `${bug.bugId}-${index}`
                          }
                          className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                        >

                          {/* BUG ID */}

                          <td className="whitespace-nowrap px-3 py-4 text-xs font-medium text-slate-500">
                            {bug.bugId}
                          </td>

                          {/* TITLE */}

                          <td className="min-w-[280px] px-3 py-4">

                            <div className="flex items-center gap-2">

                              <Bug
                                size={14}
                                className="shrink-0 text-emerald-400"
                              />

                              <span className="text-xs font-semibold text-slate-700">
                                {bug.title}
                              </span>

                            </div>

                          </td>

                          {/* SEVERITY */}

                          <td className="whitespace-nowrap px-3 py-4">

                            <span
                              className={`inline-flex rounded-md px-2 py-1 text-[10px] font-medium ${getSeverityClass(
                                bug.severity
                              )}`}
                            >
                              {bug.severity}
                            </span>

                          </td>

                          {/* STATUS */}

                          <td className="whitespace-nowrap px-3 py-4">

                            <span
                              className={`inline-flex rounded-md px-2 py-1 text-[10px] font-medium ${getStatusClass(
                                bug.status ||
                                  "Open"
                              )}`}
                            >
                              {bug.status ||
                                "Open"}
                            </span>

                          </td>

                          {/* TASK */}

                          <td className="whitespace-nowrap px-3 py-4 text-xs text-slate-500">
                            {bug.linkedTaskId ||
                              "-"}
                          </td>

                          {/* ASSIGNEE */}

                          <td className="whitespace-nowrap px-3 py-4 text-xs text-slate-500">
                            {bug.assignedTo ||
                              "-"}
                          </td>

                          {/* ENVIRONMENT */}

                          <td className="whitespace-nowrap px-3 py-4 text-xs text-slate-500">
                            {bug.environment ||
                              "-"}
                          </td>

                          {/* DATE */}

                          <td className="whitespace-nowrap px-3 py-4 text-xs text-slate-500">
                            {formatDate(
                              bug.createdAt ||
                                bug.filedAt
                            )}
                          </td>

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>

              {/* ==================================================
                  MOBILE
              ================================================== */}

              <div className="divide-y divide-slate-100 md:hidden">

                {filteredBugs.map(
                  (bug, index) => (

                    <div
                      key={
                        bug.id ??
                        `${bug.bugId}-${index}`
                      }
                      className="p-4"
                    >

                      <div className="flex items-start justify-between gap-3">

                        <div className="min-w-0">

                          <div className="flex items-center gap-2">

                            <Bug
                              size={15}
                              className="shrink-0 text-emerald-400"
                            />

                            <span className="text-xs font-medium text-slate-400">
                              {bug.bugId}
                            </span>

                          </div>

                          <h3 className="mt-2 text-sm font-semibold text-slate-800">
                            {bug.title}
                          </h3>

                        </div>

                        <span
                          className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-medium ${getSeverityClass(
                            bug.severity
                          )}`}
                        >
                          {bug.severity}
                        </span>

                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">

                        <div>

                          <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                            Status
                          </p>

                          <span
                            className={`mt-1 inline-flex rounded-md px-2 py-1 text-[10px] font-medium ${getStatusClass(
                              bug.status ||
                                "Open"
                            )}`}
                          >
                            {bug.status ||
                              "Open"}
                          </span>

                        </div>

                        <div>

                          <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                            Linked Task
                          </p>

                          <p className="mt-1 text-xs text-slate-600">
                            {bug.linkedTaskId ||
                              "-"}
                          </p>

                        </div>

                        <div>

                          <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                            Assignee
                          </p>

                          <p className="mt-1 text-xs text-slate-600">
                            {bug.assignedTo ||
                              "-"}
                          </p>

                        </div>

                        <div>

                          <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                            Environment
                          </p>

                          <p className="mt-1 text-xs text-slate-600">
                            {bug.environment ||
                              "-"}
                          </p>

                        </div>

                        <div>

                          <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                            Filed
                          </p>

                          <p className="mt-1 text-xs text-slate-600">
                            {formatDate(
                              bug.createdAt ||
                                bug.filedAt
                            )}
                          </p>

                        </div>

                      </div>

                    </div>
                  )
                )}

              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
};

export default QABugReports;