import { toast } from "sonner";

const enum METHOD {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

interface Props<T = any> {
  url: string;
  body?: T;
  onSuccess?: () => void;
}

interface UpdateProps extends Props {
  METHOD?: METHOD.PUT | METHOD.PATCH;
}

const RaiseErrorToast = (error: string) => {
  return toast.error("Something Went Wrong!", {
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
      props.onSuccess ? props.onSuccess() : null;
      return data;
    }
    RaiseErrorToast("Something went wrong");
    return null;
  } catch (error) {
    RaiseErrorToast(JSON.stringify(error));
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
      props.onSuccess ? props.onSuccess() : null;
      return data;
    }
    RaiseErrorToast("Something went wrong");
    return null;
  } catch (error) {
    RaiseErrorToast(JSON.stringify(error));
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
      props.onSuccess ? props.onSuccess() : null;
      return data;
    } else {
      RaiseErrorToast("Something went wrong");
      return null;
    }
  } catch (error) {
    RaiseErrorToast(JSON.stringify(error));
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
      props.onSuccess ? props.onSuccess() : null;
      return data;
    }
    RaiseErrorToast("Something went wrong");
  } catch (error) {
    RaiseErrorToast(JSON.stringify(error));
  }
};
