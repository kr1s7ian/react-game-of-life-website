import React, { useRef, useEffect, useState } from "react";
import { GridContext } from "../lib/grid_context";
import {
  createTextChangeRange,
  resolveModuleName,
  visitLexicalEnvironment,
} from "typescript";
import { useGrid } from "../hooks/useGrid";

export const GridCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cellSize, setCellSize] = useState<number>(10);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  let [startPanX, setStartPanX] = useState<number>(0);
  let [startPanY, setStartPanY] = useState<number>(0);
  const rows = 100;
  const columns = 100;
  let { state, setCellAt, getCellAt, fillCells, randomizeCells } = useGrid(
    rows,
    columns,
    false
  );
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
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < columns; y++) {
        if (getCellAt(x, y) === true) {
          context.fillRect(
            (x + offsetX) * cellSize,
            (y + offsetY) * cellSize,
            cellSize,
            cellSize
          );
        }
      }
    }
  }, [offsetX, offsetY, cellSize, state]);

  return (
    <>
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        ref={canvasRef}
        onMouseMove={(event) => {
          let leftClickHeld = event.buttons === 1;

          if (leftClickHeld) {
            setOffsetX((prev) => prev + (event.clientX - startPanX) / cellSize);
            setOffsetY((prev) => prev + (event.clientY - startPanY) / cellSize);
            setStartPanX(event.clientX);
            setStartPanY(event.clientY);
          }
        }}
        onMouseDown={(event) => {
          setStartPanX(event.clientX);
          setStartPanY(event.clientY);
        }}
      />

      <input
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const value = Number(event.target.value);
          setCellSize(value);
        }}
        type="range"
        min={0.1}
        max={50}
        value={cellSize}
      />

      <button
        onClick={() => {
          randomizeCells();
        }}
      >
        randomize!
      </button>
    </>
  );
};
