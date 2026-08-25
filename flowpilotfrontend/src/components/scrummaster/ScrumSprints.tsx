import React, { useCallback, useEffect, useState } from 'react';
import { FiPlay, FiCheckCircle, FiTrash2, FiPlus } from 'react-icons/fi';
import { TYPE, SURFACE, STATUS, type StatusKey } from './scrumUI';
import {
  fetchSprints,
  createSprint,
  startSprint,
  completeSprint,
  deleteSprint,
  type Sprint,
  type SprintStatus
} from './scrumApi';

const TONE: Record<SprintStatus, StatusKey> = {
  PLANNED: 'idle',
  ACTIVE: 'active',
  COMPLETED: 'done'
};

const today = () => new Date().toISOString().slice(0, 10);

const inTwoWeeks = () => {
  const date = new Date();
  date.setDate(date.getDate() + 14);
  return date.toISOString().slice(0, 10);
};

export const ScrumSprints: React.FC = () => {
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busyId, setBusyId] = useState<number | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [startDate, setStartDate] = useState(today());
  const [endDate, setEndDate] = useState(inTwoWeeks());
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setError('');

    try {
      setSprints(await fetchSprints());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load sprints');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const run = async (id: number, action: () => Promise<unknown>, message: string) => {
    setBusyId(id);
    setError('');
    setNotice('');

    try {
      await action();
      setNotice(message);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'That did not work');
    } finally {
      setBusyId(null);
    }
  };

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim()) {
      setError('Sprint name is required');
      return;
    }

    setSaving(true);
    setError('');
    setNotice('');

    try {
      await createSprint({
        name: name.trim(),
        goal: goal.trim() || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined
      });

      setName('');
      setGoal('');
      setShowForm(false);
      setNotice('Sprint created. Start it when the team is ready.');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create the sprint');
    } finally {
      setSaving(false);
    }
  };

  const handleComplete = async (sprint: Sprint) => {
    // Unfinished work needs somewhere to go: the next planned sprint, else the backlog
    const next = sprints.find(
      (candidate) => candidate.status === 'PLANNED' && candidate.id !== sprint.id
    );

    const where = next ? `carry unfinished work into ${next.name}` : 'return unfinished work to the backlog';

    if (!window.confirm(`Complete ${sprint.name} and ${where}?`)) {
      return;
    }

    await run(
      sprint.id,
      () => completeSprint(sprint.id, next?.id),
      next
        ? `${sprint.name} completed. Unfinished work moved to ${next.name}.`
        : `${sprint.name} completed. Unfinished work returned to the backlog.`
    );
  };

  const handleDelete = async (sprint: Sprint) => {
    if (!window.confirm(`Delete ${sprint.name}? Its tasks return to the backlog.`)) {
      return;
    }

    await run(sprint.id, () => deleteSprint(sprint.id), `${sprint.name} deleted.`);
  };

  const inputClass = `${TYPE.body} w-full px-3 py-2 rounded-lg bg-white border border-slate-200
    text-slate-900 placeholder:text-slate-400 focus-visible:outline-2
    focus-visible:outline-offset-2 focus-visible:outline-emerald-500`;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className={`${TYPE.title} text-slate-900`}>Sprint cycles</h2>

        <button
          type="button"
          onClick={() => setShowForm((open) => !open)}
          className={`${TYPE.meta} font-semibold inline-flex items-center gap-1.5 px-3 py-2
            rounded-lg cursor-pointer bg-emerald-500/10 text-emerald-700 border
            border-emerald-500/20 hover:bg-emerald-500/15 focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-emerald-500`}
        >
          <FiPlus size={13} aria-hidden="true" />
          {showForm ? 'Cancel' : 'New sprint'}
        </button>
      </div>

      {notice && <p className={`${TYPE.meta} ${STATUS.done.text} font-medium`}>{notice}</p>}
      {error && (
        <p className={`${TYPE.meta} ${STATUS.blocked.text} font-medium`} role="alert">{error}</p>
      )}

      {showForm && (
        <form onSubmit={handleCreate} className={`${SURFACE.card} ${SURFACE.pad} space-y-3`}>
          <div>
            <label className={`${TYPE.eyebrow} text-slate-400 block mb-1.5`} htmlFor="sprint-name">
              Sprint name
            </label>
            <input
              id="sprint-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Sprint 13"
              className={inputClass}
            />
          </div>

          <div>
            <label className={`${TYPE.eyebrow} text-slate-400 block mb-1.5`} htmlFor="sprint-goal">
              Goal
            </label>
            <textarea
              id="sprint-goal"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              rows={2}
              placeholder="What the team commits to delivering"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={`${TYPE.eyebrow} text-slate-400 block mb-1.5`} htmlFor="sprint-start">
                Starts
              </label>
              <input
                id="sprint-start"
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={`${TYPE.eyebrow} text-slate-400 block mb-1.5`} htmlFor="sprint-end">
                Ends
              </label>
              <input
                id="sprint-end"
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                className={inputClass}
              />
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
            {saving ? 'Creating…' : 'Create sprint'}
          </button>
        </form>
      )}

      {loading ? (
        <div className={`${SURFACE.card} ${SURFACE.pad} ${TYPE.body} text-slate-500`}>
          Loading sprints…
        </div>
      ) : sprints.length === 0 ? (
        <div className={`${SURFACE.card} ${SURFACE.pad}`}>
          <p className={`${TYPE.body} text-slate-600`}>
            No sprints yet. Create one to start planning.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {sprints.map((sprint) => {
            const tone = STATUS[TONE[sprint.status]];
            const busy = busyId === sprint.id;

            return (
              <li key={sprint.id}>
                <article
                  className={`${SURFACE.card} ${SURFACE.pad} relative overflow-hidden
                    ${busy ? 'opacity-50' : ''}`}
                >
                  <span className={`absolute inset-y-0 left-0 w-[3px] ${tone.rail}`} aria-hidden="true" />

                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className={`${TYPE.title} text-slate-900`}>{sprint.name}</h3>
                        <span
                          className={`${TYPE.eyebrow} px-2 py-0.5 rounded-md ${tone.soft} ${tone.text}`}
                        >
                          {sprint.status}
                        </span>
                      </div>

                      {sprint.goal && (
                        <p className={`${TYPE.body} text-slate-600 mt-1.5`}>{sprint.goal}</p>
                      )}

                      <p className={`${TYPE.meta} text-slate-400 mt-1.5 tabular-nums`}>
                        {sprint.startDate ?? 'no start'} → {sprint.endDate ?? 'no end'} ·{' '}
                        {sprint.taskCount} tasks · {sprint.totalPoints}p
                        {sprint.committedPoints !== null && (
                          <> · committed {sprint.committedPoints}p</>
                        )}
                      </p>

                      {sprint.committedPoints !== null &&
                        sprint.totalPoints > sprint.committedPoints && (
                          <p className={`${TYPE.meta} ${STATUS.blocked.text} font-medium mt-1`}>
                            Scope grew {sprint.totalPoints - sprint.committedPoints}p since start
                          </p>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2 shrink-0">
                      {sprint.status === 'PLANNED' && (
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() =>
                            void run(sprint.id, () => startSprint(sprint.id), `${sprint.name} started.`)
                          }
                          className={`${TYPE.meta} font-semibold inline-flex items-center gap-1.5
                            px-3 py-2 rounded-lg cursor-pointer bg-emerald-500/10 text-emerald-700
                            border border-emerald-500/20 hover:bg-emerald-500/15 disabled:cursor-wait
                            focus-visible:outline-2 focus-visible:outline-offset-2
                            focus-visible:outline-emerald-500`}
                        >
                          <FiPlay size={13} aria-hidden="true" /> Start
                        </button>
                      )}

                      {sprint.status === 'ACTIVE' && (
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => void handleComplete(sprint)}
                          className={`${TYPE.meta} font-semibold inline-flex items-center gap-1.5
                            px-3 py-2 rounded-lg cursor-pointer bg-violet-500/10 text-violet-700
                            border border-violet-500/20 hover:bg-violet-500/15 disabled:cursor-wait
                            focus-visible:outline-2 focus-visible:outline-offset-2
                            focus-visible:outline-violet-500`}
                        >
                          <FiCheckCircle size={13} aria-hidden="true" /> Complete
                        </button>
                      )}

                      {sprint.status !== 'ACTIVE' && (
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => void handleDelete(sprint)}
                          aria-label={`Delete ${sprint.name}`}
                          className={`${TYPE.meta} font-semibold inline-flex items-center gap-1.5
                            px-3 py-2 rounded-lg cursor-pointer bg-slate-100 text-slate-600
                            border border-slate-200 hover:bg-rose-50 hover:text-rose-700
                            disabled:cursor-wait focus-visible:outline-2
                            focus-visible:outline-offset-2 focus-visible:outline-rose-500`}
                        >
                          <FiTrash2 size={13} aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
