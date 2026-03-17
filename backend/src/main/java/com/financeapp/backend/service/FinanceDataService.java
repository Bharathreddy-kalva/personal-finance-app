package com.financeapp.backend.service;

import com.financeapp.backend.dto.BankAccountResponse;
import com.financeapp.backend.dto.TransactionResponse;
import com.financeapp.backend.entity.User;
import com.financeapp.backend.repository.BankAccountRepository;
import com.financeapp.backend.repository.TransactionRepository;
import com.financeapp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FinanceDataService {

    private final UserRepository userRepository;
    private final BankAccountRepository bankAccountRepository;
    private final TransactionRepository transactionRepository;

    public List<BankAccountResponse> getAccountsByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return bankAccountRepository.findByUserId(user.getId())
                .stream()
                .map(a -> new BankAccountResponse(
                        a.getId(),
                        a.getInstitutionName(),
                        a.getAccountName(),
                        a.getType(),
                        a.getCurrentBalance(),
                        a.getAvailableBalance()
                ))
                .toList();
    }

    public List<TransactionResponse> getTransactionsByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return transactionRepository.findByUserIdOrderByDateDesc(user.getId())
                .stream()
                .map(t -> new TransactionResponse(
                        t.getId(),
                        t.getMerchantName(),
                        t.getDescription(),
                        t.getDate(),
                        t.getAmount(),
                        t.getCategory(),
                        t.getStatus(),
                        t.getBankAccount().getAccountName()
                ))
                .toList();
    }
}