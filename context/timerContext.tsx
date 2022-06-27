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
  ITERATION_BEFORE_LONG_BREAK,
  LONG_BREAK_STATUS,
  SHORT_BREAK_STATUS,
} from "../common/constants";

import {
  TimerConfigType,
  TimerStateType,
  FocusStatusType,
  TimerContextType,
} from "./TimerContextTypes";

const initialContext: TimerContextType = {
  timer: {
    time: "25:00",
    isPaused: true,
    deadline: null,
    focusStatus: "focus time",
    focusIteration: 1,
  },
  switchTimerStatusTo: () => {},
  onPauseTimer: () => {},
  onStartTimer: () => {},
};

export const TimerContext = createContext(initialContext);

const initialTimerState: TimerStateType = {
  time: DEFAULT_FOCUS_TIME,
  isPaused: true,
  deadline: null,
  focusStatus: FOCUS_STATUS,
  focusIteration: 1,
};

const timerConfig: TimerConfigType = {
  focustTime: DEFAULT_FOCUS_TIME,
  shortBreakTime: DEFAULT_SHORT_BREAK_TIME,
  longBreakTime: DEFAULT_LONG_BREAK_TIME,
  iterationsBeforeLongBreak: ITERATION_BEFORE_LONG_BREAK,
  isPausedByDefault: true,
};

const TimerProvider: React.FC<any> = ({ children }) => {
  const [timer, setTimer] = useReducer(
    (prevState: TimerStateType, payload: Partial<TimerStateType>) => ({
      ...prevState,
      ...payload,
    }),
    initialTimerState
  );
  const timerId = useRef<ReturnType<typeof setInterval> | null>(null);

  const getTimeRemaining = (
    time: Date
  ): { total: number; minutes: number; seconds: number } => {
    const total =
      Date.parse(time.toString()) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);

    return {
      total,
      minutes,
      seconds,
    };
  };

  const getDeadline = useCallback((time: string): Date => {
    const minutes = +time.substring(0, 2) * 60;
    const sec = +time.substring(3, 5);
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + minutes + sec);

    return deadline;
  }, []);

  const switchTimerStatusTo = useCallback(
    (timerStatus: FocusStatusType): void => {
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
    (total: number, minutes: number, seconds: number) => {
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
    (time: Date): void => {
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

    timer.deadline && startTimer(timer.deadline);

    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, [timer.deadline, startTimer, timer.isPaused]);

  const onPauseTimer = (): void => {
    setTimer({
      isPaused: true,
    });
  };

  const onStartTimer = (): void => {
    setTimer({
      deadline: getDeadline(timer.time),
      isPaused: false,
    });
  };

  const timerValue: TimerContextType = {
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
