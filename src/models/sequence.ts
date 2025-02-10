export interface SequenceItem {
  type: 'pomodoro' | 'short_break' | 'long_break';
  duration: number;
}

export type Sequence = SequenceItem[];
