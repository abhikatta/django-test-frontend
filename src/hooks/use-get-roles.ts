"use client";
import { apiRoutes } from "@/lib/constants";
import { GetData } from "@/lib/utils/db-utils";
import { useRolesStore } from "@/store/roles-store";
import { useEffect } from "react";

const useGetRoles = () => {
  const { roles, setRoles } = useRolesStore();

  const getRoles = async () => {
    const data = await GetData({ url: apiRoutes.roles });
    if (data) {
      setRoles(data);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  return { roles };
};

export default useGetRoles;
