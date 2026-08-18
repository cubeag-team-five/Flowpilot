import React from 'react';
import { Plus, FileText, Settings } from 'lucide-react';

interface SuperAdminDashboardProps {
  onNavigate?: (tab: string) => void;
}

const recentUsers = [
  {
    name: 'Rajeev Kumar',
    role: 'Super Admin',
    department: 'Leadership',
    time: '2 min ago',
    initials: 'RK',
  },
  {
    name: 'Nisha Agarwal',
    role: 'Admin',
    department: 'Operations',
    time: '12 min ago',
    initials: 'NA',
  },
  {
    name: 'Arjun Shah',
    role: 'Project Manager',
    department: 'Product',
    time: '1h ago',
    initials: 'AS',
  },
  {
    name: 'Aryan Kapoor',
    role: 'Scrum Master',
    department: 'Engineering',
    time: '30 min ago',
    initials: 'AK',
  },
  {
    name: 'Sneha Rao',
    role: 'Developer',
    department: 'Engineering',
    time: '5 min ago',
    initials: 'SR',
  },
];

const systemHealth = [
  {
    name: 'Database',
    value: 99,
    color: '#10b981',
    textColor: '#10b981',
  },
  {
    name: 'API Server',
    value: 100,
    color: '#10b981',
    textColor: '#10b981',
  },
  {
    name: 'Storage',
    value: 67,
    color: '#f59e0b',
    textColor: '#f59e0b',
  },
  {
    name: 'Email Service',
    value: 100,
    color: '#10b981',
    textColor: '#10b981',
  },
  {
    name: 'Auth Service',
    value: 100,
    color: '#10b981',
    textColor: '#10b981',
  },
  {
    name: 'File CDN',
    value: 88,
    color: '#38bdf8',
    textColor: '#38bdf8',
  },
];

const statistics = [
  {
    title: 'TOTAL USERS',
    value: '48',
    footer: '↑ 3 this week',
    footerColor: '#10b981',
  },
  {
    title: 'DEPARTMENTS',
    value: '6',
    footer: 'All active',
    footerColor: '#10b981',
  },
  {
    title: 'ACTIVE PROJECTS',
    value: '24',
    footer: '5 at risk',
    footerColor: '#f59e0b',
  },
  {
    title: 'SYSTEM UPTIME',
    value: '99.9%',
    footer: 'Last 30 days',
    footerColor: '#10b981',
  },
];

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({
  onNavigate,
}) => {
  return (
    <div
      className="
        w-full
        min-w-0
        bg-[#f8fafc]
        font-['Plus_Jakarta_Sans',sans-serif]
        px-[30px]
        py-[28px]
        sm:px-[30px]
        sm:py-[28px]
        lg:px-[30px]
        xl:px-[30px]
      "
    >

      {/* STATISTICS */}

      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {statistics.map((stat) => (
          <div
            key={stat.title}
            className="
              h-[136px]
              min-w-0
              rounded-[18px]
              border
              border-[#efefef]
              bg-white
              px-6
              py-5
              shadow-[0_2px_8px_rgba(0,0,0,0.02)]
              flex
              flex-col
              justify-between
            "
          >
            <div
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.05em]
                text-[#8c94a0]
              "
            >
              {stat.title}
            </div>

            <div
              className="
                text-[34px]
                font-extrabold
                leading-none
                tracking-tight
                text-[#0a0a0a]
              "
            >
              {stat.value}
            </div>

            <div
              className="text-[12px] font-semibold"
              style={{ color: stat.footerColor }}
            >
              {stat.footer}
            </div>
          </div>
        ))}
      </div>

      {/* MAIN TWO-COLUMN SECTION */}

      <div
        className="
          mt-7
          grid
          grid-cols-1
          gap-5
          lg:grid-cols-2
        "
      >

        {/* RECENT USERS */}

        <div
          className="
            min-w-0
            h-auto
            rounded-[18px]
            border
            border-[#efefef]
            bg-white
            px-6
            py-5
            shadow-[0_2px_8px_rgba(0,0,0,0.02)]
          "
        >
          <h3
            className="
              mb-3
              text-[16px]
              font-bold
              text-[#0a0a0a]
            "
          >
            Recent User Registrations
          </h3>

          <div className="divide-y divide-[#f2f2f2]">

            {recentUsers.map((user) => (
              <div
                key={user.name}
                className="
                  flex
                  min-w-0
                  items-center
                  justify-between
                  gap-3
                  py-[11px]
                "
              >

                <div className="flex min-w-0 items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#3cd19c]
                      text-[12px]
                      font-bold
                      text-white
                    "
                  >
                    {user.initials}
                  </div>

                  <div className="min-w-0">

                    <div
                      className="
                        truncate
                        text-[13px]
                        font-bold
                        text-[#0a0a0a]
                      "
                    >
                      {user.name}
                    </div>

                    <div
                      className="
                        mt-0.5
                        truncate
                        text-[11px]
                        font-medium
                        text-[#8c94a0]
                      "
                    >
                      {user.role} · {user.department}
                    </div>

                  </div>

                </div>

                <span
                  className="
                    shrink-0
                    whitespace-nowrap
                    text-[11px]
                    font-medium
                    text-[#8c94a0]
                  "
                >
                  {user.time}
                </span>

              </div>
            ))}

          </div>
        </div>

        {/* SYSTEM HEALTH */}

        <div
          className="
            min-w-0
            rounded-[18px]
            border
            border-[#efefef]
            bg-white
            px-6
            py-5
            shadow-[0_2px_8px_rgba(0,0,0,0.02)]
          "
        >
          <h3
            className="
              mb-5
              text-[16px]
              font-bold
              text-[#0a0a0a]
            "
          >
            System Health
          </h3>

          <div className="space-y-[14px]">

            {systemHealth.map((service) => (
              <div
                key={service.name}
                className="min-w-0"
              >

                <div
                  className="
                    mb-[6px]
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >
                  <span
                    className="
                      truncate
                      text-[13px]
                      font-medium
                      text-[#333b48]
                    "
                  >
                    {service.name}
                  </span>

                  <span
                    className="
                      shrink-0
                      text-[13px]
                      font-bold
                    "
                    style={{
                      color: service.textColor,
                    }}
                  >
                    {service.value}%
                  </span>
                </div>

                <div
                  className="
                    h-[5px]
                    w-full
                    overflow-hidden
                    rounded-full
                    bg-[#f1f5f9]
                  "
                >
                  <div
                    className="
                      h-full
                      rounded-full
                      transition-all
                      duration-300
                    "
                    style={{
                      width: `${service.value}%`,
                      backgroundColor: service.color,
                    }}
                  />
                </div>

              </div>
            ))}

          </div>
        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div
        className="
          mt-5
          min-w-0
          rounded-[18px]
          border
          border-[#efefef]
          bg-white
          px-6
          py-5
          shadow-[0_2px_8px_rgba(0,0,0,0.02)]
        "
      >

        <h3
          className="
            mb-4
            text-[16px]
            font-bold
            text-[#0a0a0a]
          "
        >
          Quick Actions
        </h3>

        <div
          className="
            grid
            grid-cols-1
            gap-3
            sm:grid-cols-2
            lg:flex
            lg:flex-wrap
          "
        >

          {/* ADD USER */}

          <button
            type="button"
            onClick={() => onNavigate?.('User Management')}
            className="
              flex
              h-[44px]
              w-full
              cursor-pointer
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#bbf7d0]
              bg-[#f0fdf4]
              px-5
              text-[12px]
              font-bold
              text-[#16a34a]
              transition-colors
              hover:bg-[#dcfce7]
              lg:w-auto
            "
          >
            <Plus size={16} strokeWidth={2.5} />
            Add User
          </button>

          {/* NEW DEPARTMENT */}

          <button
            type="button"
            onClick={() => onNavigate?.('Departments')}
            className="
              flex
              h-[44px]
              w-full
              cursor-pointer
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#e9d5ff]
              bg-[#faf5ff]
              px-5
              text-[12px]
              font-bold
              text-[#9333ea]
              transition-colors
              hover:bg-[#f3e8ff]
              lg:w-auto
            "
          >
            <Plus size={16} strokeWidth={2.5} />
            New Department
          </button>

          {/* AUDIT LOGS */}

          <button
            type="button"
            onClick={() => onNavigate?.('Audit Logs')}
            className="
              flex
              h-[44px]
              w-full
              cursor-pointer
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#fecdd3]
              bg-[#fff1f2]
              px-5
              text-[12px]
              font-bold
              text-[#e11d48]
              transition-colors
              hover:bg-[#ffe4e6]
              lg:w-auto
            "
          >
            <FileText size={16} strokeWidth={2.5} />
            View Audit Logs
          </button>

          {/* SYSTEM SETTINGS */}

          <button
            type="button"
            onClick={() => onNavigate?.('System Settings')}
            className="
              flex
              h-[44px]
              w-full
              cursor-pointer
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#e2e8f0]
              bg-white
              px-5
              text-[12px]
              font-bold
              text-[#475569]
              transition-colors
              hover:bg-[#f8fafc]
              lg:w-auto
            "
          >
            <Settings size={16} strokeWidth={2.5} />
            System Settings
          </button>

        </div>
      </div>

    </div>
  );
};

export default SuperAdminDashboard;