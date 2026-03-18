package com.financeapp.backend.repository;

import com.financeapp.backend.entity.BankItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BankItemRepository extends JpaRepository<BankItem, Long> {
    Optional<BankItem> findByPlaidItemId(String plaidItemId);
}