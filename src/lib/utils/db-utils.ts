"use client";
import {
  DjangoErrorResponseObject,
  HandleAPICallProps,
  METHOD,
  Props,
  Tokens,
  UpdateProps,
  User,
} from "@/types/global";
import { toast } from "sonner";
import { parseErrorMessage, toastErrorMessage } from "./errors";
import { useUserStore } from "@/store/user-store";
import { apiRoutes } from "../constants";
import { getUserFromLocalStorage } from "./local-storage-utils";

const RaiseErrorToast = (error: string) => {
  return toast.error("Error!", {
    className:
      "!bg-red-400 !text-white dark:!bg-red-400 !border-none dark:!text-black",
    description: error,
  });
};

export const refreshToken = async ({
  extraHeaders,
  url,
  method,
  body,
}: HandleAPICallProps): Promise<unknown> => {
  // if not already recalled the api
  const tokenData = getUserFromLocalStorage();

  if (extraHeaders && !extraHeaders["recalled"] && tokenData) {
    console.log("refresh Csalled");
    const tokenRes = await PostData<Tokens>({
      url: apiRoutes.accounts.getAccessToken,
      body: { refresh: tokenData.refresh },
      extraHeaders: { recalled: "true" },
    });
    // if successfully got the refresh token, update in state
    if (tokenRes) {
      const tokenData = tokenRes as Partial<User>;
      useUserStore.getState().setUser({
        ...useUserStore.getState().user!,
        access: tokenData.access!,
      });
      // call the original api again
      return await handleAPICall({
        url,
        method,
        body,
        extraHeaders: { ...(extraHeaders || {}), recalled: "true" },
      });
    }
  }
  // if all failed, logout user and toast error
  else {
    useUserStore.getState().logoutUser();
    throw new Error(parseErrorMessage({ detail: "Session has expired!" }));
  }
};

const handleAPICall = async ({
  url,
  method,
  body,
  extraHeaders,
}: HandleAPICallProps) => {
  const authToken = useUserStore.getState().user?.access || null;
  const authorizationHeader = authToken
    ? { Authorization: `Bearer ${authToken}` }
    : null;

  const headers = {
    "Content-Type": "application/json",
    ...authorizationHeader,
    ...extraHeaders,
  };

  try {
    const res = await fetch(url, {
      method,
      headers,
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    if (res.ok) {
      return await res.json();
    } else if (res.status === 401) {
      return await refreshToken({ extraHeaders, url, body, method });
    } else if (res.status === 404) {
      throw new Error("Request is not valid!");
    } else if (res.status === 405) {
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
