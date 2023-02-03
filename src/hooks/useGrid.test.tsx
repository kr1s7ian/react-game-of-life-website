import { render, renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useGrid } from "./useGrid";

describe("useGrid", () => {
  let hookResult;
  it("The grid should have 3 rows and 3 columns", () => {
    const { result } = renderHook(() => useGrid());
    expect(result.current.ctx.state.length).toEqual(3);
    expect(result.current.ctx.state[0].length).toEqual(3);
  });

  it("should return the cell at 1 1 (true)", () => {
    const { result } = renderHook(() => useGrid());
    result.current.setCellAt(1, 1, true);

    expect(result.current.getCellAt(1, 1)).toEqual(true);
  });

  it("The cell at position 2 2 (center) should be true", () => {
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

  it("All the grid's cells should be set to true", () => {
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
});
