"use client";

import { useUserStore } from "@/store/user-store";

// TODO
const useUser = () => {
  const { user, setUser } = useUserStore();

  const logoutUser = () => {
    setUser(null);
  };
  const signup = () => {};
  const login = () => {};

  return { user, logoutUser };
};

export default useUser;
