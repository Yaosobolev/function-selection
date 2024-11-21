import { Point } from "@/@types/point";

export const leastSquaresPower = (
  points: Point[]
): { a: number; b: number } => {
  let sumLogX = 0;
  let sumLogY = 0;
  let sumLogXLogY = 0;
  let sumLogX2 = 0;

  const n = points.length;

  for (const point of points) {
    const logX = Math.log(point.x);
    const logY = Math.log(point.y);

    sumLogX += logX;
    sumLogY += logY;
    sumLogXLogY += logX * logY;
    sumLogX2 += logX ** 2;
  }

  const b =
    (n * sumLogXLogY - sumLogX * sumLogY) / (n * sumLogX2 - sumLogX ** 2);
  const logA = (sumLogY - b * sumLogX) / n;
  const a = Math.exp(logA);

  return { a, b };
};
