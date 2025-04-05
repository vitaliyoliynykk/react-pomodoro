import { createContext, useContext } from 'react';

import { JwtUserModel } from '../models/jwt-user-model';

export const AuthContext = createContext<{
  user: JwtUserModel | null;
  setUserToState?: (token: string) => void;
}>({ user: null });

export const useAuth = () => useContext(AuthContext);
