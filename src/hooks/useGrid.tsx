import { useState } from "react";
import { visitLexicalEnvironment } from "typescript";
import { preview } from "vite";
//import GridCanvas from "../components/grid_editor/editor_grid";
import { create2dArray, Vec2 } from "../utils";

export type UseGridReturnType = ReturnType<typeof useGrid>;

export interface GridCtx {
  rows: number;
  columns: number;
  defaultValue: boolean;
  state: boolean[][];
}

export const DefaultGridCtx: GridCtx = {
  rows: 3,
  columns: 3,
  defaultValue: false,
  state: create2dArray(3, 3, false),
};
const compressState = (state: boolean[][], rows: number, columns: number) => {
  const compressed: Vec2<number>[] = [];

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      const cell = state[x][y];
      if (cell === true) {
        compressed.push({ x, y });
      }
    }
  }

  return compressed;
};
const decompressState = (
  compressedState: Vec2<number>[],
  rows: number,
  columns: number
) => {
  let state = create2dArray(rows, columns, false);
  compressedState.map((cellPosition: Vec2<number>) => {
    const x = cellPosition.x;
    const y = cellPosition.y;
    state[x][y] = true;
  });

  return state;
};

export const createGridCtx = (
  rows: number = 3,
  columns: number = 3,
  defaultValue: boolean = false
) => {
  return {
    rows,
    columns,
    defaultValue,
    state: create2dArray(rows, columns, defaultValue),
  } as GridCtx;
};

export const useGrid = (default_ctx: GridCtx = DefaultGridCtx) => {
  const [ctx, setCtx] = useState<GridCtx>(default_ctx);

  const setCell = (x: number, y: number, value: boolean) => {
    let newState = [...ctx.state];
    newState[x][y] = value;
    setCtx((prev) => ({
      ...prev,
      state: newState,
    }));
  };

  const getCell = (x: number, y: number) => {
    return ctx.state[x][y];
  };

  const fill = (value: boolean) => {
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

  const randomize = () => {
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

  const setState = (newState: boolean[][]) => {
    setCtx((prev) => ({
      ...prev,
      state: newState,
    }));
  };

  const canvasSpaceToGridSpace = (
    x: number,
    y: number,
    cellSize: number,
    offset: Vec2<number>
  ) => {
    let newX = Math.floor(x / cellSize - offset.x);
    let newY = Math.floor(y / cellSize - offset.y);

    // make negative values zero
    newX = Math.max(0, newX);
    newY = Math.max(0, newY);

    // constrain positive values to the dimensions of the grid
    newX = Math.min(ctx.rows - 1, newX);
    newY = Math.min(ctx.columns - 1, newY);

    return { x: newX, y: newY } as Vec2<number>;
  };

  const windowSpaceToGridSpace = (
    x: number,
    y: number,
    canvas: HTMLCanvasElement,
    cellSize: number,
    offset: Vec2<number>
  ) => {
    // account for page scroll
    let newX = x - canvas.offsetLeft + window.scrollX;
    let newY = y - canvas.offsetTop + window.scrollY;

    //account for canvas width and height
    newX = (newX * canvas.width) / canvas.offsetWidth;
    newY = (newY * canvas.height) / canvas.offsetHeight;

    // translate to grid space
    const newPos = canvasSpaceToGridSpace(newX, newY, cellSize, offset);

    return newPos;
  };

  const toJson = () => {
    const compressedState = compressState(ctx.state, ctx.rows, ctx.columns);
    return JSON.stringify(compressedState);
  };

  const fromJson = (json: string) => {
    const compressedState = JSON.parse(json);
    const state = decompressState(compressedState, ctx.rows, ctx.columns);
    setState(state);
  };

  return {
    ctx,
    getCell,
    setCell,
    fill,
    randomize,
    setState,
    windowSpaceToGridSpace,
    toJson,
    fromJson,
  };
};
