package com.flowpilot.flowpilot.common.service;

import com.flowpilot.flowpilot.common.dto.LoginRequestDto;
import com.flowpilot.flowpilot.common.dto.LoginResponseDto;
import com.flowpilot.flowpilot.common.repository.UserRepository;
import com.flowpilot.flowpilot.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public LoginResponseDto login(LoginRequestDto request) {
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getRole());
        return new LoginResponseDto(token, user.getRole(), user.getEmail(), user.getName());
    }
}
