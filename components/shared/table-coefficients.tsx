import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface Props {
  coefficients: {
    a: number;
    b: number;
    c?: number;
    d?: number;
  };
  functionView: React.ReactNode;
  type: string;
}

export const TableCoefficients: React.FC<Props> = ({
  coefficients,
  functionView,
  type,
}) => {
  return (
    <>
      <h2 className="flex items-center text-xl mt-7 text-nowrap">
        Результат вычислений коэффициентов функции: {functionView}
      </h2>
      <Table className="w-[300px]">
        <TableBody>
          <TableRow className="text-nowrap">
            <TableCell>
              {type === "1" ? "k" : type === "2" ? "c" : "a"} = {coefficients.a}
            </TableCell>
            <TableCell>
              {type === "2" ? "m" : "b"} = {coefficients.b}
            </TableCell>
            {coefficients.c && <TableCell>c = {coefficients.c}</TableCell>}
            {coefficients.d && <TableCell>d = {coefficients.d}</TableCell>}
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
