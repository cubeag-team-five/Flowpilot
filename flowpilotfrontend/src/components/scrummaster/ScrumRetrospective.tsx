import React from 'react';
import { FiCheck, FiMinus } from 'react-icons/fi';
import { TYPE, SURFACE, STATUS } from './scrumUI';

interface ActionItem {
  title: string;
  owner: string;
  due: string;
}

export const ScrumRetrospective: React.FC = () => {
  const wentWell = [
    'Velocity up 12% from last sprint',
    'Zero missed standups this sprint',
    'PR review time down to under 24h on average',
    'Strong cross-team collaboration on the API module'
  ];

  const needsImprovement = [
    'Blocker on brand colour tokens delayed 2 tasks',
    'Sprint scope crept mid-sprint — 3 tasks added',
    'QA environment was down for a day'
  ];

  const actionItems: ActionItem[] = [
    { title: 'Lock sprint scope after day 1', owner: 'Arjun Shah', due: 'Sprint 13' },
    { title: 'Set up staging environment health checks', owner: 'Karan Dev', due: 'Aug 10' },
    { title: 'Share design tokens one sprint ahead', owner: 'Divya Mehta', due: 'Sprint 13 start' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className={`${TYPE.title} text-slate-900`}>Sprint 12 retrospective</h2>
        <span className={`${TYPE.meta} text-slate-500`}>
          Aug 9, 2026 · 10:00 AM · facilitated by Aryan Kapoor
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Kept */}
        <section className={`${SURFACE.card} ${SURFACE.pad}`}>
          <h3 className={`${TYPE.eyebrow} ${STATUS.done.text} mb-4`}>What went well</h3>
          <ul className="space-y-3">
            {wentWell.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  className={`w-5 h-5 rounded-full shrink-0 grid place-items-center mt-px
                    ${STATUS.done.soft} ${STATUS.done.text}`}
                  aria-hidden="true"
                >
                  <FiCheck size={11} strokeWidth={3} />
                </span>
                <span className={`${TYPE.body} text-slate-700 leading-snug`}>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Change */}
        <section className={`${SURFACE.card} ${SURFACE.pad}`}>
          <h3 className={`${TYPE.eyebrow} ${STATUS.blocked.text} mb-4`}>What to change</h3>
          <ul className="space-y-3">
            {needsImprovement.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  className={`w-5 h-5 rounded-full shrink-0 grid place-items-center mt-px
                    ${STATUS.blocked.soft} ${STATUS.blocked.text}`}
                  aria-hidden="true"
                >
                  <FiMinus size={11} strokeWidth={3} />
                </span>
                <span className={`${TYPE.body} text-slate-700 leading-snug`}>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/*
        Numbered because these carry into sprint 13 in priority order — the
        sequence is real information, not decoration.
      */}
      <section className={`${SURFACE.card} overflow-hidden`}>
        <header className="px-4 sm:px-5 py-3 border-b border-slate-100">
          <h3 className={`${TYPE.eyebrow} ${STATUS.plan.text}`}>
            Carried into sprint 13 · {actionItems.length}
          </h3>
        </header>

        <ol>
          {actionItems.map((item, i) => (
            <li
              key={item.title}
              className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5
                border-b border-slate-100 last:border-0"
            >
              <span
                className={`w-6 h-6 rounded-full shrink-0 grid place-items-center
                  ${TYPE.meta} font-semibold ${STATUS.plan.soft} ${STATUS.plan.text} tabular-nums`}
              >
                {i + 1}
              </span>

              <div className="min-w-0 flex-1">
                <div className={`${TYPE.body} font-medium text-slate-900`}>{item.title}</div>
                <div className={`${TYPE.meta} text-slate-400 mt-0.5`}>{item.owner}</div>
              </div>

              <span className={`${TYPE.meta} font-medium text-slate-500 shrink-0 tabular-nums`}>
                {item.due}
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};
