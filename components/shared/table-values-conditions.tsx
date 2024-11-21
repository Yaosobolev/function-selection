import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { x, xTest, y, yTest } from "@/lib/constants";

interface Props {
  id: string;
}

export const TableValuesConditions: React.FC<Props> = ({ id }) => {
  const values = {
    x: id === "1" ? x : xTest,
    y: id === "1" ? y : yTest,
  };
  return (
    <>
      <h2 className="text-xl">Табличные значения функции</h2>
      <Table className="w-[300px]">
        <TableHeader>
          <TableRow>
            <TableHead>x</TableHead>
            {values.x.map((item) => (
              <TableHead className="text-center" key={item}>
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>y</TableCell>
            {values.y.map((item) => (
              <TableHead className="text-center" key={item}>
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
