import React, { useContext } from "react";
import Head from "next/head";

import Button from "../button/button";
import Time from "./time";
import { TimerContext } from "../../context/timerContext";
import { FOCUS_STATUS, LONG_BREAK_STATUS, SHORT_BREAK_STATUS } from "../../common/constants";

function Timer() {
  const { timer, switchTimerStatusTo } = useContext(TimerContext);

  return (
    <>
      <Head>
        <title>{`${
          timer.focusStatus
            ? timer.time + " | " + timer.focusStatus
            : "Productivity"
        }`}</title>
      </Head>
      <section className="bg-red-500 h-screen flex flex-col items-center justify-center">
        <Time />
        <div className="flex gap-1.5">
          <Button text="focus time" color="red" onClick={() => switchTimerStatusTo(FOCUS_STATUS)}/>
          <Button text="short break" color="sky" onClick={() => switchTimerStatusTo(SHORT_BREAK_STATUS)} />
          <Button text="long break" color="cyan" onClick={() => switchTimerStatusTo(LONG_BREAK_STATUS)} />
        </div>
      </section>
    </>
  );
}

export default React.memo(Timer);
