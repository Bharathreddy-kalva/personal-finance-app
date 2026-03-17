package com.financeapp.backend.controller;

import com.financeapp.backend.dto.ProfileResponse;
import com.financeapp.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileController {

    private final AuthService authService;

    @GetMapping
    public ProfileResponse getProfile(@RequestParam String email) {
        return authService.getProfileByEmail(email);
    }
}