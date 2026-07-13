package com.dayglyph.controller;

import com.dayglyph.dto.request.LoginRequest;
import com.dayglyph.dto.request.RegisterRequest;
import com.dayglyph.dto.response.ApiResponse;
import com.dayglyph.dto.response.AuthResponse;
import com.dayglyph.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ApiResponse<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {

        return ApiResponse.success(
                "Registration successful.",
                authService.register(request)
        );
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {

        return ApiResponse.success(
                "Login successful.",
                authService.login(request)
        );
    }
}