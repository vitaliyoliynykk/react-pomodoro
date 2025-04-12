import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MessageResponseModel } from '@/shared/models/responses/error-response-model';
import { SignInResponseModel } from '@/shared/models/responses/sign-in-response-model';
import { UserResponseModel } from '@/shared/models/responses/user-response-model';
import { getUserRequest } from '@/shared/requests/auth/getUserRequest';
import { logOutRequest } from '@/shared/requests/auth/logOutRequest';
import { registerRequest } from '@/shared/requests/auth/registerRequest';
import { signInRequest } from '@/shared/requests/auth/signInRequest';

interface UserState {
  status: 'loading' | 'complete' | 'error' | 'empty';
  user: UserResponseModel | null;
}

const initialState: UserState = {
  status: 'empty',
  user: null,
};

export const signIn = createAsyncThunk<
  SignInResponseModel,
  { email: string; password: string }
>('user/signIn', ({ email, password }) => signInRequest(email, password));
export const logOut = createAsyncThunk('user/logOut', () => logOutRequest());
export const getUser = createAsyncThunk('user/get', () => getUserRequest());
export const registerUser = createAsyncThunk<
  MessageResponseModel,
  { email: string; password: string }
>('user/register', ({ email, password }) => registerRequest(email, password));

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        signIn.fulfilled,
        (state, action: PayloadAction<SignInResponseModel>) => {
          state.status = 'complete';
          state.user = action.payload.user;
        }
      )
      .addCase(signIn.rejected, (state) => {
        state.status = 'error';
      });

    builder
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<UserResponseModel>) => {
          state.status = 'complete';
          state.user = action.payload;
        }
      )
      .addCase(getUser.rejected, (state) => {
        state.status = 'error';
      });

    builder
      .addCase(logOut.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logOut.fulfilled, (state) => {
        state.status = 'empty';
        state.user = null;
      })
      .addCase(logOut.rejected, (state) => {
        state.status = 'error';
      });
  },
});

const userReducer = userSlice.reducer;

export { userReducer };
