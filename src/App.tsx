import './App.css';

import { Route, Routes } from 'react-router';

import PomodoroPage from './pages/pomodoro/pomodoro.page';

function App() {
  return (
    <Routes>
      <Route index element={<PomodoroPage />}></Route>
    </Routes>
  );
}

export default App;
