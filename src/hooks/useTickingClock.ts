"use client";

import { useState, useEffect, useRef } from "react";

type PomodoroMode = "work" | "relax";

const useTickingClock = (workTicks: number, relaxTicks: number, tickRateInMilliseconds: number) => {
  const [remainingTicksInMode, setRemainingTicksInMode] = useState(workTicks);
  const [mode, setMode] = useState<PomodoroMode>("work");
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setRemainingTicksInMode((prevTicks) => {
          if (prevTicks > 0) {
            return prevTicks - 1;
          } else {
            if (mode === "work") {
              setMode("relax");
              return relaxTicks;
            } else {
              setMode("work");
              return workTicks;
            }
          }
        });
      }, tickRateInMilliseconds);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, mode, relaxTicks, workTicks, tickRateInMilliseconds]);

  const pauseClock = () => {
    setIsActive(false);
  };

  const startClock = () => {
    setIsActive(true);
  };

  const restartClock = () => {
    if (mode == "work") {
      setRemainingTicksInMode(workTicks);
    } else {
      setRemainingTicksInMode(relaxTicks);
    }
  };

  const switchMode = () => {
    if (mode == "work") {
      setMode("relax");
      setRemainingTicksInMode(relaxTicks);
    } else {
      setMode("work");
      setRemainingTicksInMode(workTicks);
    }
  };

  return [remainingTicksInMode, isActive, mode, startClock, pauseClock, restartClock, switchMode] as const;
};

export default useTickingClock;
