package com.financeapp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class TransactionResponse {
    private Long id;
    private String merchantName;
    private String description;
    private LocalDate date;
    private Double amount;
    private String category;
    private String status;
    private String accountName;
}