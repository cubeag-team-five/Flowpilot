import React, { useState } from "react";
import {
  ClipboardList,
  Bug,
  BarChart3,
  RefreshCw,
  Clock3,
  Trophy,
} from "lucide-react";

interface ReportCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  buttonBg: string;
  buttonText: string;
  buttonBorder: string;
}

const QAReports: React.FC = () => {
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);

  const reports: ReportCard[] = [
    {
      title: "Sprint Test Summary",
      description:
        "Pass/fail/blocked breakdown for Sprint 12, organized by module",
      icon: <ClipboardList size={20} strokeWidth={1.7} />,
      iconBg: "bg-[#EFFAF5]",
      iconColor: "text-[#61D6A1]",
      buttonBg: "bg-[#F7FCF9]",
      buttonText: "text-[#61CFA0]",
      buttonBorder: "border-[#D7F2E5]",
    },
    {
      title: "Bug Density Report",
      description:
        "Number of bugs per feature module and developer",
      icon: <Bug size={20} strokeWidth={1.7} />,
      iconBg: "bg-[#FFF1F2]",
      iconColor: "text-[#69D5A5]",
      buttonBg: "bg-[#FFF8F8]",
      buttonText: "text-[#F15B5C]",
      buttonBorder: "border-[#FFD8D9]",
    },
    {
      title: "Coverage Report",
      description:
        "Test case coverage % per module with trends",
      icon: <BarChart3 size={20} strokeWidth={1.7} />,
      iconBg: "bg-[#EFFAF5]",
      iconColor: "text-[#61D2A0]",
      buttonBg: "bg-[#F7FCF9]",
      buttonText: "text-[#4FC58D]",
      buttonBorder: "border-[#D7F0E2]",
    },
    {
      title: "Regression Report",
      description:
        "Which old bugs re-appeared this sprint and why",
      icon: <RefreshCw size={20} strokeWidth={1.7} />,
      iconBg: "bg-[#F6F0FF]",
      iconColor: "text-[#A786F7]",
      buttonBg: "bg-[#FBF8FF]",
      buttonText: "text-[#A785F3]",
      buttonBorder: "border-[#E9DCFF]",
    },
    {
      title: "Test Execution Log",
      description:
        "Detailed log of all test runs with timestamps and testers",
      icon: <Clock3 size={20} strokeWidth={1.7} />,
      iconBg: "bg-[#FFF7EA]",
      iconColor: "text-[#6B7280]",
      buttonBg: "bg-[#FFFBF4]",
      buttonText: "text-[#F59E0B]",
      buttonBorder: "border-[#FCE6B8]",
    },
    {
      title: "Quality Scorecard",
      description:
        "Overall sprint quality score: defect escape rate, coverage, velocity",
      icon: <Trophy size={20} strokeWidth={1.7} />,
      iconBg: "bg-[#EFFBFB]",
      iconColor: "text-[#F59E0B]",
      buttonBg: "bg-[#F6FCFC]",
      buttonText: "text-[#4FCFC3]",
      buttonBorder: "border-[#D6F1EE]",
    },
  ];

  const handleGenerate = (title: string) => {
    setGeneratedReport(title);

    window.setTimeout(() => {
      setGeneratedReport(null);
    }, 1800);
  };

  return (
    <div
      className="w-full"
      style={{
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* REPORT GRID */}
      <div
        className="
          grid
          w-full
          grid-cols-1
          gap-[14px]
          sm:grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {reports.map((report) => (
          <div
            key={report.title}
            className="
              box-border
              h-[173px]
              w-full
              rounded-[14px]
              border
              border-[#E8EDF0]
              bg-white
              px-[19px]
              py-[19px]
              shadow-[0_2px_8px_rgba(0,0,0,0.035)]
              transition-all
              duration-200
              hover:shadow-[0_4px_14px_rgba(0,0,0,0.06)]
            "
          >
            {/* ICON */}
            <div
              className={`
                flex
                h-[38px]
                w-[38px]
                items-center
                justify-center
                rounded-[11px]
                ${report.iconBg}
                ${report.iconColor}
              `}
            >
              {report.icon}
            </div>

            {/* TITLE */}
            <h2
              className="
                m-0
                mt-[13px]
                text-[12px]
                font-[700]
                leading-[15px]
                tracking-[-0.05px]
                text-[#111827]
              "
            >
              {report.title}
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                m-0
                mt-[5px]
                text-[10px]
                font-[400]
                leading-[14px]
                tracking-[0]
                text-[#9CA3AF]
              "
            >
              {report.description}
            </p>

            {/* BUTTON */}
            <button
              type="button"
              onClick={() => handleGenerate(report.title)}
              className={`
                mt-[14px]
                inline-flex
                h-[32px]
                items-center
                justify-center
                rounded-[8px]
                border
                px-[13px]
                py-0
                text-[10px]
                font-[600]
                leading-[12px]
                tracking-[0]
                outline-none
                transition-all
                duration-200
                hover:opacity-80
                active:scale-[0.98]
                focus:outline-none
                ${report.buttonBg}
                ${report.buttonText}
                ${report.buttonBorder}
              `}
            >
              {generatedReport === report.title
                ? "Generated"
                : "Generate Report"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QAReports;