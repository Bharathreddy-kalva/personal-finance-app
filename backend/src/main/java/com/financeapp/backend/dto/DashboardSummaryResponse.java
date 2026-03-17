package com.financeapp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DashboardSummaryResponse {
    private Double totalBudget;
    private Double totalSpent;
    private Long overBudgetCount;
    private Long budgetCount;
}