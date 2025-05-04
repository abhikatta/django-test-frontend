"use server";

export const createAccount = async (data: FormData) => {
  try {
    const plainData = Object.fromEntries(data.entries());
    await fetch(`${process.env.BASE_URL}/api/accounts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plainData),
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateAccount = async (data: FormData) => {
  try {
    await fetch(`${process.env.BASE_URL}/api/accounts`);
  } catch (error) {}
};
