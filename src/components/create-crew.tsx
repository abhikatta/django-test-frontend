"use client";
import { useForm } from "react-hook-form";
import { createCrewSchema, CreateCrewSchema } from "@/lib/schema";
import { clientAPI } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCrewStore } from "@/store/crew-store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";

const CreateCrewForm = () => {
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
      console.log(data);
      const res = await fetch(clientAPI.crew, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          is_active: data.is_active ? true : false,
          is_tasked: data.is_tasked ? true : false,
        }),
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
        className="flex flex-col items-start justify-center mt-10 gap-y-3 gap-x-5 w-auto"
        onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("first_name")} placeholder="First Name"></Input>
        <Input {...register("last_name")} placeholder="Last Name"></Input>
        <Input {...register("email")} placeholder="Email" type="email"></Input>
        <div className="flex flex-row items-center w-auto justify-between gap-x-2">
          <Checkbox {...register("is_active")} id="isActive"></Checkbox>
          <label htmlFor="isActive" className="whitespace-nowrap">
            Is Active
          </label>
        </div>
        <div className="flex flex-row items-center justify-between gap-x-2">
          <Checkbox {...register("is_tasked")} id="isTasked"></Checkbox>
          <label htmlFor="isTasked" className="whitespace-nowrap">
            Is Tasked
          </label>
        </div>
        <Input
          {...register("hourly_wage")}
          placeholder="Hourly Wage"
          type="number"></Input>
        <Button variant="default" type="submit">
          Submit
        </Button>
        {Object.entries(errors).map((item, index) => (
          <p
            key={index}
            className="text-red-300 bg-red-50 px-1 py-0.5 dark:bg-red-950">
            {item[1].message}
          </p>
        ))}
      </form>
    </>
  );
};

export default CreateCrewForm;
