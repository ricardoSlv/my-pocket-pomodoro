import useTickingClock from "@/hooks/useTickingClock";
import React from "react";

export default function PomodoroClock() {
  const [time, mode, startClock, pauseClock, restartClock, switchMode] = useTickingClock(5, 1);

  return (
    <section className="font-orbitron">
      <div className="bg-gray-200 mx-auto p-4 border-4 border-cyan-950 rounded-2xl w-fit text-center">
        <div className="bg-gray-50 mx-auto mb-4 pt-6 border-4 border-cyan-950 rounded-lg text-center">
          <h2 className="px-6 md:px-12 lg:px-18 font-digital7 md:text-[9rem] text-8xl leading-[0.8]">
            {String(Math.floor(time / 60)).padStart(2, "0")}:{String(time % 60).padStart(2, "0")}
          </h2>
          <p className="pb-2">{mode === "work" ? "Time to work" : "Relax Time"}</p>
        </div>
        <div className="flex md:flex-row flex-col justify-around gap-2">
          <button className="bg-green-500 p-2 rounded w-full md:w-1/5 text-white" onClick={startClock}>
            Start
          </button>
          <button className="bg-yellow-500 p-2 rounded w-full md:w-1/5 text-white" onClick={pauseClock}>
            Pause
          </button>
          <button className="bg-blue-500 p-2 rounded w-full md:w-1/5 text-white" onClick={restartClock}>
            Restart
          </button>
          <button className="bg-red-500 p-2 rounded w-full md:w-1/3 text-white" onClick={switchMode}>
            Switch Mode
          </button>
        </div>
      </div>
    </section>
  );
}
