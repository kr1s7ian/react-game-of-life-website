import React, { useRef, useEffect, useState, MouseEvent } from "react";
import { useGrid, UseGridReturnType } from "../../hooks/useGrid";
import disableScroll from "disable-scroll";
import { Vec2 } from "../../utils";
import { UseGolEditorReturnType } from "../../hooks/useGolEditor";
import { cloneDeep } from "lodash";

interface Props {
  golEditor: UseGolEditorReturnType;
}

export const GridEditor = (props: Props) => {
  const grid = props.golEditor.gol.grid;
  const {
    offset,
    setOffset,
    cellSize,
    setCellSize,
    startPanning,
    setStartPanning,
  } = props.golEditor;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;

  useEffect(() => {
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    // fix aspect ratio stretching
    context.canvas.width =
      canvas.height *
      (context.canvas.clientWidth / context.canvas.clientHeight);

    //clearing screen
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    //drawing cells
    context.setTransform(cellSize, 0, 0, cellSize, 0, 0);
    context.fillStyle = "black";

    for (let x = 0; x < grid.ctx.rows; x++) {
      for (let y = 0; y < grid.ctx.columns; y++) {
        if (grid.getCell(x, y) === true) {
          context.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      }
    }
  }, [grid.ctx.state, cellSize, offset]);

  const handlePanning = (
    e: React.MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>
  ) => {
    if (!canvas) {
      return;
    }

    let middleClickHeld = e.buttons === 4;
    if (middleClickHeld) {
      const prevOffset: Vec2<number> = { x: offset.x, y: offset.y };
      setOffset({
        x: prevOffset.x + ((e.clientX - startPanning.x) / cellSize) * 2,
        y: prevOffset.y + ((e.clientY - startPanning.y) / cellSize) * 2,
      });
      setStartPanning({ x: e.clientX, y: e.clientY });
    }
  };

  const handleDrawing = (
    e: React.MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>
  ) => {
    if (!canvas) {
      return;
    }

    const mouseGridPos = grid.windowSpaceToGridSpace(
      e.clientX,
      e.clientY,
      canvas,
      cellSize,
      offset
    );
    if (!mouseGridPos) {
      return;
    }

    const leftClickHeld = e.buttons === 1;
    const rightClickHeld = e.buttons === 2;
    if (leftClickHeld || rightClickHeld) {
      const cellState = leftClickHeld;
      grid.setCell(mouseGridPos.x, mouseGridPos.y, cellState);
    }
  };

  const setupPrePanning = (e: MouseEvent) => {
    setStartPanning({ x: e.clientX, y: e.clientY });
  };

  const handleZooming = (e: React.WheelEvent<HTMLCanvasElement>) => {
    setCellSize(
      Math.max(1, cellSize + Math.max(-20, Math.min(20, e.deltaY)) * -0.03)
    );
  };

  return (
    <canvas
      tabIndex={1}
      width={1920}
      height={1080}
      ref={canvasRef}
      onMouseDown={(e) => {
        setupPrePanning(e);
        handleDrawing(e);
      }}
      onMouseMove={(e) => {
        handlePanning(e);
        handleDrawing(e);
      }}
      onMouseEnter={() => disableScroll.on()}
      onMouseLeave={() => disableScroll.off()}
      onWheel={(e) => handleZooming(e)}
      onContextMenu={(event) => event.preventDefault()}
    />
  );
};
export default GridEditor;
