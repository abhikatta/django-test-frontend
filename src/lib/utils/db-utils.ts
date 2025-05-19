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
import { apiRoutes } from "../constants";

const RaiseErrorToast = (error: string) => {
  return toast.error("Error!", {
    className:
      "!bg-red-400 !text-white dark:!bg-red-400 !border-none dark:!text-black",
    description: error,
  });
};

export const refreshToken = async (): Promise<unknown> => {
  try {
    const res = await fetch(apiRoutes.accounts.refreshToken, {
      method: METHOD.POST,
      credentials: "include",
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    RaiseErrorToast(toastErrorMessage(error));
  }
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
      ...(method === "GET" ? { cache: "force-cache" } : {}),
    });
    if (res.ok) {
      // for like DELETE requests, there is no response so returning an empty object
      if (res.status === 204) {
        return true;
      }
      return await res.json();
    } else if (res.status === 401) {
      // perform token refresh
      const refreshTokenres = await refreshToken();
      // retry original request
      if (!refreshTokenres) {
        throw new Error("Session has expired. Please login again!");
      }
      const res = await fetch(url, {
        method,
        headers,
        credentials: "include",
        ...(body ? { body: JSON.stringify(body) } : {}),
      });
      if (res.ok) {
        return await res.json();
      } else {
        throw new Error("Error fetching data");
      }
    } else if (res.status === 404) {
      throw new Error("Request is not valid!");
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
