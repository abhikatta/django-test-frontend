import { Dispatch, SetStateAction } from "react";

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
