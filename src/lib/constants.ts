// this is a proxy on frontend not same as backend
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const clientAPI = {
  account: `${BASE_URL}/api/account/`,
};
