import { UserResponseModel } from './user-response-model';

export interface SignInResponseModel {
  accessToken: string;
  user: UserResponseModel;
}
