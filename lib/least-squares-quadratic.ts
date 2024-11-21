import { Point } from "@/@types/point";
import { solveLinearSystem } from "./solve-linear-system";

export const leastSquaresQuadratic = (
  points: Point[]
): { a: number; b: number; c: number } => {
  let sumX = 0;
  let sumX2 = 0;
  let sumX3 = 0;
  let sumX4 = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2Y = 0;

  for (const point of points) {
    const x = point.x;
    const y = point.y;
    const x2 = x ** 2;
    const x3 = x ** 3;
    const x4 = x ** 4;

    sumX += x;
    sumX2 += x2;
    sumX3 += x3;
    sumX4 += x4;
    sumY += y;
    sumXY += x * y;
    sumX2Y += x2 * y;
  }

  const n = points.length;

  // Матрица коэффициентов
  const matrix = [
    [n, sumX, sumX2],
    [sumX, sumX2, sumX3],
    [sumX2, sumX3, sumX4],
  ];

  // Вектор правой части
  const rhs = [sumY, sumXY, sumX2Y];

  // Решаем систему уравнений
  const [c, b, a] = solveLinearSystem(matrix, rhs);

  return { a, b, c };
};
