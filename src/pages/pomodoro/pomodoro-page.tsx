import ClockComponent from '../../components/clock/clock-component';

function PomodoroPage() {
  return (
    <div>
      <ClockComponent currentTime={86} maxTime={120}></ClockComponent>
    </div>
  );
}

export default PomodoroPage;
