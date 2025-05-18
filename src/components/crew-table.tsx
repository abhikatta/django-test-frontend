"use client";
import { useState } from "react";
import { Edit3, Loader2, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import { Badge } from "./ui/badge";

import { useCrewStore } from "@/store/crew-store";
import { useRolesStore } from "@/store/roles-store";
import useGetCrew from "@/hooks/use-get-crew";

import { apiRoutes } from "@/lib/constants";
import { DeleteData, UpdateData } from "@/lib/utils/db-utils";
import { createCrewSchema, CreateCrewSchemaType } from "@/lib/schemas/crew";
import { cn } from "@/lib/utils/utils";
import { CreateCrewMember, CrewMember, METHOD } from "@/types/global";

import { CrewForm } from "./create-crew";
import DataTableWrapper from "./custom-table";

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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size={"icon"}>
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete {fullName}?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your crew member {fullName}? This
            action is irreversible!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={disabled}>Cancel</Button>
          </DialogClose>
          <Button
            disabled={disabled}
            variant={"destructive"}
            onClick={() => deleteCrew(item.id)}>
            {disabled && <Loader2 className="animate-spin" />} Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const UpdateCrewButton = ({ item }: { item: CrewMember }) => {
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const { updateCrewMember } = useCrewStore();
  const { roles } = useRolesStore();
  const form = useForm<CreateCrewSchemaType>({
    resolver: zodResolver(createCrewSchema),
    defaultValues: {
      ...item,
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
      updateCrewMember({ ...data, id: item.id });
    }
    setOpen(false);
    setDisabled(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <Edit3 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update crew member</DialogTitle>
        </DialogHeader>
        <CrewForm
          disabled={disabled}
          onSubmit={updateCrew}
          roles={roles}
          form={form}
        />
      </DialogContent>
    </Dialog>
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
