import React, { useState, useEffect } from 'react';
import { LayoutGrid, CheckSquare, Activity, Users, Calendar } from 'lucide-react';
import { FiMenu, FiX, FiBell, FiLogOut } from 'react-icons/fi';
import { DashboardLayout } from '../common/DashboardLayout';
import { ScrumMasterDashboardView } from './ScrumMasterDashboardView';
import { ScrumBoard } from './ScrumBoard';
import { ScrumBurndown } from './ScrumBurndown';
import { ScrumStandups } from './ScrumStandups';
import { ScrumRetrospective } from './ScrumRetrospective';
import { TYPE } from './scrumUI';

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

const currentDate = 'Friday, 7 August 2026';

/** Matches Tailwind's `lg` breakpoint. */
const DESKTOP_QUERY = '(min-width: 1024px)';

/**
 * The shared DashboardLayout renders a fixed 256px sidebar, which leaves a
 * phone with almost no usable width. Rather than change that shared file —
 * it backs all seven roles — the Scrum Master section supplies its own shell
 * below `lg` and hands off to DashboardLayout at desktop widths.
 */
const useIsDesktop = (): boolean => {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches
  );

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    setIsDesktop(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return isDesktop;
};

interface Props {
  onLogout?: () => void;
}

export const ScrumMasterLayout: React.FC<Props> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('Sprint Overview');
  const [navOpen, setNavOpen] = useState(false);
  const isDesktop = useIsDesktop();

  const pageTitle = pageTitles[activeTab] ?? 'Sprint Overview';

  // Close the drawer on Escape, and stop the page scrolling behind it.
  useEffect(() => {
    if (!navOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setNavOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [navOpen]);

  // The drawer only exists below lg — never strand it open on resize.
  useEffect(() => {
    if (isDesktop) setNavOpen(false);
  }, [isDesktop]);

  const renderContent = () => {
    switch (activeTab) {
      case 'Scrum Board': return <ScrumBoard />;
      case 'Burndown & Velocity': return <ScrumBurndown />;
      case 'Team & Standups': return <ScrumStandups />;
      case 'Retrospective': return <ScrumRetrospective />;
      default: return <ScrumMasterDashboardView />;
    }
  };

  if (isDesktop) {
    return (
      <DashboardLayout
        navItems={navItems}
        roleConfig={roleConfig}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        pageTitle={pageTitle}
        onLogout={onLogout}
      >
        {renderContent()}
      </DashboardLayout>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans">
      {/* Phone top bar */}
      <header className="sticky top-0 z-30 h-14 bg-white border-b border-slate-200 flex items-center gap-3 px-4">
        <button
          type="button"
          onClick={() => setNavOpen(true)}
          aria-label="Open navigation"
          aria-expanded={navOpen}
          className="w-9 h-9 -ml-1.5 rounded-lg grid place-items-center text-slate-600 shrink-0
            hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-emerald-500 transition-colors cursor-pointer"
        >
          <FiMenu size={19} />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className={`${TYPE.body} font-semibold text-slate-900 truncate`}>{pageTitle}</h1>
          <p className={`${TYPE.meta} text-slate-400 truncate`}>{currentDate}</p>
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="w-9 h-9 rounded-lg grid place-items-center text-slate-600 shrink-0 relative
            hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-emerald-500 transition-colors cursor-pointer"
        >
          <FiBell size={17} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 border border-white" />
        </button>

        <span
          className={`w-8 h-8 rounded-full shrink-0 grid place-items-center ${TYPE.meta}
            font-semibold text-white ${roleConfig.avatarBg}`}
        >
          {roleConfig.avatar}
        </span>
      </header>

      <main className="p-4 space-y-4">{renderContent()}</main>

      {/* Slide-in navigation */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${navOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!navOpen}
      >
        <button
          type="button"
          tabIndex={navOpen ? 0 : -1}
          aria-label="Close navigation"
          onClick={() => setNavOpen(false)}
          className={`absolute inset-0 bg-slate-900/50 transition-opacity duration-200
            motion-reduce:transition-none ${navOpen ? 'opacity-100' : 'opacity-0'}`}
        />

        <nav
          role="dialog"
          aria-modal={navOpen}
          aria-label="Scrum Master navigation"
          className={`absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-[#090d16] text-white
            flex flex-col p-5 transition-transform duration-200 ease-out motion-reduce:transition-none
            ${navOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex items-center gap-2.5 mb-5">
            <span className="w-8 h-8 rounded-xl bg-emerald-500 grid place-items-center shrink-0">
              <LayoutGrid size={18} />
            </span>
            <span className={`${TYPE.title} text-white`}>Flowpilot</span>

            <button
              type="button"
              onClick={() => setNavOpen(false)}
              aria-label="Close navigation"
              tabIndex={navOpen ? 0 : -1}
              className="ml-auto w-9 h-9 rounded-lg grid place-items-center text-slate-400
                hover:text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-emerald-500 transition-colors cursor-pointer"
            >
              <FiX size={18} />
            </button>
          </div>

          <span
            className={`${TYPE.eyebrow} text-center px-3 py-1.5 rounded-lg border mb-5 ${roleConfig.color}`}
          >
            {roleConfig.label}
          </span>

          <div className="flex flex-col gap-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  tabIndex={navOpen ? 0 : -1}
                  onClick={() => {
                    setActiveTab(item.name);
                    setNavOpen(false);
                  }}
                  className={`${TYPE.body} flex items-center gap-3 px-3.5 py-3 rounded-xl text-left
                    font-medium transition-colors cursor-pointer focus-visible:outline-2
                    focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${
                      isActive
                        ? 'bg-white/10 text-white border border-white/10'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                >
                  <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>{item.icon}</span>
                  {item.name}
                </button>
              );
            })}
          </div>

          <div className="mt-auto pt-4 border-t border-slate-800 flex items-center gap-2.5">
            <span
              className={`w-8 h-8 rounded-full shrink-0 grid place-items-center ${TYPE.meta}
                font-semibold text-white ${roleConfig.avatarBg}`}
            >
              {roleConfig.avatar}
            </span>
            <div className="min-w-0 flex-1">
              <div className={`${TYPE.meta} font-semibold text-white truncate`}>{roleConfig.name}</div>
              <div className={`${TYPE.meta} text-slate-400 truncate`}>{roleConfig.dept}</div>
            </div>
            <button
              type="button"
              onClick={onLogout}
              tabIndex={navOpen ? 0 : -1}
              aria-label="Log out"
              className="w-9 h-9 rounded-lg grid place-items-center text-slate-400 shrink-0
                hover:text-rose-400 hover:bg-rose-500/10 focus-visible:outline-2
                focus-visible:outline-offset-2 focus-visible:outline-emerald-500
                transition-colors cursor-pointer"
            >
              <FiLogOut size={16} />
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default ScrumMasterLayout;
