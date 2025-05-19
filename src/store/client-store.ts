import { create } from "zustand";
import { ClientsState } from "./types";

export const useClientsStore = create<ClientsState>((set) => ({
  clients: [],
  clientsCount: 0,
  setClients: (clients) => set({ clients }),
  addClient: (client) =>
    set((state) => ({
      clients: [...state.clients, client],
      clientsCount: state.clientsCount + 1,
    })),
  updateClient: (client) =>
    set((state) => ({
      clients: state.clients.map((member) =>
        member.id === client.id ? { ...member, ...client } : member
      ),
    })),
  removeClient: (id) =>
    set((state) => ({
      clients: state.clients.filter((client) => client.id !== id),
      clientsCount: state.clientsCount === 0 ? 0 : state.clientsCount - 1,
    })),
}));
