// Example usage

import DataTable from "@/components/table";

const columns = ["first_name", "email", "last_name", "role"];
const data = [
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
      <DataTable columns={columns} data={data} />
    </div>
  );
}
