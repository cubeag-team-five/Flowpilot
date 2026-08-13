import React, { useState } from 'react';
import { Layers, Flame, FileText } from 'lucide-react';
import { DashboardLayout } from '../common/DashboardLayout';
import { ViewerDashboardView } from './ViewerDashboardView';
import { ViewerSprintStatus } from './ViewerSprintStatus';
import { ViewerReports } from './ViewerReports';

const roleConfig = {
  label: 'EXECUTIVE VIEWER',
  color: 'border-slate-500/30 bg-slate-500/10 text-slate-300',
  name: 'Vikram Jain',
  dept: 'Management',
  avatar: 'VJ',
  avatarBg: 'bg-slate-600',
};

const navItems = [
  { name: 'Projects', icon: <Layers size={18} /> },
  { name: 'Sprint Status', icon: <Flame size={18} /> },
  { name: 'Reports', icon: <FileText size={18} /> },
];

const pageTitles: Record<string, string> = {
  'Projects': 'Projects Overview',
  'Sprint Status': 'Sprint Status',
  'Reports': 'Reports',
};

interface Props {
  onLogout?: () => void;
}

export const ViewerLayout: React.FC<Props> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('Projects');

  const renderContent = () => {
    switch (activeTab) {
      case 'Sprint Status': return <ViewerSprintStatus />;
      case 'Reports': return <ViewerReports />;
      default: return <ViewerDashboardView />;
    }
  };

  return (
    <DashboardLayout
      navItems={navItems}
      roleConfig={roleConfig}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      pageTitle={pageTitles[activeTab] ?? 'Projects Overview'}
      onLogout={onLogout}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default ViewerLayout;
