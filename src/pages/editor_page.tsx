import GridCanvas from "../components/grid_editor/editor_grid";
import Editor from "../components/grid_editor/editor";
import useGol from "../hooks/useGol";
import { createGridCtx } from "../hooks/useGrid";

export const EditorPage = () => {
  const gol = useGol(createGridCtx(250, 250, false));
  return <Editor gol={gol} />;
};
