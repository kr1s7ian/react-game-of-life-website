import { useState } from "react";

export const useGrid = (
  rows: number,
  columns: number,
  defaultValue: boolean
) => {
  let initialState = new Array(columns);
  for (let i = 0; i < rows; i++) {
    initialState[i] = new Array(rows).fill(defaultValue);
  }
  const [state, setState] = useState<boolean[][]>(initialState);

  const setCellAt = (x: number, y: number, value: boolean) => {
    let newState = [...state];
    newState[x][y] = value;
    setState(newState);
  };

  const getCellAt = (x: number, y: number) => {
    return state[x][y];
  };

  const fillCells = (value: boolean) => {
    let newState = [...state];
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < columns; y++) {
        newState[x][y] = value;
      }
    }

    setState(newState);
  };

  const randomizeCells = () => {
    let newState = [...state];
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < columns; y++) {
        const rand = Math.random() < 0.5;
        newState[x][y] = rand;
      }
    }

    setState(newState);
  };

  return { state, getCellAt, setCellAt, fillCells, randomizeCells };
};
