import { create } from "zustand";
import { UserState } from "./types";

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },

  //   TODO: think about this later if using refresh token
  logoutUser: () => {
    return set({ user: null });
  },
}));
