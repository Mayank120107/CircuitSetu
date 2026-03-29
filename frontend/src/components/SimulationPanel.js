"use client"
import { useState } from "react"
import { generateSimulationPayload } from "../lib/netlistGenerator"

export default function SimulationPanel() {
  const [status, setStatus] = useState("Idle")
  const [batteryVal, setBatteryVal] = useState(9)
  const [resistorVal, setResistorVal] = useState(100)

const handleRun = () => {
    const isReady = typeof window !== "undefined" && (window.wasmReady || (window.Module && window.Module.cwrap));

    if (!isReady) {
      setStatus("Engine Warming Up...");
      console.warn("WASM not ready yet. Ensure circuit_engine.js and .wasm are in /public");
      return;
    }
    setStatus("Solving Matrix...");
    
    try {
      const canvasComponents = JSON.parse(localStorage.getItem('circuit_components') || '[]');
      const canvasWires = JSON.parse(localStorage.getItem('circuit_wires') || '[]');
      if (canvasComponents.length === 0) {
        setStatus("Canvas is empty");
        return;
      }
      const jsonPayload = generateSimulationPayload(canvasComponents, canvasWires);
      const runSimulation = engine.cwrap('run_circuit_simulation', 'string', ['string']);
      const resultString = runSimulation(jsonPayload);
      const result = JSON.parse(resultString);
      console.log("C++ Result:", result);
      
      if (result.status === "success") {
        setStatus("Solved Natively");
      } else {
        setStatus("Matrix Error");
      }

    } catch (e) {
      console.error("Simulation failed:", e);
      setStatus("C++ Error");
    }
  }

  return (
    <aside className="w-full h-full bg-[#bfe3cc] flex flex-col font-mono text-slate-800">
      <div className="p-4 border-b-2 border-[#334155] bg-[#a8d5ba] shadow-[0_4px_0px_rgba(51,65,85,0.1)] z-10 shrink-0">
        <h2 className="font-bold uppercase tracking-widest text-sm text-center">Properties</h2>
      </div>
      <div className="p-5 border-b-2 border-[#334155] flex-1">
        <h3 className="text-xs font-bold uppercase text-slate-500 mb-3 tracking-widest">Selected Node</h3>
        <div className="bg-[#F9F8F4] border-2 border-[#334155] p-3 shadow-[4px_4px_0px_#334155] mb-6">
          <div className="flex justify-between items-center mb-3 border-b-2 border-[#334155] pb-2">
            <span className="font-bold text-sm uppercase">Voltage Source</span>
            <span className="text-[10px] bg-[#fce6b6] border-2 border-[#334155] px-1 font-bold">ID: BT-1</span>
          </div>
          <label className="text-xs font-bold block mb-1">Voltage (V)</label>
          <input 
            type="number" 
            value={batteryVal}
            onChange={(e) => setBatteryVal(e.target.value)}
            className="w-full bg-white border-2 border-[#334155] p-1.5 text-sm font-bold focus:outline-none focus:bg-[#fce6b6] transition-colors shadow-inner" 
          />
        </div>
        <div className="bg-[#F9F8F4] border-2 border-[#334155] p-3 shadow-[4px_4px_0px_#334155]">
          <div className="flex justify-between items-center mb-3 border-b-2 border-[#334155] pb-2">
            <span className="font-bold text-sm uppercase">Resistor</span>
            <span className="text-[10px] bg-[#fce6b6] border-2 border-[#334155] px-1 font-bold">ID: R-1</span>
          </div>
          <label className="text-xs font-bold block mb-1">Resistance (Ω)</label>
          <input 
            type="number" 
            value={resistorVal}
            onChange={(e) => setResistorVal(e.target.value)}
            className="w-full bg-white border-2 border-[#334155] p-1.5 text-sm font-bold focus:outline-none focus:bg-[#fce6b6] transition-colors shadow-inner" 
          />
        </div>
      </div>
      <div className="p-5 bg-[#F9F8F4] shrink-0 border-t-2 border-[#334155]">
        <h3 className="text-xs font-bold uppercase text-slate-500 mb-3 tracking-widest">Engine Output</h3>
        
        <button
          onClick={handleRun}
          className="w-full py-3 bg-[#a8d5ba] border-2 border-[#334155] font-bold tracking-widest uppercase shadow-[4px_4px_0px_#334155] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#334155] active:bg-[#64a982] transition-all mb-4 flex items-center justify-center gap-2"
        >
          <span className={`w-2 h-2 rounded-full border border-[#334155] ${status === "Idle" ? "bg-red-500" : "bg-green-500 animate-pulse"}`}></span>
          Run Engine
        </button>

        <div className="space-y-2 text-sm font-bold bg-white border-2 border-[#334155] p-3 shadow-inner text-slate-600">
          <div className="flex justify-between border-b-2 border-dashed border-slate-300 pb-1">
            <span>Status:</span>
            <span className={status === "Idle" ? "text-slate-400" : "text-[#64a982]"}>{status}</span>
          </div>
          <div className="flex justify-between border-b-2 border-dashed border-slate-300 pb-1">
            <span>Voltage:</span>
            <span className="text-slate-800">-- V</span>
          </div>
          <div className="flex justify-between border-b-2 border-dashed border-slate-300 pb-1">
            <span>Current:</span>
            <span className="text-slate-800">-- A</span>
          </div>
        </div>
      </div>

    </aside>
  )
}