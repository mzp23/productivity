import React, { useContext } from "react";
import Head from "next/head";

import Button from "../button/button";
import Time from "./time";
import { TimerContext } from "../../context/timerContext";
import {
  FOCUS_STATUS,
  LONG_BREAK_STATUS,
  SHORT_BREAK_STATUS,
  TITLE,
} from "../../common/constants";
import { TimerContextType } from "../../context/TimerContextTypes";

function Timer(): JSX.Element {
  const { timer, switchTimerStatusTo }: TimerContextType = useContext(TimerContext);
  const isTimerStarted = timer.deadline !== null;

  return (
    <>
      <Head>
        <title>{`${
          isTimerStarted ? timer.time + " | " + timer.focusStatus : TITLE
        }`}</title>
      </Head>
      <section className="bg-red-500 h-screen flex flex-col items-center justify-center">
        <Time />
        <div className="flex gap-1.5">
          <Button
            text={FOCUS_STATUS}
            color="red"
            onClick={() => switchTimerStatusTo(FOCUS_STATUS)}
          />
          <Button
            text={SHORT_BREAK_STATUS}
            color="sky"
            onClick={() => switchTimerStatusTo(SHORT_BREAK_STATUS)}
          />
          <Button
            text={LONG_BREAK_STATUS}
            color="cyan"
            onClick={() => switchTimerStatusTo(LONG_BREAK_STATUS)}
          />
        </div>
      </section>
    </>
  );
}

export default React.memo(Timer);
