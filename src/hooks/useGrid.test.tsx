import { render, renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { createGridCtx, useGrid } from "./useGrid";
import { assert, describe, expect, it } from "vitest";
import { Vec2 } from "../utils";

describe("useGrid", () => {
  it("The grid should have 3 rows and 3 columns", () => {
    const { result } = renderHook(() => useGrid(createGridCtx(3, 3, false)));
    expect(result.current.ctx.state.length).toEqual(3);
    expect(result.current.ctx.state[0].length).toEqual(3);
  });

  it("should return the cell at index 1 1 which should be true)", () => {
    const { result } = renderHook(() => useGrid(createGridCtx(3, 3, false)));
    result.current.setCell(1, 1, true);

    expect(result.current.getCell(1, 1)).toEqual(true);
  });

  it("Should set the cell at index 1 1 (center) to true", () => {
    const { result } = renderHook(() => useGrid(createGridCtx(3, 3, false)));
    act(() => {
      result.current.setCell(1, 1, true);
    });

    const expected_state = [
      [false, false, false],
      [false, true, false],
      [false, false, false],
    ];

    expect(result.current.ctx.state).toEqual(expected_state);
  });

  it("The grid's cells should be all set to true", () => {
    const { result } = renderHook(() => useGrid(createGridCtx(3, 3, false)));
    result.current.fill(true);

    const expected_state = [
      [true, true, true],
      [true, true, true],
      [true, true, true],
    ];
    expect(result.current.ctx.state).toEqual(expected_state);
  });

  it("the grid state should be set to all active cells", () => {
    const { result } = renderHook(() => useGrid(createGridCtx(3, 3, false)));
    const newState = [
      [true, true, true],
      [true, true, true],
      [true, true, true],
    ];
    act(() => {
      result.current.setState(newState);
    });

    expect(result.current.ctx.state).toEqual(newState);
  });

  it("Should make negative values zero", () => {
    const { result } = renderHook(() => useGrid(createGridCtx(10, 10)));
    let resultMouseX;
    let resultMouseY;
    const canvas = new HTMLCanvasElement();
    canvas.width = 100;
    canvas.height = 100;

    act(() => {
      const pos = result.current.windowSpaceToGridSpace(-50, -100, canvas, 1, {
        x: 3,
        y: 4,
      });
      resultMouseX = pos.x;
      resultMouseY = pos.y;
    });

    expect(resultMouseX).toEqual(0);
    expect(resultMouseY).toEqual(0);
  });

  it("Should restrict max positive values to the grid's dimensions", () => {
    const { result } = renderHook(() => useGrid(createGridCtx(10, 10)));
    const { rows, columns } = result.current.ctx;
    const canvas = new HTMLCanvasElement();
    canvas.width = 100;
    canvas.height = 100;
    const cellSize = 1;
    let pos: Vec2<number> = { x: 0, y: 0 };
    const offset: Vec2<number> = { x: 0, y: 0 };

    act(() => {
      // obviously overflowing positions for grid
      pos = result.current.windowSpaceToGridSpace(
        rows * cellSize + 100,
        columns * cellSize + 100,
        canvas,
        cellSize,
        offset
      );
    });

    expect(pos.x).toEqual(rows - 1);
    expect(pos.y).toEqual(columns - 1);
  });
});
