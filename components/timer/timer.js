
import React from "react";
import Time from "./time";

function Timer({ changeTitle }) {
  console.log('12312312')
  return <Time changeTitle={changeTitle}/>;
}

export default React.memo(Timer);
