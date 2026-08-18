const colorThemes = {
  teal: { avatarBg: "bg-teal-100", avatarText: "text-teal-600", filled: "bg-teal-400", empty: "bg-teal-50" },
  violet: { avatarBg: "bg-violet-100", avatarText: "text-violet-600", filled: "bg-violet-400", empty: "bg-violet-50" },
  amber: { avatarBg: "bg-amber-100", avatarText: "text-amber-600", filled: "bg-amber-500", empty: "bg-amber-50" },
  green: { avatarBg: "bg-green-100", avatarText: "text-green-600", filled: "bg-green-500", empty: "bg-green-50" },
  red: { avatarBg: "bg-rose-100", avatarText: "text-rose-600", filled: "bg-rose-500", empty: "bg-rose-50" },
};

const team = [
  { initials: "SR", name: "Sneha Rao", role: "Frontend Dev", done: 5, assigned: 8, theme: "teal" as const },
  { initials: "MK", name: "Mihir Khatri", role: "Backend Dev", done: 3, assigned: 6, theme: "violet" as const },
  { initials: "DM", name: "Divya Mehta", role: "UI Designer", done: 4, assigned: 5, theme: "amber" as const },
  { initials: "PR", name: "Priya Rajan", role: "QA Engineer", done: 2, assigned: 7, theme: "green" as const },
  { initials: "KD", name: "Karan Dev", role: "Backend Dev", done: 1, assigned: 4, theme: "red" as const },
];

function WorkloadBar({ done, assigned, theme }: { done: number; assigned: number; theme: { filled: string; empty: string } }) {
  const segments = Array.from({ length: assigned }, (_, i) => i < done);
  return (
    <div className="flex w-full gap-1.5">
      {segments.map((isFilled, i) => (
        <div key={i} className={`h-3 flex-1 rounded-full ${isFilled ? theme.filled : theme.empty}`} />
      ))}
    </div>
  );
}

function WorkloadRow({ initials, name, role, done, assigned, theme: themeKey }: { initials: string; name: string; role: string; done: number; assigned: number; theme: keyof typeof colorThemes }) {
  const theme = colorThemes[themeKey];
  const percent = Math.round((done / assigned) * 100);
  return (
    <div className="flex flex-col gap-4 border-b border-slate-100 py-5 last:border-none sm:flex-row sm:items-center sm:gap-6">
      <div className="flex items-center gap-3 sm:w-48 sm:shrink-0">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${theme.avatarBg} ${theme.avatarText}`}>
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-900">{name}</p>
          <p className="truncate text-xs text-slate-400">{role}</p>
        </div>
      </div>
      <div className="flex-1">
        <WorkloadBar done={done} assigned={assigned} theme={theme} />
        <p className="mt-2 text-xs text-slate-400">{done} done / {assigned} assigned</p>
      </div>
      <div className="text-right sm:w-24 sm:shrink-0">
        <p className="text-lg font-bold text-slate-900">{percent}%</p>
        <p className="text-xs text-slate-400">complete</p>
      </div>
    </div>
  );
}

export function PMWorkload() {
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
