"use client";
import { HTMLAttributes, JSX, useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useUserStore } from "@/store/user-store";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { PostData } from "@/lib/utils/db-utils";
import { apiRoutes } from "@/lib/constants";
import { ButtonProps } from "@/types/component-types";
import { Edit3, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils/utils";

export const FormNavButton = ({
  name,
  label,
  onClick,
  setPillPosition,
}: ButtonProps) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const onButtonClick = () => {
    onClick();
    if (ref.current) {
      const { width, left, height } = ref.current.getBoundingClientRect();
      setPillPosition({
        width,
        left,
        height,
      });
    }
  };
  return (
    <button
      ref={ref}
      name={name}
      className="cursor-pointer text-3xl rounded-full px-10 py-2 w-[10rem] bg-transparent"
      onClick={onButtonClick}>
      {label}
    </button>
  );
};

export const SignOutButton = ({
  closeDropdown,
}: {
  closeDropdown: () => void;
}) => {
  const { logoutUser } = useUserStore();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    const logoutSuccess = await PostData({
      url: apiRoutes.accounts.logout,
    });
    if (logoutSuccess) {
      logoutUser();
      closeDropdown();
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className=" w-full" asChild>
        <Button variant={"destructive"}>Sign out</Button>
      </DialogTrigger>
      <DialogContent className=" w-full">
        <DialogHeader>
          <DialogTitle>Sign Out?</DialogTitle>
          <DialogDescription>
            Are you sure you want to sign out?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleSignOut} variant={"destructive"}>
              Sign out
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const DeleteButtonInner = ({
  dialogTitle,
  dialogDescription,
  children,
}: HTMLAttributes<HTMLElement> & {
  dialogTitle: string;
  dialogDescription: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size={"icon"}>
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          {children}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const UpdateButtonInner = ({
  dialogTitle,
  children,
  open,
  className,
  setOpen,
}: HTMLAttributes<HTMLElement> & {
  dialogTitle: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <Edit3 />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center justify-center w-full">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <DialogFooter className={cn("w-full", className)}>
          {children}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
