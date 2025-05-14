import {
  DjangoErrorResponseObject,
  METHOD,
  Props,
  UpdateProps,
} from "@/types/global";
import { toast } from "sonner";
import { parseErrorMessage, toastErrorMessage } from "./utils";

const RaiseErrorToast = (error: string) => {
  console.log("error message received:", error);
  return toast.error("Error!", {
    className:
      "!bg-red-400 !text-white dark:!bg-red-400 !border-none dark:!text-black",
    description: error,
  });
};

export const GetData = async (props: Props) => {
  try {
    const res = await fetch(props.url, {
      method: METHOD.GET,
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const data = await res.json();
      return data;
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props.body),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props.body),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props.body),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error: unknown) {
    RaiseErrorToast(toastErrorMessage(error));
  }
};
