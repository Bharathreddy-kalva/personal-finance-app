package com.financeapp.backend.service;

import com.financeapp.backend.dto.BudgetRequest;
import com.financeapp.backend.dto.BudgetResponse;
import com.financeapp.backend.entity.Budget;
import com.financeapp.backend.entity.User;
import com.financeapp.backend.repository.BudgetRepository;
import com.financeapp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;

    public BudgetResponse createBudget(BudgetRequest request) {
        User user = userRepository.findByEmail(request.getUserEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Budget budget = Budget.builder()
                .categoryName(request.getCategoryName())
                .monthlyLimit(request.getMonthlyLimit())
                .spentAmount(request.getSpentAmount())
                .month(request.getMonth())
                .year(request.getYear())
                .user(user)
                .build();

        Budget savedBudget = budgetRepository.save(budget);

        return mapToResponse(savedBudget);
    }

    public List<BudgetResponse> getBudgetsByUserEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return budgetRepository.findByUserId(user.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public BudgetResponse updateBudget(Long id, BudgetRequest request) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found"));

        budget.setCategoryName(request.getCategoryName());
        budget.setMonthlyLimit(request.getMonthlyLimit());
        budget.setSpentAmount(request.getSpentAmount());
        budget.setMonth(request.getMonth());
        budget.setYear(request.getYear());

        Budget updatedBudget = budgetRepository.save(budget);

        return mapToResponse(updatedBudget);
    }

    public void deleteBudget(Long id) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found"));

        budgetRepository.delete(budget);
    }

    private BudgetResponse mapToResponse(Budget budget) {
        double remainingAmount = budget.getMonthlyLimit() - budget.getSpentAmount();

        return new BudgetResponse(
                budget.getId(),
                budget.getCategoryName(),
                budget.getMonthlyLimit(),
                budget.getSpentAmount(),
                remainingAmount,
                budget.getMonth(),
                budget.getYear()
        );
    }
}