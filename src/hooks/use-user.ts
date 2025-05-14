"use client";

import { getUserFromLocalStorage } from "@/lib/local-storage-utils";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

const useUser = () => {
  const { user, setUser, logoutUser } = useUserStore();

  // auto logout user if localstorage has no user data
  useEffect(() => {
    const userData = getUserFromLocalStorage();
    if (!userData) logoutUser();
    else {
      setUser(userData);
    }
  }, []);

  return { user, logoutUser, setUser };
};

export default useUser;
