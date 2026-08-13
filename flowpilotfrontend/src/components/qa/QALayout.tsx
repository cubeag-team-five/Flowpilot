import React, { useState } from 'react';
import { LayoutGrid, CheckSquare, AlertTriangle, Activity, FileText } from 'lucide-react';
import { DashboardLayout } from '../common/DashboardLayout';
import { QADashboardView } from './QADashboardView';

const roleConfig = {
  label: 'QA ENGINEER',
  color: 'border-teal-500/30 bg-teal-500/10 text-teal-400',
  name: 'Priya Rajan',
  dept: 'Quality',
  avatar: 'PR',
  avatarBg: 'bg-teal-500',
};

const navItems = [
  { name: 'QA Dashboard', icon: <LayoutGrid size={18} /> },
  { name: 'My Test Tasks', icon: <CheckSquare size={18} /> },
  { name: 'Bug Reports', icon: <AlertTriangle size={18} /> },
  { name: 'Test Coverage', icon: <Activity size={18} /> },
  { name: 'Quality Reports', icon: <FileText size={18} /> },
];

const pageTitles: Record<string, string> = {
  'QA Dashboard': 'QA Dashboard',
  'My Test Tasks': 'My Test Tasks',
  'Bug Reports': 'Bug Reports',
  'Test Coverage': 'Test Coverage',
  'Quality Reports': 'Quality Reports',
};

interface Props {
  onLogout?: () => void;
}

export const QALayout: React.FC<Props> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('QA Dashboard');

  return (
    <DashboardLayout
      navItems={navItems}
      roleConfig={roleConfig}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      pageTitle={pageTitles[activeTab] ?? 'QA Dashboard'}
      onLogout={onLogout}
    >
      <QADashboardView />
    </DashboardLayout>
  );
};

export default QALayout;
