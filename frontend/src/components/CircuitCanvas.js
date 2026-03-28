"use client"
import { FaBatteryFull } from "react-icons/fa"
import { MdLightbulb } from "react-icons/md"
import { TbCircuitSwitchOpen } from "react-icons/tb";
import { Cable } from 'lucide-react';

import { useState } from "react";

const iconMap = {
  battery: <FaBatteryFull />,
  led: <MdLightbulb />,
  switch: <TbCircuitSwitchOpen />,
  wire: <Cable />
}

export default function CircuitCanvas() {

const [components,setComponents] = useState([])
const [draggingId, setDraggingId] = useState(null)
const [wires,setWires] = useState([])

const [wireStart,setWireStart] = useState(null)

function handleMouseDown(id){
  setDraggingId(id)
}

function handleMouseUp(){
  setDraggingId(null)
}

function handleMouseMove(e){

  if(draggingId === null) return

  const rect = e.currentTarget.getBoundingClientRect()

  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  setComponents(prev =>
    prev.map(comp =>
      comp.id === draggingId
        ? { ...comp, x, y }
        : comp
    )
  )

}

function drop(e){

e.preventDefault()

const type = e.dataTransfer.getData("component")

const rect = e.currentTarget.getBoundingClientRect()

const x = e.clientX - rect.left
const y = e.clientY - rect.top

setComponents([
...components,
{
id: Date.now(),
type,
x,
y
}
])

}

function allowDrop(e){
e.preventDefault()
}

function handleConnection(id){

  if(!wireStart){
    setWireStart(id)
  } else if(wireStart !== id){

    setWires(prev => [
      ...prev,
      { from: wireStart, to: id }
    ])

    setWireStart(null)
  }

}

function getComponent(id){

return components.find(c=>c.id===id)

}

return (

<div
className="canvas"
onDrop={drop}
onDragOver={allowDrop}
onMouseMove={handleMouseMove}
onMouseUp={handleMouseUp}
>

{/* SVG wires */}

<svg
className="wires"
style={{
position: "absolute",
top: 0,
left: 0,
width: "100%",
height: "100%",
pointerEvents: "none"
}}
>

{wires.map((wire,i)=>{

const from = getComponent(wire.from)
const to = getComponent(wire.to)

if(!from || !to) return null

return(

<line
key={i}
x1={from.x+40}
y1={from.y+20}
x2={to.x+40}
y2={to.y+20}
stroke="black"
strokeWidth="3"
/>

)

})}

</svg>

{/* Components */}

{components.map(comp=>{

return(

<div
key={comp.id}
className="element"
style={{
left:comp.x,
top:comp.y,
border: wireStart === comp.id ? "2px solid blue" : "none",
cursor:"grab",
}}
onMouseDown={()=>handleMouseDown(comp.id)}
onClick={()=>handleConnection(comp.id)}
>

{iconMap[comp.type]}

</div>

)

})}

</div>

)

}