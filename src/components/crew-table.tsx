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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
  const { updateCrewMember } = useCrewStore();

  const form = useForm<CreateCrewSchema>({
    resolver: zodResolver(createCrewSchema),
    defaultValues: {
      ...item,
    },
  });

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
        updateCrewMember({ ...data, id: item.id });
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
        <Form {...form}>
          <form
            className="flex flex-col items-start justify-center mt-10 gap-y-3 gap-x-5 w-auto"
            onSubmit={form.handleSubmit(updateCrew)}>
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row items-center w-auto justify-between gap-x-2">
              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex flex-row-reverse items-center justify-between gap-x-2">
                    <FormLabel>
                      Is the crew member currently active and ready to work?
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}></Switch>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row items-center justify-between gap-x-2">
              <FormField
                control={form.control}
                name="is_tasked"
                render={({ field }) => (
                  <FormItem className="flex flex-row-reverse items-center justify-between gap-x-2">
                    <FormLabel>
                      Is the crew member already assigned a work?
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}></Switch>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="hourly_wage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Crew member&apos;s hourly wage</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Hourly Wage" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={disabled} variant="default" type="submit">
              Update
            </Button>
          </form>
        </Form>
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
            <TableCell>
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
