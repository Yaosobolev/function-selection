import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { x1, x2, x3, x4, x5, y1, y2, y3, y4, y5 } from "@/lib/constants";

interface Props {
  id: string;
}

export const TableValuesConditions: React.FC<Props> = ({ id }) => {
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
