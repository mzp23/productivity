import Timer from "../components/timer/timer";
import TimerProvider from "../context/timerContext";

export default function Home() {
  return (
      <TimerProvider>
        <Timer />
      </TimerProvider>
 );
}
