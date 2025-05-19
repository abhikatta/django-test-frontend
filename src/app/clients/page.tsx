"use client";
import DataTable from "@/components/custom-table";
import ClientsForm from "@/components/forms/clients-form";
import { UpdateButtonInner } from "@/components/reusable/buttons";
import useGetClient from "@/hooks/use-get-clients";
import { apiRoutes } from "@/lib/constants";
import {
  createClientSchema,
  CreateClientSchemaType,
} from "@/lib/schemas/clients";
import { PostData } from "@/lib/utils/db-utils";
import { useClientsStore } from "@/store/client-store";
import { Client } from "@/types/global";
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
    const res = await PostData<Client>({ url: apiRoutes.clients, body: data });
    if (res) {
      updateClient(res);
    }
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
    },
  });
  const onSubmit = async (data: CreateClientSchemaType) => {
    const res = await PostData<Client>({ url: apiRoutes.clients, body: data });
    if (res) {
      addClient(res);
    }
  };
  return (
    <div className="p-6">
      <DataTable
        isError={false}
        isLoading={false}
        formatValue={(key, item) => item[key]}
        columns={clientDataKeys}
        extraOptions={[UpdateClientButton]}
        data={clients}
      />
      <ClientsForm form={form} onSubmit={onSubmit} />
    </div>
  );
}
