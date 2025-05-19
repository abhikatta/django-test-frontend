"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

import { useCrewStore } from "@/store/crew-store";
import { useRolesStore } from "@/store/roles-store";
import useGetCrew from "@/hooks/use-get-crew";

import { apiRoutes } from "@/lib/constants";
import { DeleteData, UpdateData } from "@/lib/utils/db-utils";
import { createCrewSchema, CreateCrewSchemaType } from "@/lib/schemas/crew";
import { cn } from "@/lib/utils/utils";
import { CreateCrewMember, CrewMember, METHOD } from "@/types/global";

import { CrewForm } from "./forms/crew-form";
import DataTableWrapper from "./custom-table";
import { useClientsStore } from "@/store/client-store";
import { DeleteButtonInner, UpdateButtonInner } from "./reusable/buttons";

const DeleteCrewButton = ({ item }: { item: CrewMember }) => {
  const { removeCrewMember } = useCrewStore();
  const [disabled, setDisabled] = useState(false);

  const deleteCrew = async (id: number) => {
    setDisabled(true);
    const res = await DeleteData<CrewMember>({
      url: apiRoutes.crewWithId(id),
      body: {
        id,
      },
    });
    if (res) {
      removeCrewMember(item.id);
    }
    setDisabled(false);
  };

  const fullName = `${item.first_name} ${item.last_name}`;
  return (
    <DeleteButtonInner
      dialogTitle={`Delete ${fullName}?`}
      dialogDescription={`Are you sure you want to delete your crew member ${fullName}? This action is irreversible!`}>
      <Button
        disabled={disabled}
        variant={"destructive"}
        onClick={() => deleteCrew(item.id)}>
        {disabled && <Loader2 className="animate-spin" />} Delete
      </Button>
    </DeleteButtonInner>
  );
};

const UpdateCrewButton = ({ item }: { item: CrewMember }) => {
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const { updateCrewMember } = useCrewStore();
  const { roles } = useRolesStore();
  const { clients } = useClientsStore();
  const form = useForm<CreateCrewSchemaType>({
    resolver: zodResolver(createCrewSchema),
    defaultValues: {
      ...item,
      client: Number(item.client),
    },
  });

  const updateCrew = async (data: CreateCrewMember) => {
    setDisabled(true);

    const res = await UpdateData<CrewMember>({
      url: apiRoutes.crewWithId(item.id),
      METHOD: METHOD.PUT,
      body: {
        ...data,
      },
    });
    if (res) {
      updateCrewMember({ ...data, id: item.id, client: Number(data.client) });
    }
    setOpen(false);
    setDisabled(false);
  };
  return (
    <UpdateButtonInner
      dialogTitle="Update crew member"
      setOpen={setOpen}
      open={open}>
      <CrewForm
        clients={clients}
        disabled={disabled}
        onSubmit={updateCrew}
        roles={roles}
        form={form}
      />
    </UpdateButtonInner>
  );
};

const CrewTable = () => {
  const { crew, isLoading, isError, crewMemberKeys } = useGetCrew();
  const formatCellValue = (key: keyof CrewMember, item: CrewMember) => {
    switch (key) {
      case "role":
        return String(
          item.role?.charAt(0).toLocaleUpperCase() + item.role?.slice(1)
        );
      case "is_active":
        return item.is_active ? "Active" : "Inactive";
      case "is_tasked":
        return (
          <Badge
            className={cn(
              !item.is_active
                ? "bg-red-500 dark:bg-red-400 "
                : item.is_tasked
                ? "bg-gray-500 dark:bg-gray-400"
                : "bg-green-500 dark:bg-green-400"
            )}>
            {!item.is_active
              ? "Removed"
              : item.is_tasked
              ? "Working"
              : "Available"}
          </Badge>
        );
      default:
        return String(item[key]);
    }
  };

  return (
    <DataTableWrapper
      columns={crewMemberKeys}
      data={crew}
      isError={isError}
      formatValue={formatCellValue}
      extraOptions={[DeleteCrewButton, UpdateCrewButton]}
      isLoading={isLoading}
    />
  );
};

export default CrewTable;
