/**
 * Shared design tokens for the Scrum Master section.
 *
 * Every Scrum Master page composes its text from the five TYPE roles below and
 * nothing else. Before this existed the section used twelve different sizes
 * (9px, 9.5px, 10px, 11px, 11.5px, 12.5px, 13px, xs, sm, lg, 2xl, 3xl), which
 * is why the section looked uneven. Add a new size here only if none of the
 * five roles fit — never inline an arbitrary `text-[Npx]` in a page.
 */

/** Type scale: 11 / 12 / 14 / 16 / 24-30px. */
export const TYPE = {
  /** Uppercase section + field labels. The only 11px in the section. */
  eyebrow: 'text-[11px] font-semibold uppercase tracking-[0.08em]',
  /** Timestamps, counts, owners, secondary detail. */
  meta: 'text-xs',
  /** Default reading size for all content. */
  body: 'text-sm',
  /** Card and panel headings. */
  title: 'text-base font-semibold tracking-tight',
  /** KPI figures only. */
  metric: 'text-2xl sm:text-3xl font-bold tracking-tight tabular-nums',
  /** Ticket identifiers (T-043). Monospace earns its place on IDs. */
  code: 'text-[11px] font-mono tabular-nums',
} as const;

/** Surfaces: one card recipe, one padding rhythm. */
export const SURFACE = {
  card: 'bg-white border border-slate-200/80 rounded-2xl shadow-2xs',
  pad: 'p-4 sm:p-5',
  padTight: 'p-3 sm:p-4',
} as const;

/**
 * Status colour is semantic, never decorative: a colour in this section always
 * encodes sprint state, so a reader can scan by hue alone.
 */
export const STATUS = {
  /** Shipped, healthy, on track. */
  done: {
    text: 'text-emerald-600',
    soft: 'bg-emerald-500/10',
    rail: 'bg-emerald-500',
    ring: 'border-emerald-500/20'
  },
  /** In flight, ageing, needs a nudge. */
  active: {
    text: 'text-amber-600',
    soft: 'bg-amber-500/10',
    rail: 'bg-amber-500',
    ring: 'border-amber-500/20'
  },
  /** Blocked, overdue, escalate. */
  blocked: {
    text: 'text-rose-600',
    soft: 'bg-rose-500/10',
    rail: 'bg-rose-500',
    ring: 'border-rose-500/20'
  },
  /** Ceremonies and forward planning. */
  plan: {
    text: 'text-violet-600',
    soft: 'bg-violet-500/10',
    rail: 'bg-violet-500',
    ring: 'border-violet-500/20'
  },
  /** In verification — QA and test stages. */
  test: {
    text: 'text-teal-600',
    soft: 'bg-teal-500/10',
    rail: 'bg-teal-500',
    ring: 'border-teal-500/20'
  },
  /** Not started, inert. */
  idle: {
    text: 'text-slate-500',
    soft: 'bg-slate-500/10',
    rail: 'bg-slate-300',
    ring: 'border-slate-200'
  }
} as const;

export type StatusKey = keyof typeof STATUS;
