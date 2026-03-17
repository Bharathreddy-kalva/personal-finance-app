import api from "./api";

export interface BankAccountResponse {
  id: number;
  institutionName: string;
  accountName: string;
  type: string;
  currentBalance: number;
  availableBalance: number;
}

export interface TransactionResponse {
  id: number;
  merchantName: string;
  description: string;
  date: string;
  amount: number;
  category: string;
  status: string;
  accountName: string;
}

export const getAccounts = async (email: string): Promise<BankAccountResponse[]> => {
  const response = await api.get(`/accounts?email=${encodeURIComponent(email)}`);
  return response.data;
};

export const getTransactions = async (email: string): Promise<TransactionResponse[]> => {
  const response = await api.get(`/transactions?email=${encodeURIComponent(email)}`);
  return response.data;
};