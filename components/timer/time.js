import { useCallback, useEffect, useRef, useState } from "react";
import Play from '../../public/images/play.svg';

export default function Time({
  time = "25:00",
  changeTitle,
  focusStatus = "focus",
}) {
  const [timer, setTimer] = useState(time);
  const timerId = useRef(null);

  const getTimeRemaining = (time) => {
    const total = Date.parse(time) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);

    return {
      total,
      minutes,
      seconds,
    };
  };

  const changeTimer = useCallback(
    (total, minutes, seconds) => {
      if (total >= 0) {
        const newTimer =
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds);
        setTimer(newTimer);
        changeTitle({ time: newTimer, focusStatus });
      }
    },
    [changeTitle, focusStatus]
  );

  const startTimer = useCallback(
    (time) => {
      const id = setInterval(() => {
        let { total, minutes, seconds } = getTimeRemaining(time);

        changeTimer(total, minutes, seconds);
      }, 1000);
      timerId.current = id;
    },
    [changeTimer]
  );

  const getDeadTime = useCallback((time) => {
    const minutes = +time.substring(0, 2);
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + minutes * 60);
    return deadline;
  }, []);

  useEffect(() => {
    startTimer(getDeadTime(time));

    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, [getDeadTime, startTimer, time]);

  return (
    <div className="rounded-full border-8 border-red-400 w-72 md:w-96 h-72 md:h-96 flex flex-col items-center justify-center grow-0 shrink-0 mb-5 relative">
      <p className="text-slate-100 text-7xl md:text-9xl" role="timer">{timer}</p>
      <Play className="absolute inset-y-3/4 h-10 w-auto fill-slate-100 hover:cursor-pointer" alt="Site Title" />
    </div>
  );
}
