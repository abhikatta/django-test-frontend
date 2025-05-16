"use client";
import { apiRoutes } from "@/lib/constants";
import { GetData } from "@/lib/utils/db-utils";
import { useCrewStore } from "@/store/crew-store";
import { CrewMember } from "@/types/global";
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
    const crewData = await GetData<CrewMember[]>({ url: apiRoutes.crew });
    if (crewData) {
      setCrew(crewData);
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
