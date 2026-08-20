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
  { name: 'Sprint Overview',      icon: <LayoutGrid size={18} /> },
  { name: 'Scrum Board',          icon: <CheckSquare size={18} /> },
  { name: 'Burndown & Velocity',  icon: <Activity size={18} /> },
  { name: 'Team & Standups',      icon: <Users size={18} /> },
  { name: 'Retrospective',        icon: <Calendar size={18} /> },
];

const pageTitles: Record<string, string> = {
  'Sprint Overview':     'Sprint Overview',
  'Scrum Board':         'Scrum Board',
  'Burndown & Velocity': 'Burndown & Velocity',
  'Team & Standups':     'Team & Standups',
  'Retrospective':       'Retrospective',
};

interface Props {
  onLogout?: () => void;
}

const notifications = [
  { id: 1, title: 'Sprint 12 standup',  message: 'Daily standup starting in 10 mins.', time: '5 min ago',  unread: true,  color: 'bg-emerald-500' },
  { id: 2, title: 'Burndown updated',   message: 'Sprint 12 burndown chart refreshed.', time: '1 hour ago', unread: true,  color: 'bg-teal-400'    },
  { id: 3, title: 'Retrospective due',  message: 'Sprint 11 retro notes pending.',       time: '2 hours ago', unread: false, color: 'bg-slate-300'   },
  { id: 4, title: 'Blocker raised',     message: 'T-048 blocked by dependency.',         time: '3 hours ago', unread: true,  color: 'bg-rose-500'    },
];

const profileConfig = {
  name:           'Aryan Kapoor',
  email:          'a.kapoor@ipmt.com',
  roleLabel:      'Scrum Master',
  roleBadgeColor: 'bg-emerald-100 text-emerald-600',
};

export const ScrumMasterLayout: React.FC<Props> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('Sprint Overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'Scrum Board':         return <ScrumBoard />;
      case 'Burndown & Velocity': return <ScrumBurndown />;
      case 'Team & Standups':     return <ScrumStandups />;
      case 'Retrospective':       return <ScrumRetrospective />;
      default:                    return <ScrumMasterDashboardView />;
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
      notifications={notifications}
      profileConfig={profileConfig}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default ScrumMasterLayout;
