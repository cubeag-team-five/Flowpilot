import React from "react";

interface TestCase {
  id: string;
  title: string;
  type: string;
  linkedTask: string;
  priority: "High" | "Medium";
  status: "Passed" | "In Testing" | "Pending";
  date: string;
}

const QATestCases: React.FC = () => {
  const testCases: TestCase[] = [
    {
      id: "T-042-QA",
      title: "Test velocity tracking module",
      type: "Functional",
      linkedTask: "T-042",
      priority: "High",
      status: "Passed",
      date: "Aug 3",
    },
    {
      id: "T-044-QA",
      title: "Test mobile responsive layout",
      type: "UI/UX",
      linkedTask: "T-044",
      priority: "Medium",
      status: "In Testing",
      date: "Aug 5",
    },
    {
      id: "T-045-QA",
      title: "Test file upload S3 integration",
      type: "Integration",
      linkedTask: "T-045",
      priority: "High",
      status: "In Testing",
      date: "Aug 5",
    },
    {
      id: "T-046-QA",
      title: "Test JWT token refresh",
      type: "Security",
      linkedTask: "T-046",
      priority: "High",
      status: "Passed",
      date: "Aug 2",
    },
    {
      id: "T-041-QA",
      title: "API endpoint response validation",
      type: "API",
      linkedTask: "T-041",
      priority: "Medium",
      status: "Pending",
      date: "Aug 7",
    },
  ];

  const getPriorityClass = (priority: TestCase["priority"]) => {
    if (priority === "High") {
      return "bg-[#fff0f0] text-[#ff3b3b]";
    }

    return "bg-[#fff7e8] text-[#e99a00]";
  };

  const getStatusClass = (status: TestCase["status"]) => {
    switch (status) {
      case "Passed":
        return "bg-[#eafaf2] text-[#20c978]";

      case "In Testing":
        return "bg-[#fff6e7] text-[#e99a00]";

      case "Pending":
        return "bg-[#f4f6f8] text-[#9aa8bb]";

      default:
        return "bg-[#f4f6f8] text-[#9aa8bb]";
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-60px)] bg-[#f5f6f8]">
      {/* ============================================================
          TABLE WRAPPER
      ============================================================ */}

      <div className="w-full overflow-x-auto">
        <div
          className="
            min-w-[1050px]
            bg-white
            border-b
            border-[#e5e7eb]
            shadow-sm
            overflow-hidden
          "
        >
          {/* ========================================================
              TABLE HEADER
          ======================================================== */}

          <div
            className="
              grid
              grid-cols-[110px_minmax(300px,1fr)_120px_130px_110px_120px_100px_95px]
              items-center
              h-[40px]
              px-[12px]
              border-b
              border-[#e5e7eb]
              bg-white
            "
          >
            <div
              className="
                text-[9px]
                font-[600]
                uppercase
                tracking-[0.06em]
                text-[#7c8796]
              "
            >
              TEST ID
            </div>

            <div
              className="
                text-[9px]
                font-[600]
                uppercase
                tracking-[0.06em]
                text-[#7c8796]
              "
            >
              TEST TITLE
            </div>

            <div
              className="
                text-[9px]
                font-[600]
                uppercase
                tracking-[0.06em]
                text-[#7c8796]
              "
            >
              TYPE
            </div>

            <div
              className="
                text-[9px]
                font-[600]
                uppercase
                tracking-[0.06em]
                text-[#7c8796]
              "
            >
              LINKED TASK
            </div>

            <div
              className="
                text-[9px]
                font-[600]
                uppercase
                tracking-[0.06em]
                text-[#7c8796]
              "
            >
              PRIORITY
            </div>

            <div
              className="
                text-[9px]
                font-[600]
                uppercase
                tracking-[0.06em]
                text-[#7c8796]
              "
            >
              STATUS
            </div>

            <div
              className="
                text-[9px]
                font-[600]
                uppercase
                tracking-[0.06em]
                text-[#7c8796]
              "
            >
              DATE
            </div>

            <div
              className="
                text-[9px]
                font-[600]
                uppercase
                tracking-[0.06em]
                text-[#7c8796]
              "
            >
              ACTION
            </div>
          </div>

          {/* ========================================================
              TABLE ROWS
          ======================================================== */}

          {testCases.map((testCase, index) => (
            <div
              key={testCase.id}
              className={`
                grid
                grid-cols-[110px_minmax(300px,1fr)_120px_130px_110px_120px_100px_95px]
                items-center
                h-[50px]
                px-[12px]
                bg-white
                ${
                  index !== testCases.length - 1
                    ? "border-b border-[#eeeeee]"
                    : ""
                }
              `}
            >
              {/* TEST ID */}

              <div
                className="
                  text-[9px]
                  font-[400]
                  leading-[12px]
                  text-[#8d98a8]
                "
              >
                {testCase.id}
              </div>

              {/* TEST TITLE */}

              <div
                className="
                  min-w-0
                  pr-[12px]
                "
              >
                <p
                  className="
                    text-[11px]
                    font-[600]
                    leading-[14px]
                    text-[#111827]
                    truncate
                  "
                >
                  {testCase.title}
                </p>
              </div>

              {/* TYPE */}

              <div>
                <span
                  className="
                    inline-flex
                    items-center
                    justify-center
                    rounded-[6px]
                    bg-[#f4f6f8]
                    px-[8px]
                    py-[4px]
                    text-[9px]
                    font-[500]
                    leading-[10px]
                    text-[#657184]
                  "
                >
                  {testCase.type}
                </span>
              </div>

              {/* LINKED TASK */}

              <div
                className="
                  text-[9px]
                  font-[400]
                  leading-[12px]
                  text-[#8d98a8]
                "
              >
                {testCase.linkedTask}
              </div>

              {/* PRIORITY */}

              <div>
                <span
                  className={`
                    inline-flex
                    items-center
                    justify-center
                    rounded-[6px]
                    px-[8px]
                    py-[4px]
                    text-[9px]
                    font-[600]
                    leading-[10px]
                    ${getPriorityClass(testCase.priority)}
                  `}
                >
                  {testCase.priority}
                </span>
              </div>

              {/* STATUS */}

              <div>
                <span
                  className={`
                    inline-flex
                    items-center
                    justify-center
                    rounded-[6px]
                    px-[8px]
                    py-[4px]
                    text-[9px]
                    font-[600]
                    leading-[10px]
                    ${getStatusClass(testCase.status)}
                  `}
                >
                  {testCase.status}
                </span>
              </div>

              {/* DATE */}

              <div
                className="
                  text-[9px]
                  font-[400]
                  leading-[12px]
                  text-[#8d98a8]
                "
              >
                {testCase.date}
              </div>

              {/* ACTION */}

              <div className="flex items-center gap-[6px]">
                {/* PASS */}

                {testCase.status !== "Passed" && (
                  <button
                    type="button"
                    className="
                      flex
                      h-[24px]
                      items-center
                      justify-center
                      rounded-[6px]
                      border
                      border-[#b9ead4]
                      bg-[#f0fbf6]
                      px-[9px]
                      text-[9px]
                      font-[600]
                      leading-[10px]
                      text-[#20b978]
                      transition
                      hover:bg-[#e5f8ef]
                    "
                  >
                    Pass
                  </button>
                )}

                {/* FAIL */}

                <button
                  type="button"
                  className="
                    flex
                    h-[24px]
                    items-center
                    justify-center
                    rounded-[6px]
                    border
                    border-[#ffc9c9]
                    bg-[#fff4f4]
                    px-[9px]
                    text-[9px]
                    font-[600]
                    leading-[10px]
                    text-[#ff4b4b]
                    transition
                    hover:bg-[#ffeaea]
                  "
                >
                  Fail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QATestCases;