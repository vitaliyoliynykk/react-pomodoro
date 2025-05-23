import { Spinner } from '@chakra-ui/react';
import { FC } from 'react';
import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/shared/context/auth-context';

const ProtectedRoute: FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return user ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
