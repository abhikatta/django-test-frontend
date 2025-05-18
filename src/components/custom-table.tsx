import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ReactNode } from "react";
import { Skeleton } from "./ui/skeleton";

interface DataTableProps<K> {
  data: K[];
  columns: (keyof K)[];
  formatValue: (key: keyof K, item: K) => ReactNode;
  isError: boolean;
  isLoading: boolean;
  extraOptions?: (({ item }: { item: K }) => ReactNode)[];
}

const DataTable = <K,>({
  columns,
  data,
  formatValue,
  isError,
  isLoading,
  extraOptions,
}: DataTableProps<K>) => {
  return isLoading ? (
    <Skeleton className="h-15 w-full" />
  ) : (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((rowitem, index) => (
            <TableHead key={index}>
              {String(rowitem)
                .split("_")
                .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
                .join(" ")}
            </TableHead>
          ))}
          {extraOptions && extraOptions.length > 0 && (
            <TableHead>Settings</TableHead>
          )}
        </TableRow>
      </TableHeader>
      {isError ? (
        <TableRow>
          <TableCell className="border-none" colSpan={columns.length + 1}>
            <p className="w-full h-20 flex justify-center items-center text-center ">
              Something went wrong! Please check your internet connection.
            </p>
          </TableCell>
        </TableRow>
      ) : (
        <TableBody>
          {data.length > 0 ? (
            data.map((item, itemIndex) => (
              <TableRow key={itemIndex}>
                {columns.map((key, columnIndex) => (
                  <TableCell key={`${itemIndex}-${columnIndex}`}>
                    {formatValue(key, item)}
                  </TableCell>
                ))}
                <TableCell className="flex items-center justify-evenly">
                  {extraOptions &&
                    extraOptions.length > 0 &&
                    extraOptions.map((ExtraOption, index) => (
                      <ExtraOption key={index} item={item} />
                    ))}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="border-none" colSpan={columns.length + 1}>
                <p className="w-full h-20 flex justify-center items-center text-center ">
                  No Data Found.
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  );
};

export default DataTable;
