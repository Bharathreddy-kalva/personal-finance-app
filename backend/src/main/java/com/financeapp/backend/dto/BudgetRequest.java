package com.financeapp.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BudgetRequest {

    @NotBlank(message = "Category name is required")
    private String categoryName;

    @NotNull(message = "Monthly limit is required")
    @Min(value = 1, message = "Monthly limit must be greater than 0")
    private Double monthlyLimit;

    @NotNull(message = "Spent amount is required")
    @Min(value = 0, message = "Spent amount cannot be negative")
    private Double spentAmount;

    @NotNull(message = "Month is required")
    private Integer month;

    @NotNull(message = "Year is required")
    private Integer year;

    @NotBlank(message = "User email is required")
    private String userEmail;
}