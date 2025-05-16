"use client";
import { useUserStore } from "@/store/user-store";
import { SidebarTrigger } from "../ui/sidebar";

const CustomSidebarTrigger = () => {
  const { user } = useUserStore();
  return user ? <SidebarTrigger /> : <></>;
};

export default CustomSidebarTrigger;
