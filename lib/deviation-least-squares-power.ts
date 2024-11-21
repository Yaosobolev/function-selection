export const deviationLeastSquaresPower = (
  x: number[],
  y: number[],
  k: number,
  b: number
) => {
  return x.reduce(
    (acc, item, index) =>
      acc + Math.pow(b * Math.log(item) + Math.log(k) - Math.log(y[index]), 2),
    0
  );
};
