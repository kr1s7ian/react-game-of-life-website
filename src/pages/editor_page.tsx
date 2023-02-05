import GridCanvas from "../components/grid_canvas";
import { createGridContext, useGrid } from "../hooks/useGrid";

export const EditorPage = () => {
  const grid = useGrid(createGridContext(250, 250, false, 1));
  return (
    <div className="editor">
      <button onClick={grid.randomizeCells}>randomize cells</button>
      <button onClick={() => grid.fillCells(false)}>clear cells</button>
      <GridCanvas grid={grid} />
    </div>
  );
};
