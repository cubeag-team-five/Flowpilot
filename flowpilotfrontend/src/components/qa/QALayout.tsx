import React, { useState } from 'react';

import {
  LayoutDashboard,
  ClipboardCheck,
  Bug,
  Activity,
  FileText,
  Menu,
  X,
  Bell,
  LogOut,
} from 'lucide-react';

import { QADashboardView } from './QADashboardView';
import { QATestCases } from './QATestCases';
import { QABugReports } from './QABugReports';
import { QATestCoverage } from './QATestCoverage';
import { QAReports } from './QAReports';

interface Props {
  onLogout?: () => void;
}

const navItems = [
  {
    name: 'QA Dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'My Test Tasks',
    icon: ClipboardCheck,
  },
  {
    name: 'Bug Reports',
    icon: Bug,
  },
  {
    name: 'Test Coverage',
    icon: Activity,
  },
  {
    name: 'Quality Reports',
    icon: FileText,
  },
];

const pageTitles: Record<string, string> = {
  'QA Dashboard': 'QA Dashboard',
  'My Test Tasks': 'My Test Tasks',
  'Bug Reports': 'Bug Reports',
  'Test Coverage': 'Test Coverage',
  'Quality Reports': 'Quality Reports',
};

export const QALayout: React.FC<Props> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('QA Dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);

    // Close mobile sidebar after clicking a menu item
    setMobileMenuOpen(false);
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'My Test Tasks':
        return <QATestCases />;

      case 'Bug Reports':
        return <QABugReports />;

      case 'Test Coverage':
        return <QATestCoverage />;

      case 'Quality Reports':
        return <QAReports />;

      case 'QA Dashboard':
      default:
        return <QADashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside
        className={`
          fixed lg:static
          inset-y-0 left-0
          z-50
          w-64
          bg-[#060d19]
          text-white
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >

        {/* Logo */}
        <div className="px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center">
              <LayoutDashboard size={20} className="text-white" />
            </div>

            <div>
              <div className="text-base font-extrabold">
                Flowpilot
              </div>

              <div className="text-[10px] text-slate-400 tracking-wider">
                PLATFORM V2.0
              </div>
            </div>

          </div>

          {/* Mobile close button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-800"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Role */}
        <div className="px-6 mb-5">
          <div className="w-full rounded-lg border border-cyan-500/40 bg-cyan-500/10 py-2 text-center">
            <span className="text-[11px] font-bold text-cyan-400 tracking-wide">
              • QA ENGINEER
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-2">

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.name)}
                className={`
                  w-full
                  flex
                  items-center
                  gap-3
                  px-3
                  py-3
                  rounded-xl
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  text-left
                  ${
                    isActive
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }
                `}
              >
                <Icon
                  size={18}
                  className={
                    isActive
                      ? 'text-emerald-400'
                      : 'text-slate-400'
                  }
                />

                <span>{item.name}</span>
              </button>
            );
          })}

        </nav>

        {/* Bottom user section */}
        <div className="mt-auto border-t border-slate-800 p-4">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm">
              PR
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">
                Priya Rajan
              </div>

              <div className="text-xs text-slate-400">
                Quality
              </div>
            </div>

            <button
              onClick={onLogout}
              title="Log out"
              className="
                w-9 h-9
                rounded-lg
                border border-slate-700
                flex items-center justify-center
                text-slate-400
                hover:text-rose-400
                hover:bg-rose-500/10
                transition
              "
            >
              <LogOut size={16} />
            </button>

          </div>

        </div>

      </aside>

      {/* =====================================================
          MAIN AREA
      ====================================================== */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen">

        {/* ===================================================
            HEADER
        ==================================================== */}
        <header
          className="
            h-20
            bg-white
            border-b border-slate-200
            flex items-center
            justify-between
            px-4 sm:px-6 lg:px-8
            sticky top-0
            z-30
          "
        >

          {/* Left side */}
          <div className="flex items-center gap-3 min-w-0">

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="
                lg:hidden
                w-10 h-10
                rounded-lg
                border border-slate-200
                flex items-center justify-center
                text-slate-700
                hover:bg-slate-100
                transition
              "
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            <div className="min-w-0">

              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 truncate">
                {pageTitles[activeTab]}
              </h1>

              <p className="text-xs text-slate-400">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>

            </div>

          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* Notification */}
            <button
              className="
                relative
                w-10 h-10
                rounded-full
                border border-slate-200
                flex items-center justify-center
                text-slate-500
                hover:bg-slate-50
                transition
              "
              title="Notifications"
            >
              <Bell size={18} />

              <span className="
                absolute
                top-1
                right-1
                w-2
                h-2
                rounded-full
                bg-rose-500
              " />
            </button>

            {/* Profile */}
            <div
              className="
                w-10 h-10
                rounded-full
                bg-teal-500
                flex items-center justify-center
                text-white
                font-bold
                text-sm
              "
            >
              PR
            </div>

          </div>

        </header>

        {/* ===================================================
            PAGE CONTENT
        ==================================================== */}
        <section
          className="
            flex-1
            overflow-y-auto
            p-4
            sm:p-6
            lg:p-8
          "
        >

          <div
            className="
              w-full
              max-w-[1400px]
              mx-auto
            "
          >
            {renderActivePage()}
          </div>

        </section>

      </main>

    </div>
  );
};

export default QALayout;