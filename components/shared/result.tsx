"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  deviationLeastSquaresLinear,
  deviationLeastSquaresPower,
  deviationLeastSquaresQuadratic,
  leastSquaresLinear,
  leastSquaresPower,
  leastSquaresQuadratic,
} from "@/lib";
import { x, xTest, y, yTest } from "@/lib/constants";
import { Button } from "@/components/ui";
import {
  TableCoefficients,
  TableDeviation,
  MinSumSquaresDisplay,
} from "@/components/shared";

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
    x: id === "1" ? x : xTest,
    y: id === "1" ? y : yTest,
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

  const calcMinSumSquares = (
    deviationLinear: number,
    deviationPower: number,
    deviationQuadratic: number
  ): React.ReactNode => {
    if (
      deviationLinear <= deviationPower &&
      deviationLinear <= deviationQuadratic
    ) {
      return "y = kx + b";
    } else if (
      deviationPower <= deviationLinear &&
      deviationPower <= deviationQuadratic
    ) {
      return (
        <span>
          y = cx<sup>m</sup>
        </span>
      );
    } else {
      return (
        <span>
          y = ax<sup>2</sup> + bx + c
        </span>
      );
    }
  };

  return (
    <div className={cn(className)}>
      <Link
        href={`/equation/${id === "1" ? "test" : "1"}`}
        className="text-base mt-4 mr-2"
      >
        <Button className="text-base mt-4" variant={"outline"}>
          {id === "1" ? "Вперед" : "Назад"}
        </Button>
      </Link>
      <Button className="text-base mt-4" onClick={onClickToggleSolution}>
        {isOpenSolution ? "Отменить" : "Вычислить"}
      </Button>

      {isOpenSolution && (
        <>
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
          <MinSumSquaresDisplay
            functionView={calcMinSumSquares(
              resultDeviationLeastSquaresLinear,
              resultDeviationLeastSquaresPower,
              resultDeviationLeastSquaresQuadratic
            )}
          />
        </>
      )}
    </div>
  );
};
