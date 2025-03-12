import { SequenceType } from '@/shared/models';

export const HEADINGS = {
  [SequenceType.POMODORO]: 'Pomodoro',
  [SequenceType.SHORT_BREAK]: 'Short break',
  [SequenceType.LONG_BREAK]: 'Long break',
};

export const COLORS = {
  [SequenceType.POMODORO]: 'rgb(163, 21, 59)',
  [SequenceType.SHORT_BREAK]: 'rgb(42, 46, 170)',
  [SequenceType.LONG_BREAK]: 'rgb(42, 46, 170)',
};
