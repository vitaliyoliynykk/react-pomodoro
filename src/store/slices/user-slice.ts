import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SignInResponseModel } from '@/shared/models/responses/sign-in-response-model';
import { UserResponseModel } from '@/shared/models/responses/user-response-model';
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
  },
});

const userReducer = userSlice.reducer;

export { userReducer };
