export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export interface CreateCrewMember {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  is_active: boolean;
  is_tasked: boolean;
  hourly_wage: number;
  client?: number | null;
  client_name?: string | null;
  client_phone_number?: number | null;
}

export interface CrewMember extends CreateCrewMember {
  id: number; //readonly
}

export interface Role {
  label: string;
  value: string;
}

export interface CreateClient {
  first_name: string;
  last_name: string;
  phone_number: number;
  address: string;
}
export interface Client extends CreateClient {
  id: number; //readonly
  created_at: string; //readonly
  user: number; //readonly (current logged in user id)
}

export const enum METHOD {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type extraHeaders = Record<string, string> & { recalled?: string };
export interface HandleAPICallProps {
  url: string;
  method: `${METHOD}`;
  extraHeaders?: extraHeaders;
  body?: unknown;
}

export interface Props<T = unknown> {
  extraHeaders?: extraHeaders;
  url: string;
  body?: T;
}

export interface UpdateProps extends Props {
  METHOD?: METHOD.PUT | METHOD.PATCH;
}

export type DjangoErrorResponseObject =
  | { detail: string }
  | Record<string, string[]>;
