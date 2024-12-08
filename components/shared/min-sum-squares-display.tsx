import { LeastSquaresChart } from "./least-squares-chart";

interface Props {
  functionView: {
    value: React.ReactNode;
    text: string;
    coefficients: { a: number; b: number; c?: number };
  };
  originalData: { x: number; y: number }[]; // Исходные точки
}

export const MinSumSquaresDisplay: React.FC<Props> = ({
  functionView,
  originalData,
}) => {
  const generateData = () => {
    const data = [];

    for (let i = 0; i < originalData.length; i++) {
      const x = originalData[i].x;
      let y;
      console.log(x);
      console.log(y);

      if (functionView.text === "Квадратичная") {
        y =
          functionView.coefficients.a * x ** 2 +
          functionView.coefficients.b * x +
          functionView.coefficients.c!; // Квадратичная функция
      } else if (functionView.text === "Степенная") {
        y = functionView.coefficients.a * x ** functionView.coefficients.b; // Степенная функция
      } else {
        y = functionView.coefficients.a * x + functionView.coefficients.b;
      }

      data.push({ x, y });
    }
    return data;
  };
  const approximatedData = generateData();

  // ];
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
