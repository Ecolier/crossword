import { Entry } from "#crossword.js";
import { metrics } from "#utils/metrics.js";

export type SheetsGrid = string[][];

export function terminal(entries: Entry[]) {
  const grid: SheetsGrid = [];

  const [xs, ys] = entries.reduce(
    (prev, curr) => [
      [...prev[0], curr.x],
      [...prev[1], curr.y],
    ],
    [[], []] as [xs: number[], ys: number[]]
  );

  const [[minX, _maxX, width], [minY, _maxY, height]] = [
    metrics(xs),
    metrics(ys),
  ];

  const cells = entries.flatMap(({ cells }) => cells.map(([cell]) => cell));

  for (let y = 0; y <= height; ++y) {
    const cellsY = cells.filter((cell) => cell.y === y + minY);
    grid[y] = [];
    for (let x = 0; x <= width; ++x) {
      grid[y].push(cellsY.find((cell) => cell.x === x + minX)?.letter || "");
    }
  }

  return grid;
}
