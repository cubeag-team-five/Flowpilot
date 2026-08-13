import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { TYPE, SURFACE, STATUS } from './scrumUI';

interface StandupEntry {
  initials: string;
  name: string;
  role: string;
  yesterday: string;
  today: string;
  blocker?: string;
}

export const ScrumStandups: React.FC = () => {
  const standups: StandupEntry[] = [
    {
      initials: 'SR', name: 'Sneha Rao', role: 'Frontend',
      yesterday: 'Completed velocity module, started component library',
      today: 'Continue component library'
    },
    {
      initials: 'MK', name: 'Mihir Khatri', role: 'Backend',
      yesterday: 'Finished REST API documentation PR',
      today: 'Review file upload S3 task'
    },
    {
      initials: 'DM', name: 'Divya Mehta', role: 'Design',
      yesterday: 'Mobile responsive layouts 80% done',
      today: 'Complete dark mode research',
      blocker: 'Waiting for brand colour tokens from Design'
    },
    {
      initials: 'KD', name: 'Karan Dev', role: 'Platform',
      yesterday: 'Started notification service scaffolding',
      today: 'Finish Slack hook integration'
    },
    {
      initials: 'PR', name: 'Priya Rajan', role: 'QA',
      yesterday: 'Tested file upload module, filed 2 bugs',
      today: 'Test notification service'
    }
  ];

  const blocked = standups.filter((s) => s.blocker).length;

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-4">
        <h2 className={`${TYPE.title} text-slate-900`}>Daily standup</h2>
        <span className={`${TYPE.meta} text-slate-500`}>
          Aug 4, 2026 · 9:30 AM · {standups.length} attending
          {blocked > 0 && <span className={STATUS.blocked.text}> · {blocked} blocked</span>}
        </span>
      </div>

      <ul className="space-y-3">
        {standups.map((person) => (
          <li key={person.initials}>
            <article
              className={`${SURFACE.card} ${SURFACE.pad} relative overflow-hidden ${
                person.blocker ? 'border-rose-500/25' : ''
              }`}
            >
              {person.blocker && (
                <span className="absolute inset-y-0 left-0 w-[3px] bg-rose-500" aria-hidden="true" />
              )}

              <header className="flex items-center gap-3 mb-4">
                <span
                  className={`w-9 h-9 rounded-full shrink-0 grid place-items-center
                    ${TYPE.meta} font-semibold bg-slate-100 text-slate-600`}
                  aria-hidden="true"
                >
                  {person.initials}
                </span>
                <div className="min-w-0">
                  <h3 className={`${TYPE.body} font-semibold text-slate-900 truncate`}>{person.name}</h3>
                  <p className={`${TYPE.meta} text-slate-400`}>{person.role}</p>
                </div>

                {person.blocker && (
                  <span
                    className={`${TYPE.meta} font-semibold inline-flex items-center gap-1 ml-auto shrink-0
                      px-2 py-1 rounded-md ${STATUS.blocked.soft} ${STATUS.blocked.text}`}
                  >
                    <FiAlertTriangle size={11} aria-hidden="true" /> Blocked
                  </span>
                )}
              </header>

              <dl
                className={`grid gap-3 ${
                  person.blocker ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'
                }`}
              >
                <div className="rounded-xl bg-slate-50 px-3 py-2.5">
                  <dt className={`${TYPE.eyebrow} text-slate-400 mb-1`}>Yesterday</dt>
                  <dd className={`${TYPE.body} text-slate-700 leading-snug`}>{person.yesterday}</dd>
                </div>

                <div className="rounded-xl bg-slate-50 px-3 py-2.5">
                  <dt className={`${TYPE.eyebrow} text-slate-400 mb-1`}>Today</dt>
                  <dd className={`${TYPE.body} text-slate-700 leading-snug`}>{person.today}</dd>
                </div>

                {person.blocker && (
                  <div className={`rounded-xl px-3 py-2.5 ${STATUS.blocked.soft}`}>
                    <dt className={`${TYPE.eyebrow} ${STATUS.blocked.text} mb-1`}>Blocker</dt>
                    <dd className={`${TYPE.body} ${STATUS.blocked.text} leading-snug`}>{person.blocker}</dd>
                  </div>
                )}
              </dl>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};
