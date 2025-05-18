import DataTable from "@/components/custom-table";

interface Data {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

const columns: (keyof Data)[] = ["first_name", "email", "last_name", "role"];
const data: Data[] = [
  {
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    role: "Plumber",
  },
  {
    email: "jane@example.com",
    last_name: "Smith",
    first_name: "Jane",
    role: "Electrician",
  },
];

export default function Page() {
  return (
    <div className="p-6">
      <DataTable
        isError={false}
        isLoading={false}
        formatValue={(key, item) => item[key]}
        columns={columns}
        data={data}
      />
    </div>
  );
}
