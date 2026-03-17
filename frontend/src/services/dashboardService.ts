import api from "./api";

export interface DashboardSummaryResponse {
  totalBudget: number;
  totalSpent: number;
  overBudgetCount: number;
  budgetCount: number;
}

export const getDashboardSummary = async (
  email: string
): Promise<DashboardSummaryResponse> => {
  const response = await api.get(`/dashboard/summary?email=${encodeURIComponent(email)}`);
  return response.data;
};