import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TaskModel } from '@/shared/models/responses/task-respose-model';
import { addTaskRequest } from '@/shared/requests/tasks/addTaskRequest';
import { getTasksRequest } from '@/shared/requests/tasks/getTasksRequest';

interface TasksState {
  status: 'loading' | 'complete' | 'error' | 'empty';
  tasks: TaskModel[];
}

const initialState: TasksState = {
  status: 'complete',
  tasks: [],
};

export const getTasks = createAsyncThunk('tasks/get', () => getTasksRequest());

export const addTask = createAsyncThunk<TaskModel, TaskModel>(
  'tasks/add',
  (task) => addTaskRequest(task)
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getTasks.fulfilled,
        (state, action: PayloadAction<TaskModel[]>) => {
          state.status = 'complete';

          state.tasks = action.payload;
        }
      )
      .addCase(getTasks.rejected, (state) => {
        state.status = 'error';
      });

    builder
      .addCase(addTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<TaskModel>) => {
        state.status = 'complete';
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state) => {
        state.status = 'error';
      });
  },
});

const tasksReducer = tasksSlice.reducer;

export { tasksReducer };
