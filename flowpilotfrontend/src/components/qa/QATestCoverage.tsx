import React from "react";

interface CoverageModule {
  name: string;
  cases: number;
  percentage: number;
  color: "green" | "orange" | "red";
}

const QATestCoverage: React.FC = () => {
  const modules: CoverageModule[] = [
    {
      name: "Authentication & JWT",
      cases: 12,
      percentage: 92,
      color: "green",
    },
    {
      name: "Task Management",
      cases: 18,
      percentage: 78,
      color: "orange",
    },
    {
      name: "Sprint Board",
      cases: 14,
      percentage: 65,
      color: "orange",
    },
    {
      name: "File Upload / S3",
      cases: 8,
      percentage: 55,
      color: "red",
    },
    {
      name: "Notifications",
      cases: 10,
      percentage: 40,
      color: "red",
    },
    {
      name: "Analytics / Charts",
      cases: 9,
      percentage: 88,
      color: "green",
    },
  ];

  const getProgressColor = (color: CoverageModule["color"]) => {
    switch (color) {
      case "green":
        return "bg-[#5ED6A0]";

      case "orange":
        return "bg-[#F59E0B]";

      case "red":
        return "bg-[#F04444]";

      default:
        return "bg-gray-300";
    }
  };

  const getPercentageColor = (color: CoverageModule["color"]) => {
    switch (color) {
      case "green":
        return "text-[#18B968]";

      case "orange":
        return "text-[#F59E0B]";

      case "red":
        return "text-[#F04444]";

      default:
        return "text-gray-500";
    }
  };

  return (
    <div
      className="w-full"
      style={{
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* =========================================================
          SUMMARY CARDS
          ========================================================= */}

      <div
        className="
          grid
          w-full
          grid-cols-1
          gap-[13px]
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {/* TOTAL TEST CASES */}

        <div
          className="
            box-border
            h-[82px]
            rounded-[12px]
            border
            border-[#E9EDF0]
            bg-white
            px-[19px]
            py-[14px]
            shadow-[0_2px_8px_rgba(0,0,0,0.035)]
          "
        >
          <p
            className="
              m-0
              text-[9px]
              font-[600]
              uppercase
              leading-[12px]
              tracking-[0.65px]
              text-[#9299A3]
            "
          >
            Total Test Cases
          </p>

          <p
            className="
              m-0
              mt-[8px]
              text-[23px]
              font-[700]
              leading-[24px]
              tracking-[-0.4px]
              text-[#5ED6A0]
            "
          >
            48
          </p>
        </div>

        {/* EXECUTED */}

        <div
          className="
            box-border
            h-[82px]
            rounded-[12px]
            border
            border-[#E9EDF0]
            bg-white
            px-[19px]
            py-[14px]
            shadow-[0_2px_8px_rgba(0,0,0,0.035)]
          "
        >
          <p
            className="
              m-0
              text-[9px]
              font-[600]
              uppercase
              leading-[12px]
              tracking-[0.65px]
              text-[#9299A3]
            "
          >
            Executed
          </p>

          <p
            className="
              m-0
              mt-[8px]
              text-[23px]
              font-[700]
              leading-[24px]
              tracking-[-0.4px]
              text-[#20B957]
            "
          >
            40
          </p>
        </div>

        {/* PASSED */}

        <div
          className="
            box-border
            h-[82px]
            rounded-[12px]
            border
            border-[#E9EDF0]
            bg-white
            px-[19px]
            py-[14px]
            shadow-[0_2px_8px_rgba(0,0,0,0.035)]
          "
        >
          <p
            className="
              m-0
              text-[9px]
              font-[600]
              uppercase
              leading-[12px]
              tracking-[0.65px]
              text-[#9299A3]
            "
          >
            Passed
          </p>

          <p
            className="
              m-0
              mt-[8px]
              text-[23px]
              font-[700]
              leading-[24px]
              tracking-[-0.4px]
              text-[#20B957]
            "
          >
            34
          </p>
        </div>

        {/* FAILED / BLOCKED */}

        <div
          className="
            box-border
            h-[82px]
            rounded-[12px]
            border
            border-[#E9EDF0]
            bg-white
            px-[19px]
            py-[14px]
            shadow-[0_2px_8px_rgba(0,0,0,0.035)]
          "
        >
          <p
            className="
              m-0
              text-[9px]
              font-[600]
              uppercase
              leading-[12px]
              tracking-[0.65px]
              text-[#9299A3]
            "
          >
            Failed / Blocked
          </p>

          <p
            className="
              m-0
              mt-[8px]
              text-[23px]
              font-[700]
              leading-[24px]
              tracking-[-0.4px]
              text-[#F04444]
            "
          >
            6
          </p>
        </div>
      </div>

      {/* =========================================================
          COVERAGE BY MODULE
          ========================================================= */}

      <div
        className="
          mt-[18px]
          box-border
          w-full
          rounded-[13px]
          border
          border-[#E9EDF0]
          bg-white
          px-[19px]
          py-[19px]
          shadow-[0_2px_8px_rgba(0,0,0,0.035)]
        "
      >
        {/* SECTION TITLE */}

        <h2
          className="
            m-0
            text-[12px]
            font-[700]
            leading-[15px]
            tracking-[-0.05px]
            text-[#111827]
          "
        >
          Coverage by Module
        </h2>

        {/* MODULE LIST */}

        <div className="mt-[14px] space-y-[11px]">
          {modules.map((module) => (
            <div key={module.name} className="w-full">
              {/* TOP ROW */}

              <div
                className="
                  mb-[6px]
                  flex
                  w-full
                  items-center
                  justify-between
                "
              >
                {/* MODULE NAME */}

                <p
                  className="
                    m-0
                    text-[10px]
                    font-[600]
                    leading-[13px]
                    text-[#1F2937]
                  "
                >
                  {module.name}
                </p>

                {/* CASES + PERCENTAGE */}

                <div className="flex shrink-0 items-center gap-[9px]">
                  <span
                    className="
                      text-[9px]
                      font-[400]
                      leading-[12px]
                      text-[#A1A7AF]
                    "
                  >
                    {module.cases} cases
                  </span>

                  <span
                    className={`
                      text-[10px]
                      font-[700]
                      leading-[12px]
                      ${getPercentageColor(module.color)}
                    `}
                  >
                    {module.percentage}%
                  </span>
                </div>
              </div>

              {/* PROGRESS BAR */}

              <div
                className="
                  h-[6px]
                  w-full
                  overflow-hidden
                  rounded-full
                  bg-[#F0F1F3]
                "
              >
                <div
                  className={`
                    h-full
                    rounded-full
                    ${getProgressColor(module.color)}
                  `}
                  style={{
                    width: `${module.percentage}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QATestCoverage;