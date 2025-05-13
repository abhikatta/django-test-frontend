"use client";
import { useForm } from "react-hook-form";
import { createCrewSchema, CreateCrewSchemaType } from "@/lib/schema";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostData } from "@/lib/db-utils";
import useGetRoles from "@/hooks/use-get-roles";

const CreateCrewForm = () => {
  const { addCrewMember } = useCrewStore();
  const { roles } = useGetRoles();
  const form = useForm<CreateCrewSchemaType>({
    resolver: zodResolver(createCrewSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      is_active: true,
      is_tasked: false,
      role: "",
      hourly_wage: 0,
    },
  });

  const onSubmit = async (data: CreateCrewSchemaType) => {
    const crewData = await PostData({ url: clientAPI.crew, body: data });
    if (crewData) {
      addCrewMember(crewData);
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
              <FormLabel>First Name</FormLabel>
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
              <FormLabel>Enter email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Role</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {roles.map((role, index) => (
                        <SelectItem key={index} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
