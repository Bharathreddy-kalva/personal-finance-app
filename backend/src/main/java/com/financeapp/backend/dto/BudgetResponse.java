package com.financeapp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BudgetResponse {
    private Long id;
    private String categoryName;
    private Double monthlyLimit;
    private Double spentAmount;
    private Double remainingAmount;
    private Integer month;
    private Integer year;
}