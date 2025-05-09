"use client";
import { CrewMember } from "@/types/global";
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
import { useState } from "react";
import { Badge } from "./ui/badge";

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
              <Button variant={"outline"} size={"icon"}>
                <Edit3 />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CrewTable;
