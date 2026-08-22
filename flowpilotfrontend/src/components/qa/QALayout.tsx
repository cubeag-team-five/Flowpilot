import React, { useState } from "react";
import {
  LayoutGrid,
  CheckSquare,
  AlertTriangle,
  Activity,
  FileText,
  Bell,
  LogOut,
  Search,
} from "lucide-react";

import QADashboardView from "./QADashboardView";
import QATestCases from "./QATestCases";
import QABugReports from "./QABugReports";
import QATestCoverage from "./QATestCoverage";
import QAReports from "./QAReports";

interface QALayoutProps {
  onLogout?: () => void;
}

const QALayout: React.FC<QALayoutProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("QA Dashboard");

  /*
   * GLOBAL QA SEARCH
   *
   * Sends search text to QA pages such as
   * QABugReports.tsx.
   */
  const [globalSearch, setGlobalSearch] = useState("");

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New bug reported",
      message: "A new bug has been added to QA bug reports.",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "Test task updated",
      message: "A test task has been updated.",
      time: "15 min ago",
      unread: true,
    },
    {
      id: 3,
      title: "Test coverage updated",
      message: "Test coverage information has been updated.",
      time: "1 hour ago",
      unread: false,
    },
  ]);

  const currentDate = "Friday, 21 August 2026";

  /*
   * QA USER INFORMATION
   */
  const qaUser = {
    name: "Priya Rajan",
    department: "Quality",
    role: "QA ENGINEER",
    avatar: "PR",
  };

  /*
   * QA NAVIGATION ITEMS
   */
  const navItems = [
    {
      name: "QA Dashboard",
      icon: <LayoutGrid size={18} />,
    },
    {
      name: "My Test Tasks",
      icon: <CheckSquare size={18} />,
    },
    {
      name: "Bug Reports",
      icon: <AlertTriangle size={18} />,
    },
    {
      name: "Test Coverage",
      icon: <Activity size={18} />,
    },
    {
      name: "Quality Reports",
      icon: <FileText size={18} />,
    },
  ];

  /*
   * PAGE TITLE
   */
  const getPageTitle = () => {
    switch (activeTab) {
      case "My Test Tasks":
        return "My Test Tasks";

      case "Bug Reports":
        return "Bug Reports";

      case "Test Coverage":
        return "Test Coverage";

      case "Quality Reports":
        return "Quality Reports";

      default:
        return "QA Dashboard";
    }
  };

  /*
   * CHANGE QA PAGE
   */
  const handleNavigation = (tabName: string) => {
    setActiveTab(tabName);

    /*
     * Clear top search when changing QA pages.
     */
    setGlobalSearch("");

    window.dispatchEvent(
      new CustomEvent("qa-global-search", {
        detail: "",
      })
    );
  };

  /*
   * RENDER QA CONTENT
   */
  const renderQAContent = () => {
    switch (activeTab) {
      case "QA Dashboard":
        return <QADashboardView />;

      case "My Test Tasks":
        return <QATestCases />;

      case "Bug Reports":
        return <QABugReports />;

      case "Test Coverage":
        return <QATestCoverage />;

      case "Quality Reports":
        return <QAReports />;

      default:
        return <QADashboardView />;
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-[#f8fafc] text-slate-800 font-sans flex">

      {/* =========================================================
          QA SIDEBAR
      ========================================================= */}

      <aside
        className="
          h-screen
          w-64
          shrink-0
          bg-[#090d16]
          text-white
          flex
          flex-col
          justify-between
          p-5
          border-r
          border-slate-800/60
          overflow-hidden
        "
      >

        <div className="min-h-0 flex flex-col">

          {/* LOGO */}

          <div className="flex items-center gap-2.5 mb-6 px-2 shrink-0">

            <div
              className="
                w-8
                h-8
                rounded-xl
                bg-emerald-500
                flex
                items-center
                justify-center
                text-white
                font-bold
                shadow-md
                shadow-emerald-500/20
              "
            >
              <LayoutGrid size={18} />
            </div>

            <div>

              <div
                className="
                  font-extrabold
                  text-base
                  tracking-tight
                  leading-none
                  text-white
                "
              >
                Flowpilot
              </div>

              <div
                className="
                  text-[10px]
                  font-bold
                  text-slate-500
                  uppercase
                  tracking-widest
                  mt-0.5
                "
              >
                PLATFORM V2.0
              </div>

            </div>

          </div>

          {/* QA ROLE BADGE */}

          <div className="mb-6 px-2 shrink-0">

            <span
              className="
                inline-block
                w-full
                text-center
                text-[10px]
                font-black
                tracking-wider
                px-3
                py-1.5
                rounded-lg
                border
                border-teal-500/30
                bg-teal-500/10
                text-teal-400
              "
            >
              ● QA ENGINEER
            </span>

          </div>

          {/* QA NAVIGATION */}

          <nav className="flex flex-col gap-1 overflow-y-auto pr-1">

            {navItems.map((item) => {

              const isActive =
                activeTab === item.name;

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() =>
                    handleNavigation(item.name)
                  }
                  className={`
                    flex
                    items-center
                    gap-3
                    px-3.5
                    py-2.5
                    rounded-xl
                    text-xs
                    font-bold
                    transition-all
                    cursor-pointer
                    text-left
                    shrink-0

                    ${
                      isActive
                        ? "bg-white/10 text-white shadow-xs border border-white/10"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }
                  `}
                >

                  <span
                    className={
                      isActive
                        ? "text-emerald-400"
                        : "text-slate-400"
                    }
                  >
                    {item.icon}
                  </span>

                  <span>
                    {item.name}
                  </span>

                </button>
              );

            })}

          </nav>

        </div>

        {/* =====================================================
            QA USER AREA
        ===================================================== */}

        <div
          className="
            pt-4
            mt-4
            border-t
            border-slate-800/80
            flex
            items-center
            justify-between
            px-2
            shrink-0
          "
        >

          <div className="flex items-center gap-2.5 min-w-0">

            <div
              className="
                w-8
                h-8
                rounded-full
                bg-teal-500
                text-white
                flex
                items-center
                justify-center
                font-extrabold
                text-xs
                shrink-0
                shadow-sm
              "
            >
              {qaUser.avatar}
            </div>

            <div className="min-w-0">

              <div
                className="
                  text-xs
                  font-bold
                  text-white
                  truncate
                "
              >
                {qaUser.name}
              </div>

              <div
                className="
                  text-[10px]
                  text-slate-400
                  truncate
                "
              >
                {qaUser.department}
              </div>

            </div>

          </div>

          <button
            type="button"
            onClick={onLogout}
            title="Log out"
            className="
              w-8
              h-8
              rounded-xl
              bg-slate-900
              border
              border-slate-800
              text-slate-400
              hover:text-rose-400
              hover:bg-rose-500/10
              flex
              items-center
              justify-center
              transition-colors
              cursor-pointer
              shrink-0
            "
          >
            <LogOut size={14} />
          </button>

        </div>

      </aside>

      {/* =========================================================
          QA MAIN CONTENT
      ========================================================= */}

      <main
        className="
          flex-1
          min-w-0
          min-h-0
          h-screen
          overflow-y-auto
          overflow-x-hidden
          bg-[#f8fafc]
        "
      >

        {/* =====================================================
            QA HEADER
        ===================================================== */}

        <header
          className="
            h-[76px]
            bg-white
            border-b
            border-slate-200/80
            px-8
            flex
            items-center
            justify-between
            sticky
            top-0
            z-30
            shadow-2xs
          "
        >

          {/* PAGE TITLE */}

          <div>

            <h1
              className="
                text-xl
                font-extrabold
                text-slate-900
                tracking-tight
              "
            >
              {getPageTitle()}
            </h1>

            <div
              className="
                text-xs
                text-slate-400
                font-medium
              "
            >
              {currentDate}
            </div>

          </div>

          {/* HEADER RIGHT */}

          <div className="flex items-center gap-4">

            {/* =================================================
                QA GLOBAL SEARCH
            ================================================= */}

            <div className="relative w-64 hidden sm:block">

              <Search
                size={14}
                className="
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                placeholder="Search..."
                value={globalSearch}
                onChange={(e) => {

                  const value =
                    e.target.value;

                  setGlobalSearch(value);

                  /*
                   * Send search value to QA components.
                   *
                   * QABugReports listens to:
                   * qa-global-search
                   */

                  window.dispatchEvent(
                    new CustomEvent(
                      "qa-global-search",
                      {
                        detail: value,
                      }
                    )
                  );

                }}
                className="
                  w-full
                  bg-slate-50
                  border
                  border-slate-200/80
                  rounded-full
                  pl-9
                  pr-4
                  py-1.5
                  text-xs
                  text-slate-800
                  focus:outline-none
                  focus:border-emerald-500
                  transition-colors
                "
              />

            </div>

            {/* =================================================
                NOTIFICATIONS
            ================================================= */}

            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setShowNotifications(
                    (previous) => !previous
                  )
                }
                aria-label="Notifications"
                aria-expanded={showNotifications}
                className="
                  relative
                  w-9
                  h-9
                  rounded-full
                  bg-slate-50
                  border
                  border-slate-200/80
                  flex
                  items-center
                  justify-center
                  text-slate-600
                  hover:text-slate-900
                  hover:bg-slate-100
                  transition-colors
                  cursor-pointer
                "
              >

                <Bell size={16} />

                {notifications.some(
                  (notification) =>
                    notification.unread
                ) && (
                  <span
                    className="
                      absolute
                      top-0
                      right-0
                      w-2.5
                      h-2.5
                      bg-rose-500
                      rounded-full
                      border-2
                      border-white
                    "
                  />
                )}

              </button>

              {/* NOTIFICATION DROPDOWN */}

              {showNotifications && (

                <div
                  className="
                    absolute
                    right-0
                    top-12
                    w-80
                    bg-white
                    border
                    border-slate-200
                    rounded-2xl
                    shadow-xl
                    z-50
                    overflow-hidden
                  "
                >

                  <div
                    className="
                      px-4
                      py-3
                      border-b
                      border-slate-100
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <div>

                      <h3
                        className="
                          text-sm
                          font-bold
                          text-slate-900
                        "
                      >
                        Notifications
                      </h3>

                      <p
                        className="
                          text-[10px]
                          text-slate-400
                          mt-0.5
                        "
                      >
                        Recent QA activity
                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setNotifications(
                          (previous) =>
                            previous.map(
                              (notification) => ({
                                ...notification,
                                unread: false,
                              })
                            )
                        )
                      }
                      className="
                        text-[10px]
                        font-semibold
                        text-emerald-600
                        hover:text-emerald-700
                        cursor-pointer
                      "
                    >
                      Mark all as read
                    </button>

                  </div>

                  <div className="max-h-80 overflow-y-auto">

                    {notifications.map(
                      (notification) => (

                        <button
                          key={notification.id}
                          type="button"
                          onClick={() =>
                            setNotifications(
                              (previous) =>
                                previous.map(
                                  (item) =>
                                    item.id ===
                                    notification.id
                                      ? {
                                          ...item,
                                          unread:
                                            false,
                                        }
                                      : item
                                )
                            )
                          }
                          className={`
                            w-full
                            text-left
                            px-4
                            py-3
                            border-b
                            border-slate-100
                            hover:bg-slate-50
                            transition-colors
                            cursor-pointer

                            ${
                              notification.unread
                                ? "bg-emerald-50/40"
                                : "bg-white"
                            }
                          `}
                        >

                          <div className="flex items-start gap-3">

                            <div
                              className={`
                                mt-1
                                w-2
                                h-2
                                rounded-full
                                shrink-0

                                ${
                                  notification.unread
                                    ? "bg-emerald-500"
                                    : "bg-slate-300"
                                }
                              `}
                            />

                            <div className="min-w-0">

                              <div
                                className="
                                  text-xs
                                  font-bold
                                  text-slate-900
                                "
                              >
                                {notification.title}
                              </div>

                              <div
                                className="
                                  text-[11px]
                                  text-slate-500
                                  mt-0.5
                                "
                              >
                                {notification.message}
                              </div>

                              <div
                                className="
                                  text-[10px]
                                  text-slate-400
                                  mt-1
                                "
                              >
                                {notification.time}
                              </div>

                            </div>

                          </div>

                        </button>

                      )
                    )}

                  </div>

                </div>

              )}

            </div>

            {/* =================================================
                QA AVATAR
            ================================================= */}

            <div
              className="
                w-9
                h-9
                rounded-full
                bg-teal-500
                text-white
                flex
                items-center
                justify-center
                font-extrabold
                text-xs
                shadow-sm
                cursor-pointer
              "
              title="QA Engineer"
            >
              {qaUser.avatar}
            </div>

          </div>

        </header>

        {/* =====================================================
            QA PAGE CONTENT
        ===================================================== */}

        <div
          className="
            p-8
            max-w-[1400px]
            w-full
            mx-auto
            space-y-8
          "
        >
          {renderQAContent()}
        </div>

      </main>

    </div>
  );
};

/*
 * Export both ways so App.tsx can use either:
 *
 * import QALayout from "./components/qa/QALayout";
 *
 * OR
 *
 * import { QALayout } from "./components/qa/QALayout";
 */

export { QALayout };

export default QALayout;