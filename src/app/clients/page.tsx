"use client";
import DataTable from "@/components/custom-table";
import useGetClient from "@/hooks/use-get-clients";

export default function Page() {
  const { clientDataKeys, clients } = useGetClient();
  return (
    <div className="p-6">
      <DataTable
        isError={false}
        isLoading={false}
        formatValue={(key, item) => item[key]}
        columns={clientDataKeys}
        data={clients}
      />
    </div>
  );
}
