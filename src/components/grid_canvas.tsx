import React, { useRef, useEffect, useState } from "react";
import { createGridContext, GridContext, useGrid } from "../hooks/useGrid";

type UseGridReturnType = ReturnType<typeof useGrid>;
interface Props {
  grid: UseGridReturnType;
}

export const GridCanvas = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grid = props.grid;
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
    <canvas
      width={window.innerWidth}
      height={window.innerHeight}
      ref={canvasRef}
      onMouseMove={(event) => {
        let middleClickHeld = event.buttons === 4;
        if (middleClickHeld) {
          const oldX = grid.ctx.offsetX;
          const oldY = grid.ctx.offsetY;
          grid.setOffset(
            oldX + (event.clientX - startPanX) / grid.ctx.cellSize,
            oldY + (event.clientY - startPanY) / grid.ctx.cellSize
          );
          setStartPanX(event.clientX);
          setStartPanY(event.clientY);
        }
        let leftClickHeld = event.buttons === 1;
        if (leftClickHeld) {
          const canvas = canvasRef.current;
          if (!canvas) {
            return;
          }

          const mx = event.clientX - canvas.offsetLeft;
          const my = event.clientY - canvas.offsetTop;
          const [x, y] = grid.canvasSpaceToGridSpace(mx, my);

          grid.setCellAt(x, y, true);
        }
      }}
      onMouseDown={(event) => {
        setStartPanX(event.clientX);
        setStartPanY(event.clientY);
      }}
    />
  );
};
export default GridCanvas;
