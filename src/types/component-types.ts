import { CreateCrewSchemaType } from "@/lib/schemas/crew";
import { LucideProps } from "lucide-react";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  Dispatch,
  SetStateAction,
} from "react";
import { Client, Role } from "./global";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { CreateClientSchemaType } from "@/lib/schemas/clients";

export interface PillPosition {
  left: number;
  width: number;
  height: number;
}

export interface ButtonProps {
  name: string;
  label: string;
  onClick: () => void;
  setPillPosition: Dispatch<SetStateAction<PillPosition>>;
}
export interface NavItem {
  label: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => Promise<void>;
}

export interface CrewFormProps extends FormProps<CreateCrewSchemaType> {
  roles: Role[];
  clients: Client[];
  disabled?: boolean;
}

export type ClientFormProps = FormProps<CreateClientSchemaType>;
