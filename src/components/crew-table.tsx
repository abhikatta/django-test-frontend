"use client";
import { CrewMember } from "@/types/global";
import { clientAPI } from "@/lib/constants";
import { useCrewStore } from "@/store/crew-store";
import useGetCrew from "@/hooks/use-get-crew";

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
    <button
      className="bg-red-200 text-lg text-red-500 px-1.5 py-1"
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
            <td>{item.is_active ? "Active" : "Inactive"}</td>
            <td>
              {!item.is_active
                ? "Removed"
                : item.is_tasked
                ? "Working"
                : "Available"}
            </td>
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
