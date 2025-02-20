import useTickingClock from "@/hooks/useTickingClock";
import React, { useEffect, useState } from "react";

const clockButtonStyle = "p-2 rounded w-full md:w-1/3 text-white";

const minutesInSeconds = (mins: number) => mins * 60;

export default function PomodoroClock() {
  const [tickRate, setTickRate] = useState(1000);
  const [time, isActive, mode, startClock, pauseClock, restartClock, switchMode] = useTickingClock(
    minutesInSeconds(5),
    minutesInSeconds(1),
    tickRate
  );

  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(mode === "work" ? "Work now!" : "Time to relax");
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices[5];
    window.speechSynthesis.speak(utterance);
  }, [mode]);

  return (
    <section className="font-orbitron">
      <div className="bg-gray-200 mx-auto p-4 border-4 border-cyan-950 rounded-2xl w-fit text-center">
        <div className="relative bg-gray-50 bg-cover bg-no-repeat bg-center mx-auto mb-4 pt-6 border-4 border-cyan-950 rounded-lg text-center">
          <h2 className="px-6 md:px-12 lg:px-18 font-digital7 md:text-[9rem] text-8xl leading-[0.8]">
            {String(Math.floor(time / 60)).padStart(2, "0")}:{String(time % 60).padStart(2, "0")}
          </h2>
          <p className="pb-2">{mode === "work" ? "Time to work" : "Relax Time"}</p>
          <button
            className={"bg-red-400 px-2 rounded m-1 right-0 top-0 absolute text-white"}
            onClick={() => setTickRate(tickRate === 1000 ? 30 : 1000)}
          >
            {tickRate === 1000 ? "Go Fast" : "Slow Down"}
          </button>
        </div>
        <div className="flex md:flex-row flex-col justify-around gap-2">
          {isActive ? (
            <button className={"bg-yellow-500 " + clockButtonStyle} onClick={pauseClock}>
              Pause
            </button>
          ) : (
            <button className={"bg-green-500 " + clockButtonStyle} onClick={startClock}>
              Start
            </button>
          )}
          <button className={"bg-blue-500 " + clockButtonStyle} onClick={restartClock}>
            Restart
          </button>
          <button className={"bg-red-500 " + clockButtonStyle} onClick={switchMode}>
            Switch Mode
          </button>
        </div>
      </div>
    </section>
  );
}
