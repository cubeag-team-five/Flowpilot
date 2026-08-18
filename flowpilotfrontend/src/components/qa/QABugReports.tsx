import React, { useState } from "react";
import { Bug as BugIcon } from "lucide-react";

interface BugReport {
  id: string;
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  status: "Open" | "In Fix" | "Closed";
  linkedTask: string;
  assignee: string;
  environment: string;
  filed: string;
}

const QABugReports: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const [bugs, setBugs] = useState<BugReport[]>([
    {
      id: "BUG-089",
      title: "Velocity chart not rendering on Firefox",
      severity: "Medium",
      status: "Open",
      linkedTask: "T-042",
      assignee: "Sneha Rao",
      environment: "Staging",
      filed: "Aug 4",
    },
    {
      id: "BUG-088",
      title: "File upload fails for PDF > 10MB",
      severity: "High",
      status: "In Fix",
      linkedTask: "T-045",
      assignee: "Mihir Khatri",
      environment: "Staging",
      filed: "Aug 3",
    },
    {
      id: "BUG-087",
      title: "Mobile nav menu overlaps content at 320px",
      severity: "Low",
      status: "Open",
      linkedTask: "T-044",
      assignee: "Sneha Rao",
      environment: "Dev",
      filed: "Aug 3",
    },
    {
      id: "BUG-085",
      title: "Sprint board drag-drop resets on refresh",
      severity: "High",
      status: "Closed",
      linkedTask: "T-049",
      assignee: "Sneha Rao",
      environment: "Dev",
      filed: "Jul 30",
    },
    {
      id: "BUG-083",
      title: "Token expiry not handled gracefully in sidebar",
      severity: "Medium",
      status: "Closed",
      linkedTask: "T-046",
      assignee: "Sneha Rao",
      environment: "Staging",
      filed: "Jul 28",
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    linkedTask: "",
    environment: "",
    severity: "Critical",
    assignee: "Sneha Rao",
    steps: "",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    const nextNumber =
      bugs.length > 0
        ? Math.max(
            ...bugs.map((bug) => {
              const number = Number(bug.id.replace("BUG-", ""));
              return Number.isNaN(number) ? 0 : number;
            })
          ) + 1
        : 1;

    const newBug: BugReport = {
      id: `BUG-${String(nextNumber).padStart(3, "0")}`,
      title: form.title,
      severity: form.severity as BugReport["severity"],
      status: "Open",
      linkedTask: form.linkedTask || "—",
      assignee: form.assignee,
      environment: form.environment || "—",
      filed: "Aug 17",
    };

    setBugs((previous) => [newBug, ...previous]);

    setForm({
      title: "",
      linkedTask: "",
      environment: "",
      severity: "Critical",
      assignee: "Sneha Rao",
      steps: "",
    });

    setShowForm(false);
  };

  const handleCancel = () => {
    setForm({
      title: "",
      linkedTask: "",
      environment: "",
      severity: "Critical",
      assignee: "Sneha Rao",
      steps: "",
    });

    setShowForm(false);
  };

  const getSeverityClass = (severity: BugReport["severity"]) => {
    switch (severity) {
      case "Critical":
        return "bg-[#fff0f0] text-[#ff3b3b]";

      case "High":
        return "bg-[#fff0f0] text-[#ff3b3b]";

      case "Medium":
        return "bg-[#fff7e8] text-[#e99a00]";

      case "Low":
        return "bg-[#eafaf2] text-[#20c978]";

      default:
        return "bg-[#f4f6f8] text-[#9aa8bb]";
    }
  };

  const getStatusClass = (status: BugReport["status"]) => {
    switch (status) {
      case "Open":
        return "bg-[#fff0f0] text-[#ff3b3b]";

      case "In Fix":
        return "bg-[#fff7e8] text-[#e99a00]";

      case "Closed":
        return "bg-[#eafaf2] text-[#20c978]";

      default:
        return "bg-[#f4f6f8] text-[#9aa8bb]";
    }
  };

  const openCount = bugs.filter((bug) => bug.status === "Open").length;
  const inFixCount = bugs.filter((bug) => bug.status === "In Fix").length;
  const closedCount = bugs.filter((bug) => bug.status === "Closed").length;

  return (
    <div className="w-full">
      {/* =========================================================
          TOP ROW
      ========================================================= */}

      <div className="mb-[12px] flex items-center justify-between">
        <p className="text-[10px] font-[400] leading-[14px] text-[#7c8796]">
          {openCount} open · {inFixCount} in fix · {closedCount} closed
        </p>

        <button
          type="button"
          onClick={() => setShowForm((previous) => !previous)}
          className="
            flex
            h-[34px]
            items-center
            rounded-[8px]
            bg-[#ef3d3d]
            px-[14px]
            text-[10px]
            font-[700]
            leading-none
            text-white
            shadow-[0_4px_10px_rgba(239,61,61,0.18)]
            transition
            hover:bg-[#e93636]
          "
        >
          <span className="mr-[3px] text-[12px] leading-none">+</span>
          File Bug
        </button>
      </div>

      {/* =========================================================
          NEW BUG FORM
      ========================================================= */}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="
            mb-[16px]
            rounded-[13px]
            border
            border-[#ffd0d0]
            bg-white
            px-[19px]
            py-[19px]
            shadow-[0_4px_14px_rgba(17,24,39,0.04)]
          "
        >
          {/* FORM TITLE */}

          <h2
            className="
              mb-[14px]
              text-[12px]
              font-[700]
              leading-[16px]
              text-[#111827]
            "
          >
            New Bug Report
          </h2>

          {/* =====================================================
              FIRST ROW
          ===================================================== */}

          <div className="grid grid-cols-1 gap-[10px] xl:grid-cols-3">
            {/* BUG TITLE */}

            <div>
              <label
                htmlFor="bug-title"
                className="
                  mb-[5px]
                  block
                  text-[9px]
                  font-[700]
                  uppercase
                  leading-[12px]
                  tracking-[0.02em]
                  text-[#596579]
                "
              >
                Bug Title
              </label>

              <input
                id="bug-title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="Bug Title"
                className="
                  h-[35px]
                  w-full
                  rounded-[8px]
                  border
                  border-[#e1e4e8]
                  bg-white
                  px-[10px]
                  text-[10px]
                  font-[400]
                  text-[#374151]
                  outline-none
                  placeholder:text-[#9aa1ad]
                  focus:border-[#ef7777]
                "
              />
            </div>

            {/* LINKED TASK */}

            <div>
              <label
                htmlFor="linked-task"
                className="
                  mb-[5px]
                  block
                  text-[9px]
                  font-[700]
                  uppercase
                  leading-[12px]
                  tracking-[0.02em]
                  text-[#596579]
                "
              >
                Linked Task ID
              </label>

              <input
                id="linked-task"
                name="linkedTask"
                type="text"
                value={form.linkedTask}
                onChange={handleChange}
                placeholder="Linked Task ID"
                className="
                  h-[35px]
                  w-full
                  rounded-[8px]
                  border
                  border-[#e1e4e8]
                  bg-white
                  px-[10px]
                  text-[10px]
                  font-[400]
                  text-[#374151]
                  outline-none
                  placeholder:text-[#9aa1ad]
                  focus:border-[#ef7777]
                "
              />
            </div>

            {/* ENVIRONMENT */}

            <div>
              <label
                htmlFor="environment"
                className="
                  mb-[5px]
                  block
                  text-[9px]
                  font-[700]
                  uppercase
                  leading-[12px]
                  tracking-[0.02em]
                  text-[#596579]
                "
              >
                Environment
              </label>

              <input
                id="environment"
                name="environment"
                type="text"
                value={form.environment}
                onChange={handleChange}
                placeholder="Environment"
                className="
                  h-[35px]
                  w-full
                  rounded-[8px]
                  border
                  border-[#e1e4e8]
                  bg-white
                  px-[10px]
                  text-[10px]
                  font-[400]
                  text-[#374151]
                  outline-none
                  placeholder:text-[#9aa1ad]
                  focus:border-[#ef7777]
                "
              />
            </div>
          </div>

          {/* =====================================================
              SECOND ROW
          ===================================================== */}

          <div className="mt-[10px] grid grid-cols-1 gap-[10px] xl:grid-cols-3">
            {/* SEVERITY */}

            <div>
              <label
                htmlFor="severity"
                className="
                  mb-[5px]
                  block
                  text-[9px]
                  font-[700]
                  uppercase
                  leading-[12px]
                  tracking-[0.02em]
                  text-[#596579]
                "
              >
                Severity
              </label>

              <select
                id="severity"
                name="severity"
                value={form.severity}
                onChange={handleChange}
                className="
                  h-[35px]
                  w-full
                  rounded-[8px]
                  border
                  border-[#e1e4e8]
                  bg-white
                  px-[10px]
                  text-[10px]
                  font-[400]
                  text-[#111827]
                  outline-none
                  focus:border-[#ef7777]
                "
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* ASSIGN TO */}

            <div>
              <label
                htmlFor="assignee"
                className="
                  mb-[5px]
                  block
                  text-[9px]
                  font-[700]
                  uppercase
                  leading-[12px]
                  tracking-[0.02em]
                  text-[#596579]
                "
              >
                Assign To
              </label>

              <select
                id="assignee"
                name="assignee"
                value={form.assignee}
                onChange={handleChange}
                className="
                  h-[35px]
                  w-full
                  rounded-[8px]
                  border
                  border-[#e1e4e8]
                  bg-white
                  px-[10px]
                  text-[10px]
                  font-[400]
                  text-[#111827]
                  outline-none
                  focus:border-[#ef7777]
                "
              >
                <option value="Sneha Rao">Sneha Rao</option>
                <option value="Mihir Khatri">Mihir Khatri</option>
                <option value="Priya Rajan">Priya Rajan</option>
              </select>
            </div>

            <div className="hidden xl:block" />
          </div>

          {/* =====================================================
              STEPS TO REPRODUCE
          ===================================================== */}

          <div className="mt-[10px]">
            <label
              htmlFor="steps"
              className="
                mb-[5px]
                block
                text-[9px]
                font-[700]
                uppercase
                leading-[12px]
                tracking-[0.02em]
                text-[#596579]
              "
            >
              Steps to Reproduce
            </label>

            <textarea
              id="steps"
              name="steps"
              value={form.steps}
              onChange={handleChange}
              placeholder="1. Navigate to... 2. Click on... 3. Observe..."
              className="
                block
                h-[68px]
                w-full
                resize-y
                rounded-[8px]
                border
                border-[#e1e4e8]
                bg-white
                px-[10px]
                py-[9px]
                text-[10px]
                font-[400]
                leading-[15px]
                text-[#374151]
                outline-none
                placeholder:text-[#9aa1ad]
                focus:border-[#ef7777]
              "
            />
          </div>

          {/* =====================================================
              FORM BUTTONS
          ===================================================== */}

          <div className="mt-[16px] flex items-center gap-[8px]">
            <button
              type="submit"
              className="
                h-[35px]
                rounded-[7px]
                bg-[#ef3d3d]
                px-[17px]
                text-[10px]
                font-[700]
                leading-none
                text-white
                shadow-[0_3px_8px_rgba(239,61,61,0.16)]
                transition
                hover:bg-[#e93636]
              "
            >
              Submit Bug Report
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="
                h-[35px]
                rounded-[7px]
                border
                border-[#dfe3e8]
                bg-[#f7f8fa]
                px-[17px]
                text-[10px]
                font-[500]
                leading-none
                text-[#374151]
                transition
                hover:bg-[#eef0f3]
              "
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* =========================================================
          BUG TABLE — desktop
      ========================================================= */}

      <div
        className="
          hidden md:block
          overflow-x-auto
          rounded-[13px]
          border
          border-[#eeeeee]
          bg-white
          shadow-[0_3px_12px_rgba(17,24,39,0.035)]
        "
      >
        <table className="w-full min-w-[950px] border-collapse">
          {/* TABLE HEADER */}

          <thead>
            <tr className="border-b border-[#eeeeee]">
              <th
                className="
                  w-[120px]
                  px-[12px]
                  py-[10px]
                  text-left
                  text-[9px]
                  font-[700]
                  uppercase
                  leading-[12px]
                  tracking-[0.03em]
                  text-[#7c8796]
                "
              >
                Bug ID
              </th>

              <th
                className="
                  min-w-[390px]
                  px-[12px]
                  py-[10px]
                  text-left
                  text-[9px]
                  font-[700]
                  uppercase
                  leading-[12px]
                  tracking-[0.03em]
                  text-[#7c8796]
                "
              >
                Title
              </th>

              <th
                className="
                  w-[110px]
                  px-[12px]
                  py-[10px]
                  text-left
                  text-[9px]
                  font-[700]
                  uppercase
                  leading-[12px]
                  tracking-[0.03em]
                  text-[#7c8796]
                "
              >
                Severity
              </th>

              <th
                className="
                  w-[110px]
                  px-[12px]
                  py-[10px]
                  text-left
                  text-[9px]
                  font-[700]
                  uppercase
                  leading-[12px]
                  tracking-[0.03em]
                  text-[#7c8796]
                "
              >
                Status
              </th>

              <th
                className="
                  w-[130px]
                  px-[12px]
                  py-[10px]
                  text-left
                  text-[9px]
                  font-[700]
                  uppercase
                  leading-[12px]
                  tracking-[0.03em]
                  text-[#7c8796]
                "
              >
                Linked Task
              </th>

              <th
                className="
                  w-[150px]
                  px-[12px]
                  py-[10px]
                  text-left
                  text-[9px]
                  font-[700]
                  uppercase
                  leading-[12px]
                  tracking-[0.03em]
                  text-[#7c8796]
                "
              >
                Assignee
              </th>

              <th
                className="
                  w-[100px]
                  px-[12px]
                  py-[10px]
                  text-left
                  text-[9px]
                  font-[700]
                  uppercase
                  leading-[12px]
                  tracking-[0.03em]
                  text-[#7c8796]
                "
              >
                Env
              </th>

              <th
                className="
                  w-[80px]
                  px-[12px]
                  py-[10px]
                  text-left
                  text-[9px]
                  font-[700]
                  uppercase
                  leading-[12px]
                  tracking-[0.03em]
                  text-[#7c8796]
                "
              >
                Filed
              </th>
            </tr>
          </thead>

          {/* TABLE BODY */}

          <tbody>
            {bugs.map((bug) => (
              <tr
                key={bug.id}
                className="
                  h-[40px]
                  border-b
                  border-[#eeeeee]
                  last:border-b-0
                "
              >
                {/* BUG ID */}

                <td className="px-[12px] py-[9px]">
                  <span
                    className="
                      text-[9px]
                      font-[400]
                      leading-[12px]
                      tracking-[0.02em]
                      text-[#8993a1]
                    "
                  >
                    {bug.id}
                  </span>
                </td>

                {/* TITLE */}

                <td className="px-[12px] py-[9px]">
                  <div className="flex items-center gap-[8px]">
                    <BugIcon
                      size={12}
                      strokeWidth={1.8}
                      className="shrink-0 text-[#35cfa0]"
                    />

                    <span
                      className="
                        text-[10px]
                        font-[600]
                        leading-[14px]
                        text-[#111827]
                      "
                    >
                      {bug.title}
                    </span>
                  </div>
                </td>

                {/* SEVERITY */}

                <td className="px-[12px] py-[9px]">
                  <span
                    className={`
                      inline-flex
                      items-center
                      rounded-[6px]
                      px-[7px]
                      py-[3px]
                      text-[9px]
                      font-[600]
                      leading-[10px]
                      ${getSeverityClass(bug.severity)}
                    `}
                  >
                    {bug.severity}
                  </span>
                </td>

                {/* STATUS */}

                <td className="px-[12px] py-[9px]">
                  <span
                    className={`
                      inline-flex
                      items-center
                      rounded-[6px]
                      px-[7px]
                      py-[3px]
                      text-[9px]
                      font-[600]
                      leading-[10px]
                      ${getStatusClass(bug.status)}
                    `}
                  >
                    {bug.status}
                  </span>
                </td>

                {/* LINKED TASK */}

                <td className="px-[12px] py-[9px]">
                  <span
                    className="
                      text-[9px]
                      font-[400]
                      leading-[12px]
                      text-[#8993a1]
                    "
                  >
                    {bug.linkedTask}
                  </span>
                </td>

                {/* ASSIGNEE */}

                <td className="px-[12px] py-[9px]">
                  <span
                    className="
                      text-[9px]
                      font-[400]
                      leading-[12px]
                      text-[#596579]
                    "
                  >
                    {bug.assignee}
                  </span>
                </td>

                {/* ENVIRONMENT */}

                <td className="px-[12px] py-[9px]">
                  <span
                    className="
                      text-[9px]
                      font-[400]
                      leading-[12px]
                      text-[#7c8796]
                    "
                  >
                    {bug.environment}
                  </span>
                </td>

                {/* FILED */}

                <td className="px-[12px] py-[9px]">
                  <span
                    className="
                      text-[9px]
                      font-[400]
                      leading-[12px]
                      text-[#8993a1]
                    "
                  >
                    {bug.filed}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =========================================================
          BUG CARDS — mobile
      ========================================================= */}
      <div className="md:hidden space-y-3">
        {bugs.map((bug) => (
          <div key={bug.id} className="rounded-[13px] border border-[#eeeeee] bg-white p-4 shadow-[0_2px_8px_rgba(17,24,39,0.04)]">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="min-w-0">
                <p className="text-[9px] text-[#8993a1] mb-1">{bug.id}</p>
                <p className="text-[11px] font-[600] text-[#111827] leading-[15px]">{bug.title}</p>
              </div>
              <span className={`shrink-0 rounded-[6px] px-[7px] py-[3px] text-[9px] font-[600] ${getSeverityClass(bug.severity)}`}>{bug.severity}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[9px]">
              <div><span className="text-[#9aa8bb]">Status: </span><span className={`rounded-[5px] px-[6px] py-[2px] font-[600] ${getStatusClass(bug.status)}`}>{bug.status}</span></div>
              <div><span className="text-[#9aa8bb]">Task: </span><span className="text-[#596579]">{bug.linkedTask}</span></div>
              <div><span className="text-[#9aa8bb]">Assignee: </span><span className="text-[#596579]">{bug.assignee}</span></div>
              <div><span className="text-[#9aa8bb]">Env: </span><span className="text-[#7c8796]">{bug.environment}</span></div>
              <div><span className="text-[#9aa8bb]">Filed: </span><span className="text-[#8993a1]">{bug.filed}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QABugReports;