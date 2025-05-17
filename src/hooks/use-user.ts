"use client";

import { apiRoutes } from "@/lib/constants";
import { GetData } from "@/lib/utils/db-utils";
import { getUserFromLocalStorage } from "@/lib/utils/local-storage-utils";
import { useUserStore } from "@/store/user-store";
import { Tokens, User } from "@/types/global";
import { useCallback, useEffect } from "react";

const useUser = () => {
  const { user, setUser, logoutUser } = useUserStore();

  // This response could be in the same api as login or signup in backend but
  // it wont fetch again on refresh and user can modify the data in localstorage and we dont want that

  const fetchUser = useCallback(async (tokenData: Tokens) => {
    const userData = await GetData<User>({
      url: apiRoutes.accounts.user,
      // using this because the api call is happening before the user state is set and that is leading to 401 error
      extraHeaders: {
        Authorization: `Bearer ${tokenData.access}`,
      },
    });
    if (userData) return { ...userData, ...tokenData };
  }, []);

  const fetchAndSetUser = useCallback(
    async (tokenData: Tokens) => {
      const userData = await fetchUser(tokenData);
      if (userData) setUser(userData);
    },
    [fetchUser, setUser]
  );

  // auto logout user if localstorage has no user data
  useEffect(() => {
    const tokenData = getUserFromLocalStorage();
    if (!tokenData) logoutUser();
    else {
      fetchAndSetUser(tokenData);
    }
  }, [logoutUser, fetchAndSetUser]);

  return { user, logoutUser, setUser, fetchUser };
};

export default useUser;
