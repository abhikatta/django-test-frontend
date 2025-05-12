export interface User {
  firstname: string;
  lastname: string;
  email: string;
}

export interface CrewMember {
  id: number; //readonly
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  is_tasked: boolean;
  hourly_wage: number;
  //   created_at: string;
  //   client_id: number; // Working for which client
}

export interface CreateCrewMember {
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  is_tasked: boolean;
  hourly_wage: number;
}
