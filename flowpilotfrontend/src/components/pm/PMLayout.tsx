import React, { useState } from 'react';
import { LayoutGrid, Layers, Flame, CheckSquare, Users, Activity } from 'lucide-react';
import { DashboardLayout } from '../common/DashboardLayout';
import { PMDashboardView } from './PMDashboardView';

const roleConfig = {
  label: 'SENIOR PROJECT MANAGER',
  color: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
  name: 'Arjun Shah',
  dept: 'Product',
  avatar: 'AS',
  avatarBg: 'bg-purple-500',
};

const navItems = [
  { name: 'Dashboard', icon: <LayoutGrid size={18} /> },
  { name: 'My Projects', icon: <Layers size={18} /> },
  { name: 'Sprint Planning', icon: <Flame size={18} /> },
  { name: 'Task Board', icon: <CheckSquare size={18} /> },
  { name: 'Team Workload', icon: <Users size={18} /> },
  { name: 'Analytics & Reports', icon: <Activity size={18} /> },
];

const pageTitles: Record<string, string> = {
  'Dashboard': 'PM Dashboard',
  'My Projects': 'My Projects',
  'Sprint Planning': 'Sprint Planning',
  'Task Board': 'Task Board',
  'Team Workload': 'Team Workload',
  'Analytics & Reports': 'Analytics & Reports',
};

interface Props {
  onLogout?: () => void;
}

export const PMLayout: React.FC<Props> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <DashboardLayout
      navItems={navItems}
      roleConfig={roleConfig}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      pageTitle={pageTitles[activeTab] ?? 'PM Dashboard'}
      onLogout={onLogout}
    >
      <PMDashboardView />
    </DashboardLayout>
  );
};

export default PMLayout;
