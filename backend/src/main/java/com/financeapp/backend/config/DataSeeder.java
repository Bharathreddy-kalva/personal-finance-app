package com.financeapp.backend.config;

import com.financeapp.backend.entity.BankAccount;
import com.financeapp.backend.entity.Transaction;
import com.financeapp.backend.entity.User;
import com.financeapp.backend.repository.BankAccountRepository;
import com.financeapp.backend.repository.TransactionRepository;
import com.financeapp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    private final UserRepository userRepository;
    private final BankAccountRepository bankAccountRepository;
    private final TransactionRepository transactionRepository;

    @Bean
    CommandLineRunner seedData() {
        return args -> {
            User user = userRepository.findByEmail("bharath@example.com").orElse(null);
            if (user == null) return;

            if (bankAccountRepository.findByUserId(user.getId()).isEmpty()) {
                BankAccount checking = bankAccountRepository.save(BankAccount.builder()
                        .institutionName("Chase")
                        .accountName("Checking")
                        .type("checking")
                        .currentBalance(2450.75)
                        .availableBalance(2310.20)
                        .user(user)
                        .build());

                BankAccount savings = bankAccountRepository.save(BankAccount.builder()
                        .institutionName("Bank of America")
                        .accountName("Savings")
                        .type("savings")
                        .currentBalance(6200.00)
                        .availableBalance(6200.00)
                        .user(user)
                        .build());

                transactionRepository.save(Transaction.builder()
                        .merchantName("Starbucks")
                        .description("SQC*STARBUCKS")
                        .date(LocalDate.now().minusDays(1))
                        .amount(8.45)
                        .category("Dining")
                        .status("POSTED")
                        .bankAccount(checking)
                        .user(user)
                        .build());

                transactionRepository.save(Transaction.builder()
                        .merchantName("Walmart")
                        .description("WALMART SUPERCENTER")
                        .date(LocalDate.now().minusDays(2))
                        .amount(64.22)
                        .category("Groceries")
                        .status("POSTED")
                        .bankAccount(checking)
                        .user(user)
                        .build());

                transactionRepository.save(Transaction.builder()
                        .merchantName("Uber")
                        .description("UBER TRIP")
                        .date(LocalDate.now().minusDays(3))
                        .amount(18.90)
                        .category("Transport")
                        .status("POSTED")
                        .bankAccount(checking)
                        .user(user)
                        .build());

                transactionRepository.save(Transaction.builder()
                        .merchantName("Salary")
                        .description("MONTHLY SALARY")
                        .date(LocalDate.now().minusDays(5))
                        .amount(4200.00)
                        .category("Income")
                        .status("POSTED")
                        .bankAccount(savings)
                        .user(user)
                        .build());
            }
        };
    }
}