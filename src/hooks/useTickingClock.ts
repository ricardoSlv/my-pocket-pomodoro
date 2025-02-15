"use client";

import { useState, useEffect, useRef } from "react";

const useTickingClock = (workTime: number, relaxTime: number) => {
  const [time, setTime] = useState(workTime * 60);
  const [mode, setMode] = useState<"work" | "relax">("work");
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      //should be cleared before?, may duplicate on mode switch
      console.log("intervalRef.current", intervalRef.current);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            if (mode === "work") {
              setMode("relax");
              return relaxTime * 60;
            } else {
              setMode("work");
              return workTime * 60;
            }
          }
        });
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, mode, relaxTime, workTime]);

  const pauseClock = () => {
    setIsActive(false);
  };

  const startClock = () => {
    setIsActive(true);
  };

  const restartClock = () => {
    if (mode == "work") {
      setTime(workTime * 60);
    } else {
      setTime(relaxTime * 60);
    }
  };
  const switchMode = () => {
    if (mode == "work") {
      setMode("relax");
      setTime(relaxTime * 60);
    } else {
      setMode("work");
      setTime(workTime * 60);
    }
  };

  return [time, mode, startClock, pauseClock, restartClock, switchMode] as const;
};

export default useTickingClock;
