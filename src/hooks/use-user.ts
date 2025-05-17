"use client";

import { apiRoutes } from "@/lib/constants";
import { GetData } from "@/lib/utils/db-utils";
import { useUserStore } from "@/store/user-store";
import { User } from "@/types/global";
import { useCallback } from "react";

const useUser = () => {
  const { user, setUser, logoutUser } = useUserStore();

  // This response could be in the same api as login or signup in backend but
  // it wont fetch again on refresh and user can modify the data in localstorage and we dont want that

  // TODO
  const fetchUser = useCallback(async () => {}, []);

  return { user, logoutUser, setUser, fetchUser };
};

export default useUser;
