import { GroupAdd } from "@mui/icons-material";
import { UseGridReturnType } from "./components/grid_editor/editor_grid";
import { cloneDeep } from "lodash";

export const calculateNeighbors = (
  state: boolean[][],
  x: number,
  y: number
) => {
  let neighbors = 0;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let newX = x - 1 + i;
      let newY = y - 1 + j;
      const cell = state[newX][newY];
      cell && neighbors++;
    }
  }

  // we only want the neighbors so we subtract the cell at x and y
  return neighbors - Number(state[x][y]);
};

export const CalculateNextGen = (
  state: boolean[][],
  rows: number,
  columns: number
) => {
  let nextState = cloneDeep(state);

  for (let i = 1; i < rows - 1; i++) {
    for (let j = 1; j < columns - 1; j++) {
      const neighbors = calculateNeighbors(state, i, j);
      const cell = state[i][j];

      if (!cell && neighbors === 3) {
        nextState[i][j] = true;
      } else if (cell && (neighbors < 2 || neighbors > 3)) {
        nextState[i][j] = false;
      } else {
        nextState[i][j] = cell;
      }
    }
  }

  return nextState;
};
