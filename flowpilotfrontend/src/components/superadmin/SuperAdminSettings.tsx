import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Bell,
  Clock3,
  LockKeyhole,
  Save,
  RotateCcw,
  Check,
} from 'lucide-react';

const SuperAdminSettings: React.FC = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleReset = () => {
    setMaintenanceMode(false);
    setEmailNotifications(true);
    setSecurityAlerts(true);
    setTwoFactorAuth(true);
    setSessionTimeout(true);
    setSaved(false);
  };

  return (
    <div className="space-y-5">

      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <h1 className="text-[19px] font-extrabold tracking-tight text-slate-900">
            System Settings
          </h1>

          <p className="mt-1 text-[11px] font-medium text-slate-400">
            Configure system-wide preferences and security controls
          </p>
        </div>

        <div className="flex items-center gap-2">

          <button
            type="button"
            onClick={handleReset}
            className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[9px] font-bold text-slate-500 transition hover:bg-slate-50"
          >
            <RotateCcw size={12} />
            Reset
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex h-9 items-center gap-2 rounded-lg bg-slate-900 px-4 text-[9px] font-bold text-white transition hover:bg-slate-800"
          >
            {saved ? <Check size={12} /> : <Save size={12} />}
            {saved ? 'Saved' : 'Save Changes'}
          </button>

        </div>

      </div>

      {/* SYSTEM STATUS */}
      <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500">
          <ShieldCheck size={17} />
        </div>

        <div className="flex-1">
          <p className="text-[10px] font-extrabold text-slate-800">
            System Status
          </p>

          <p className="mt-0.5 text-[9px] font-medium text-slate-400">
            All critical services are operating normally.
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

          <span className="text-[8px] font-extrabold text-emerald-600">
            Operational
          </span>
        </div>

      </div>

      {/* SETTINGS GRID */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

        {/* GENERAL SETTINGS */}
        <SettingsCard
          icon={<Settings size={16} />}
          iconClass="bg-blue-50 text-blue-500"
          title="General Settings"
          description="Basic configuration for the Flowpilot platform"
        >

          <SettingRow
            title="Maintenance Mode"
            description="Temporarily restrict access while maintenance is performed"
            enabled={maintenanceMode}
            onChange={() => setMaintenanceMode(!maintenanceMode)}
          />

          <Divider />

          <div className="py-4">

            <label className="text-[9px] font-extrabold text-slate-600">
              Platform Name
            </label>

            <input
              defaultValue="Flowpilot"
              className="mt-2 h-9 w-full rounded-lg border border-slate-200 bg-slate-50/40 px-3 text-[10px] font-semibold text-slate-700 outline-none focus:border-slate-300 focus:bg-white"
            />

          </div>

          <Divider />

          <div className="py-4">

            <label className="text-[9px] font-extrabold text-slate-600">
              Platform Version
            </label>

            <input
              defaultValue="Platform V2.0"
              className="mt-2 h-9 w-full rounded-lg border border-slate-200 bg-slate-50/40 px-3 text-[10px] font-semibold text-slate-700 outline-none focus:border-slate-300 focus:bg-white"
            />

          </div>

        </SettingsCard>

        {/* SECURITY SETTINGS */}
        <SettingsCard
          icon={<LockKeyhole size={16} />}
          iconClass="bg-rose-50 text-rose-500"
          title="Security"
          description="Manage authentication and system security policies"
        >

          <SettingRow
            title="Two-Factor Authentication"
            description="Require users to verify their identity using a second factor"
            enabled={twoFactorAuth}
            onChange={() => setTwoFactorAuth(!twoFactorAuth)}
          />

          <Divider />

          <SettingRow
            title="Security Alerts"
            description="Notify administrators about suspicious account activity"
            enabled={securityAlerts}
            onChange={() => setSecurityAlerts(!securityAlerts)}
          />

          <Divider />

          <div className="py-4">

            <label className="text-[9px] font-extrabold text-slate-600">
              Password Expiry
            </label>

            <select
              defaultValue="90"
              className="mt-2 h-9 w-full appearance-none rounded-lg border border-slate-200 bg-slate-50/40 px-3 text-[10px] font-semibold text-slate-700 outline-none focus:border-slate-300 focus:bg-white"
            >
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
            </select>

          </div>

        </SettingsCard>

        {/* NOTIFICATIONS */}
        <SettingsCard
          icon={<Bell size={16} />}
          iconClass="bg-amber-50 text-amber-500"
          title="Notifications"
          description="Control system notifications and alerts"
        >

          <SettingRow
            title="Email Notifications"
            description="Send important system updates through email"
            enabled={emailNotifications}
            onChange={() => setEmailNotifications(!emailNotifications)}
          />

          <Divider />

          <SettingRow
            title="Security Alerts"
            description="Receive alerts when important security events occur"
            enabled={securityAlerts}
            onChange={() => setSecurityAlerts(!securityAlerts)}
          />

          <Divider />

          <div className="py-4">

            <label className="text-[9px] font-extrabold text-slate-600">
              Notification Email
            </label>

            <input
              type="email"
              defaultValue="admin@flowpilot.com"
              className="mt-2 h-9 w-full rounded-lg border border-slate-200 bg-slate-50/40 px-3 text-[10px] font-semibold text-slate-700 outline-none focus:border-slate-300 focus:bg-white"
            />

          </div>

        </SettingsCard>

        {/* SESSION SETTINGS */}
        <SettingsCard
          icon={<Clock3 size={16} />}
          iconClass="bg-violet-50 text-violet-500"
          title="Session Management"
          description="Control user session and login behaviour"
        >

          <SettingRow
            title="Automatic Session Timeout"
            description="Automatically sign out inactive users"
            enabled={sessionTimeout}
            onChange={() => setSessionTimeout(!sessionTimeout)}
          />

          <Divider />

          <div className="py-4">

            <label className="text-[9px] font-extrabold text-slate-600">
              Session Timeout
            </label>

            <select
              defaultValue="30"
              className="mt-2 h-9 w-full rounded-lg border border-slate-200 bg-slate-50/40 px-3 text-[10px] font-semibold text-slate-700 outline-none focus:border-slate-300 focus:bg-white"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
            </select>

          </div>

          <Divider />

          <div className="py-4">

            <label className="text-[9px] font-extrabold text-slate-600">
              Maximum Login Attempts
            </label>

            <select
              defaultValue="5"
              className="mt-2 h-9 w-full rounded-lg border border-slate-200 bg-slate-50/40 px-3 text-[10px] font-semibold text-slate-700 outline-none focus:border-slate-300 focus:bg-white"
            >
              <option value="3">3 attempts</option>
              <option value="5">5 attempts</option>
              <option value="10">10 attempts</option>
            </select>

          </div>

        </SettingsCard>

      </div>

      {/* BOTTOM SECURITY NOTICE */}
      <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">

        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">
          <ShieldCheck size={14} />
        </div>

        <div>

          <p className="text-[9px] font-extrabold text-slate-700">
            Super Admin Controls
          </p>

          <p className="mt-1 max-w-3xl text-[9px] font-medium leading-relaxed text-slate-400">
            Changes made here affect the entire Flowpilot organization.
            Only Super Administrators can modify these settings.
          </p>

        </div>

      </div>

    </div>
  );
};

/* ------------------------------------------------ */
/* DIVIDER */
/* ------------------------------------------------ */

const Divider = () => (
  <div className="border-t border-slate-100" />
);

/* ------------------------------------------------ */
/* SETTINGS CARD */
/* ------------------------------------------------ */

interface SettingsCardProps {
  icon: React.ReactNode;
  iconClass: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingsCard: React.FC<SettingsCardProps> = ({
  icon,
  iconClass,
  title,
  description,
  children,
}) => {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">

      {/* CARD HEADER */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconClass}`}
        >
          {icon}
        </div>

        <div>
          <h2 className="text-[11px] font-extrabold text-slate-800">
            {title}
          </h2>

          <p className="mt-0.5 text-[8px] font-medium text-slate-400">
            {description}
          </p>
        </div>

      </div>

      {/* CONTENT */}
      <div className="px-5">
        {children}
      </div>

    </section>
  );
};

/* ------------------------------------------------ */
/* TOGGLE ROW */
/* ------------------------------------------------ */

interface SettingRowProps {
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}

const SettingRow: React.FC<SettingRowProps> = ({
  title,
  description,
  enabled,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-between gap-5 py-4">

      {/* TEXT */}
      <div className="min-w-0 flex-1">

        <p className="text-[10px] font-bold text-slate-700">
          {title}
        </p>

        <p className="mt-1 max-w-md text-[8px] font-medium leading-relaxed text-slate-400">
          {description}
        </p>

      </div>

      {/* TOGGLE */}
      <button
        type="button"
        onClick={onChange}
        aria-pressed={enabled}
        aria-label={`Toggle ${title}`}
        className={`flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
          enabled
            ? 'justify-end bg-emerald-500'
            : 'justify-start bg-slate-200'
        }`}
      >
        <span className="block h-5 w-5 shrink-0 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.18)]" />
      </button>

    </div>
  );
};

export default SuperAdminSettings;