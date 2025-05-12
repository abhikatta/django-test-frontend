import { create } from "zustand";
import { RolesState } from "./types";

export const useRolesStore = create<RolesState>((set) => ({
  roles: [],
  setRoles: (roles) => set({ roles }),
}));
