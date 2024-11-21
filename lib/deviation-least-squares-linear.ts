export const deviationLeastSquaresLinear = (
  x: number[],
  y: number[],
  k: number,
  b: number
) => {
  return x.reduce(
    (acc, item, index) => acc + Math.pow(k * item + b - y[index], 2),
    0
  );
};
