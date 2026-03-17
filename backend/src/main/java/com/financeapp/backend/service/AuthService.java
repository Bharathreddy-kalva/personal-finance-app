package com.financeapp.backend.service;

import com.financeapp.backend.dto.AuthResponse;
import com.financeapp.backend.dto.LoginRequest;
import com.financeapp.backend.dto.ProfileResponse;
import com.financeapp.backend.dto.RegisterRequest;
import com.financeapp.backend.entity.User;
import com.financeapp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        User savedUser = userRepository.save(user);

        return new AuthResponse(
                "User registered successfully",
                savedUser.getId(),
                savedUser.getFullName(),
                savedUser.getEmail()
        );
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        boolean passwordMatches = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (!passwordMatches) {
            throw new RuntimeException("Invalid email or password");
        }

        return new AuthResponse(
                "Login successful",
                user.getId(),
                user.getFullName(),
                user.getEmail()
        );
    }

    public ProfileResponse getProfileByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new ProfileResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail()
        );
    }
}