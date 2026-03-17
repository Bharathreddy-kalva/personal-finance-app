package com.financeapp.backend.controller;

import com.financeapp.backend.dto.BankAccountResponse;
import com.financeapp.backend.dto.TransactionResponse;
import com.financeapp.backend.service.FinanceDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class FinanceDataController {

    private final FinanceDataService financeDataService;

    @GetMapping("/accounts")
    public List<BankAccountResponse> getAccounts(@RequestParam String email) {
        return financeDataService.getAccountsByEmail(email);
    }

    @GetMapping("/transactions")
    public List<TransactionResponse> getTransactions(@RequestParam String email) {
        return financeDataService.getTransactionsByEmail(email);
    }
}