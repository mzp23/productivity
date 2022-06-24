import { render, screen, waitFor } from "@testing-library/react";
import {
  FOCUS_STATUS,
  LONG_BREAK_STATUS,
  SHORT_BREAK_STATUS,
  TITLE,
} from "../../../common/constants";
import Timer from "../../../components/timer/timer";
import { TimerContext } from "../../../context/timerContext";

jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }) => {
      return <>{children}</>;
    },
  };
});

const mockTimerContext = {
  switchTimerStatusTo: jest.fn(),
  timer: {
    focusStatus: FOCUS_STATUS,
    focusIteration: 1,
    deadline: null,
    time: "25:00",
  },
};

describe("Timer", () => {
  it(`should call switchTimerStatusTo func with correct focusStatus on button click`, () => {
    render(
      <TimerContext.Provider value={mockTimerContext}>
        <Timer />
      </TimerContext.Provider>
    );

    const focusBtn = screen.getByText(FOCUS_STATUS);
    focusBtn.click();
    expect(mockTimerContext.switchTimerStatusTo).toHaveBeenCalledWith(
      FOCUS_STATUS
    );

    const shortBreakBtn = screen.getByText(SHORT_BREAK_STATUS);
    shortBreakBtn.click();
    expect(mockTimerContext.switchTimerStatusTo).toHaveBeenCalledWith(
      SHORT_BREAK_STATUS
    );

    const longBreakBtn = screen.getByText(LONG_BREAK_STATUS);
    longBreakBtn.click();
    expect(mockTimerContext.switchTimerStatusTo).toHaveBeenCalledWith(
      LONG_BREAK_STATUS
    );
  });

  it(`should display ${TITLE} if the timer does not start`, async () => {
    render(
      <TimerContext.Provider value={mockTimerContext}>
        <Timer />
      </TimerContext.Provider>,
      { container: document.head }
    );

    expect(document.title).toBe(TITLE);
  });

  it(`should display current status and time if the timer is running`, async () => {
    const mockTimerContextWithRunningTimer = {
      switchTimerStatusTo: jest.fn(),
      timer: {
        focusStatus: FOCUS_STATUS,
        focusIteration: 1,
        deadline: "25:00",
        time: "25:00",
      },
    };

    render(
      <TimerContext.Provider value={mockTimerContextWithRunningTimer}>
        <Timer />
      </TimerContext.Provider>,
      { container: document.head }
    );

    expect(document.title).toBe(
      mockTimerContextWithRunningTimer.timer.time + " | " + mockTimerContextWithRunningTimer.timer.focusStatus
    );
  });
});
