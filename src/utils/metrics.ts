export function metrics(
  values: number[]
): [min: number, max: number, range: number] {
  const sorted = values.sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted.at(-1) ?? 0;
  return [min, max, max - min];
}
