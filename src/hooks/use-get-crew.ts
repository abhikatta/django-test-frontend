"use client";
import { apiRoutes } from "@/lib/constants";
import { GetData } from "@/lib/utils/db-utils";
import { useCrewStore } from "@/store/crew-store";
import { CrewMember } from "@/types/global";
import { useCallback, useEffect, useState } from "react";

const useGetCrew = () => {
  const { crew, setCrew } = useCrewStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const crewMemberKeys: (keyof CrewMember)[] = [
    "id",
    "first_name",
    "last_name",
    "email",
    "is_active",
    "is_tasked",
    "role",
    "hourly_wage",
  ];
  const getCrew = useCallback(async () => {
    setIsLoading(true);
    const crewData = await GetData<CrewMember[]>({ url: apiRoutes.crew });
    if (crewData) {
      setCrew(crewData);
    } else {
      setIsError(true);
    }
    setIsLoading(false);
  }, [setCrew]);

  useEffect(() => {
    getCrew();
  }, [getCrew]);

  return { crewMemberKeys, crew, isLoading, isError };
};

export default useGetCrew;
