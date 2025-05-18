// components/DataTable.tsx
import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface DataTableProps {
  columns: string[];
  data: Record<string, unknown>[];
}

const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((key) => (
            <TableHead key={key}>{key.replace("_", " ")}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, idx) => (
          <TableRow key={idx}>
            {columns.map((key) => (
              <TableCell key={key}>{row[key] as string}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
