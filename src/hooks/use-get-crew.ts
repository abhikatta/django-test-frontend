"use client";
import { clientAPI } from "@/lib/constants";
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
    try {
      const res = await fetch(clientAPI.crew);
      const data = await res.json();
      if (data) {
        setCrew(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCrew();
  }, []);

  return { crewMemberKeys, crew };
};

export default useGetCrew;
