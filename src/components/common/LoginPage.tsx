import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Settings, 
  FolderKanban, 
  RefreshCw, 
  Code2, 
  TestTube2, 
  Eye, 
  Lock, 
  BarChart3, 
  Users, 
  Bell, 
  LayoutGrid, 
  Lightbulb, 
  ArrowLeft 
} from 'lucide-react';

interface LoginPageProps {
  onBackToHome?: () => void;
  onLoginSuccess?: (role: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onBackToHome, onLoginSuccess }) => {
  const [selectedRole, setSelectedRole] = useState<string>('Super Admin');
  const [email, setEmail] = useState<string>('admin@flowpilot.com');
  const [password, setPassword] = useState<string>('Admin@123');

  const roles = [
    {
      id: 'super-admin',
      name: 'Super Admin',
      subtitle: 'Full system control — all modules',
      icon: <ShieldCheck size={18} className="text-rose-400" />,
      email: 'superadmin@flowpilot.com',
      pass: 'Admin@123'
    },
    {
      id: 'admin',
      name: 'Admin',
      subtitle: 'User & department management',
      icon: <Settings size={18} className="text-purple-400" />,
      email: 'admin@flowpilot.com',
      pass: 'Admin@123'
    },
    {
      id: 'project-manager',
      name: 'Project Manager',
      subtitle: 'Projects, sprints & team oversight',
      icon: <FolderKanban size={18} className="text-amber-400" />,
      email: 'pm@flowpilot.com',
      pass: 'Admin@123'
    },
    {
      id: 'scrum-master',
      name: 'Scrum Master',
      subtitle: 'Sprint board, ceremonies & velocity',
      icon: <RefreshCw size={18} className="text-cyan-400" />,
      email: 'sm@flowpilot.com',
      pass: 'Admin@123'
    },
    {
      id: 'developer',
      name: 'Developer',
      subtitle: 'My tasks, sprint board & time log',
      icon: <Code2 size={18} className="text-emerald-400" />,
      email: 'dev@flowpilot.com',
      pass: 'Admin@123'
    },
    {
      id: 'qa-engineer',
      name: 'QA Engineer',
      subtitle: 'Test cases, bug reports & coverage',
      icon: <TestTube2 size={18} className="text-teal-400" />,
      email: 'qa@flowpilot.com',
      pass: 'Admin@123'
    },
    {
      id: 'viewer',
      name: 'Viewer',
      subtitle: 'Read-only: projects & reports',
      icon: <Eye size={18} className="text-slate-400" />,
      email: 'viewer@flowpilot.com',
      pass: 'Admin@123'
    }
  ];

  const handleRoleSelect = (role: typeof roles[0]) => {
    setSelectedRole(role.name);
    setEmail(role.email);
    setPassword(role.pass);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLoginSuccess) {
      onLoginSuccess(selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-white flex flex-col justify-between font-sans relative overflow-hidden">
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-emerald-500/10 blur-[130px] pointer-events-none"></div>
      <div className="absolute top-[30%] -right-[10%] w-[45vw] h-[45vw] bg-purple-500/10 blur-[140px] pointer-events-none"></div>

      {/* Top Header */}
      <div className="p-6 md:px-12 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={onBackToHome}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/25">
            <LayoutGrid size={20} />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">Flowpilot</span>
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
            V2.0
          </span>
        </div>

        {onBackToHome && (
          <button 
            onClick={onBackToHome}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer bg-slate-900/60 px-4 py-2 rounded-full border border-slate-800"
          >
            <ArrowLeft size={14} /> Back to Landing Page
          </button>
        )}
      </div>

      {/* Main Grid Section */}
      <div className="max-w-[1240px] w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-12 items-start relative z-10 flex-1">
        
        {/* Left Column: Brand Showcase */}
        <div className="flex flex-col justify-between h-full pt-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white mb-3">
              Enterprise Project <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
                Management
              </span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-[420px]">
              Secure role-based access for every member of your team. Select your role and sign in to your personalized workspace.
            </p>

            <div className="flex flex-col gap-5 mb-12">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                  <Lock size={16} className="text-emerald-400" />
                </div>
                <span className="text-sm font-semibold text-slate-200">Role-based access control</span>
              </div>
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                  <BarChart3 size={16} className="text-teal-400" />
                </div>
                <span className="text-sm font-semibold text-slate-200">Real-time sprint analytics</span>
              </div>
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                  <Users size={16} className="text-purple-400" />
                </div>
                <span className="text-sm font-semibold text-slate-200">Cross-team collaboration</span>
              </div>
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                  <Bell size={16} className="text-amber-400" />
                </div>
                <span className="text-sm font-semibold text-slate-200">Smart notifications</span>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800/80">
            <div>
              <div className="text-2xl font-black text-white">48+</div>
              <div className="text-[11px] font-medium text-slate-500 mt-0.5">Team Members</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">24</div>
              <div className="text-[11px] font-medium text-slate-500 mt-0.5">Active Projects</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">99.9%</div>
              <div className="text-[11px] font-medium text-slate-500 mt-0.5">Uptime</div>
            </div>
          </div>
        </div>

        {/* Right Column: Sign In Form & Role Quick Select */}
        <div className="bg-[#0b101b]/90 border border-slate-800/80 rounded-3xl p-7 sm:p-9 shadow-2xl backdrop-blur-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-white tracking-tight mb-1">
              Sign in to your workspace
            </h2>
            <p className="text-xs text-slate-400">
              Quick-select a role below to auto-fill demo credentials
            </p>
          </div>

          {/* Role Quick-Select Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {roles.map((role) => {
              const isSelected = selectedRole === role.name;
              return (
                <div
                  key={role.id}
                  onClick={() => handleRoleSelect(role)}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center gap-3 ${
                    isSelected 
                      ? 'bg-slate-900 border-emerald-500/80 shadow-md shadow-emerald-500/10' 
                      : 'bg-[#111726]/60 border-slate-800/80 hover:border-slate-700 hover:bg-[#131b2e]'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? 'bg-emerald-500/15' : 'bg-slate-900'}`}>
                    {role.icon}
                  </div>
                  <div className="min-w-0">
                    <div className={`text-xs font-bold truncate ${isSelected ? 'text-emerald-400' : 'text-white'}`}>
                      {role.name}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {role.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Login Inputs Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@company.com"
                className="w-full bg-[#121929] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#121929] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg shadow-emerald-500/25 transition-all cursor-pointer hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </form>

          {/* Demo Mode Notice Box */}
          <div className="mt-6 bg-[#0f1725]/80 border border-slate-800/80 rounded-2xl p-4 flex items-start gap-3">
            <Lightbulb size={18} className="text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-emerald-400 mb-0.5">DEMO MODE</div>
              <div className="text-[11px] text-slate-400 leading-normal">
                Click any role card above to auto-fill credentials. Password for all accounts: <span className="font-mono text-slate-200">Admin@123</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer copyright */}
      <div className="py-4 text-center text-xs text-slate-600 border-t border-slate-900">
        © 2026 Flowpilot Inc. All rights reserved.
      </div>
    </div>
  );
};
