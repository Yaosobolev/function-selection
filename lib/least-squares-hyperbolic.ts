import { Point } from "@/@types/point";
import { solveLinearSystem } from "./solve-linear-system";

export const leastSquaresHyperbolic = (
  points: Point[]
): { a: number; b: number } => {
  let sumZ = 0; // Сумма 1 / x
  let sumZ2 = 0; // Сумма (1 / x)^2
  let sumY = 0; // Сумма y
  let sumYZ = 0; // Сумма y * (1 / x)

  for (const point of points) {
    const z = 1 / point.x; // Преобразуем x в z
    const y = point.y;

    sumZ += z;
    sumZ2 += z ** 2;
    sumY += y;
    sumYZ += y * z;
  }

  const n = points.length;

  // Матрица коэффициентов
  const matrix = [
    [sumZ2, sumZ],
    [sumZ, n],
  ];

  // Вектор правой части
  const rhs = [sumYZ, sumY];

  // Решаем систему уравнений
  const [a, b] = solveLinearSystem(matrix, rhs);

  return { a, b };
};
