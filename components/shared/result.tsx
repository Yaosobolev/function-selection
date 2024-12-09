"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  deviationLeastSquaresCubic,
  deviationLeastSquaresHyperbolic,
  deviationLeastSquaresLinear,
  deviationLeastSquaresPower,
  deviationLeastSquaresQuadratic,
  leastSquaresCubic,
  leastSquaresHyperbolic,
  leastSquaresLinear,
  leastSquaresPower,
  leastSquaresQuadratic,
} from "@/lib";
import { x1, x2, x3, x4, x5, y1, y2, y3, y4, y5 } from "@/lib/constants";
import { Button } from "@/components/ui";
import {
  TableCoefficients,
  TableDeviation,
  MinSumSquaresDisplay,
  LeastSquaresChart,
} from "@/components/shared";

type DeviationResult = {
  value: React.ReactNode;
  text: string;
  coefficients: { a: number; b: number; c?: number; d?: number };
};

interface Props {
  id: string;
  className?: string;
}

export const Result: React.FC<Props> = ({ className, id }) => {
  const [isOpenSolution, setIsOpenSolution] = useState<boolean>(false);

  const onClickToggleSolution = () => {
    setIsOpenSolution(!isOpenSolution);
  };
  const values = {
    x:
      id === "1"
        ? x1
        : id === "2"
        ? x2
        : id === "3"
        ? x3
        : id === "4"
        ? x4
        : x5,
    y:
      id === "1"
        ? y1
        : id === "2"
        ? y2
        : id === "3"
        ? y3
        : id === "4"
        ? y4
        : y5,
  };

  const points = values.x.map((item, index) => {
    return {
      x: item,
      y: values.y[index],
    };
  });

  const coefficientsLeastSquaresLinear = leastSquaresLinear(points);
  const resultDeviationLeastSquaresLinear = deviationLeastSquaresLinear(
    values.x,
    values.y,
    coefficientsLeastSquaresLinear.a,
    coefficientsLeastSquaresLinear.b
  );

  const coefficientsLeastSquaresPower = leastSquaresPower(points);
  const resultDeviationLeastSquaresPower = deviationLeastSquaresPower(
    values.x,
    values.y,
    coefficientsLeastSquaresPower.a,
    coefficientsLeastSquaresPower.b
  );

  const coefficientsLeastSquaresQuadratic = leastSquaresQuadratic(points);
  const resultDeviationLeastSquaresQuadratic = deviationLeastSquaresQuadratic(
    values.x,
    values.y,
    coefficientsLeastSquaresQuadratic.a,
    coefficientsLeastSquaresQuadratic.b,
    coefficientsLeastSquaresQuadratic.c
  );
  const coefficientsLeastSquaresHyperbolic = leastSquaresHyperbolic(points);
  const resultDeviationLeastSquaresHyperbolic = deviationLeastSquaresHyperbolic(
    values.x,
    values.y,
    coefficientsLeastSquaresHyperbolic.a,
    coefficientsLeastSquaresHyperbolic.b
  );

  const coefficientsLeastSquaresCubic = leastSquaresCubic(points);
  const resultDeviationLeastSquaresCubic = deviationLeastSquaresCubic(
    values.x,
    values.y,
    coefficientsLeastSquaresCubic.a,
    coefficientsLeastSquaresCubic.b,
    coefficientsLeastSquaresCubic.c,
    coefficientsLeastSquaresCubic.d
  );
  const calcMinSumSquares = (
    deviationLinear: number,
    deviationPower: number,
    deviationQuadratic: number,
    deviationHyperbolic: number,
    deviationCubic: number
  ): DeviationResult => {
    const deviations = [
      {
        deviation: deviationLinear,
        value: "y = kx + b",
        text: "Линейная",
        coefficients: {
          a: coefficientsLeastSquaresLinear.a,
          b: coefficientsLeastSquaresLinear.b,
        },
      },
      {
        deviation: deviationPower,
        value: (
          <span>
            y = cx<sup>m</sup>
          </span>
        ),
        text: "Степенная",
        coefficients: {
          a: coefficientsLeastSquaresPower.a,
          b: coefficientsLeastSquaresPower.b,
        },
      },
      {
        deviation: deviationQuadratic,
        value: (
          <span>
            y = ax<sup>2</sup> + bx + c
          </span>
        ),
        text: "Квадратичная",
        coefficients: {
          a: coefficientsLeastSquaresQuadratic.a,
          b: coefficientsLeastSquaresQuadratic.b,
          c: coefficientsLeastSquaresQuadratic.c,
        },
      },
      {
        deviation: deviationHyperbolic,
        value: (
          <span className="flex items-center gap-1">
            {" "}
            y =
            <span className="flex flex-col items-start justify-start text-center ">
              {" "}
              <span className="border-b block">a</span>{" "}
              <span className=" block">b</span>{" "}
            </span>{" "}
          </span>
        ),
        text: "Гиперболическая",
        coefficients: {
          a: coefficientsLeastSquaresHyperbolic.a,
          b: coefficientsLeastSquaresHyperbolic.b,
        },
      },
      {
        deviation: deviationCubic,
        value: (
          <span>
            y = ax<sup>3</sup> + bx<sup>2</sup> + cx + d
          </span>
        ),
        text: "Кубическая парабола",
        coefficients: {
          a: coefficientsLeastSquaresCubic.a,
          b: coefficientsLeastSquaresCubic.b,
          c: coefficientsLeastSquaresCubic.c,
          d: coefficientsLeastSquaresCubic.d,
        },
      },
    ];

    // Находим объект с минимальным отклонением
    const minDeviation = deviations.reduce((min, current) =>
      current.deviation < min.deviation ? current : min
    );

    return {
      value: minDeviation.value,
      text: minDeviation.text,
      coefficients: minDeviation.coefficients,
    };
  };

  return (
    <div className={cn(className)}>
      <Link
        href={`/equation/${
          id === "1"
            ? "2"
            : id === "2"
            ? "3"
            : id === "3"
            ? "4"
            : id === "4"
            ? "5"
            : "1"
        }`}
        className="text-base mt-4 mr-2"
      >
        <Button className="text-base mt-4" variant={"outline"}>
          {id === "1"
            ? "Вперед"
            : id === "2"
            ? "Вперед"
            : id === "3"
            ? "Вперед"
            : id === "4"
            ? "Вперед"
            : "Назад"}
        </Button>
      </Link>
      <Button className="text-base mt-4" onClick={onClickToggleSolution}>
        {isOpenSolution ? "Отменить" : "Вычислить"}
      </Button>

      {isOpenSolution && (
        <>
          <LeastSquaresChart originalData={points} />
          <TableCoefficients
            coefficients={coefficientsLeastSquaresLinear}
            functionView={"y = kx + b"}
            type={"1"}
          />

          <TableDeviation
            functionView={"y = kx + b"}
            valueDeviation={resultDeviationLeastSquaresLinear}
          />
          <TableCoefficients
            coefficients={coefficientsLeastSquaresPower}
            functionView={
              <span>
                y = cx<sup>m</sup>
              </span>
            }
            type={"2"}
          />
          <TableDeviation
            functionView={
              <span>
                y = cx<sup>m</sup>
              </span>
            }
            valueDeviation={resultDeviationLeastSquaresPower}
          />
          <TableCoefficients
            coefficients={coefficientsLeastSquaresQuadratic}
            functionView={
              <span>
                y = ax<sup>2</sup> + bx + c
              </span>
            }
            type={"3"}
          />
          <TableDeviation
            functionView={
              <span>
                y = ax<sup>2</sup> + bx + c
              </span>
            }
            valueDeviation={resultDeviationLeastSquaresQuadratic}
          />
          <TableCoefficients
            coefficients={coefficientsLeastSquaresHyperbolic}
            functionView={
              <span className="flex items-center gap-1">
                {" "}
                y =
                <span className="flex flex-col items-start justify-start text-center ">
                  {" "}
                  <span className="border-b block">a</span>{" "}
                  <span className=" block">b</span>{" "}
                </span>{" "}
              </span>
            }
            type={"3"}
          />
          <TableDeviation
            functionView={
              <span className="flex items-center gap-1">
                {" "}
                y =
                <span className="flex flex-col items-start justify-start text-center ">
                  {" "}
                  <span className="border-b block">a</span>{" "}
                  <span className=" block">b</span>{" "}
                </span>{" "}
              </span>
            }
            valueDeviation={resultDeviationLeastSquaresHyperbolic}
          />
          <TableCoefficients
            coefficients={coefficientsLeastSquaresCubic}
            functionView={
              <span>
                y = ax<sup>3</sup> + bx<sup>2</sup> + cx + d
              </span>
            }
            type={"4"}
          />
          <TableDeviation
            functionView={
              <span>
                y = ax<sup>3</sup> + bx<sup>2</sup> + cx + d
              </span>
            }
            valueDeviation={resultDeviationLeastSquaresCubic}
          />
          <MinSumSquaresDisplay
            originalData={points}
            functionView={calcMinSumSquares(
              resultDeviationLeastSquaresLinear,
              resultDeviationLeastSquaresPower,
              resultDeviationLeastSquaresQuadratic,
              resultDeviationLeastSquaresHyperbolic,
              resultDeviationLeastSquaresCubic
            )}
          />
        </>
      )}
    </div>
  );
};
