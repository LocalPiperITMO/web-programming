export function drawGraph(canvas, ctx, r = 3) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  ctx.globalAlpha = 0.9;
  // setting blue color
  ctx.strokeStyle = "#3399ff";
  ctx.fillStyle = "#3399ff";

  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  ctx.arc(
    canvas.width / 2,
    canvas.height / 2,
    (canvas.width / 2 / 5) * r,
    Math.PI,
    Math.PI / 2,
    true
  );
  ctx.fill();
  // Filling area in the second quadrant (triangle)
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  ctx.lineTo(canvas.width / 2, canvas.height / 2 + (canvas.height / 2 / 5) * r);
  ctx.lineTo(canvas.width / 2 + (canvas.width / 2 / 5) * r/2, canvas.height / 2);
  ctx.lineTo(canvas.width / 2, canvas.height / 2);
  ctx.fill();

  // Filling area in the third quadrant (empty)

  // Filling area in the fourth quadrant (quarter circle)
  ctx.fillRect(
    canvas.width / 2,
    canvas.height / 2,
    -(canvas.width / 2 / 5) * r,
    -(canvas.height / 2 / 5) * r
  );

  ctx.globalAlpha = 1;
  // setting black color
  ctx.beginPath();
  ctx.strokeStyle = "black";
  // graph arrows
  // vertical arrow
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.moveTo(canvas.width / 1.95, canvas.height * 0.03);
  ctx.lineTo(canvas.width / 2, 0);
  ctx.moveTo(canvas.width / 2.05, canvas.height * 0.03);
  ctx.lineTo(canvas.width / 2, 0);
  // horizontal arrow
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.moveTo(canvas.width * 0.97, canvas.height / 1.95);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.moveTo(canvas.width * 0.97, canvas.height / 2.05);
  ctx.lineTo(canvas.width, canvas.height / 2);

  // Labels
  // X label
  ctx.font = "bold 14px sans-serif";
  ctx.strokeStyle = "black";
  ctx.fillStyle = "black";
  ctx.fillText("X", canvas.width - 10, canvas.height / 2 + 20);
  // Y label
  ctx.fillText("Y", canvas.width / 2 + 10, 20);

  ctx.stroke();
}
