"use client"

import { useState } from "react"

export default function CircuitCanvas() {

const [components,setComponents] = useState([])
const [wires,setWires] = useState([])

const [wireStart,setWireStart] = useState(null)

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

function startWire(id){

setWireStart(id)

}

function endWire(id){

if(wireStart && wireStart !== id){

setWires([
...wires,
{
from: wireStart,
to: id
}
])

}

setWireStart(null)

}

function getComponent(id){

return components.find(c=>c.id===id)

}

return (

<div
className="canvas"
onDrop={drop}
onDragOver={allowDrop}
>

{/* SVG wires */}

<svg className="wires">

{wires.map((wire,i)=>{

const from = getComponent(wire.from)
const to = getComponent(wire.to)

if(!from || !to) return null

return(

<line
key={i}
x1={from.x+30}
y1={from.y+20}
x2={to.x+30}
y2={to.y+20}
stroke="black"
strokeWidth="2"
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
top:comp.y
}}

onClick={()=>startWire(comp.id)}
onDoubleClick={()=>endWire(comp.id)}
>

{comp.type}

</div>

)

})}

</div>

)

}