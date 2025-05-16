import { Tokens, User } from "./global";

export interface AuthFormProps {
  setUser: (user: User) => void;
  fetchUser: (tokenData: Tokens) => Promise<User>;
}
