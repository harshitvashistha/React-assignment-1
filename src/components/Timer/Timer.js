import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";

const Timer = ({ minutes, setMinutes, seconds, setSeconds }) => {
  const history = useHistory();
  useEffect(() => {
    if (minutes === 0 && seconds === 1) {
      history.push("/result");
    }
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div>
      {minutes === 0 && seconds === 0 ? null : (
        <h1>
          {" "}
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      )}
    </div>
  );
};
export default Timer;
