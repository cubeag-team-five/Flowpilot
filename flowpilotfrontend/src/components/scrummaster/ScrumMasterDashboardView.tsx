import React, { useCallback, useEffect, useState } from 'react';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';
import { TYPE, SURFACE, STATUS, type StatusKey } from './scrumUI';
import { fetchDashboard, type DashboardResponse } from './scrumApi';

/** Ceremony tones arrive from the API; fall back to idle for anything new. */
const toneFor = (tone: string): StatusKey =>
  (['done', 'active', 'blocked', 'plan', 'test', 'idle'].includes(tone)
    ? tone
    : 'idle') as StatusKey;

export const ScrumMasterDashboardView: React.FC = () => {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setError('');

    try {
      setData(await fetchDashboard());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load the sprint');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) {
    return (
      <div className={`${SURFACE.card} ${SURFACE.pad} ${TYPE.body} text-slate-500`}>
        Loading the sprint…
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={`${SURFACE.card} ${SURFACE.pad} border-rose-500/20`}>
        <p className={`${TYPE.body} text-rose-600`}>{error || 'No sprint data'}</p>
        <button
          type="button"
          onClick={() => void load()}
          className={`${TYPE.meta} font-semibold mt-3 inline-flex items-center gap-1.5 px-3 py-2
            rounded-lg cursor-pointer bg-slate-100 text-slate-700 hover:bg-slate-200
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500`}
        >
          <FiRefreshCw size={13} /> Try again
        </button>
      </div>
    );
  }

  const elapsedDays = data.totalDays - data.daysRemaining;
  const elapsedPercent =
    data.totalDays === 0 ? 0 : Math.round((elapsedDays / data.totalDays) * 100);

  const kpis: { label: string; value: string; note: string; tone: StatusKey }[] = [
    {
      label: 'Sprint',
      value: data.sprintName,
      note: data.status,
      tone: 'done'
    },
    {
      label: 'Days remaining',
      value: String(data.daysRemaining),
      note: `of ${data.totalDays} total`,
      tone: data.daysRemaining <= 3 ? 'blocked' : 'active'
    },
    {
      label: 'Tasks done',
      value: `${data.tasksDone} / ${data.tasksTotal}`,
      note: `${data.percentComplete}% complete`,
      tone: 'done'
    },
    {
      label: 'Stuck tasks',
      value: String(data.blockerCount),
      note: data.blockerCount === 0 ? 'Nothing stuck' : 'Needs attention',
      tone: data.blockerCount === 0 ? 'done' : 'blocked'
    }
  ];

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className={`${SURFACE.card} ${SURFACE.pad} relative overflow-hidden`}>
            <span
              className={`absolute inset-y-0 left-0 w-[3px] ${STATUS[kpi.tone].rail}`}
              aria-hidden="true"
            />
            <div className={`${TYPE.eyebrow} text-slate-400`}>{kpi.label}</div>
            <div className={`${TYPE.metric} text-slate-900 mt-2`}>{kpi.value}</div>
            <div className={`${TYPE.meta} font-medium mt-1 ${STATUS[kpi.tone].text}`}>
              {kpi.note}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4">
        <div className={`${SURFACE.card} ${SURFACE.pad} flex flex-col`}>
          <div className={`${TYPE.eyebrow} text-emerald-600`}>Sprint goal</div>
          <p className={`${TYPE.title} text-slate-900 mt-3 leading-relaxed`}>{data.goal}</p>

          <div className="mt-auto pt-5 space-y-3">
            {[
              {
                label: 'Points completed',
                value: `${data.pointsDone} of ${data.pointsTotal}`,
                percent:
                  data.pointsTotal === 0
                    ? 0
                    : Math.round((data.pointsDone / data.pointsTotal) * 100),
                tone: 'done' as StatusKey
              },
              {
                label: 'Sprint elapsed',
                value: `Day ${elapsedDays} of ${data.totalDays}`,
                percent: elapsedPercent,
                tone: 'active' as StatusKey
              }
            ].map((bar) => (
              <div key={bar.label}>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className={`${TYPE.meta} font-medium text-slate-500`}>{bar.label}</span>
                  <span className={`${TYPE.meta} font-semibold text-slate-900 tabular-nums`}>
                    {bar.value}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${STATUS[bar.tone].rail}`}
                    style={{ width: `${bar.percent}%` }}
                  />
                </div>
              </div>
            ))}

            {data.committedPoints !== null && data.pointsTotal > data.committedPoints && (
              <p className={`${TYPE.meta} ${STATUS.blocked.text} font-medium`}>
                Scope grew by {data.pointsTotal - data.committedPoints} points since the
                sprint started
              </p>
            )}
          </div>
        </div>

        <div className={`${SURFACE.card} ${SURFACE.pad}`}>
          <h3 className={`${TYPE.title} text-slate-900`}>Ceremony schedule</h3>
          <ul className="mt-4 space-y-1">
            {data.ceremonies.map((ceremony) => (
              <li
                key={ceremony.name}
                className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS[toneFor(ceremony.tone)].rail}`}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <div className={`${TYPE.body} font-medium text-slate-900 truncate`}>
                    {ceremony.name}
                  </div>
                  <div className={`${TYPE.meta} text-slate-400`}>{ceremony.when}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {data.blockerCount > 0 && (
        <div className={`${SURFACE.card} border-rose-500/20 overflow-hidden`}>
          <div className="flex items-center gap-2 px-4 sm:px-5 py-3 border-b border-rose-500/15 bg-rose-500/5">
            <FiAlertTriangle className="text-rose-600 shrink-0" size={14} aria-hidden="true" />
            <h3 className={`${TYPE.eyebrow} text-rose-600`}>
              Stuck tasks · {data.blockerCount}
            </h3>
          </div>

          <div className={SURFACE.pad}>
            <p className={`${TYPE.body} text-slate-700`}>
              {data.blockerCount} task{data.blockerCount === 1 ? '' : 's'} have sat in the
              same column for three days or more. Open the board to see which.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
