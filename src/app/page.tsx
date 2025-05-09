import CreateCrewForm from "@/components/create-crew";
import CrewTable from "@/components/crew-table";

const Page = async () => {
  return (
    <div className="flex flex-col items-center h-auto mt-10 justify-center">
      <div className="w-full mx-auto flex flex-col items-center justify-center"></div>
      <CrewTable />
      <CreateCrewForm />
    </div>
  );
};

export default Page;
