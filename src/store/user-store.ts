import { create } from "zustand";
import { UserState } from "./types";
import { persist } from "zustand/middleware";
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logoutUser: () => set({ user: null }),
    }),
    {
      name: "user-local",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
