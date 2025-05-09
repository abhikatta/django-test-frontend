"use client";
import { CrewMember } from "@/types/global";
import DeleteCrewButton from "./delete-crew";
import { clientAPI } from "@/lib/constants";
import { useCrewStore } from "@/store/crew-store";
import useGetCrew from "@/hooks/use-get-crew";

const DeleteCrewButton = ({ item }: { item: CrewMember }) => {
  const { removeCrewMember } = useCrewStore();
  const deleteCrew = async (id: number) => {
    await fetch(clientAPI.crew, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
      }),
    });
    removeCrewMember(item.id);
  };

  return (
    <button
      className="bg-red-200 text-red-500 px-3 py-2"
      onClick={() => deleteCrew(item.id)}>
      Delete
    </button>
  );
};

const CrewTable = () => {
  const { crew, crewMemberKeys } = useGetCrew();
  return (
    <table>
      <thead>
        <tr>
          {crewMemberKeys.map((rowitem, index) => (
            <td key={index} className="pr-[3rem] text-left">
              {rowitem}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {crew.map((item) => (
          <tr key={item.id}>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.email}</td>
            <td>{item.is_active ? "True" : "False"}</td>
            <td>{item.is_tasked ? "True" : "False"}</td>
            <td>{item.hourly_wage}</td>
            <td>
              <DeleteCrewButton item={item} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CrewTable;
