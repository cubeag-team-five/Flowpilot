import React, { useCallback, useEffect, useState } from 'react';
import { FiClock, FiPlus, FiTrash2, FiRefreshCw } from 'react-icons/fi';
import { TYPE, SURFACE, STATUS, type StatusKey } from './scrumUI';
import {
  fetchBoard,
  fetchMembers,
  createTask,
  updateTask,
  deleteTask,
  type BoardResponse,
  type BoardColumn,
  type Member,
  type TaskStatus
} from './scrumApi';

/** A card sitting this long in one column is treated as stuck. */
const STUCK_AFTER_DAYS = 3;

const COLUMN_TONE: Record<TaskStatus, StatusKey> = {
  BACKLOG: 'idle',
  TODO: 'idle',
  IN_PROGRESS: 'active',
  CODE_REVIEW: 'plan',
  TESTING: 'test',
  DONE: 'done'
};

const ORDER: TaskStatus[] = [
  'BACKLOG', 'TODO', 'IN_PROGRESS', 'CODE_REVIEW', 'TESTING', 'DONE'
];

export const ScrumBoard: React.FC = () => {
  const [board, setBoard] = useState<BoardResponse | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState<number | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [points, setPoints] = useState('3');
  const [assigneeId, setAssigneeId] = useState('');
  const [newStatus, setNewStatus] = useState<TaskStatus>('TODO');
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setError('');

    try {
      const [boardData, memberData] = await Promise.all([fetchBoard(), fetchMembers()]);
      setBoard(boardData);
      setMembers(memberData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load the board');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const mutate = async (id: number, action: () => Promise<unknown>) => {
    setBusyId(id);
    setError('');

    try {
      await action();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'That change did not save');
    } finally {
      setBusyId(null);
    }
  };

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await createTask({
        title: title.trim(),
        storyPoints: Number(points) || 0,
        assigneeId: assigneeId ? Number(assigneeId) : null,
        sprintId: board?.sprintId ?? null,
        status: newStatus
      });

      setTitle('');
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create the task');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className={`${SURFACE.card} ${SURFACE.pad} ${TYPE.body} text-slate-500`}>
        Loading the board…
      </div>
    );
  }

  if (!board) {
    return (
      <div className={`${SURFACE.card} ${SURFACE.pad} border-rose-500/20`}>
        <p className={`${TYPE.body} text-rose-600`}>{error || 'No active sprint'}</p>
        <p className={`${TYPE.meta} text-slate-500 mt-1`}>
          Create a sprint under Sprint cycles and start it, then the board appears here.
        </p>
        <button
          type="button"
          onClick={() => void load()}
          className={`${TYPE.meta} font-semibold mt-3 inline-flex items-center gap-1.5 px-3 py-2
            rounded-lg cursor-pointer bg-slate-100 text-slate-700 hover:bg-slate-200
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500`}
        >
          <FiRefreshCw size={13} aria-hidden="true" /> Try again
        </button>
      </div>
    );
  }

  const columns: BoardColumn[] = ORDER
    .map((status) => board.columns.find((column) => column.status === status))
    .filter((column): column is BoardColumn => Boolean(column));

  const inputClass = `${TYPE.body} w-full px-3 py-2 rounded-lg bg-white border border-slate-200
    text-slate-900 placeholder:text-slate-400 focus-visible:outline-2
    focus-visible:outline-offset-2 focus-visible:outline-emerald-500`;

  const selectClass = `${TYPE.meta} px-2 py-1.5 rounded-lg cursor-pointer bg-slate-50
    border border-slate-200 text-slate-600 hover:border-slate-300 focus-visible:outline-2
    focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:cursor-wait`;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div>
          <h2 className={`${TYPE.title} text-slate-900`}>{board.sprintName} board</h2>
          <span className={`${TYPE.meta} text-slate-500 tabular-nums`}>
            {board.totalTasks} tasks · {board.totalPoints} points
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowForm((open) => !open)}
          className={`${TYPE.meta} font-semibold inline-flex items-center gap-1.5 px-3 py-2
            rounded-lg cursor-pointer bg-emerald-500/10 text-emerald-700 border
            border-emerald-500/20 hover:bg-emerald-500/15 focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-emerald-500`}
        >
          <FiPlus size={13} aria-hidden="true" />
          {showForm ? 'Cancel' : 'Add task'}
        </button>
      </div>

      {error && (
        <p className={`${TYPE.meta} ${STATUS.blocked.text} font-medium mb-2`} role="alert">
          {error}
        </p>
      )}

      {showForm && (
        <form onSubmit={handleCreate} className={`${SURFACE.card} ${SURFACE.pad} mb-4 space-y-3`}>
          <div>
            <label className={`${TYPE.eyebrow} text-slate-400 block mb-1.5`} htmlFor="task-title">
              Title
            </label>
            <input
              id="task-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What needs doing"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className={`${TYPE.eyebrow} text-slate-400 block mb-1.5`} htmlFor="task-points">
                Story points
              </label>
              <input
                id="task-points"
                type="number"
                min={0}
                max={100}
                value={points}
                onChange={(event) => setPoints(event.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={`${TYPE.eyebrow} text-slate-400 block mb-1.5`} htmlFor="task-assignee">
                Assign to
              </label>
              <select
                id="task-assignee"
                value={assigneeId}
                onChange={(event) => setAssigneeId(event.target.value)}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="">Unassigned</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name ?? member.email}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={`${TYPE.eyebrow} text-slate-400 block mb-1.5`} htmlFor="task-status">
                Column
              </label>
              <select
                id="task-status"
                value={newStatus}
                onChange={(event) => setNewStatus(event.target.value as TaskStatus)}
                className={`${inputClass} cursor-pointer`}
              >
                {columns.map((column) => (
                  <option key={column.status} value={column.status}>
                    {column.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className={`${TYPE.meta} font-semibold px-4 py-2 rounded-lg cursor-pointer
              bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50
              disabled:cursor-wait focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-emerald-500`}
          >
            {saving ? 'Adding…' : 'Add task'}
          </button>
        </form>
      )}

      {/*
        Phones get a snap-scrolling carousel — one column fills the screen and
        swipes sideways. From lg the whole board is visible as a 6-up grid.
      */}
      <div
        className="flex items-start gap-3 overflow-x-auto snap-x snap-mandatory pb-3 -mx-1 px-1
          lg:grid lg:grid-cols-6 lg:items-stretch lg:overflow-x-visible lg:mx-0 lg:px-0 lg:pb-0"
      >
        {columns.map((column) => {
          const tone = STATUS[COLUMN_TONE[column.status]];

          return (
            <section
              key={column.status}
              aria-label={column.label}
              className="snap-start shrink-0 w-[78vw] sm:w-[280px] lg:w-auto
                bg-slate-50/80 border border-slate-200/70 rounded-2xl p-3"
            >
              <header className="flex items-center gap-2 mb-3 px-0.5">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${tone.rail}`} aria-hidden="true" />
                <h3 className={`${TYPE.eyebrow} ${tone.text} truncate`}>{column.label}</h3>
                <span className={`${TYPE.meta} text-slate-400 tabular-nums ml-auto shrink-0`}>
                  {column.taskCount} · {column.totalPoints}p
                </span>
              </header>

              <ul className="space-y-2">
                {column.cards.map((card) => {
                  const stuck =
                    card.daysInColumn >= STUCK_AFTER_DAYS && card.status !== 'DONE';
                  const busy = busyId === card.id;

                  return (
                    <li key={card.id}>
                      <article
                        className={`${SURFACE.card} ${SURFACE.padTight} relative overflow-hidden
                          transition-opacity ${busy ? 'opacity-50' : ''}`}
                      >
                        {stuck && (
                          <span className="absolute inset-y-0 left-0 w-[3px] bg-rose-500" aria-hidden="true" />
                        )}

                        <div className="flex items-center justify-between gap-2">
                          <span className={`${TYPE.code} text-slate-400`}>{card.taskKey}</span>
                          <div className="flex items-center gap-1.5">
                            <span className={`${TYPE.meta} font-semibold text-slate-500 tabular-nums`}>
                              {card.storyPoints}p
                            </span>
                            <button
                              type="button"
                              disabled={busy}
                              aria-label={`Delete ${card.taskKey}`}
                              onClick={() => {
                                if (window.confirm(`Delete ${card.taskKey}?`)) {
                                  void mutate(card.id, () => deleteTask(card.id));
                                }
                              }}
                              className="text-slate-300 hover:text-rose-600 cursor-pointer
                                focus-visible:outline-2 focus-visible:outline-offset-2
                                focus-visible:outline-rose-500 disabled:cursor-wait"
                            >
                              <FiTrash2 size={12} />
                            </button>
                          </div>
                        </div>

                        <h4 className={`${TYPE.body} font-medium text-slate-900 leading-snug mt-1.5`}>
                          {card.title}
                        </h4>

                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className={`${TYPE.meta} inline-flex items-center gap-1 ml-auto font-medium
                              ${stuck ? STATUS.blocked.text : 'text-slate-400'}`}
                          >
                            <FiClock size={11} aria-hidden="true" />
                            {card.daysInColumn}d
                            {stuck && <span className="sr-only"> — stuck in this column</span>}
                          </span>
                        </div>

                        {/* Reassigning and moving are the two everyday board actions */}
                        <label className="sr-only" htmlFor={`assign-${card.id}`}>
                          Assign {card.taskKey}
                        </label>
                        <select
                          id={`assign-${card.id}`}
                          value={members.find((m) => m.name === card.assigneeName)?.id ?? ''}
                          disabled={busy}
                          onChange={(event) =>
                            void mutate(card.id, () =>
                              updateTask(
                                card.id,
                                event.target.value
                                  ? { assigneeId: Number(event.target.value) }
                                  : { unassign: true }
                              )
                            )
                          }
                          className={`${selectClass} w-full mt-2`}
                        >
                          <option value="">Unassigned</option>
                          {members.map((member) => (
                            <option key={member.id} value={member.id}>
                              {member.name ?? member.email}
                            </option>
                          ))}
                        </select>

                        <label className="sr-only" htmlFor={`move-${card.id}`}>
                          Move {card.taskKey}
                        </label>
                        <select
                          id={`move-${card.id}`}
                          value={card.status}
                          disabled={busy}
                          onChange={(event) =>
                            void mutate(card.id, () =>
                              updateTask(card.id, {
                                status: event.target.value as TaskStatus
                              })
                            )
                          }
                          className={`${selectClass} w-full mt-1.5`}
                        >
                          {columns.map((option) => (
                            <option key={option.status} value={option.status}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </article>
                    </li>
                  );
                })}

                {column.cards.length === 0 && (
                  <li className={`${TYPE.meta} text-slate-400 px-1 py-2`}>Nothing here</li>
                )}
              </ul>
            </section>
          );
        })}
      </div>

      <p className={`${TYPE.meta} text-slate-400 mt-1 lg:hidden`}>Swipe to see the remaining columns</p>
    </div>
  );
};
