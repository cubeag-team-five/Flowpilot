import React, { useState } from "react";
import {
  LayoutDashboard,
  ClipboardCheck,
  Bug,
  BarChart3,
  FileText,
  Bell,
  Search,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import QADashboardView from "./QADashboardView";
import QATestCases from "./QATestCases";
import QABugReports from "./QABugReports";
import QATestCoverage from "./QATestCoverage";
import QAReports from "./QAReports";

interface QALayoutProps {
  onLogout?: () => void;
}

type QASection =
  | "dashboard"
  | "tasks"
  | "bugs"
  | "coverage"
  | "reports";

const QALayout: React.FC<QALayoutProps> = ({ onLogout }) => {
  const [activeSection, setActiveSection] =
    useState<QASection>("dashboard");

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  /* ============================================================
     NAVIGATION ITEMS
  ============================================================ */

  const navigationItems = [
    {
      id: "dashboard" as QASection,
      label: "QA Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "tasks" as QASection,
      label: "My Test Tasks",
      icon: ClipboardCheck,
    },
    {
      id: "bugs" as QASection,
      label: "Bug Reports",
      icon: Bug,
    },
    {
      id: "coverage" as QASection,
      label: "Test Coverage",
      icon: BarChart3,
    },
    {
      id: "reports" as QASection,
      label: "Quality Reports",
      icon: FileText,
    },
  ];

  /* ============================================================
     NAVIGATION HANDLER
  ============================================================ */

  const handleNavigation = (section: QASection) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  /* ============================================================
     PAGE TITLE
  ============================================================ */

  const getPageTitle = () => {
    switch (activeSection) {
      case "dashboard":
        return "QA Dashboard";

      case "tasks":
        return "My Test Tasks";

      case "bugs":
        return "Bug Reports";

      case "coverage":
        return "Test Coverage";

      case "reports":
        return "Quality Reports";

      default:
        return "QA Dashboard";
    }
  };

  /* ============================================================
     PAGE RENDER
  ============================================================ */

  const renderPage = () => {
    switch (activeSection) {
      case "dashboard":
        return <QADashboardView />;

      case "tasks":
        return <QATestCases />;

      case "bugs":
        return <QABugReports />;

      case "coverage":
        return <QATestCoverage />;

      case "reports":
        return <QAReports />;

      default:
        return <QADashboardView />;
    }
  };

  return (
    <div
      className="min-h-screen bg-[#f5f6f8] text-[#111827]"
      style={{
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontSize: "14px",
      }}
    >
      {/* ========================================================
          DESKTOP SIDEBAR
      ========================================================= */}

      <aside
        className="
          fixed
          left-0
          top-0
          z-40
          hidden
          h-screen
          w-[206px]
          flex-col
          bg-[#0d1018]
          text-white
          lg:flex
        "
      >
        {/* ======================================================
            LOGO AREA
        ====================================================== */}

        <div
          className="
            flex
            h-[68px]
            shrink-0
            items-center
            border-b
            border-[#1b1f28]
            px-[16px]
          "
        >
          <div className="flex items-center gap-[10px]">

            {/* LOGO */}

            <div
              className="
                flex
                h-[32px]
                w-[32px]
                items-center
                justify-center
                rounded-[9px]
                bg-[#3ddc97]
              "
            >
              <div className="grid grid-cols-2 gap-[3px]">
                <span className="h-[6px] w-[6px] rounded-[2px] bg-white" />
                <span className="h-[6px] w-[6px] rounded-[2px] bg-white" />
                <span className="h-[6px] w-[6px] rounded-[2px] bg-white" />
                <span className="h-[6px] w-[6px] rounded-[2px] bg-white" />
              </div>
            </div>

            {/* BRAND */}

            <div className="leading-none">
              <h1
                className="
                  text-[14px]
                  font-[700]
                  leading-[16px]
                  tracking-[-0.2px]
                  text-white
                "
              >
                IPMT
              </h1>

              <p
                className="
                  mt-[2px]
                  text-[7px]
                  font-[600]
                  leading-[9px]
                  tracking-[0.3px]
                  text-[#667080]
                "
              >
                PLATFORM V2.0
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================
            QA ENGINEER BADGE
        ====================================================== */}

        <div
          className="
            h-[54px]
            shrink-0
            border-b
            border-[#1b1f28]
            px-[16px]
            py-[10px]
          "
        >
          <div
            className="
              inline-flex
              h-[25px]
              items-center
              gap-[6px]
              rounded-[6px]
              border
              border-[#24d69a]/40
              bg-[#24d69a]/10
              px-[9px]
            "
          >
            <span
              className="
                h-[6px]
                w-[6px]
                rounded-full
                bg-[#32d6a0]
              "
            />

            <span
              className="
                text-[8px]
                font-[700]
                leading-[10px]
                tracking-[0.25px]
                text-[#32d6a0]
              "
            >
              QA ENGINEER
            </span>
          </div>
        </div>

        {/* ======================================================
            DESKTOP NAVIGATION
        ====================================================== */}

        <nav className="flex-1 px-[7px] py-[13px]">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigation(item.id)}
                className={`
                  mb-[2px]
                  flex
                  h-[34px]
                  w-full
                  items-center
                  gap-[10px]
                  rounded-[7px]
                  border-l-[2px]
                  px-[11px]
                  text-left
                  transition-colors
                  duration-150

                  ${
                    isActive
                      ? `
                        border-[#36d99d]
                        bg-[#12302d]
                        text-[#32d6a0]
                        font-[600]
                      `
                      : `
                        border-transparent
                        text-[#8c95a5]
                        font-[400]
                        hover:bg-[#151923]
                        hover:text-[#d7dbe2]
                      `
                  }
                `}
              >
                <Icon
                  size={15}
                  strokeWidth={1.8}
                  className={
                    isActive
                      ? "text-[#32d6a0]"
                      : "text-[#697383]"
                  }
                />

                <span
                  className="
                    text-[10px]
                    leading-[13px]
                    tracking-[0px]
                  "
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* ======================================================
            USER AREA
        ====================================================== */}

        <div
          className="
            shrink-0
            border-t
            border-[#1b1f28]
            px-[9px]
            py-[10px]
          "
        >
          <div
            className="
              flex
              h-[46px]
              items-center
              justify-between
              rounded-[7px]
              px-[7px]
            "
          >
            <div className="flex items-center gap-[9px]">

              {/* PROFILE */}

              <div
                className="
                  flex
                  h-[31px]
                  w-[31px]
                  items-center
                  justify-center
                  rounded-[8px]
                  bg-[#20d698]
                  text-[9px]
                  font-[700]
                  text-white
                "
              >
                PR
              </div>

              {/* USER INFO */}

              <div>
                <p
                  className="
                    text-[9px]
                    font-[700]
                    leading-[12px]
                    text-white
                  "
                >
                  Priya Rajan
                </p>

                <p
                  className="
                    mt-[1px]
                    text-[8px]
                    font-[400]
                    leading-[10px]
                    text-[#6f7785]
                  "
                >
                  Quality
                </p>
              </div>
            </div>

            {/* LOGOUT */}

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                title="Logout"
                className="
                  flex
                  h-[27px]
                  w-[27px]
                  items-center
                  justify-center
                  rounded-[6px]
                  text-[#6f7785]
                  transition
                  hover:bg-white/10
                  hover:text-white
                "
              >
                <LogOut
                  size={13}
                  strokeWidth={1.8}
                />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ========================================================
          MOBILE SIDEBAR
      ========================================================= */}

      {mobileMenuOpen && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/50
            lg:hidden
          "
          onClick={() => setMobileMenuOpen(false)}
        >
          <aside
            className="
              h-full
              w-[260px]
              bg-[#0d1018]
              text-white
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* MOBILE HEADER */}

            <div
              className="
                flex
                h-[68px]
                items-center
                justify-between
                border-b
                border-[#1b1f28]
                px-[16px]
              "
            >
              <div className="flex items-center gap-[10px]">

                <div
                  className="
                    flex
                    h-[32px]
                    w-[32px]
                    items-center
                    justify-center
                    rounded-[9px]
                    bg-[#3ddc97]
                  "
                >
                  <div className="grid grid-cols-2 gap-[3px]">
                    <span className="h-[6px] w-[6px] rounded-[2px] bg-white" />
                    <span className="h-[6px] w-[6px] rounded-[2px] bg-white" />
                    <span className="h-[6px] w-[6px] rounded-[2px] bg-white" />
                    <span className="h-[6px] w-[6px] rounded-[2px] bg-white" />
                  </div>
                </div>

                <div>
                  <h1
                    className="
                      text-[14px]
                      font-[700]
                      leading-[16px]
                    "
                  >
                    IPMT
                  </h1>

                  <p
                    className="
                      mt-[2px]
                      text-[7px]
                      font-[600]
                      leading-[9px]
                      text-[#667080]
                    "
                  >
                    PLATFORM V2.0
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="text-[#8c95a5]"
              >
                <X
                  size={19}
                  strokeWidth={1.8}
                />
              </button>
            </div>

            {/* MOBILE BADGE */}

            <div
              className="
                border-b
                border-[#1b1f28]
                px-[16px]
                py-[10px]
              "
            >
              <div
                className="
                  inline-flex
                  h-[25px]
                  items-center
                  gap-[6px]
                  rounded-[6px]
                  border
                  border-[#24d69a]/40
                  bg-[#24d69a]/10
                  px-[9px]
                "
              >
                <span
                  className="
                    h-[6px]
                    w-[6px]
                    rounded-full
                    bg-[#32d6a0]
                  "
                />

                <span
                  className="
                    text-[8px]
                    font-[700]
                    leading-[10px]
                    text-[#32d6a0]
                  "
                >
                  QA ENGINEER
                </span>
              </div>
            </div>

            {/* MOBILE NAV */}

            <nav className="px-[7px] py-[13px]">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      handleNavigation(item.id)
                    }
                    className={`
                      mb-[2px]
                      flex
                      h-[34px]
                      w-full
                      items-center
                      gap-[10px]
                      rounded-[7px]
                      border-l-[2px]
                      px-[11px]
                      text-left

                      ${
                        isActive
                          ? "border-[#36d99d] bg-[#12302d] text-[#32d6a0]"
                          : "border-transparent text-[#8c95a5]"
                      }
                    `}
                  >
                    <Icon
                      size={15}
                      strokeWidth={1.8}
                    />

                    <span
                      className="
                        text-[10px]
                        leading-[13px]
                      "
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* ========================================================
          MAIN AREA
      ========================================================= */}

      <div className="min-h-screen lg:ml-[206px]">

        {/* ======================================================
            TOP HEADER
        ====================================================== */}

        <header
          className="
            sticky
            top-0
            z-30
            flex
            h-[52px]
            items-center
            justify-between
            border-b
            border-[#e5e7eb]
            bg-white
            px-[16px]
            sm:px-[20px]
            lg:px-[24px]
          "
        >
          {/* LEFT SIDE */}

          <div className="flex items-center gap-[10px]">

            {/* MOBILE MENU */}

            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen(true)
              }
              className="
                flex
                h-[30px]
                w-[30px]
                items-center
                justify-center
                rounded-[6px]
                border
                border-[#e5e7eb]
                text-[#6b7280]
                lg:hidden
              "
            >
              <Menu
                size={17}
                strokeWidth={1.8}
              />
            </button>

            {/* PAGE TITLE */}

            <div>
              <h1
                className="
                  text-[14px]
                  font-[700]
                  leading-[17px]
                  tracking-[-0.15px]
                  text-[#111827]
                "
              >
                {getPageTitle()}
              </h1>

              <p
                className="
                  mt-[1px]
                  text-[8px]
                  font-[400]
                  leading-[11px]
                  text-[#9aa1ad]
                "
              >
                Monday, 17 August 2026
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="flex items-center gap-[8px]">

            {/* SEARCH */}

            <div
              className="
                hidden
                h-[31px]
                w-[158px]
                items-center
                gap-[7px]
                rounded-[8px]
                border
                border-[#e4e7eb]
                bg-[#fafbfc]
                px-[10px]
                sm:flex
              "
            >
              <Search
                size={13}
                strokeWidth={1.7}
                className="text-[#9ca3af]"
              />

              <input
                type="text"
                placeholder="Search..."
                className="
                  w-full
                  bg-transparent
                  text-[9px]
                  font-[400]
                  leading-none
                  text-[#374151]
                  outline-none
                  placeholder:text-[#a1a8b3]
                "
              />
            </div>

            {/* NOTIFICATION */}

            <button
              type="button"
              className="
                relative
                flex
                h-[31px]
                w-[31px]
                items-center
                justify-center
                rounded-[8px]
                border
                border-[#e4e7eb]
                bg-white
                text-[#7c8796]
              "
            >
              <Bell
                size={14}
                strokeWidth={1.7}
              />

              <span
                className="
                  absolute
                  right-[6px]
                  top-[6px]
                  h-[5px]
                  w-[5px]
                  rounded-full
                  bg-[#f59e0b]
                "
              />
            </button>

            {/* PROFILE */}

            <div
              className="
                flex
                h-[31px]
                w-[31px]
                items-center
                justify-center
                rounded-[8px]
                bg-[#c9f7e5]
                text-[9px]
                font-[700]
                text-[#16a978]
              "
            >
              PR
            </div>
          </div>
        </header>

        {/* ======================================================
            PAGE CONTENT
        ====================================================== */}

        <main
          className="
            min-h-[calc(100vh-52px)]
            bg-[#f5f6f8]
          "
        >
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export { QALayout };

export default QALayout;