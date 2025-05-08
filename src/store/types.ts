import { User } from "@/types/global";

export interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}
