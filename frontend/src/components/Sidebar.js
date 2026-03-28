"use client";
import { FaBatteryFull } from "react-icons/fa"
import { MdLightbulb } from "react-icons/md"
import { TbCircuitSwitchOpen } from "react-icons/tb";
import { Cable } from 'lucide-react';

const components = [
  { type: "battery", icon: <FaBatteryFull /> },
  { type: "led", icon: <MdLightbulb /> },
  { type: "switch", icon: <TbCircuitSwitchOpen /> },
  { type: "wire", icon: <Cable /> }
];

export default function Sidebar() {

  function dragStart(e, icon) {
    e.dataTransfer.setData("component", icon);
  }

  return (

    <div className="sidebar">

      <h3>Components</h3>

      {components.map(c => (

        <div
          key={c.icon}
          className="component"
          draggable
          onDragStart={(e)=>dragStart(e,c.icon)}
        >
          {c.icon} {c.type}
        </div>

      ))}

    </div>

  );
}