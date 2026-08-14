import React from "react";

interface SprintCard {
  id: string;
  title: string;
  member: string;
  points: number;
  isMyTask?: boolean;
  completed?: boolean;
}

interface SprintColumn {
  title: string;
  count: number;
  cards: SprintCard[];
}

const columns: SprintColumn[] = [
  {
    title: "To Do",
    count: 3,
    cards: [
      {
        id: "T-043",
        title: "Notification service",
        member: "KD",
        points: 8,
      },
      {
        id: "T-047",
        title: "Dark mode theming",
        member: "DM",
        points: 5,
      },
      {
        id: "T-049",
        title: "Kanban drag & drop",
        member: "SR",
        points: 8,
        isMyTask: true,
      },
    ],
  },
  {
    title: "In Progress",
    count: 3,
    cards: [
      {
        id: "T-040",
        title: "Design system component library",
        member: "SR",
        points: 8,
        isMyTask: true,
      },
      {
        id: "T-044",
        title: "Mobile responsive layout",
        member: "SR",
        points: 5,
        isMyTask: true,
      },
      {
        id: "T-048",
        title: "Role permission guard",
        member: "MK",
        points: 5,
      },
    ],
  },
  {
    title: "Code Review",
    count: 2,
    cards: [
      {
        id: "T-041",
        title: "REST API docs",
        member: "MK",
        points: 3,
      },
      {
        id: "T-050",
        title: "Sprint retrospective view",
        member: "AK",
        points: 3,
      },
    ],
  },
  {
    title: "Testing",
    count: 1,
    cards: [
      {
        id: "T-045",
        title: "File upload S3",
        member: "MK",
        points: 3,
      },
    ],
  },
  {
    title: "Done",
    count: 1,
    cards: [
      {
        id: "T-046",
        title: "JWT token refresh",
        member: "SR",
        points: 2,
        isMyTask: true,
        completed: true,
      },
    ],
  },
];

const DeveloperSprintBoard: React.FC = () => {
  return (
    <div className="w-full">
      {/* Info Banner */}
      <div className="mb-3 rounded-xl border border-teal-100 bg-teal-50/70 px-4 py-2.5 text-sm text-gray-500">
        💡 Your tasks are highlighted. Other tasks shown for visibility.
      </div>

      {/* Board */}
      <div className="overflow-x-auto pb-3">
        <div className="grid min-w-[1180px] grid-cols-5 gap-3">
          {columns.map((column) => (
            <div
              key={column.title}
              className="min-h-[380px] rounded-2xl border border-gray-100 bg-white/60 p-2.5"
            >
              {/* Column Header */}
              <div className="px-2 py-2">
                <h3
                  className={`text-sm font-semibold ${
                    column.title === "In Progress"
                      ? "text-orange-500"
                      : column.title === "Code Review"
                      ? "text-violet-400"
                      : column.title === "Testing"
                      ? "text-teal-400"
                      : column.title === "Done"
                      ? "text-emerald-500"
                      : "text-slate-500"
                  }`}
                >
                  {column.title} ({column.count})
                </h3>
              </div>

              {/* Cards */}
              <div className="space-y-2">
                {column.cards.map((card) => {
                  const highlighted = card.isMyTask;
                  const completed = card.completed;

                  return (
                    <div
                      key={card.id}
                      className={`rounded-xl border bg-white p-3 transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md ${
                        highlighted
                          ? completed
                            ? "border-emerald-300"
                            : "border-orange-300"
                          : "border-gray-100"
                      }`}
                    >
                      {highlighted && (
                        <div
                          className={`mb-1 text-[10px] font-semibold tracking-wide ${
                            completed
                              ? "text-teal-400"
                              : "text-teal-400"
                          }`}
                        >
                          MY TASK
                        </div>
                      )}

                      <div className="font-mono text-[11px] text-gray-300">
                        {card.id}
                      </div>

                      <div
                        className={`mt-1 pr-5 text-sm ${
                          highlighted
                            ? "font-semibold text-gray-900"
                            : "font-medium text-gray-500"
                        }`}
                      >
                        {card.title}
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <span
                          className={`text-[11px] ${
                            highlighted
                              ? "text-gray-400"
                              : "text-gray-300"
                          }`}
                        >
                          {card.member}
                        </span>

                        <span
                          className={`rounded-md px-2 py-1 text-[10px] font-semibold ${
                            highlighted
                              ? "bg-gray-50 text-gray-500"
                              : "bg-gray-50 text-gray-300"
                          }`}
                        >
                          {card.points}p
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { DeveloperSprintBoard };
export default DeveloperSprintBoard;