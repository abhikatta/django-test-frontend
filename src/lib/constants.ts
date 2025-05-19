const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const apiRoutes = {
  crew: `${BASE_URL}/api/crew/`,
  clients: `${BASE_URL}/api/clients/`,
  crewWithId: (id: string | number) => apiRoutes.crew + id + "/",
  roles: `${BASE_URL}/api/roles/`,
  accounts: {
    user: `${BASE_URL}/api/accounts/user/`,
    login: `${BASE_URL}/api/accounts/login/`,
    logout: `${BASE_URL}/api/accounts/logout/`,
    signup: `${BASE_URL}/api/accounts/signup/`,
    refreshToken: `${BASE_URL}/api/token/refresh/`,
  },
};

export const SOMETHING_WENT_WRONG = "Something went wrong!";
