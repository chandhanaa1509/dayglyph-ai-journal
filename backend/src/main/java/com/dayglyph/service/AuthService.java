package com.dayglyph.service;

import com.dayglyph.dto.request.LoginRequest;
import com.dayglyph.dto.request.RegisterRequest;
import com.dayglyph.dto.response.AuthResponse;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

}