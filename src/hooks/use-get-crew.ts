"use client";
import { clientAPI } from "@/lib/constants";
import { GetData } from "@/lib/db-utils";
import { useCrewStore } from "@/store/crew-store";
import { useEffect } from "react";

const useGetCrew = () => {
  const { crew, setCrew } = useCrewStore();

  const crewMemberKeys = [
    "First Name",
    "Last Name",
    "Email",
    "Active Status",
    "Task Status",
    "Hourly Wage",
  ];
  const getCrew = async () => {
    const data = await GetData({ url: clientAPI.crew });
    if (data) {
      setCrew(data);
    }
  };

  useEffect(() => {
    getCrew();
  }, []);

  return { crewMemberKeys, crew };
};

export default useGetCrew;
