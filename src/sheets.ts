import type { Entry } from "./crossword";

export type SheetsGrid = string[][];

export function sheets(entries: Entry[]) {
  const grid: SheetsGrid = [];

  const sortedX = entries.map((entry) => entry.x).sort((a, b) => a - b);
  const sortedY = entries.map((entry) => entry.y).sort((a, b) => a - b);

  const minX = sortedX[0];
  const maxX = sortedX.at(-1) ?? 0;
  const width = maxX - minX;

  const minY = sortedY[0];
  const maxY = sortedY.at(-1) ?? 0;
  const height = maxY - minY;

  const cells = entries.flatMap(({cells}) => cells.map(([cell]) => cell));

  for (let y = 0; y < height; ++y) {
    const cellsY = cells.filter(cell => cell.y === y + minY);
    grid[y] = [];
    for (let x = 0; x < width; ++x) {
      grid[y].push(cellsY.find((cell => cell.x === x + minX))?.letter || '');
    }
  }

  return grid;
}
