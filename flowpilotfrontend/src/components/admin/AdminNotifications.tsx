import React, { useState } from 'react';
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  UserPlus,
  ShieldAlert,
  FolderKanban,
  Settings,
  Info,
  MoreVertical,
} from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'user' | 'security' | 'project' | 'system' | 'info';
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: 'New user added',
    message: 'A new user has been added to the IPMT Platform.',
    time: '10 minutes ago',
    type: 'user',
    read: false,
  },
  {
    id: 2,
    title: 'Security alert',
    message: 'Multiple unsuccessful login attempts detected.',
    time: '1 hour ago',
    type: 'security',
    read: false,
  },
  {
    id: 3,
    title: 'Project updated',
    message: 'IPMT Platform v2 progress has been updated to 68%.',
    time: '2 hours ago',
    type: 'project',
    read: false,
  },
  {
    id: 4,
    title: 'System maintenance',
    message: 'Scheduled system maintenance is planned for this weekend.',
    time: '5 hours ago',
    type: 'system',
    read: true,
  },
  {
    id: 5,
    title: 'Department created',
    message: 'The DevOps department was successfully created.',
    time: 'Yesterday',
    type: 'info',
    read: true,
  },
  {
    id: 6,
    title: 'Role change approved',
    message: 'Rohit Varma has been assigned the Business Analyst role.',
    time: 'Yesterday',
    type: 'user',
    read: true,
  },
  {
    id: 7,
    title: 'Project deadline approaching',
    message: 'QA Automation project deadline is approaching.',
    time: '2 days ago',
    type: 'project',
    read: true,
  },
];

export const AdminNotifications: React.FC = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const [filter, setFilter] = useState<'All' | 'Unread'>('All');

  const [openMenu, setOpenMenu] =
    useState<number | null>(null);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const displayedNotifications =
    filter === 'Unread'
      ? notifications.filter(
          (notification) => !notification.read
        )
      : notifications;

  const markAsRead = (id: number) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );

    setOpenMenu(null);
  };

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((previous) =>
      previous.filter(
        (notification) => notification.id !== id
      )
    );

    setOpenMenu(null);
  };

  const getNotificationIcon = (
    type: Notification['type']
  ) => {
    switch (type) {
      case 'user':
        return (
          <UserPlus
            size={17}
            className="text-cyan-600"
          />
        );

      case 'security':
        return (
          <ShieldAlert
            size={17}
            className="text-rose-500"
          />
        );

      case 'project':
        return (
          <FolderKanban
            size={17}
            className="text-purple-500"
          />
        );

      case 'system':
        return (
          <Settings
            size={17}
            className="text-amber-500"
          />
        );

      default:
        return (
          <Info
            size={17}
            className="text-slate-500"
          />
        );
    }
  };

  const getIconBackground = (
    type: Notification['type']
  ) => {
    switch (type) {
      case 'user':
        return 'bg-cyan-50';

      case 'security':
        return 'bg-rose-50';

      case 'project':
        return 'bg-purple-50';

      case 'system':
        return 'bg-amber-50';

      default:
        return 'bg-slate-100';
    }
  };

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <div className="flex items-center gap-3">

            <h1 className="text-2xl font-black text-slate-900">
              Notifications
            </h1>

            {unreadCount > 0 && (
              <span
                className="rounded-full bg-rose-50 px-2.5 py-1
                text-[10px] font-extrabold text-rose-500"
              >
                {unreadCount} unread
              </span>
            )}

          </div>

          <p className="mt-1 text-sm font-medium text-slate-400">
            Stay updated with important system and platform activity
          </p>

        </div>

        <button
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="inline-flex items-center justify-center gap-2
          rounded-xl border border-slate-200 bg-white
          px-4 py-2.5 text-xs font-extrabold text-slate-600
          transition hover:bg-slate-50
          disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CheckCheck size={15} />
          Mark all as read
        </button>

      </div>

      {/* SUMMARY CARDS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* TOTAL */}

        <div
          className="rounded-2xl border border-slate-200/80
          bg-white p-5 shadow-2xs"
        >

          <div
            className="mb-2 text-[11px] font-extrabold
            uppercase tracking-wider text-slate-400"
          >
            TOTAL NOTIFICATIONS
          </div>

          <div
            className="mb-2 text-3xl font-black
            leading-none text-slate-900"
          >
            {notifications.length}
          </div>

          <div className="text-xs font-bold text-slate-500">
            All notifications
          </div>

        </div>

        {/* UNREAD */}

        <div
          className="rounded-2xl border border-slate-200/80
          bg-white p-5 shadow-2xs"
        >

          <div
            className="mb-2 text-[11px] font-extrabold
            uppercase tracking-wider text-slate-400"
          >
            UNREAD
          </div>

          <div
            className="mb-2 text-3xl font-black
            leading-none text-slate-900"
          >
            {unreadCount}
          </div>

          <div className="text-xs font-bold text-rose-500">
            Requires attention
          </div>

        </div>

        {/* READ */}

        <div
          className="rounded-2xl border border-slate-200/80
          bg-white p-5 shadow-2xs"
        >

          <div
            className="mb-2 text-[11px] font-extrabold
            uppercase tracking-wider text-slate-400"
          >
            READ
          </div>

          <div
            className="mb-2 text-3xl font-black
            leading-none text-slate-900"
          >
            {notifications.length - unreadCount}
          </div>

          <div className="text-xs font-bold text-emerald-500">
            Already reviewed
          </div>

        </div>

      </div>

      {/* NOTIFICATION LIST */}

      <div
        className="rounded-2xl border border-slate-200/80
        bg-white p-6 shadow-2xs"
      >

        {/* LIST HEADER */}

        <div
          className="mb-5 flex flex-col gap-4
          sm:flex-row sm:items-center sm:justify-between"
        >

          <div>

            <h3 className="text-sm font-extrabold text-slate-900">
              Recent Notifications
            </h3>

            <p className="mt-1 text-[11px] font-medium text-slate-400">
              {displayedNotifications.length} notifications shown
            </p>

          </div>

          {/* FILTER */}

          <div className="flex rounded-xl bg-slate-100 p-1">

            <button
              onClick={() => setFilter('All')}
              className={`rounded-lg px-4 py-2 text-xs font-extrabold
              transition ${
                filter === 'All'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter('Unread')}
              className={`rounded-lg px-4 py-2 text-xs font-extrabold
              transition ${
                filter === 'Unread'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Unread
            </button>

          </div>

        </div>

        {/* NOTIFICATIONS */}

        <div className="space-y-2">

          {displayedNotifications.map(
            (notification) => (

              <div
                key={notification.id}
                className={`relative flex items-start gap-3
                rounded-xl border p-4 transition
                ${
                  notification.read
                    ? 'border-slate-100 bg-white'
                    : 'border-slate-200 bg-slate-50/70'
                }`}
              >

                {/* ICON */}

                <div
                  className={`flex h-10 w-10 shrink-0
                  items-center justify-center rounded-xl
                  ${getIconBackground(notification.type)}`}
                >
                  {getNotificationIcon(
                    notification.type
                  )}
                </div>

                {/* CONTENT */}

                <div className="min-w-0 flex-1">

                  <div className="flex items-center gap-2">

                    <h4
                      className={`text-xs ${
                        notification.read
                          ? 'font-bold'
                          : 'font-extrabold'
                      } text-slate-800`}
                    >
                      {notification.title}
                    </h4>

                    {!notification.read && (
                      <span
                        className="h-1.5 w-1.5 rounded-full
                        bg-cyan-400"
                      />
                    )}

                  </div>

                  <p
                    className="mt-1 text-xs font-medium
                    leading-relaxed text-slate-400"
                  >
                    {notification.message}
                  </p>

                  <div className="mt-2 text-[10px] font-bold text-slate-400">
                    {notification.time}
                  </div>

                </div>

                {/* ACTION MENU */}

                <div className="relative shrink-0">

                  <button
                    onClick={() =>
                      setOpenMenu(
                        openMenu === notification.id
                          ? null
                          : notification.id
                      )
                    }
                    className="rounded-lg p-1.5
                    text-slate-400 transition
                    hover:bg-slate-100
                    hover:text-slate-700"
                  >
                    <MoreVertical size={16} />
                  </button>

                  {openMenu === notification.id && (

                    <div
                      className="absolute right-0 top-9 z-20
                      w-40 rounded-xl border
                      border-slate-200 bg-white
                      py-1.5 shadow-lg"
                    >

                      {!notification.read && (
                        <button
                          onClick={() =>
                            markAsRead(notification.id)
                          }
                          className="flex w-full items-center
                          gap-2 px-3 py-2 text-xs
                          font-bold text-slate-600
                          hover:bg-slate-50"
                        >
                          <Check size={13} />
                          Mark as read
                        </button>
                      )}

                      <button
                        onClick={() =>
                          deleteNotification(
                            notification.id
                          )
                        }
                        className="flex w-full items-center
                        gap-2 px-3 py-2 text-xs
                        font-bold text-rose-500
                        hover:bg-rose-50"
                      >
                        <Trash2 size={13} />
                        Delete
                      </button>

                    </div>

                  )}

                </div>

              </div>
            )
          )}

        </div>

        {/* EMPTY STATE */}

        {displayedNotifications.length === 0 && (

          <div className="py-12 text-center">

            <div
              className="mx-auto flex h-12 w-12
              items-center justify-center rounded-2xl
              bg-slate-100"
            >
              <Bell
                size={22}
                className="text-slate-400"
              />
            </div>

            <p
              className="mt-4 text-sm font-extrabold
              text-slate-600"
            >
              No notifications found
            </p>

            <p
              className="mt-1 text-xs font-medium
              text-slate-400"
            >
              You're all caught up.
            </p>

          </div>

        )}

      </div>

    </div>
  );
};