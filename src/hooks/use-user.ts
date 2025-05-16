"use client";

import { apiRoutes } from "@/lib/constants";
import { GetData } from "@/lib/utils/db-utils";
import { getUserFromLocalStorage } from "@/lib/utils/local-storage-utils";
import { useUserStore } from "@/store/user-store";
import { Tokens, User } from "@/types/global";
import { useCallback, useEffect } from "react";

const useUser = () => {
  const { user, setUser, logoutUser } = useUserStore();

  const fetchUser = useCallback(async (tokenData: Tokens) => {
    const userData = await GetData<User>({
      url: apiRoutes.accounts.user,
      // using this because the api call is happening before the user state is set and that is leading to 401 error
      extraHeaders: {
        Authorization: `Bearer ${tokenData.access}`,
      },
    });

    return { ...userData, ...tokenData };
  }, []);
  // auto logout user if localstorage has no user data
  useEffect(() => {
    const tokenData = getUserFromLocalStorage();
    if (!tokenData) logoutUser();
    else {
      fetchUser(tokenData);
    }
  }, [logoutUser, fetchUser]);

  return { user, logoutUser, setUser, fetchUser };
};

export default useUser;
