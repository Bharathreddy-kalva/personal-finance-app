package com.financeapp.backend.controller;

import com.financeapp.backend.dto.BudgetRequest;
import com.financeapp.backend.dto.BudgetResponse;
import com.financeapp.backend.service.BudgetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BudgetController {

    private final BudgetService budgetService;

    @PostMapping
    public BudgetResponse createBudget(@Valid @RequestBody BudgetRequest request) {
        return budgetService.createBudget(request);
    }

    @GetMapping
    public List<BudgetResponse> getBudgets(@RequestParam String email) {
        return budgetService.getBudgetsByUserEmail(email);
    }

    @PutMapping("/{id}")
    public BudgetResponse updateBudget(@PathVariable Long id, @Valid @RequestBody BudgetRequest request) {
        return budgetService.updateBudget(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteBudget(@PathVariable Long id) {
        budgetService.deleteBudget(id);
        return "Budget deleted successfully";
    }
}