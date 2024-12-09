import { Point } from "@/@types/point";
import { solveLinearSystem } from "./solve-linear-system";

export const leastSquaresCubic = (
  points: Point[]
): { a: number; b: number; c: number; d: number } => {
  let sumX = 0;
  let sumX2 = 0;
  let sumX3 = 0;
  let sumX4 = 0;
  let sumX5 = 0;
  let sumX6 = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2Y = 0;
  let sumX3Y = 0;

  for (const point of points) {
    const x = point.x;
    const y = point.y;
    const x2 = x ** 2;
    const x3 = x ** 3;
    const x4 = x ** 4;
    const x5 = x ** 5;
    const x6 = x ** 6;

    sumX += x;
    sumX2 += x2;
    sumX3 += x3;
    sumX4 += x4;
    sumX5 += x5;
    sumX6 += x6;

    sumY += y;
    sumXY += x * y;
    sumX2Y += x2 * y;
    sumX3Y += x3 * y;
  }

  const n = points.length;

  // Матрица коэффициентов
  const matrix = [
    [n, sumX, sumX2, sumX3],
    [sumX, sumX2, sumX3, sumX4],
    [sumX2, sumX3, sumX4, sumX5],
    [sumX3, sumX4, sumX5, sumX6],
  ];

  // Вектор правой части
  const rhs = [sumY, sumXY, sumX2Y, sumX3Y];

  // Решаем систему уравнений
  const [d, c, b, a] = solveLinearSystem(matrix, rhs);

  return { a, b, c, d };
};
