import React from "react";

const QADashboardView: React.FC = () => {
  const testTasks = [
    {
      title: "Test velocity tracking module",
      subtitle: "Functional · T-042",
      status: "Passed",
      statusType: "passed",
    },
    {
      title: "Test mobile responsive layout",
      subtitle: "UI/UX · T-044",
      status: "In Testing",
      statusType: "testing",
    },
    {
      title: "Test file upload S3 integration",
      subtitle: "Integration · T-045",
      status: "In Testing",
      statusType: "testing",
    },
    {
      title: "Test JWT token refresh",
      subtitle: "Security · T-046",
      status: "Passed",
      statusType: "passed",
    },
    {
      title: "API endpoint response validation",
      subtitle: "API · T-041",
      status: "Pending",
      statusType: "pending",
    },
  ];

  const recentBugs = [
    {
      title: "Velocity chart not rendering on Firefox",
      subtitle: "BUG-089 · Aug 4",
      severity: "Medium",
      severityType: "medium",
    },
    {
      title: "File upload fails for PDF > 10MB",
      subtitle: "BUG-088 · Aug 3",
      severity: "High",
      severityType: "high",
    },
    {
      title: "Mobile nav menu overlaps content at 320px",
      subtitle: "BUG-087 · Aug 3",
      severity: "Low",
      severityType: "low",
    },
    {
      title: "Sprint board drag-drop resets on refresh",
      subtitle: "BUG-085 · Jul 30",
      severity: "High",
      severityType: "high",
    },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-52px)] bg-[#f5f6f8] px-6 py-[22px]">

      {/* ================= STATISTICS ================= */}

      <div className="grid grid-cols-1 gap-[12px] sm:grid-cols-2 xl:grid-cols-4">

        {/* CARD */}

        <div className="h-[108px] rounded-[12px] border border-[#ededed] bg-white px-[18px] py-[17px] shadow-[0_2px_8px_rgba(17,24,39,0.05)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#7c8796]">
            Tests in Progress
          </p>

          <p className="mt-[11px] text-[25px] font-semibold leading-[28px] text-[#111827]">
            2
          </p>

          <p className="mt-[7px] text-[10px] font-medium leading-[12px] text-[#32d583]">
            Active testing tasks
          </p>
        </div>

        <div className="h-[108px] rounded-[12px] border border-[#ededed] bg-white px-[18px] py-[17px] shadow-[0_2px_8px_rgba(17,24,39,0.05)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#7c8796]">
            Tests Passed
          </p>

          <p className="mt-[11px] text-[25px] font-semibold leading-[28px] text-[#111827]">
            8
          </p>

          <p className="mt-[7px] text-[10px] font-medium leading-[12px] text-[#32d583]">
            This sprint
          </p>
        </div>

        <div className="h-[108px] rounded-[12px] border border-[#ededed] bg-white px-[18px] py-[17px] shadow-[0_2px_8px_rgba(17,24,39,0.05)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#7c8796]">
            Open Bugs
          </p>

          <p className="mt-[11px] text-[25px] font-semibold leading-[28px] text-[#111827]">
            3
          </p>

          <p className="mt-[7px] text-[10px] font-medium leading-[12px] text-[#ff3b3b]">
            1 high severity
          </p>
        </div>

        <div className="h-[108px] rounded-[12px] border border-[#ededed] bg-white px-[18px] py-[17px] shadow-[0_2px_8px_rgba(17,24,39,0.05)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#7c8796]">
            Pass Rate
          </p>

          <p className="mt-[11px] text-[25px] font-semibold leading-[28px] text-[#111827]">
            84%
          </p>

          <p className="mt-[7px] text-[10px] font-medium leading-[12px] text-[#32d583]">
            Sprint 12 average
          </p>
        </div>
      </div>

      {/* ================= LOWER SECTION ================= */}

      <div className="mt-[18px] grid grid-cols-1 gap-[14px] xl:grid-cols-[1.03fr_0.97fr]">

        {/* ================= TEST TASK STATUS ================= */}

        <div className="min-h-[306px] overflow-hidden rounded-[12px] border border-[#ededed] bg-white shadow-[0_2px_8px_rgba(17,24,39,0.05)]">

          <div className="px-[20px] pt-[20px]">
            <h2 className="text-[12px] font-semibold leading-[15px] text-[#111827]">
              Test Task Status
            </h2>
          </div>

          <div className="mt-[5px] px-[20px] pb-[5px]">

            {testTasks.map((task, index) => (
              <div
                key={task.title}
                className={`flex h-[59px] items-center justify-between ${
                  index !== testTasks.length - 1
                    ? "border-b border-[#eeeeee]"
                    : ""
                }`}
              >

                <div className="flex min-w-0 items-center">

                  <span
                    className={`mr-[11px] h-[7px] w-[7px] shrink-0 rounded-full ${
                      task.statusType === "passed"
                        ? "bg-[#20c978]"
                        : task.statusType === "testing"
                        ? "bg-[#f5a000]"
                        : "bg-[#9aa8bb]"
                    }`}
                  />

                  <div className="min-w-0">

                    <p className="truncate text-[11px] font-semibold leading-[14px] text-[#111827]">
                      {task.title}
                    </p>

                    <p className="mt-[2px] text-[9px] font-normal leading-[11px] text-[#a1a8b3]">
                      {task.subtitle}
                    </p>

                  </div>
                </div>

                <span
                  className={`ml-3 shrink-0 rounded-[6px] px-[8px] py-[3px] text-[9px] font-medium leading-[11px] ${
                    task.statusType === "passed"
                      ? "bg-[#eafaf2] text-[#25c979]"
                      : task.statusType === "testing"
                      ? "bg-[#fff6e7] text-[#e99a00]"
                      : "bg-[#f4f6f8] text-[#9aa8bb]"
                  }`}
                >
                  {task.status}
                </span>

              </div>
            ))}

          </div>
        </div>

        {/* ================= RECENT BUGS ================= */}

        <div className="min-h-[306px] overflow-hidden rounded-[12px] border border-[#ededed] bg-white shadow-[0_2px_8px_rgba(17,24,39,0.05)]">

          <div className="px-[20px] pt-[20px]">
            <h2 className="text-[12px] font-semibold leading-[15px] text-[#111827]">
              Recent Bugs Filed
            </h2>
          </div>

          <div className="mt-[5px] px-[20px] pb-[5px]">

            {recentBugs.map((bug, index) => (
              <div
                key={bug.title}
                className={`flex h-[59px] items-center justify-between ${
                  index !== recentBugs.length - 1
                    ? "border-b border-[#eeeeee]"
                    : ""
                }`}
              >

                <div className="flex min-w-0 items-center">

                  {/* BUG ICON */}

                  <span className="mr-[11px] flex h-[17px] w-[17px] shrink-0 items-center justify-center text-[14px] text-[#32d6a0]">
                    ⚯
                  </span>

                  <div className="min-w-0">

                    <p className="truncate text-[11px] font-semibold leading-[14px] text-[#111827]">
                      {bug.title}
                    </p>

                    <p className="mt-[2px] text-[9px] font-normal leading-[11px] text-[#a1a8b3]">
                      {bug.subtitle}
                    </p>

                  </div>
                </div>

                <span
                  className={`ml-3 shrink-0 rounded-[6px] px-[8px] py-[3px] text-[9px] font-medium leading-[11px] ${
                    bug.severityType === "medium"
                      ? "bg-[#fff7e8] text-[#e99a00]"
                      : bug.severityType === "high"
                      ? "bg-[#fff0f0] text-[#ff3b3b]"
                      : "bg-[#eafaf2] text-[#20c978]"
                  }`}
                >
                  {bug.severity}
                </span>

              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default QADashboardView;