"use client"

import Sidebar from "../../components/Sidebar"
import SimulationPanel from "../../components/SimulationPanel"
import CircuitCanvas from "../../components/CircuitCanvas"

export default function Home(){

return(

<div className="container">

<Sidebar/>

<CircuitCanvas/>

<SimulationPanel/>

</div>

)

}