import { convertRoutesToDataRoutes } from "@remix-run/router/dist/utils";
import { ClientRequest } from "http";
import React, { useRef, useEffect, useState, MouseEvent } from "react";
import { createTextChangeRange } from "typescript";
import { createGridContext, GridContext, useGrid } from "../hooks/useGrid";
interface Vec2 {
  x: number;
  y: number;
}

type UseGridReturnType = ReturnType<typeof useGrid>;
interface Props {
  grid: UseGridReturnType;
}

export const GridCanvas = (props: Props) => {
  const grid = props.grid;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const [startPanning, setStartPanning] = useState<Vec2>({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    //clearing screen
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    //drawing grid's elements
    context.setTransform(grid.ctx.cellSize, 0, 0, grid.ctx.cellSize, 0, 0);
    context.fillStyle = "black";
    for (let x = 0; x < grid.ctx.rows; x++) {
      for (let y = 0; y < grid.ctx.columns; y++) {
        if (grid.getCellAt(x, y) === true) {
          context.fillRect(x + grid.ctx.offsetX, y + grid.ctx.offsetY, 1, 1);
        }
      }
    }
  }, [grid.ctx]);

  const handlePanning = (
    e: React.MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>
  ) => {
    if (!canvas) {
      return;
    }

    let middleClickHeld = e.buttons === 4;
    if (middleClickHeld) {
      const prevOffset = { x: grid.ctx.offsetX, y: grid.ctx.offsetY } as Vec2;
      grid.setOffset(
        prevOffset.x + (e.clientX - startPanning.x) / grid.ctx.cellSize,
        prevOffset.y + (e.clientY - startPanning.y) / grid.ctx.cellSize
      );
      setStartPanning({ x: e.clientX, y: e.clientY });
    }
  };

  const handleDrawing = (
    e: React.MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>
  ) => {
    if (!canvas) {
      return;
    }
    const leftClickHeld = e.buttons === 1;
    const rightClickHeld = e.buttons === 2;
    if (leftClickHeld || rightClickHeld) {
      const [x, y] = grid.windowSpaceToGridSpace(e.clientX, e.clientY, canvas);
      leftClickHeld ? grid.setCellAt(x, y, true) : grid.setCellAt(x, y, false);
    }
  };

  const setupPrePanning = (e: MouseEvent) => {
    setStartPanning({ x: e.clientX, y: e.clientY });
  };

  const handleZooming = (e: React.WheelEvent<HTMLCanvasElement>) => {
    grid.setCellSize(
      Math.max(
        1,
        grid.ctx.cellSize + Math.max(-20, Math.min(20, e.deltaY)) * 0.02
      )
    );
  };

  return (
    <canvas
      tabIndex={1}
      width={window.innerWidth * 2}
      height={window.innerHeight * 2}
      ref={canvasRef}
      onMouseDown={(e) => setupPrePanning(e)}
      onMouseMove={(e) => {
        handlePanning(e);
        handleDrawing(e);
      }}
      onWheel={(e) => handleZooming(e)}
      onContextMenu={(event) => event.preventDefault()}
    />
  );
};
export default GridCanvas;
