import { useContext } from "react";

import { TimerContext } from "../../context/timerContext";
import Play from "../../public/images/play.svg";
import Pause from "../../public/images/pause.svg";

export default function Time() {
  const { timer, onPauseTimer, onStartTimer } = useContext(TimerContext);

  return (
    <div className="rounded-full border-8 border-red-400 w-72 md:w-96 h-72 md:h-96 flex flex-col items-center justify-center grow-0 shrink-0 mb-5 relative">
      <p className="text-slate-100 text-7xl md:text-9xl" role="timer">
        {timer.time}
      </p>
      {timer.isPaused ? (
        <Play
          role="button"
          className="absolute inset-y-3/4 h-12 w-auto fill-slate-100 hover:cursor-pointer"
          onClick={onStartTimer}
          alt="Play timer"
        />
      ) : (
        <Pause
          role="button"
          className="absolute inset-y-3/4 h-12 w-auto fill-slate-100 hover:cursor-pointer rotate-90"
          alt="Pause timer"
          onClick={onPauseTimer}
        />
      )}
    </div>
  );
}
