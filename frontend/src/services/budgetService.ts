import api from "./api";

export interface BudgetApiResponse {
  id: number;
  categoryName: string;
  monthlyLimit: number;
  spentAmount: number;
  remainingAmount: number;
  month: number;
  year: number;
}

export interface CreateBudgetPayload {
  categoryName: string;
  monthlyLimit: number;
  spentAmount: number;
  month: number;
  year: number;
  userEmail: string;
}

export const getBudgets = async (email: string): Promise<BudgetApiResponse[]> => {
  const response = await api.get(`/budgets?email=${encodeURIComponent(email)}`);
  return response.data;
};

export const createBudget = async (payload: CreateBudgetPayload): Promise<BudgetApiResponse> => {
  const response = await api.post("/budgets", payload);
  return response.data;
};

export const deleteBudget = async (id: number): Promise<string> => {
  const response = await api.delete(`/budgets/${id}`);
  return response.data;
};
export const updateBudget = async (
  id: number,
  payload: CreateBudgetPayload
): Promise<BudgetApiResponse> => {
  const response = await api.put(`/budgets/${id}`, payload);
  return response.data;
};