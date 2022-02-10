import React, { useRef, useEffect, useState } from "react";
import { init, startdragging, dropit } from "./webgl/moveitems";

function App(props) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const ctx = canvasRef.current;
    init(ctx);
  }, []);

  return (
    <>
      <div className="go">
        <h3 className="title">test</h3>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startdragging}
        onMouseUp={dropit}
        id="canvas"
      >
        Your browser doesn't recognize the canvas element
      </canvas>
    
    </>
  );
}

export default App;
