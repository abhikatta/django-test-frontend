"use client";
import { apiRoutes } from "@/lib/constants";
import { GetData } from "@/lib/utils/db-utils";
import { useClientsStore } from "@/store/client-store";
import { Client } from "@/types/global";
import { useCallback, useEffect, useState } from "react";

const useGetClient = () => {
  const { clients, setClients } = useClientsStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const clientDataKeys: (keyof Client)[] = [
    "first_name",
    "last_name",
    "address",
    "phone_number",
    "ongoing_work",
  ];

  const getClients = useCallback(async () => {
    setIsLoading(true);
    const crewData = await GetData<Client[]>({ url: apiRoutes.clients });
    if (crewData) {
      setClients(crewData);
    } else {
      setIsError(true);
    }
    setIsLoading(false);
  }, [setClients]);

  useEffect(() => {
    if (clients.length > 0) {
      return;
    }
    getClients();
  }, [getClients, clients]);

  return { clientDataKeys, clients, isLoading, isError };
};

export default useGetClient;
