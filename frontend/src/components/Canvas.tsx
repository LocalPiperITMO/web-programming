import { useEffect, useRef } from "react";
import { drawPoint, sendPointData } from "../ts/canvas";

export function Canvas({ width, height, r, out, user, so }: any) {
  const canvasRef = useRef(null);
  const drawGraph = (ctx) => {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();

    ctx.globalAlpha = 0.9;
    // setting blue color
    ctx.strokeStyle = "#3399ff";
    ctx.fillStyle = "#3399ff";

    // arc
    ctx.moveTo(width / 2, height / 2);
    if (r >= 0) {
      ctx.arc(
        width / 2,
        height / 2,
        (width / 2 / 5) * Math.abs(r),
        Math.PI / 2,
        Math.PI,
        false
      );
    } else {
      ctx.arc(
        width / 2,
        height / 2,
        (width / 2 / 5) * Math.abs(r),
        (3 * Math.PI) / 2,
        2 * Math.PI,
        false
      );
    }
    ctx.fill();
    // rectangle
    ctx.moveTo(width / 2, height / 2);
    ctx.lineTo(width / 2, height / 2 + (height / 2 / 5) * r);
    ctx.lineTo(width / 2 + ((width / 2 / 5) * r) / 2, height / 2);
    ctx.lineTo(width / 2, height / 2);
    ctx.fill();

    // square
    ctx.fillRect(
      width / 2,
      height / 2,
      -(width / 2 / 5) * r,
      -(height / 2 / 5) * r
    );

    ctx.globalAlpha = 1;
    // setting black color
    ctx.beginPath();
    ctx.strokeStyle = "black";
    // graph arrows
    // vertical arrow
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.moveTo(width / 1.95, height * 0.03);
    ctx.lineTo(width / 2, 0);
    ctx.moveTo(width / 2.05, height * 0.03);
    ctx.lineTo(width / 2, 0);
    // horizontal arrow
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.moveTo(width * 0.97, height / 1.95);
    ctx.lineTo(width, height / 2);
    ctx.moveTo(width * 0.97, height / 2.05);
    ctx.lineTo(width, height / 2);

    // Labels
    // X label
    ctx.font = "bold 14px sans-serif";
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.fillText("X", width - 10, height / 2 + 20);
    // Y label
    ctx.fillText("Y", width / 2 + 10, 20);

    ctx.stroke();
  };
  const drawPoints = (ctx) => {
    console.log(out);
    JSON.parse(out).array.forEach((element: any) => {
      element.x = width / 2 + (width / 3) * (element.x / r);
      element.y = height / 2 - (height / 2.95) * (element.y / r);
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.arc(element.x, element.y, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    });
  };
  const clearCanvas = (ctx) => {
    ctx.beginPath();
    ctx.clearRect(0, 0, width, height);
  };

  const canvasClick = async (evt, canvasRef) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    const userX = (evt.clientX - rect.left - rect.width / 2) / 30;
    const userY = -(evt.clientY - rect.top - rect.height / 2) / 30;
    const pointData = await sendPointData(userX, userY, r, user);
    const points = JSON.parse(pointData);
    drawPoint(ctx, width, height, points[points.length - 1]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    drawGraph(context);
    if (out) {
      drawPoints(context);
    } else {
      clearCanvas(context);
      drawGraph(context);
    }
  }, [drawGraph, drawPoints]);

  return (
    <>
      <canvas
        ref={canvasRef}
        onClick={(e) => canvasClick(e, canvasRef)}
        width={width}
        height={height}
      />
    </>
  );
}
