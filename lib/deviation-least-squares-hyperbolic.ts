export const deviationLeastSquaresHyperbolic = (
  x: number[],
  y: number[],
  a: number,
  b: number
): number => {
  return x.reduce((acc, item, index) => {
    const predictedY = a / item + b; // Гиперболическая функция y = a / x + b
    const deviation = Math.pow(predictedY - y[index], 2); // Квадрат отклонения
    return acc + deviation;
  }, 0);
};
