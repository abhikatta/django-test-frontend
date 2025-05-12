import { CrewMember, User } from "@/types/global";

export interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

export interface CrewState {
  crewCount: number;
  crew: CrewMember[] | []; // might be changed in future in future, to add atleast one member before doing anything else as soon as the user logs in
  setCrew: (crew: CrewMember[]) => void;
  addCrewMember: (crewMember: CrewMember) => void;
  updateCrewMember: (crewMemberId: CrewMember) => void;
  removeCrewMember: (id: number) => void;
}
