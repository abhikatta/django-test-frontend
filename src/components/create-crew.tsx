import { useForm } from "react-hook-form";
import { createCrewSchema, CreateCrewSchemaType } from "@/lib/schemas/crew";
import { apiRoutes } from "@/lib/constants";
import { useCrewStore } from "@/store/crew-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostData } from "@/lib/utils/db-utils";
import useGetRoles from "@/hooks/use-get-roles";
import { CrewMember } from "@/types/global";
import useGetClient from "@/hooks/use-get-clients";
import { CrewForm } from "./forms/crew-form";

const CreateCrewForm = () => {
  const { addCrewMember } = useCrewStore();
  const { roles } = useGetRoles();
  const { clients } = useGetClient();
  const form = useForm<CreateCrewSchemaType>({
    resolver: zodResolver(createCrewSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      is_active: true,
      is_tasked: false,
      role: "",
      hourly_wage: 0,
      client: undefined,
    },
  });

  const onSubmit = async (data: CreateCrewSchemaType) => {
    const crewData = await PostData<CrewMember>({
      url: apiRoutes.crew,
      body: data,
    });
    if (crewData) {
      addCrewMember(crewData);
    }
  };

  return (
    <CrewForm onSubmit={onSubmit} roles={roles} form={form} clients={clients} />
  );
};

export default CreateCrewForm;
