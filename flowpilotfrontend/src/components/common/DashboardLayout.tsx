import React, { useState } from 'react';
import { LayoutGrid, Bell, Search, LogOut } from 'lucide-react';

export interface NavItem {
  name: string;
  icon: React.ReactNode;
}

interface RoleConfig {
  label: string;
  color: string;
  name: string;
  dept: string;
  avatar: string;
  avatarBg: string;
}

interface DashboardLayoutProps {
  navItems: NavItem[];
  roleConfig: RoleConfig;
  activeTab: string;
  onTabChange: (tab: string) => void;
  pageTitle: string;
  onLogout?: () => void;
  children: React.ReactNode;
}

const currentDate = 'Friday, 7 August 2026';

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  navItems,
  roleConfig,
  activeTab,
  onTabChange,
  pageTitle,
  onLogout,
  children,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New user registered', message: 'A new user has been added to the system.', time: '2 min ago', unread: true },
    { id: 2, title: 'Project status updated', message: 'A project status has been updated.', time: '15 min ago', unread: true },
    { id: 3, title: 'System health check', message: 'All major system services are running normally.', time: '1 hour ago', unread: false },
  ]);

  return (
    <div className="h-screen w-full overflow-hidden bg-[#f8fafc] text-slate-800 font-sans flex">

      <aside className="h-screen w-64 shrink-0 bg-[#090d16] text-white flex flex-col justify-between p-5 border-r border-slate-800/60 overflow-hidden">
        <div className="min-h-0 flex flex-col">

          {/* LOGO */}
          <div className="flex items-center gap-2.5 mb-6 px-2 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/20">
              <LayoutGrid size={18} />
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight leading-none text-white">Flowpilot</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">PLATFORM V2.0</div>
            </div>
          </div>

          {/* ROLE BADGE */}
          <div className="mb-6 px-2 shrink-0">
            <span className={`inline-block w-full text-center text-[10px] font-black tracking-wider px-3 py-1.5 rounded-lg border ${roleConfig.color}`}>
              ● {roleConfig.label}
            </span>
          </div>

          {/* NAVIGATION */}
          <nav className="flex flex-col gap-1 overflow-y-auto pr-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => onTabChange(item.name)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left shrink-0 ${
                    isActive
                      ? 'bg-white/10 text-white shadow-xs border border-white/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

        </div>

        {/* USER AREA */}
        <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between px-2 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-8 h-8 rounded-full ${roleConfig.avatarBg} text-white flex items-center justify-center font-extrabold text-xs shrink-0 shadow-sm`}>
              {roleConfig.avatar}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">{roleConfig.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{roleConfig.dept}</div>
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            title="Log out"
            className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 to-indigo-300 text-xs font-bold text-white">
                {mention.initials}
              </div>

      <main className="flex-1 min-w-0 min-h-0 h-screen overflow-y-auto overflow-x-hidden bg-[#f8fafc]">

        {/* HEADER */}
        <header className="h-[76px] bg-white border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{pageTitle}</h1>
            <div className="text-xs text-slate-400 font-medium">{currentDate}</div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-64 hidden sm:block">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-slate-50 border border-slate-200/80 rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications((prev) => !prev)}
                aria-label="Notifications"
                aria-expanded={showNotifications}
                className="relative w-9 h-9 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Bell size={16} />
                {notifications.some((n) => n.unread) && (
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">Recent system activity</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))}
                      className="text-[10px] font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <button
                        key={notification.id}
                        type="button"
                        onClick={() =>
                          setNotifications((prev) =>
                            prev.map((item) => item.id === notification.id ? { ...item, unread: false } : item)
                          )
                        }
                        className={`w-full text-left px-4 py-3 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer ${notification.unread ? 'bg-emerald-50/40' : 'bg-white'}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${notification.unread ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-900">{notification.title}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{notification.message}</div>
                            <div className="text-[10px] text-slate-400 mt-1">{notification.time}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

                  {mention.unread && (
                    <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-500">
                      NEW
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm leading-6 text-gray-700">
                  {mention.message}
                </p>

                {/* Reply */}
                <div className="mt-3">
                  {replyOpen === mention.id ? (
                    <div className="max-w-xl">
                      <textarea
                        autoFocus
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        rows={3}
                        className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
                      />

                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() => sendReply(mention.id)}
                          className="rounded-lg bg-teal-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-600"
                        >
                          Send
                        </button>

                        <button
                          type="button"
                          onClick={cancelReply}
                          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openReply(mention.id)}
                      className="rounded-lg border border-teal-100 bg-white px-4 py-2 text-xs font-semibold text-teal-600 transition hover:bg-teal-50"
                    >
                      Reply
                    </button>
                  )}

                  {sentReply === mention.id && (
                    <span className="ml-3 text-xs font-medium text-emerald-500">
                      Reply sent successfully.
                    </span>
                  )}
                </div>
              </div>

              {/* Time */}
              <div className="shrink-0 text-xs text-gray-400">
                {mention.time}
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-8 max-w-[1400px] w-full mx-auto space-y-8">
          {children}
        </div>

      </main>
    </div>
  );
};

export default DashboardLayout;
