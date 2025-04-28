import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UpdateCompletedRequestModel } from '@/shared/models/requests/update-completed-request-model';
import {
  CreateTaskModel,
  TaskModel,
} from '@/shared/models/responses/task-respose-model';
import { addTaskRequest } from '@/shared/requests/tasks/addTaskRequest';
import { getTasksRequest } from '@/shared/requests/tasks/getTasksRequest';
import { updateCompletedRequest } from '@/shared/requests/tasks/updateCompletedRequest';

interface TasksState {
  status: 'loading' | 'complete' | 'error' | 'empty';
  tasks: TaskModel[];
  selectedTask: TaskModel | null;
}

const initialState: TasksState = {
  status: 'complete',
  tasks: [],
  selectedTask: null,
};

export const getTasks = createAsyncThunk('tasks/get', () => getTasksRequest());

export const addTask = createAsyncThunk<TaskModel, CreateTaskModel>(
  'tasks/add',
  (task) => addTaskRequest(task)
);

export const updateCompleted = createAsyncThunk<
  TaskModel,
  UpdateCompletedRequestModel
>('tasks/updateCompleted', (body) => updateCompletedRequest(body));

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    selectTask(state, action: PayloadAction<string>) {
      state.selectedTask =
        state.tasks.find((task) => task._id == action.payload) ?? null;
    },
    clearSelectedTask(state) {
      state.selectedTask = null;
    },
  },
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

    builder
      .addCase(updateCompleted.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        updateCompleted.fulfilled,
        (state, action: PayloadAction<TaskModel>) => {
          state.status = 'complete';

          const taskToUpdate = state.tasks.find(
            (task) => task._id === action.payload._id
          );

          if (taskToUpdate && state.selectedTask) {
            taskToUpdate.sessions_completed = action.payload.sessions_completed;
            state.selectedTask.sessions_completed =
              action.payload.sessions_completed;
          }
        }
      )
      .addCase(updateCompleted.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { selectTask, clearSelectedTask } = tasksSlice.actions;

const tasksReducer = tasksSlice.reducer;

export { tasksReducer };
