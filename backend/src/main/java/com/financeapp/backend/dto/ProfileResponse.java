package com.financeapp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProfileResponse {
    private Long id;
    private String fullName;
    private String email;
}