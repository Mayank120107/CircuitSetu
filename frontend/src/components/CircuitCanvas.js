"use client"
import { FaBatteryFull } from "react-icons/fa"
import { TbCircuitResistor } from "react-icons/tb";
import { TbCircuitSwitchOpen } from "react-icons/tb";
import { TbCircuitGround } from "react-icons/tb";
import { TbCircuitAmmeter } from "react-icons/tb";
import { TbCircuitVoltmeter } from "react-icons/tb";
import { Cable } from 'lucide-react';

import { useState } from "react";

const iconMap = {
  battery: <FaBatteryFull />,
  switch: <TbCircuitSwitchOpen />,
  resistor: <TbCircuitResistor />,
  ground: <TbCircuitGround />,
  ammeter: <TbCircuitAmmeter />,
  voltmeter: <TbCircuitVoltmeter />
}

export default function CircuitCanvas() {

const [components,setComponents] = useState([])
const [draggingId, setDraggingId] = useState(null)
const [wires,setWires] = useState([])
const [wireStart, setWireStart] = useState(null)
const [offset, setOffset] = useState({ x: 0, y: 0 })

function startWire(id, side){
setWireStart({ id, side })
}
const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

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

function deleteComponent(id){

// remove component
setComponents(prev => prev.filter(c => c.id !== id))

// also remove connected wires
setWires(prev => prev.filter(w => 
w.from !== id && w.to !== id
))

}

return (

<div
className="canvas"
onDrop={drop}
onDragOver={allowDrop}
onMouseMove={(e)=>{

if(draggingId === null) return

const rect = e.currentTarget.getBoundingClientRect()

const x = e.clientX - rect.left - offset.x
const y = e.clientY - rect.top - offset.y

setComponents(prev =>
prev.map(c =>
c.id === draggingId
? { ...c, x, y }
: c
)
)

}}
onMouseUp={(e)=>{

  setDraggingId(null)

if(!wireStart) return

const rect = e.currentTarget.getBoundingClientRect()
const x = e.clientX - rect.left
const y = e.clientY - rect.top

let target = null
let targetSide = null

components.forEach(c => {

const leftPortX = c.x
const rightPortX = c.x + 80
const portY = c.y + 20

if(Math.abs(x - leftPortX) < 10 && Math.abs(y - portY) < 10){
target = c
targetSide = "left"
}

if(Math.abs(x - rightPortX) < 10 && Math.abs(y - portY) < 10){
target = c
targetSide = "right"
}

})

if(!target){
setWireStart(null)
return
}

if(
target.id === wireStart.id &&
targetSide === wireStart.side
){
setWireStart(null)
return
}

setWires(prev => [
...prev,
{
from: wireStart.id,
to: target.id,
fromSide: wireStart.side,
toSide: targetSide
}
])

setWireStart(null)

}}

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
pointerEvents: "auto"
}}
>
{wires.map((wire,i)=>{

const from = getComponent(wire.from)
const to = getComponent(wire.to)

if(!from || !to) return null

const fromOffset = wire.fromSide === "left" ? 0 : 80
const toOffset = wire.toSide === "left" ? 0 : 80
return(

<line
key={i}
x1={from.x + fromOffset}
y1={from.y + 20}
x2={to.x + toOffset}
y2={to.y + 20}
stroke="black"
strokeWidth="2"

style={{ cursor: "pointer" }}
pointerEvents="stroke"
onClick={()=>{
setWires(prev => prev.filter((_,index)=> index !== i))
}}
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
left: comp.x,
top: comp.y,
border: wireStart && wireStart.id === comp.id ? "2px solid blue" : "1px solid #ccc",
cursor: "grab",
}}
onMouseDown={(e)=>{
if(e.target.classList.contains("port")) return
handleMouseDown(comp.id, e)
}}
onContextMenu={(e)=>{
e.preventDefault()
deleteComponent(comp.id)
}}

>

{/* LEFT PORT */}
<div
className="port left"
onMouseDown={(e)=>{
e.stopPropagation()
startWire(comp.id, "left")
}}
/>

{/* CENTER CONTENT */}
<div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
{iconMap[comp.type]}
<span style={{fontSize:"10px"}}>{comp.type}</span>
</div>

{/* RIGHT PORT */}
<div
className="port right"
onMouseDown={(e)=>{
e.stopPropagation()
startWire(comp.id, "right")
}}
/>

</div>

)

})}

</div>

)

}