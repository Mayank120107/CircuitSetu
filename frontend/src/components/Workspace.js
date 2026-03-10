"use client";

import { useState } from "react";

export default function Workspace() {

  const [elements,setElements] = useState([]);

  function drop(e){

    const type = e.dataTransfer.getData("component");

    const newElement = {
      id: Date.now(),
      type,
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY
    };

    setElements([...elements,newElement]);
  }

  function dragOver(e){
    e.preventDefault();
  }

  return (

    <div
      className="workspace"
      onDrop={drop}
      onDragOver={dragOver}
    >

      <h3 className="title">Build Your Circuit</h3>

      {elements.map(el => (

        <div
          key={el.id}
          className="element"
          style={{
            left: el.x,
            top: el.y
          }}
        >
          {el.type}
        </div>

      ))}

    </div>

  );
}