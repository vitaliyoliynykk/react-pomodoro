export interface TaskModel {
  _id?: string;
  title: string;
  sessions_goal: number | null;
  end_date: string;
  status: 'new' | 'in_progress' | 'completed';
}
