import nowData from '@/content/now.json';

export interface Now {
  /** What I'm actively shipping right now. */
  now: string;
  /** What's queued next. Optional. */
  next?: string;
  /** ISO date of the last manual update. Surfaced in the stripe's title attr. */
  updated?: string;
}

export function getNow(): Now {
  return nowData as Now;
}
