import { useState } from "react";
import { Vec2 } from "../utils";
import { UseGolReturnType } from "./useGol";

export type UseGolEditorReturnType = ReturnType<typeof useGolEditor>;
export const defaultCellSize = 10;

export const useGolEditor = (golParam: UseGolReturnType) => {
  const gol = golParam;
  const [startPanning, setStartPanning] = useState<Vec2<number>>({
    x: 0,
    y: 0,
  });

  const [offset, setOffset] = useState<Vec2<number>>({
    x: 0,
    y: 0,
  });

  const [cellSize, setCellSize] = useState<number>(defaultCellSize);

  const resetView = () => {
    setCellSize(defaultCellSize);
    setOffset({ x: 0, y: 0 });
  };
  const [lastGridJson, setLastGridJson] = useState<string>(gol.grid.toJson());

  const save = () => {
    setLastGridJson(gol.grid.toJson());
  };

  const getSave = () => {
    return lastGridJson;
  };

  const load = (gridJson: string) => {
    const loadedState: boolean[][] = JSON.parse(gridJson);
    gol.grid.setState(loadedState);
    save();
  };

  return {
    gol,
    startPanning,
    setStartPanning,
    offset,
    setOffset,
    cellSize,
    setCellSize,
    resetView,
    save,
    getSave,
    load,
  };
};
