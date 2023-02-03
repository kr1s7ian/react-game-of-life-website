import React, { useRef, useEffect, useState } from "react";
import { CreateGridContext, useGrid } from "../hooks/useGrid";

export const GridCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grid = useGrid(CreateGridContext(100, 100));
  let [startPanX, setStartPanX] = useState<number>(0);
  let [startPanY, setStartPanY] = useState<number>(0);
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "black";
    context.strokeStyle = "black";
    for (let x = 0; x < grid.ctx.rows; x++) {
      for (let y = 0; y < grid.ctx.columns; y++) {
        if (grid.getCellAt(x, y) === true) {
          context.fillRect(
            (x + grid.ctx.offsetX) * grid.ctx.cellSize,
            (y + grid.ctx.offsetY) * grid.ctx.cellSize,
            grid.ctx.cellSize,
            grid.ctx.cellSize
          );
        }
      }
    }
  }, [grid.ctx]);

  return (
    <>
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        ref={canvasRef}
        onMouseMove={(event) => {
          let leftClickHeld = event.buttons === 1;
          if (leftClickHeld) {
            const oldX = grid.ctx.offsetX;
            const oldY = grid.ctx.offsetY;
            grid.setOffset(
              oldX + (event.clientX - startPanX) / grid.ctx.cellSize,
              oldY + (event.clientY - startPanY) / grid.ctx.cellSize
            );
            setStartPanX(event.clientX);
            setStartPanY(event.clientY);
          }
        }}
        onMouseDown={(event) => {
          setStartPanX(event.clientX);
          setStartPanY(event.clientY);
          grid.resize(150, 150);
        }}
      />

      <input
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const value = Number(event.target.value);
          grid.setCellSize(value);
        }}
        type="range"
        min={0.1}
        max={50}
        value={grid.ctx.cellSize}
      />

      <button
        onClick={() => {
          grid.randomizeCells();
        }}
      >
        randomize!
      </button>
    </>
  );
};
export default GridCanvas;
