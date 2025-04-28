export interface TaskModel {
  _id?: string;
  title: string;
  sessions_goal: number | null;
  sessions_completed: number | null;
  end_date: string;
  status: 'new' | 'in_progress' | 'completed';
}

export type CreateTaskModel = Omit<TaskModel, '_id' | 'sessions_completed'>;
