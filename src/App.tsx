import './App.css';

import { Spinner } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

import Layout from './components/layout/layout-component';
import PomodoroPage from './pages/pomodoro/pomodoro-page';

const SettingsPage = lazy(() => import('./pages/settings/settings-page'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PomodoroPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
