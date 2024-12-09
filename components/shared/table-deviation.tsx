import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface Props {
  valueDeviation: number;
  functionView: React.ReactNode;
}

export const TableDeviation: React.FC<Props> = ({
  valueDeviation,
  functionView,
}) => {
  return (
    <>
      <h2 className="flex items-center text-xl mt-7 text-nowrap">
        Сумма квадратов отклонений функции: {functionView}
      </h2>
      <Table className="w-[300px]">
        <TableBody>
          <TableRow className="text-nowrap">
            <TableCell className="text-nowrap">
              {" "}
              <p className="inline">&sigma;</p> = {valueDeviation}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
