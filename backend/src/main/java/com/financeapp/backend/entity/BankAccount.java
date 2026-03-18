package com.financeapp.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "bank_accounts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BankAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String plaidAccountId;

    @Column(nullable = false)
    private String institutionName;

    @Column(nullable = false)
    private String accountName;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private Double currentBalance;

    @Column(nullable = false)
    private Double availableBalance;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bank_item_id")
    private BankItem bankItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "bankAccount", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Transaction> transactions;
}