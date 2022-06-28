import { useContext, useEffect, useState } from "react";


import { TimerContext } from "../../context/timerContext";
import Play from "../../public/images/play.svg";
import Pause from "../../public/images/pause.svg";
import { FOCUS_STATUS } from "../../common/constants";
import useAudio from "../../hooks/useAudio";

const startTimerAudioLink = "/sounds/timer-start.wav";
const pauseTimerAudioLink = "/sounds/timer-pause.wav";
const audioLinks = [startTimerAudioLink, pauseTimerAudioLink];

export default function Time(): JSX.Element {
  const { timer, onPauseTimer, onStartTimer } = useContext(TimerContext);
  const [startTimerSound, pauseTimerSound] = useAudio(audioLinks)

  return (
    <div className="rounded-full border-8 border-red-400 w-72 md:w-96 h-72 md:h-96 flex flex-col items-center justify-center grow-0 shrink-0 mb-5 relative">
      <p className="text-slate-100 text-2xl md:text-3xl absolute inset-y-1/4" data-testid="timer-text">
        {timer.focusStatus === FOCUS_STATUS ? `${timer.focusStatus} #${timer.focusIteration}`: `${timer.focusStatus}`}
      </p>
      <p className="text-slate-100 text-7xl md:text-9xl" role="timer">
        {timer.time}
      </p>
      {timer.isPaused ? (
        <Play
          role="button"
          className="absolute inset-y-3/4 h-12 w-auto fill-slate-100 hover:cursor-pointer"
          alt="Play timer"
          data-testid="Play timer"
          onClick={() => {
            onStartTimer()
            startTimerSound?.play()
          }}
        />
      ) : (
        <Pause
          role="button"
          className="absolute inset-y-3/4 h-12 w-auto fill-slate-100 hover:cursor-pointer rotate-90"
          alt="Pause timer"
          data-testid="Pause timer"
          onClick={() => {
            onPauseTimer()
            pauseTimerSound?.play()
          }}
        />
      )}
    </div>
  );
}
