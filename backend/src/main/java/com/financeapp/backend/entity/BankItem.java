package com.financeapp.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bank_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BankItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String plaidItemId;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String accessToken;

    @Column
    private String institutionName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}