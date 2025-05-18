"use client";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const ProtectRoute = () => {
  const { user } = useUserStore();
  const router = useRouter();

  // if user is not present in state(loggeed in), redirect to login page
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);
  return <></>;
};

export default ProtectRoute;
