export interface User {
  firstname: string;
  lastname: string;
  email: string;
  employees: null | {
    count: number;
    employees: [
      {
        fullName: string;
        isAvailable: boolean;
      }
    ];
  };
}
