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
    <div className="w-full min-w-0 space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            Session Control
          </h1>

          <p className="mt-1 text-sm font-medium text-slate-400 sm:text-[15px]">
            Configure system-wide preferences and security controls
          </p>
        </div>

        <div className="flex w-full gap-2 sm:w-auto">
          <button
            type="button"
            onClick={handleReset}
            className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-500 transition hover:bg-slate-50 sm:flex-none"
          >
            <RotateCcw size={15} />
            Reset
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 text-sm font-bold text-white transition hover:bg-slate-800 sm:flex-none"
          >
            {saved ? <Check size={15} /> : <Save size={15} />}
            {saved ? 'Saved' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500">
          <ShieldCheck size={19} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold text-slate-800">
            System Status
          </p>

          <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
            All critical services are operating normally.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />

          <span className="text-xs font-extrabold text-emerald-600">
            Operational
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

        <SettingsCard
          icon={<Settings size={19} />}
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

          <SettingField label="Platform Name">
            <input
              defaultValue="Flowpilot"
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50/40 px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-300 focus:bg-white"
            />
          </SettingField>

          <Divider />

          <SettingField label="Platform Version">
            <input
              defaultValue="Platform V2.0"
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50/40 px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-300 focus:bg-white"
            />
          </SettingField>
        </SettingsCard>

        <SettingsCard
          icon={<LockKeyhole size={19} />}
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

          <SettingField label="Password Expiry">
            <select
              defaultValue="90"
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50/40 px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-300 focus:bg-white"
            >
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
            </select>
          </SettingField>
        </SettingsCard>

        <SettingsCard
          icon={<Bell size={19} />}
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

          <SettingField label="Notification Email">
            <input
              type="email"
              defaultValue="admin@flowpilot.com"
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50/40 px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-300 focus:bg-white"
            />
          </SettingField>
        </SettingsCard>

        <SettingsCard
          icon={<Clock3 size={19} />}
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

          <SettingField label="Session Timeout">
            <select
              defaultValue="30"
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50/40 px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-300 focus:bg-white"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
            </select>
          </SettingField>

          <Divider />

          <SettingField label="Maximum Login Attempts">
            <select
              defaultValue="5"
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50/40 px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-300 focus:bg-white"
            >
              <option value="3">3 attempts</option>
              <option value="5">5 attempts</option>
              <option value="10">10 attempts</option>
            </select>
          </SettingField>
        </SettingsCard>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">
          <ShieldCheck size={16} />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-extrabold text-slate-700">
            Super Admin Controls
          </p>

          <p className="mt-1 max-w-3xl text-xs font-medium leading-relaxed text-slate-400 sm:text-sm">
            Changes made here affect the entire Flowpilot organization.
            Only Super Administrators can modify these settings.
          </p>
        </div>
      </div>
    </div>
  );
};

const Divider = () => (
  <div className="border-t border-slate-100" />
);

interface SettingFieldProps {
  label: string;
  children: React.ReactNode;
}

const SettingField: React.FC<SettingFieldProps> = ({
  label,
  children,
}) => {
  return (
    <div className="py-5">
      <label className="mb-2 block text-xs font-extrabold text-slate-600 sm:text-sm">
        {label}
      </label>

      {children}
    </div>
  );
};

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
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6 sm:py-5">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconClass}`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <h2 className="text-sm font-extrabold text-slate-800 sm:text-base">
            {title}
          </h2>

          <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
            {description}
          </p>
        </div>
      </div>

      <div className="px-5 sm:px-6">
        {children}
      </div>
    </section>
  );
};

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
    <div className="flex items-start justify-between gap-4 py-5 sm:items-center">
      <div className="min-w-0 flex-1 pr-2">
        <p className="text-sm font-bold text-slate-700 sm:text-[15px]">
          {title}
        </p>

        <p className="mt-1 text-xs font-medium leading-relaxed text-slate-400 sm:text-sm">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onChange}
        aria-pressed={enabled}
        aria-label={`Toggle ${title}`}
        className={`flex h-7 w-12 shrink-0 items-center rounded-full p-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
          enabled
            ? 'justify-end bg-emerald-500'
            : 'justify-start bg-slate-200'
        }`}
      >
        <span className="block h-6 w-6 shrink-0 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.18)]" />
      </button>
    </div>
  );
};

export default SuperAdminSettings;