// this is a proxy on frontend not same as backend
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const clientAPI = {
  crew: `${BASE_URL}/api/crew/`,
  roles: `${BASE_URL}/api/roles/`,
  accounts: {
    login: `${BASE_URL}/api/login/`,
    signup: `${BASE_URL}/api/signup/`,
    getAccessToken: `${BASE_URL}/api/get-access-token/`,
  },
};
