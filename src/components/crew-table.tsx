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

const DeleteCrewButton = ({ item }: { item: CrewMember }) => {
  const { removeCrewMember } = useCrewStore();
  const deleteCrew = async (id: number) => {
    try {
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button variant="destructive" onClick={() => deleteCrew(item.id)}>
      Delete
    </Button>
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
          <TableHead>Delete Crew Member</TableHead>
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
              {!item.is_active
                ? "Removed"
                : item.is_tasked
                ? "Working"
                : "Available"}
            </TableCell>
            <TableCell>{item.hourly_wage}</TableCell>
            <TableCell>
              <DeleteCrewButton item={item} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CrewTable;
