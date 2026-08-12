import React, { useState } from 'react';

import {
  LayoutGrid,
  Users,
  FolderKanban,
  Shield,
  FileText,
  Bell,
  Settings,
  LogOut,
  Search,
  Clock,
  AlertTriangle,
  Activity,
  Flame,
  Calendar,
  Layers,
  CheckSquare,
  User,
  X,
  Menu,
} from 'lucide-react';

import { SuperAdminDashboard } from '../superadmin/SuperAdminDashboard';
import { AdminDashboardView } from '../admin/AdminDashboardView';
import { PMDashboardView } from '../pm/PMDashboardView';
import { ScrumMasterDashboardView } from '../scrummaster/ScrumMasterDashboardView';
import { DeveloperDashboardView } from '../developer/DeveloperDashboardView';
import { QADashboardView } from '../qa/QADashboardView';
import { ViewerDashboardView } from '../viewer/ViewerDashboardView';

interface DashboardLayoutProps {
  userRole?: string;
  onLogout?: () => void;
}

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  userRole = 'Super Admin',
  onLogout,
}) => {
  /*
   * ==========================================================
   * GLOBAL STATE
   * ==========================================================
   */

  const [activeTab, setActiveTab] = useState<string>(
    userRole === 'Developer' ? 'My Dashboard' : 'Overview'
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      title: 'Aryan Kapoor mentioned you',
      message: 'You were mentioned in T-040.',
      time: '2h ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Priya Rajan mentioned you',
      message: 'You were mentioned in T-042.',
      time: '5h ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Arjun Shah commented on T-049',
      message: 'Please start this after T-044 wraps up.',
      time: 'Yesterday',
      unread: false,
    },
  ]);

  const currentDate = 'Wednesday, 12 August 2026';

  /*
   * ==========================================================
   * ROLE CONFIG
   * ==========================================================
   */

  const getRoleConfig = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return {
          label: 'SUPER ADMINISTRATOR',
          color:
            'border-rose-500/30 bg-rose-500/10 text-rose-400',
          name: 'Rajeev Kumar',
          dept: 'Leadership',
          avatar: 'RK',
          avatarBg: 'bg-rose-500',
        };

      case 'Admin':
        return {
          label: 'SYSTEM ADMINISTRATOR',
          color:
            'border-amber-500/30 bg-amber-500/10 text-amber-400',
          name: 'Nisha Agarwal',
          dept: 'Operations',
          avatar: 'NA',
          avatarBg: 'bg-amber-500',
        };

      case 'Project Manager':
        return {
          label: 'SENIOR PROJECT MANAGER',
          color:
            'border-purple-500/30 bg-purple-500/10 text-purple-400',
          name: 'Arjun Shah',
          dept: 'Product',
          avatar: 'AS',
          avatarBg: 'bg-purple-500',
        };

      case 'Scrum Master':
        return {
          label: 'SCRUM MASTER',
          color:
            'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
          name: 'Aryan Kapoor',
          dept: 'Engineering',
          avatar: 'AK',
          avatarBg: 'bg-emerald-500',
        };

      case 'QA Engineer':
        return {
          label: 'QA ENGINEER',
          color:
            'border-teal-500/30 bg-teal-500/10 text-teal-400',
          name: 'Priya Rajan',
          dept: 'Quality',
          avatar: 'PR',
          avatarBg: 'bg-teal-500',
        };

      case 'Viewer':
        return {
          label: 'EXECUTIVE VIEWER',
          color:
            'border-slate-500/30 bg-slate-500/10 text-slate-300',
          name: 'Vikram Jain',
          dept: 'Management',
          avatar: 'VJ',
          avatarBg: 'bg-slate-600',
        };

      case 'Developer':
      default:
        return {
          label: 'SENIOR FRONTEND DEVELOPER',
          color:
            'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
          name: 'Sneha Rao',
          dept: 'Engineering',
          avatar: 'SR',
          avatarBg: 'bg-teal-500',
        };
    }
  };

  const roleConfig = getRoleConfig(userRole);

  /*
   * ==========================================================
   * NAVIGATION
   * ==========================================================
   */

  const getNavItems = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return [
          {
            name: 'Overview',
            icon: <LayoutGrid size={18} />,
          },
          {
            name: 'User Management',
            icon: <Users size={18} />,
          },
          {
            name: 'Departments',
            icon: <FolderKanban size={18} />,
          },
          {
            name: 'Roles & Permissions',
            icon: <Shield size={18} />,
          },
          {
            name: 'All Projects',
            icon: <Layers size={18} />,
          },
          {
            name: 'Audit Logs',
            icon: <FileText size={18} />,
          },
          {
            name: 'System Settings',
            icon: <Settings size={18} />,
          },
        ];

      case 'Admin':
        return [
          {
            name: 'Dashboard',
            icon: <LayoutGrid size={18} />,
          },
          {
            name: 'Users',
            icon: <Users size={18} />,
          },
          {
            name: 'Departments',
            icon: <FolderKanban size={18} />,
          },
          {
            name: 'Projects',
            icon: <Layers size={18} />,
          },
          {
            name: 'Reports',
            icon: <FileText size={18} />,
          },
          {
            name: 'Notifications',
            icon: <Bell size={18} />,
          },
        ];

      case 'Project Manager':
        return [
          {
            name: 'Dashboard',
            icon: <LayoutGrid size={18} />,
          },
          {
            name: 'My Projects',
            icon: <Layers size={18} />,
          },
          {
            name: 'Sprint Planning',
            icon: <Flame size={18} />,
          },
          {
            name: 'Task Board',
            icon: <CheckSquare size={18} />,
          },
          {
            name: 'Team Workload',
            icon: <Users size={18} />,
          },
          {
            name: 'Analytics & Reports',
            icon: <Activity size={18} />,
          },
        ];

      case 'Scrum Master':
        return [
          {
            name: 'Sprint Overview',
            icon: <LayoutGrid size={18} />,
          },
          {
            name: 'Scrum Board',
            icon: <CheckSquare size={18} />,
          },
          {
            name: 'Burndown & Velocity',
            icon: <Activity size={18} />,
          },
          {
            name: 'Team & Standups',
            icon: <Users size={18} />,
          },
          {
            name: 'Retrospective',
            icon: <Calendar size={18} />,
          },
        ];

      case 'QA Engineer':
        return [
          {
            name: 'QA Dashboard',
            icon: <LayoutGrid size={18} />,
          },
          {
            name: 'My Test Tasks',
            icon: <CheckSquare size={18} />,
          },
          {
            name: 'Bug Reports',
            icon: <AlertTriangle size={18} />,
          },
          {
            name: 'Test Coverage',
            icon: <Activity size={18} />,
          },
          {
            name: 'Quality Reports',
            icon: <FileText size={18} />,
          },
        ];

      case 'Viewer':
        return [
          {
            name: 'Projects',
            icon: <Layers size={18} />,
          },
          {
            name: 'Sprint Status',
            icon: <Flame size={18} />,
          },
          {
            name: 'Reports',
            icon: <FileText size={18} />,
          },
        ];

      case 'Developer':
      default:
        return [
          {
            name: 'My Dashboard',
            icon: <LayoutGrid size={18} />,
          },
          {
            name: 'My Tasks',
            icon: <CheckSquare size={18} />,
          },
          {
            name: 'Sprint Board',
            icon: <Layers size={18} />,
          },
          {
            name: 'Time Log',
            icon: <Clock size={18} />,
          },
          {
            name: 'Mentions',
            icon: <Bell size={18} />,
          },
        ];
    }
  };

  const navItems = getNavItems(userRole);

  /*
   * ==========================================================
   * PAGE TITLE
   * ==========================================================
   */

  const getPageTitle = () => {
    if (userRole !== 'Developer') {
      if (userRole === 'Super Admin') return 'System Overview';
      if (userRole === 'Admin') return 'Admin Dashboard';
      if (userRole === 'Project Manager') return 'PM Dashboard';
      if (userRole === 'Scrum Master') return 'Sprint Overview';
      if (userRole === 'QA Engineer') return 'QA Dashboard';
      if (userRole === 'Viewer') return 'Projects Overview';

      return 'Dashboard';
    }

    switch (activeTab) {
      case 'My Tasks':
        return 'My Tasks';

      case 'Sprint Board':
        return 'Sprint Board';

      case 'Time Log':
        return 'Time Log';

      case 'Mentions':
        return 'Mentions & Comments';

      case 'My Dashboard':
      default:
        return 'My Dashboard';
    }
  };

  /*
   * ==========================================================
   * NOTIFICATION FUNCTIONS
   * ==========================================================
   */

  const unreadNotifications = notifications.filter(
    (item) => item.unread
  ).length;

  const markAllNotificationsRead = () => {
    setNotifications((previous) =>
      previous.map((item) => ({
        ...item,
        unread: false,
      }))
    );
  };

  const markNotificationRead = (id: number) => {
    setNotifications((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              unread: false,
            }
          : item
      )
    );
  };

  /*
   * ==========================================================
   * PAGE CONTENT
   * ==========================================================
   */

  const renderDashboardContent = () => {
    if (userRole === 'Super Admin') {
      return <SuperAdminDashboard />;
    }

    if (userRole === 'Admin') {
      return <AdminDashboardView />;
    }

    if (userRole === 'Project Manager') {
      return <PMDashboardView />;
    }

    if (userRole === 'Scrum Master') {
      return <ScrumMasterDashboardView />;
    }

    if (userRole === 'QA Engineer') {
      return <QADashboardView />;
    }

    if (userRole === 'Viewer') {
      return <ViewerDashboardView />;
    }

    /*
     * Developer:
     * DeveloperDashboardView now decides which of its
     * 5 pages should be visible.
     */
    return <DeveloperDashboardView activePage={activeTab} />;
  };

  /*
   * ==========================================================
   * UI
   * ==========================================================
   */

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-800">
      {/* =====================================================
          SIDEBAR
          ===================================================== */}
      <aside
  className={`
    fixed inset-y-0 left-0 z-50
    flex w-64 shrink-0 flex-col justify-between
    border-r border-slate-800/60
    bg-[#090d16] p-5 text-white
    transition-transform duration-300
    md:static md:translate-x-0
    ${
      sidebarOpen
        ? "translate-x-0"
        : "-translate-x-full"
    }
  `}
>          <button
  type="button"
  onClick={() => setSidebarOpen(false)}
  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/10 md:hidden"
  aria-label="Close sidebar"
>
  <X size={18} />
</button>
        <div>
          {/* Logo */}
          <div className="mb-6 flex items-center gap-2.5 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500 font-bold text-white shadow-md shadow-emerald-500/20">
              <LayoutGrid size={18} />
            </div>

            <div>
              <div className="text-base font-extrabold leading-none tracking-tight text-white">
                Flowpilot
              </div>

              <div className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                PLATFORM V2.0
              </div>
            </div>
          </div>

          {/* Role */}
          <div className="mb-6 px-2">
            <span
              className={`inline-block w-full rounded-lg border px-3 py-1.5 text-center text-[10px] font-black tracking-wider ${roleConfig.color}`}
            >
              ● {roleConfig.label}
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive =
                activeTab === item.name ||
                (userRole !== 'Developer' &&
                  activeTab === navItems[0]?.name &&
                  item.name === navItems[0]?.name);

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.name);
                    setNotificationOpen(false);
                    setProfileOpen(false);
                    setSidebarOpen(false);
                  }}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-2.5 text-xs font-bold transition-all ${
                    isActive
                      ? 'border-white/10 bg-white/10 text-white shadow-xs'
                      : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <span
                    className={
                      isActive
                        ? 'text-emerald-400'
                        : 'text-slate-400'
                    }
                  >
                    {item.icon}
                  </span>

                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile */}
        <div className="flex items-center justify-between border-t border-slate-800/80 px-2 pt-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${roleConfig.avatarBg} text-xs font-extrabold text-white shadow-sm`}
            >
              {roleConfig.avatar}
            </div>

            <div className="min-w-0">
              <div className="truncate text-xs font-bold text-white">
                {roleConfig.name}
              </div>

              <div className="truncate text-[10px] text-slate-400">
                {roleConfig.dept}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            title="Log out"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
          >
            <LogOut size={14} />
          </button>
        </div>
      </aside>

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}
      <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        {/* =================================================
            HEADER
            ================================================= */}
       <header className="sticky top-0 z-30 flex min-h-[72px] items-center justify-between border-b border-slate-200/80 bg-white px-4 py-3 shadow-2xs sm:px-5 md:px-6 lg:px-8">
          {/* Title */}
          <div className="flex items-center gap-3">
  <button
    type="button"
    onClick={() => setSidebarOpen(true)}
    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 md:hidden"
    aria-label="Open sidebar"
  >
              {sidebarOpen && (
  <button
    type="button"
    aria-label="Close sidebar overlay"
    onClick={() => setSidebarOpen(false)}
    className="fixed inset-0 z-40 bg-black/50 md:hidden"
  />
)}
    <Menu size={18} />
  </button>

  <div>
    <h1 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
      {getPageTitle()}
    </h1>

    <div className="text-[10px] font-medium text-slate-400 sm:text-xs">
      {currentDate}
    </div>
  </div>
</div>
          {/* Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Search */}
    <div className="relative hidden w-56 md:block lg:w-64">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-full border border-slate-200/80 bg-slate-50 py-1.5 pl-9 pr-4 text-xs text-slate-800 transition-colors focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* =========================================
                NOTIFICATION
                ========================================= */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNotificationOpen((previous) => !previous);
                  setProfileOpen(false);
                }}
                className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200/80 bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <Bell size={16} />

                {unreadNotifications > 0 && (
                  <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-white bg-rose-500 px-0.5 text-[8px] font-bold text-white">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {notificationOpen && (
                <div className="absolute right-0 top-12 z-50 w-[calc(100vw-2rem)] max-w-[340px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                  {/* Notification Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Notifications
                      </h3>

                      <p className="text-[10px] text-slate-400">
                        {unreadNotifications} unread
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={markAllNotificationsRead}
                      className="text-[10px] font-bold text-emerald-500 hover:text-emerald-600"
                    >
                      Mark all as read
                    </button>
                  </div>

                  {/* Notifications */}
                  <div className="max-h-[360px] overflow-y-auto">
                    {notifications.map((notification) => (
                      <button
                        key={notification.id}
                        type="button"
                        onClick={() =>
                          markNotificationRead(notification.id)
                        }
                        className="flex w-full gap-3 border-b border-slate-100 px-4 py-3 text-left transition-colors hover:bg-slate-50"
                      >
                        <div className="mt-1 shrink-0">
                          <span
                            className={`block h-2 w-2 rounded-full ${
                              notification.unread
                                ? 'bg-rose-500'
                                : 'bg-slate-200'
                            }`}
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-slate-800">
                            {notification.title}
                          </div>

                          <div className="mt-1 text-[11px] leading-4 text-slate-400">
                            {notification.message}
                          </div>

                          <div className="mt-1 text-[10px] text-slate-300">
                            {notification.time}
                          </div>
                        </div>
                      </button>
                    ))}

                    {notifications.length === 0 && (
                      <div className="px-4 py-8 text-center text-xs text-slate-400">
                        No notifications
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* =========================================
                PROFILE
                ========================================= */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setProfileOpen((previous) => !previous);
                  setNotificationOpen(false);
                }}
                className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full ${roleConfig.avatarBg} text-xs font-extrabold text-white shadow-sm`}
              >
                {roleConfig.avatar}
              </button>

              {profileOpen && (
               <div className="absolute right-0 top-12 z-50 w-[calc(100vw-2rem)] max-w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                  <div className="border-b border-slate-100 px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${roleConfig.avatarBg} text-xs font-extrabold text-white`}
                      >
                        {roleConfig.avatar}
                      </div>

                      <div className="min-w-0">
                        <div className="truncate text-sm font-bold text-slate-900">
                          {roleConfig.name}
                        </div>

                        <div className="truncate text-[10px] text-slate-400">
                          {roleConfig.dept}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu */}
                  <div className="p-2">
                    <button
                      type="button"
                      onClick={() => setProfileOpen(false)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                    >
                      <User size={15} />
                      View Profile
                    </button>

                    <button
                      type="button"
                      onClick={() => setProfileOpen(false)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                    >
                      <Settings size={15} />
                      Settings
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        onLogout?.();
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-rose-500 transition-colors hover:bg-rose-50"
                    >
                      <LogOut size={15} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* =================================================
            PAGE CONTENT
            ================================================= */}
        <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col space-y-8 p-8">
          {renderDashboardContent()}
        </div>
      </main>

      {/* ================================================
          MOBILE / OUTSIDE CLICK SUPPORT
          ================================================ */}
      {(notificationOpen || profileOpen) && (
        <button
          type="button"
          aria-label="Close popup"
          className="fixed inset-0 z-20 cursor-default bg-transparent"
          onClick={() => {
            setNotificationOpen(false);
            setProfileOpen(false);
          }}
        />
      )}
    </div>
  );
};