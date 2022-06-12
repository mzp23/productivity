import React, { useContext } from "react";
import Head from "next/head";

import Button from "../button/button";
import Time from "./time";
import { TimerContext } from "../../context/timerContext";

function Timer() {
  const { timer } = useContext(TimerContext);
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
          <Button text="focus time" color="red" />
          <Button text="short break" color="sky" />
          <Button text="long break" color="cyan" />
        </div>
      </section>
    </>
  );
}

export default React.memo(Timer);
