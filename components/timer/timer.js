
import React from "react";
import Button from "../button/button";
import Time from "./time";

function Timer({ changeTitle }) {
  return (
    <>
      <Time changeTitle={changeTitle}/>
      <div className="flex gap-1.5">
        <Button text="focus time" color="red" />
        <Button text="short break" color="sky" />
        <Button text="long break" color="cyan" />
      </div>
    </>
  );
}

export default React.memo(Timer);
