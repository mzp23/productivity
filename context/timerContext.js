import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";

import {
  DEFAULT_FOCUS_TIME,
  DEFAULT_LONG_BREAK_TIME,
  DEFAULT_SHORT_BREAK_TIME,
  FOCUS_STATUS,
  LONG_BREAK_STATUS,
  SHORT_BREAK_STATUS,
} from "../common/constants";

export const TimerContext = createContext();

const initialTimerState = {
  time: DEFAULT_FOCUS_TIME,
  isPaused: true,
  deadline: null,
  focusStatus: FOCUS_STATUS,
  focusIteration: 1,
};

const timerConfig = {
  focustTime: DEFAULT_FOCUS_TIME,
  shortBreakTime: DEFAULT_SHORT_BREAK_TIME,
  longBreakTime: DEFAULT_LONG_BREAK_TIME,
  iterationsBeforeLongBreak: 4,
  isPausedByDefault: true,
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

  const getDeadline = useCallback((time) => {
    const minutes = +time.substring(0, 2) * 60;
    const sec = +time.substring(3, 5);
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + minutes + sec);

    return deadline;
  }, []);

  const switchTimerStatusTo = useCallback(
    (timerStatus) => {
      const timerTime = {
        [FOCUS_STATUS]: timerConfig.focustTime,
        [SHORT_BREAK_STATUS]: timerConfig.shortBreakTime,
        [LONG_BREAK_STATUS]: timerConfig.longBreakTime,
      };

      const isNoProgress = timer.time === timerTime[timerStatus];
      if (isNoProgress) {
        return;
      }

      setTimer({
        time: timerTime[timerStatus],
        focusStatus: timerStatus,
        isPaused: timerConfig.isPausedByDefault,
        deadline: getDeadline(timerTime[timerStatus]),
        isPaused: timerConfig.isPausedByDefault,
        focusIteration:
          timerStatus === FOCUS_STATUS
            ? timer.focusIteration + 1
            : timer.focusIteration,
      });
    },
    [getDeadline, timer.focusIteration, timer.time]
  );

  const switchTimerStatus = useCallback(() => {
    const isShortBreakStarts =
      timer.focusStatus === FOCUS_STATUS &&
      timer.focusIteration % timerConfig.iterationsBeforeLongBreak !== 0;
    const isLongBreakStarts =
      timer.focusStatus === FOCUS_STATUS &&
      timer.focusIteration % timerConfig.iterationsBeforeLongBreak === 0;
    const isFocusTimeStarts = timer.focusStatus !== FOCUS_STATUS;

    if (isShortBreakStarts) {
      switchTimerStatusTo(SHORT_BREAK_STATUS);
    }
    if (isLongBreakStarts) {
      switchTimerStatusTo(LONG_BREAK_STATUS);
    }
    if (isFocusTimeStarts) {
      switchTimerStatusTo(FOCUS_STATUS);
    }
  }, [switchTimerStatusTo, timer.focusIteration, timer.focusStatus]);
  const changeTimer = useCallback(
    (total, minutes, seconds) => {
      const isTimerKeepGoing = total >= 0;

      if (isTimerKeepGoing) {
        const newTime = `${minutes > 9 ? minutes : "0" + minutes}:${
          seconds > 9 ? seconds : "0" + seconds
        }`;
        setTimer({ time: newTime });
      } else {
        switchTimerStatus();
      }
    },
    [switchTimerStatus]
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
      deadline: getDeadline(timer.time),
      isPaused: false,
    });
  };

  const timerValue = {
    timer,
    onPauseTimer,
    onStartTimer,
    switchTimerStatusTo,
  };

  return (
    <TimerContext.Provider value={timerValue}>{children}</TimerContext.Provider>
  );
};

export default TimerProvider;
