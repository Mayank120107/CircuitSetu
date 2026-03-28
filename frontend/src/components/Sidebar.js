"use client";
import { FaBatteryFull } from "react-icons/fa"
import { MdLightbulb } from "react-icons/md"
import { TbCircuitSwitchOpen } from "react-icons/tb";
import { Cable } from 'lucide-react';

const components = [
  { type: "battery", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20 " fill="currentColor" width="80px" height="20px" className="transform rotate-90"><path d="M16 4h-1V2h-2v2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H8V6h8v12z"/></svg>},
  { type: "led", icon: <MdLightbulb /> },
  { type: "switch", icon: <TbCircuitSwitchOpen /> },
  { type: "wire", icon: <Cable /> }
];

export default function Sidebar() {

  function dragStart(e, type) {
    e.dataTransfer.setData("component", type);
  }

  return (

    <div className="sidebar">

      <h3>Components</h3>

      {components.map(c => (

        <div
          key={c.type}
          className="component"
          draggable
          onDragStart={(e)=>dragStart(e,c.type)}
        >
          {c.icon} {c.type}
        </div>

      ))}

    </div>

  );
}