import { DjangoErrorResponseObject } from "@/types/global";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const SOMETHING_WENT_WRONG = "Something went wrong!";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseErrorMessage = (error: DjangoErrorResponseObject): string => {
  if ("detail" in error) {
    if (typeof error.detail === "string") return error.detail;
    else return SOMETHING_WENT_WRONG;
  }

  const errorObjKey = Object.keys(error)[0];
  const errorObjValue = error[errorObjKey];

  return Array.isArray(errorObjValue) ? errorObjValue[0] : SOMETHING_WENT_WRONG;
};

export const toastErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : SOMETHING_WENT_WRONG;
