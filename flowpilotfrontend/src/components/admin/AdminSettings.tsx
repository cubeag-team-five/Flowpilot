import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Bell,
  LockKeyhole,
  UserCog,
  Save,
  Check,
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [saved, setSaved] = useState(false);

  const [generalSettings, setGeneralSettings] = useState({
    platformName: 'IPMT Platform',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    language: 'English',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    projectUpdates: true,
    userActivity: true,
    securityAlerts: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordExpiry: true,
    sessionTimeout: true,
  });

  const [userSettings, setUserSettings] = useState({
    allowRegistration: false,
    requireApproval: true,
    allowProfileChanges: true,
  });

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Settings
          </h1>

          <p className="mt-1 text-sm font-medium text-slate-400">
            Manage platform preferences, security and administration settings
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center
          gap-2 rounded-xl bg-slate-900 px-4 py-2.5
          text-xs font-extrabold text-white
          transition hover:bg-slate-800"
        >
          {saved ? (
            <>
              <Check size={16} />
              Saved
            </>
          ) : (
            <>
              <Save size={16} />
              Save Changes
            </>
          )}
        </button>

      </div>

      {/* SETTINGS CONTENT */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[220px_1fr]">

        {/* SETTINGS NAVIGATION */}

        <div className="h-fit rounded-2xl border border-slate-200/80 bg-white p-3 shadow-2xs">

          <div className="space-y-1">

            <button
              className="flex w-full items-center gap-3 rounded-xl
              bg-slate-100 px-3 py-3 text-left"
            >
              <Settings
                size={16}
                className="text-slate-700"
              />

              <span className="text-xs font-extrabold text-slate-800">
                General
              </span>
            </button>

            <button
              className="flex w-full items-center gap-3 rounded-xl
              px-3 py-3 text-left transition hover:bg-slate-50"
            >
              <Bell
                size={16}
                className="text-slate-400"
              />

              <span className="text-xs font-bold text-slate-500">
                Notifications
              </span>
            </button>

            <button
              className="flex w-full items-center gap-3 rounded-xl
              px-3 py-3 text-left transition hover:bg-slate-50"
            >
              <ShieldCheck
                size={16}
                className="text-slate-400"
              />

              <span className="text-xs font-bold text-slate-500">
                Security
              </span>
            </button>

            <button
              className="flex w-full items-center gap-3 rounded-xl
              px-3 py-3 text-left transition hover:bg-slate-50"
            >
              <UserCog
                size={16}
                className="text-slate-400"
              />

              <span className="text-xs font-bold text-slate-500">
                User Management
              </span>
            </button>

          </div>

        </div>

        {/* SETTINGS PANELS */}

        <div className="space-y-6">

          {/* GENERAL SETTINGS */}

          <div
            className="rounded-2xl border
            border-slate-200/80 bg-white
            p-6 shadow-2xs"
          >

            <div className="mb-6 flex items-center gap-3">

              <div
                className="flex h-10 w-10
                items-center justify-center
                rounded-xl bg-slate-100"
              >
                <Settings
                  size={18}
                  className="text-slate-600"
                />
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  General Settings
                </h3>

                <p className="mt-1 text-[11px] font-medium text-slate-400">
                  Configure basic platform preferences
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* PLATFORM NAME */}

              <div>

                <label
                  className="mb-2 block text-[10px]
                  font-extrabold uppercase tracking-wider
                  text-slate-400"
                >
                  Platform Name
                </label>

                <input
                  type="text"
                  value={generalSettings.platformName}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      platformName: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border
                  border-slate-200 bg-white px-3 py-2.5
                  text-xs font-bold text-slate-700
                  outline-none focus:border-slate-400"
                />

              </div>

              {/* TIMEZONE */}

              <div>

                <label
                  className="mb-2 block text-[10px]
                  font-extrabold uppercase tracking-wider
                  text-slate-400"
                >
                  Timezone
                </label>

                <select
                  value={generalSettings.timezone}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      timezone: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border
                  border-slate-200 bg-white px-3 py-2.5
                  text-xs font-bold text-slate-700
                  outline-none focus:border-slate-400"
                >
                  <option value="Asia/Kolkata">
                    Asia/Kolkata (IST)
                  </option>

                  <option value="UTC">
                    UTC
                  </option>

                  <option value="America/New_York">
                    America/New_York
                  </option>

                  <option value="Europe/London">
                    Europe/London
                  </option>
                </select>

              </div>

              {/* DATE FORMAT */}

              <div>

                <label
                  className="mb-2 block text-[10px]
                  font-extrabold uppercase tracking-wider
                  text-slate-400"
                >
                  Date Format
                </label>

                <select
                  value={generalSettings.dateFormat}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      dateFormat: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border
                  border-slate-200 bg-white px-3 py-2.5
                  text-xs font-bold text-slate-700
                  outline-none focus:border-slate-400"
                >
                  <option value="DD/MM/YYYY">
                    DD/MM/YYYY
                  </option>

                  <option value="MM/DD/YYYY">
                    MM/DD/YYYY
                  </option>

                  <option value="YYYY-MM-DD">
                    YYYY-MM-DD
                  </option>
                </select>

              </div>

              {/* LANGUAGE */}

              <div>

                <label
                  className="mb-2 block text-[10px]
                  font-extrabold uppercase tracking-wider
                  text-slate-400"
                >
                  Language
                </label>

                <select
                  value={generalSettings.language}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      language: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border
                  border-slate-200 bg-white px-3 py-2.5
                  text-xs font-bold text-slate-700
                  outline-none focus:border-slate-400"
                >
                  <option value="English">
                    English
                  </option>

                  <option value="Hindi">
                    Hindi
                  </option>

                  <option value="Marathi">
                    Marathi
                  </option>
                </select>

              </div>

            </div>

          </div>

          {/* NOTIFICATION SETTINGS */}

          <div
            className="rounded-2xl border
            border-slate-200/80 bg-white
            p-6 shadow-2xs"
          >

            <div className="mb-6 flex items-center gap-3">

              <div
                className="flex h-10 w-10
                items-center justify-center
                rounded-xl bg-slate-100"
              >
                <Bell
                  size={18}
                  className="text-slate-600"
                />
              </div>

              <div>

                <h3 className="text-sm font-extrabold text-slate-900">
                  Notifications
                </h3>

                <p className="mt-1 text-[11px] font-medium text-slate-400">
                  Control which notifications administrators receive
                </p>

              </div>

            </div>

            <div className="divide-y divide-slate-100">

              {/* EMAIL */}

              <div className="flex items-center justify-between py-4">

                <div>
                  <div className="text-xs font-extrabold text-slate-700">
                    Email Notifications
                  </div>

                  <div className="mt-1 text-[11px] text-slate-400">
                    Receive important system notifications by email
                  </div>
                </div>

                <button
                  onClick={() =>
                    setNotificationSettings({
                      ...notificationSettings,
                      emailNotifications:
                        !notificationSettings.emailNotifications,
                    })
                  }
                  className={`relative h-6 w-11 rounded-full transition ${
                    notificationSettings.emailNotifications
                      ? 'bg-slate-900'
                      : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4
                    rounded-full bg-white transition ${
                      notificationSettings.emailNotifications
                        ? 'left-6'
                        : 'left-1'
                    }`}
                  />
                </button>

              </div>

              {/* PROJECT UPDATES */}

              <div className="flex items-center justify-between py-4">

                <div>
                  <div className="text-xs font-extrabold text-slate-700">
                    Project Updates
                  </div>

                  <div className="mt-1 text-[11px] text-slate-400">
                    Get notified when project information changes
                  </div>
                </div>

                <button
                  onClick={() =>
                    setNotificationSettings({
                      ...notificationSettings,
                      projectUpdates:
                        !notificationSettings.projectUpdates,
                    })
                  }
                  className={`relative h-6 w-11 rounded-full transition ${
                    notificationSettings.projectUpdates
                      ? 'bg-slate-900'
                      : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4
                    rounded-full bg-white transition ${
                      notificationSettings.projectUpdates
                        ? 'left-6'
                        : 'left-1'
                    }`}
                  />
                </button>

              </div>

              {/* USER ACTIVITY */}

              <div className="flex items-center justify-between py-4">

                <div>
                  <div className="text-xs font-extrabold text-slate-700">
                    User Activity
                  </div>

                  <div className="mt-1 text-[11px] text-slate-400">
                    Receive updates about important user activity
                  </div>
                </div>

                <button
                  onClick={() =>
                    setNotificationSettings({
                      ...notificationSettings,
                      userActivity:
                        !notificationSettings.userActivity,
                    })
                  }
                  className={`relative h-6 w-11 rounded-full transition ${
                    notificationSettings.userActivity
                      ? 'bg-slate-900'
                      : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4
                    rounded-full bg-white transition ${
                      notificationSettings.userActivity
                        ? 'left-6'
                        : 'left-1'
                    }`}
                  />
                </button>

              </div>

              {/* SECURITY */}

              <div className="flex items-center justify-between py-4">

                <div>
                  <div className="text-xs font-extrabold text-slate-700">
                    Security Alerts
                  </div>

                  <div className="mt-1 text-[11px] text-slate-400">
                    Always receive critical security notifications
                  </div>
                </div>

                <button
                  onClick={() =>
                    setNotificationSettings({
                      ...notificationSettings,
                      securityAlerts:
                        !notificationSettings.securityAlerts,
                    })
                  }
                  className={`relative h-6 w-11 rounded-full transition ${
                    notificationSettings.securityAlerts
                      ? 'bg-slate-900'
                      : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4
                    rounded-full bg-white transition ${
                      notificationSettings.securityAlerts
                        ? 'left-6'
                        : 'left-1'
                    }`}
                  />
                </button>

              </div>

            </div>

          </div>

          {/* SECURITY SETTINGS */}

          <div
            className="rounded-2xl border
            border-slate-200/80 bg-white
            p-6 shadow-2xs"
          >

            <div className="mb-6 flex items-center gap-3">

              <div
                className="flex h-10 w-10
                items-center justify-center
                rounded-xl bg-slate-100"
              >
                <LockKeyhole
                  size={18}
                  className="text-slate-600"
                />
              </div>

              <div>

                <h3 className="text-sm font-extrabold text-slate-900">
                  Security
                </h3>

                <p className="mt-1 text-[11px] font-medium text-slate-400">
                  Configure account and authentication security
                </p>

              </div>

            </div>

            <div className="divide-y divide-slate-100">

              {/* TWO FACTOR */}

              <div className="flex items-center justify-between py-4">

                <div>
                  <div className="text-xs font-extrabold text-slate-700">
                    Two-Factor Authentication
                  </div>

                  <div className="mt-1 text-[11px] text-slate-400">
                    Require additional verification for administrator accounts
                  </div>
                </div>

                <button
                  onClick={() =>
                    setSecuritySettings({
                      ...securitySettings,
                      twoFactorAuth:
                        !securitySettings.twoFactorAuth,
                    })
                  }
                  className={`relative h-6 w-11 rounded-full ${
                    securitySettings.twoFactorAuth
                      ? 'bg-slate-900'
                      : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4
                    rounded-full bg-white ${
                      securitySettings.twoFactorAuth
                        ? 'left-6'
                        : 'left-1'
                    }`}
                  />
                </button>

              </div>

              {/* PASSWORD */}

              <div className="flex items-center justify-between py-4">

                <div>
                  <div className="text-xs font-extrabold text-slate-700">
                    Password Expiry
                  </div>

                  <div className="mt-1 text-[11px] text-slate-400">
                    Require users to periodically update their passwords
                  </div>
                </div>

                <button
                  onClick={() =>
                    setSecuritySettings({
                      ...securitySettings,
                      passwordExpiry:
                        !securitySettings.passwordExpiry,
                    })
                  }
                  className={`relative h-6 w-11 rounded-full ${
                    securitySettings.passwordExpiry
                      ? 'bg-slate-900'
                      : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4
                    rounded-full bg-white ${
                      securitySettings.passwordExpiry
                        ? 'left-6'
                        : 'left-1'
                    }`}
                  />
                </button>

              </div>

              {/* SESSION */}

              <div className="flex items-center justify-between py-4">

                <div>
                  <div className="text-xs font-extrabold text-slate-700">
                    Session Timeout
                  </div>

                  <div className="mt-1 text-[11px] text-slate-400">
                    Automatically sign out inactive users
                  </div>
                </div>

                <button
                  onClick={() =>
                    setSecuritySettings({
                      ...securitySettings,
                      sessionTimeout:
                        !securitySettings.sessionTimeout,
                    })
                  }
                  className={`relative h-6 w-11 rounded-full ${
                    securitySettings.sessionTimeout
                      ? 'bg-slate-900'
                      : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4
                    rounded-full bg-white ${
                      securitySettings.sessionTimeout
                        ? 'left-6'
                        : 'left-1'
                    }`}
                  />
                </button>

              </div>

            </div>

          </div>

          {/* USER MANAGEMENT */}

          <div
            className="rounded-2xl border
            border-slate-200/80 bg-white
            p-6 shadow-2xs"
          >

            <div className="mb-6 flex items-center gap-3">

              <div
                className="flex h-10 w-10
                items-center justify-center
                rounded-xl bg-slate-100"
              >
                <UserCog
                  size={18}
                  className="text-slate-600"
                />
              </div>

              <div>

                <h3 className="text-sm font-extrabold text-slate-900">
                  User Management
                </h3>

                <p className="mt-1 text-[11px] font-medium text-slate-400">
                  Configure how users are managed on the platform
                </p>

              </div>

            </div>

            <div className="divide-y divide-slate-100">

              {/* REGISTRATION */}

              <div className="flex items-center justify-between py-4">

                <div>
                  <div className="text-xs font-extrabold text-slate-700">
                    Allow User Registration
                  </div>

                  <div className="mt-1 text-[11px] text-slate-400">
                    Allow new users to create their own accounts
                  </div>
                </div>

                <button
                  onClick={() =>
                    setUserSettings({
                      ...userSettings,
                      allowRegistration:
                        !userSettings.allowRegistration,
                    })
                  }
                  className={`relative h-6 w-11 rounded-full ${
                    userSettings.allowRegistration
                      ? 'bg-slate-900'
                      : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4
                    rounded-full bg-white ${
                      userSettings.allowRegistration
                        ? 'left-6'
                        : 'left-1'
                    }`}
                  />
                </button>

              </div>

              {/* APPROVAL */}

              <div className="flex items-center justify-between py-4">

                <div>
                  <div className="text-xs font-extrabold text-slate-700">
                    Require Admin Approval
                  </div>

                  <div className="mt-1 text-[11px] text-slate-400">
                    New accounts must be approved by an administrator
                  </div>
                </div>

                <button
                  onClick={() =>
                    setUserSettings({
                      ...userSettings,
                      requireApproval:
                        !userSettings.requireApproval,
                    })
                  }
                  className={`relative h-6 w-11 rounded-full ${
                    userSettings.requireApproval
                      ? 'bg-slate-900'
                      : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4
                    rounded-full bg-white ${
                      userSettings.requireApproval
                        ? 'left-6'
                        : 'left-1'
                    }`}
                  />
                </button>

              </div>

              {/* PROFILE */}

              <div className="flex items-center justify-between py-4">

                <div>
                  <div className="text-xs font-extrabold text-slate-700">
                    Allow Profile Changes
                  </div>

                  <div className="mt-1 text-[11px] text-slate-400">
                    Allow users to update their profile information
                  </div>
                </div>

                <button
                  onClick={() =>
                    setUserSettings({
                      ...userSettings,
                      allowProfileChanges:
                        !userSettings.allowProfileChanges,
                    })
                  }
                  className={`relative h-6 w-11 rounded-full ${
                    userSettings.allowProfileChanges
                      ? 'bg-slate-900'
                      : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4
                    rounded-full bg-white ${
                      userSettings.allowProfileChanges
                        ? 'left-6'
                        : 'left-1'
                    }`}
                  />
                </button>

              </div>

            </div>

          </div>

          {/* SECURITY NOTICE */}

          <div
            className="flex items-start gap-3
            rounded-2xl border border-slate-200
            bg-slate-50 p-5"
          >

            <ShieldCheck
              size={18}
              className="mt-0.5 shrink-0 text-emerald-500"
            />

            <div>

              <div className="text-xs font-extrabold text-slate-800">
                Administrator Security
              </div>

              <p
                className="mt-1 text-[11px]
                font-medium leading-5
                text-slate-500"
              >
                Security settings help protect administrator
                accounts and sensitive platform information.
                Keep two-factor authentication enabled whenever possible.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};