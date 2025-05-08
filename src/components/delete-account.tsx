"use client";

import { clientAPI } from "@/lib/constants";

const DeleteAccountButton = ({ item }: any) => {
  const deleteAccount = async (id: number) => {
    await fetch(clientAPI.account, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
      }),
    });
  };

  return <button onClick={() => deleteAccount(item.id)}>Delete</button>;
};

export default DeleteAccountButton;
