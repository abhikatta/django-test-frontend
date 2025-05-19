"use client";
import { apiRoutes } from "@/lib/constants";
import { GetData } from "@/lib/utils/db-utils";
import { useRolesStore } from "@/store/roles-store";
import { Role } from "@/types/global";
import { useCallback, useEffect } from "react";

const useGetRoles = () => {
  const { roles, setRoles } = useRolesStore();

  const getRoles = useCallback(async () => {
    const data = await GetData<Role[]>({ url: apiRoutes.roles });
    if (data) {
      setRoles(data);
    }
  }, [setRoles]);

  useEffect(() => {
    if (roles.length > 0) {
      return;
    } else {
      getRoles();
    }
  }, [getRoles, roles]);

  return { roles };
};

export default useGetRoles;
