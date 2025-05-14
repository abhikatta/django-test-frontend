const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const clientAPI = {
  crew: `${BASE_URL}/api/crew/`,
  roles: `${BASE_URL}/api/roles/`,
  accounts: {
    login: `${BASE_URL}/api/accounts/login/`,
    signup: `${BASE_URL}/api/accounts/signup/`,
    getAccessToken: `${BASE_URL}/api/refresh/token/`,
  },
};

export const SOMETHING_WENT_WRONG = "Something went wrong!";

export const USER_LOCAL_STORAGE_KEY = "user";
