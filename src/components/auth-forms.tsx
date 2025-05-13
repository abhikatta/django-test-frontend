"use client";

import { z, ZodSchema } from "zod";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface FormProps<T extends ZodSchema> {
  schema: T;
  onSubmit: (data: z.infer<T>) => void;
  defaultValues: z.infer<T>;
  fields: {
    name: keyof z.infer<T>;
    label: string;
    type: HTMLInputElement["type"];
  }[];
}

const CustomForm = <T extends ZodSchema>({
  schema,
  defaultValues,
  fields,
  onSubmit,
}: FormProps<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col items-start justify-center mt-10 gap-y-3 gap-x-5 w-auto"
          onSubmit={form.handleSubmit(onSubmit)}>
          {fields.map((inputField, index) => (
            <FormField
              control={form.control}
              name={inputField.name as Path<z.infer<T>>}
              key={index}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{inputField.label}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={inputField.label} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button variant="default" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CustomForm;
