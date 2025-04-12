import { createContext, useContext } from 'react';

import { JwtUserModel } from '../models/jwt-user-model';

export const AuthContext = createContext<{
  user: JwtUserModel | null;
  loading: boolean;
  setUser?: (token: string | null) => void;
}>({ user: null, loading: true });

export const useAuth = () => useContext(AuthContext);
