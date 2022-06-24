import { render, screen } from "@testing-library/react";
import { FOCUS_STATUS } from "../../../common/constants";
import Time from "../../../components/timer/time";
import { TimerContext } from "../../../context/timerContext";

const mockTimerContext = {
  onPauseTimer: jest.fn(),
  onStartTimer: jest.fn(),
  timer: {
    focusStatus: FOCUS_STATUS,
    focusIteration: 1,
  },
};

describe("Time", () => {
  it(`should display timer iteration if current focus status is ${FOCUS_STATUS}`, () => {
    render(
      <TimerContext.Provider value={mockTimerContext}>
        <Time />
      </TimerContext.Provider>
    );

    const timerText = screen.getByTestId("timer-text");

    expect(timerText).toHaveTextContent(mockTimerContext.timer.focusIteration);
  });

  it(`should not display timer iteration if current focus status is not ${FOCUS_STATUS}`, () => {
    const mockTimerContextWithSomeStatus = {
      ...mockTimerContext,
      timer: { ...mockTimerContext.timer, focusStatus: "some status" },
    };

    render(
      <TimerContext.Provider value={mockTimerContextWithSomeStatus}>
        <Time />
      </TimerContext.Provider>
    );
    const timerText = screen.getByTestId("timer-text");

    expect(timerText).not.toHaveTextContent(
      mockTimerContextWithSomeStatus.timer.focusIteration
    );
  });
});
