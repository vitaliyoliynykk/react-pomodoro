import { Sequence } from '@/shared/models';

export const DEFAULT_SEQUENCE_CONFIG: Sequence = [
  { duration: 1500, type: 'pomodoro' },
  { duration: 300, type: 'short_break' },
  { duration: 1500, type: 'pomodoro' },
  { duration: 300, type: 'short_break' },
  { duration: 1500, type: 'pomodoro' },
  { duration: 900, type: 'long_break' },
];
