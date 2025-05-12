export interface User {
  firstname: string;
  lastname: string;
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
}

export interface CrewMember extends CreateCrewMember {
  id: number; //readonly
  //   created_at: string;
  //   client_id: number; // Working for which client
}

export interface Role {
  label: string;
  value: string;
}
