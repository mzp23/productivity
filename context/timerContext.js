import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";

import { FOCUS_STATUS } from "../common/constants";

export const TimerContext = createContext();

const initialTimerState = {
  time: "25:00",
  isPaused: true,
  deadline: null,
  focusStatus: FOCUS_STATUS,
};

const TimerProvider = ({ children }) => {
  const [timer, setTimer] = useReducer(
    (prevState, payload) => ({ ...prevState, ...payload }),
    initialTimerState
  );
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

  const changeTimer = useCallback((total, minutes, seconds) => {
    if (total >= 0) {
      const newTime = `${minutes > 9 ? minutes : "0" + minutes}:${
        seconds > 9 ? seconds : "0" + seconds
      }`;
      setTimer({ time: newTime });
    }
  }, []);

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
    const minutes = +time.substring(0, 2) * 60;
    const sec = +time.substring(3, 5);
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + minutes + sec);

    return deadline;
  }, []);

  useEffect(() => {
    if (timer.isPaused) {
      return;
    }

    startTimer(timer.deadline);

    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, [timer.deadline, startTimer, timer.isPaused]);

  const onPauseTimer = () => {
    setTimer({
      isPaused: true,
    });
  };

  const onStartTimer = () => {
    setTimer({
      deadline: getDeadTime(timer.time),
      isPaused: false,
    });
  };

  const timerValue = {
    timer,
    onPauseTimer,
    onStartTimer,
  };

  return (
    <TimerContext.Provider value={timerValue}>{children}</TimerContext.Provider>
  );
};

export default TimerProvider;
