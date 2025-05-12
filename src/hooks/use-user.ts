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

  return { logoutUser };
};

export default useUser;
