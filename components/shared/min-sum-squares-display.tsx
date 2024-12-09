import { LeastSquaresChart } from "./least-squares-chart";

interface Props {
  functionView: {
    value: React.ReactNode;
    text: string;
    coefficients: { a: number; b: number; c?: number; d?: number };
  };
  originalData: { x: number; y: number }[]; // Исходные точки
}

export const MinSumSquaresDisplay: React.FC<Props> = ({
  functionView,
  originalData,
}) => {
  const generateData = () => {
    const data = [];

    for (
      let x = originalData[0].x;
      x < originalData[originalData.length - 1].x;
      x += 0.01
    ) {
      // const x = originalData[0].x;
      let y;

      if (functionView.text === "Квадратичная") {
        y =
          functionView.coefficients.a * x ** 2 +
          functionView.coefficients.b * x +
          functionView.coefficients.c!;
      } else if (functionView.text === "Степенная") {
        y = functionView.coefficients.a * x ** functionView.coefficients.b;
      } else if (functionView.text === "Гиперболическая") {
        y = functionView.coefficients.a / x + functionView.coefficients.b;
      } else if (functionView.text === "Кубическая парабола") {
        y =
          functionView.coefficients.a * x ** 3 +
          functionView.coefficients.b * x ** 2 +
          functionView.coefficients.c! * x +
          functionView.coefficients.d!;
      } else {
        y = functionView.coefficients.a * x + functionView.coefficients.b;
      }

      data.push({ x, y });
    }
    return data;
  };
  const approximatedData = generateData();

  return (
    <>
      <h2 className="text-xl mt-7 text-nowrap">Итоговая функция</h2>
      <p className="text-nowrap">
        {" "}
        Наиболее подходящие по внешнему виду приближающия функция:{" "}
        {functionView.value}
      </p>

      <LeastSquaresChart
        originalData={originalData}
        approximatedData={approximatedData}
      />
    </>
  );
};
