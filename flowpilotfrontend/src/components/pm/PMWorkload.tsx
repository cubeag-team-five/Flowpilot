
// Each member has a color theme: avatar bg/text, filled segment, empty segment
const colorThemes = {
  teal: {
    avatarBg: "bg-teal-100",
    avatarText: "text-teal-600",
    filled: "bg-teal-400",
    empty: "bg-teal-50",
  },
  violet: {
    avatarBg: "bg-violet-100",
    avatarText: "text-violet-600",
    filled: "bg-violet-400",
    empty: "bg-violet-50",
  },
  amber: {
    avatarBg: "bg-amber-100",
    avatarText: "text-amber-600",
    filled: "bg-amber-500",
    empty: "bg-amber-50",
  },
  green: {
    avatarBg: "bg-green-100",
    avatarText: "text-green-600",
    filled: "bg-green-500",
    empty: "bg-green-50",
  },
  red: {
    avatarBg: "bg-rose-100",
    avatarText: "text-rose-600",
    filled: "bg-rose-500",
    empty: "bg-rose-50",
  },
};

const team = [
  {
    initials: "SR",
    name: "Sneha Rao",
    role: "Frontend Dev",
    done: 5,
    assigned: 8,
    theme: "teal",
  },
  {
    initials: "MK",
    name: "Mihir Khatri",
    role: "Backend Dev",
    done: 3,
    assigned: 6,
    theme: "violet",
  },
  {
    initials: "DM",
    name: "Divya Mehta",
    role: "UI Designer",
    done: 4,
    assigned: 5,
    theme: "amber",
  },
  {
    initials: "PR",
    name: "Priya Rajan",
    role: "QA Engineer",
    done: 2,
    assigned: 7,
    theme: "green",
  },
  {
    initials: "KD",
    name: "Karan Dev",
    role: "Backend Dev",
    done: 1,
    assigned: 4,
    theme: "red",
  },
];


function WorkloadBar({ done, assigned, theme }: { done: number; assigned: number; theme: { filled: string; empty: string } }) {
  const segments = Array.from({ length: assigned }, (_, i) => i < done);

  return (
    <div className="flex w-full gap-1">
      {segments.map((isFilled, i) => (
        <div
          key={i}
          className={`h-5 flex-3 rounded-full ${
            isFilled ? theme.filled : theme.empty
          }`}
        />
      ))}
    </div>
  );
}

function WorkloadRow({ initials, name, role, done, assigned, theme: themeKey }: { initials: string; name: string; role: string; done: number; assigned: number; theme: "teal" | "violet" | "amber" | "green" | "red" }) {
  const theme = colorThemes[themeKey];
  const percent = Math.round((done / assigned) * 100);

  return (
    <div className="flex flex-col gap-6 border-b border-slate-50 py-5 last:border-none sm:flex-row sm:items-center sm:gap-4">
      {/* Avatar + name */}
      <div className="flex items-center gap-4 sm:w-50 sm:shrink-0">
        <div
          className={`flex h-11   w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${theme.avatarBg} ${theme.avatarText}`}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-medium font-bold text-slate-900">{name}</p>
          <p className="truncate text-xs text-slate-400">{role}</p>
        </div>
      </div>

      {/* Bar + caption */}
      <div className="flex-3">
        <WorkloadBar done={done} assigned={assigned} theme={theme} />
        <p className="mt-1.5 text-xs text-slate-400">
          {done} done / {assigned} assigned
        </p>
      </div>

      {/* Percent */}
      <div className="text-right sm:w-24 sm:shrink-0">
        <p className="text-lg font-bold text-slate-900">{percent}%</p>
        <p className="text-xs text-slate-400">complete</p>
      </div>
    </div>
  );
}

function TeamWorkloadCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
      <h2 className="mb-2 text-base font-bold text-slate-900 sm:text-lg">
        Team Workload — Sprint 12
      </h2>
      <div>
        {team.map((member) => (
          <WorkloadRow key={member.name} {...member} />
        ))}
      </div>
    </div>
  );
}

export default function TeamWorkloadPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50 lg:flex-row">
      <div className="lg:sticky lg:top-0 lg:h-screen">
        <Sidebar />
      </div>

      <div className="flex-1">
        <Topbar />

        <main className="p-4 sm:p-6 lg:p-8">
          <TeamWorkloadCard />
        </main>
      </div>
    </div>
  );
}