import { FC } from 'react';
import { Navigate, Outlet } from 'react-router';

import { useIsAuthenticated } from '@/shared/hooks/useIsAuthenticated';

const ProtectedRoute: FC = () => {
  const isAuthenticated = useIsAuthenticated();

  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
