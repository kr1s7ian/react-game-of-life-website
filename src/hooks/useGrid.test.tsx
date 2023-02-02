import { render, renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useGrid } from "./useGrid";

describe("useGrid", () => {
  let hookResult;
  it("The grid should have 2 rows and 3 columns", () => {
    const { result } = renderHook(() => useGrid(2, 3, false));
    expect(result.current.state.length).toEqual(3);
    expect(result.current.state[0].length).toEqual(2);
  });

  it("should return the cell at 1 1 (true)", () => {
    const { result } = renderHook(() => useGrid(3, 2, false));
    result.current.setCellAt(1, 1, true);

    expect(result.current.getCellAt(1, 1)).toEqual(true);
  });

  it("The cell at position 2 2 (center) should be true", () => {
    const { result } = renderHook(() => useGrid(3, 3, false));
    act(() => {
      result.current.setCellAt(1, 1, true);
    });

    const expected_state = [
      [false, false, false],
      [false, true, false],
      [false, false, false],
    ];

    expect(result.current.state).toEqual(expected_state);
  });

  it("all the grid's cells should be set to true", () => {
    const { result } = renderHook(() => useGrid(3, 3, false));
    result.current.fillCells(true);

    const expected_state = [
      [true, true, true],
      [true, true, true],
      [true, true, true],
    ];
    expect(result.current.state).toEqual(expected_state);
  });
});
