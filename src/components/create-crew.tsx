"use client";
import { useUserStore } from "@/store/user-store";
import { useForm } from "react-hook-form";
import { createCrewSchema, CreateCrewSchema } from "@/lib/schema";
import { clientAPI } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCrewStore } from "@/store/crew-store";
import { CreateCrewMember } from "@/types/global";

const CreateCrewForm = () => {
  const { user } = useUserStore();
  const { addCrewMember } = useCrewStore();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<CreateCrewSchema>({
    resolver: zodResolver(createCrewSchema),
  });

  const onSubmit = async (data: CreateCrewSchema) => {
    try {
      const res = await fetch(clientAPI.crew, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const crewData = await res.json();
        console.log(crewData);
        addCrewMember(crewData);
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form
        className="flex flex-col items-start justify-center mt-10 gap-x-5 w-auto"
        onSubmit={handleSubmit(onSubmit)}>
        <input {...register("first_name")} placeholder="firstname"></input>
        <input {...register("last_name")} placeholder="lastname"></input>
        <input {...register("email")} placeholder="email" type="email"></input>
        <div className="flex flex-row items-center justify-between gap-x-2">
          <input
            {...register("is_active")}
            id="isActive"
            type="checkbox"></input>
          <label htmlFor="isActive">Is Active</label>
        </div>
        <div className="flex flex-row items-center justify-between gap-x-2">
          <input {...register("is_tasked")} type="checkbox"></input>
          <label htmlFor="isActive">Is Tasked</label>
        </div>
        <input
          {...register("hourly_wage")}
          placeholder="Hourly Wage"
          type="number"></input>
        <button type="submit">Submit</button>
        {Object.entries(errors).map((item) => (
          <p className="text-red-300 bg-red-50">
            {item[0]} {item[1].message}
          </p>
        ))}
      </form>
      <p>{JSON.stringify(user)}</p>
    </>
  );
};

export default CreateCrewForm;
