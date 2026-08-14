import React, { useState } from 'react';
import { LayoutGrid, CheckSquare, Layers, Clock, Bell } from 'lucide-react';
import { DashboardLayout } from '../common/DashboardLayout';
import { DeveloperDashboardView } from './DeveloperDashboardView';
import { DeveloperTasks } from './DeveloperTasks';
import { DeveloperSprintBoard } from './DeveloperSprintBoard';
import { DeveloperTimeLog } from './DeveloperTimeLog';
import { DeveloperMentions } from './DeveloperMentions';

const roleConfig = {
  label: 'SENIOR FRONTEND DEVELOPER',
  color: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
  name: 'Sneha Rao',
  dept: 'Engineering',
  avatar: 'SR',
  avatarBg: 'bg-teal-500',
};

const navItems = [
  { name: 'My Dashboard', icon: <LayoutGrid size={18} /> },
  { name: 'My Tasks', icon: <CheckSquare size={18} /> },
  { name: 'Sprint Board', icon: <Layers size={18} /> },
  { name: 'Time Log', icon: <Clock size={18} /> },
  { name: 'Mentions', icon: <Bell size={18} /> },
];

const pageTitles: Record<string, string> = {
  'My Dashboard': 'My Dashboard',
  'My Tasks': 'My Tasks',
  'Sprint Board': 'Sprint Board',
  'Time Log': 'Time Log',
  'Mentions': 'Mentions',
};

interface Props {
  onLogout?: () => void;
}

const notifications = [
  { id: 1, title: 'My task T-040 updated', message: 'Design system component library — 3/7 done.', time: '10 min ago', unread: true, color: 'bg-teal-500' },
  { id: 2, title: 'Mentioned by Aryan', message: '@sneha Button + Input needed before Aug 8 demo.', time: '2 hours ago', unread: true, color: 'bg-cyan-400' },
  { id: 3, title: 'PR review requested', message: 'Mihir requested review on T-041 PR.', time: '3 hours ago', unread: false, color: 'bg-slate-300' },
  { id: 4, title: 'Sprint 12 standup', message: 'Daily standup in 15 mins.', time: '4 hours ago', unread: true, color: 'bg-orange-400' },
];

const profileConfig = {
  name: 'Sneha Rao',
  email: 's.rao@ipmt.com',
  roleLabel: 'Senior Frontend Developer',
  roleBadgeColor: 'bg-teal-100 text-teal-600',
};

export const DeveloperLayout: React.FC<Props> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('My Dashboard');

  return (
    <DashboardLayout
      navItems={navItems}
      roleConfig={roleConfig}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      pageTitle={pageTitles[activeTab] ?? 'My Dashboard'}
      onLogout={onLogout}
      notifications={notifications}
      profileConfig={profileConfig}
    >
      {activeTab === 'My Dashboard' && <DeveloperDashboardView />}
      {activeTab === 'My Tasks' && <DeveloperTasks />}
      {activeTab === 'Sprint Board' && <DeveloperSprintBoard />}
      {activeTab === 'Time Log' && <DeveloperTimeLog />}
      {activeTab === 'Mentions' && <DeveloperMentions />}
    </DashboardLayout>
  );
};

export default DeveloperLayout;
