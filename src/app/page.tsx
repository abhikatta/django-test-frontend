import CreateCrewForm from "@/components/create-crew";
import CrewTable from "@/components/crew-table";

const Page = async () => {
  return (
    <div className="flex flex-col items-center h-auto mt-10 justify-center">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
        <CrewTable />
        <CreateCrewForm />
      </div>
    </div>
  );
};

export default Page;
