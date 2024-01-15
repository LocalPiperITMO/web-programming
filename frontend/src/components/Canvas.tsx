import { useRef, useEffect } from "react";
import { drawGraph } from "../ts/canvas";

export function Canvas({ r }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (r.length !== 0) {
      drawGraph(canvas, context, r);
    } else {
      drawGraph(canvas, context);
    }
  }, []);

  return (
    <>
      <h2>Graph</h2>
      <canvas ref={canvasRef} width={300} height={300} />
    </>
  );
}
