import { User } from "@/types/global";
import { USER_LOCAL_STORAGE_KEY } from "../constants";
import { toast } from "sonner";

export const setUserLocalStorage = (data: User) => {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(data));
};

export const isUserAlreadyLoggedIn = () => {
  return Boolean(localStorage.getItem(USER_LOCAL_STORAGE_KEY));
};

export const getUserFromLocalStorage = (): User | false => {
  const userData = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  if (!userData) return false;

  try {
    return JSON.parse(userData) as User;
  } catch (error) {
    console.error("Error parsing user from localStorage: ", error);
    toast.error("Error", {
      description: "Something went wrong! Please login in again",
    });
    return false;
  }
};

export const deleteUserLocalStorage = () => {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
};
