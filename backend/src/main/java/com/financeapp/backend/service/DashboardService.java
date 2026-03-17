package com.financeapp.backend.service;

import com.financeapp.backend.dto.DashboardSummaryResponse;
import com.financeapp.backend.entity.Budget;
import com.financeapp.backend.entity.User;
import com.financeapp.backend.repository.BudgetRepository;
import com.financeapp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final BudgetRepository budgetRepository;

    public DashboardSummaryResponse getSummaryByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Budget> budgets = budgetRepository.findByUserId(user.getId());

        double totalBudget = budgets.stream()
                .mapToDouble(Budget::getMonthlyLimit)
                .sum();

        double totalSpent = budgets.stream()
                .mapToDouble(Budget::getSpentAmount)
                .sum();

        long overBudgetCount = budgets.stream()
                .filter(b -> b.getSpentAmount() > b.getMonthlyLimit())
                .count();

        long budgetCount = budgets.size();

        return new DashboardSummaryResponse(
                totalBudget,
                totalSpent,
                overBudgetCount,
                budgetCount
        );
    }
}