"use client";
import { FaBatteryFull } from "react-icons/fa"
import { MdLightbulb } from "react-icons/md"

const components = [
  { type: "battery", icon: <FaBatteryFull /> },
  { type: "led", icon: <MdLightbulb /> },
  { type: "switch", icon: "⚫ Switch" },
  { type: "wire", icon: "〰 Wire" }
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
          {c.label}
        </div>

      ))}

    </div>

  );
}