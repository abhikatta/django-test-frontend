"use client";
import { createAccount } from "@/app/server-actions/create-account";

const CreateAccountForm = () => {
  return (
    <form
      className="flex flex-col items-start justify-center mt-10 gap-x-5 w-auto"
      action={createAccount}>
      <input name="first_name" placeholder="firstname"></input>
      <input name="last_name" placeholder="lastname"></input>
      <input name="email" placeholder="email" type="email"></input>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateAccountForm;
