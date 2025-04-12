import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

import { ACCESS_TOKEN_KEY } from '@/shared/constants/tokens';
import { JwtUserModel } from '@/shared/models/jwt-user-model';

import { AuthContext } from './auth-context';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, _setUser] = useState<JwtUserModel | null>(null);
  const [loading, setLoading] = useState(true);

  const setUser = (token: string | null) => {
    if (token) {
      try {
        const decoded = jwtDecode<JwtUserModel>(token);
        const now = Date.now() / 1000;
        if (decoded.exp > now) {
          _setUser(decoded);
          console.log('user has been set');
        } else {
          localStorage.removeItem(ACCESS_TOKEN_KEY);
        }
      } catch {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
      }
    } else {
      _setUser(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    setUser(token);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
