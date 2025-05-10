"use client";
import { CreateCrewMember, CrewMember } from "@/types/global";
import { clientAPI } from "@/lib/constants";
import { useCrewStore } from "@/store/crew-store";
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
import { cn } from "@/lib/utils";
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
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { createCrewSchema, CreateCrewSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";

const DeleteCrewButton = ({ item }: { item: CrewMember }) => {
  const { removeCrewMember } = useCrewStore();
  const [disabled, setDisabled] = useState(false);

  const deleteCrew = async (id: number) => {
    try {
      setDisabled(true);
      const res = await fetch(clientAPI.crew, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
        }),
      });
      if (res.ok) {
        removeCrewMember(item.id);
      }
      setDisabled(false);
    } catch (error) {
      console.error(error);
      setDisabled(false);
    }
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

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<CreateCrewSchema>({
    resolver: zodResolver(createCrewSchema),
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (open) reset();
  }, [open, item]);

  const updateCrew = async (data: CreateCrewMember) => {
    try {
      setDisabled(true);
      const res = await fetch(`${clientAPI.crew}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
          id: item.id,
        }),
      });

      if (res.ok) {
        setOpen(false);
      }

      setDisabled(false);
    } catch (error) {
      console.error(error);
      setDisabled(false);
    }
  };
  console.log(item);
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
        <form
          className="flex flex-col gap-y-3"
          onSubmit={handleSubmit(updateCrew)}>
          <Input
            defaultValue={item.first_name}
            {...register("first_name")}
            placeholder="First Name"></Input>
          <Input
            defaultValue={item.last_name}
            {...register("last_name")}
            placeholder="Last Name"></Input>
          <Input
            {...register("email")}
            defaultValue={item.email}
            placeholder="Email"
            type="email"></Input>
          <div className="flex flex-row items-center w-auto justify-between gap-x-2">
            <Switch
              defaultChecked={item.is_active}
              {...register("is_active")}></Switch>
            <label className="whitespace-nowrap">
              Is the crew member currently active and ready to work?
            </label>
          </div>
          <div className="flex flex-row items-center justify-between gap-x-2">
            <Switch
              defaultChecked={item.is_tasked}
              {...register("is_tasked")}></Switch>
            <label className="whitespace-nowrap">
              Is the crew member already assigned a work?
            </label>
          </div>
          <Input
            {...register("hourly_wage")}
            defaultValue={item.hourly_wage}
            placeholder="Hourly Wage"
            type="number"></Input>

          {Object.entries(errors).map((item, index) => (
            <p
              key={index}
              className="text-red-300 bg-red-50 px-1 py-0.5 dark:bg-red-950">
              {item[1].message}
            </p>
          ))}
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={disabled}>Cancel</Button>
            </DialogClose>
            <Button disabled={disabled} type="submit">
              {disabled && <Loader2 className="animate-spin" />} Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const CrewTable = () => {
  const { crew, crewMemberKeys } = useGetCrew();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {crewMemberKeys.map((rowitem, index) => (
            <TableHead key={index}>{rowitem}</TableHead>
          ))}
          <TableHead>Settings</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {crew.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.first_name}</TableCell>
            <TableCell>{item.last_name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.is_active ? "Active" : "Inactive"}</TableCell>
            <TableCell className="flex justify-around items-center">
              <Badge
                className={cn(
                  item.is_tasked
                    ? "bg-gray-500 dark:bg-gray-400"
                    : "bg-green-500 dark:bg-green-400"
                )}>
                {!item.is_active
                  ? "Removed"
                  : item.is_tasked
                  ? "Working"
                  : "Available"}
              </Badge>
            </TableCell>
            <TableCell>{item.hourly_wage}</TableCell>
            <TableCell className="flex items-center justify-evenly">
              <DeleteCrewButton item={item} />
              <UpdateCrewButton item={item} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CrewTable;
