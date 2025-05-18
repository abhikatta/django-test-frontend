"use client";
import { CreateCrewMember, CrewMember, METHOD } from "@/types/global";
import { apiRoutes } from "@/lib/constants";
import { useCrewStore } from "@/store/crew-store";
import { useRolesStore } from "@/store/roles-store";
import useGetCrew from "@/hooks/use-get-crew";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils/utils";

import { Edit3, Loader2, Trash2 } from "lucide-react";
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
import { useState } from "react";
import { Badge } from "./ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";

import { createCrewSchema, CreateCrewSchemaType } from "@/lib/schemas/crew";
import { useForm } from "react-hook-form";
import { DeleteData, UpdateData } from "@/lib/utils/db-utils";
import { Skeleton } from "./ui/skeleton";
import { CrewForm } from "./create-crew";

const formatCellValue = (key: keyof CrewMember, item: CrewMember) => {
  switch (key) {
    case "role":
      return item.role.charAt(0).toLocaleUpperCase() + item.role.slice(1);
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
      return item[key];
  }
};

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
  return isLoading ? (
    <Skeleton className="h-15 w-full" />
  ) : (
    <Table>
      <TableHeader>
        <TableRow>
          {crewMemberKeys.map((rowitem, index) => (
            <TableHead key={index}>
              {rowitem
                .split("_")
                .map(
                  (item) => item.charAt(0).toUpperCase() + item.slice(1) + " "
                )}
            </TableHead>
          ))}
          <TableHead>Settings</TableHead>
        </TableRow>
      </TableHeader>
      {isError ? (
        <TableRow>
          <TableCell
            className="border-none"
            colSpan={crewMemberKeys.length + 1}>
            <p className="w-full h-20 flex justify-center items-center text-center ">
              Something went wrong! Please check your internet connection.
            </p>
          </TableCell>
        </TableRow>
      ) : (
        <TableBody>
          {crew.length > 0 ? (
            crew.map((item, index) => (
              <TableRow key={index}>
                {crewMemberKeys.map((key) => (
                  <TableCell key={key}>{formatCellValue(key, item)}</TableCell>
                ))}
                <TableCell className="flex items-center justify-evenly">
                  <DeleteCrewButton item={item} />
                  <UpdateCrewButton item={item} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                className="border-none"
                colSpan={crewMemberKeys.length + 1}>
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

export default CrewTable;
