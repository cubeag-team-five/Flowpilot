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
} from 'lucide-react';

import { SuperAdminDashboard } from '../superadmin/SuperAdminDashboard';
import SuperAdminUsers from '../superadmin/SuperAdminUsers';
import SuperAdminAuditLogs from '../superadmin/SuperAdminAuditLogs';
import SuperAdminSettings from '../superadmin/SuperAdminSettings';

import * as SuperAdminDepartmentsModule from '../superadmin/SuperAdminDepartments';
import * as SuperAdminRolesModule from '../superadmin/SuperAdminRoles';
import * as SuperAdminProjectsModule from '../superadmin/SuperAdminProjects';

import { AdminDashboardView } from '../admin/AdminDashboardView';
import { AdminUsers } from '../admin/AdminUsers';
import { AdminDepartments } from '../admin/AdminDepartments';
import { AdminProjects } from '../admin/AdminProjects';
import { AdminReports } from '../admin/AdminReports';
import { AdminNotifications } from '../admin/AdminNotifications';
import { AdminSettings } from '../admin/AdminSettings';

import { PMDashboardView } from '../pm/PMDashboardView';
import { ScrumMasterDashboardView } from '../scrummaster/ScrumMasterDashboardView';
import { ScrumBoard } from '../scrummaster/ScrumBoard';
import { ScrumBurndown } from '../scrummaster/ScrumBurndown';
import { ScrumStandups } from '../scrummaster/ScrumStandups';
import { ScrumRetrospective } from '../scrummaster/ScrumRetrospective';
import { DeveloperDashboardView } from '../developer/DeveloperDashboardView';
import { QADashboardView } from '../qa/QADashboardView';

import { ViewerDashboardView } from '../viewer/ViewerDashboardView';
import { ViewerReports } from '../viewer/ViewerReports';
import { ViewerSprintStatus } from '../viewer/ViewerSprintStatus';

const SuperAdminDepartments =
  (SuperAdminDepartmentsModule as any).default ??
  (SuperAdminDepartmentsModule as any).SuperAdminDepartments;

const SuperAdminRoles =
  (SuperAdminRolesModule as any).default ??
  (SuperAdminRolesModule as any).SuperAdminRoles;

const SuperAdminProjects =
  (SuperAdminProjectsModule as any).default ??
  (SuperAdminProjectsModule as any).SuperAdminProjects;

interface DashboardLayoutProps {
  userRole?: string;
  onLogout?: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  userRole = 'Super Admin',
  onLogout,
}) => {
  const getDefaultTab = (role: string) => {
    if (role === 'Viewer') return 'Projects';
    if (role === 'Super Admin') return 'Overview';
    return 'Dashboard';
  };

  const [activeTab, setActiveTab] = useState(() => getDefaultTab(userRole));
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New user registered',
      message: 'A new user has been added to the system.',
      time: '2 min ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Project status updated',
      message: 'A project status has been updated.',
      time: '15 min ago',
      unread: true,
    },
    {
      id: 3,
      title: 'System health check',
      message: 'All major system services are running normally.',
      time: '1 hour ago',
      unread: false,
    },
  ]);

  const currentDate = 'Friday, 7 August 2026';

  const getRoleConfig = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return {
          label: 'SUPER ADMINISTRATOR',
          color: 'border-rose-500/30 bg-rose-500/10 text-rose-400',
          name: 'Rajeev Kumar',
          dept: 'Leadership',
          avatar: 'RK',
          avatarBg: 'bg-rose-500',
        };

      case 'Admin':
        return {
          label: 'SYSTEM ADMINISTRATOR',
          color: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
          name: 'Nisha Agarwal',
          dept: 'Operations',
          avatar: 'NA',
          avatarBg: 'bg-amber-500',
        };

      case 'Project Manager':
        return {
          label: 'SENIOR PROJECT MANAGER',
          color: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
          name: 'Arjun Shah',
          dept: 'Product',
          avatar: 'AS',
          avatarBg: 'bg-purple-500',
        };

      case 'Scrum Master':
        return {
          label: 'SCRUM MASTER',
          color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
          name: 'Aryan Kapoor',
          dept: 'Engineering',
          avatar: 'AK',
          avatarBg: 'bg-emerald-500',
        };

      case 'QA Engineer':
        return {
          label: 'QA ENGINEER',
          color: 'border-teal-500/30 bg-teal-500/10 text-teal-400',
          name: 'Priya Rajan',
          dept: 'Quality',
          avatar: 'PR',
          avatarBg: 'bg-teal-500',
        };

      case 'Viewer':
        return {
          label: 'EXECUTIVE VIEWER',
          color: 'border-slate-500/30 bg-slate-500/10 text-slate-300',
          name: 'Vikram Jain',
          dept: 'Management',
          avatar: 'VJ',
          avatarBg: 'bg-slate-600',
        };

      case 'Developer':
      default:
        return {
          label: 'SENIOR FRONTEND DEVELOPER',
          color: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
          name: 'Sneha Rao',
          dept: 'Engineering',
          avatar: 'SR',
          avatarBg: 'bg-teal-500',
        };
    }
  };

  const roleConfig = getRoleConfig(userRole);

  const getNavItems = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return [
          { name: 'Overview', icon: <LayoutGrid size={18} /> },
          { name: 'User Management', icon: <Users size={18} /> },
          { name: 'Departments', icon: <FolderKanban size={18} /> },
          { name: 'Roles & Permissions', icon: <Shield size={18} /> },
          { name: 'All Projects', icon: <Layers size={18} /> },
          { name: 'Audit Logs', icon: <FileText size={18} /> },
          { name: 'System Settings', icon: <Settings size={18} /> },
        ];

      case 'Admin':
        return [
          { name: 'Dashboard', icon: <LayoutGrid size={18} /> },
          { name: 'Users', icon: <Users size={18} /> },
          { name: 'Departments', icon: <FolderKanban size={18} /> },
          { name: 'Projects', icon: <Layers size={18} /> },
          { name: 'Reports', icon: <FileText size={18} /> },
          { name: 'Notifications', icon: <Bell size={18} /> },
          { name: 'Settings', icon: <Settings size={18} /> },
        ];

      case 'Project Manager':
        return [
          { name: 'Dashboard', icon: <LayoutGrid size={18} /> },
          { name: 'My Projects', icon: <Layers size={18} /> },
          { name: 'Sprint Planning', icon: <Flame size={18} /> },
          { name: 'Task Board', icon: <CheckSquare size={18} /> },
          { name: 'Team Workload', icon: <Users size={18} /> },
          { name: 'Analytics & Reports', icon: <Activity size={18} /> },
        ];

      case 'Scrum Master':
        return [
          { name: 'Sprint Overview', icon: <LayoutGrid size={18} /> },
          { name: 'Scrum Board', icon: <CheckSquare size={18} /> },
          { name: 'Burndown & Velocity', icon: <Activity size={18} /> },
          { name: 'Team & Standups', icon: <Users size={18} /> },
          { name: 'Retrospective', icon: <Calendar size={18} /> },
        ];

      case 'QA Engineer':
        return [
          { name: 'QA Dashboard', icon: <LayoutGrid size={18} /> },
          { name: 'My Test Tasks', icon: <CheckSquare size={18} /> },
          { name: 'Bug Reports', icon: <AlertTriangle size={18} /> },
          { name: 'Test Coverage', icon: <Activity size={18} /> },
          { name: 'Quality Reports', icon: <FileText size={18} /> },
        ];

      case 'Viewer':
        return [
          { name: 'Projects', icon: <Layers size={18} /> },
          { name: 'Sprint Status', icon: <Flame size={18} /> },
          { name: 'Reports', icon: <FileText size={18} /> },
        ];

      case 'Developer':
      default:
        return [
          { name: 'My Dashboard', icon: <LayoutGrid size={18} /> },
          { name: 'My Tasks', icon: <CheckSquare size={18} /> },
          { name: 'Sprint Board', icon: <Layers size={18} /> },
          { name: 'Time Log', icon: <Clock size={18} /> },
          { name: 'Mentions', icon: <Bell size={18} /> },
        ];
    }
  };

  const navItems = getNavItems(userRole);
  // Falls back to the role's first nav item until the user picks a different one.
  const currentTab = activeTab || navItems[0].name;

  const getPageTitle = () => {
    switch (userRole) {
      case 'Super Admin': {
        switch (activeTab) {
          case 'User Management': return 'User Management';
          case 'Departments': return 'Departments';
          case 'Roles & Permissions': return 'Roles & Permissions';
          case 'All Projects': return 'All Projects';
          case 'Audit Logs': return 'Audit Logs';
          case 'System Settings': return 'System Settings';
          default: return 'System Overview';
        }
      }
      case 'Admin': {
        switch (activeTab) {
          case 'Users': return 'Users';
          case 'Departments': return 'Departments';
          case 'Projects': return 'Projects';
          case 'Reports': return 'Reports';
          case 'Notifications': return 'Notifications';
          case 'Settings': return 'Settings';
          default: return 'Admin Dashboard';
        }
      }
      case 'Viewer': {
        switch (activeTab) {
          case 'Sprint Status': return 'Sprint Status';
          case 'Reports': return 'Reports';
          default: return 'Projects Overview';
        }
      }
      case 'Project Manager': return 'PM Dashboard';
      case 'Scrum Master': return 'Sprint Overview';
      case 'QA Engineer': return 'QA Dashboard';
      case 'Developer': return 'My Dashboard';
      default: return 'Dashboard';
    }
  };

  const renderSuperAdminContent = () => {
    switch (activeTab) {
      case 'User Management': return <SuperAdminUsers />;
      case 'Departments': return SuperAdminDepartments ? <SuperAdminDepartments /> : null;
      case 'Roles & Permissions': return SuperAdminRoles ? <SuperAdminRoles /> : null;
      case 'All Projects': return SuperAdminProjects ? <SuperAdminProjects /> : null;
      case 'Audit Logs': return <SuperAdminAuditLogs />;
      case 'System Settings': return <SuperAdminSettings />;
      default: return <SuperAdminDashboard />;
    }
  };

  const renderAdminContent = () => {
    switch (activeTab) {
      case 'Users': return <AdminUsers />;
      case 'Departments': return <AdminDepartments />;
      case 'Projects': return <AdminProjects />;
      case 'Reports': return <AdminReports />;
      case 'Notifications': return <AdminNotifications />;
      case 'Settings': return <AdminSettings />;
      default: return <AdminDashboardView />;
    }
  };

  const renderViewerContent = () => {
    switch (activeTab) {
      case 'Sprint Status': return <ViewerSprintStatus />;
      case 'Reports': return <ViewerReports />;
      default: return <ViewerDashboardView />;
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-[#f8fafc] text-slate-800 font-sans flex">

      <aside
        className="
          h-screen w-64 shrink-0
          bg-[#090d16] text-white
          flex flex-col justify-between
          p-5 border-r border-slate-800/60
          overflow-hidden
        "
      >
        <div className="min-h-0 flex flex-col">

          {/* LOGO */}
          <div className="flex items-center gap-2.5 mb-6 px-2 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/20">
              <LayoutGrid size={18} />
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight leading-none text-white">
                Flowpilot
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                PLATFORM V2.0
              </div>
            </div>
          </div>

          {/* ROLE BADGE */}
          <div className="mb-6 px-2 shrink-0">
            <span className={`inline-block w-full text-center text-[10px] font-black tracking-wider px-3 py-1.5 rounded-lg border ${roleConfig.color}`}>
              ● {roleConfig.label}
            </span>
          </div>

          {/* NAVIGATION */}
          <nav className="flex flex-col gap-1 overflow-y-auto pr-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActiveTab(item.name)}
                  className={`
                    flex items-center gap-3 px-3.5 py-2.5
                    rounded-xl text-xs font-bold
                    transition-all cursor-pointer text-left shrink-0
                    ${isActive
                      ? 'bg-white/10 text-white shadow-xs border border-white/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }
                  `}
                >
                  <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

        </div>

        {/* USER AREA */}
        <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between px-2 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-8 h-8 rounded-full ${roleConfig.avatarBg} text-white flex items-center justify-center font-extrabold text-xs shrink-0 shadow-sm`}>
              {roleConfig.avatar}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">{roleConfig.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{roleConfig.dept}</div>
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            title="Log out"
            className="
              w-8 h-8 rounded-xl bg-slate-900 border border-slate-800
              text-slate-400 hover:text-rose-400 hover:bg-rose-500/10
              flex items-center justify-center transition-colors cursor-pointer shrink-0
            "
          >
            <LogOut size={14} />
          </button>
        </div>

      </aside>

      <main className="flex-1 min-w-0 min-h-0 h-screen overflow-y-auto overflow-x-hidden bg-[#f8fafc]">

        {/* HEADER */}
        <header className="h-[76px] bg-white border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">

          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {getPageTitle()}
            </h1>
            <div className="text-xs text-slate-400 font-medium">{currentDate}</div>
          </div>

          <div className="flex items-center gap-4">

            {/* SEARCH */}
            <div className="relative w-64 hidden sm:block">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-slate-50 border border-slate-200/80 rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* NOTIFICATIONS */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications((prev) => !prev)}
                aria-label="Notifications"
                aria-expanded={showNotifications}
                className="relative w-9 h-9 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Bell size={16} />
                {notifications.some((n) => n.unread) && (
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">Recent system activity</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))}
                      className="text-[10px] font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <button
                        key={notification.id}
                        type="button"
                        onClick={() =>
                          setNotifications((prev) =>
                            prev.map((item) =>
                              item.id === notification.id ? { ...item, unread: false } : item
                            )
                          )
                        }
                        className={`w-full text-left px-4 py-3 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer ${notification.unread ? 'bg-emerald-50/40' : 'bg-white'}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${notification.unread ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-900">{notification.title}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{notification.message}</div>
                            <div className="text-[10px] text-slate-400 mt-1">{notification.time}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AVATAR */}
            <div className={`w-9 h-9 rounded-full ${roleConfig.avatarBg} text-white flex items-center justify-center font-extrabold text-xs shadow-sm cursor-pointer`}>
              {roleConfig.avatar}
            </div>

          </div>

        </header>

        {/* PAGE CONTENT */}
        <div className="p-8 max-w-[1400px] w-full mx-auto space-y-8">

          {userRole === 'Super Admin' && renderSuperAdminContent()}
          {userRole === 'Admin' && renderAdminContent()}
          {userRole === 'Project Manager' && <PMDashboardView />}
          {userRole === 'Scrum Master' && (
            <>
              {currentTab === 'Sprint Overview' && <ScrumMasterDashboardView />}
              {currentTab === 'Scrum Board' && <ScrumBoard />}
              {currentTab === 'Burndown & Velocity' && <ScrumBurndown />}
              {currentTab === 'Team & Standups' && <ScrumStandups />}
              {currentTab === 'Retrospective' && <ScrumRetrospective />}
            </>
          )}
          {userRole === 'Developer' && <DeveloperDashboardView />}
          {userRole === 'QA Engineer' && <QADashboardView />}
          {userRole === 'Viewer' && renderViewerContent()}

        </div>

      </main>

    </div>
  );
};

export default DashboardLayout;
