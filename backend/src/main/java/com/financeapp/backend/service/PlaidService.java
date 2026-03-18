package com.financeapp.backend.service;

import com.financeapp.backend.entity.BankAccount;
import com.financeapp.backend.entity.BankItem;
import com.financeapp.backend.entity.User;
import com.financeapp.backend.repository.BankAccountRepository;
import com.financeapp.backend.repository.BankItemRepository;
import com.financeapp.backend.repository.UserRepository;
import com.plaid.client.model.*;
import com.plaid.client.request.PlaidApi;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import retrofit2.Response;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PlaidService {

    private final PlaidApi plaidApi;
    private final UserRepository userRepository;
    private final BankItemRepository bankItemRepository;
    private final BankAccountRepository bankAccountRepository;

    public String createLinkToken(String userId) throws Exception {
        LinkTokenCreateRequestUser user =
                new LinkTokenCreateRequestUser().clientUserId(userId);

        LinkTokenCreateRequest request = new LinkTokenCreateRequest()
                .user(user)
                .clientName("Personal Finance App")
                .products(Arrays.asList(Products.TRANSACTIONS))
                .countryCodes(Arrays.asList(CountryCode.US))
                .language("en");

        Response<LinkTokenCreateResponse> response =
                plaidApi.linkTokenCreate(request).execute();

        if (!response.isSuccessful()) {
            String errorBody = response.errorBody() != null ? response.errorBody().string() : "Unknown Plaid error";
            throw new RuntimeException(errorBody);
        }

        LinkTokenCreateResponse body = response.body();

        if (body == null || body.getLinkToken() == null) {
            throw new RuntimeException("Failed to create link token");
        }

        return body.getLinkToken();
    }

    public ItemPublicTokenExchangeResponse exchangePublicToken(String publicToken) throws Exception {
        ItemPublicTokenExchangeRequest request =
                new ItemPublicTokenExchangeRequest().publicToken(publicToken);

        Response<ItemPublicTokenExchangeResponse> response =
                plaidApi.itemPublicTokenExchange(request).execute();

        if (!response.isSuccessful()) {
            String errorBody = response.errorBody() != null ? response.errorBody().string() : "Unknown Plaid error";
            throw new RuntimeException(errorBody);
        }

        ItemPublicTokenExchangeResponse body = response.body();

        if (body == null) {
            throw new RuntimeException("Failed to exchange public token");
        }

        return body;
    }

    public void saveItemAndAccounts(String userEmail, String accessToken, String itemId) throws Exception {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        BankItem bankItem = bankItemRepository.findByPlaidItemId(itemId)
                .orElseGet(() -> BankItem.builder()
                        .plaidItemId(itemId)
                        .accessToken(accessToken)
                        .institutionName("Plaid Sandbox Bank")
                        .user(user)
                        .build());

        bankItem.setAccessToken(accessToken);
        bankItemRepository.save(bankItem);

        AccountsGetRequest request = new AccountsGetRequest()
                .accessToken(accessToken);

        Response<AccountsGetResponse> response =
                plaidApi.accountsGet(request).execute();

        if (!response.isSuccessful()) {
            String errorBody = response.errorBody() != null ? response.errorBody().string() : "Unknown Plaid error";
            throw new RuntimeException(errorBody);
        }

        AccountsGetResponse body = response.body();

        if (body == null || body.getAccounts() == null) {
            throw new RuntimeException("No accounts returned from Plaid");
        }

        List<AccountBase> accounts = body.getAccounts();

        for (AccountBase acc : accounts) {
            boolean exists = bankAccountRepository.findByUserId(user.getId())
                    .stream()
                    .anyMatch(existing -> acc.getAccountId().equals(existing.getPlaidAccountId()));

            if (!exists) {
                Double current = acc.getBalances() != null && acc.getBalances().getCurrent() != null
                        ? acc.getBalances().getCurrent().doubleValue()
                        : 0.0;

                Double available = acc.getBalances() != null && acc.getBalances().getAvailable() != null
                        ? acc.getBalances().getAvailable().doubleValue()
                        : current;

                BankAccount bankAccount = BankAccount.builder()
                        .plaidAccountId(acc.getAccountId())
                        .institutionName("Plaid Sandbox Bank")
                        .accountName(acc.getName())
                        .type(acc.getType() != null ? acc.getType().toString().toLowerCase() : "unknown")
                        .currentBalance(current)
                        .availableBalance(available)
                        .bankItem(bankItem)
                        .user(user)
                        .build();

                bankAccountRepository.save(bankAccount);
            }
        }
    }
}