import { Block } from "@mui/icons-material";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { CanvasToolbar } from "../components/grid_editor/editor_bar";
import GridCanvas from "../components/grid_editor/editor_grid";
import Editor from "../components/grid_editor/editor";
import { createGridContext, useGrid } from "../hooks/useGrid";
import { useEffect } from "react";

export const EditorPage = () => {
  const grid = useGrid(createGridContext(250, 250, false, 1));
  return <Editor grid={grid} />;
};
