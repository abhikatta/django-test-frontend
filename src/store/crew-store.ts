import { create } from "zustand";
import { CrewState } from "./types";

export const useCrewStore = create<CrewState>((set) => ({
  crew: [],
  crewCount: 0,
  setCrew: (crew) => set({ crew }),
  addCrewMember: (crewMember) =>
    set((state) => ({
      crew: [...state.crew, crewMember],
      crewCount: state.crewCount + 1,
    })),

  removeCrewMember: (id) =>
    set((state) => ({
      crew: state.crew.filter((crewMember) => crewMember.id !== id),
      crewCount: state.crewCount === 0 ? 0 : state.crewCount - 1,
    })),
}));
