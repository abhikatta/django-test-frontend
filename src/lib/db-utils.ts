"use client";
import {
  DjangoErrorResponseObject,
  METHOD,
  Props,
  UpdateProps,
} from "@/types/global";
import { toast } from "sonner";
import { parseErrorMessage, toastErrorMessage } from "./utils";
import { useUserStore } from "@/store/user-store";

const RaiseErrorToast = (error: string) => {
  return toast.error("Error!", {
    className:
      "!bg-red-400 !text-white dark:!bg-red-400 !border-none dark:!text-black",
    description: error,
  });
};

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${useUserStore.getState().user?.access ?? ""}`,
});

// TODO:
const { logoutUser } = useUserStore.getState();

export const GetData = async (props: Props) => {
  try {
    const res = await fetch(props.url, {
      method: METHOD.GET,
      headers: getHeaders(),
    });
    if (res.ok) {
      return await res.json();
    } else {
      const error: DjangoErrorResponseObject = await res.json();
      throw new Error(parseErrorMessage(error));
    }
  } catch (error: unknown) {
    RaiseErrorToast(toastErrorMessage(error));
  }
};

export const PostData = async (props: Props) => {
  try {
    const res = await fetch(props.url, {
      method: METHOD.POST,
      headers: getHeaders(),
      body: JSON.stringify(props.body),
    });
    if (res.ok) {
      return await res.json();
    } else {
      const error: DjangoErrorResponseObject = await res.json();
      throw new Error(parseErrorMessage(error));
    }
  } catch (error: unknown) {
    RaiseErrorToast(toastErrorMessage(error));
  }
};

export const UpdateData = async (props: UpdateProps) => {
  try {
    const res = await fetch(props.url, {
      method: props.METHOD || METHOD.PATCH,
      headers: getHeaders(),
      body: JSON.stringify(props.body),
    });
    if (res.ok) {
      return await res.json();
    } else {
      const error: DjangoErrorResponseObject = await res.json();
      throw new Error(parseErrorMessage(error));
    }
  } catch (error: unknown) {
    RaiseErrorToast(toastErrorMessage(error));
  }
};

export const DeleteData = async (props: Props) => {
  try {
    const res = await fetch(props.url, {
      method: METHOD.DELETE,
      headers: getHeaders(),
      body: JSON.stringify(props.body),
    });
    if (res.ok) {
      return await res.json();
    } else {
      const error: DjangoErrorResponseObject = await res.json();
      throw new Error(parseErrorMessage(error));
    }
  } catch (error: unknown) {
    RaiseErrorToast(toastErrorMessage(error));
  }
};
