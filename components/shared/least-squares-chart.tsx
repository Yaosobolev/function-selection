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

export const LeastSquaresChart: React.FC<Props> = ({
  originalData,
  approximatedData,
}) => {
  const chartData = {
    labels: originalData.map((point) => point.x), // Метки по оси X
    datasets: [
      {
        label: "Исходные данные",
        data: originalData.map((point) => point.y),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: false,
        showLine: false, // Убрать линию
      },
      {
        label: "Аппроксимированная функция ",
        data: approximatedData?.map((point) => point.y),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        pointRadius: 0,
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Восстановление функций методом наименьших квадратов",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "X",
        },
      },
      y: {
        title: {
          display: true,
          text: "Y",
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl p-4 bg-white rounded-lg">
      <Line data={chartData} options={options} />
    </div>
  );
};
