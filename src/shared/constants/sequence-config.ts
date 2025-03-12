import { Sequence, SequenceType } from '@/shared/models';

export const DEFAULT_SEQUENCE_CONFIG: Sequence = [
  { duration: 1500, type: SequenceType.POMODORO },
  { duration: 300, type: SequenceType.SHORT_BREAK },
  { duration: 1500, type: SequenceType.POMODORO },
  { duration: 300, type: SequenceType.SHORT_BREAK },
  { duration: 1500, type: SequenceType.POMODORO },
  { duration: 900, type: SequenceType.LONG_BREAK },
];
