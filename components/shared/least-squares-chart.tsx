"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Регистрация компонентов Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  originalData: { x: number; y: number }[]; // Исходные точки
  approximatedData?: { x: number; y: number }[]; // Точки аппроксимированной функции
}

// export const LeastSquaresChart: React.FC<Props> = ({
//   originalData,
//   approximatedData,
// }) => {
//   const chartData = {
//     datasets: [
//       {
// label: "Исходные данные",
// data: originalData, // Данные как [{ x, y }, ...]
// borderColor: "rgb(255, 99, 132)",
// backgroundColor: "rgba(255, 99, 132, 0.5)",
// pointRadius: 5,
// pointHoverRadius: 7,
// showLine: false, // Без соединительной линии
//       },
//       {
//         label: "Аппроксимированная функция",
//         data: approximatedData, // Данные как [{ x, y }, ...]
//         borderColor: "rgb(54, 162, 235)",
//         backgroundColor: "rgba(54, 162, 235, 0.5)",
//         borderWidth: 2,
//         pointRadius: 0, // Без точек на линии
//         showLine: true, // Соединительная линия для аппроксимации
//       },
//     ],
//   };

// const options = {
//   responsive: true,
//   plugins: {
//     legend: { position: "top" as const },
//     title: {
//       display: true,
//       text: "График восстановления функций методом наименьших квадратов",
//     },
//   },
//   scales: {
//     x: {
//       type: "linear" as const,
//       title: { display: true, text: "X" },
//     },
//     y: {
//       title: { display: true, text: "Y" },
//     },
//   },
// };

//   return (
//     <div className="w-full max-w-4xl p-4 bg-white rounded-lg">
//       <Line data={chartData} options={options} />
//     </div>
//   );
// };
export const LeastSquaresChart: React.FC<Props> = ({
  originalData,
  approximatedData,
}) => {
  // Разделение аппроксимированных точек на две ветви гиперболы и фильтрация x ≈ 0
  const filteredApproximatedData = approximatedData?.filter(
    (point) => Math.abs(point.x) > 0.1 // Исключаем точки близкие к x = 0
  );

  const negativeBranch =
    filteredApproximatedData?.filter((point) => point.x < 0) || [];
  const positiveBranch =
    filteredApproximatedData?.filter((point) => point.x > 0) || [];

  const chartData = {
    datasets: [
      {
        label: "Исходные данные",
        data: originalData, // Данные как [{ x, y }, ...]
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 5,
        pointHoverRadius: 7,
        showLine: false, // Без соединительной линии
      },
      {
        label: "Аппроксимированная функция (отрицательная ветвь)",
        data: negativeBranch, // Отрицательная ветвь гиперболы
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderWidth: 2,
        pointRadius: 0,
        showLine: true,
      },
      {
        label: "Аппроксимированная функция (положительная ветвь)",
        data: positiveBranch, // Положительная ветвь гиперболы
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderWidth: 2,
        pointRadius: 0,
        showLine: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: "График восстановления гиперболы методом наименьших квадратов",
      },
    },
    scales: {
      x: {
        type: "linear" as const,
        title: { display: true, text: "X" },
      },
      y: {
        type: "linear" as const,
        title: { display: true, text: "Y" },
        // suggestedMin: -1, // Минимальное значение Y
        // suggestedMax: 1, // Максимальное значение Y
      },
    },
  };

  return (
    <div className="w-full max-w-4xl p-4 bg-white rounded-lg">
      <Line data={chartData} options={options} />
    </div>
  );
};
