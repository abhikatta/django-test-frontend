"use client";
import { apiRoutes } from "@/lib/constants";
import { GetData } from "@/lib/db-utils";
import { useCrewStore } from "@/store/crew-store";
import { useEffect, useState } from "react";

const useGetCrew = () => {
  const { crew, setCrew } = useCrewStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const crewMemberKeys = [
    "First Name",
    "Last Name",
    "Email",
    "Role",
    "Active Status",
    "Task Status",
    "Hourly Wage",
  ];
  const getCrew = async () => {
    setIsLoading(true);
    const data = await GetData({ url: apiRoutes.crew });
    if (data) {
      setCrew(data);
    } else {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCrew();
  }, []);

  return { crewMemberKeys, crew, isLoading, isError };
};

export default useGetCrew;
