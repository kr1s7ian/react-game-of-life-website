import { render, renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { createGridContext, useGrid } from "./useGrid";
import { assert, describe, expect, it } from "vitest";

describe("useGrid", () => {
  it("The grid should have 3 rows and 3 columns", () => {
    const { result } = renderHook(() => useGrid());
    expect(result.current.ctx.state.length).toEqual(3);
    expect(result.current.ctx.state[0].length).toEqual(3);
  });

  it("should return the cell at index 1 1 which should be true)", () => {
    const { result } = renderHook(() => useGrid());
    result.current.setCellAt(1, 1, true);

    expect(result.current.getCellAt(1, 1)).toEqual(true);
  });

  it("Should set the cell at index 1 1 (center) to true", () => {
    const { result } = renderHook(() => useGrid());
    act(() => {
      result.current.setCellAt(1, 1, true);
    });

    const expected_state = [
      [false, false, false],
      [false, true, false],
      [false, false, false],
    ];

    expect(result.current.ctx.state).toEqual(expected_state);
  });

  it("The grid's cells should be all set to true", () => {
    const { result } = renderHook(() => useGrid());
    result.current.fillCells(true);

    const expected_state = [
      [true, true, true],
      [true, true, true],
      [true, true, true],
    ];
    expect(result.current.ctx.state).toEqual(expected_state);
  });

  it("Should set cellSize in ctx to 3", () => {
    const { result } = renderHook(() => useGrid());
    act(() => {
      result.current.setCellSize(3);
    });

    expect(result.current.ctx.cellSize).toEqual(3);
  });

  it("Should set offsetX in ctx to 10 and offsetY to 23", () => {
    const { result } = renderHook(() => useGrid());
    act(() => {
      result.current.setOffset(10, 23);
    });
    expect(result.current.ctx.offsetX).toEqual(10);
    expect(result.current.ctx.offsetY).toEqual(23);
  });

  it("Should set rows in ctx to 10 and columns to 15", () => {
    const { result } = renderHook(() => useGrid());

    act(() => {
      result.current.resize(10, 15);
    });

    expect(result.current.ctx.rows).toEqual(10);
    expect(result.current.ctx.columns).toEqual(15);
  });

  it("Should translate canvas mouse position to grid mouse position", () => {
    const { result } = renderHook(() => useGrid(createGridContext(10, 10)));
    let resultMouseX;
    let resultMouseY;

    act(() => {
      const testMx = 4;
      const testMy = 7;
      result.current.setOffset(testMx, testMy);
      const [mx, my] = result.current.canvasSpaceToGridSpace(testMx, testMy);
      resultMouseX = mx;
      resultMouseY = my;
    });

    expect(resultMouseX).toEqual(0);
    expect(resultMouseY).toEqual(0);
  });

  it("Should make negative values zero", () => {
    const { result } = renderHook(() => useGrid(createGridContext(10, 10)));
    let resultMouseX;
    let resultMouseY;

    act(() => {
      result.current.setOffset(3, 4);
      const [mx, my] = result.current.canvasSpaceToGridSpace(-50, -100);
      resultMouseX = mx;
      resultMouseY = my;
    });

    expect(resultMouseX).toEqual(0);
    expect(resultMouseY).toEqual(0);
  });

  it("Should restrict max positive values to the grid's dimensions", () => {
    const { result } = renderHook(() => useGrid(createGridContext(10, 10)));
    const { rows, columns, cellSize } = result.current.ctx;
    let resultMouseX;
    let resultMouseY;

    act(() => {
      // obviously overflowing positions for grid
      const [mx, my] = result.current.canvasSpaceToGridSpace(
        rows * cellSize + 100,
        columns * cellSize + 100
      );
      resultMouseX = mx;
      resultMouseY = my;
    });

    expect(resultMouseX).toEqual(rows - 1);
    expect(resultMouseY).toEqual(columns - 1);
  });

  it("test setState should set all the grid to be active", () => {
    const { result } = renderHook(() =>
      useGrid(createGridContext(3, 3, false))
    );
    const newState: boolean[][] = [
      [true, true, true],
      [true, true, true],
      [true, true, true],
    ];
    act(() => {
      result.current.setState(newState);
    });

    expect(result.current.ctx.state).toEqual(newState);
  });
});
