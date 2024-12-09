export const deviationLeastSquaresCubic = (
  x: number[],
  y: number[],
  a: number,
  b: number,
  c: number,
  d: number
): number => {
  return x.reduce((acc, item, index) => {
    const predictedY =
      a * Math.pow(item, 3) + b * Math.pow(item, 2) + c * item + d;
    const deviation = Math.pow(predictedY - y[index], 2);
    return acc + deviation;
  }, 0);
};
