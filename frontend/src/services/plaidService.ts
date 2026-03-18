import api from "./api";

export const createLinkToken = async (userId: string) => {
  const response = await api.post("/plaid/create-link-token", { userId });
  return response.data;
};

export const exchangePublicToken = async (public_token: string, user_email: string) => {
  const response = await api.post("/plaid/exchange-public-token", {
    public_token,
    user_email,
  });
  return response.data;
};