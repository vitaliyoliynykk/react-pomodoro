export interface SequenceItem {
  type:
    | SequenceType.POMODORO
    | SequenceType.SHORT_BREAK
    | SequenceType.LONG_BREAK;
  duration: number;
}

export type Sequence = SequenceItem[];

export enum SequenceType {
  POMODORO = 'pomodoro',
  SHORT_BREAK = 'short_break',
  LONG_BREAK = 'long_break',
}
