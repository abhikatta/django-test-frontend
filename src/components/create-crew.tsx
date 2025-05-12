"use client";
import { useForm } from "react-hook-form";
import { createCrewSchema, CreateCrewSchema } from "@/lib/schema";
import { clientAPI } from "@/lib/constants";
import { useCrewStore } from "@/store/crew-store";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "./ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const CreateCrewForm = () => {
  const { addCrewMember } = useCrewStore();
  const form = useForm<CreateCrewSchema>({
    resolver: zodResolver(createCrewSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      is_active: true,
      is_tasked: false,
      hourly_wage: 0,
    },
  });

  const onSubmit = async (data: CreateCrewSchema) => {
    try {
      console.log(data);
      const res = await fetch(clientAPI.crew, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const crewData = await res.json();
        console.log(crewData);
        addCrewMember(crewData);
        form.reset();
      } else {
        const errorBody = await res.json();

        console.log(errorBody.errors.email[0]);
      }
    } catch (error) {
      console.log("errro:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col items-start justify-center mt-10 gap-y-3 gap-x-5 w-auto"
        onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row items-center w-auto justify-between gap-x-2">
          <FormField
            control={form.control}
            name="is_active"
            render={({ field }) => (
              <FormItem className="flex flex-row-reverse items-center justify-between gap-x-2">
                <FormLabel>
                  Is the crew member currently active and ready to work?
                </FormLabel>
                <FormControl>
                  <Switch
                    disabled
                    checked={field.value}
                    onCheckedChange={field.onChange}></Switch>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row items-center justify-between gap-x-2">
          <FormField
            control={form.control}
            name="is_tasked"
            render={({ field }) => (
              <FormItem className="flex flex-row-reverse items-center justify-between gap-x-2">
                <FormLabel>
                  Is the crew member already assigned a work?
                </FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}></Switch>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="hourly_wage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Crew member&apos;s hourly wage</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Hourly Wage" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="default" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateCrewForm;
