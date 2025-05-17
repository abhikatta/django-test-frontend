"use client";
import {
  DjangoErrorResponseObject,
  HandleAPICallProps,
  METHOD,
  Props,
  UpdateProps,
} from "@/types/global";
import { toast } from "sonner";
import { parseErrorMessage, toastErrorMessage } from "./errors";
// import { apiRoutes } from "../constants";

const RaiseErrorToast = (error: string) => {
  return toast.error("Error!", {
    className:
      "!bg-red-400 !text-white dark:!bg-red-400 !border-none dark:!text-black",
    description: error,
  });
};

// TODO
export const refreshToken = async (): Promise<unknown> => {
  return {};
};

const handleAPICall = async ({
  url,
  method,
  body,
  extraHeaders,
}: HandleAPICallProps) => {
  const headers = {
    "Content-Type": "application/json",
    ...extraHeaders,
  };

  try {
    const res = await fetch(url, {
      method,
      headers,
      credentials: "include",
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    if (res.ok) {
      return await res.json();
    } else if (res.status === 401) {
      // perform token refresh
      await refreshToken();
      // retry original request
      const res = await fetch(url, {
        method,
        headers,
        credentials: "include",
        ...(body ? { body: JSON.stringify(body) } : {}),
      });
      if (res.ok) {
        return await res.json();
      } else {
        throw new Error("Session has expired. Please login again!");
      }
    } else if (res.status === 404) {
      throw new Error("Request is not valid!");
    }
    // for like DELETE requests, there is no response so returning an empty object
    else if (res.status === 405) {
      return {};
    } else {
      const error: DjangoErrorResponseObject = await res.json();
      throw new Error(parseErrorMessage(error));
    }
  } catch (error: unknown) {
    RaiseErrorToast(toastErrorMessage(error));
  }
};

export const GetData = async <T>(props: Props): Promise<T | undefined> =>
  await handleAPICall({ ...props, method: METHOD.GET });

export const PostData = async <T>(props: Props): Promise<T | undefined> =>
  await handleAPICall({ ...props, method: METHOD.POST });

export const UpdateData = async <T>(
  props: UpdateProps
): Promise<T | undefined> =>
  await handleAPICall({ ...props, method: props.METHOD || METHOD.PATCH });

export const DeleteData = async <T>(props: Props): Promise<T | undefined> =>
  await handleAPICall({ ...props, method: METHOD.DELETE });
