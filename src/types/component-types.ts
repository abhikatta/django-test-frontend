import { CreateCrewSchemaType } from "@/lib/schemas/crew";
import { LucideProps } from "lucide-react";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  Dispatch,
  SetStateAction,
} from "react";
import { Client, Role } from "./global";
import { useForm } from "react-hook-form";

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

export interface CrewFormProps {
  form: ReturnType<typeof useForm<CreateCrewSchemaType>>;
  roles: Role[];
  clients: Client[];
  onSubmit: (data: CreateCrewSchemaType) => Promise<void>;
  disabled?: boolean;
}
