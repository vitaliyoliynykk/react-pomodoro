import { RootState } from '@/store/store';

export const stateMock = {
  pomodoro: {
    pomodoroConfig: [
      {
        type: 'pomodoro',
        duration: 600,
      },
      {
        type: 'short_break',
        duration: 300,
      },
      {
        type: 'pomodoro',
        duration: 1500,
      },
      {
        type: 'short_break',
        duration: 300,
      },
    ],
    currentCycle: 0,
    currentTime: 600,
    completedToday: 0,
    isClockRunning: false,
  },
  user: {
    status: 'complete',
    user: {
      email: 'vitaliyoliynykk@gmail.com',
      id: '67d59ba0d6963071d5f4444a',
    },
  },
  settings: {
    status: 'complete',
    settings: {
      pushNotificationEnabled: false,
      pomodoroConfiguratin: [
        {
          type: 'pomodoro',
          duration: 600,
        },
        {
          type: 'short_break',
          duration: 300,
        },
        {
          type: 'pomodoro',
          duration: 1500,
        },
        {
          type: 'short_break',
          duration: 300,
        },
      ],
    },
  },
  tasks: {
    status: 'complete',
    tasks: [],
    selectedTask: null,
  },
  statistics: {
    status: 'complete',
    statistics: [],
  },
} as RootState;
