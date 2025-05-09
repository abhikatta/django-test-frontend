"use client";
import { clientAPI } from "@/lib/constants";
import { useCrewStore } from "@/store/crew-store";
import { CrewMember } from "@/types/global";
import { useEffect } from "react";

const useGetCrew = () => {
  const { crew, setCrew } = useCrewStore();

  const crewMemberKeys: (keyof CrewMember)[] = [
    "first_name",
    "last_name",
    "email",
    "is_active",
    "is_tasked",
    "hourly_wage",
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
