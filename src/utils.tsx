export interface Vec2<T> {
  x: T;
  y: T;
}

export const create2dArray = (
  columns: number,
  rows: number,
  defaultValue: boolean
) => {
  let array = new Array(columns);
  for (let i = 0; i < rows; i++) {
    array[i] = new Array(rows).fill(defaultValue);
  }
  return array;
};
