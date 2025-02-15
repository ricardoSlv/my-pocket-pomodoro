"use client";

import PomodoroClock from "@/components/PomodoroClock";
import SimpleTodo from "@/components/SimpleTodo";

// import Image from "next/image";

export default function Home() {
  return (
    <>
      <h1 className="mx-auto py-10 w-fit font-orbitron text-2xl md:text-4xl lg:text-6xl">My Pomodoro Timer</h1>
      <PomodoroClock />
      <h1 className="mx-auto py-10 w-fit font-orbitron text-2xl md:text-4xl lg:text-6xl">Quick Todos:</h1>
      <SimpleTodo />
    </>
  );
}
