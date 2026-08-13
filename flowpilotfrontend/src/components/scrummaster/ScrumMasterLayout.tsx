import React, { useState } from 'react';
import { LayoutGrid, CheckSquare, Activity, Users, Calendar } from 'lucide-react';
import { DashboardLayout } from '../common/DashboardLayout';
import { ScrumMasterDashboardView } from './ScrumMasterDashboardView';
import { ScrumBoard } from './ScrumBoard';
import { ScrumBurndown } from './ScrumBurndown';
import { ScrumStandups } from './ScrumStandups';
import { ScrumRetrospective } from './ScrumRetrospective';

const roleConfig = {
  label: 'SCRUM MASTER',
  color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  name: 'Aryan Kapoor',
  dept: 'Engineering',
  avatar: 'AK',
  avatarBg: 'bg-emerald-500',
};

const navItems = [
  { name: 'Sprint Overview', icon: <LayoutGrid size={18} /> },
  { name: 'Scrum Board', icon: <CheckSquare size={18} /> },
  { name: 'Burndown & Velocity', icon: <Activity size={18} /> },
  { name: 'Team & Standups', icon: <Users size={18} /> },
  { name: 'Retrospective', icon: <Calendar size={18} /> },
];

const pageTitles: Record<string, string> = {
  'Sprint Overview': 'Sprint Overview',
  'Scrum Board': 'Scrum Board',
  'Burndown & Velocity': 'Burndown & Velocity',
  'Team & Standups': 'Team & Standups',
  'Retrospective': 'Retrospective',
};

interface Props {
  onLogout?: () => void;
}

export const ScrumMasterLayout: React.FC<Props> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('Sprint Overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'Scrum Board': return <ScrumBoard />;
      case 'Burndown & Velocity': return <ScrumBurndown />;
      case 'Team & Standups': return <ScrumStandups />;
      case 'Retrospective': return <ScrumRetrospective />;
      default: return <ScrumMasterDashboardView />;
    }
  };

  return (
    <DashboardLayout
      navItems={navItems}
      roleConfig={roleConfig}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      pageTitle={pageTitles[activeTab] ?? 'Sprint Overview'}
      onLogout={onLogout}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default ScrumMasterLayout;
