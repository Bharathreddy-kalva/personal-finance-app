package com.financeapp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BankAccountResponse {
    private Long id;
    private String institutionName;
    private String accountName;
    private String type;
    private Double currentBalance;
    private Double availableBalance;
}