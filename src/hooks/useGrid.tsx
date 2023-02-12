import { useState } from "react";
import { visitLexicalEnvironment } from "typescript";
import { preview } from "vite";
import GridCanvas from "../components/grid_editor/editor_grid";
import { CalculateNextGen } from "../game_of_life";

export interface GridContext {
  rows: number;
  columns: number;
  defaultValue: boolean;
  state: boolean[][];
  cellSize: number;
  offsetX: number;
  offsetY: number;
}

const create_2d_array = (
  columns: number,
  rows: number,
  defaultValue: boolean
) => {
  let array = new Array(columns);
  for (let i = 0; i < rows; i++) {
    array[i] = new Array(rows).fill(defaultValue);
  }
  return array;
};

export const DefaultGridContext: GridContext = {
  rows: 3,
  columns: 3,
  defaultValue: false,
  state: create_2d_array(3, 3, false),
  cellSize: 10,
  offsetX: 0,
  offsetY: 0,
};
export const createGridContext = (
  rows: number = 3,
  columns: number = 3,
  defaultValue: boolean = false,
  cellSize: number = 10,
  offsetX: number = 0,
  offsetY: number = 0
) => {
  return {
    rows,
    columns,
    defaultValue,
    cellSize,
    offsetX,
    offsetY,
    state: create_2d_array(rows, columns, defaultValue),
  } as GridContext;
};

export const useGrid = (default_ctx: GridContext = DefaultGridContext) => {
  const [ctx, setCtx] = useState<GridContext>(default_ctx);

  const setCellAt = (x: number, y: number, value: boolean) => {
    let newState = [...ctx.state];
    newState[x][y] = value;
    setCtx((prev) => ({
      ...prev,
      state: newState,
    }));
  };

  const getCellAt = (x: number, y: number) => {
    return ctx.state[x][y];
  };

  const fillCells = (value: boolean) => {
    let newState = [...ctx.state];
    for (let x = 0; x < ctx.rows; x++) {
      for (let y = 0; y < ctx.columns; y++) {
        newState[x][y] = value;
      }
    }

    setCtx((prev) => ({
      ...prev,
      state: newState,
    }));
  };

  const randomizeCells = () => {
    let newState = [...ctx.state];
    for (let x = 0; x < ctx.rows; x++) {
      for (let y = 0; y < ctx.columns; y++) {
        const rand = Math.random() < 0.5;
        newState[x][y] = rand;
      }
    }

    setCtx((prev) => ({
      ...prev,
      state: newState,
    }));
  };

  const setCellSize = (newCellSize: number) => {
    setCtx((prev) => ({
      ...prev,
      cellSize: newCellSize,
    }));
  };

  const setOffset = (newOffsetX: number, newOffsetY: number) => {
    setCtx((prev) => ({
      ...prev,
      offsetX: newOffsetX,
      offsetY: newOffsetY,
    }));
  };

  const resize = (new_rows: number, new_columns: number) => {
    const newTotal = new_rows + new_columns;
    const oldTotal = ctx.rows + ctx.columns;
    // if we are making the grid bigger we have to re populate the grid
    if (newTotal > oldTotal) {
      setCtx({
        ...ctx,
        rows: new_rows,
        columns: new_columns,
        state: create_2d_array(new_rows, new_columns, false),
      });
    } else {
      setCtx({ ...ctx, rows: new_rows, columns: new_columns });
    }
  };

  const canvasSpaceToGridSpace = (x: number, y: number) => {
    let newX = Math.floor(x / ctx.cellSize - ctx.offsetX);
    let newY = Math.floor(y / ctx.cellSize - ctx.offsetY);

    // make negative values zero
    newX = Math.max(0, newX);
    newY = Math.max(0, newY);

    // constrain positive values to the dimensions of the grid
    newX = Math.min(ctx.rows - 1, newX);
    newY = Math.min(ctx.columns - 1, newY);

    return [newX, newY];
  };

  const windowSpaceToGridSpace = (
    x: number,
    y: number,
    canvas: HTMLCanvasElement
  ) => {
    // account for page scroll
    let newX = x - canvas.offsetLeft + window.scrollX;
    let newY = y - canvas.offsetTop + window.scrollY;

    //account for canvas width and height
    newX = (newX * canvas.width) / canvas.offsetWidth;
    newY = (newY * canvas.height) / canvas.offsetHeight;

    // translate to grid space
    [newX, newY] = canvasSpaceToGridSpace(newX, newY);

    return [newX, newY];
  };

  const setState = (newState: boolean[][]) => {
    setCtx((prev) => ({
      ...prev,
      state: newState,
    }));
  };

  const advanceGeneration = () => {
    let nextGen = CalculateNextGen(ctx.state, ctx.rows, ctx.columns);
    setState(nextGen);
  };

  return {
    ctx,
    getCellAt,
    setCellAt,
    fillCells,
    randomizeCells,
    setCellSize,
    setOffset,
    resize,
    canvasSpaceToGridSpace,
    windowSpaceToGridSpace,
    setState,
    advanceGeneration,
  };
};
