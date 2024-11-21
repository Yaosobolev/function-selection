export const solveLinearSystem = (
  matrix: number[][],
  rhs: number[]
): number[] => {
  const size = matrix.length;

  for (let i = 0; i < size; i++) {
    // Приведение к диагональному виду
    for (let j = i + 1; j < size; j++) {
      const factor = matrix[j][i] / matrix[i][i];
      for (let k = i; k < size; k++) {
        matrix[j][k] -= factor * matrix[i][k];
      }
      rhs[j] -= factor * rhs[i];
    }
  }

  // Обратный ход метода Гаусса
  const result = new Array(size).fill(0);
  for (let i = size - 1; i >= 0; i--) {
    result[i] = rhs[i];
    for (let j = i + 1; j < size; j++) {
      result[i] -= matrix[i][j] * result[j];
    }
    result[i] /= matrix[i][i];
  }

  return result;
};
