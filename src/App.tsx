import './App.css';

import { Spinner } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import PomodoroPage from './pages/pomodoro/pomodoro-page';
import Layout from './shared/components/layout/layout-component';
import ProtectedRoute from './shared/components/protected-route/protected-route';

const SettingsPage = lazy(() => import('./pages/settings/settings-page'));
const SignInPage = lazy(() => import('./pages/sign-in/sign-in-page'));
const RegisterPage = lazy(() => import('./pages/register/register-page'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />

        <Route path="sign-in" element={<SignInPage />} />
        <Route path="register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<PomodoroPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
