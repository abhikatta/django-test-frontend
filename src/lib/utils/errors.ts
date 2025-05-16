import { SOMETHING_WENT_WRONG } from "../constants";

import { DjangoErrorResponseObject } from "@/types/global";

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
