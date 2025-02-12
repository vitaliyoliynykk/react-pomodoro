import { Sequence } from '../models/sequence';

export const DEFAULT_SEQUENCE_CONFIG: Sequence = [
  { duration: 1500, type: 'pomodoro' },
  { duration: 300, type: 'short_break' },
  { duration: 1500, type: 'pomodoro' },
  { duration: 300, type: 'short_break' },
  { duration: 1500, type: 'pomodoro' },
  { duration: 900, type: 'long_break' },
];

export const DEFAULT_SEQUENCE_CONFIG_SHORT: Sequence = [
  { duration: 10, type: 'pomodoro' },
  { duration: 5, type: 'short_break' },
  { duration: 10, type: 'pomodoro' },
  { duration: 5, type: 'short_break' },
  { duration: 10, type: 'pomodoro' },
  { duration: 10, type: 'long_break' },
];
