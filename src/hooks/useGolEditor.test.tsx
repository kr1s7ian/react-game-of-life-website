import { render, renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { createGridCtx, useGrid } from "./useGrid";
import { assert, describe, expect, it } from "vitest";
import { calculateNeighbors, useGol } from "./useGol";
import { defaultCellSize, useGolEditor } from "./useGolEditor";

describe("useGolEditor", () => {
  it("Should reset view to coordinate 0 0 and set zoom to default value", () => {
    const { result } = renderHook(() =>
      useGolEditor(useGol(createGridCtx(10, 10, false)))
    );

    act(() => {
      result.current.setCellSize(44);
      result.current.setOffset({ x: 400, y: 200 });
      result.current.resetView();
    });

    expect(result.current.offset).toEqual({ x: 0, y: 0 });
    expect(result.current.cellSize).toEqual(defaultCellSize);
  });
});
