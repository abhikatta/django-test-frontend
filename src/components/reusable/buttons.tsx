"use client";
import { ButtonProps } from "@/types/auth-form";
import { useRef, useState } from "react";

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

  const handleSignOut = () => {
    logoutUser();
    closeDropdown();
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
