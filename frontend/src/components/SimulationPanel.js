"use client";

import { useState } from "react";

export default function SimulationPanel(){

  const [status,setStatus] = useState("Idle");
  const [volt,setVolt] = useState(0);
  const [curr,setCurr] = useState(0);

  function runSimulation(){

    setVolt(9);
    setCurr(0.02);
    setStatus("Running");

  }

  return(

    <div className="simulation">

      <h3>Simulation</h3>

      <button onClick={runSimulation}>
        Run
      </button>

      <div className="stats">

        <p>Voltage: {volt} V</p>
        <p>Current: {curr} A</p>
        <p>Status: {status}</p>

      </div>

    </div>

  );
}