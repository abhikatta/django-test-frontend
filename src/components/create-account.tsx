"use client";
import { useUserStore } from "@/store/user-store";
import { useForm } from "react-hook-form";
import { createAccountSchema, CreateAccountSchema } from "@/lib/schema";
import { clientAPI } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateAccountForm = () => {
  const { user } = useUserStore();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<CreateAccountSchema>({
    resolver: zodResolver(createAccountSchema),
  });

  const onSubmit = async (data: CreateAccountSchema) => {
    await fetch(clientAPI.account, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  return (
    <>
      <form
        className="flex flex-col items-start justify-center mt-10 gap-x-5 w-auto"
        onSubmit={handleSubmit(onSubmit)}>
        <input {...register("first_name")} placeholder="firstname"></input>
        <input {...register("last_name")} placeholder="lastname"></input>
        <input {...register("email")} placeholder="email" type="email"></input>
        <button type="submit">Submit</button>
        <p className="text-red-300 bg-red-50">{errors.email?.message}</p>
        <p className="text-red-300 bg-red-50">{errors.first_name?.message}</p>
        <p className="text-red-300 bg-red-50">{errors.last_name?.message}</p>
      </form>
      <p>{JSON.stringify(user)}</p>
    </>
  );
};

export default CreateAccountForm;
