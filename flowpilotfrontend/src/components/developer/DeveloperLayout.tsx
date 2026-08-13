import React, { useState } from 'react';
import { LayoutGrid, CheckSquare, Layers, Clock, Bell } from 'lucide-react';
import { DashboardLayout } from '../common/DashboardLayout';
import { DeveloperDashboardView } from './DeveloperDashboardView';

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
    >
      <DeveloperDashboardView />
    </DashboardLayout>
  );
};

export default DeveloperLayout;
