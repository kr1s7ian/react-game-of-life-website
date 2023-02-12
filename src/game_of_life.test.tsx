import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { assert, describe, expect, it } from "vitest";
import { calculateNeighbors } from "./game_of_life";
import { createGridContext, useGrid } from "./hooks/useGrid";

describe("game_of_life implementation tests", () => {
  it("test neighbor calculation when grid is all active", () => {
    const gridHook = renderHook(() => useGrid(createGridContext(3, 3, true)));
    const grid = gridHook.result.current;
    const result = calculateNeighbors(grid.ctx.state, 1, 1);

    expect(result).toEqual(8);
  });

  it("test neighbor calculation when grid is partially active", () => {
    const gridHook = renderHook(() => useGrid(createGridContext(3, 3, false)));
    const grid = gridHook.result.current;
    act(() => {
      grid.setCellAt(0, 0, true);
      grid.setCellAt(1, 0, true);
      grid.setCellAt(2, 0, true);
    });
    const result = calculateNeighbors(grid.ctx.state, 1, 1);

    expect(result).toEqual(3);
  });

  it("test neighbor calculation when grid is all inactive", () => {
    const gridHook = renderHook(() => useGrid(createGridContext(3, 3, false)));
    const grid = gridHook.result.current;
    const result = calculateNeighbors(grid.ctx.state, 1, 1);

    expect(result).toEqual(0);
  });
});
