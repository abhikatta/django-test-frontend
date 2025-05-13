// DO NOT IMPORT THIS ON CLIENT SIDE AS THAT WILL EXPOSE IT TO USER

export const api = {
  crew: "/api/crew/",
  roles: "/api/roles/",
  accounts: {
    signup: "/api/accounts/signup/",
    login: "/api/accounts/login/",
    refresh_token: "/api/token/refresh/",
  },
};
