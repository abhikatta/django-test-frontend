import { LucideProps } from "lucide-react";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  Dispatch,
  SetStateAction,
} from "react";

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
