package com.financeapp.backend.controller;

import com.financeapp.backend.dto.DashboardSummaryResponse;
import com.financeapp.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public DashboardSummaryResponse getSummary(@RequestParam String email) {
        return dashboardService.getSummaryByEmail(email);
    }
}