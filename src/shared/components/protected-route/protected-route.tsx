import { FC } from 'react';
import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/shared/context/auth-context';

const ProtectedRoute: FC = () => {
  const auth = useAuth();

  return auth.user ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
