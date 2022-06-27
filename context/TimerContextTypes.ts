import {
  DEFAULT_FOCUS_TIME,
  DEFAULT_LONG_BREAK_TIME,
  DEFAULT_SHORT_BREAK_TIME,
  FOCUS_STATUS,
  ITERATION_BEFORE_LONG_BREAK,
  LONG_BREAK_STATUS,
  SHORT_BREAK_STATUS,
} from "../common/constants";

export type FocusStatusType =
  | typeof FOCUS_STATUS
  | typeof SHORT_BREAK_STATUS
  | typeof LONG_BREAK_STATUS;

export type TimerStateType = {
  time: string;
  isPaused: boolean;
  deadline: null | Date;
  focusStatus: FocusStatusType;
  focusIteration: number;
};


export type TimerConfigType = {
  focustTime: typeof DEFAULT_FOCUS_TIME;
  shortBreakTime: typeof DEFAULT_SHORT_BREAK_TIME;
  longBreakTime: typeof DEFAULT_LONG_BREAK_TIME;
  iterationsBeforeLongBreak: typeof ITERATION_BEFORE_LONG_BREAK;
  isPausedByDefault: boolean;
};

export type TimerContextType = {
  timer: TimerStateType;
  onPauseTimer: () => void;
  onStartTimer: () => void;
  switchTimerStatusTo: (focusStatus: FocusStatusType) => void;
}