import React, { useState, useRef, useEffect } from 'react';

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
  User,
  Settings,
  HelpCircle,
  Power,
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

const qaNotifications = [
  { id: 1, title: 'Bug BUG-089 filed', message: 'New critical bug on login flow.', time: '15 min ago', unread: true, color: 'bg-rose-500' },
  { id: 2, title: 'Test case T-041 passed', message: 'REST API docs test passed.', time: '1 hour ago', unread: true, color: 'bg-emerald-500' },
  { id: 3, title: 'Coverage dropped', message: 'Module coverage fell below 80%.', time: '2 hours ago', unread: false, color: 'bg-slate-300' },
  { id: 4, title: 'Sprint 12 QA sign-off', message: 'Sign-off required by Aug 10.', time: '3 hours ago', unread: true, color: 'bg-cyan-500' },
];

export const QALayout: React.FC<Props> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('QA Dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState(qaNotifications);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

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
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => { setShowNotifications(p => !p); setShowProfile(false); }}
                className="relative w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition"
                title="Notifications"
              >
                <Bell size={18} />
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">{notifications.filter(n => n.unread).length} unread</p>
                    </div>
                    <button type="button" onClick={() => setNotifications(prev => prev.map(n => ({ ...n, unread: false })))} className="text-[10px] font-semibold text-emerald-600 cursor-pointer">Mark all as read</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(n => (
                      <button key={n.id} type="button" onClick={() => setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, unread: false } : item))} className={`w-full text-left px-4 py-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer ${n.unread ? 'bg-emerald-50/40' : 'bg-white'}`}>
                        <div className="flex items-start gap-3">
                          <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${n.color}`} />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-900">{n.title}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{n.message}</div>
                            <div className="text-[10px] text-slate-400 mt-1">{n.time}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => { setShowProfile(p => !p); setShowNotifications(false); }}
                className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:opacity-90 transition"
              >
                PR
              </button>
              {showProfile && (
                <div className="absolute right-0 top-12 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-100">
                    <div className="font-bold text-slate-900 text-sm">Priya Rajan</div>
                    <div className="text-xs text-slate-400 mt-0.5">p.rajan@ipmt.com</div>
                    <span className="inline-block mt-2 text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-600">QA Engineer</span>
                  </div>
                  <div className="py-2">
                    {[{ icon: <User size={15} />, label: 'My Profile' }, { icon: <Settings size={15} />, label: 'Settings' }, { icon: <HelpCircle size={15} />, label: 'Help & Support' }].map(item => (
                      <button key={item.label} type="button" className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer">
                        <span className="text-slate-400">{item.icon}</span>{item.label}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 py-2">
                    <button type="button" onClick={onLogout} className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-rose-500 hover:bg-rose-50 cursor-pointer">
                      <Power size={15} />Sign Out
                    </button>
                  </div>
                </div>
              )}
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