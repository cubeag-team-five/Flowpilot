import React from 'react';
import { FiClock } from 'react-icons/fi';

interface BoardTask {
  id: string;
  title: string;
  who: string;
  points: string;
  aging?: string;
  agingColor?: string;
}

interface BoardColumn {
  name: string;
  color: string;
  tasks: BoardTask[];
}

export const ScrumBoard: React.FC = () => {
  const columns: BoardColumn[] = [
    {
      name: 'Backlog',
      color: 'text-slate-400',
      tasks: [
        { id: 'T-043', title: 'Notification service', who: 'KD', points: '8 SP' }
      ]
    },
    {
      name: 'To Do',
      color: 'text-slate-500',
      tasks: [
        { id: 'T-047', title: 'Dark mode theming', who: 'DM', points: '5 SP' },
        { id: 'T-049', title: 'Kanban drag & drop', who: 'SR', points: '8 SP' }
      ]
    },
    {
      name: 'In Progress',
      color: 'text-amber-500',
      tasks: [
        { id: 'T-040', title: 'Design system component library', who: 'SR', points: '8 SP', aging: '3d in col', agingColor: 'text-amber-500' },
        { id: 'T-044', title: 'Mobile responsive layout', who: 'DM', points: '5 SP', aging: '2d in col', agingColor: 'text-amber-500' },
        { id: 'T-048', title: 'Role permission guard', who: 'MK', points: '5 SP', aging: '4d in col', agingColor: 'text-rose-500' }
      ]
    },
    {
      name: 'Code Review',
      color: 'text-violet-500',
      tasks: [
        { id: 'T-041', title: 'REST API docs', who: 'MK', points: '3 SP', aging: '1d in col', agingColor: 'text-amber-500' },
        { id: 'T-050', title: 'Sprint retrospective view', who: 'AK', points: '3 SP', aging: '2d in col', agingColor: 'text-amber-500' }
      ]
    },
    {
      name: 'Testing',
      color: 'text-teal-500',
      tasks: [
        { id: 'T-045', title: 'File upload S3', who: 'MK', points: '3 SP', aging: '1d in col', agingColor: 'text-amber-500' },
        { id: 'T-051', title: 'Slack notification hook', who: 'KD', points: '5 SP', aging: '1d in col', agingColor: 'text-amber-500' }
      ]
    },
    {
      name: 'Done',
      color: 'text-emerald-500',
      tasks: [
        { id: 'T-042', title: 'Velocity tracking module', who: 'SR', points: '5 SP' },
        { id: 'T-046', title: 'JWT token refresh', who: 'SR', points: '2 SP' }
      ]
    }
  ];

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-6 gap-2.5 min-w-[1020px]">
        {columns.map((col) => (
          <div key={col.name} className="bg-slate-50 border border-slate-200/70 rounded-2xl p-3">
            <div className="flex items-center justify-between mb-2.5">
              <span className={`text-[11px] font-bold ${col.color}`}>{col.name}</span>
              <span className={`text-[11px] font-extrabold ${col.color}`}>{col.tasks.length}</span>
            </div>

            {col.tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white border border-slate-200/80 rounded-lg p-2.5 mb-2 shadow-2xs hover:-translate-y-0.5 transition-transform cursor-pointer"
              >
                <div className="text-[9.5px] font-mono text-slate-300 mb-1">{task.id}</div>
                <div className="text-[11.5px] font-semibold text-slate-900 leading-snug mb-2">{task.title}</div>

                <div className="flex items-center justify-between">
                  <div className="w-[22px] h-[22px] rounded-[7px] bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-[9px] font-extrabold">
                    {task.who}
                  </div>
                  <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded-[5px] bg-slate-100 text-slate-500">
                    {task.points}
                  </span>
                </div>

                {task.aging && (
                  <div className={`mt-1.5 flex items-center gap-1 text-[9.5px] font-semibold ${task.agingColor}`}>
                    <FiClock size={9} /> {task.aging}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
