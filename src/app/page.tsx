"use client";
import Authentication from "@/components/authentication";
import CreateCrewForm from "@/components/create-crew";
import CrewTable from "@/components/crew-table";
import useUser from "@/hooks/use-user";

const Page = () => {
  const { user } = useUser();
  return (
    <div className="flex flex-col items-center h-auto mt-10 justify-center">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
        {user ? (
          <>
            <CrewTable />
            <CreateCrewForm />
          </>
        ) : (
          <Authentication />
        )}
      </div>
    </div>
  );
};

export default Page;
