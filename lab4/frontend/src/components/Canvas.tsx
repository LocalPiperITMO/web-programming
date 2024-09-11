import { useEffect, useRef } from "react";
import { TPoint } from "./Body";

type CanvasDimensions = {
  width: number;
  height: number;
};

export type CanvasProps = {
  canvasDimensions: {
    width: number;
    height: number;
  };
  scale: number;
  points: TPoint[];
  onPointAdd: (point: TPoint) => void;
};

export function Canvas({ canvasDimensions, points, scale, onPointAdd }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canvasClick = (evt: { clientX: number; clientY: number; }) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    onPointAdd({
      x: (evt.clientX - rect.left - rect.width / 2) / 30,
      y: -(evt.clientY - rect.top - rect.height / 2) / 30,
      scale
    })
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d")!;
    drawGraph(context, canvasDimensions, scale);
    if (points) {
      drawPoints(context, canvasDimensions, points, scale);
    }
  }, [points, canvasDimensions, scale]);

  return (
    <>
      <canvas
        ref={canvasRef}
        onClick={canvasClick}
        width={canvasDimensions.width}
        height={canvasDimensions.height}
      />
    </>
  );
}

function drawGraph(
  ctx: CanvasRenderingContext2D,
  { width, height }: CanvasDimensions,
  scale: number
) {
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();

  ctx.globalAlpha = 0.9;
  // setting blue color
  ctx.strokeStyle = "#3399ff";
  ctx.fillStyle = "#3399ff";

  // arc
  ctx.moveTo(width / 2, height / 2);
  if (scale >= 0) {
    ctx.arc(
      width / 2,
      height / 2,
      (width / 2 / 5) * Math.abs(scale),
      Math.PI / 2,
      Math.PI,
      false
    );
  } else {
    ctx.arc(
      width / 2,
      height / 2,
      (width / 2 / 5) * Math.abs(scale),
      (3 * Math.PI) / 2,
      2 * Math.PI,
      false
    );
  }
  ctx.fill();
  // rectangle
  ctx.moveTo(width / 2, height / 2);
  ctx.lineTo(width / 2, height / 2 + (height / 2 / 5) * scale);
  ctx.lineTo(width / 2 + ((width / 2 / 5) * scale) / 2, height / 2);
  ctx.lineTo(width / 2, height / 2);
  ctx.fill();

  // square
  ctx.fillRect(
    width / 2,
    height / 2,
    -(width / 2 / 5) * scale,
    -(height / 2 / 5) * scale
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
}

function drawPoints(ctx: CanvasRenderingContext2D, dimensions: CanvasDimensions, points: TPoint[], scale: number) {
  points.filter(point => point.scale == scale).forEach((element) => {
    element.x = dimensions.width / 2 + (dimensions.width / 3) * (element.x / scale);
    element.y = dimensions.height / 2 - (dimensions.height / 2.95) * (element.y / scale);
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(element.x, element.y, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  });
}
