import React from 'react';
import { FiClock } from 'react-icons/fi';
import { TYPE, SURFACE, STATUS, type StatusKey } from './scrumUI';

interface BoardTask {
  id: string;
  title: string;
  who: string;
  points: number;
  /** Days sitting in the current column — the scrum master's early warning. */
  ageDays?: number;
}

interface BoardColumn {
  name: string;
  tone: StatusKey;
  tasks: BoardTask[];
}

/** A card ageing past this many days in one column is treated as stuck. */
const STUCK_AFTER_DAYS = 3;

export const ScrumBoard: React.FC = () => {
  const columns: BoardColumn[] = [
    {
      name: 'Backlog',
      tone: 'idle',
      tasks: [{ id: 'T-043', title: 'Notification service', who: 'KD', points: 8 }]
    },
    {
      name: 'To do',
      tone: 'idle',
      tasks: [
        { id: 'T-047', title: 'Dark mode theming', who: 'DM', points: 5 },
        { id: 'T-049', title: 'Kanban drag & drop', who: 'SR', points: 8 }
      ]
    },
    {
      name: 'In progress',
      tone: 'active',
      tasks: [
        { id: 'T-040', title: 'Design system component library', who: 'SR', points: 8, ageDays: 3 },
        { id: 'T-044', title: 'Mobile responsive layout', who: 'DM', points: 5, ageDays: 2 },
        { id: 'T-048', title: 'Role permission guard', who: 'MK', points: 5, ageDays: 4 }
      ]
    },
    {
      name: 'Code review',
      tone: 'plan',
      tasks: [
        { id: 'T-041', title: 'REST API docs', who: 'MK', points: 3, ageDays: 1 },
        { id: 'T-050', title: 'Sprint retrospective view', who: 'AK', points: 3, ageDays: 2 }
      ]
    },
    {
      name: 'Testing',
      tone: 'test',
      tasks: [
        { id: 'T-045', title: 'File upload S3', who: 'MK', points: 3, ageDays: 1 },
        { id: 'T-051', title: 'Slack notification hook', who: 'KD', points: 5, ageDays: 1 }
      ]
    },
    {
      name: 'Done',
      tone: 'done',
      tasks: [
        { id: 'T-042', title: 'Velocity tracking module', who: 'SR', points: 5 },
        { id: 'T-046', title: 'JWT token refresh', who: 'SR', points: 2 }
      ]
    }
  ];

  const totalPoints = columns.reduce(
    (sum, col) => sum + col.tasks.reduce((n, t) => n + t.points, 0),
    0
  );

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <h2 className={`${TYPE.title} text-slate-900`}>Sprint 12 board</h2>
        <span className={`${TYPE.meta} text-slate-500 tabular-nums`}>
          {columns.reduce((n, c) => n + c.tasks.length, 0)} tasks · {totalPoints} points
        </span>
      </div>

      {/*
        Phones get a snap-scrolling carousel — one column fills the screen and
        swipes sideways. From lg the whole board is visible as a 6-up grid.
      */}
      <div
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 -mx-1 px-1
          lg:grid lg:grid-cols-6 lg:overflow-x-visible lg:mx-0 lg:px-0 lg:pb-0"
      >
        {columns.map((col) => {
          const points = col.tasks.reduce((n, t) => n + t.points, 0);

          return (
            <section
              key={col.name}
              aria-label={col.name}
              className="snap-start shrink-0 w-[78vw] sm:w-[280px] lg:w-auto
                bg-slate-50/80 border border-slate-200/70 rounded-2xl p-3"
            >
              <header className="flex items-center gap-2 mb-3 px-0.5">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS[col.tone].rail}`} aria-hidden="true" />
                <h3 className={`${TYPE.eyebrow} ${STATUS[col.tone].text} truncate`}>{col.name}</h3>
                <span className={`${TYPE.meta} text-slate-400 tabular-nums ml-auto shrink-0`}>
                  {col.tasks.length} · {points}p
                </span>
              </header>

              <ul className="space-y-2">
                {col.tasks.map((task) => {
                  const stuck = (task.ageDays ?? 0) >= STUCK_AFTER_DAYS;

                  return (
                    <li key={task.id}>
                      <article
                        className={`${SURFACE.card} ${SURFACE.padTight} relative overflow-hidden
                          hover:border-slate-300 hover:shadow-xs transition-shadow cursor-pointer`}
                      >
                        {stuck && (
                          <span className="absolute inset-y-0 left-0 w-[3px] bg-rose-500" aria-hidden="true" />
                        )}

                        <div className="flex items-center justify-between gap-2">
                          <span className={`${TYPE.code} text-slate-400`}>{task.id}</span>
                          <span className={`${TYPE.meta} font-semibold text-slate-500 tabular-nums`}>
                            {task.points}p
                          </span>
                        </div>

                        <h4 className={`${TYPE.body} font-medium text-slate-900 leading-snug mt-1.5`}>
                          {task.title}
                        </h4>

                        <div className="flex items-center gap-2 mt-3">
                          <span
                            className={`w-6 h-6 rounded-full shrink-0 grid place-items-center
                              ${TYPE.code} font-semibold bg-slate-100 text-slate-600`}
                            title={task.who}
                          >
                            {task.who}
                          </span>

                          {task.ageDays !== undefined && (
                            <span
                              className={`${TYPE.meta} inline-flex items-center gap-1 ml-auto font-medium
                                ${stuck ? STATUS.blocked.text : 'text-slate-400'}`}
                            >
                              <FiClock size={11} aria-hidden="true" />
                              {task.ageDays}d
                              {stuck && <span className="sr-only"> — stuck in this column</span>}
                            </span>
                          )}
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <p className={`${TYPE.meta} text-slate-400 mt-1 lg:hidden`}>Swipe to see the remaining columns</p>
    </div>
  );
};
