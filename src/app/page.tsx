"use client";

import PomodoroClock from "@/components/PomodoroClock";
import SimpleTodo from "@/components/SimpleTodo";

const headerStyle = "mx-auto py-5 lg:py-10 w-fit font-orbitron text-2xl md:text-4xl lg:text-6xl";

export default function Home() {
  return (
    <>
      <h1 className={headerStyle}>My Pomodoro Timer</h1>
      <PomodoroClock />
      <h1 className={headerStyle}>Quick Todos:</h1>
      <SimpleTodo />
    </>
  );
}
