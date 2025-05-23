import { Client, CrewMember, Role, User } from "@/types/global";

export interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  logoutUser: () => void;
}

export interface CrewState {
  crewCount: number;
  crew: CrewMember[] | []; // might be changed in future in future, to add atleast one member before doing anything else as soon as the user logs in
  setCrew: (crew: CrewMember[]) => void;
  addCrewMember: (crewMember: CrewMember) => void;
  updateCrewMember: (crewMemberId: CrewMember) => void;
  removeCrewMember: (id: number) => void;
}
export interface ClientsState {
  clientsCount: number;
  clients: Client[] | []; // might be changed in future in future, to add atleast one member before doing anything else as soon as the user logs in
  setClients: (clients: Client[]) => void;
  addClient: (client: Client) => void;
  updateClient: (clientId: Client) => void;
  removeClient: (id: number) => void;
}

export interface RolesState {
  roles: Role[] | [];
  setRoles: (roles: Role[]) => void;
}
