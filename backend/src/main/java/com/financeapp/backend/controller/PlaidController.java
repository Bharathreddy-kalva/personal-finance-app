package com.financeapp.backend.controller;

import com.financeapp.backend.service.PlaidService;
import com.plaid.client.model.ItemPublicTokenExchangeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/plaid")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PlaidController {

    private final PlaidService plaidService;

    @PostMapping("/create-link-token")
    public Map<String, String> createLinkToken(@RequestBody Map<String, String> request) {
        try {
            String userId = request.get("userId");
            String linkToken = plaidService.createLinkToken(userId);
            return Map.of("link_token", linkToken);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Plaid create-link-token failed: " + e.getMessage());
        }
    }

    @PostMapping("/exchange-public-token")
    public Map<String, String> exchangePublicToken(@RequestBody Map<String, String> request) {
        try {
            String publicToken = request.get("public_token");
            String userEmail = request.get("user_email");

            ItemPublicTokenExchangeResponse response =
                    plaidService.exchangePublicToken(publicToken);

            plaidService.saveItemAndAccounts(
                    userEmail,
                    response.getAccessToken(),
                    response.getItemId()
            );

            return Map.of(
                    "access_token", response.getAccessToken(),
                    "item_id", response.getItemId()
            );
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Plaid exchange-public-token failed: " + e.getMessage());
        }
    }
}