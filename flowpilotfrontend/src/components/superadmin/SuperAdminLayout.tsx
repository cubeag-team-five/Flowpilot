import React, { useState } from 'react';
import { LayoutGrid, Users, FolderKanban, Shield, FileText, Settings, Layers } from 'lucide-react';
import { DashboardLayout } from '../common/DashboardLayout';
import { SuperAdminDashboard } from './SuperAdminDashboard';
import SuperAdminUsers from './SuperAdminUsers';
import SuperAdminAuditLogs from './SuperAdminAuditLogs';
import SuperAdminSettings from './SuperAdminSettings';
import * as SuperAdminDepartmentsModule from './SuperAdminDepartments';
import * as SuperAdminRolesModule from './SuperAdminRoles';
import * as SuperAdminProjectsModule from './SuperAdminProjects';

const SuperAdminDepartments =
  (SuperAdminDepartmentsModule as any).default ?? (SuperAdminDepartmentsModule as any).SuperAdminDepartments;
const SuperAdminRoles =
  (SuperAdminRolesModule as any).default ?? (SuperAdminRolesModule as any).SuperAdminRoles;
const SuperAdminProjects =
  (SuperAdminProjectsModule as any).default ?? (SuperAdminProjectsModule as any).SuperAdminProjects;

const roleConfig = {
  label: 'SUPER ADMINISTRATOR',
  color: 'border-rose-500/30 bg-rose-500/10 text-rose-400',
  name: 'Rajeev Kumar',
  dept: 'Leadership',
  avatar: 'RK',
  avatarBg: 'bg-rose-500',
};

const navItems = [
  { name: 'Overview', icon: <LayoutGrid size={18} /> },
  { name: 'User Management', icon: <Users size={18} /> },
  { name: 'Departments', icon: <FolderKanban size={18} /> },
  { name: 'Roles & Permissions', icon: <Shield size={18} /> },
  { name: 'All Projects', icon: <Layers size={18} /> },
  { name: 'Audit Logs', icon: <FileText size={18} /> },
  { name: 'System Settings', icon: <Settings size={18} /> },
];

const pageTitles: Record<string, string> = {
  'User Management': 'User Management',
  'Departments': 'Departments',
  'Roles & Permissions': 'Roles & Permissions',
  'All Projects': 'All Projects',
  'Audit Logs': 'Audit Logs',
  'System Settings': 'System Settings',
  'Overview': 'System Overview',
};

interface Props {
  onLogout?: () => void;
}

const notifications = [
  { id: 1, title: 'New user registered', message: 'Rohit Varma added to Leadership.', time: '2 min ago', unread: true, color: 'bg-emerald-500' },
  { id: 2, title: 'Role assigned', message: 'Business Analyst role assigned to Rohit Varma.', time: '18 min ago', unread: true, color: 'bg-purple-400' },
  { id: 3, title: 'System health check', message: 'All services running normally.', time: '1 hour ago', unread: false, color: 'bg-slate-300' },
  { id: 4, title: 'Audit log alert', message: 'Unusual login attempt detected.', time: '2 hours ago', unread: true, color: 'bg-rose-500' },
];

const profileConfig = {
  name: 'Rajeev Kumar',
  email: 'ra.kumar@ipmt.com',
  roleLabel: 'Super Administrator',
  roleBadgeColor: 'bg-rose-100 text-rose-600',
};

export const SuperAdminLayout: React.FC<Props> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  const renderContent = () => {
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

  return (
    <DashboardLayout
      navItems={navItems}
      roleConfig={roleConfig}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      pageTitle={pageTitles[activeTab] ?? 'System Overview'}
      onLogout={onLogout}
      notifications={notifications}
      profileConfig={profileConfig}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default SuperAdminLayout;
