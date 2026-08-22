import React, { useState } from "react";
import {
  LayoutDashboard,
  ClipboardCheck,
  Bug,
  BarChart3,
  FileText,
} from "lucide-react";

import { DashboardLayout } from "../common/DashboardLayout";
import QADashboardView from "./QADashboardView";
import QATestCases from "./QATestCases";
import QABugReports from "./QABugReports";
import QATestCoverage from "./QATestCoverage";
import QAReports from "./QAReports";

interface QALayoutProps {
  onLogout?: () => void;
}

type QASection = "dashboard" | "tasks" | "bugs" | "coverage" | "reports";

const roleConfig = {
  label: "QA ENGINEER",
  color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  name: "Priya Rajan",
  dept: "Quality",
  avatar: "PR",
  avatarBg: "bg-emerald-500",
};

const navItems = [
  { name: "QA Dashboard",    icon: <LayoutDashboard size={18} /> },
  { name: "My Test Tasks",   icon: <ClipboardCheck size={18} /> },
  { name: "Bug Reports",     icon: <Bug size={18} /> },
  { name: "Test Coverage",   icon: <BarChart3 size={18} /> },
  { name: "Quality Reports", icon: <FileText size={18} /> },
];

const sectionMap: Record<string, QASection> = {
  "QA Dashboard":    "dashboard",
  "My Test Tasks":   "tasks",
  "Bug Reports":     "bugs",
  "Test Coverage":   "coverage",
  "Quality Reports": "reports",
};

const pageTitles: Record<string, string> = {
  dashboard: "QA Dashboard",
  tasks:     "My Test Tasks",
  bugs:      "Bug Reports",
  coverage:  "Test Coverage",
  reports:   "Quality Reports",
};

const notifications = [
  { id: 1, title: "Bug BUG-089 filed",      message: "Priya filed a new critical bug.",          time: "10 min ago",  unread: true,  color: "bg-rose-500"    },
  { id: 2, title: "Test case T-042 passed", message: "Velocity tracking module passed QA.",       time: "1 hour ago",  unread: true,  color: "bg-emerald-500" },
  { id: 3, title: "Coverage report ready",  message: "Sprint 12 test coverage report generated.", time: "2 hours ago", unread: false, color: "bg-slate-300"   },
  { id: 4, title: "Sprint 12 standup",      message: "Daily standup in 15 mins.",                 time: "4 hours ago", unread: true,  color: "bg-amber-400"   },
];

const profileConfig = {
  name:           "Priya Rajan",
  email:          "p.rajan@ipmt.com",
  roleLabel:      "QA Engineer",
  roleBadgeColor: "bg-emerald-100 text-emerald-600",
};

const QALayout: React.FC<QALayoutProps> = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState<QASection>("dashboard");

  const activeNavName = navItems.find((n) => sectionMap[n.name] === activeSection)?.name ?? "QA Dashboard";

  const renderPage = () => {
    switch (activeSection) {
      case "tasks":    return <QATestCases />;
      case "bugs":     return <QABugReports />;
      case "coverage": return <QATestCoverage />;
      case "reports":  return <QAReports />;
      default:         return <QADashboardView />;
    }
  };

  return (
    <DashboardLayout
      navItems={navItems}
      roleConfig={roleConfig}
      activeTab={activeNavName}
      onTabChange={(tab) => setActiveSection(sectionMap[tab] ?? "dashboard")}
      pageTitle={pageTitles[activeSection] ?? "QA Dashboard"}
      onLogout={onLogout}
      notifications={notifications}
      profileConfig={profileConfig}
    >
      {renderPage()}
    </DashboardLayout>
  );
};

export { QALayout };
export default QALayout;
