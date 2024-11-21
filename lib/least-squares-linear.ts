import { Point } from "@/@types/point";

export const leastSquaresLinear = (
  points: Point[]
): { a: number; b: number } => {
  const n = points.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;

  // Суммирование значений
  for (const point of points) {
    sumX += point.x;
    sumY += point.y;
    sumXY += point.x * point.y;
    sumX2 += point.x ** 2;
  }

  // Вычисление коэффициентов
  const a = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
  const b = (sumY - a * sumX) / n;

  return { a, b };
};
