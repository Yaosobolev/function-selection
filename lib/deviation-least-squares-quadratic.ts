export const deviationLeastSquaresQuadratic = (
  x: number[],
  y: number[],
  a: number,
  b: number,
  c: number
) => {
  return x.reduce(
    (acc, item, index) =>
      acc + Math.pow(a * Math.pow(item, 2) + b * item + c - y[index], 2),
    0
  );
};
