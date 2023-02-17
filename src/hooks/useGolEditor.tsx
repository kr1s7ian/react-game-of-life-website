import { SettingsInputAntennaTwoTone } from "@mui/icons-material";
import { useState } from "react";
import { ProjectCtxFromJson, projectCtxToJson } from "../project";
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
  const [lastGridJson, setLastGridJson] = useState<string>(gol.grid.toJson());
  const [projectTitle, setProjectTitle] = useState<string>("");

  const resetView = () => {
    setCellSize(defaultCellSize);
    setOffset({ x: 0, y: 0 });
  };

  const save = (title: string, description: string) => {
    const projectCtx = {
      title,
      description,
      offset,
      cellSize,
      compressedStateJson: gol.grid.toJson(),
    };
    const json = projectCtxToJson(projectCtx);
    setLastGridJson(json);
  };

  const getSave = () => {
    return lastGridJson;
  };

  const load = (json: string) => {
    const projectCtx = ProjectCtxFromJson(json);
    setCellSize(projectCtx.cellSize);
    setOffset(projectCtx.offset);
    setProjectTitle(projectCtx.title);
    gol.grid.fromJson(projectCtx.compressedStateJson);
  };

  return {
    gol,
    startPanning,
    setStartPanning,
    offset,
    setOffset,
    cellSize,
    setCellSize,
    projectTitle,
    setProjectTitle,
    resetView,
    save,
    getSave,
    load,
  };
};
