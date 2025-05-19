"use client";
import DataTable from "@/components/custom-table";
import ClientsForm from "@/components/forms/clients-form";
import { UpdateButtonInner } from "@/components/reusable/buttons";
import { Badge } from "@/components/ui/badge";
import useGetClient from "@/hooks/use-get-clients";
import { apiRoutes } from "@/lib/constants";
import {
  createClientSchema,
  CreateClientSchemaType,
} from "@/lib/schemas/clients";
import { PostData, UpdateData } from "@/lib/utils/db-utils";
import { cn } from "@/lib/utils/utils";
import { useClientsStore } from "@/store/client-store";
import { Client, METHOD } from "@/types/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const UpdateClientButton = ({ item }: { item: Client }) => {
  const [open, setOpen] = useState(false);
  const { updateClient } = useClientsStore();
  const form = useForm<CreateClientSchemaType>({
    resolver: zodResolver(createClientSchema),
    defaultValues: item,
  });
  const onSubmit = async (data: CreateClientSchemaType) => {
    const res = await UpdateData<Client>({
      url: apiRoutes.clientWithId(item.id),
      body: data,
    });
    if (res) {
      updateClient(res);
    }
    setOpen(false);
  };
  return (
    <UpdateButtonInner
      dialogTitle="Update Client"
      open={open}
      setOpen={setOpen}>
      <ClientsForm form={form} onSubmit={onSubmit} />
    </UpdateButtonInner>
  );
};

export default function Page() {
  const { clientDataKeys, clients } = useGetClient();
  const { addClient } = useClientsStore();
  const form = useForm<CreateClientSchemaType>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      address: "",
      phone_number: 0,
      ongoing_work: true,
    },
  });
  const onSubmit = async (data: CreateClientSchemaType) => {
    const res = await PostData<Client>({ url: apiRoutes.clients, body: data });
    if (res) {
      addClient(res);
    }
  };

  const formatValue = (key: keyof Client, item: Client) => {
    switch (key) {
      case "ongoing_work":
        return (
          <Badge
            className={cn(
              "px-3 py-1 w-auto h-auto",
              item.ongoing_work
                ? "dark:bg-green-300 bg-green-600"
                : "dark:bg-gray-300 bg-gray-600"
            )}>
            {item.ongoing_work ? "Ongoing" : "No"}
          </Badge>
        );
        break;

      default:
        return item[key];
    }
  };

  return (
    <div className="p-6">
      <DataTable
        isError={false}
        isLoading={false}
        formatValue={formatValue}
        columns={clientDataKeys}
        extraOptions={[UpdateClientButton]}
        data={clients}
      />
      <ClientsForm form={form} onSubmit={onSubmit} />
    </div>
  );
}
