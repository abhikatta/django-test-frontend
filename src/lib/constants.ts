const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const apiRoutes = {
  crew: `${BASE_URL}/api/crew/`,
  crewWithId: (id: string | number) => apiRoutes.crew + id + "/",
  roles: `${BASE_URL}/api/roles/`,
  accounts: {
    user: `${BASE_URL}/api/accounts/user/`,
    login: `${BASE_URL}/api/accounts/login/`,
    signup: `${BASE_URL}/api/accounts/signup/`,
    getAccessToken: `${BASE_URL}/api/token/refresh/`,
  },
};

export const SOMETHING_WENT_WRONG = "Something went wrong!";

export const USER_LOCAL_STORAGE_KEY = "user";
