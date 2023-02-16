import { parseConfigFileTextToJson } from "typescript";
import { UseGolEditorReturnType } from "./hooks/useGolEditor";
import { GridCtx } from "./hooks/useGrid";
import { Vec2 } from "./utils";

interface ProjectCtx {
  title: string;
  description: string;
  offset: Vec2<number>;
  cellSize: number;
  compressedStateJson: string;
}

export const projectCtxToJson = (ctx: ProjectCtx) => {
  return JSON.stringify(ctx);
};

export const ProjectCtxFromJson = (json: string): ProjectCtx => {
  return JSON.parse(json);
};
