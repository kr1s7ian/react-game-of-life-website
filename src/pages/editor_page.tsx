import GridCanvas from "../components/grid_canvas";
import { createGridContext, useGrid } from "../hooks/useGrid";

export const EditorPage = () => {
  const grid = useGrid(createGridContext(150, 150, false, 1));
  return (
    <div className="editor">
      <button onClick={grid.randomizeCells}>randomize cells</button>
      <input
        type="range"
        value={grid.ctx.cellSize}
        max={500}
        min={1}
        onChange={(event) => grid.setCellSize(Number(event.target.value))}
      />
      <GridCanvas grid={grid} />
    </div>
  );
};
