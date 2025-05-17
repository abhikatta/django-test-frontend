"use client";

import { useUserStore } from "@/store/user-store";

const useUser = () => {
  const { user, setUser, logoutUser } = useUserStore();

  return { user, logoutUser, setUser };
};

export default useUser;
