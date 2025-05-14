import { create } from "zustand";
import { UserState } from "./types";
import {
  deleteUserLocalStorage,
  setUserLocalStorage,
} from "@/lib/local-storage-utils";

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => {
    setUserLocalStorage(user);
    set({ user });
  },

  //   TODO: think about this later if using refresh token
  logoutUser: () => {
    deleteUserLocalStorage();
    return set({ user: null });
  },
}));
